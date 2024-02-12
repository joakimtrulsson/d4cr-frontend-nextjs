import { useEffect, useState } from 'react';

// import { BASE_URL_BACKEND } from '../utils/constants';
import { API_URL } from '../utils/constants';

export const useFetchImages = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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
                altText
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
  }, []);

  return [files, setFiles];
};
