import { useEffect, useState } from 'react';
// import { BASE_URL_BACKEND } from '../utils/constants';
import { API_URL } from '../../utils/constants';

const useFetchResources = () => {
  const [allResources, setAllResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(`${API_URL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
            query {
              resourceCategories(orderBy: { createdAt: desc }) {
                createdAt
                title
                resources(orderBy: { createdAt: desc }) {
                  id
                  createdAt
                  title
                  url
                  resourceType {
                    type
                    icon
                  }
                }
              }
            }
            
            `,
          }),
        });

        const { data } = await response.json();
        setAllResources(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  return { allResources, loading, error };
};

export default useFetchResources;
