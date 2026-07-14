import React from 'react';
import { DataGrid } from 'react-open-source-grid';
import type { Column, Row } from 'react-open-source-grid';
import { CodeBlock } from './CodeBlock';

/**
 * DefaultSortDemo - Showcase of declarative default `sort` (and `sortIndex`) on columns.
 *
 * A column can declare an initial `sort: 'asc' | 'desc'` so the grid is sorted on
 * first render. The grid uses single-column sort, so when several columns declare
 * `sort`, the one with the lowest `sortIndex` is applied.
 */
export const DefaultSortDemo: React.FC = () => {
  const [rows] = React.useState<Row[]>([
    { id: 1, name: 'Alpha', team: 'Red', score: 68, joined: '2021-05-10' },
    { id: 2, name: 'Bravo', team: 'Blue', score: 92, joined: '2019-11-02' },
    { id: 3, name: 'Charlie', team: 'Red', score: 45, joined: '2023-01-21' },
    { id: 4, name: 'Delta', team: 'Green', score: 77, joined: '2020-07-30' },
    { id: 5, name: 'Echo', team: 'Blue', score: 88, joined: '2022-03-15' },
    { id: 6, name: 'Foxtrot', team: 'Green', score: 53, joined: '2018-09-08' },
  ]);

  // `score` is sorted descending on load (lowest sortIndex wins over `name`).
  const columns: Column[] = [
    { field: 'id', headerName: 'ID', width: 70, sortable: true },
    { field: 'name', headerName: 'Name', width: 160, sortable: true, sort: 'asc', sortIndex: 1 },
    { field: 'team', headerName: 'Team', width: 140, sortable: true, filterable: true },
    { field: 'score', headerName: 'Score', width: 130, sortable: true, sort: 'desc', sortIndex: 0 },
    { field: 'joined', headerName: 'Joined', width: 150, sortable: true },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      {/* Page Header */}
      <div style={{ padding: '32px 40px 24px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#ffffff' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', marginBottom: '8px', letterSpacing: '-0.01em' }}>
          Default Sort (<code>sort</code> / <code>sortIndex</code>)
        </h1>
        <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.5 }}>
          Sort the grid on first render with a column&rsquo;s <code>sort</code> prop &mdash;
          AG Grid-style. This grid loads sorted by <strong>Score (desc)</strong>.
        </p>
      </div>

      {/* Features */}
      <div style={{ padding: '24px 40px', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Features:
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          <div style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>⬇️</span>
            <div>
              <strong>sort: 'desc':</strong>{' '}
              <span style={{ color: '#2563eb' }}>Score column sorted on load</span>
            </div>
          </div>
          <div style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>🔢</span>
            <div>
              <strong>sortIndex:</strong>{' '}
              <span style={{ color: '#2563eb' }}>Lowest index wins (Score index 0 over Name index 1)</span>
            </div>
          </div>
          <div style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>🖱️</span>
            <div>
              <strong>Still interactive:</strong>{' '}
              <span style={{ color: '#2563eb' }}>Click any header to re-sort</span>
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
            title="Sorting on first render"
            examples={[
              {
                label: 'TypeScript',
                language: 'tsx',
                code: `import { DataGrid } from 'react-open-source-grid';
import type { Column } from 'react-open-source-grid';

const columns: Column[] = [
  { field: 'id', headerName: 'ID' },
  // Both declare a sort; the grid uses single-column sort, so the
  // column with the lowest sortIndex wins -> Score (desc).
  { field: 'name', headerName: 'Name', sort: 'asc', sortIndex: 1 },
  { field: 'score', headerName: 'Score', sort: 'desc', sortIndex: 0 },
  { field: 'joined', headerName: 'Joined' },
];

<DataGrid columns={columns} rows={rows} />`,
              },
              {
                label: 'JavaScript',
                language: 'jsx',
                code: `import { DataGrid } from 'react-open-source-grid';

const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'score', headerName: 'Score', sort: 'desc' }, // sorted on load
  { field: 'joined', headerName: 'Joined' },
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

export default DefaultSortDemo;
