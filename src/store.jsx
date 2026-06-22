import React, { createContext, useContext, useState, useEffect } from 'react';
import { PORTFOLIO as defaultData } from './data';
import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (db) {
        try {
          const docRef = doc(db, 'portfolio', 'content');
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setData(docSnap.data());
          }
        } catch (error) {
          console.error("Error loading data from Firebase:", error);
        }
      } else {
        // Mock with LocalStorage if Firebase not configured
        const local = localStorage.getItem('portfolioData');
        if (local) setData(JSON.parse(local));
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const updateData = async (newData) => {
    setData(newData);
    if (db) {
      try {
        await setDoc(doc(db, 'portfolio', 'content'), newData);
      } catch (error) {
        console.error("Error saving to Firebase:", error);
      }
    } else {
      localStorage.setItem('portfolioData', JSON.stringify(newData));
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

  const addEntry = async (tab, item) => {
    const items = data[tab] || [];
    const newIdx = String(items.length + 1).padStart(2, '0');
    const newItem = { ...item, idx: newIdx };
    const newData = { ...data, [tab]: [newItem, ...items].map((it, i) => ({ ...it, idx: String(i + 1).padStart(2, '0') })) };
    await updateData(newData);
  };

  const updateEntry = async (tab, oldIdx, updatedItem) => {
    const items = data[tab] || [];
    const newData = {
      ...data,
      [tab]: items.map(it => it.idx === oldIdx ? { ...it, ...updatedItem, idx: oldIdx } : it)
    };
    await updateData(newData);
  };

  const deleteEntry = async (tab, idx) => {
    const items = data[tab] || [];
    const filtered = items.filter(it => it.idx !== idx);
    const reindexed = filtered.map((it, i) => ({ ...it, idx: String(i + 1).padStart(2, '0') }));
    const newData = { ...data, [tab]: reindexed };
    await updateData(newData);
  };

  return (
    <StoreContext.Provider value={{ data, updateData, loading, addEntry, updateEntry, deleteEntry, uploadImage }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
