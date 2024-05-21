import Link from 'next/link';
import Image from 'next/image';
import { DocumentRenderer } from '@keystone-6/document-renderer';

import { SectionRenderer, NotFound } from '../../components/index.js';
import { markConsecutiveMediaTextSections, getLanguageName } from '../../utils/index.js';
import {
  initializeApollo,
  addApolloState,
  CHAPTER_SLUG_QUERY,
} from '../../graphql/index.js';

import AnimationRight from '../../styles/assets/graphics/animation.gif';
import AnimationLeft from '../../styles/assets/graphics/animation-2.gif';

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
    <main className='site-content chapter-main flex flex-column flex-align-center flex-align-center'>
      <div className='chapter-hero'>
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
        {chapterData.heroImage.url && (
          <div className='hero-image-medium margin-t--s borderradius--xxxs'>
            <Image
              className='chapter-hero-image borderradius--xxxs'
              src={chapterData.heroImage.url}
              alt={chapterData.heroImage.alt}
              width='900'
              height='300'
              objectFit='cover'
            />
          </div>
        )}
        <div className='animation-background-right'>
          <Image src={AnimationRight} alt='Animated GIF' />
        </div>

        <p className='chapter-subheader sub-heading-m color-yellow-600 margin-t--s'>
          D4CR PRESENTS
        </p>

        {chapterData.title && (
          <h1 className='heading-background margin-t--zero'>{chapterData.title}</h1>
        )}

        <div className='max-width-45 text-align-center'>
          {chapterData.preamble.document && (
            <DocumentRenderer document={chapterData.preamble.document} />
          )}
        </div>
      </div>

      {chapterData.sections &&
        chapterData.sections.map((section, index) => (
          <SectionRenderer
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
