import React from 'react';
import { useStore } from '../store';
import { Placeholder } from '../components/Placeholder';
import { Chips } from '../components/Chips';
import { SectionHead } from '../components/SectionHead';

function TeardownDetail({ t, onBack }) {
  const det = t.details || { broken: [], works: [], screens: [], criteria: [] };
  const fill = (s) => s.replace(/\{app\}/g, t.app || 'App');
  return (
    <div className="tdetail">
      <button className="tback" onClick={onBack}>
        <span className="arr">←</span> All teardowns
      </button>

      <header className="td-hero glass">
        <div className="td-hero-main">
          <div className="td-meta">
            <span className="tno">{t.idx}</span>
            <span className="tapp">{t.app || 'App'}</span>
          </div>
          <h1>{t.title}</h1>
          <p className="td-verdict">{t.verdict}</p>
          <Chips items={t.tags || []} />
        </div>
        <div className="td-rating">
          <div className="rscore">{Number(t.rating || 0).toFixed(1)}<span>/10</span></div>
          <div className="rlabel">overall</div>
          <div className="rbar"><span style={{ width: Number(t.rating || 0) * 10 + '%' }} /></div>
        </div>
      </header>

      <section className="td-section">
        <div className="td-k">Context</div>
        <p className="td-lede">{fill(det.context)}</p>
      </section>

      <div className="td-cols">
        <section className="td-col">
          <div className="td-k bad">What's broken</div>
          <ul className="td-list broken">
            {det.broken.map((x, i) => <li key={i}>{fill(x)}</li>)}
          </ul>
        </section>
        <section className="td-col">
          <div className="td-k good">What works</div>
          <ul className="td-list works">
            {det.works.map((x, i) => <li key={i}>{fill(x)}</li>)}
          </ul>
        </section>
      </div>

      <section className="td-section">
        <div className="td-k">Annotated screens</div>
        <div className="td-screens">
          {det.screens.map((s, i) => (
            <figure className="td-screen" key={i}>
              <Placeholder tag={s.tag} />
              <figcaption>{fill(s.cap)}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="td-section">
        <div className="td-k">Scorecard</div>
        <div className="td-score glass">
          {det.criteria.map((c, i) => {
            const score = Number((t.scores || [])[i] || 0);
            return (
              <div className="scrow2" key={c}>
                <div className="sc-k">{c}</div>
                <div className="sc-bar"><span style={{ width: score * 10 + '%' }} /></div>
                <div className="sc-v">{score.toFixed(1)}</div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export function TeardownsPage() {
  const { data: D } = useStore();
  const [open, setOpen] = React.useState(null);
  const firstRun = React.useRef(true);
  React.useEffect(() => {
    if (firstRun.current) { firstRun.current = false; return; }
    const hero = document.querySelector('.herohost');
    const top = hero ? hero.offsetHeight : 0;
    window.scrollTo({ top, behavior: 'auto' });
  }, [open]);
  const current = open && D.teardowns.find((x) => x.idx === open);

  if (current) {
    return (
      <div className="page wrap">
        <TeardownDetail t={current} onBack={() => setOpen(null)} />
      </div>
    );
  }

  return (
    <div className="page wrap">
      <SectionHead
        eyebrow="Field notes"
        title="Product teardowns."
        sub="I take apart products I admire (and a few I don't) to keep my instincts sharp. Open a card for the full dissection."
        meta={`${D.teardowns.length} teardowns<br/>updated monthly`}
      />
      <div className="teardowns">
        {D.teardowns.map((t) => (
          <article
            className="tcard glass" key={t.idx}
            role="button" tabIndex={0}
            onClick={() => setOpen(t.idx)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(t.idx); } }}
          >
            <div className="ttop">
              <span className="tno">{t.idx}</span>
              <span className="tlogo">{(t.app || ' ').slice(0, 1)}</span>
            </div>
            <span className="tapp">{t.app || 'App'}</span>
            <h3>{t.title}</h3>
            <p className="tverdict">{t.verdict}</p>
            <div className="tfoot">
              <Chips items={t.tags || []} />
              <span className="read">Read <span className="arr">→</span></span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
