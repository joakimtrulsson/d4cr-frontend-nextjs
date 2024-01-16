import React, { useState, useRef } from 'react';

import { Button } from '@keystone-ui/button';

import { BASE_URL } from '../../utils/constants';

function ImageUpload({ setFile, editData }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileInfo, setFileInfo] = useState({ size: null, width: null, height: null });
  const fileInputRef = useRef();

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result);

        const img = new Image();
        img.onload = function () {
          setFileInfo({
            size: file.size,
            width: this.naturalWidth,
            height: this.naturalHeight,
          });
        };
        img.src = e.target.result;
      };

      setFile({
        file,
      });

      reader.readAsDataURL(file);
    }
  };
  return (
    <div style={{ display: 'flex' }}>
      {selectedImage ? (
        <img
          src={selectedImage}
          alt='Selected'
          style={{
            borderRadius: '5px',
            width: '125px',
            height: '125px',
            marginRight: '0.5rem',
          }}
        />
      ) : editData ? (
        <div
          style={{
            width: '125px',
            height: '125px',
            backgroundImage: `url(${BASE_URL}/${editData})`,
            backgroundSize: 'cover',
            border: '1px solid #c4cdd5',
            borderRadius: '5px',
            marginRight: '0.5rem',
          }}
        ></div>
      ) : (
        <div
          style={{
            width: '125px',
            height: '125px',
            backgroundColor: '#fafbfc',
            border: '1px solid #c4cdd5',
            borderRadius: '5px',
            marginRight: '0.5rem',
          }}
        ></div>
      )}

      <div>
        {/* {fileInfo && (
          <p>
            Size: {(fileInfo.size / 1024).toFixed(2)}KB <br />
            Dimensions: {fileInfo.width} x {fileInfo.height}
          </p>
        )} */}

        <Button
          style={{ marginTop: '0.6rem' }}
          onClick={() => fileInputRef.current.click()}
        >
          Choose Image
        </Button>
        <input
          onChange={handleImageChange}
          multiple={false}
          ref={fileInputRef}
          type='file'
          hidden
        />
      </div>
    </div>
  );
}

export default ImageUpload;
