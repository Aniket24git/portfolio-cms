import React from 'react';

/* `meta` used to be injected with dangerouslySetInnerHTML purely to honour a
   <br/>. Take the lines as an array instead — same output, no HTML sink in a
   component fed by editable content. */
export function SectionHead({ eyebrow, title, sub, meta }) {
  const lines = Array.isArray(meta) ? meta.filter(Boolean) : meta ? [meta] : [];

  return (
    <header className="sechead">
      <div className="lead">
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
      {lines.length > 0 && (
        <div className="meta">
          {lines.map((line, i) => (
            <React.Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </React.Fragment>
          ))}
        </div>
      )}
    </header>
  );
}
