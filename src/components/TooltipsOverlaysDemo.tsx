import React from 'react';
import { DataGrid } from 'react-open-source-grid';
import type { Column, Row } from 'react-open-source-grid';
import { CodeBlock } from './CodeBlock';

/**
 * TooltipsOverlaysDemo - Tier-2 features:
 * - tooltipField / tooltipValueGetter (per-column cell tooltips)
 * - headerTooltip (native header tooltip)
 * - loading + loadingOverlay / noRowsOverlay
 */
export const TooltipsOverlaysDemo: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [hasRows, setHasRows] = React.useState(true);

  const allRows: Row[] = [
    { id: 1, name: 'Alpha', owner: 'Jane', ownerEmail: 'jane@acme.com', score: 92 },
    { id: 2, name: 'Bravo', owner: 'Bob', ownerEmail: 'bob@acme.com', score: 41 },
    { id: 3, name: 'Charlie', owner: 'Alice', ownerEmail: 'alice@acme.com', score: 68 },
    { id: 4, name: 'Delta', owner: 'Charlie', ownerEmail: 'charlie@acme.com', score: 55 },
  ];
  const rows = hasRows ? allRows : [];

  const columns: Column[] = [
    { field: 'id', headerName: 'ID', width: 70, sortable: true },
    {
      field: 'name',
      headerName: 'Name',
      width: 160,
      sortable: true,
      headerTooltip: 'The record name (hover this header)',
    },
    {
      // tooltipField: cell tooltip reads from another field.
      field: 'owner',
      headerName: 'Owner',
      width: 160,
      tooltipField: 'ownerEmail',
    },
    {
      // tooltipValueGetter: dynamic tooltip text.
      field: 'score',
      headerName: 'Score',
      width: 140,
      sortable: true,
      tooltipValueGetter: (_row, value) =>
        Number(value) >= 60 ? 'Passing' : 'Needs attention',
    },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      {/* Page Header */}
      <div style={{ padding: '32px 40px 24px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#ffffff' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', marginBottom: '8px', letterSpacing: '-0.01em' }}>
          Tooltips &amp; Overlays
        </h1>
        <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.5 }}>
          Per-column <code>tooltipField</code> / <code>tooltipValueGetter</code>,{' '}
          <code>headerTooltip</code>, and <code>loading</code> / <code>noRowsOverlay</code>.
        </p>
      </div>

      {/* Controls */}
      <div style={{ padding: '20px 40px', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
        <label style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="checkbox" checked={loading} onChange={(e) => setLoading(e.target.checked)} />
          loading overlay
        </label>
        <label style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="checkbox" checked={!hasRows} onChange={(e) => setHasRows(!e.target.checked)} />
          empty (no-rows overlay)
        </label>
        <span style={{ fontSize: '13px', color: '#6b7280' }}>
          Hover the <strong>Owner</strong> cells and the <strong>Name</strong> header.
        </span>
      </div>

      {/* DataGrid Container */}
      <div style={{ flex: 1, padding: '24px 40px', overflow: 'auto' }}>
        <div style={{ height: '320px' }}>
          <DataGrid
            columns={columns}
            rows={rows}
            pageSize={10}
            theme="quartz"
            loading={loading}
            loadingOverlay={<span>⏳ Loading data…</span>}
            noRowsOverlay={<span>📭 No records found</span>}
          />
        </div>

        {/* Usage Example */}
        <div style={{ marginTop: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '16px' }}>
            Usage Example
          </h3>
          <CodeBlock
            title="Tooltips and overlays"
            examples={[
              {
                label: 'TypeScript',
                language: 'tsx',
                code: `import { DataGrid } from 'react-open-source-grid';
import type { Column } from 'react-open-source-grid';

const columns: Column[] = [
  { field: 'name', headerName: 'Name', headerTooltip: 'The record name' },
  // cell tooltip read from another field
  { field: 'owner', headerName: 'Owner', tooltipField: 'ownerEmail' },
  // dynamic cell tooltip
  {
    field: 'score',
    headerName: 'Score',
    tooltipValueGetter: (row, value) => (value >= 60 ? 'Passing' : 'Needs attention'),
  },
];

<DataGrid
  columns={columns}
  rows={rows}
  loading={isLoading}
  loadingOverlay={<span>⏳ Loading data…</span>}
  noRowsOverlay={<span>📭 No records found</span>}
/>`,
              },
              {
                label: 'JavaScript',
                language: 'jsx',
                code: `<DataGrid
  columns={[
    { field: 'owner', headerName: 'Owner', tooltipField: 'ownerEmail' },
    { field: 'name', headerName: 'Name', headerTooltip: 'The record name' },
  ]}
  rows={rows}
  loading={isLoading}
  noRowsOverlay={<span>No records found</span>}
/>`,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default TooltipsOverlaysDemo;
