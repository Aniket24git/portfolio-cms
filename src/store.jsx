import React, { createContext, useContext, useState, useEffect } from 'react';
import { getRepository } from './content/contentRepository';
import { storage } from './infrastructure/firebase'; // We will move firebase.js later, keep this for uploadImage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const StoreContext = createContext();

/* Nested fields the schema requires but the editor form does not collect. Without
   these a newly added teardown fails validation, the save is rejected, and the
   detail view renders from unsaved state with no `details` at all. */
const NEW_ENTRY_DEFAULTS = {
  teardowns: {
    rating: 0,
    scores: [],
    tags: [],
    details: { context: '', broken: [], works: [], screens: [], criteria: [] },
  },
};

export function StoreProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const repository = getRepository();

  useEffect(() => {
    async function loadData() {
      try {
        const loadedData = await repository.getPortfolio();
        setData(loadedData);
      } catch (error) {
        console.error("Error loading data from repository:", error);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  /* The save is validated inside the repository and rejects invalid content. That
     failure used to be swallowed here, so the UI kept optimistic state that had
     never been persisted and could not be re-rendered safely. Surface it instead. */
  const [saveError, setSaveError] = useState(null);

  const updateData = async (newData) => {
    const previous = data;
    setData(newData);
    try {
      await repository.updatePortfolio(newData);
      setSaveError(null);
      return true;
    } catch (error) {
      console.error("Error saving to repository:", error);
      setSaveError(error?.message || String(error));
      setData(previous); // don't keep state the store refused to persist
      return false;
    }
  };

  const uploadImage = async (file) => {
    if (!file) return null;
    if (storage) {
      try {
        const fileRef = ref(storage, `images/${Date.now()}_${file.name}`);
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        return url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return null;
      }
    } else {
      // Mock upload (base64)
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    }
  };

  // Generic helper for lists using UUIDs and orders
  const addEntry = async (tab, item) => {
    const items = data[tab] || [];
    // If it's a legacy array, it used `idx`. We still provide `idx` for backwards compat.
    const newIdx = String(items.length + 1).padStart(2, '0');
    const newItem = {
      ...NEW_ENTRY_DEFAULTS[tab],
      ...item,
      id: uuidv4(),
      order: items.length,
      schemaVersion: 1,
      idx: newIdx
    };
    
    // Legacy mapping for idx for backwards compat
    const reindexed = [newItem, ...items].map((it, i) => ({ 
      ...it, 
      idx: String(i + 1).padStart(2, '0'),
      order: i
    }));

    const newData = { ...data, [tab]: reindexed };
    await updateData(newData);
  };

  const updateEntry = async (tab, idOrIdx, updatedItem) => {
    const items = data[tab] || [];
    const newData = {
      ...data,
      [tab]: items.map(it => (it.id === idOrIdx || it.idx === idOrIdx) ? { ...it, ...updatedItem } : it)
    };
    await updateData(newData);
  };

  const deleteEntry = async (tab, idOrIdx) => {
    const items = data[tab] || [];
    const filtered = items.filter(it => it.id !== idOrIdx && it.idx !== idOrIdx);
    // Legacy reindexing
    const reindexed = filtered.map((it, i) => ({ 
      ...it, 
      idx: String(i + 1).padStart(2, '0'),
      order: i
    }));
    
    const newData = { ...data, [tab]: reindexed };
    await updateData(newData);
  };

  return (
    <StoreContext.Provider value={{ data, updateData, loading, saveError, addEntry, updateEntry, deleteEntry, uploadImage }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
