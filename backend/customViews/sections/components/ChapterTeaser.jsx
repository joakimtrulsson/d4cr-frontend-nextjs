import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '@keystone-ui/button';

const mockData = [
  {
    title: 'Chapter 1',
    slug: 'chapter-1',
  },
  {
    title: 'Chapter 2',
    slug: 'chapter-2',
  },
  {
    title: 'Chapter 3',
    slug: 'chapter-3',
  },
];

function ChapterTeaser({ onCloseSection, onChange, sectionsData, setSectionsData }) {
  // Hämta alla chapters och skicka med till frontend

  function handleSave() {
    if (onChange) {
      const newItem = {
        sectionType: 'CHAPTERTEASER',
        id: uuidv4(),
        chapters: mockData,
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
