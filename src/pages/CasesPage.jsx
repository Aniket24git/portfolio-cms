import React from 'react';
import { useStore } from '../store';
import { Placeholder } from '../components/Placeholder';
import { Chips } from '../components/Chips';
import { SectionHead } from '../components/SectionHead';

export function CasesPage() {
  const { data: D } = useStore();
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
              {c.visualUrl ? (
                <img src={c.visualUrl} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
              ) : (
                <Placeholder tag="case visual · 16:11" />
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
