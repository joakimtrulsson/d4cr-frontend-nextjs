import Image from 'next/image';

import { SectionRenderer, Resources, NotFound } from '../../components/index.js';
import { markConsecutiveMediaTextSections } from '../../utils/index.js';
import {
  initializeApollo,
  GET_NEWS_ITEM_BY_SLUG_QUERY,
  GET_ALL_NEWS_SLUG,
} from '../../graphql/index';

export default function NewsSlugPage({ newsData }) {
  if (!newsData) {
    return <NotFound />;
  }

  let checkIfMultipleTextMediaSections;
  if (newsData?.sections) {
    checkIfMultipleTextMediaSections = markConsecutiveMediaTextSections(
      newsData?.sections
    );
  }
  console.log('newsData.resources', newsData.resources);

  return (
    <main className='site-content news-slug-container flex flex-column flex-align-center flex-justify-center'>
      {newsData.image?.url && (
        <div className='hero-image-container margin-tb--s borderradius--xxs '>
          <Image
            className=' hero-image borderradius--xxs'
            src={newsData.image.url}
            alt={newsData.image.altText}
            width='1400'
            height='600'
            objectFit='cover'
          />
        </div>
      )}

      {(newsData.newsCategory?.categoryTitle || newsData.title) && (
        <div className='news-header margin-lr--m'>
          {newsData.newsCategory.categoryTitle && (
            <p className='news-category max-width-60 margin--zero full-width-height color-yellow-600 sub-heading-m'>
              {new Date(newsData.createdAt).toISOString().split('T')[0]} |{' '}
              {newsData.newsCategory.categoryTitle}
            </p>
          )}

          {newsData.title && (
            <h1 className='news-title max-width-60 margin--zero'>{newsData.title}</h1>
          )}
        </div>
      )}

      {newsData.sections &&
        newsData.sections.map((section, index) => (
          <SectionRenderer
            key={index}
            section={section}
            multipleTextMedia={checkIfMultipleTextMediaSections[index]}
          />
        ))}

      {newsData.resources.length > 0 ? (
        <Resources
          resources={newsData.resources}
          title={newsData.resourcesTitle}
          preamble={newsData.resourcesPreamble}
        />
      ) : null}
    </main>
  );
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();
  const resolvedUrl = `/news/${params.slug}`;

  try {
    const { data } = await apolloClient.query({
      query: GET_NEWS_ITEM_BY_SLUG_QUERY,
      variables: { where: { slug: resolvedUrl } },
    });

    if (!data.news) {
      return {
        props: {
          tabTitle: 'Page not found',
        },
      };
    }

    return {
      props: {
        newsData: data.news || null,
        tabTitle: data.news?.title || null,
      },
      revalidate: Number(process.env.NEXT_PUBLIC_STATIC_REVALIDATE),
    };
  } catch (error) {
    console.error('(news/[slug].jsx) StaticProps Error fetching data:', error);
    return null;
  }
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();
  try {
    const { data } = await apolloClient.query({
      query: GET_ALL_NEWS_SLUG,
    });

    const paths = data.newsItems
      // .filter((page) => page.slug.startsWith('/news/'))
      .map((page) => ({
        // params: { slug: page.slug.replace('/news/', '') },
        params: { slug: page.slug },
      }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('(news/[slug].jsx) Error fetching data:', error);
    return null;
  }
}
