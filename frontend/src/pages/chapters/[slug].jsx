import { gql } from '@apollo/client';
import Link from 'next/link'
import client from '../../apollo-client.js';
import getLanguageName from '../../themes/sources/js/language-code.js'
import SlugPageComponent from '../../themes/components/slug-component.jsx'

export default function SlugPage({ chapters }) {

  console.log(chapters)

  // Get current chapter
  const currentLanguage = {
    chapterLanguage: chapters.chapterLanguage,
    slug: chapters.slug
  };

  // Get the translated chapters
  const chapterLanguages = chapters.translatedChapters
    .filter(chapter => chapter.status === "published" && chapter.chapterLanguage && chapter.slug)
    .map(chapter => ({ chapterLanguage: chapter.chapterLanguage, slug: chapter.slug }));

  // Check if the current chapter is not in the array, and if it isn't, then add it
  if (currentLanguage && !chapterLanguages.some(chapter =>
    chapter.chapterLanguage === currentLanguage.chapterLanguage &&
    chapter.slug === currentLanguage.slug)) {
    chapterLanguages.push(currentLanguage);
  }

  // Sort the chapterLanguages array alphabetically based on chapterLanguage
  chapterLanguages.sort((a, b) => a.chapterLanguage.localeCompare(b.chapterLanguage)); // 

  return !chapters ? <h1>Not found</h1> :
    (
      <div className='slug-container flex flex-column flex-align-center'>
        {chapterLanguages.length > 1 && (
          <div className='language-tabs margin-tb--s'>
            {chapterLanguages.map((chapter, index) => (
              <Link href={chapter.slug} key={index}>
                <button
                  className={`lang-btn ${index === chapterLanguages.length - 1 ? 'lang-btn-right' : ''}
                  ${index === 0 ? 'lang-btn-left' : ''}
                  ${chapter === currentLanguage ? 'lang-btn-active' : ''}`}>
                  {getLanguageName(chapter.chapterLanguage)}
                </button>
              </Link>
            ))}

          </div>
        )}

        <SlugPageComponent content={chapters} />

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

    console.error("(chapters/[slug].js) Error fetching data:", error)
    return { props: { chapters: null } }
  }
}