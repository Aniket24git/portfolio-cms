import React from 'react';

export const NAV = [
  { id: 'projects', num: '01', full: 'Projects', short: 'Work' },
  { id: 'cases', num: '02', full: 'Case Studies', short: 'Cases' },
  { id: 'teardowns', num: '03', full: 'Product Teardowns', short: 'Teardown' },
  { id: 'analytics', num: '04', full: 'Product Analytics', short: 'Metrics' },
];

export function PillNav({ active, onChange }) {
  const wrapRef = React.useRef(null);
  const btnRefs = React.useRef({});
  const [thumb, setThumb] = React.useState({ left: 6, right: 6, ready: false });

  const place = React.useCallback(() => {
    const el = btnRefs.current[active];
    const wrap = wrapRef.current;
    if (!el || !wrap) return;
    const er = el.getBoundingClientRect();
    const wr = wrap.getBoundingClientRect();
    setThumb({ left: er.left - wr.left, right: wr.right - er.right, ready: true });
  }, [active]);

  React.useLayoutEffect(() => { place(); }, [place]);
  React.useEffect(() => {
    const r = () => place();
    window.addEventListener('resize', r);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
    const t = setTimeout(place, 120);
    return () => { window.removeEventListener('resize', r); clearTimeout(t); };
  }, [place]);

  return (
    <nav className="pillnav glass" ref={wrapRef} aria-label="Sections">
      <span
        className="thumb"
        style={{
          left: thumb.left,
          right: thumb.right,
          opacity: thumb.ready ? 1 : 0,
        }}
      />
      {NAV.map((n) => (
        <button
          key={n.id}
          ref={(el) => (btnRefs.current[n.id] = el)}
          className={'seg' + (active === n.id ? ' active' : '')}
          onClick={() => onChange(n.id)}
          aria-current={active === n.id ? 'page' : undefined}
        >
          <span className="num">{n.num}</span>
          <span className="lbl-full">{n.full}</span>
          <span className="lbl-short">{n.short}</span>
        </button>
      ))}
    </nav>
  );
}
