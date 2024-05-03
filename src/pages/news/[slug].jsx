import Image from 'next/image';
import SectionRenderer from '../../components/SectionRenderer/SectionRenderer.jsx';
import Resources from '../../components/Resources/Resources.jsx';
import { initializeApollo, addApolloState } from '../../graphql/apolloClient';
import { GET_NEWS_ITEM_BY_SLUG_QUERY } from '../../graphql/queries.jsx';
import NotFound from '../../components/NotFound/NotFound.jsx';

export default function NewsSlugPage({ newsData }) {
  if (!newsData) {
    return <NotFound />;
  }

  return (
    <main className='site-content news-slug-container flex flex-column flex-align-center flex-justify-start'>
      {newsData.image?.url && (
        <div className='hero-image-large margin-tb--s borderradius--xxs '>
          <Image
            className='center-image'
            src={newsData.image.url}
            alt={newsData.image.altText}
            fill={true}
          />
        </div>
      )}

      {(newsData.newsCategory?.categoryTitle || newsData.title) && (
        <div className='margin-lr--m'>
          {newsData.newsCategory.categoryTitle && (
            <p className='max-width-60 margin--zero full-width-height color-yellow-600 sub-heading-m'>
              {newsData.newsCategory.categoryTitle}
            </p>
          )}

          {newsData.title && (
            <h1 className='max-width-60 margin--zero'>{newsData.title}</h1>
          )}
        </div>
      )}

      {newsData.sections &&
        newsData.sections.map((section, index) => (
          <SectionRenderer key={index} section={section} />
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
