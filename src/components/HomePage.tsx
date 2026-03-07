import { useState } from 'react';
import './HomePage.css';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="hp-copy-btn"
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
    >
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
      )}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

const comparisonRows = [
  { feature: 'License', ag: 'MIT', agEnt: 'Commercial', ours: 'MIT (Free)', oursHighlight: true },
  { feature: 'Virtual Scrolling', ag: true, agEnt: true, ours: true },
  { feature: 'Tree Data / Grouping', ag: false, agEnt: true, ours: true },
  { feature: 'Server-Side Infinite Scroll', ag: false, agEnt: true, ours: true },
  { feature: 'Excel Export', ag: false, agEnt: true, ours: true },
  { feature: 'Context Menus', ag: false, agEnt: true, ours: true },
  { feature: 'Advanced Filtering', ag: 'Basic', agEnt: true, ours: true },
];

function CheckIcon() {
  return (
    <svg className="hp-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
  );
}

function CrossIcon() {
  return (
    <svg className="hp-cross" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
  );
}

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) return <CheckIcon />;
  if (value === false) return <CrossIcon />;
  return <span>{value}</span>;
}

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
    ),
    color: '#3b82f6',
    title: 'Core Grid Features',
    description: 'Pagination, sorting, row selection, responsive columns, and Excel export — all built in.',
    tags: ['Pagination', 'Sorting', 'Selection', 'Export'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
    ),
    color: '#f59e0b',
    title: 'High Performance',
    description: 'Virtual scrolling handles 100M+ rows. Infinite loading, lazy rendering, and optimized DOM updates.',
    tags: ['Virtual Scroll', '100M Rows', 'Lazy Load', 'Optimized'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
    ),
    color: '#10b981',
    title: 'Live Market Data',
    description: '1000+ real-time updates per second with flash indicators and batch rendering.',
    tags: ['Real-time', 'Flash', 'Batch', 'Streaming'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-6M6 20V10M18 20V4"/></svg>
    ),
    color: '#8b5cf6',
    title: 'Hierarchical Data',
    description: 'Tree structures with expand/collapse, parent-child relationships, and recursive rendering.',
    tags: ['Tree Data', 'Expand', 'Collapse', 'Nested'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
    ),
    color: '#ec4899',
    title: 'Row Dragging',
    description: 'Drag-and-drop reordering with visual handles, smooth animations, and reorder callbacks.',
    tags: ['Drag & Drop', 'Reorder', 'Animated'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>
    ),
    color: '#06b6d4',
    title: 'Advanced Filtering',
    description: 'Text, number, date, and boolean filters with faceted search and token-based search bar.',
    tags: ['Text', 'Number', 'Date', 'Faceted'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>
    ),
    color: '#f97316',
    title: 'Custom Renderers',
    description: 'Build rich cell components — status badges, progress bars, action buttons, and more.',
    tags: ['Badges', 'Progress', 'Actions', 'Custom'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" opacity="0.15"/></svg>
    ),
    color: '#6366f1',
    title: '10 Built-in Themes',
    description: 'Quartz, Alpine, Material, Dark, Nord, Dracula, Solarized, Monokai, One Dark, and custom themes.',
    tags: ['Quartz', 'Material', 'Dark', 'Nord'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
    ),
    color: '#14b8a6',
    title: 'Layout Persistence',
    description: 'Save and restore complete grid state — columns, filters, sorting, and visibility.',
    tags: ['Save', 'Restore', 'State', 'Columns'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
    ),
    color: '#0ea5e9',
    title: 'Accessibility (A11y)',
    description: 'WCAG 2.1 AA compliant — keyboard navigation, ARIA attributes, screen reader support.',
    tags: ['WCAG 2.1', 'Keyboard', 'ARIA', 'A11y'],
  },
];

