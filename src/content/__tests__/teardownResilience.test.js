import { describe, it, expect } from 'vitest';
import { portfolioSchema, teardownSchema } from '../contentSchema';
import { defaultContent } from '../defaultContent';

/* Regression cover for the blank-teardown-page bug: a teardown added through the
   admin editor arrived with no `details`, the optimistic state kept it, and the
   detail view then called .replace() on an undefined context and unmounted the
   whole app. */

// mirrors the guard in TeardownDetail
const normaliseDetails = (t) => {
  const d = t.details || {};
  return {
    context: d.context || '',
    broken: d.broken || [],
    works: d.works || [],
    screens: d.screens || [],
    criteria: d.criteria || [],
  };
};
const fill = (s, app) => String(s ?? '').replace(/\{app\}/g, app || 'App');

describe('teardown detail resilience', () => {
  const broken = { idx: '99', app: 'Ghost', title: 'No details', verdict: 'x' };

  it('does not throw when details is missing entirely', () => {
    const det = normaliseDetails(broken);
    expect(() => fill(det.context, broken.app)).not.toThrow();
    expect(fill(det.context, broken.app)).toBe('');
    expect(det.broken).toEqual([]);
    expect(det.criteria).toEqual([]);
  });

  it('still substitutes {app} when context is present', () => {
    const t = { app: 'Linear', details: { context: 'I pulled {app} apart.' } };
    expect(fill(normaliseDetails(t).context, t.app)).toBe('I pulled Linear apart.');
  });

  it('tolerates a scores array shorter than criteria', () => {
    const t = { scores: [8], details: { criteria: ['a', 'b', 'c'] } };
    const rows = normaliseDetails(t).criteria.map((c, i) => Number((t.scores || [])[i] || 0));
    expect(rows).toEqual([8, 0, 0]);
    expect(() => rows.forEach((s) => s.toFixed(1))).not.toThrow();
  });
});

describe('new teardown entries satisfy the schema', () => {
  // the defaults store.jsx now merges in for a newly added teardown
  const NEW_TEARDOWN_DEFAULTS = {
    rating: 0,
    scores: [],
    tags: [],
    details: { context: '', broken: [], works: [], screens: [], criteria: [] },
  };

  it('a bare editor payload fails validation without the defaults', () => {
    const bare = {
      id: '11111111-1111-4111-8111-111111111111',
      order: 0, schemaVersion: 1, idx: '03',
      app: 'New', title: 'New teardown', verdict: 'tbd',
    };
    expect(teardownSchema.safeParse(bare).success).toBe(false);
  });

  it('the same payload validates once the defaults are merged', () => {
    const seeded = {
      ...NEW_TEARDOWN_DEFAULTS,
      id: '11111111-1111-4111-8111-111111111111',
      order: 0, schemaVersion: 1, idx: '03',
      app: 'New', title: 'New teardown', verdict: 'tbd',
    };
    const r = teardownSchema.safeParse(seeded);
    expect(r.success).toBe(true);
  });

  it('adding a seeded teardown keeps the whole portfolio valid', () => {
    const seeded = {
      ...NEW_TEARDOWN_DEFAULTS,
      id: '22222222-2222-4222-8222-222222222222',
      order: 2, schemaVersion: 1, idx: '03',
      app: 'New', title: 'New teardown', verdict: 'tbd',
    };
    const next = { ...defaultContent, teardowns: [...defaultContent.teardowns, seeded] };
    expect(portfolioSchema.safeParse(next).success).toBe(true);
  });
});
