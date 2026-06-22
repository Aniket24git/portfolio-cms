import React from 'react';
import { useStore } from '../store';
import { SectionHead } from '../components/SectionHead';

export function AnalyticsPage() {
  const { data: D } = useStore();
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
