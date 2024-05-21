import { DocumentRenderer } from '@keystone-6/document-renderer';

import { SectionRenderer, Resources, NotFound } from '../../components/index.js';
import { markConsecutiveMediaTextSections } from '../../utils/index.js';

import {
  initializeApollo,
  addApolloState,
  CASE_ITEM_BY_SLUG_QUERY,
} from '../../graphql/index';

export default function CasesPage({ pageData }) {
  if (!pageData) {
    return <NotFound />;
  }

  let checkIfMultipleTextMediaSections;
  if (pageData?.sections) {
    checkIfMultipleTextMediaSections = markConsecutiveMediaTextSections(
      pageData?.sections
    );
  }

  return (
    <main className='flex flex-column flex-justify-center flex-align-center container-cases'>
      {pageData ? (
        <>
          <div className='title-container'>
            <h4 className='sub-heading-m case'>CASE</h4>
            <h1 className='heading-1'>{pageData.title}</h1>
            <DocumentRenderer document={pageData.preamble?.document} />
          </div>
          <div className='flex flex-column flex-align-center'>
            {pageData.sections &&
              pageData.sections.map((section, index) => (
                <SectionRenderer
                  key={index}
                  section={section}
                  multipleTextMedia={checkIfMultipleTextMediaSections[index]}
                />
              ))}
            <div className='renderer'>
              {pageData.resources.length > 0 ? (
                <Resources
                  resources={pageData.resources}
                  title={pageData.resourcesTitle}
                  preamble={pageData.resourcesPreamble}
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

    if (!data.cases.length > 0) {
      return {
        props: {
          tabTitle: 'Page not found',
        },
      };
    }

    return addApolloState(apolloClient, {
      props: {
        pageData: data.cases[0] || [],
        tabTitle: data.cases[0].title,
      },
    });
  } catch (error) {
    console.error('(cases/[slug].jsx) Error fetching data:', error);
    return null;
  }
}
