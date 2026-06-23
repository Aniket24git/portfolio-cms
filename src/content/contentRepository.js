/**
 * ContentRepository Interface
 * 
 * Defines the contract for fetching and updating portfolio content.
 * Implementations must return data that adheres to the `portfolioSchema`.
 * 
 * interface ContentRepository {
 *   async getPortfolio(): Promise<Portfolio>
 *   async updatePortfolio(updates: Partial<Portfolio>): Promise<void>
 * }
 */

import { LocalContentRepository } from './localContentRepository';
import { FirebaseContentRepository } from './firebaseContentRepository';

let repositoryInstance = null;

export function getRepository() {
  if (repositoryInstance) return repositoryInstance;

  // We can use an env var to decide which repository to use.
  // For now, if VITE_USE_FIREBASE is true, use Firebase, else Local.
  if (import.meta.env.VITE_USE_FIREBASE === 'true') {
    repositoryInstance = new FirebaseContentRepository();
  } else {
    repositoryInstance = new LocalContentRepository();
  }
  
  return repositoryInstance;
}
