import React, { useState, useEffect } from 'react';

export function EntryForm({ tab, item, onSave, onCancel, uploadImage }) {
  const [formData, setFormData] = useState(item || { tags: [] });
  const [uploading, setUploading] = useState(false);
  const contentRef = React.useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.querySelectorAll('textarea').forEach(el => {
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (e.target.tagName === 'TEXTAREA') {
      e.target.style.height = 'auto';
      e.target.style.height = (e.target.scrollHeight) + 'px';
    }
  };

  const handleTagsChange = (e) => {
    setFormData(prev => ({ ...prev, tags: e.target.value.split(',').map(t => t.trim()) }));
  };

  const handleFileChange = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImage(file);
    if (url) {
      setFormData(prev => ({ ...prev, [field]: url }));
    }
    setUploading(false);
  };

  const handleSubmit = () => {
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

      <div className="notion-content" ref={contentRef}>
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
