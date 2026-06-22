import React from 'react';
import { useStore } from './store';
import { PillNav } from './components/PillNav';
import { ProjectsPage } from './pages/ProjectsPage';
import { CasesPage } from './pages/CasesPage';
import { TeardownsPage } from './pages/TeardownsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AdminPage } from './pages/AdminPage';

const ACCENTS = {
  titanium: 'oklch(0.32 0.01 260)',
  blue: 'oklch(0.52 0.16 250)',
  orange: 'oklch(0.58 0.15 45)',
  lime: 'oklch(0.55 0.15 130)',
};

const PAGES = {
  projects: ProjectsPage,
  cases: CasesPage,
  teardowns: TeardownsPage,
  analytics: AnalyticsPage,
  admin: AdminPage,
};

export function App() {
  const [active, setActive] = React.useState(() => {
    const h = (location.hash || '').replace('#', '');
    return PAGES[h] ? h : 'projects';
  });

  // Apply locked theme on mount
  React.useEffect(() => {
    const r = document.documentElement;
    r.dataset.backdrop = 'soft';
    r.dataset.glass = 'frosted';
    r.dataset.pill = 'glass';
    r.classList.add('shimmer-on');
    r.style.setProperty('--hero-name-fs', '58px');
    r.style.setProperty('--accent-ink', ACCENTS.titanium);
  }, []);

  // Navigate between pages
  const keepCollapsedRef = React.useRef(false);
  const heroH = React.useRef(320);
  const go = (id) => {
    if (id === active) return;
    keepCollapsedRef.current = window.scrollY > heroH.current * 0.6;
    setActive(id);
    history.replaceState(null, '', '#' + id);
  };

  React.useEffect(() => {
    const onHash = () => {
      const h = (location.hash || '').replace('#', '');
      if (PAGES[h]) setActive(h);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const Page = PAGES[active];
  const { data: D, loading } = useStore();

  const [entering, setEntering] = React.useState(true);
  React.useEffect(() => {
    setEntering(true);
    const id = setTimeout(() => setEntering(false), 600);
    return () => clearTimeout(id);
  }, [active]);

  // Collapse hero into the top-left on scroll
  const heroRef = React.useRef(null);
  React.useEffect(() => {
    const measure = () => {
      if (heroRef.current) heroH.current = Math.max(160, heroRef.current.offsetHeight);
    };
    measure();
    window.addEventListener('resize', measure);
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const p = Math.min(1, Math.max(0, window.scrollY / heroH.current));
        const r = document.documentElement;
        r.style.setProperty('--scrollp', p.toFixed(3));
        r.classList.toggle('scrolled', p > 0.04);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
    };
  }, []);

  // On page switch: manage scroll position
  React.useEffect(() => {
    const r = document.documentElement;
    if (keepCollapsedRef.current) {
      r.style.setProperty('--scrollp', '1');
      r.classList.add('scrolled');
      window.scrollTo({ top: heroH.current, behavior: 'auto' });
    } else {
      r.style.setProperty('--scrollp', '0');
      r.classList.remove('scrolled');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    keepCollapsedRef.current = false;
  }, [active]);

  if (loading || !D) return <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Loading...</div>;

  const h = D.hero;
  const isAdmin = active === 'admin';

  return (
    <>
      <div className="backdrop">
        <span className="blob b1" /><span className="blob b2" /><span className="blob b3" />
      </div>
      <div className="grid-overlay" />

      <div className="app">
        {!isAdmin && (
        <div className="herohost wrap" ref={heroRef}>
          <section className="hero glass">
            <div className="hero-grain" aria-hidden="true" />
            <div className="hero-main">
              <div className="hero-portrait" data-style="photo" aria-hidden="true">
                <img className="hp hp-photo" src="/assets/profile.png" alt="" />
                <img className="hp hp-color" src="/assets/profile-sketch.png" alt="" />
                <img className="hp hp-orange" src="/assets/profile-orange.png" alt="" />
              </div>
              <div className="hero-text">
                <div className="eyebrow">Portfolio — {new Date().getFullYear()}</div>
                <h1 className="hero-name" style={{ fontFamily: '-apple-system', fontSize: '50px' }}>{D.name}</h1>
                <div className="hero-role">
                  <span className="hero-mark">AP</span>
                  {D.role}
                </div>
                <p className="hero-statement">{h.statement}</p>
              </div>
            </div>
            <div className="hero-side">
              {h.facts.map((f) => (
                <div className="hero-fact" key={f.k}>
                  <span className="k">{f.k}</span>
                  <span className="v">{f.v}</span>
                </div>
              ))}
              <div className="hero-fact hero-edu-fact">
                <span className="k">Education</span>
                <div className="hero-edu">
                  {(h.education || []).map((e) => (
                    <div className="edu-chip" key={e.short} tabIndex={0}
                      aria-label={e.name + ' — ' + e.course + ' · ' + e.year}>
                      {e.logo ?
                        <img className="edu-logo" src={e.logo} alt={e.name} /> :
                        <span className="edu-mono">{e.short}</span>}
                      <span className="edu-pop">
                        <span className="edu-pop-name">{e.name}</span>
                        <span className="edu-pop-meta">{e.course} · {e.year}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hero-status" style={{ fontSize: '11px' }}>
                <span className="dot" />
                {D.status}
              </div>
              <div className="hero-status alt" style={{ fontSize: '11px' }}>
                <span className="dot" />
                Open for relocation
              </div>
            </div>
          </section>
        </div>
        )}

        {!isAdmin && (
        <header className="topbar">
          <div className="brand">
            <div className="mark mark-portrait">
              <img src="/assets/profile.png" alt={D.name} />
            </div>
            <div className="who">
              <b>{D.name}</b>
              <span>{D.role}</span>
            </div>
          </div>

          <div className="pillnav-wrap">
            <PillNav active={active} onChange={go} />
          </div>

          <div className="status-stack">
            <div className="status glass" style={{ fontSize: '9px', lineHeight: '0.4' }}>
              <span className="dot" />
              {D.status}
            </div>
            <div className="status glass alt" style={{ fontSize: '9px', lineHeight: '0.4' }}>
              <span className="dot" />
              Open for relocation
            </div>
          </div>
        </header>
        )}

        <main>
          <div className={'pagefx' + (entering ? ' entering' : '')} key={active}>
            <Page />
          </div>
        </main>

        {!isAdmin && (
        <footer className="foot">
          <div className="fl">© {new Date().getFullYear()} {D.name} · {D.location}</div>
          <div className="fr">
            <a href="#" onClick={(e) => e.preventDefault()}>Email</a>
            <a href="#" onClick={(e) => e.preventDefault()}>LinkedIn</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Résumé</a>
          </div>
        </footer>
        )}
      </div>
    </>
  );
}
