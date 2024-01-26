import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import useFetchChapters from '../../hooks/useFetchChapters.jsx';
// import useHandleSave from '../../hooks/useHandleSave.jsx';

import { Button } from '@keystone-ui/button';

function ChapterTeaser({ onCloseSection, onChange, sectionsData, setSectionsData }) {
  const { chapters } = useFetchChapters();

  function handleSave() {
    if (onChange) {
      const newItem = {
        sectionType: 'CHAPTERTEASER',
        id: uuidv4(),
        chapters: chapters,
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
