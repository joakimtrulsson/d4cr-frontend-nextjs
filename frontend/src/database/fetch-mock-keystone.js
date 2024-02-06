import { gql } from '@apollo/client';
import client from '../apollo-client.js';
import { useState, useEffect } from 'react';

export default function MyApp() {

  const [data, setData] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
            query Chapters {
              chapters {
                  id
                  title
                  slug
                  status
                  chapterLanguage
              
                  preamble {
                    document
                  }
                  heroImage
                  sections
                  translatedChapters {
                    id
                    title
                    slug
                    status
                    chapterLanguage
                preamble {
                  document
                }
                  }
                  }
              }
                     `,
          }),
        });
 
        const result = await response.json();
        setData(result.data.chapters);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 

    fetchData();
    console.log(data)
  }, [data]); 

  return (
    <div>
    {data.map((chapter, index) => (
      <h1 key={index}>{chapter.title}</h1>
    ))}
  </div>
    );
}
