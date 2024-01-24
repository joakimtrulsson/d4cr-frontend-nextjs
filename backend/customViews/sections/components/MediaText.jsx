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
import ImageUpload from './ImageUpload/ImageUpload.jsx';

import { styles } from '../styles.js';
import { deleteImages } from '../utils/deleteImages.js';
import { uploadImage } from '../utils/uploadImage.js';

function MediaText({
  onCloseSection,
  sectionsData,
  onChange,
  autoFocus,
  editData,
  sectionIndex,
  setSectionsData,
}) {
  const [value, setValue] = useState({ cta: [{}, {}] });
  // const [file, setFile] = useState(editData?.image || {});
  const [file, setFile] = useState({});

  const [colorOptions] = useState([
    { value: 'ORANGE', label: 'Orange' },
    { value: 'YELLOW', label: 'Yellow' },
  ]);

  const [imageOptions] = useState([
    { value: 'LEFT', label: 'Left' },
    { value: 'RIGHT', label: 'Right' },
  ]);

  const [borderOptions] = useState([
    { value: 'TOPBOTTOM', label: 'Top & Bottom' },
    { value: 'TOP', label: 'Top Only' },
    { value: 'BOTTOM', label: 'Bottom Only' },
  ]);

  useEffect(() => {
    if (!editData) {
      return;
    }
    setValue(editData);
  }, [editData]);

  // async function uploadImage(id) {
  //   if (!file) {
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('image', file.file);
  //   formData.append('id', id);

  //   try {
  //     const response = await fetch('http://localhost:3000/api/imageupload', {
  //       method: 'PATCH',
  //       headers: {
  //         ...(formData instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
  //       },
  //       body: formData,
  //     });

  //     const data = await response.json();

  //     if (data.success === 'true') {
  //       return data.imageUrls;
  //     }
  //   } catch (error) {
  //     return error.message;
  //   }
  // }

  async function handleSave() {
    if (onChange) {
      const newId = uuidv4();
      if (!file) {
        return;
      }

      const imageUrl = await uploadImage(file, newId);

      // Kontrollera att fält i är ifyllda innan du lägger till i sectionsData

      const newItem = {
        sectionType: 'MEDIATEXT',
        id: newId,
        image: imageUrl,
        ...value,
      };

      setSectionsData((prevSectionsData) => [...prevSectionsData, newItem]);
      onChange(JSON.stringify([...sectionsData, newItem]));
      onCloseSection();
    }
  }

  async function handleSaveUpdate(event) {
    event.preventDefault();

    console.log(editData, file);
    // Om bilden har blivit uppdaterad så ska den gamla bilden raderas.
    if (file) {
      // Delete old image here
      const imageUrlsToDelete = editData.image[0].imageUrls;
      const responses = await deleteImages(imageUrlsToDelete);
    }

    const imageUrl = await uploadImage(file, editData.id);

    if (onChange) {
      const updatedSection = {
        sectionType: 'MEDIATEXT',
        id: editData.id,
        ...value,
        image: imageUrl,
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
    setValue((prev) => ({
      ...prev,
      [key]: inputValue,
    }));
  };

  const handleCTAChange = (index, fieldType, fieldValue) => {
    setValue((prev) => ({
      ...prev,
      cta: prev.cta.map((ctaItem, i) =>
        i === index ? { ...ctaItem, [fieldType]: fieldValue } : ctaItem
      ),
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
      <div className={styles.form.field}>
        <FieldLabel>Subheading:</FieldLabel>
        <TextInput
          autoFocus={autoFocus}
          onChange={(event) => handleChange('subHeading', event.target.value)}
          value={value.subHeading}
        />
      </div>

      <div className={styles.form.field}>
        <FieldLabel>Background color:</FieldLabel>
        <Select
          value={colorOptions.find((option) => option.value === value.backgroundColor)}
          options={colorOptions}
          onChange={(selectedOption) =>
            handleChange('backgroundColor', selectedOption.value)
          }
        />
      </div>

      <div className={styles.form.field}>
        <FieldLabel>Border:</FieldLabel>
        <Select
          value={borderOptions.find((option) => option.value === value.border)}
          options={borderOptions}
          onChange={(selectedOption) => handleChange('border', selectedOption.value)}
        />
      </div>

      <div className={styles.form.field}>
        <FieldLabel>Image position:</FieldLabel>

        <Select
          value={imageOptions.find((option) => option.value === value.imagePosition)}
          options={imageOptions}
          onChange={(selectedOption) =>
            handleChange('imagePosition', selectedOption.value)
          }
        />
      </div>

      <div
        className={styles.form.field}
        style={{ flexDirection: 'column', alignItems: 'flex-start' }}
      >
        <FieldLabel>Image:</FieldLabel>

        <ImageUpload
          file={file}
          setFile={setFile}
          editData={editData?.image[0]?.imageUrls?.large}
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
        <FieldLabel>Call to action 1</FieldLabel>
        {value.cta.map((ctaItem, index) => (
          <div key={index}>
            <FieldDescription>Anchor text:</FieldDescription>
            <TextInput
              autoFocus={autoFocus}
              onChange={(event) =>
                handleCTAChange(index, 'anchorText', event.target.value)
              }
              value={ctaItem.anchorText}
              style={{ marginBottom: '0.5rem' }}
            />
            <FieldDescription>Url/Page:</FieldDescription>
            <TextInput
              style={{ marginBottom: '1rem' }}
              autoFocus={autoFocus}
              onChange={(event) => handleCTAChange(index, 'url', event.target.value)}
              value={ctaItem.url}
            />
          </div>
        ))}
      </div>

      {editData ? (
        <Button style={{ marginTop: '1rem' }} onClick={handleSaveUpdate}>
          Update
        </Button>
      ) : (
        <Button style={{ marginTop: '1rem' }} onClick={handleSave}>
          Add Media + Text Section
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

export default MediaText;
