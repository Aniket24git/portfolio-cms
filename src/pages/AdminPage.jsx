import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

function EntryForm({ tab, item, onSave, onCancel, uploadImage }) {
  const [formData, setFormData] = useState(item || { tags: [] });
  const [uploading, setUploading] = useState(false);

  // Auto-expand textareas on mount if they have content
  useEffect(() => {
    document.querySelectorAll('.notion-body').forEach(el => {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    });
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (e.target.tagName === 'TEXTAREA') {
      e.target.style.height = 'auto';
      e.target.style.height = (e.target.scrollHeight) + 'px';
    }
  };

  const handleTagsChange = (e) => {
    setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()) });
  };

  const handleFileChange = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImage(file);
    if (url) {
      setFormData({ ...formData, [field]: url });
    }
    setUploading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const coverField = tab === 'projects' ? 'coverUrl' : (tab === 'caseStudies' ? 'visualUrl' : null);
  const coverUrl = coverField ? formData[coverField] : null;

  return (
    <div className="notion-editor">
      <div className="notion-actions">
        <button type="button" className="seg" onClick={onCancel} style={{ padding: '8px 16px' }}>Cancel</button>
        <button type="button" className="seg active" onClick={handleSubmit} style={{ padding: '8px 16px', background: 'var(--accent-ink)' }} disabled={uploading}>
          {uploading ? 'Saving...' : 'Save'}
        </button>
      </div>

      {coverField && (
        <label className="notion-cover">
          {coverUrl ? <img src={coverUrl} alt="Cover" /> : <div className="notion-cover-label">Add Cover</div>}
          <input type="file" style={{ display: 'none' }} onChange={(e) => handleFileChange(e, coverField)} />
        </label>
      )}

      <input name="title" className="notion-title" placeholder="Untitled" value={formData.title || ''} onChange={handleChange} />

      <div className="notion-props">
        {tab === 'projects' && (
          <>
            <div className="notion-prop-row">
              <div className="notion-prop-label">📅 Year</div>
              <input name="year" className="notion-prop-val" placeholder="Empty" value={formData.year || ''} onChange={handleChange} />
            </div>
            <div className="notion-prop-row">
              <div className="notion-prop-label">🏷️ Tags</div>
              <input className="notion-prop-val" placeholder="Empty (comma separated)" value={(formData.tags || []).join(', ')} onChange={handleTagsChange} />
            </div>
          </>
        )}
        
        {tab === 'caseStudies' && (
          <div className="notion-prop-row">
            <div className="notion-prop-label">🎯 Kicker</div>
            <input name="kicker" className="notion-prop-val" placeholder="Empty" value={formData.kicker || ''} onChange={handleChange} />
          </div>
        )}

        {tab === 'teardowns' && (
          <>
            <div className="notion-prop-row">
              <div className="notion-prop-label">📱 App Name</div>
              <input name="app" className="notion-prop-val" placeholder="Empty" value={formData.app || ''} onChange={handleChange} />
            </div>
            <div className="notion-prop-row">
              <div className="notion-prop-label">⭐️ Rating</div>
              <input name="rating" type="number" step="0.1" className="notion-prop-val" placeholder="Empty (out of 10)" value={formData.rating || ''} onChange={handleChange} />
            </div>
            <div className="notion-prop-row">
              <div className="notion-prop-label">🏷️ Tags</div>
              <input className="notion-prop-val" placeholder="Empty (comma separated)" value={(formData.tags || []).join(', ')} onChange={handleTagsChange} />
            </div>
            <div className="notion-prop-row">
              <div className="notion-prop-label">⚖️ Verdict</div>
              <input name="verdict" className="notion-prop-val" placeholder="Empty" value={formData.verdict || ''} onChange={handleChange} />
            </div>
          </>
        )}
      </div>

      <div className="notion-content">
        {tab === 'projects' && (
          <textarea name="blurb" className="notion-body" placeholder="Write a blurb..." value={formData.blurb || ''} onChange={handleChange} />
        )}
        
        {tab === 'caseStudies' && (
          <>
            <h3 style={{ marginBottom: '8px' }}>Problem</h3>
            <textarea name="problem" className="notion-body" placeholder="Describe the problem..." value={formData.problem || ''} onChange={handleChange} />
            <br/><br/>
            <h3 style={{ marginBottom: '8px' }}>Approach</h3>
            <textarea name="approach" className="notion-body" placeholder="Describe your approach..." value={formData.approach || ''} onChange={handleChange} />
            <br/><br/>
            <h3 style={{ marginBottom: '8px' }}>Outcome</h3>
            <textarea name="outcome" className="notion-body" placeholder="Describe the outcome..." value={formData.outcome || ''} onChange={handleChange} />
          </>
        )}

        {tab === 'teardowns' && (
          <p style={{ opacity: 0.5, fontStyle: 'italic', padding: '20px 0' }}>Note: Full teardown detail lists and scores are managed in the code scaffolding. This editor manages the card meta-data.</p>
        )}
      </div>
    </div>
  );
}

