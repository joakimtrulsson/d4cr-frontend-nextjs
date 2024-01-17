import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { FieldContainer, FieldLabel, TextInput } from '@keystone-ui/fields';
import { Button } from '@keystone-ui/button';

import SimpleWysiwyg from './SimpleWysiwyg/SimpleWysiwyg.jsx';

function BulletList({
  onCloseSection,
  onChange,
  sectionsData,
  sectionIndex,
  setSectionsData,
  autoFocus,
  editData,
}) {
  const [value, setValue] = useState({
    title: '',
    fields: [{ heading: '', bodyText: '' }],
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
      fields: [...prev.fields, { heading: '', bodyText: '' }],
    }));
  };

  const handleFieldChange = (index, fieldType, fieldValue) => {
    setValue((prev) => ({
      ...prev,
      fields: prev.fields.map((field, i) =>
        i === index ? { ...field, [fieldType]: fieldValue } : field
      ),
    }));
  };

  const handleRemoveField = (indexToRemove) => {
    setValue((prev) => ({
      ...prev,
      fields: prev.fields.filter((_, index) => index !== indexToRemove),
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
        <FieldLabel>List type:</FieldLabel>

        <Select
          value={imageOptions.find((option) => option.value === value.imagePosition)}
          options={imageOptions}
          onChange={(selectedOption) =>
            handleChange('imagePosition', selectedOption.value)
          }
        />
      </div>

      {value.fields.map((field, index) => (
        <div key={index} style={{ marginBottom: '1rem' }}>
          <FieldLabel
            style={{
              paddingTop: '1rem',

              borderTop: '1px solid #e1e5e9',
            }}
          >{`Heading ${index + 1}`}</FieldLabel>
          <TextInput
            style={{ marginBottom: '1rem' }}
            autoFocus={autoFocus}
            onChange={(event) => handleFieldChange(index, 'heading', event.target.value)}
            value={field.heading}
          />
          <FieldLabel>{`Body Text ${index + 1}`}</FieldLabel>
          <SimpleWysiwyg
            onSetPremble={(premble) => handleFieldChange(index, 'bodyText', premble)}
            editData={field.bodyText}
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
      ))}

      {/* {editData &&
        editData.fields.map((field, index) => (
          <div key={index}>

            <FieldLabel>{`Heading ${index + 1}`}</FieldLabel>
            <TextInput
              autoFocus={autoFocus}
              onChange={(event) =>
                handleFieldChange(index, 'heading', event.target.value)
              }
              value={field.heading}
            />
            <FieldLabel>{`Body Text ${index + 1}`}</FieldLabel>
            <SimpleWysiwyg
              onSetPremble={(premble) => handleFieldChange(index, 'bodyText', premble)}
              editData={field.bodyText}
            />
          </div>
        ))} */}

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
            Add Accordion
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
