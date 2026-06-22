import React from 'react';

export function SectionHead({ eyebrow, title, sub, meta }) {
  return (
    <header className="sechead">
      <div className="lead">
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
      {meta && <div className="meta" dangerouslySetInnerHTML={{ __html: meta }} />}
    </header>
  );
}
