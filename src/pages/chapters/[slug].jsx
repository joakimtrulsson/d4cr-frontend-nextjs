import Link from 'next/link';
import Image from 'next/image';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import getLanguageName from '../../utils/languageCode.js';
import SectionRender from '../../components/SectionRenderer/SectionRenderer.jsx';
import AnimationRight from '../../styles/assets/graphics/animation.gif';
import AnimationLeft from '../../styles/assets/graphics/animation-2.gif';
import NotFound from '../../components/NotFound/NotFound.jsx';

import { initializeApollo, addApolloState } from '../../graphql/apolloClient';
import { CHAPTER_SLUG_QUERY } from '../../graphql/queries.jsx';
import { markConsecutiveMediaTextSections } from '../../utils/markConsecutiveMediaTextSections.js';

export default function ChapterSlugPage({ chapterData }) {
  if (!chapterData) {
    return <NotFound />;
  }

  const currentLanguage = {
    chapterLanguage: chapterData.chapterLanguage,
    slug: chapterData.slug,
  };

  const chapterLanguages = chapterData.translatedChapters
    ?.filter((chapter) => chapter.chapterLanguage && chapter.slug)
    .map((chapter) => ({ chapterLanguage: chapter.chapterLanguage, slug: chapter.slug }));

  if (
    currentLanguage &&
    !chapterLanguages.some(
      (chapter) =>
        chapter.chapterLanguage === currentLanguage.chapterLanguage &&
        chapter.slug === currentLanguage.slug
    )
  ) {
    chapterLanguages.push(currentLanguage);
  }

  chapterLanguages.sort((a, b) => a.chapterLanguage.localeCompare(b.chapterLanguage));

  const checkIfMultipleTextMediaSections = markConsecutiveMediaTextSections(
    chapterData.sections
  );

  return (
    <main className='site-content chapter-main flex flex-column flex-align-center flex-justify-start'>
      {chapterLanguages.length > 1 && (
        <div className='language-tabs margin-tb--s'>
          {chapterLanguages.map((chapter, index) => (
            <Link href={chapter.slug} key={index}>
              <button
                className={`lang-btn ${
                  index === chapterLanguages.length - 1 ? 'lang-btn-right' : ''
                }
                ${index === 0 ? 'lang-btn-left' : ''}
                ${chapter.slug === currentLanguage.slug ? 'lang-btn-active' : ''}`}
              >
                {getLanguageName(chapter.chapterLanguage)}
              </button>
            </Link>
          ))}
        </div>
      )}

      <div className='animation-background-left'>
        <Image src={AnimationLeft} alt='Animated GIF' />
      </div>

      <div className='animation-background-right'>
        <Image src={AnimationRight} alt='Animated GIF' />
      </div>

      {chapterData.heroImage.url && (
        <div className='hero-image-medium margin-t--s borderradius--xxxs'>
          <Image
            className='center-image'
            src={chapterData.heroImage.url}
            alt={chapterData.heroImage.alt}
            fill={true}
          />
        </div>
      )}

      <p className='sub-heading-m color-yellow-600 margin-t--s'>D4CR PRESENTS</p>

      {chapterData.title && (
        <h1 className='heading-background margin-t--zero'>{chapterData.title}</h1>
      )}

      <div className='max-width-45 text-align-center margin-lr--xxxl'>
        {chapterData.preamble.document && (
          <DocumentRenderer document={chapterData.preamble.document} />
        )}
      </div>

      {chapterData.sections &&
        chapterData.sections.map((section, index) => (
          <SectionRender
            key={index}
            section={section}
            multipleTextMedia={checkIfMultipleTextMediaSections[index]}
          />
        ))}
    </main>
  );
}

export async function getServerSideProps({ params }) {
  const apolloClient = initializeApollo();
  const resolvedUrl = `/chapters/${params.slug}`;

  try {
    const { data } = await apolloClient.query({
      query: CHAPTER_SLUG_QUERY,
      variables: { slug: resolvedUrl },
    });

    return addApolloState(apolloClient, {
      props: {
        chapterData: data.chapters[0] || null,
        tabTitle: data.chapters[0]?.title || 'Page not found',
      },
    });
  } catch (error) {
    console.error('(chapters/[slug].jsx) Error fetching data:', error);
    return null;
  }
}
