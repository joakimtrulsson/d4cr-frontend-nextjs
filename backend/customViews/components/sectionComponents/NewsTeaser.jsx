import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  FieldContainer,
  FieldLabel,
  FieldLegend,
  TextInput,
  Select,
  FieldDescription,
} from '@keystone-ui/fields';

import { mockNewsData } from '../../../data/mockNewsData.js';
import Wysiwyg from '../Wysiwyg/Wysiwyg.jsx';
import AddSectionButton from '../AddSectionButton/AddSectionButton.jsx';
import UpdateSectionButton from '../UpdateSectionButton/UpdateSectionButton.jsx';
import CancelButton from '../CancelButton/CancelButton.jsx';

function NewsTeaser({
  onCloseSection,
  sectionsData,
  onChange,
  autoFocus,
  editData,
  sectionIndex,
  setSectionsData,
}) {
  // Inte optimalt att göra så här.
  const [value, setValue] = useState(() => {
    if (editData) {
      return editData;
    } else {
      return {
        title: '',
        subHeading: '',
        selectedNews: {
          chapter: 'ALLCHAPTERS',
          category: 'ALL',
        },
      };
    }
  });

  const [mockChaptersSelection] = useState([
    { value: 'ALLCHAPTERS', label: 'All Chapters' },
    { value: 'CHAPTER1', label: 'Chapter 1' },
    { value: 'CHAPTER2', label: 'Chapter 2' },
    { value: 'CHAPTER3', label: 'Chapter 3' },
  ]);

  const [mockCategoriesSelection] = useState([
    { value: 'ALL', label: 'All categories' },
    { value: 'PODCAST', label: 'Podcasts' },
    { value: 'EVENT', label: 'Events' },
    { value: 'INFORMATIVE', label: 'Informative' },
  ]);

  useEffect(() => {
    if (!editData) {
      return;
    }
    setValue(editData);
  }, [editData]);

  async function handleSave() {
    if (onChange) {
      const newId = uuidv4();

      // Kontrollera att fält i är ifyllda innan du lägger till i sectionsData

      const newItem = {
        sectionType: 'NEWSTEASER',
        id: newId,
        ...value,
        news: mockNewsData,
      };

      setSectionsData((prevSectionsData) => [...prevSectionsData, newItem]);
      onChange(JSON.stringify([...sectionsData, newItem]));
      onCloseSection();
    }
  }

  async function handleSaveUpdate(event) {
    event.preventDefault();

    if (onChange) {
      const updatedSection = {
        sectionType: 'NEWSTEASER',
        id: editData.id,
        ...value,
      };

      sectionsData[sectionIndex] = updatedSection;

      onChange(JSON.stringify(sectionsData));
      onCloseSection();
    }
  }

  const handleChange = (key, inputValue) => {
    setValue((prev) => ({
      ...prev,
      [key]: inputValue,
    }));
  };

  function setPreamble(preamble) {
    setValue((prev) => ({
      ...prev,
      subHeading: preamble,
    }));
  }

  const handleChapterChange = (selectedOption) => {
    setValue((prev) => ({
      ...prev,
      selectedNews: {
        ...prev.selectedNews,
        chapter: selectedOption.value,
      },
    }));
  };

  const handleCategoryChange = (selectedOption) => {
    setValue((prev) => ({
      ...prev,
      selectedNews: {
        ...prev.selectedNews,
        category: selectedOption.value,
      },
    }));
  };

  return (
    <FieldContainer>
      <div style={{ marginBottom: '1rem' }}>
        <FieldLabel>Title</FieldLabel>
        <TextInput
          autoFocus={autoFocus}
          onChange={(event) => handleChange('title', event.target.value)}
          value={value.title}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <FieldLabel>Subheading</FieldLabel>
        {/* <SimpleWysiwyg onSetPreamble={setPreamble} editData={editData?.subHeading} /> */}
        <Wysiwyg
          onSetPreamble={setPreamble}
          editData={editData?.subHeading}
          extended={false}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <FieldLabel>News</FieldLabel>
        <FieldDescription>Select news to display</FieldDescription>
        <div style={{ marginBottom: '1rem' }}>
          <FieldLegend>Chapters</FieldLegend>
          <Select
            value={mockChaptersSelection.find(
              (chapter) => chapter.value === value.selectedNews.chapter
            )}
            options={mockChaptersSelection}
            onChange={handleChapterChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <FieldLegend>Categories</FieldLegend>
          <Select
            value={mockCategoriesSelection.find(
              (category) => category.value === value.selectedNews.category
            )}
            options={mockCategoriesSelection}
            onChange={handleCategoryChange}
          />
        </div>
      </div>

      <div style={{ borderTop: '1px solid #e1e5e9' }}>
        {editData ? (
          <UpdateSectionButton handleUpdate={handleSaveUpdate}>
            Update
          </UpdateSectionButton>
        ) : (
          <AddSectionButton handleSaveSection={handleSave}>
            Add News Teaser section
          </AddSectionButton>
        )}
        {editData && <CancelButton handleClose={onCloseSection}>Cancel</CancelButton>}
      </div>
    </FieldContainer>
  );
}

export default NewsTeaser;
