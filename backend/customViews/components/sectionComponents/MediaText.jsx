import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { FieldContainer, FieldLabel, TextInput, Select } from '@keystone-ui/fields';

import Wysiwyg from '../Wysiwyg/Wysiwyg';
import ImageUpload from '../ImageUpload/ImageUpload';
import CallToActionForm from '../CallToActionForm/CallToActionForm.jsx';
import AddSectionButton from '../AddSectionButton/AddSectionButton.jsx';
import UpdateSectionButton from '../UpdateSectionButton/UpdateSectionButton.jsx';
import CancelButton from '../CancelButton/CancelButton.jsx';

import { deleteImages } from '../../utils/deleteImages.js';
import { uploadImage } from '../../utils/uploadImage.js';
import useFetchLinkOptions from '../../hooks/useFetchLinkOptions.jsx';

function MediaText({
  onCloseSection,
  sectionsData,
  onChange,
  autoFocus,
  editData,
  sectionIndex,
  setSectionsData,
}) {
  const [value, setValue] = useState({});
  const [file, setFile] = useState({});
  const pagesOptions = useFetchLinkOptions();
  const [pageOneValue, setPageOneValue] = useState('');
  const [pageTwoValue, setPageTwoValue] = useState('');

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

    if (editData.cta1.url && editData.cta1.url.startsWith('/')) {
      setPageOneValue(editData.cta1.url);
      setValue((prev) => ({
        ...prev,
        cta1: { ...prev.cta1, url: '' },
      }));
    }

    if (editData.cta2.url && editData.cta2.url.startsWith('/')) {
      setPageTwoValue(editData.cta2.url);
      setValue((prev) => ({
        ...prev,
        cta2: { ...prev.cta2, url: '' },
      }));
    }
  }, [editData]);

  async function handleSave() {
    if (onChange) {
      const newId = uuidv4();

      const imageUrl = await uploadImage(file, newId);

      const newItem = {
        sectionType: 'MEDIATEXT',
        id: newId,
        image: imageUrl,
        ...value,
      };

      if (pageOneValue) {
        newItem.cta1.url = pageOneValue;
      }

      if (pageTwoValue) {
        newItem.cta2.url = pageTwoValue;
      }

      setSectionsData((prevSectionsData) => [...prevSectionsData, newItem]);
      onChange(JSON.stringify([...sectionsData, newItem]));
      onCloseSection();
    }
  }

  async function handleSaveUpdate(event) {
    event.preventDefault();

    // Om bilden har blivit uppdaterad så ska den gamla bilden raderas.
    // Och den nya ska laddas upp.
    let imageUrl = '';

    if (Object.keys(file).length > 0) {
      const imageUrlsToDelete = editData.image[0].imageUrls;
      const responses = await deleteImages(imageUrlsToDelete);
      imageUrl = await uploadImage(file, editData.id);
    } else {
      imageUrl = editData.image[0];
    }

    if (onChange) {
      const updatedSection = {
        sectionType: 'MEDIATEXT',
        id: editData.id,
        ...value,
        image: imageUrl,
      };

      if (pageOneValue) {
        updatedSection.cta1.url = pageOneValue;
      }

      if (pageTwoValue) {
        updatedSection.cta1.url = pageTwoValue;
      }

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

  const handleChange = (key, inputValue, ctaIdentifier) => {
    if (ctaIdentifier === 1) {
      // Update values for the first CTA
      setPageOneValue(inputValue);
      setValue((prev) => ({
        ...prev,
        cta1: { ...prev.cta1, [key]: inputValue },
      }));
    } else if (ctaIdentifier === 2) {
      // Update values for the second CTA
      setPageTwoValue(inputValue);
      setValue((prev) => ({
        ...prev,
        cta2: { ...prev.cta2, [key]: inputValue },
      }));
    } else {
      setValue((prev) => ({
        ...prev,
        [key]: inputValue,
      }));
    }
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
        <TextInput
          autoFocus={autoFocus}
          onChange={(event) => handleChange('subHeading', event.target.value)}
          value={value.subHeading}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <FieldLabel>Background color</FieldLabel>
        <Select
          value={colorOptions.find((option) => option.value === value.backgroundColor)}
          options={colorOptions}
          onChange={(selectedOption) =>
            handleChange('backgroundColor', selectedOption.value)
          }
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <FieldLabel>Border</FieldLabel>
        <Select
          value={borderOptions.find((option) => option.value === value.border)}
          options={borderOptions}
          onChange={(selectedOption) => handleChange('border', selectedOption.value)}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <FieldLabel>Image position</FieldLabel>

        <Select
          value={imageOptions.find((option) => option.value === value.imagePosition)}
          options={imageOptions}
          onChange={(selectedOption) =>
            handleChange('imagePosition', selectedOption.value)
          }
        />
      </div>

      <div
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginBottom: '1rem',
        }}
      >
        <FieldLabel>Image</FieldLabel>

        <ImageUpload
          file={file}
          setFile={setFile}
          editData={editData?.image[0]?.imageUrls?.large}
        />
      </div>

      <div
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginBottom: '1rem',
        }}
      >
        <FieldLabel>Preamble</FieldLabel>
        <Wysiwyg
          onSetPreamble={setPreamble}
          editData={editData?.preamble}
          extended={false}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <FieldLabel>Call to action 1</FieldLabel>
        <CallToActionForm
          autoFocus={autoFocus}
          anchorText={value.cta1?.anchorText}
          pageValue={pageOneValue}
          url={value.cta1?.url}
          onChange={handleChange}
          pagesOptions={pagesOptions}
          ctaIdentifier={1}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <FieldLabel>Call to action 2</FieldLabel>
        <CallToActionForm
          autoFocus={autoFocus}
          anchorText={value.cta2?.anchorText}
          pageValue={pageTwoValue}
          url={value.cta2?.url}
          onChange={handleChange}
          pagesOptions={pagesOptions}
          ctaIdentifier={2}
        />
      </div>

      <div style={{ borderTop: '1px solid #e1e5e9' }}>
        {editData ? (
          <UpdateSectionButton handleUpdate={handleSaveUpdate}>
            Update
          </UpdateSectionButton>
        ) : (
          <AddSectionButton handleSaveSection={handleSave}>
            Add Media + Text Section
          </AddSectionButton>
        )}
        {editData && <CancelButton handleClose={onCloseSection}>Cancel</CancelButton>}
      </div>
    </FieldContainer>
  );
}

export default MediaText;
