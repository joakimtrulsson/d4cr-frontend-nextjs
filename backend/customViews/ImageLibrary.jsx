import React, { useState, useEffect } from 'react';
import { ReactMediaLibrary } from 'react-media-library';
import {
  FieldContainer,
  FieldLabel,
  FieldDescription,
  TextInput,
} from '@keystone-ui/fields';

import FormData from 'form-data';

import { formatFileSize } from '../utils/formatFileSize';
import { API_URL } from '../utils/constants';
import AddEntryButton from './components/AddEntryButton/AddEntryButton';

export const Field = ({ field, value, onChange, autoFocus }) => {
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [search, setSearch] = useState('');

  const [filteredFiles, setFilteredFiles] = useState([]);

  // useEffect(() => {
  //   setFilteredFiles(
  //     files.filter((file) => file.title.toLowerCase().includes(search.toLowerCase()))
  //   );
  // }, [files, search]);

  useEffect(() => {
    const fetchData = async () => {
      if (value) {
        setSelectedFile(JSON.parse(value));
      }
      try {
        const response = await fetch(`${API_URL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Apollo-Require-Preflight': 'true',
          },
          body: JSON.stringify({
            query: `
            query {
              images {
                createdAt
                alt
                id
                size
                url
                title
              }
            }
          `,
          }),
        });

        const result = await response.json();
        // console.log(result.data.images);

        const modifiedFiles = result.data.images.map((file) => {
          return {
            ...file,
            _id: file.id,
            id: undefined,
            thumbnailUrl: file.url,
          };
        });

        setFiles(modifiedFiles);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [files]);

  const handleOpenMediaLibrary = () => {
    setIsMediaLibraryOpen((prev) => !prev);
  };

  const handleSelectFile = (file) => {
    setSelectedFile(file[0]);
    handleOpenMediaLibrary();

    onChange(JSON.stringify(file[0]));
  };

  // Export till hooks
  const handleFileUpload = async (uploadedFile) => {
    try {
      const formData = new FormData();
      formData.append(
        'operations',
        JSON.stringify({
          query: `
          mutation CreateImage($data: ImageCreateInput!) {
            createImage(data: $data) {
              id
            }
          }
        `,
          variables: {
            data: {
              title: `${uploadedFile.name}`,
              file: {
                upload: null,
              },
            },
          },
        })
      );
      formData.append('map', JSON.stringify({ 0: ['variables.data.file.upload'] }));
      formData.append('0', uploadedFile);

      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Apollo-Require-Preflight': 'true',
        },
        body: formData,
      });

      setFiles((prev) => [...prev, uploadedFile]);

      const result = await response.json();
      // result.data.createImage.id finns bara.

      if (!result.errors) return true;
      return false;
    } catch (error) {
      console.error('Error uploading file:', error);
      return false;
    }
  };

  // Export till hooks
  const handleDeleteFile = async (file) => {
    try {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Apollo-Require-Preflight': 'true',
        },
        body: JSON.stringify({
          query: `
          mutation DeleteImage($id: ID!) {
            deleteImage(where: { id: $id }) {
              id
            }
          }
    `,
          variables: {
            id: file[0]._id,
          },
        }),
      });

      const result = await response.json();

      if (!result.errors) return true;
      return false;
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const searchBar = () => (
    <TextInput
      placeholder='Search...'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{ maxWidth: '1250px', marginLeft: '1rem', marginBottom: '1rem' }}
    />
  );

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>

      <AddEntryButton style={{ marginBottom: '1rem' }} handleAdd={handleOpenMediaLibrary}>
        Open Image Library
      </AddEntryButton>
      <div>
        <FieldDescription>Selected image:</FieldDescription>
        <div
          style={{
            width: '20rem',
          }}
        >
          {selectedFile && (
            <img
              alt={selectedFile.title}
              src={selectedFile.thumbnailUrl}
              style={{
                height: 'auto',
                width: '100%',
              }}
            />
          )}
        </div>
        <p>
          Title: {selectedFile?.title}
          <br />
          Filesize: {formatFileSize(selectedFile?.size)}
        </p>
      </div>
      {files && (
        <ReactMediaLibrary
          acceptedTypes={['image/*']}
          // defaultSelectedItemIds={[files[0]._id]}
          fileLibraryList={files}
          // fileLibraryList={filteredFiles}
          fileUploadCallback={handleFileUpload}
          filesDeleteCallback={handleDeleteFile}
          filesSelectCallback={handleSelectFile}
          finishUploadCallback={function noRefCheck() {}}
          onClose={handleOpenMediaLibrary}
          isOpen={isMediaLibraryOpen}
          topBarComponent={searchBar}
        />
      )}
    </FieldContainer>
  );
};
