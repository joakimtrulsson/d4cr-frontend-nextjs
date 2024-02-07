import { useCallback } from 'react';

import { BASE_URL_BACKEND } from '../utils/constants';

export const useFileUpload = () => {
  const handleFileUpload = useCallback(async (uploadedFile) => {
    try {
      const formData = new FormData();
      formData.append(
        'operations',
        JSON.stringify({
          query: `
          mutation CreateImage($data: ImageCreateInput!) {
            createImage(data: $data) {
              id
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

      const response = await fetch(`${BASE_URL_BACKEND}`, {
        method: 'POST',
        headers: {
          'Apollo-Require-Preflight': 'true',
        },
        body: formData,
      });

      const result = await response.json();

      if (result.errors) {
        console.error('Error uploading file:', result.errors);
      } else {
        console.log('File uploaded successfully:', result.data);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }, []);

  return handleFileUpload;
};
