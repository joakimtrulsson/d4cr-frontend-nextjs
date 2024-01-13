import React from 'react';
import { useState } from 'react';

import { FieldContainer, FieldLabel } from '@keystone-ui/fields';

import ChapterTeaser from './components/ChapterTeaser';
import LargeBulletList from './components/LargeBulletList';
import MediaText from './components/MediaText';
import SelectSections from './components/SelectSections';
import StoredSections from './components/StoredSections';

export const Field = ({ field, value, onChange, autoFocus }) => {
  const sectionsData = value ? JSON.parse(value) : [];
  const [activeSection, setActiveSection] = useState('');

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

  const handleActiveSection = (event) => {
    setActiveSection(event.value);
  };

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      <SelectSections
        activeSections={activeSection}
        onChangeActiveSections={handleActiveSection}
        options={options}
      />

      {activeSection === 'CHAPTERTEASER' && (
        <ChapterTeaser onChange={onChange} sectionsData={sectionsData} />
      )}
      {activeSection === 'MEDIATEXT' && (
        <MediaText
          sectionsData={sectionsData}
          onChange={onChange}
          autoFocus={autoFocus}
        />
      )}
      {activeSection === 'BULLETLIST' && <LargeBulletList />}
      <FieldLabel style={{ marginTop: '1rem', marginBottom: '-1rem' }}>
        Stored Sections
      </FieldLabel>
      <StoredSections sectionsData={sectionsData} onChange={onChange} />
    </FieldContainer>
  );
};
