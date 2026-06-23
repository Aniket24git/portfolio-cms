import { describe, it, expect } from 'vitest';
import { portfolioSchema } from '../contentSchema';
import { defaultContent } from '../defaultContent';

describe('Content Schema Validation', () => {
  it('should validate the default content successfully', () => {
    const result = portfolioSchema.safeParse(defaultContent);
    if (!result.success) {
      console.error(result.error.format());
    }
    expect(result.success).toBe(true);
  });

  it('should reject invalid content', () => {
    const invalidContent = {
      ...defaultContent,
      name: 123, // Should be string
    };
    const result = portfolioSchema.safeParse(invalidContent);
    expect(result.success).toBe(false);
  });
});
