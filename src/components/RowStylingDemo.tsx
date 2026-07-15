import React from 'react';
import { DataGrid } from 'react-open-source-grid';
import type { Column, Row } from 'react-open-source-grid';
import { CodeBlock } from './CodeBlock';

/**
 * RowStylingDemo - grid-level row hooks:
 * - rowStyle: static object or (row, rowIndex) => style
 * - rowClass: static / array / (row, rowIndex) => class
 * - rowClassRules: { className: (row, rowIndex) => boolean }
 * - getRowHeight: (row, rowIndex) => number  (per-row height)
 */
export const RowStylingDemo: React.FC = () => {
  const [rows] = React.useState<Row[]>([
    { id: 1, name: 'Alpha', status: 'active', priority: 'high', size: 'tall' },
    { id: 2, name: 'Bravo', status: 'inactive', priority: 'low', size: 'normal' },
    { id: 3, name: 'Charlie', status: 'active', priority: 'critical', size: 'normal' },
    { id: 4, name: 'Delta', status: 'active', priority: 'low', size: 'tall' },
    { id: 5, name: 'Echo', status: 'inactive', priority: 'high', size: 'normal' },
  ]);

  const columns: Column[] = [
    { field: 'id', headerName: 'ID', width: 70, sortable: true },
    { field: 'name', headerName: 'Name', width: 160, sortable: true, filterable: true },
    { field: 'status', headerName: 'Status', width: 140, sortable: true },
    { field: 'priority', headerName: 'Priority', width: 140, sortable: true },
    { field: 'size', headerName: 'Row Size', width: 140 },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      {/* Scoped styles for rowClass / rowClassRules */}
      <style>{`
        .row-inactive { opacity: 0.55; }
        .row-critical { background-color: #fef2f2 !important; }
        .row-critical:hover { background-color: #fee2e2 !important; }
      `}</style>

      {/* Page Header */}
      <div style={{ padding: '32px 40px 24px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#ffffff' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', marginBottom: '8px', letterSpacing: '-0.01em' }}>
          Row Styling &amp; Height
        </h1>
        <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.5 }}>
          AG Grid-style row hooks: <code>rowStyle</code>, <code>rowClass</code>,{' '}
          <code>rowClassRules</code> and <code>getRowHeight</code>.
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
            <div><strong>rowClassRules:</strong>{' '}<span style={{ color: '#2563eb' }}>inactive rows dimmed, critical rows red</span></div>
          </div>
          <div style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>🖌️</span>
            <div><strong>rowStyle (fn):</strong>{' '}<span style={{ color: '#2563eb' }}>high-priority rows get a left accent border</span></div>
          </div>
          <div style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>📐</span>
            <div><strong>getRowHeight:</strong>{' '}<span style={{ color: '#2563eb' }}>rows marked “tall” are 64px</span></div>
          </div>
        </div>
      </div>

      {/* DataGrid Container */}
      <div style={{ flex: 1, padding: '24px 40px', overflow: 'auto' }}>
        <DataGrid
          columns={columns}
          rows={rows}
          pageSize={10}
          theme="quartz"
          rowClassRules={{
            'row-inactive': (row) => row.status === 'inactive',
            'row-critical': (row) => row.priority === 'critical',
          }}
          rowStyle={(row) =>
            row.priority === 'high' ? { borderLeft: '3px solid #2563eb' } : undefined
          }
          getRowHeight={(row) => (row.size === 'tall' ? 64 : undefined)}
        />

        {/* Usage Example */}
        <div style={{ marginTop: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '16px' }}>
            Usage Example
          </h3>
          <CodeBlock
            title="Row styling and height"
            examples={[
              {
                label: 'TypeScript',
                language: 'tsx',
                code: `import { DataGrid } from 'react-open-source-grid';

<DataGrid
  columns={columns}
  rows={rows}
  // conditional row classes
  rowClassRules={{
    'row-inactive': (row) => row.status === 'inactive',
    'row-critical': (row) => row.priority === 'critical',
  }}
  // per-row inline style
  rowStyle={(row) =>
    row.priority === 'high' ? { borderLeft: '3px solid #2563eb' } : undefined
  }
  // per-row height
  getRowHeight={(row) => (row.size === 'tall' ? 64 : undefined)}
/>`,
              },
              {
                label: 'JavaScript',
                language: 'jsx',
                code: `<DataGrid
  columns={columns}
  rows={rows}
  rowClass={(row) => (row.status === 'inactive' ? 'row-inactive' : undefined)}
  rowStyle={{ fontVariantNumeric: 'tabular-nums' }}
  getRowHeight={(row) => (row.size === 'tall' ? 64 : 40)}
/>`,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default RowStylingDemo;