export function AdminPage() {
  const { data, updateData, addEntry, updateEntry, deleteEntry, uploadImage } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(auth?.currentUser || null);
  const [activeTab, setActiveTab] = useState('projects');
  
  const [editingItem, setEditingItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const isMock = !auth;

  useEffect(() => {
    if (auth) {
      const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
      return unsubscribe;
    } else {
      setUser({ email: 'mock@admin.com' });
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (auth) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        alert("Login failed: " + err.message);
      }
    }
  };

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
    } else {
      setUser(null);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(data[activeTab]);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    const updatedItems = items.map((item, idx) => ({ ...item, idx: (idx + 1).toString().padStart(2, '0') }));
    updateData({ ...data, [activeTab]: updatedItems });
  };

  const handleSave = async (item) => {
    if (editingItem) {
      await updateEntry(activeTab, editingItem.idx, item);
    } else {
      await addEntry(activeTab, item);
    }
    setEditingItem(null);
    setIsAdding(false);
  };

  const handleDelete = async (idx) => {
    if (confirm('Are you sure you want to delete this item?')) {
      await deleteEntry(activeTab, idx);
    }
  };

  if (!user) {
    return (
      <div className="page wrap" style={{ marginTop: '100px', display: 'flex', justifyContent: 'center' }}>
        <form className="glass" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px', width: '400px' }} onSubmit={handleLogin}>
          <h2>Admin Login</h2>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: '10px' }} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ padding: '10px' }} />
          <button type="submit" className="seg active" style={{ padding: '10px', background: 'var(--accent-ink)' }}>Login</button>
          {isMock && <p style={{ fontSize: '12px', opacity: 0.6 }}>Running in mock mode. Just click login.</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="page wrap" style={{ marginTop: '100px' }}>
      {!(isAdding || editingItem) && (
        <>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <div>
              <h1 style={{ margin: 0 }}>Admin Dashboard</h1>
              <p style={{ opacity: 0.6 }}>Manage your content here. Only admins can see this page.</p>
            </div>
            <button onClick={handleLogout} className="seg" style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.1)' }}>Logout</button>
          </header>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              {['projects', 'caseStudies', 'teardowns'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => { setActiveTab(tab); setIsAdding(false); setEditingItem(null); }}
                  className={`seg ${activeTab === tab ? 'active' : ''}`}
                  style={{ padding: '10px 20px' }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1')}
                </button>
              ))}
            </div>
            <button onClick={() => { setIsAdding(true); setEditingItem(null); }} className="seg active" style={{ padding: '10px 20px', background: 'var(--accent-ink)' }}>
              + Add New
            </button>
          </div>
        </>
      )}

      {(isAdding || editingItem) ? (
        <EntryForm tab={activeTab} item={editingItem} onSave={handleSave} onCancel={() => { setIsAdding(false); setEditingItem(null); }} uploadImage={uploadImage} />
      ) : (
        <div className="glass" style={{ padding: '20px', borderRadius: '16px' }}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {data[activeTab]?.map((item, index) => (
                    <Draggable key={item.idx || item.title} draggableId={item.idx || item.title} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            padding: '16px',
                            margin: '0 0 8px 0',
                            background: snapshot.isDragging ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            cursor: 'grab',
                            ...provided.draggableProps.style
                          }}
                        >
                          <div style={{ opacity: 0.5 }}>☰</div>
                          <div style={{ fontWeight: 600, width: '30px' }}>{item.idx}</div>
                          <div style={{ flex: 1 }}>{item.title}</div>
                          
                          <button onClick={() => setEditingItem(item)} className="seg" style={{ padding: '5px 10px', cursor: 'pointer' }}>Edit</button>
                          <button onClick={() => handleDelete(item.idx)} className="seg" style={{ padding: '5px 10px', cursor: 'pointer', color: '#ff6b6b' }}>Delete</button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}
    </div>
  );
}
