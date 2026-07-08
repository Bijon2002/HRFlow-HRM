import React from 'react';
export const Input = ({ label, type = 'text', className = '', ...props }) => (
  <div className={`flex-col flex ${className}`} style={{ marginBottom: '1rem' }}>
    {label && <label style={{ marginBottom: '0.5rem', fontWeight: 500 }}>{label}</label>}
    <input type={type} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-light)', width: '100%' }} {...props} />
  </div>
);