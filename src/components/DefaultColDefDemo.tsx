import React from 'react';
import { DataGrid } from 'react-open-source-grid';
import type { Column, Row } from 'react-open-source-grid';
import { CodeBlock } from './CodeBlock';

/**
 * DefaultColDefDemo - Showcase of the grid-level `defaultColDef` prop.
 *
 * Properties in `defaultColDef` are merged into every column, so shared settings
 * (sortable, filterable, width, styling…) don't need to be repeated. Per-column
 * properties always take precedence over the defaults.
 */
export const DefaultColDefDemo: React.FC = () => {
  const [rows] = React.useState<Row[]>([
    { id: 1, name: 'Alpha', region: 'EMEA', units: 1200, revenue: 45000 },
    { id: 2, name: 'Bravo', region: 'APAC', units: 800, revenue: 32000 },
    { id: 3, name: 'Charlie', region: 'AMER', units: 1500, revenue: 61000 },
    { id: 4, name: 'Delta', region: 'EMEA', units: 640, revenue: 21000 },
    { id: 5, name: 'Echo', region: 'APAC', units: 970, revenue: 38500 },
  ]);

  // Shared defaults applied to every column.
  const defaultColDef: Partial<Column> = {
    sortable: true,
    filterable: true,
    width: 150,
  };

  const columns: Column[] = [
    { field: 'id', headerName: 'ID', width: 70 }, // overrides default width
    { field: 'name', headerName: 'Name' },        // inherits sortable/filterable/width
    { field: 'region', headerName: 'Region' },    // inherits all defaults
    { field: 'units', headerName: 'Units' },
    // Per-column props still win over defaults (here: filterable turned off).
    { field: 'revenue', headerName: 'Revenue', filterable: false, valueFormatter: (v) => `$${Number(v).toLocaleString()}` },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      {/* Page Header */}
      <div style={{ padding: '32px 40px 24px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#ffffff' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', marginBottom: '8px', letterSpacing: '-0.01em' }}>
          Default Column Definition (<code>defaultColDef</code>)
        </h1>
        <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.5 }}>
          Define shared column settings once with <code>defaultColDef</code> &mdash; AG Grid-style.
          Every column inherits them; per-column properties always take precedence.
        </p>
      </div>

      {/* Features */}
      <div style={{ padding: '24px 40px', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Features:
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          <div style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>♻️</span>
            <div>
              <strong>Shared defaults:</strong>{' '}
              <span style={{ color: '#2563eb' }}>sortable + filterable + width applied to all</span>
            </div>
          </div>
          <div style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>🎯</span>
            <div>
              <strong>Per-column wins:</strong>{' '}
              <span style={{ color: '#2563eb' }}>ID sets its own width; Revenue disables filtering</span>
            </div>
          </div>
          <div style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>🧼</span>
            <div>
              <strong>Less repetition:</strong>{' '}
              <span style={{ color: '#2563eb' }}>No need to repeat common props on every column</span>
            </div>
          </div>
        </div>
      </div>

      {/* DataGrid Container */}
      <div style={{ flex: 1, padding: '24px 40px', overflow: 'auto' }}>
        <DataGrid columns={columns} rows={rows} defaultColDef={defaultColDef} pageSize={10} theme="quartz" />

        {/* Usage Example */}
        <div style={{ marginTop: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '16px' }}>
            Usage Example
          </h3>
          <CodeBlock
            title="Sharing settings with defaultColDef"
            examples={[
              {
                label: 'TypeScript',
                language: 'tsx',
                code: `import { DataGrid } from 'react-open-source-grid';
import type { Column } from 'react-open-source-grid';

// Applied to every column
const defaultColDef: Partial<Column> = {
  sortable: true,
  filterable: true,
  width: 150,
};

const columns: Column[] = [
  { field: 'id', headerName: 'ID', width: 70 },   // overrides default width
  { field: 'name', headerName: 'Name' },          // inherits all defaults
  { field: 'region', headerName: 'Region' },
  { field: 'revenue', headerName: 'Revenue', filterable: false }, // per-column wins
];

<DataGrid columns={columns} rows={rows} defaultColDef={defaultColDef} />`,
              },
              {
                label: 'JavaScript',
                language: 'jsx',
                code: `import { DataGrid } from 'react-open-source-grid';

const defaultColDef = { sortable: true, filterable: true, width: 150 };

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name' },
  { field: 'region', headerName: 'Region' },
  { field: 'revenue', headerName: 'Revenue', filterable: false },
];

<DataGrid columns={columns} rows={rows} defaultColDef={defaultColDef} />`,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default DefaultColDefDemo;
