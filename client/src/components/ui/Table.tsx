import React from 'react';
export const Table = ({ columns, data }) => (
  <div style={{ overflowX: 'auto', width: '100%' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid var(--border-light)' }}>
          {columns.map((col, i) => <th key={i} style={{ padding: '1rem' }}>{col}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
            {row.map((cell, j) => <td key={j} style={{ padding: '1rem' }}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);