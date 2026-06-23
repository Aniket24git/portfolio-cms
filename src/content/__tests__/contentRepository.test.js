import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LocalContentRepository } from '../localContentRepository';
import { defaultContent } from '../defaultContent';

describe('LocalContentRepository', () => {
  let repo;

  beforeEach(() => {
    repo = new LocalContentRepository();
    localStorage.clear();
  });

  it('should return default content when local storage is empty', async () => {
    const data = await repo.getPortfolio();
    expect(data).toEqual(defaultContent);
  });

  it('should update local storage successfully', async () => {
    const updates = { name: "Test User" };
    await repo.updatePortfolio(updates);

    const stored = JSON.parse(localStorage.getItem('portfolio_local_content'));
    expect(stored.name).toBe("Test User");

    const data = await repo.getPortfolio();
    expect(data.name).toBe("Test User");
  });

  it('should throw on invalid updates', async () => {
    const invalidUpdates = { name: 123 }; // should be string
    await expect(repo.updatePortfolio(invalidUpdates)).rejects.toThrow();
  });
});
