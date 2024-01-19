import React, { useState, useEffect } from 'react';
import FormData from 'form-data';
import { v4 as uuidv4 } from 'uuid';

import {
  FieldContainer,
  FieldLabel,
  TextInput,
  Select,
  FieldDescription,
} from '@keystone-ui/fields';
import { Button } from '@keystone-ui/button';

import SimpleWysiwyg from './SimpleWysiwyg/SimpleWysiwyg.jsx';

import { styles } from '../styles.js';
import IconPicker from './IconPicker/IconPicker.jsx';

function Banner({
  onCloseSection,
  sectionsData,
  onChange,
  autoFocus,
  editData,
  sectionIndex,
  setSectionsData,
}) {
  const [iconName, setIconName] = React.useState('');
  const [value, setValue] = useState({ title: '' });

  useEffect(() => {
    if (!editData) {
      return;
    }
    setValue(editData);
    setIconName(editData.iconName);
  }, [editData]);

  async function handleSave() {
    if (onChange) {
      const newId = uuidv4();

      // Kontrollera att fält i är ifyllda innan du lägger till i sectionsData

      const newItem = {
        sectionType: 'BANNER',
        id: newId,
        iconName,
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
        sectionType: 'BANNER',
        id: editData.id,
        ...value,
        iconName,
      };

      sectionsData[sectionIndex] = updatedSection;

      onChange(JSON.stringify(sectionsData));
      onCloseSection();
    }
  }

  function setPreamble(preamble) {
    setValue((prev) => ({
      ...prev,
      preamble,
    }));
  }

  const handleChange = (key, inputValue) => {
    if (key === 'anchorText' || key === 'url') {
      setValue((prev) => ({
        ...prev,
        cta: { ...prev.cta, [key]: inputValue },
        // url: inputValue.toLowerCase().replace(/\s/g, '-'),
      }));
      return;
    }

    setValue((prev) => ({
      ...prev,
      [key]: inputValue,
    }));
  };

  return (
    <FieldContainer>
      <div className={styles.form.field}>
        <FieldLabel>Title:</FieldLabel>
        <TextInput
          autoFocus={autoFocus}
          onChange={(event) => handleChange('title', event.target.value)}
          value={value.title}
        />
      </div>

      <div
        style={{ flexDirection: 'column', alignItems: 'flex-start' }}
        className={styles.form.field}
      >
        <FieldLabel style={{ marginRight: 'auto' }}>Preamble:</FieldLabel>
        <SimpleWysiwyg onSetPreamble={setPreamble} editData={editData?.preamble} />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <FieldLabel>Call to action</FieldLabel>

        <div>
          <FieldDescription>Anchor text:</FieldDescription>
          <TextInput
            autoFocus={autoFocus}
            onChange={(event) => handleChange('anchorText', event.target.value)}
            value={value.cta?.anchorText}
            style={{ marginBottom: '0.5rem' }}
          />
          <FieldDescription>Url/Page:</FieldDescription>
          <TextInput
            style={{ marginBottom: '1rem' }}
            autoFocus={autoFocus}
            onChange={(event) => handleChange('url', event.target.value)}
            value={value.cta?.url}
          />
        </div>
      </div>

      <IconPicker value={iconName} onChange={setIconName} />

      {editData ? (
        <Button style={{ marginTop: '1rem' }} onClick={handleSaveUpdate}>
          Update
        </Button>
      ) : (
        <Button style={{ marginTop: '1rem' }} onClick={handleSave}>
          Add Banner section
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
    </FieldContainer>
  );
}

export default Banner;
