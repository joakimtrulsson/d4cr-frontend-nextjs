import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '@keystone-ui/button';

import { mockChapterData } from '../../../data/chapterData.js';

function ChapterTeaser({ onCloseSection, onChange, sectionsData, setSectionsData }) {
  // Hämta alla chapters och skicka med till frontend

  function handleSave() {
    if (onChange) {
      const newItem = {
        sectionType: 'CHAPTERTEASER',
        id: uuidv4(),
        chapters: mockChapterData,
      };
      setSectionsData((prevSectionsData) => [...prevSectionsData, newItem]);
      onChange(JSON.stringify([...sectionsData, newItem]));
      onCloseSection();
    }
  }

  return (
    <Button style={{ marginTop: '1rem' }} onClick={handleSave}>
      Add a Chapter Teaser section
    </Button>
  );
}

export default ChapterTeaser;
