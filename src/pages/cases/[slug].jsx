import { DocumentRenderer } from '@keystone-6/document-renderer';
import { useQuery } from '@apollo/client';
import SectionRenderer from '../../components/SectionRenderer/SectionRenderer.jsx';
import Resources from '../../components/Resources/Resources.jsx';
import RootLayout from '../../app/layout.jsx';

import { initializeApollo, addApolloState } from '../../graphql/apolloClient';
import { CASE_ITEM_BY_SLUG_QUERY } from '../../graphql/queries.jsx';

export default function CasesPage({ resolvedUrl }) {
  const { loading, error, data } = useQuery(CASE_ITEM_BY_SLUG_QUERY, {
    variables: {
      where: {
        url: {
          equals: `${resolvedUrl}`,
        },
      },
    },
  });

  return (
    <>
      <RootLayout tabTitle={data.cases.title} resolvedUrl={resolvedUrl} language='en_GB'>
        <main className='flex flex-column container-cases'>
          {data.cases && data.cases.length > 0 ? (
            <>
              <div className='title-container'>
                <h4 className='sub-heading-m case'>CASE</h4>
                <h1 className='heading-1'>{data.cases[0].title}</h1>
                <DocumentRenderer document={data.cases[0].preamble?.document} />
              </div>
              <div className='flex flex-column flex-align-center'>
                {data.cases[0].sections &&
                  data.cases[0].sections.map((section, index) => (
                    <SectionRenderer key={index} section={section} />
                  ))}
                <div className='renderer'>
                  {data.cases[0].resources.length > 0 ? (
                    <Resources
                      resources={data.cases[0].resources}
                      title={data.cases[0].resourcesTitle}
                      preamble={data.cases[0].resourcesPreamble}
                    />
                  ) : null}
                </div>
              </div>
            </>
          ) : null}
        </main>
      </RootLayout>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const apolloClient = initializeApollo();
  const resolvedUrl = `/cases/${params.slug}`;
  try {
    await apolloClient.query({
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
      props: { resolvedUrl },
    });
  } catch (error) {
    console.error('(cases/[slug].jsx) Error fetching data:', error);
    return null;
  }
}
