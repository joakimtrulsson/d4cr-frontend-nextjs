import React, { useEffect, useState } from 'react';

import { FieldContainer, FieldLabel, FieldDescription } from '@keystone-ui/fields';

import ChapterTeaser from './components/ChapterTeaser';
import LargeBulletList from './components/LargeBulletList';
import MediaText from './components/MediaText';
import SelectSections from './components/SelectSections';
import StoredSections from './components/StoredSections';

const options = [
  { value: 'Select', label: 'Select' },
  { value: 'MEDIATEXT', label: 'Media + Text' },
  { value: 'CHAPTERTEASER', label: 'Chapter Teaser' },
  { value: 'NEWSTEASER', label: 'News Teaser' },
  { value: 'BULLETLIST', label: 'Large Bullet List' },
  { value: 'ACCORDION', label: 'Accordion' },
  { value: 'BANNER', label: 'Banner' },
  { value: 'WYSIWYG', label: 'WYSIWYG' },
];

export const Field = ({ field, value, onChange, autoFocus }) => {
  const [sectionsData, setSectionsData] = useState(value ? JSON.parse(value) : []);
  const [activeSection, setActiveSection] = useState('');

  const [editFormData, setEditFormData] = useState();

  const handleActiveSection = (event) => {
    setActiveSection(event.value);
  };

  const handleEditSection = (sectionId) => {
    const sectionToEditData = sectionsData.find((section) => section.id === sectionId);
    const sectionIndex = sectionsData.findIndex((section) => section.id === sectionId);
    setEditFormData({ sectionData: sectionToEditData, sectionIndex });
  };

  const handleDeleteSection = (sectionId) => {
    if (onChange) {
      const updatedSectionsData = sectionsData.filter((item) => item.id !== sectionId);
      // setSectionsData(updatedSectionsData);
      setSectionsData(() => [...updatedSectionsData]);
      onChange(JSON.stringify(sectionsData));
    }
  };

  const handleCloseSection = () => {
    setEditFormData();
    setActiveSection(options[0].value);
  };

  return (
    <FieldContainer>
      {/* Renderar Dropdown menyn */}
      <FieldLabel>{field.label}</FieldLabel>
      <SelectSections
        activeSection={activeSection}
        onChangeActiveSections={handleActiveSection}
        options={options}
      />

      {/* Renderar sektioner */}
      {!editFormData && activeSection === 'CHAPTERTEASER' && (
        <ChapterTeaser
          onChange={onChange}
          sectionsData={sectionsData}
          setSectionsData={setSectionsData}
          onCloseSection={handleCloseSection}
        />
      )}
      {!editFormData && activeSection === 'MEDIATEXT' && (
        <MediaText
          sectionsData={sectionsData}
          setSectionsData={setSectionsData}
          onCloseSection={handleCloseSection}
          onChange={onChange}
          autoFocus={autoFocus}
        />
      )}

      {/* Renderar Edit */}

      {editFormData && editFormData.sectionData.sectionType === 'MEDIATEXT' && (
        <MediaText
          sectionsData={sectionsData}
          editData={editFormData.sectionData}
          sectionIndex={editFormData.sectionIndex}
          onCloseSection={handleCloseSection}
          // onUpdateSection={handleUpdateSection}
          onChange={onChange}
          autoFocus={autoFocus}
        />
      )}

      {/* Renderar sparade sektioner */}
      <FieldLabel style={{ marginTop: '1rem', marginBottom: '-1rem' }}>
        Stored Sections
      </FieldLabel>
      {sectionsData.length === 0 ? (
        <FieldDescription>
          <p>No sections stored</p>
        </FieldDescription>
      ) : (
        <StoredSections
          sectionsData={sectionsData}
          setSectionsData={setSectionsData}
          onEditSection={handleEditSection}
          onDelete={handleDeleteSection}
          onChange={onChange}
        />
      )}
    </FieldContainer>
  );
};
