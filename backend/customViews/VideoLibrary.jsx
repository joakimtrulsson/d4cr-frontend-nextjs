import React, { useState, useEffect } from 'react';
import { ReactMediaLibrary } from 'react-media-library';
import {
  FieldContainer,
  FieldLabel,
  FieldDescription,
  TextInput,
} from '@keystone-ui/fields';
import { Button } from '@keystone-ui/button';
import FormData from 'form-data';

import { formatFileSize } from '../utils/formatFileSize';
import { API_URL } from '../utils/constants';

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
              videos {
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
        // console.log(result);

        const modifiedFiles = result.data.videos.map((file) => {
          return {
            ...file,
            _id: file.id,
            id: undefined,
            // Detta ska ändras när thumbnailUrl(bild) finns
            thumbnailUrl: file.url,
            // url: undefined,
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

    file[0].thumbnailUrl = undefined;

    onChange(JSON.stringify(file[0]));
  };

  // Export till hooks?
  const handleFileUpload = async (uploadedFile) => {
    try {
      const formData = new FormData();
      formData.append(
        'operations',
        JSON.stringify({
          query: `
          mutation CreateVideo($data: VideoCreateInput!) {
            createVideo(data: $data) {
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
          mutation DeleteVideo($id: ID!) {
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

      <Button
        style={{ marginBottom: '1rem' }}
        type='small'
        onClick={handleOpenMediaLibrary}
      >
        Open Video Library
      </Button>
      <div>
        <FieldDescription>Selected video:</FieldDescription>
        <div
          style={{
            width: '20rem',
          }}
        >
          {selectedFile && (
            <video controls style={{ height: '150px' }}>
              <source src={selectedFile.url} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
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
          acceptedTypes={['video/*']}
          // defaultSelectedItemIds={[files[0]._id]}
          fileLibraryList={files}
          // fileLibraryList={filteredFiles}
          modalTitle='Video Library'
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
