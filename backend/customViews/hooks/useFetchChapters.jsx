import { useEffect, useState } from 'react';
import { BASE_URL_BACKEND } from '../utils/constants';

const useFetchChapters = () => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await fetch(`${BASE_URL_BACKEND}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query {
                chapters(where: { status: { equals: "published" } }) {
                  title
                  slug
                  status
                }
              }
            `,
          }),
        });

        const { data } = await response.json();
        setChapters(data.chapters);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchChapters();
  }, []);

  return { chapters, loading, error };
};

export default useFetchChapters;
