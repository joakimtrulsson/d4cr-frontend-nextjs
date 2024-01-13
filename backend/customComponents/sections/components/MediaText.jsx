import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  FieldContainer,
  FieldLabel,
  TextInput,
  Select,
  selectComponents,
} from '@keystone-ui/fields';
import { Button } from '@keystone-ui/button';

import SimpleWysiwyg from './SimpleWysiwyg/SimpleWysiwyg.jsx';

import { styles } from '../styles.js';

function MediaText({ sectionsData, onChange, autoFocus }) {
  const [value, setValue] = useState({});
  // const [selectedOption, setSelectedOption] = useState({ value: '1' });

  function handleAddToSectionsData() {
    if (onChange) {
      const newItem = {
        id: uuidv4(),
        sectionType: 'MEDIATEXT',
        ...value,
      };
      const sectionsCopy = [...sectionsData, newItem];
      onChange(JSON.stringify(sectionsCopy));
    }
  }

  function setTitle(title) {
    if (onChange) {
      setValue((prev) => ({
        ...prev,
        title,
      }));
    }
  }

  function setSubHeading(subHeading) {
    setValue((prev) => ({
      ...prev,
      subHeading,
    }));
  }

  function setPremble(preamble) {
    setValue((prev) => ({
      ...prev,
      preamble,
    }));
  }

  function setBackgroundColor(color) {
    setValue((prev) => ({
      ...prev,
      backgroundColor: color.target.value,
    }));
  }

  function setImagePosition(position) {
    setValue((prev) => ({
      ...prev,
      imagePosition: position.target.value,
    }));
  }

  const colorOptions = [
    { value: 'ORANGE', label: 'Orange' },
    { value: 'YELLOW', label: 'Yellow' },
  ];

  const imageOptions = [
    { value: 'LEFT', label: 'Left' },
    { value: 'RIGHT', label: 'Right' },
  ];

  return (
    <FieldContainer>
      {/* <FieldLabel>Add an image and text</FieldLabel> */}
      <div className={styles.form.field}>
        <FieldLabel>Title:</FieldLabel>
        <TextInput
          autoFocus={autoFocus}
          onChange={(event) => setTitle(event.target.value)}
          value={value.title}
        />
      </div>
      <div className={styles.form.field}>
        <FieldLabel>Subheading:</FieldLabel>
        <TextInput
          autoFocus={autoFocus}
          onChange={(event) => setSubHeading(event.target.value)}
          value={value.subHeading}
        />
      </div>

      <div className={styles.form.field}>
        <FieldLabel>Background color:</FieldLabel>
        <Select value={value.backgroundColor} options={colorOptions} />

        {/* <select
          className='selectOption'
          value={value.backgroundColor}
          onChange={setBackgroundColor}
          defaultValue={'ORANGE'}
        >
          <option value='ORANGE'>Orange</option>
          <option value='YELLOW'>Yellow</option>
        </select> */}
      </div>

      <div className={styles.form.field}>
        <FieldLabel>Image position:</FieldLabel>

        <Select value={value.imagePosition} options={imageOptions} />
      </div>

      <div className={styles.form.field}>
        <FieldLabel>Image:</FieldLabel>
        {/* <TextInput
          autoFocus={autoFocus}
          onChange={(event) => setSubHeading(event.target.value)}
          value={value.subHeading}
        /> */}
      </div>

      <div
        style={{ flexDirection: 'column', alignItems: 'flex-start' }}
        className={styles.form.field}
      >
        <FieldLabel style={{ marginRight: 'auto' }}>Preamble:</FieldLabel>
        <SimpleWysiwyg onSetPremble={setPremble} />
      </div>
      <Button style={{ marginTop: '1rem' }} onClick={handleAddToSectionsData}>
        Add Media + Text Section
      </Button>
    </FieldContainer>
  );
}

export default MediaText;
