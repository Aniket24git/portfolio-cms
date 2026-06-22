import React from 'react';

export function Chips({ items }) {
  return (
    <div className="tags">
      {items.map((t) => <span className="chip" key={t}>{t}</span>)}
    </div>
  );
}
