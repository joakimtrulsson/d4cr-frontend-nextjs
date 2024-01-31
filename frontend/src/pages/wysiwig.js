import React, { useEffect, useState } from 'react';
import RichTextViewer from '../themes/components/document-renderer.js';
import succe from '../database/keystone-6/wysiwig-data.json';

export const WysiwigPage = () => {  

  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const convertedJson = succe.data.sections.map(section => ({
          type: section.type,
          children: section.children
        }));

        setJsonData(convertedJson);

      } catch (error) {
        console.error('Error fetching JSON data:', error);
        
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  return (
    <div className='wysiwig-container'>
      {loading ? (
        <h1>Loading...</h1>
      ) : jsonData != null ? (
        <RichTextViewer initialValue={jsonData} />
      ) : (
        <h1>404 error</h1>
      )}
    </div>
  );
};

export default WysiwigPage;

