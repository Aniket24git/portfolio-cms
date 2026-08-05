import React from 'react';
import { useStore } from '../store';
import { Placeholder } from '../components/Placeholder';
import { Chips } from '../components/Chips';
import { SectionHead } from '../components/SectionHead';

/* This page used to read a.lede / a.sections / a.principles, none of which exist
   in analyticsSchema (or in any saved content). Every visit threw on .map of
   undefined, which — before the error boundary — unmounted the whole site.
   Render the shape the data actually has: intro + projects. */
export function AnalyticsPage() {
  const { data: D } = useStore();
  const a = D.analytics || {};
  const projects = a.projects || [];

  return (
    <div className="page wrap">
      <SectionHead
        eyebrow="Metrics & experimentation"
        title="How I think with data."
        sub={a.intro}
        meta={[`${projects.length} projects`, 'funnels · cohorts · tests']}
      />
      <div className="gallery">
        {projects.map((p) => (
          <article className="pcard acard glass" key={p.id || p.idx}>
            <Placeholder tag={p.cover} />
            <div className="pbody">
              <div className="prow">
                <span className="pidx">{p.idx}</span>
                <span className="pyear">{p.year}</span>
              </div>
              <h3>{p.title}</h3>
              <p className="pblurb">{p.blurb}</p>
              {p.stat && (
                <div className="astat">
                  <span className="v">{p.stat.v}</span>
                  <span className="l">{p.stat.l}</span>
                </div>
              )}
              <Chips items={p.tags || []} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
