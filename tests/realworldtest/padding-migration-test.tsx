// Test file for padding migration with multi-value CSS-in-JS
import React from 'react';
import { CancelIcon } from './icons';

const MyComponent = () => {
  return (
    <input
      clearIcon: CancelIcon,
    }}
    InputProps={{
      style: { padding: 'var(--ds-core-size-05) var(--ds-core-size-05) var(--ds-core-size-05) var(--ds-core-size-08)' },
    }}
  />
  );
};

export default MyComponent;
