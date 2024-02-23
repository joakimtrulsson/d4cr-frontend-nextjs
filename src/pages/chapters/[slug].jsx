import { gql } from '@apollo/client';
import Link from 'next/link'
import client from '../../apollo-client.js';
import getLanguageName from '../../themes/sources/js/language-code.js'
import WYSIWYG from '../../themes/components/wysiwyg.jsx'
import SectionRender from '../../themes/sources/js/section-render.js';
import Image from 'next/image'

export default function SlugPage({ chapters }) {

  console.log('chap', chapters)

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
      <div className='flex flex-column flex-align-center margin-lr--xxxl max-width-60'>

        {chapterLanguages.length > 1 && ( // add buttons to the translated chapters if exists
          <div className='language-tabs margin-tb--s'>

            {chapterLanguages.map((chapter, index) => (
              <Link href={chapter.slug} key={index}>
                <button
                  className={`lang-btn ${index === chapterLanguages.length - 1 ? 'lang-btn-right' : ''}
                  ${index === 0 ? 'lang-btn-left' : ''}
                  ${chapter.slug === currentLanguage.slug ? 'lang-btn-active' : ''}`}>
                  {getLanguageName(chapter.chapterLanguage)}
                </button>
              </Link>
            ))}

          </div>
        )}

        {chapters.heroImage.url && ( // show hero image if exists
          <div className='image-container-1 margin-t--s'>
            <div className='image-wrapper  borderradius--xxs'>
              <img className='center-image' src={chapters.heroImage.url} alt={chapters.heroImage.alt} />
            </div>
          </div>
        )}

        <p className='sub-heading-m color-yellow-600 margin-t--s'>D4CR PRESENTS</p>

        {chapters.title && <h1 className='heading-background margin-t--zero'>{chapters.title}</h1>}

        <WYSIWYG content={chapters.preamble.document} />

        {chapters.sections && chapters.sections.map((section, index) => ( // Render all this chapter's sections
          <div className='margin-tb--xs'>
            <SectionRender key={index} section={section} />
          </div>
        ))}

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