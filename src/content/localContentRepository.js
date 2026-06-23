import { defaultContent } from './defaultContent';
import { portfolioSchema } from './contentSchema';

export class LocalContentRepository {
  constructor() {
    this.storageKey = 'portfolio_local_content';
  }

  async getPortfolio() {
    // Try to load from localStorage first
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Validate
        const validation = portfolioSchema.safeParse(parsed);
        if (validation.success) {
          return validation.data;
        } else {
          console.warn("Local storage data invalid, falling back to default.", validation.error);
        }
      }
    } catch (e) {
      console.error("Error reading from local storage:", e);
    }
    
    // Fallback to default
    return defaultContent;
  }

  async updatePortfolio(updates) {
    // In local mode, we just merge updates and save to localStorage
    const current = await this.getPortfolio();
    const updated = { ...current, ...updates };
    
    const validation = portfolioSchema.safeParse(updated);
    if (!validation.success) {
      throw new Error("Invalid portfolio data: " + validation.error.message);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(validation.data));
  }
}
