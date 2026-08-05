import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { ErrorBoundary } from '../../components/ErrorBoundary';

/* The blank page happened because nothing caught a render throw, so React
   unmounted the entire root. These assert the boundary contains the damage. */

function Boom() {
  throw new Error('context is not defined');
}
function Fine() {
  return <p className="ok">rendered fine</p>;
}

function mount(ui) {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const root = createRoot(host);
  act(() => root.render(ui));
  return { host, root };
}

afterEach(() => {
  document.body.innerHTML = '';
  vi.restoreAllMocks();
});

describe('ErrorBoundary', () => {
  it('renders children untouched when nothing throws', () => {
    const { host } = mount(<ErrorBoundary><Fine /></ErrorBoundary>);
    expect(host.querySelector('.ok')).not.toBeNull();
    expect(host.querySelector('.errbox')).toBeNull();
  });

  it('catches a throw and shows the fallback instead of blanking', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const { host } = mount(<ErrorBoundary><Boom /></ErrorBoundary>);
    // the crucial part: something is still on screen
    expect(host.textContent.trim().length).toBeGreaterThan(0);
    expect(host.querySelector('.errbox')).not.toBeNull();
    expect(host.textContent).toContain('could not be displayed');
    expect(host.textContent).toContain('context is not defined');
  });

  it('keeps sibling content alive when one subtree throws', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const { host } = mount(
      <div>
        <Fine />
        <ErrorBoundary><Boom /></ErrorBoundary>
      </div>
    );
    expect(host.querySelector('.ok')).not.toBeNull();
    expect(host.querySelector('.errbox')).not.toBeNull();
  });
});
