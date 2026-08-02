import React, { useState } from 'react';
import { DataGrid } from 'react-open-source-grid';
import type { Column, Row } from 'react-open-source-grid';
import { CodeBlock } from './CodeBlock';

/**
 * ColumnReorderingDemo - Showcase of disabling column drag-and-drop reordering.
 *
 * - `disableColumnReorder` (grid-level): turns off column-header dragging entirely.
 * - `lockPosition` (per-column): keeps a single column fixed in place while the
 *   rest of the columns can still be dragged to reorder.
 */
export const ColumnReorderingDemo: React.FC = () => {
  const [reorderDisabled, setReorderDisabled] = useState(false);

  const [rows] = useState<Row[]>([
    { id: 1, name: 'Ada Lovelace', role: 'Engineer', department: 'Platform', location: 'Remote' },
    { id: 2, name: 'Grace Hopper', role: 'Architect', department: 'Infrastructure', location: 'NYC' },
    { id: 3, name: 'Alan Turing', role: 'Researcher', department: 'AI Lab', location: 'London' },
    { id: 4, name: 'Katherine Johnson', role: 'Analyst', department: 'Data', location: 'Remote' },
    { id: 5, name: 'Margaret Hamilton', role: 'Lead Engineer', department: 'Platform', location: 'Boston' },
  ]);

  // Grid 1: reordering toggled on/off entirely via the `disableColumnReorder` prop.
  const columns: Column[] = [
    { field: 'name', headerName: 'Name', width: 180, sortable: true },
    { field: 'role', headerName: 'Role', width: 160, sortable: true },
    { field: 'department', headerName: 'Department', width: 160, sortable: true },
    { field: 'location', headerName: 'Location', width: 140, sortable: true },
  ];

  // Grid 2: 'id' is locked in place with `lockPosition`; the other columns remain draggable.
  const lockedColumns: Column[] = [
    { field: 'id', headerName: 'ID', width: 80, lockPosition: true },
    { field: 'name', headerName: 'Name', width: 180, sortable: true },
    { field: 'role', headerName: 'Role', width: 160, sortable: true },
    { field: 'department', headerName: 'Department', width: 160, sortable: true },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      {/* Page Header */}
      <div style={{ padding: '32px 40px 24px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#ffffff' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', marginBottom: '8px', letterSpacing: '-0.01em' }}>
          Disabling Column Reordering (<code>disableColumnReorder</code> / <code>lockPosition</code>)
        </h1>
        <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.5 }}>
          By default, users can drag column headers to reorder them. Use the grid-level{' '}
          <code>disableColumnReorder</code> prop to turn this off entirely, or the per-column{' '}
          <code>lockPosition</code> flag to keep a specific column fixed while others remain draggable.
        </p>
      </div>

      {/* Features */}
      <div style={{ padding: '24px 40px', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Features:
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          <div style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>🔒</span>
            <div>
              <strong>disableColumnReorder:</strong>{' '}
              <span style={{ color: '#2563eb' }}>Disables drag-to-reorder for every column in the grid</span>
            </div>
          </div>
          <div style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>📌</span>
            <div>
              <strong>lockPosition:</strong>{' '}
              <span style={{ color: '#2563eb' }}>Keeps a single column (e.g. ID) from being dragged</span>
            </div>
          </div>
        </div>
      </div>

      {/* DataGrid Container */}
      <div style={{ flex: 1, padding: '24px 40px', overflow: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', margin: 0 }}>
            1. Grid-wide toggle with <code>disableColumnReorder</code>
          </h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#374151', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={reorderDisabled}
              onChange={(e) => setReorderDisabled(e.target.checked)}
            />
            Disable column reorder
          </label>
        </div>
        <DataGrid
          columns={columns}
          rows={rows}
          pageSize={10}
          theme="quartz"
          disableColumnReorder={reorderDisabled}
        />

        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', margin: '32px 0 12px' }}>
          2. Per-column lock with <code>lockPosition</code> (try dragging &ldquo;ID&rdquo; vs. the other columns)
        </h3>
        <DataGrid columns={lockedColumns} rows={rows} pageSize={10} theme="quartz" />

        {/* Usage Example */}
        <div style={{ marginTop: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '16px' }}>
            Usage Example
          </h3>
          <CodeBlock
            title="Disabling column drag-and-drop reordering"
            examples={[
              {
                label: 'Grid-wide (disableColumnReorder)',
                language: 'tsx',
                code: `import { DataGrid } from 'react-open-source-grid';
import type { Column, Row } from 'react-open-source-grid';

const columns: Column[] = [
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'role', headerName: 'Role', width: 160 },
  { field: 'department', headerName: 'Department', width: 160 },
];

// No column headers can be dragged to reorder.
<DataGrid columns={columns} rows={rows} disableColumnReorder />`,
              },
              {
                label: 'Per-column (lockPosition)',
                language: 'tsx',
                code: `import { DataGrid } from 'react-open-source-grid';
import type { Column } from 'react-open-source-grid';

const columns: Column[] = [
  // 'id' stays fixed in place; the other columns can still be reordered.
  { field: 'id', headerName: 'ID', width: 80, lockPosition: true },
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'role', headerName: 'Role', width: 160 },
];

<DataGrid columns={columns} rows={rows} />`,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ColumnReorderingDemo;
