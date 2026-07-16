/* The four pages. Exported to window. Data comes from window.PORTFOLIO. */

function ProjectsPage() {
  const D = window.PORTFOLIO;
  return (
    <div className="page wrap">
      <SectionHead
        eyebrow="Selected work"
        title="Things I helped ship."
        sub="A generalist's range — zero-to-one bets, platform groundwork and growth loops. Open a card for the full story."
        meta={`${D.projects.length} projects<br/>2023 — 2025`}
      />
      <div className="gallery">
        {D.projects.map((p) => (
          <article className="pcard glass" key={p.idx}>
            <Placeholder tag={p.cover} />
            <div className="pbody">
              <div className="prow">
                <span className="pidx">{p.idx}</span>
                <span className="pyear">{p.year}</span>
              </div>
              <h3>{p.title}</h3>
              <p className="pblurb">{p.blurb}</p>
              <Chips items={p.tags} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function CasesPage() {
  const D = window.PORTFOLIO;
  return (
    <div className="page wrap">
      <SectionHead
        eyebrow="Deep dives"
        title="Case studies."
        sub="Three problems told end to end — the situation, the call I made, and what actually moved."
        meta={`${D.caseStudies.length} studies<br/>problem → outcome`}
      />
      <div className="cases">
        {D.caseStudies.map((c) => (
          <article className="case glass" key={c.idx}>
            <div className="cmain">
              <div className="ckicker">{c.idx} · {c.kicker}</div>
              <h3>{c.title}</h3>
              <div className="cblock">
                <span className="k">Problem</span>
                <p>{c.problem}</p>
              </div>
              <div className="cblock">
                <span className="k">Approach</span>
                <p>{c.approach}</p>
              </div>
              <div className="cblock out">
                <span className="k">Outcome</span>
                <p>{c.outcome}</p>
              </div>
              <div className="metrics">
                {c.metrics.map((m) => (
                  <div className="metric" key={m.l}>
                    <div className="v">{m.v}</div>
                    <div className="l">{m.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="cmedia">
              <Placeholder tag="case visual · 16:11" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function TeardownDetail({ t, onBack }) {
  const det = window.PORTFOLIO.teardownDetail;
  const fill = (s) => s.replace(/\{app\}/g, t.app);
  return (
    <div className="tdetail">
      <button className="tback" onClick={onBack}>
        <span className="arr">←</span> All teardowns
      </button>

      <header className="td-hero glass">
        <div className="td-hero-main">
          <div className="td-meta">
            <span className="tno">{t.idx}</span>
            <span className="tapp">{t.app}</span>
          </div>
          <h1>{t.title}</h1>
          <p className="td-verdict">{t.verdict}</p>
          <Chips items={t.tags} />
        </div>
        <div className="td-rating">
          <div className="rscore">{t.rating.toFixed(1)}<span>/10</span></div>
          <div className="rlabel">overall</div>
          <div className="rbar"><span style={{ width: t.rating * 10 + "%" }} /></div>
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
          {det.criteria.map((c, i) => (
            <div className="scrow2" key={c}>
              <div className="sc-k">{c}</div>
              <div className="sc-bar"><span style={{ width: t.scores[i] * 10 + "%" }} /></div>
              <div className="sc-v">{t.scores[i].toFixed(1)}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function TeardownsPage() {
  const D = window.PORTFOLIO;
  const [open, setOpen] = React.useState(null);
  const firstRun = React.useRef(true);
  // on open/close, land at the top of the content WITHOUT re-revealing the hero
  React.useEffect(() => {
    if (firstRun.current) { firstRun.current = false; return; }
    const hero = document.querySelector(".herohost");
    const top = hero ? hero.offsetHeight : 0;
    window.scrollTo({ top, behavior: "auto" });
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
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(t.idx); } }}
          >
            <div className="ttop">
              <span className="tno">{t.idx}</span>
              <span className="tlogo">{t.app.slice(0, 1)}</span>
            </div>
            <span className="tapp">{t.app}</span>
            <h3>{t.title}</h3>
            <p className="tverdict">{t.verdict}</p>
            <div className="tfoot">
              <Chips items={t.tags} />
              <span className="read">Read <span className="arr">→</span></span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function AnalyticsPage() {
  const D = window.PORTFOLIO;
  const a = D.analytics;
  return (
    <div className="page wrap">
      <SectionHead
        eyebrow="Point of view"
        title="How I think about metrics."
        meta="essay<br/>~4 min read"
      />
      <div className="essay">
        <div>
          <p className="lede">{a.lede}</p>
          <div className="enum">
            {a.sections.map((s) => (
              <div className="item" key={s.n}>
                <span className="en">{s.n}</span>
                <h4>{s.heading}</h4>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
        <aside className="sidecard glass">
          <div className="sc-h"><span>Default scorecard</span><span>◷</span></div>
          {a.principles.map((p) => (
            <div className="scrow" key={p.k}>
              <div className="k">{p.k}</div>
              <div className="v">{p.v}</div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}

Object.assign(window, { ProjectsPage, CasesPage, TeardownsPage, TeardownDetail, AnalyticsPage });
