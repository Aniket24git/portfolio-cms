import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../infrastructure/firebase';
import { portfolioSchema } from './contentSchema';
import { defaultContent } from './defaultContent';

export class FirebaseContentRepository {
  constructor() {
    this.docRef = doc(db, 'content', 'portfolio');
  }

  async getPortfolio() {
    try {
      const snapshot = await getDoc(this.docRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        const validation = portfolioSchema.safeParse(data);
        if (validation.success) {
          return validation.data;
        } else {
          console.warn("Firebase data invalid, falling back to default.", validation.error);
        }
      }
    } catch (e) {
      console.error("Error reading from Firebase:", e);
    }
    return defaultContent;
  }

  async updatePortfolio(updates) {
    const current = await this.getPortfolio();
    const updated = { ...current, ...updates };

    const validation = portfolioSchema.safeParse(updated);
    if (!validation.success) {
      throw new Error("Invalid portfolio data: " + validation.error.message);
    }

    await setDoc(this.docRef, validation.data);
  }
}
