import { DocumentRenderer } from '@keystone-6/document-renderer';
import SectionRenderer from '../../components/SectionRenderer/SectionRenderer.jsx';
import Resources from '../../components/Resources/Resources.jsx';
import NotFound from '../../components/NotFound/NotFound.jsx';

import { initializeApollo, addApolloState } from '../../graphql/apolloClient';
import { CASE_ITEM_BY_SLUG_QUERY } from '../../graphql/queries.jsx';

export default function CasesPage({ pageData }) {
  if (pageData.length === 0) {
    return <NotFound />;
  }

  return (
    <main className='flex flex-column container-cases'>
      {pageData && pageData.length > 0 ? (
        <>
          <div className='title-container'>
            <h4 className='sub-heading-m case'>CASE</h4>
            <h1 className='heading-1'>{pageData[0].title}</h1>
            <DocumentRenderer document={pageData[0].preamble?.document} />
          </div>
          <div className='flex flex-column flex-align-center'>
            {pageData[0].sections &&
              pageData[0].sections.map((section, index) => (
                <SectionRenderer key={index} section={section} />
              ))}
            <div className='renderer'>
              {pageData[0].resources.length > 0 ? (
                <Resources
                  resources={pageData[0].resources}
                  title={pageData[0].resourcesTitle}
                  preamble={pageData[0].resourcesPreamble}
                />
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </main>
  );
}

export async function getServerSideProps({ params }) {
  const apolloClient = initializeApollo();
  const resolvedUrl = `/cases/${params.slug}`;
  try {
    const { data } = await apolloClient.query({
      query: CASE_ITEM_BY_SLUG_QUERY,
      variables: {
        where: {
          url: {
            equals: `${resolvedUrl}`,
          },
        },
      },
    });

    return addApolloState(apolloClient, {
      props: {
        pageData: data.cases,
        tabTitle: data.cases[0].title,
      },
    });
  } catch (error) {
    console.error('(cases/[slug].jsx) Error fetching data:', error);
    return null;
  }
}
