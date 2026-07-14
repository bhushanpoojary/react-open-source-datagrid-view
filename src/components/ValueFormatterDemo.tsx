import React from 'react';
import { DataGrid } from 'react-open-source-grid';
import type { Column, Row } from 'react-open-source-grid';
import { CodeBlock } from './CodeBlock';

/**
 * ValueFormatterDemo - Showcase of `valueGetter` and `valueFormatter` column props
 *
 * - valueGetter: derive a cell's value from the row (computed columns),
 *   e.g. combine first + last name, or multiply price * quantity.
 * - valueFormatter: format the resolved value into a display string,
 *   e.g. currency, percentages, dates.
 *
 * `renderCell` still takes precedence when provided. Editing continues to read
 * the raw `field` value.
 */
export const ValueFormatterDemo: React.FC = () => {
  const [rows] = React.useState<Row[]>([
    { id: 1, firstName: 'John', lastName: 'Doe', unitPrice: 1299.5, quantity: 3, discount: 0.1, hiredAt: '2021-03-15' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', unitPrice: 49.99, quantity: 12, discount: 0.25, hiredAt: '2019-11-02' },
    { id: 3, firstName: 'Bob', lastName: 'Johnson', unitPrice: 799, quantity: 1, discount: 0, hiredAt: '2023-07-21' },
    { id: 4, firstName: 'Alice', lastName: 'Williams', unitPrice: 15.75, quantity: 40, discount: 0.05, hiredAt: '2020-01-30' },
    { id: 5, firstName: 'Charlie', lastName: 'Brown', unitPrice: 249.9, quantity: 6, discount: 0.15, hiredAt: '2022-09-12' },
    { id: 6, firstName: 'Diana', lastName: 'Prince', unitPrice: 3499, quantity: 2, discount: 0.2, hiredAt: '2018-05-08' },
  ]);

  const currency = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

  const columns: Column[] = [
    { field: 'id', headerName: 'ID', width: 70, sortable: true },
    {
      // Computed column: combine first + last name. No `field` data needed to display it.
      field: 'fullName',
      headerName: 'Full Name',
      width: 200,
      sortable: true,
      valueGetter: (row) => `${row.firstName} ${row.lastName}`,
    },
    {
      // valueFormatter: format the raw numeric field into currency.
      field: 'unitPrice',
      headerName: 'Unit Price',
      width: 140,
      sortable: true,
      valueFormatter: (value) => currency(Number(value)),
    },
    {
      field: 'quantity',
      headerName: 'Qty',
      width: 90,
      sortable: true,
      editable: true,
    },
    {
      // valueFormatter: render a fraction as a percentage.
      field: 'discount',
      headerName: 'Discount',
      width: 120,
      sortable: true,
      valueFormatter: (value) => `${(Number(value) * 100).toFixed(0)}%`,
    },
    {
      // valueGetter + valueFormatter together: compute a total, then format it.
      field: 'lineTotal',
      headerName: 'Line Total',
      width: 150,
      sortable: true,
      valueGetter: (row) => row.unitPrice * row.quantity * (1 - row.discount),
      valueFormatter: (value) => currency(Number(value)),
    },
    {
      // valueFormatter for dates.
      field: 'hiredAt',
      headerName: 'Hired',
      width: 150,
      sortable: true,
      valueFormatter: (value) =>
        new Date(String(value)).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
    },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      {/* Page Header */}
      <div style={{ padding: '32px 40px 24px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#ffffff' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', marginBottom: '8px', letterSpacing: '-0.01em' }}>
          Value Getters &amp; Formatters
        </h1>
        <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.5 }}>
          Derive computed cell values with <code>valueGetter</code> and format them for display with{' '}
          <code>valueFormatter</code> &mdash; AG Grid-style column options, now in react-open-source-grid.
        </p>
      </div>

      {/* Features */}
      <div style={{ padding: '24px 40px', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Features:
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          <div style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>🧮</span>
            <div>
              <strong>valueGetter:</strong>{' '}
              <span style={{ color: '#2563eb' }}>Compute a cell value from the row (e.g. Full Name, Line Total)</span>
            </div>
          </div>
          <div style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>💵</span>
            <div>
              <strong>valueFormatter:</strong>{' '}
              <span style={{ color: '#2563eb' }}>Format values as currency, percentages, or dates</span>
            </div>
          </div>
          <div style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>🔗</span>
            <div>
              <strong>Combine both:</strong>{' '}
              <span style={{ color: '#2563eb' }}>Getter resolves the value, formatter renders it</span>
            </div>
          </div>
          <div style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>✏️</span>
            <div>
              <strong>Edit-safe:</strong>{' '}
              <span style={{ color: '#2563eb' }}>Editing still reads the raw field value (try editing Qty)</span>
            </div>
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
          onCellEdit={(rowIndex, field, value) => {
            // eslint-disable-next-line no-console
            console.log('Edited:', rowIndex, field, value);
          }}
          footerConfig={{
            show: true,
            aggregates: [{ field: 'quantity', function: 'sum', label: 'Total Qty' }],
          }}
        />

        {/* Usage Example */}
        <div style={{ marginTop: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '16px' }}>
            Usage Example
          </h3>
          <CodeBlock
            title="Using valueGetter and valueFormatter"
            examples={[
              {
                label: 'TypeScript',
                language: 'tsx',
                code: `import { DataGrid } from 'react-open-source-grid';
import type { Column, Row } from 'react-open-source-grid';

const currency = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

const columns: Column[] = [
  {
    // Computed column: combine fields (no matching data key required)
    field: 'fullName',
    headerName: 'Full Name',
    valueGetter: (row) => \`\${row.firstName} \${row.lastName}\`,
  },
  {
    // Format the raw numeric value as currency
    field: 'unitPrice',
    headerName: 'Unit Price',
    valueFormatter: (value) => currency(Number(value)),
  },
  {
    // Render a fraction as a percentage
    field: 'discount',
    headerName: 'Discount',
    valueFormatter: (value) => \`\${(Number(value) * 100).toFixed(0)}%\`,
  },
  {
    // Combine both: getter computes, formatter renders
    field: 'lineTotal',
    headerName: 'Line Total',
    valueGetter: (row) => row.unitPrice * row.quantity * (1 - row.discount),
    valueFormatter: (value) => currency(Number(value)),
  },
  {
    // Dates
    field: 'hiredAt',
    headerName: 'Hired',
    valueFormatter: (value) =>
      new Date(String(value)).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric',
      }),
  },
];

<DataGrid columns={columns} rows={rows} />`,
              },
              {
                label: 'JavaScript',
                language: 'jsx',
                code: `import { DataGrid } from 'react-open-source-grid';

const currency = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

const columns = [
  {
    field: 'fullName',
    headerName: 'Full Name',
    valueGetter: (row) => \`\${row.firstName} \${row.lastName}\`,
  },
  {
    field: 'unitPrice',
    headerName: 'Unit Price',
    valueFormatter: (value) => currency(Number(value)),
  },
  {
    field: 'lineTotal',
    headerName: 'Line Total',
    valueGetter: (row) => row.unitPrice * row.quantity * (1 - row.discount),
    valueFormatter: (value) => currency(Number(value)),
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

export default ValueFormatterDemo;
