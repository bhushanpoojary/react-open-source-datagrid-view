import React from 'react';
import { DataGrid } from 'react-open-source-grid';
import type { Column, Row } from 'react-open-source-grid';
import { CodeBlock } from './CodeBlock';

/**
 * EditingAndFilterDemo - Tier-2 features:
 * - editable as a per-row callback
 * - singleClickEdit (grid-level and per-column)
 * - quickFilterText (global search across all columns)
 */
export const EditingAndFilterDemo: React.FC = () => {
  const [quickFilter, setQuickFilter] = React.useState('');
  const [singleClick, setSingleClick] = React.useState(true);

  const [rows] = React.useState<Row[]>([
    { id: 1, name: 'Alpha', locked: false, qty: 10, note: 'ready' },
    { id: 2, name: 'Bravo', locked: true, qty: 4, note: 'on hold' },
    { id: 3, name: 'Charlie', locked: false, qty: 22, note: 'ready' },
    { id: 4, name: 'Delta', locked: true, qty: 7, note: 'blocked' },
    { id: 5, name: 'Echo', locked: false, qty: 15, note: 'ready' },
  ]);

  const columns: Column[] = [
    { field: 'id', headerName: 'ID', width: 70, sortable: true },
    { field: 'name', headerName: 'Name', width: 160, sortable: true, filterable: true },
    { field: 'locked', headerName: 'Locked', width: 110 },
    // editable only when the row isn't locked (per-row callback).
    { field: 'qty', headerName: 'Qty (editable if not locked)', width: 220, editable: (row) => !row.locked },
    { field: 'note', headerName: 'Note', width: 180, editable: true },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      {/* Page Header */}
      <div style={{ padding: '32px 40px 24px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#ffffff' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', marginBottom: '8px', letterSpacing: '-0.01em' }}>
          Editing Options &amp; Quick Filter
        </h1>
        <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.5 }}>
          AG Grid-style <code>editable</code> callbacks, <code>singleClickEdit</code>, and a global{' '}
          <code>quickFilterText</code> search.
        </p>
      </div>

      {/* Controls */}
      <div style={{ padding: '20px 40px', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          value={quickFilter}
          onChange={(e) => setQuickFilter(e.target.value)}
          placeholder="Quick filter… (searches all columns)"
          style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', minWidth: '280px' }}
        />
        <label style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="checkbox" checked={singleClick} onChange={(e) => setSingleClick(e.target.checked)} />
          singleClickEdit
        </label>
        <span style={{ fontSize: '13px', color: '#6b7280' }}>
          Tip: the <strong>Qty</strong> column is only editable when the row&rsquo;s <em>Locked</em> is false.
        </span>
      </div>

      {/* DataGrid Container */}
      <div style={{ flex: 1, padding: '24px 40px', overflow: 'auto' }}>
        <DataGrid
          columns={columns}
          rows={rows}
          pageSize={10}
          theme="quartz"
          quickFilterText={quickFilter}
          singleClickEdit={singleClick}
          onCellEdit={(rowIndex, field, value) => {
            // eslint-disable-next-line no-console
            console.log('Edited:', rowIndex, field, value);
          }}
        />

        {/* Usage Example */}
        <div style={{ marginTop: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '16px' }}>
            Usage Example
          </h3>
          <CodeBlock
            title="Editable callback, single-click edit, quick filter"
            examples={[
              {
                label: 'TypeScript',
                language: 'tsx',
                code: `import { DataGrid } from 'react-open-source-grid';
import type { Column } from 'react-open-source-grid';

const columns: Column[] = [
  { field: 'name', headerName: 'Name' },
  { field: 'locked', headerName: 'Locked' },
  // editable per-row via a callback
  { field: 'qty', headerName: 'Qty', editable: (row) => !row.locked },
  { field: 'note', headerName: 'Note', editable: true },
];

const [quick, setQuick] = useState('');

<>
  <input value={quick} onChange={(e) => setQuick(e.target.value)} />
  <DataGrid
    columns={columns}
    rows={rows}
    quickFilterText={quick}   // global search across all columns
    singleClickEdit           // start editing on a single click
  />
</>`,
              },
              {
                label: 'JavaScript',
                language: 'jsx',
                code: `import { DataGrid } from 'react-open-source-grid';

const columns = [
  { field: 'qty', headerName: 'Qty', editable: (row) => !row.locked },
  { field: 'note', headerName: 'Note', editable: true },
];

<DataGrid
  columns={columns}
  rows={rows}
  quickFilterText={quick}
  singleClickEdit
/>`,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default EditingAndFilterDemo;
