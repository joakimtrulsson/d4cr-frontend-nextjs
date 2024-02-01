import React, { useEffect, useState } from 'react';
import RichTextViewer from '../themes/components/document-renderer.js';
import LocalJsonFile from '../database/keystone-6/wysiwig-data.json';
import '../themes/sources/scss/components/wysiwig.scss'


export const WysiwigPage = () => {  

  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const convertedJson = LocalJsonFile.data.sections.map(section => ({
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

