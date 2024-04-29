import Image from 'next/image';
import { useQuery } from '@apollo/client';
import SectionRenderer from '../../components/SectionRenderer/SectionRenderer.jsx';
import Resources from '../../components/Resources/Resources.jsx';
// import RootLayout from '../../app/layout.jsx';

import { initializeApollo, addApolloState } from '../../graphql/apolloClient';
import { GET_NEWS_ITEM_BY_SLUG_QUERY } from '../../graphql/queries.jsx';

export default function NewsSlugPage({ resolvedUrl }) {
  const { loading, error, data } = useQuery(GET_NEWS_ITEM_BY_SLUG_QUERY, {
    variables: { where: { slug: resolvedUrl } },
  });

  return (
    data && (
      // <RootLayout
      //   footerMenuData={null}
      //   tabTitle={data?.news?.title}
      //   resolvedUrl={resolvedUrl}
      //   language='en_GB'
      // >
      <main className='site-content news-slug-container flex flex-column flex-align-center flex-justify-start'>
        {data?.news?.image?.url && (
          <div className='hero-image-large margin-tb--s borderradius--xxs '>
            <Image
              className='center-image'
              src={data.news.image.url}
              alt={data.news.image.altText}
              fill={true}
            />
          </div>
        )}

        {(data?.news?.newsCategory?.categoryTitle || data?.news?.title) && (
          <div className='margin-lr--m'>
            {data.news.newsCategory.categoryTitle && (
              <p className='max-width-60 margin--zero full-width-height color-yellow-600 sub-heading-m'>
                {data.news.newsCategory.categoryTitle}
              </p>
            )}

            {data.news.title && (
              <h1 className='max-width-60 margin--zero'>{data.news.title}</h1>
            )}
          </div>
        )}

        {data?.news?.sections &&
          data.news.sections.map((section, index) => (
            <SectionRenderer key={index} section={section} />
          ))}
        {data?.news?.resources ? (
          <Resources
            resources={data.news.resources}
            title={data.news?.resourcesTitle}
            preamble={data.news?.resourcesPreamble}
          />
        ) : null}
      </main>
      // </RootLayout>
    )
  );
}

export async function getServerSideProps({ req, params }) {
  const apolloClient = initializeApollo();
  const resolvedUrl = `/news/${params.slug}`;

  try {
    await apolloClient.query({
      query: GET_NEWS_ITEM_BY_SLUG_QUERY,
      variables: { where: { slug: resolvedUrl } },
    });

    return addApolloState(apolloClient, {
      props: { resolvedUrl },
    });
  } catch (error) {
    console.error('(news/[slug].jsx) Error fetching data:', error);
    return null;
  }
}
