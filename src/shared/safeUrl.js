/* Contact links come from editable content, and React will happily render
   href="javascript:..." — so a stored value becomes script execution on click.
   Allow only the schemes a portfolio link needs. */
const ALLOWED = ['http:', 'https:', 'mailto:'];

export function safeUrl(value, fallback = '#') {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  if (!trimmed) return fallback;

  // Protocol-relative and site-relative links are fine and have no scheme.
  if (trimmed.startsWith('/') || trimmed.startsWith('#')) return trimmed;

  try {
    // Resolve against the current origin so bare "example.com/x" is handled too.
    const parsed = new URL(trimmed, window.location.origin);
    return ALLOWED.includes(parsed.protocol) ? trimmed : fallback;
  } catch {
    return fallback;
  }
}

export function safeMailto(value, fallback = '') {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  // Keep it to a plain address: no CRLF/header tricks, no nested scheme.
  return /^[^\s<>():;,]+@[^\s<>():;,]+\.[^\s<>():;,]+$/.test(trimmed) ? trimmed : fallback;
}
