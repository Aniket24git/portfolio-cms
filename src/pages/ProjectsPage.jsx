import React from 'react';
import { useStore } from '../store';
import { Placeholder } from '../components/Placeholder';
import { Chips } from '../components/Chips';
import { SectionHead } from '../components/SectionHead';

export function ProjectsPage() {
  const { data: D } = useStore();
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
            {p.coverUrl ? (
               <img src={p.coverUrl} alt={p.title} style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '12px 12px 0 0', display: 'block' }} />
            ) : (
               <Placeholder tag={p.cover || 'project cover'} />
            )}
            <div className="pbody">
              <div className="prow">
                <span className="pidx">{p.idx}</span>
                <span className="pyear">{p.year}</span>
              </div>
              <h3>{p.title}</h3>
              <p className="pblurb">{p.blurb}</p>
              <Chips items={p.tags || []} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
