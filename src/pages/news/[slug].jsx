import Image from 'next/image';

import { SectionRenderer, Resources, NotFound } from '../../components/index.js';
import { markConsecutiveMediaTextSections } from '../../utils/index.js';
import {
  initializeApollo,
  addApolloState,
  GET_NEWS_ITEM_BY_SLUG_QUERY,
} from '../../graphql/index';

export default function NewsSlugPage({ newsData }) {
  if (!newsData) {
    return <NotFound />;
  }

  const checkIfMultipleTextMediaSections = markConsecutiveMediaTextSections(
    newsData.sections
  );

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
      {newsData.resources ? (
        <Resources
          resources={newsData.resources}
          title={newsData.resourcesTitle}
          preamble={newsData.resourcesPreamble}
        />
      ) : null}
    </main>
  );
}

export async function getServerSideProps({ req, params }) {
  const apolloClient = initializeApollo();
  const resolvedUrl = `/news/${params.slug}`;

  try {
    const { data } = await apolloClient.query({
      query: GET_NEWS_ITEM_BY_SLUG_QUERY,
      variables: { where: { slug: resolvedUrl } },
    });

    return addApolloState(apolloClient, {
      props: {
        newsData: data.news || null,
        tabTitle: data.news?.title || null,
      },
    });
  } catch (error) {
    console.error('(news/[slug].jsx) Error fetching data:', error);
    return null;
  }
}
