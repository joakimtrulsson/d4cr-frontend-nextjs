import Link from 'next/link';
import Image from 'next/image';
import getLanguageName from '../../themes/sources/js/language-code.js';
import SectionRender from '../../themes/sources/js/section-renderer.js';
import AnimationRight from '../../themes/sources/assets/graphics/animation.gif';
import AnimationLeft from '../../themes/sources/assets/graphics/animation-2.gif';
import RootLayout from '../../app/layout.jsx';
import { DocumentRenderer } from '@keystone-6/document-renderer';

import { useQuery } from '@apollo/client';
import { initializeApollo, addApolloState } from '../../data/apollo-client';
import { CHAPTER_SLUG_QUERY } from '../../data/queries.jsx';

export default function ChapterSlugPage({ resolvedUrl }) {
  const { loading, error, data } = useQuery(CHAPTER_SLUG_QUERY, {
    variables: { slug: resolvedUrl },
  });

  const chapters = data?.chapters[0] || null;

  const currentLanguage = {
    chapterLanguage: chapters.chapterLanguage,
    slug: chapters.slug,
  };

  const chapterLanguages = chapters.translatedChapters
    ?.filter(
      (chapter) =>
        chapter.status === 'published' && chapter.chapterLanguage && chapter.slug
    )
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

  return (
    <RootLayout
      tabTitle={chapters.title}
      resolvedUrl={resolvedUrl}
      language={currentLanguage.chapterLanguage}
    >
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

        {chapters.heroImage.url && (
          <div className='hero-image-medium margin-t--s borderradius--xxxs'>
            <Image
              className='center-image'
              src={chapters.heroImage.url}
              alt={chapters.heroImage.alt}
              fill={true}
            />
          </div>
        )}

        <p className='sub-heading-m color-yellow-600 margin-t--s'>D4CR PRESENTS</p>

        {chapters.title && (
          <h1 className='heading-background margin-t--zero'>{chapters.title}</h1>
        )}

        <div className='max-width-45 text-align-center margin-lr--xxxl'>
          {chapters.preamble.document && (
            <DocumentRenderer document={chapters.preamble.document} />
          )}
        </div>

        {chapters.sections &&
          chapters.sections.map((section, index) => (
            // <section key={index} className='margin-tb--xs'>
            <SectionRender key={index} section={section} />
            // </section>
          ))}
      </main>
    </RootLayout>
  );
}

export async function getServerSideProps({ params }) {
  const apolloClient = initializeApollo();
  const resolvedUrl = `/chapters/${params.slug}`;

  try {
    await apolloClient.query({
      query: CHAPTER_SLUG_QUERY,
      variables: { slug: resolvedUrl },
    });

    return addApolloState(apolloClient, {
      props: { resolvedUrl },
    });
  } catch (error) {
    console.error('(chapters/[slug].jsx) Error fetching data:', error);
    return null;
  }
}
