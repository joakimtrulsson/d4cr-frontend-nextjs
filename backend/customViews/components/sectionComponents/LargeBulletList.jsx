import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { FieldContainer, FieldLabel, TextInput, Select } from '@keystone-ui/fields';
import { Button } from '@keystone-ui/button';

import Wysiwyg from '../Wysiwyg/Wysiwyg';

const listOptions = [
  { value: 'ORDERED', label: 'Ordered list' },
  { value: 'UNORDERED', label: 'Unordered list' },
];

function BulletList({
  onCloseSection,
  onChange,
  sectionsData,
  sectionIndex,
  setSectionsData,
  autoFocus,
  editData,
}) {
  // const [value, setValue] = useState({
  //   title: '',
  //   bullets: [{ bodyText: '' }],
  // });

  // Inte optimalt att göra så här.
  const [value, setValue] = useState(() => {
    if (editData) {
      return editData;
    } else {
      return {
        title: '',
        bullets: [{ bodyText: '' }],
      };
    }
  });

  useEffect(() => {
    if (editData) {
      setValue(editData);
    }
  }, [editData]);

  function handleSave() {
    if (onChange) {
      const newItem = {
        sectionType: 'BULLETLIST',
        id: uuidv4(),
        ...value,
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
        sectionType: 'MEDIATEXT',
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

  const handleAddField = () => {
    setValue((prev) => ({
      ...prev,
      bullets: [...prev.bullets, { bodyText: '' }],
    }));
  };

  const handleFieldChange = (index, fieldType, fieldValue) => {
    setValue((prev) => ({
      ...prev,
      bullets: prev.bullets.map((field, i) =>
        i === index ? { ...field, [fieldType]: fieldValue } : field
      ),
    }));
  };

  const handleRemoveField = (indexToRemove) => {
    setValue((prev) => ({
      ...prev,
      bullets: prev.bullets.filter((_, index) => index !== indexToRemove),
    }));
  };

  return (
    <FieldContainer>
      <div
        style={{
          marginBottom: '2rem',
          marginTop: '1rem',
        }}
      >
        <FieldLabel style={{ paddingTop: '0.5rem', borderTop: '1px solid #e1e5e9' }}>
          Section title:
        </FieldLabel>
        <TextInput
          autoFocus={autoFocus}
          onChange={(event) => handleChange('title', event.target.value)}
          value={value.title}
        />
      </div>

      <div
        style={{
          marginBottom: '2rem',
          marginTop: '1rem',
        }}
      >
        <FieldLabel style={{ paddingTop: '0.5rem', borderTop: '1px solid #e1e5e9' }}>
          Subheader:
        </FieldLabel>
        <TextInput
          autoFocus={autoFocus}
          onChange={(event) => handleChange('subHeader', event.target.value)}
          value={value.subHeader}
        />
      </div>

      <div>
        <FieldLabel style={{ paddingTop: '0.5rem', borderTop: '1px solid #e1e5e9' }}>
          List type:
        </FieldLabel>
        <Select
          value={listOptions.find((option) => option.value === value.listType)}
          options={listOptions}
          onChange={(selectedOption) => handleChange('listType', selectedOption.value)}
        />
      </div>

      {value.bullets.map((field, index) => {
        return (
          <div key={index} style={{ marginBottom: '1rem', marginTop: '1rem' }}>
            <FieldLabel>{`Body Text ${index + 1}`}</FieldLabel>

            <Wysiwyg
              onSetPreamble={(preamble) => handleFieldChange(index, 'bodyText', preamble)}
              editData={field.bodyText}
              extended={false}
            />
            <Button
              onClick={() => handleRemoveField(index)}
              style={{
                marginTop: '1rem',
                backgroundColor: '#fef3f2',
                color: '#dc2627',
              }}
            >
              Remove Entry
            </Button>
          </div>
        );
      })}

      <div style={{ borderTop: '1px solid #e1e5e9' }}>
        <Button
          style={{ marginTop: '1rem', marginRight: '0.5rem' }}
          onClick={handleAddField}
        >
          Add Field
        </Button>

        {editData ? (
          <Button style={{ marginTop: '1rem' }} onClick={handleSaveUpdate}>
            Update
          </Button>
        ) : (
          <Button style={{ marginTop: '1rem' }} onClick={handleSave}>
            Add Bulletlist section
          </Button>
        )}
        {editData && (
          <Button
            style={{
              marginTop: '1rem',
              marginLeft: '0.5rem',
              backgroundColor: '#fef3f2',
              color: '#dc2627',
            }}
            onClick={onCloseSection}
          >
            Cancel
          </Button>
        )}
      </div>
    </FieldContainer>
  );
}

export default BulletList;
