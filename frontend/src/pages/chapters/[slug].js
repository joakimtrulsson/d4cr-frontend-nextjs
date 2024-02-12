import { gql } from '@apollo/client';
import React, { useState } from 'react';
import client from '../../apollo-client.js';
import getLanguageName from '../../themes/sources/js/language-code.js'
import SlugPageComponent from '../../themes/components/slug-component.js'

export default function SlugPage({ chapters }) {

  const [content, setContent] = useState(chapters);

  console.log("SlugPage: ", content)


  const hasPublishedTranslatedChapter = chapters.translatedChapters.some(chapter => chapter.status === 'published')

  function handleTranslation(e, index) {
    setContent(chapters.translatedChapters[index]);
  }

  function handleOriginalLanguage() {
    setContent(chapters);
  }

  return !chapters ? <h1>Not found</h1> :
    (
      <div className='slug-container flex flex-column flex-align-center'>

        {hasPublishedTranslatedChapter && (

          <div className='language-tabs'>

            <button className='button' onClick={handleOriginalLanguage}>
              {getLanguageName(chapters.chapterLanguage)}
            </button>

            {chapters.translatedChapters.map((chapter, index) => (
              (chapter.status === 'published') &&
              <button className='button' key={index} onClick={(e) => handleTranslation(e, index)}>
                {getLanguageName(chapter.chapterLanguage)}
              </button>
            ))}

          </div>
        )}

        <SlugPageComponent content={content} />

      </div>
    )
}

export async function getServerSideProps({ resolvedUrl }) {
  try {

    const { data } = await client.query({
      query: gql`
        query Query($slug: String!) {
          chapters(where: { slug: { equals: $slug } }) {
            slug
            chapterLanguage
            status
            title
            heroImage
            sections
            preamble {
              document
            }
            translatedChapters {
              slug
              chapterLanguage
              status
              title
              heroImage
              sections
              preamble {
                document
              }
            }
          }
        }
      `,
      variables: { slug: resolvedUrl }
    });

    if (!data.chapters || data.chapters.length === 0) {
      console.error("Data couldn't be found for slug:", slug);
      return {
        notFound: true,
      }
    }

    return { props: { chapters: data.chapters[0] } }

  } catch (error) {

    console.error("Error fetching data:", error)
    return { props: { chapters: null } }
  }
}
