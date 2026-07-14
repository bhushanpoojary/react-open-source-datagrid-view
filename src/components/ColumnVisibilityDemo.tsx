import React from 'react';
import { DataGrid } from 'react-open-source-grid';
import type { Column, Row } from 'react-open-source-grid';
import { CodeBlock } from './CodeBlock';

/**
 * ColumnVisibilityDemo - Showcase of the `hide` column prop (declarative column hiding).
 *
 * Columns marked `hide: true` start hidden. Users can still re-show them from the
 * toolbar's "Columns" chooser, and the grid API can toggle visibility programmatically.
 */
export const ColumnVisibilityDemo: React.FC = () => {
  const [rows] = React.useState<Row[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', department: 'Engineering', salary: 95000, ssn: '***-**-1234', internalNote: 'Top performer' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'Design', salary: 88000, ssn: '***-**-5678', internalNote: 'Promotion pending' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', department: 'Marketing', salary: 72000, ssn: '***-**-9012', internalNote: 'New hire' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', department: 'Engineering', salary: 105000, ssn: '***-**-3456', internalNote: 'Tech lead' },
    { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', department: 'Sales', salary: 68000, ssn: '***-**-7890', internalNote: 'Quota exceeded' },
  ]);

  const columns: Column[] = [
    { field: 'id', headerName: 'ID', width: 70, sortable: true },
    { field: 'name', headerName: 'Name', width: 180, sortable: true, filterable: true },
    { field: 'email', headerName: 'Email', width: 220, sortable: true, filterable: true },
    { field: 'department', headerName: 'Department', width: 160, sortable: true, filterable: true },
    { field: 'salary', headerName: 'Salary', width: 140, sortable: true },
    // These two start hidden. Re-show them from the toolbar's "Columns" chooser.
    { field: 'ssn', headerName: 'SSN', width: 160, hide: true },
    { field: 'internalNote', headerName: 'Internal Note', width: 200, hide: true },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      {/* Page Header */}
      <div style={{ padding: '32px 40px 24px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#ffffff' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', marginBottom: '8px', letterSpacing: '-0.01em' }}>
          Column Visibility (<code>hide</code>)
        </h1>
        <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.5 }}>
          Start columns hidden with the <code>hide</code> prop &mdash; AG Grid-style declarative
          column hiding. Users can re-show hidden columns from the toolbar&rsquo;s{' '}
          <strong>Columns</strong> chooser.
        </p>
      </div>

      {/* Features */}
      <div style={{ padding: '24px 40px', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Features:
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          <div style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>🙈</span>
            <div>
              <strong>hide: true</strong>{' '}
              <span style={{ color: '#2563eb' }}>Column starts hidden (SSN &amp; Internal Note below)</span>
            </div>
          </div>
          <div style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>🧰</span>
            <div>
              <strong>Columns chooser:</strong>{' '}
              <span style={{ color: '#2563eb' }}>Re-show hidden columns from the toolbar</span>
            </div>
          </div>
          <div style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>🧩</span>
            <div>
              <strong>API-friendly:</strong>{' '}
              <span style={{ color: '#2563eb' }}>Toggle later via the grid API / layout persistence</span>
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
            title="Hiding columns with the hide prop"
            examples={[
              {
                label: 'TypeScript',
                language: 'tsx',
                code: `import { DataGrid } from 'react-open-source-grid';
import type { Column, Row } from 'react-open-source-grid';

const columns: Column[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'email', headerName: 'Email', width: 220 },
  // Start these columns hidden. Users can re-show them
  // from the toolbar's "Columns" chooser.
  { field: 'ssn', headerName: 'SSN', hide: true },
  { field: 'internalNote', headerName: 'Internal Note', hide: true },
];

<DataGrid columns={columns} rows={rows} />`,
              },
              {
                label: 'JavaScript',
                language: 'jsx',
                code: `import { DataGrid } from 'react-open-source-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'email', headerName: 'Email', width: 220 },
  { field: 'ssn', headerName: 'SSN', hide: true },
  { field: 'internalNote', headerName: 'Internal Note', hide: true },
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

export default ColumnVisibilityDemo;
