import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '@keystone-ui/button';

function ChapterTeaser({ onChange, sectionsData }) {
  function handleAddToSectionsData() {
    if (onChange) {
      const newItem = {
        id: uuidv4(),
        sectionType: 'CHAPTERTEASER',
      };
      const sectionsCopy = [...sectionsData, newItem];
      onChange(JSON.stringify(sectionsCopy));
    }
  }

  return (
    <Button style={{ marginTop: '1rem' }} onClick={handleAddToSectionsData}>
      Add a Chapter Teaser
    </Button>
  );
}

export default ChapterTeaser;
