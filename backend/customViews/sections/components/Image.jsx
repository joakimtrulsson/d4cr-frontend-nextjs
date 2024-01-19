import React, { useState, useEffect } from 'react';
import FormData from 'form-data';
import { v4 as uuidv4 } from 'uuid';

import { FieldContainer, FieldLabel, TextInput } from '@keystone-ui/fields';
import { Button } from '@keystone-ui/button';

import ImageUpload from './ImageUpload/ImageUpload.jsx';

import { styles } from '../styles.js';

function Image({
  onCloseSection,
  sectionsData,
  onChange,
  autoFocus,
  editData,
  sectionIndex,
  setSectionsData,
}) {
  const [title, setTitle] = useState();
  const [prevFiles, setPrevFiles] = useState();
  const [files, setFiles] = useState(editData?.imageUrl || [{}]);
  const [fields, setFields] = useState([{ image: '' }]);
  // const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!editData) {
      return;
    }
    setTitle(editData.title);
    setPrevFiles(editData.imageUrl);
    setFields(editData.imageUrl.map((imageUrl) => ({ imageUrl })));
  }, [editData]);

  async function uploadImages(id) {
    if (!files) {
      return;
    }

    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append('image', file.file);
    });
    formData.append('id', id);

    try {
      const response = await fetch('http://localhost:3000/api/imageupload', {
        method: 'PATCH',
        headers: {
          ...(formData instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success === 'true') {
        return data.imageUrls;
      }
    } catch (error) {
      return error.message;
    }
  }

  async function handleSave() {
    if (onChange) {
      const newId = uuidv4();
      if (!files) {
        return;
      }

      const imageUrl = await uploadImages(newId);

      // Test
      const imagesWithId = imageUrl.map((image, index) => ({
        image,
        id: uuidv4(), // Adjust as needed based on your requirements
      }));

      const newItem = {
        sectionType: 'IMAGE',
        id: newId,
        title,
        imageUrl: imagesWithId,
      };

      setSectionsData((prevSectionsData) => [...prevSectionsData, newItem]);
      onChange(JSON.stringify([...sectionsData, newItem]));
      onCloseSection();
    }
  }

  async function handleSaveUpdate(event) {
    event.preventDefault();

    if (!files) return;

    const newImageUrl = await uploadImages(editData.id);
    // Test
    const imagesWithId = newImageUrl.map((image, index) => ({
      image,
      id: uuidv4(), // Adjust as needed based on your requirements
    }));

    if (onChange) {
      const updatedSection = {
        sectionType: 'IMAGE',
        id: editData.id,
        title,
        imageUrl: [...prevFiles, imagesWithId[0]],
      };

      sectionsData[sectionIndex] = updatedSection;

      onChange(JSON.stringify(sectionsData));
      onCloseSection();
    }
  }

  const handleChange = (key, inputValue) => {
    setTitle(inputValue);
  };

  const handleAddField = () => {
    if (fields.length < 3) {
      setFields((prev) => [...prev, { image: '' }]);
    }
  };

  // const handleRemoveField = (indexToRemove) => {
  //   // Tar bort fältet
  //   console.log(indexToRemove);
  //   setFields((prevFields) => prevFields.filter((_, index) => index !== indexToRemove));

  //   // Tar bort filen från files om det finns en

  //   const updatedFiles = [...files];
  //   updatedFiles.splice(indexToRemove, 1);
  //   setFiles(updatedFiles);

  //   // Tar bort filen från prevFiles om det finns en
  //   const updatedPrevFiles = [...prevFiles];
  //   updatedPrevFiles.splice(indexToRemove, 1);
  //   setPrevFiles(updatedPrevFiles);
  // };

  const handleRemoveField = (indexToRemove) => {
    setFields((prevFields) => prevFields.filter((_, index) => index !== indexToRemove));

    // Check if the file exists in the 'files' array
    if (files && files.length > indexToRemove) {
      const updatedFiles = [...files];
      updatedFiles.splice(indexToRemove, 1);
      setFiles(updatedFiles);
    }

    // Check if the file exists in the 'prevFiles' array
    if (prevFiles && prevFiles.length > indexToRemove) {
      const updatedPrevFiles = [...prevFiles];
      updatedPrevFiles.splice(indexToRemove, 1);
      setPrevFiles(updatedPrevFiles);
    }
  };
  console.log(editData);
  return (
    <FieldContainer>
      <div className={styles.form.field}>
        <FieldLabel>Title:</FieldLabel>
        <TextInput
          autoFocus={autoFocus}
          onChange={(event) => handleChange('title', event.target.value)}
          value={title}
        />
      </div>

      <div
        className={styles.form.field}
        style={{ flexDirection: 'column', alignItems: 'flex-start' }}
      >
        {fields.map((file, index) => (
          <div key={index} style={{ marginBottom: '1rem' }}>
            <FieldLabel>Image {index + 1}:</FieldLabel>
            <div style={{ display: 'flex' }}>
              <ImageUpload
                key={index}
                file={file}
                setFile={(newFile) => {
                  const updatedFiles = [...files];
                  updatedFiles[index] = newFile;
                  setFiles(updatedFiles);
                }}
                // editData={editData?.imageUrl}
                editData={editData?.imageUrl?.[index].image}
              />
              {fields.length > 1 ? (
                <Button
                  onClick={() => handleRemoveField(index)}
                  style={{
                    marginTop: '1rem',
                    marginLeft: '0.5rem',
                    backgroundColor: '#fef3f2',
                    color: '#dc2627',
                    alignSelf: 'flex-end',
                  }}
                >
                  Remove Image
                </Button>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {fields.length < 3 ? (
        <Button
          style={{ marginTop: '1rem', marginRight: '0.5rem' }}
          onClick={handleAddField}
        >
          Add Additional Image
        </Button>
      ) : (
        <Button style={{ marginTop: '1rem', marginRight: '0.5rem' }} disabled={true}>
          Max 3 images
        </Button>
      )}

      {editData ? (
        <Button style={{ marginTop: '1rem' }} onClick={handleSaveUpdate}>
          Update
        </Button>
      ) : (
        <Button style={{ marginTop: '1rem' }} onClick={handleSave}>
          Add Images section
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

export default Image;
