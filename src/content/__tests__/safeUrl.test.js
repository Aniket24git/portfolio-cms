import { describe, it, expect } from 'vitest';
import { safeUrl, safeMailto } from '../../shared/safeUrl';
import { contactSchema } from '../contentSchema';

describe('safeUrl', () => {
  it('blocks script-bearing schemes', () => {
    for (const bad of [
      'javascript:alert(1)',
      'JavaScript:alert(1)',
      '  javascript:alert(1)  ',
      'data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==',
      'vbscript:msgbox(1)',
      'file:///etc/passwd',
    ]) {
      expect(safeUrl(bad), bad).toBe('#');
    }
  });

  it('passes ordinary links through untouched', () => {
    for (const ok of [
      'https://linkedin.com/in/someone',
      'http://example.com/cv.pdf',
      'mailto:a@b.com',
      '/local/path',
      '#anchor',
    ]) {
      expect(safeUrl(ok), ok).toBe(ok);
    }
  });

  it('falls back for junk input', () => {
    expect(safeUrl(undefined)).toBe('#');
    expect(safeUrl(null)).toBe('#');
    expect(safeUrl('')).toBe('#');
    expect(safeUrl(42)).toBe('#');
    expect(safeUrl({})).toBe('#');
  });
});

describe('safeMailto', () => {
  it('rejects header-injection and scheme tricks', () => {
    expect(safeMailto('a@b.com%0ABcc:x@y.com')).toBe('');
    expect(safeMailto('a@b.com\nBcc:x@y.com')).toBe('');
    expect(safeMailto('javascript:alert(1)')).toBe('');
    expect(safeMailto('not-an-email')).toBe('');
  });

  it('accepts a plain address', () => {
    expect(safeMailto('hello@example.com')).toBe('hello@example.com');
  });
});

describe('contactSchema', () => {
  it('rejects a javascript: link at the schema layer too', () => {
    expect(contactSchema.safeParse({ linkedin: 'javascript:alert(1)' }).success).toBe(false);
    expect(contactSchema.safeParse({ resume: 'data:text/html,x' }).success).toBe(false);
  });

  it('accepts real values and tolerates omission', () => {
    expect(contactSchema.safeParse({}).success).toBe(true);
    expect(
      contactSchema.safeParse({ email: 'a@b.com', linkedin: 'https://linkedin.com/in/x' }).success
    ).toBe(true);
  });
});
