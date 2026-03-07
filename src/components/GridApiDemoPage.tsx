import React from 'react';
import { GridApiDemo } from 'react-open-source-grid';

export const GridApiDemoPage: React.FC = () => {
  return (
    <div style={{ 
      height: '100%',
      overflow: 'auto',
      backgroundColor: '#f8fafc'
    }}>
      <GridApiDemo />
    </div>
  );
};
