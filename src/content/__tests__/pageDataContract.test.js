import { describe, it, expect } from 'vitest';
import { analyticsSchema, portfolioSchema } from '../contentSchema';
import { defaultContent, defaultAnalytics } from '../defaultContent';

/* AnalyticsPage rendered a.lede / a.sections / a.principles, none of which the
   schema defines. Every visit threw on .map of undefined and blanked the site.
   Pin the contract so the component and the data model cannot drift apart again. */

describe('analytics data contract', () => {
  it('the schema shape is intro + projects', () => {
    expect(Object.keys(analyticsSchema.shape).sort()).toEqual(['intro', 'projects']);
  });

  it('default analytics validates and exposes an iterable projects array', () => {
    expect(analyticsSchema.safeParse(defaultAnalytics).success).toBe(true);
    expect(Array.isArray(defaultAnalytics.projects)).toBe(true);
  });

  it('does not define the fields the old page reached for', () => {
    for (const stale of ['lede', 'sections', 'principles']) {
      expect(analyticsSchema.shape[stale], stale).toBeUndefined();
      expect(defaultAnalytics[stale], stale).toBeUndefined();
    }
  });
});

describe('every page collection is an array in default content', () => {
  it.each(['projects', 'caseStudies', 'teardowns'])('%s', (key) => {
    expect(Array.isArray(defaultContent[key])).toBe(true);
  });

  it('the whole default document validates', () => {
    expect(portfolioSchema.safeParse(defaultContent).success).toBe(true);
  });
});
