import { z } from 'zod';

// Base schema fields for all content types
const baseFields = {
  id: z.string().uuid(),
  order: z.number().int().nonnegative(),
  schemaVersion: z.literal(1).default(1),
};

// --- Hero & Profile ---

export const factSchema = z.object({
  k: z.string(),
  v: z.string(),
});

export const educationSchema = z.object({
  name: z.string(),
  short: z.string(),
  course: z.string(),
  year: z.string(),
  logo: z.string(), // base64 or url
});

export const certificationSchema = z.object({
  issuer: z.string(),
  cert: z.string(),
  year: z.string(),
  short: z.string(),
  logo: z.string(), // base64 or url
});

export const heroSchema = z.object({
  statement: z.string(),
  facts: z.array(factSchema),
  education: z.array(educationSchema),
  certifications: z.array(certificationSchema).optional().default([]),
});

export const profileSchema = z.object({
  name: z.string(),
  role: z.string(),
  location: z.string(),
  status: z.string(),
  hero: heroSchema,
});

// --- Portfolio Collections ---

export const projectSchema = z.object({
  ...baseFields,
  idx: z.string(), // Legacy identifier (e.g., "01")
  year: z.string(),
  title: z.string(),
  blurb: z.string(),
  cover: z.string(),
  tags: z.array(z.string()),
});

export const metricSchema = z.object({
  v: z.string(),
  l: z.string(),
});

export const caseStudySchema = z.object({
  ...baseFields,
  idx: z.string(),
  kicker: z.string(),
  title: z.string(),
  problem: z.string(),
  approach: z.string(),
  outcome: z.string(),
  metrics: z.array(metricSchema),
});

export const teardownSchema = z.object({
  ...baseFields,
  idx: z.string(),
  app: z.string(),
  title: z.string(),
  verdict: z.string(),
  tags: z.array(z.string()),
  rating: z.number(),
  scores: z.array(z.number()),
  details: teardownDetailSchema,
});

// Teardown Details are shared templates
export const teardownDetailSchema = z.object({
  context: z.string(),
  broken: z.array(z.string()),
  works: z.array(z.string()),
  screens: z.array(z.object({ tag: z.string(), cap: z.string() })),
  criteria: z.array(z.string()),
});

export const analyticsProjectSchema = z.object({
  ...baseFields,
  idx: z.string(),
  year: z.string(),
  title: z.string(),
  blurb: z.string(),
  cover: z.string(),
  stat: metricSchema,
  tags: z.array(z.string()),
});

export const analyticsSchema = z.object({
  intro: z.string(),
  projects: z.array(analyticsProjectSchema),
});

// --- Top-Level Portfolio Schema ---
// This represents the entire state object, useful for validation of imports/exports
export const portfolioSchema = profileSchema.extend({
  projects: z.array(projectSchema),
  caseStudies: z.array(caseStudySchema),
  teardowns: z.array(teardownSchema),
  analytics: analyticsSchema,
});
