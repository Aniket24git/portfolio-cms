import React from 'react';

/* Without a boundary a single render throw unmounts the whole tree and the page
   goes blank. Content is user-editable, so a bad field should cost one section,
   not the entire site. */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Render error caught by ErrorBoundary:', error, info?.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="page wrap">
        <div className="errbox glass">
          <div className="eyebrow">Something broke</div>
          <h2>This section could not be displayed.</h2>
          <p>
            The saved content for this page is missing a field it needs. The rest of
            the site is unaffected.
          </p>
          <pre className="errdetail">{String(this.state.error?.message || this.state.error)}</pre>
          <button className="tback" onClick={() => this.setState({ error: null })}>
            <span className="arr">←</span> Try again
          </button>
        </div>
      </div>
    );
  }
}
