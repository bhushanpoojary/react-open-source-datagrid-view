import React from 'react';
import { DataGrid } from 'react-open-source-grid';
import type { Column, Row } from 'react-open-source-grid';
import { CodeBlock } from './CodeBlock';

/**
 * CellStylingDemo - Showcase of `cellStyle`, `cellClass` and `cellClassRules`.
 *
 * - cellStyle: static style object OR a (row, value) => style function.
 * - cellClass: static class / array / (row, value) => class function.
 * - cellClassRules: { className: (row, value) => boolean } — class applied when true.
 */
export const CellStylingDemo: React.FC = () => {
  const [rows] = React.useState<Row[]>([
    { id: 1, name: 'Alpha', status: 'Active', score: 92, change: 4.2 },
    { id: 2, name: 'Bravo', status: 'Inactive', score: 41, change: -1.8 },
    { id: 3, name: 'Charlie', status: 'Active', score: 68, change: 0 },
    { id: 4, name: 'Delta', status: 'Pending', score: 55, change: 2.1 },
    { id: 5, name: 'Echo', status: 'Inactive', score: 27, change: -3.5 },
    { id: 6, name: 'Foxtrot', status: 'Active', score: 84, change: 1.0 },
  ]);

  const columns: Column[] = [
    { field: 'id', headerName: 'ID', width: 70, sortable: true },
    { field: 'name', headerName: 'Name', width: 160, sortable: true, filterable: true },
    {
      // cellStyle as a static object.
      field: 'status',
      headerName: 'Status',
      width: 150,
      sortable: true,
      cellStyle: { fontWeight: 600 },
      // cellClass as a function -> maps status to a themed class (defined in the <style> below).
      cellClass: (_row, value) => `status-${String(value).toLowerCase()}`,
    },
    {
      // cellStyle as a function -> color scale by score.
      field: 'score',
      headerName: 'Score',
      width: 140,
      sortable: true,
      cellStyle: (_row, value) => {
        const v = Number(value);
        if (v >= 80) return { backgroundColor: '#dcfce7', color: '#166534' };
        if (v >= 50) return { backgroundColor: '#fef9c3', color: '#854d0e' };
        return { backgroundColor: '#fee2e2', color: '#991b1b' };
      },
    },
    {
      // cellClassRules -> add a class when the predicate is true.
      field: 'change',
      headerName: 'Change %',
      width: 150,
      sortable: true,
      valueFormatter: (v) => `${Number(v) > 0 ? '+' : ''}${Number(v).toFixed(1)}%`,
      cellClassRules: {
        'cell-positive': (_row, value) => Number(value) > 0,
        'cell-negative': (_row, value) => Number(value) < 0,
        'cell-neutral': (_row, value) => Number(value) === 0,
      },
    },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      {/* Scoped styles used by cellClass / cellClassRules above */}
      <style>{`
        .cell-positive { color: #16a34a; font-weight: 600; }
        .cell-negative { color: #dc2626; font-weight: 600; }
        .cell-neutral  { color: #6b7280; }
        .status-active   { color: #15803d; }
        .status-inactive { color: #b91c1c; }
        .status-pending  { color: #b45309; }
      `}</style>

      {/* Page Header */}
      <div style={{ padding: '32px 40px 24px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#ffffff' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', marginBottom: '8px', letterSpacing: '-0.01em' }}>
          Cell Styling (<code>cellStyle</code> / <code>cellClass</code> / <code>cellClassRules</code>)
        </h1>
        <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.5 }}>
          Style cells conditionally &mdash; AG Grid-style <code>cellStyle</code>, <code>cellClass</code>
          and <code>cellClassRules</code>, evaluated per row from the cell value.
        </p>
      </div>

      {/* Features */}
      <div style={{ padding: '24px 40px', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Features:
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          <div style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>🎨</span>
            <div>
              <strong>cellStyle (fn):</strong>{' '}
              <span style={{ color: '#2563eb' }}>Score cells colored by value range</span>
            </div>
          </div>
          <div style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>🏷️</span>
            <div>
              <strong>cellClass (fn):</strong>{' '}
              <span style={{ color: '#2563eb' }}>Status cells get a class per status</span>
            </div>
          </div>
          <div style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>📊</span>
            <div>
              <strong>cellClassRules:</strong>{' '}
              <span style={{ color: '#2563eb' }}>Change % is green/red/grey by sign</span>
            </div>
          </div>
        </div>
      </div>

      {/* DataGrid Container */}
      <div style={{ flex: 1, padding: '24px 40px', overflow: 'auto' }}>
        <DataGrid columns={columns} rows={rows} pageSize={10} theme="quartz" />

        {/* Usage Example */}
        <div style={{ marginTop: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '16px' }}>
            Usage Example
          </h3>
          <CodeBlock
            title="Conditional cell styling"
            examples={[
              {
                label: 'TypeScript',
                language: 'tsx',
                code: `import { DataGrid } from 'react-open-source-grid';
import type { Column } from 'react-open-source-grid';

const columns: Column[] = [
  {
    field: 'status',
    headerName: 'Status',
    cellStyle: { fontWeight: 600 },                 // static style
    cellClass: (row, value) => \`status-\${value.toLowerCase()}\`, // dynamic class
  },
  {
    field: 'score',
    headerName: 'Score',
    cellStyle: (row, value) => {                    // style by value
      if (value >= 80) return { backgroundColor: '#dcfce7', color: '#166534' };
      if (value >= 50) return { backgroundColor: '#fef9c3', color: '#854d0e' };
      return { backgroundColor: '#fee2e2', color: '#991b1b' };
    },
  },
  {
    field: 'change',
    headerName: 'Change %',
    cellClassRules: {                               // class when predicate is true
      'cell-positive': (row, value) => value > 0,
      'cell-negative': (row, value) => value < 0,
      'cell-neutral':  (row, value) => value === 0,
    },
  },
];

<DataGrid columns={columns} rows={rows} />`,
              },
              {
                label: 'JavaScript',
                language: 'jsx',
                code: `import { DataGrid } from 'react-open-source-grid';

const columns = [
  {
    field: 'score',
    headerName: 'Score',
    cellStyle: (row, value) =>
      value >= 80 ? { backgroundColor: '#dcfce7', color: '#166534' }
                  : { backgroundColor: '#fee2e2', color: '#991b1b' },
  },
  {
    field: 'change',
    headerName: 'Change %',
    cellClassRules: {
      'cell-positive': (row, value) => value > 0,
      'cell-negative': (row, value) => value < 0,
    },
  },
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

export default CellStylingDemo;