export function HomePage() {
  return (
    <div className="hp-root">
      {/* Hero Section */}
      <section className="hp-hero">
        <div className="hp-hero-inner">
          <div className="hp-hero-badge">Open Source &middot; MIT License</div>
          <h1 className="hp-hero-title">
            The React DataGrid<br />
            <span className="hp-hero-title-accent">Built for Scale</span>
          </h1>
          <p className="hp-hero-subtitle">
            A powerful, enterprise-grade data grid for React. High-performance virtual scrolling,
            advanced filtering, real-time updates, and 10 built-in themes — all free and open source.
          </p>
          <div className="hp-hero-actions">
            <a
              href="https://github.com/bhushanpoojary/react-open-source-datagrid"
              target="_blank"
              rel="noopener noreferrer"
              className="hp-btn-primary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>
              View on GitHub
            </a>
            <a href="#install" className="hp-btn-secondary">
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="hp-stats">
        {[
          { value: '100M+', label: 'Rows Supported', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
          { value: '1,000+', label: 'Updates / Second', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
          { value: '10', label: 'Built-in Themes', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/></svg> },
          { value: '0', label: 'License Cost', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6"/></svg> },
        ].map((s) => (
          <div key={s.label} className="hp-stat-item">
            <div className="hp-stat-icon">{s.icon}</div>
            <div className="hp-stat-value">{s.value}</div>
            <div className="hp-stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Installation */}
      <section className="hp-install" id="install">
        <div className="hp-section-header">
          <h2 className="hp-section-title">Quick Start</h2>
          <p className="hp-section-desc">Get up and running in under a minute.</p>
        </div>
        <div className="hp-install-card">
          <div className="hp-install-step">
            <span className="hp-install-step-num">1</span>
            <span className="hp-install-step-label">Install the package</span>
          </div>
          <div className="hp-code-block">
            <code>npm install react-open-source-grid</code>
            <CopyButton text="npm install react-open-source-grid" />
          </div>
          <div className="hp-install-step" style={{ marginTop: '16px' }}>
            <span className="hp-install-step-num">2</span>
            <span className="hp-install-step-label">Import the styles</span>
          </div>
          <div className="hp-code-block">
            <code>import 'react-open-source-grid/dist/lib/index.css';</code>
            <CopyButton text="import 'react-open-source-grid/dist/lib/index.css';" />
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="hp-comparison">
        <div className="hp-section-header">
          <h2 className="hp-section-title">Why React DataGrid?</h2>
          <p className="hp-section-desc">Enterprise features without the enterprise price tag.</p>
        </div>
        <div className="hp-table-wrap">
          <table className="hp-table">
            <thead>
              <tr>
                <th className="hp-th hp-th-feature">Feature</th>
                <th className="hp-th">AG Grid Community</th>
                <th className="hp-th">AG Grid Enterprise ($$)</th>
                <th className="hp-th hp-th-highlight">React Open Source Grid</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={i}>
                  <td className="hp-td hp-td-feature">{row.feature}</td>
                  <td className="hp-td hp-td-center"><CellValue value={row.ag} /></td>
                  <td className="hp-td hp-td-center"><CellValue value={row.agEnt} /></td>
                  <td className="hp-td hp-td-center hp-td-ours">
                    {row.oursHighlight ? (
                      <span className="hp-badge-free">{row.ours as string}</span>
                    ) : (
                      <CellValue value={row.ours} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Features Grid */}
      <section className="hp-features">
        <div className="hp-section-header">
          <h2 className="hp-section-title">Everything You Need</h2>
          <p className="hp-section-desc">A complete toolkit for building data-intensive React applications.</p>
        </div>
        <div className="hp-features-grid">
          {features.map((f) => (
            <div key={f.title} className="hp-feature-card">
              <div className="hp-feature-icon" style={{ color: f.color, backgroundColor: `${f.color}10` }}>
                {f.icon}
              </div>
              <h3 className="hp-feature-title">{f.title}</h3>
              <p className="hp-feature-desc">{f.description}</p>
              <div className="hp-feature-tags">
                {f.tags.map((tag) => (
                  <span key={tag} className="hp-feature-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA / Getting Started */}
      <section className="hp-cta">
        <div className="hp-cta-inner">
          <h2 className="hp-cta-title">Ready to Get Started?</h2>
          <p className="hp-cta-desc">
            Explore the demos in the sidebar to see every feature in action — live examples,
            code snippets, configuration options, and performance benchmarks.
          </p>
          <div className="hp-cta-actions">
            <a
              href="https://github.com/bhushanpoojary/react-open-source-datagrid/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="hp-btn-outline"
            >
              Report an Issue
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="hp-footer">
        <p>Built with React, TypeScript, and Vite</p>
        <div className="hp-footer-links">
          <a
            href="https://github.com/bhushanpoojary/react-open-source-datagrid"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <span className="hp-footer-dot">&middot;</span>
          <a
            href="https://bhushanpoojary.github.io/react-pivot/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Pivot Table
          </a>
        </div>
      </footer>
    </div>
  );
}
