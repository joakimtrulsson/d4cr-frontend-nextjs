import React from 'react';
import { Button } from '@keystone-ui/button';

function AddSectionButton({ handleSaveSection, children }) {
  return (
    <Button
      // style={{ display: 'block', marginLeft: 'auto' }}
      onClick={handleSaveSection}
      tone='active'
      weight='bold'
      size='small'
      // isBlock='true'
    >
      {children}
    </Button>
  );
}

export default AddSectionButton;
