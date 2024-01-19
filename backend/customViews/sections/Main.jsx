import React, { useState } from 'react';

import { FieldContainer, FieldLabel, FieldDescription } from '@keystone-ui/fields';

import { options } from './utils/constants';

import ChapterTeaser from './components/ChapterTeaser';
import LargeBulletList from './components/LargeBulletList';
import MediaText from './components/MediaText';
import SelectSections from './components/SelectSections';
import StoredSections from './components/StoredSections';
import Accordion from './components/Accordion';
import Image from './components/Image';
import Banner from './components/Banner';
import NewsTeaser from './components/NewsTeaser';
import Wysiwyg from './components/Wysiwyg';

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
    setActiveSection(sectionToEditData.sectionType);
  };

  const handleDeleteSection = (sectionId) => {
    if (onChange) {
      const updatedSectionsData = sectionsData.filter((item) => item.id !== sectionId);
      // setSectionsData(updatedSectionsData);
      setSectionsData(() => [...updatedSectionsData]);
      onChange(JSON.stringify(updatedSectionsData));
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
      {!editFormData && activeSection === 'ACCORDION' && (
        <Accordion
          sectionsData={sectionsData}
          setSectionsData={setSectionsData}
          onCloseSection={handleCloseSection}
          onChange={onChange}
          autoFocus={autoFocus}
        />
      )}

      {!editFormData && activeSection === 'BULLETLIST' && (
        <LargeBulletList
          sectionsData={sectionsData}
          setSectionsData={setSectionsData}
          onCloseSection={handleCloseSection}
          onChange={onChange}
          autoFocus={autoFocus}
        />
      )}

      {!editFormData && activeSection === 'IMAGE' && (
        <Image
          sectionsData={sectionsData}
          setSectionsData={setSectionsData}
          onCloseSection={handleCloseSection}
          onChange={onChange}
          autoFocus={autoFocus}
        />
      )}

      {!editFormData && activeSection === 'BANNER' && (
        <Banner
          sectionsData={sectionsData}
          setSectionsData={setSectionsData}
          onCloseSection={handleCloseSection}
          onChange={onChange}
          autoFocus={autoFocus}
        />
      )}

      {!editFormData && activeSection === 'NEWSTEASER' && (
        <NewsTeaser
          sectionsData={sectionsData}
          setSectionsData={setSectionsData}
          onCloseSection={handleCloseSection}
          onChange={onChange}
          autoFocus={autoFocus}
        />
      )}

      {!editFormData && activeSection === 'WYSIWYG' && (
        <Wysiwyg
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

      {editFormData && editFormData.sectionData.sectionType === 'ACCORDION' && (
        <Accordion
          sectionsData={sectionsData}
          editData={editFormData.sectionData}
          sectionIndex={editFormData.sectionIndex}
          onCloseSection={handleCloseSection}
          // onUpdateSection={handleUpdateSection}
          onChange={onChange}
          autoFocus={autoFocus}
        />
      )}

      {editFormData && editFormData.sectionData.sectionType === 'BULLETLIST' && (
        <LargeBulletList
          sectionsData={sectionsData}
          editData={editFormData.sectionData}
          sectionIndex={editFormData.sectionIndex}
          onCloseSection={handleCloseSection}
          // onUpdateSection={handleUpdateSection}
          onChange={onChange}
          autoFocus={autoFocus}
        />
      )}

      {editFormData && editFormData.sectionData.sectionType === 'IMAGE' && (
        <Image
          sectionsData={sectionsData}
          editData={editFormData.sectionData}
          sectionIndex={editFormData.sectionIndex}
          onCloseSection={handleCloseSection}
          // onUpdateSection={handleUpdateSection}
          onChange={onChange}
          autoFocus={autoFocus}
        />
      )}

      {editFormData && editFormData.sectionData.sectionType === 'BANNER' && (
        <Banner
          sectionsData={sectionsData}
          editData={editFormData.sectionData}
          sectionIndex={editFormData.sectionIndex}
          onCloseSection={handleCloseSection}
          // onUpdateSection={handleUpdateSection}
          onChange={onChange}
          autoFocus={autoFocus}
        />
      )}

      {editFormData && editFormData.sectionData.sectionType === 'NEWSTEASER' && (
        <NewsTeaser
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
