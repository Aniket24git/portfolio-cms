import React from 'react';

export function Placeholder({ tag, className = '' }) {
  return (
    <div className={'ph ' + className}>
      <span className="corner tl" /><span className="corner tr" />
      <span className="corner bl" /><span className="corner br" />
      <span className="ph-tag">{tag}</span>
    </div>
  );
}
