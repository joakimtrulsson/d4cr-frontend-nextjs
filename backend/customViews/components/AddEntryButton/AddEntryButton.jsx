import React from 'react';
import { Button } from '@keystone-ui/button';

function AddEntryButton({ handleAdd, children }) {
  return (
    <Button
      style={{ marginTop: '1rem', marginRight: '0.5rem' }}
      onClick={handleAdd}
      tone='positive'
      weight='bold'
      size='small'
    >
      {children}
    </Button>
  );
}

export default AddEntryButton;
