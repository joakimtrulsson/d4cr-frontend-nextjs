import React from 'react';
import { Button } from '@keystone-ui/button';

function UpdateSectionButton({ handleUpdate, children }) {
  return (
    <Button
      // style={{ display: 'block', marginLeft: 'auto' }}
      onClick={handleUpdate}
      tone='active'
      weight='bold'
      size='small'
      isBlock='true'
    >
      {children}
    </Button>
  );
}

export default UpdateSectionButton;
