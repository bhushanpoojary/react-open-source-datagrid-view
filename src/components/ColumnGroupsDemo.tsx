import React from 'react';
import { DataGrid } from 'react-open-source-grid';
import type { Column, ColumnOrGroup } from 'react-open-source-grid';
import type { Row } from 'react-open-source-grid';
import { CodeBlock } from './CodeBlock';

/**
 * ColumnGroupsDemo - Multi-level column headers via `ColumnGroup`.
 *
 * Groups create a spanning header row above the leaf columns. Grouping is one
 * level deep in v1. Ungrouped columns occupy a single cell in the group row.
 */
export const ColumnGroupsDemo: React.FC = () => {
  const [rows] = React.useState<Row[]>([
    { id: 1, firstName: 'Jane', lastName: 'Doe', phone: '555-0101', email: 'jane@example.com', city: 'London', country: 'UK', score: 92, grade: 'A' },
    { id: 2, firstName: 'Bob', lastName: 'Smith', phone: '555-0202', email: 'bob@example.com', city: 'Paris', country: 'FR', score: 74, grade: 'B' },
    { id: 3, firstName: 'Alice', lastName: 'Jones', phone: '555-0303', email: 'alice@example.com', city: 'Berlin', country: 'DE', score: 88, grade: 'A' },
    { id: 4, firstName: 'Charlie', lastName: 'Brown', phone: '555-0404', email: 'charlie@example.com', city: 'Madrid', country: 'ES', score: 61, grade: 'C' },
  ]);

  const columns: ColumnOrGroup[] = [
    { field: 'id', headerName: 'ID', width: 70, sortable: true },
    {
      // ColumnGroup — spans firstName + lastName
      headerName: 'Personal Info',
      children: [
        { field: 'firstName', headerName: 'First Name', width: 140, sortable: true, filterable: true },
        { field: 'lastName', headerName: 'Last Name', width: 140, sortable: true, filterable: true },
      ],
    },
    {
      headerName: 'Contact',
      children: [
        { field: 'phone', headerName: 'Phone', width: 140 },
        { field: 'email', headerName: 'Email', width: 200, filterable: true },
      ],
    },
    {
      headerName: 'Location',
      children: [
        { field: 'city', headerName: 'City', width: 130, sortable: true },
        { field: 'country', headerName: 'Country', width: 110, sortable: true, filterable: true },
      ],
    },
    {
      headerName: 'Performance',
      children: [
        { field: 'score', headerName: 'Score', width: 110, sortable: true },
        { field: 'grade', headerName: 'Grade', width: 100, sortable: true },
      ],
    },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      {/* Page Header */}
      <div style={{ padding: '32px 40px 24px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#ffffff' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', marginBottom: '8px', letterSpacing: '-0.01em' }}>
          Column Groups (Multi-level Headers)
        </h1>
        <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.5 }}>
          Group leaf columns under a shared spanning header with <code>ColumnGroup</code> &mdash;
          AG Grid-style multi-level headers.
        </p>
      </div>

      {/* Features */}
      <div style={{ padding: '24px 40px', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Features:
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          <div style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span>🏷️</span>
            <div><strong>ColumnGroup:</strong>{' '}<span style={{ color: '#2563eb' }}>Spanning header row (Personal Info, Contact, Location, Performance)</span></div>
          </div>
          <div style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span>🪄</span>
            <div><strong>Mixed:</strong>{' '}<span style={{ color: '#2563eb' }}>ID is ungrouped; all others belong to a group</span></div>
          </div>
          <div style={{ fontSize: '14px', color: '#374151', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span>✅</span>
            <div><strong>Leaf features:</strong>{' '}<span style={{ color: '#2563eb' }}>Sort / filter / resize / pin work inside groups</span></div>
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
            title="Multi-level headers with ColumnGroup"
            examples={[
              {
                label: 'TypeScript',
                language: 'tsx',
                code: `import { DataGrid } from 'react-open-source-grid';
import type { Column, ColumnOrGroup } from 'react-open-source-grid';

const columns: ColumnOrGroup[] = [
  { field: 'id', headerName: 'ID', width: 70 }, // ungrouped leaf column

  {
    headerName: 'Personal Info',  // spanning group header
    children: [
      { field: 'firstName', headerName: 'First Name', width: 140 },
      { field: 'lastName', headerName: 'Last Name', width: 140 },
    ],
  },

  {
    headerName: 'Contact',
    children: [
      { field: 'phone', headerName: 'Phone', width: 140 },
      { field: 'email', headerName: 'Email', width: 200 },
    ],
  },
];

<DataGrid columns={columns} rows={rows} />`,
              },
              {
                label: 'JavaScript',
                language: 'jsx',
                code: `import { DataGrid } from 'react-open-source-grid';

const columns = [
  { field: 'id', headerName: 'ID' },
  {
    headerName: 'Personal Info',
    children: [
      { field: 'firstName', headerName: 'First Name' },
      { field: 'lastName', headerName: 'Last Name' },
    ],
  },
  {
    headerName: 'Contact',
    children: [
      { field: 'phone', headerName: 'Phone' },
      { field: 'email', headerName: 'Email' },
    ],
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

export default ColumnGroupsDemo;
