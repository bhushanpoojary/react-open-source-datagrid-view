import React from 'react';
import { DataGrid } from 'react-open-source-grid';
import type { Column, Row } from 'react-open-source-grid';
import { CodeBlock } from './CodeBlock';

/**
 * ColumnSizingDemo - Showcase of `minWidth` and `maxWidth` column props.
 *
 * - minWidth: the column can't be dragged narrower than this (default floor: 50px).
 * - maxWidth: the column can't be dragged wider than this, and an oversized
 *   initial `width` is clamped down to it.
 *
 * Try dragging the column borders to feel the clamps.
 */
export const ColumnSizingDemo: React.FC = () => {
  const [rows] = React.useState<Row[]>([
    { id: 1, code: 'A-1', name: 'Wireless Mouse', description: 'Ergonomic 2.4GHz wireless mouse with silent clicks and adjustable DPI', price: 29.99 },
    { id: 2, code: 'B-2', name: 'Mechanical Keyboard', description: 'Hot-swappable RGB mechanical keyboard with brown switches', price: 89.0 },
    { id: 3, code: 'C-3', name: '4K Monitor', description: '27-inch 4K UHD IPS monitor with USB-C and 99% sRGB coverage', price: 349.5 },
    { id: 4, code: 'D-4', name: 'USB-C Hub', description: '7-in-1 aluminum USB-C hub with HDMI, ethernet and card readers', price: 45.75 },
    { id: 5, code: 'E-5', name: 'Webcam', description: '1080p autofocus webcam with dual noise-cancelling microphones', price: 59.99 },
  ]);

  const columns: Column[] = [
    // maxWidth clamps an intentionally-large initial width down to 90px.
    { field: 'code', headerName: 'Code', width: 400, maxWidth: 90, sortable: true },
    // minWidth prevents shrinking below 140px.
    { field: 'name', headerName: 'Name', width: 180, minWidth: 140, sortable: true, filterable: true },
    // Bounded on both ends: stays between 200px and 420px.
    { field: 'description', headerName: 'Description', width: 300, minWidth: 200, maxWidth: 420 },
    { field: 'price', headerName: 'Price', width: 120, minWidth: 90, maxWidth: 160, sortable: true },
  ];

  // Flex example: these columns share the space left after the fixed 'id' column,
  // in proportion to their flex value (name gets 2x the share of the others).
  const flexColumns: Column[] = [
    { field: 'id', headerName: 'ID', width: 70, sortable: true },
    { field: 'name', headerName: 'Name (flex 2)', flex: 2, sortable: true, filterable: true },
    { field: 'code', headerName: 'Code (flex 1)', flex: 1, sortable: true },
    { field: 'price', headerName: 'Price (flex 1)', flex: 1, minWidth: 120, sortable: true },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      {/* Page Header */}
      <div style={{ padding: '32px 40px 24px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#ffffff' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', marginBottom: '8px', letterSpacing: '-0.01em' }}>
          Column Sizing (<code>minWidth</code> / <code>maxWidth</code> / <code>flex</code>)
        </h1>
        <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.5 }}>
          Constrain column widths with <code>minWidth</code> / <code>maxWidth</code>, or let columns
          fill available space with <code>flex</code> &mdash; AG Grid-style sizing. Drag the column
          borders (grid 1) or resize the window (grid 2) to see them adapt.
        </p>
      </div>

      {/* Features */}
      <div style={{ padding: '24px 40px', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Features:
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          <div style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>↔️</span>
            <div>
              <strong>minWidth:</strong>{' '}
              <span style={{ color: '#2563eb' }}>Name won&rsquo;t shrink below 140px</span>
            </div>
          </div>
          <div style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>📏</span>
            <div>
              <strong>maxWidth:</strong>{' '}
              <span style={{ color: '#2563eb' }}>Code is clamped to 90px even though width=400</span>
            </div>
          </div>
          <div style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>🔒</span>
            <div>
              <strong>Both bounds:</strong>{' '}
              <span style={{ color: '#2563eb' }}>Description stays between 200px and 420px</span>
            </div>
          </div>
          <div style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>🧲</span>
            <div>
              <strong>flex:</strong>{' '}
              <span style={{ color: '#2563eb' }}>Columns fill remaining space by ratio (see 2nd grid)</span>
            </div>
          </div>
        </div>
      </div>

      {/* DataGrid Container */}
      <div style={{ flex: 1, padding: '24px 40px', overflow: 'auto' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', marginBottom: '12px' }}>
          1. Fixed widths with <code>minWidth</code> / <code>maxWidth</code> bounds
        </h3>
        <DataGrid columns={columns} rows={rows} pageSize={10} theme="quartz" />

        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', margin: '32px 0 12px' }}>
          2. <code>flex</code> columns filling available space (resize the window to see them adapt)
        </h3>
        <DataGrid columns={flexColumns} rows={rows} pageSize={10} theme="quartz" />

        {/* Usage Example */}
        <div style={{ marginTop: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '16px' }}>
            Usage Example
          </h3>
          <CodeBlock
            title="Constraining column widths"
            examples={[
              {
                label: 'TypeScript',
                language: 'tsx',
                code: `import { DataGrid } from 'react-open-source-grid';
import type { Column, Row } from 'react-open-source-grid';

const columns: Column[] = [
  // maxWidth clamps an oversized initial width down to 90px
  { field: 'code', headerName: 'Code', width: 400, maxWidth: 90 },

  // minWidth prevents shrinking below 140px when dragging
  { field: 'name', headerName: 'Name', width: 180, minWidth: 140 },

  // Bounded on both ends: stays between 200px and 420px
  { field: 'description', headerName: 'Description', width: 300, minWidth: 200, maxWidth: 420 },

  { field: 'price', headerName: 'Price', width: 120, minWidth: 90, maxWidth: 160 },
];

<DataGrid columns={columns} rows={rows} />`,
              },
              {
                label: 'JavaScript',
                language: 'jsx',
                code: `import { DataGrid } from 'react-open-source-grid';

const columns = [
  { field: 'code', headerName: 'Code', width: 400, maxWidth: 90 },
  { field: 'name', headerName: 'Name', width: 180, minWidth: 140 },
  { field: 'description', headerName: 'Description', width: 300, minWidth: 200, maxWidth: 420 },
  { field: 'price', headerName: 'Price', width: 120, minWidth: 90, maxWidth: 160 },
];

<DataGrid columns={columns} rows={rows} />`,
              },
              {
                label: 'flex',
                language: 'tsx',
                code: `import { DataGrid } from 'react-open-source-grid';
import type { Column } from 'react-open-source-grid';

// Flex columns share the space left after fixed-width columns,
// in proportion to their flex value. Here 'name' gets twice the
// share of 'code' and 'price'. minWidth is still respected.
const columns: Column[] = [
  { field: 'id', headerName: 'ID', width: 70 },        // fixed
  { field: 'name', headerName: 'Name', flex: 2 },      // 2x share
  { field: 'code', headerName: 'Code', flex: 1 },      // 1x share
  { field: 'price', headerName: 'Price', flex: 1, minWidth: 120 },
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

export default ColumnSizingDemo;
