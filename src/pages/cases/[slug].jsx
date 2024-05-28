import { DocumentRenderer } from '@keystone-6/document-renderer';

import { SectionRenderer, Resources, NotFound } from '../../components/index.js';
import { markConsecutiveMediaTextSections } from '../../utils/index.js';

import {
  CASE_ITEM_BY_SLUG_QUERY,
  GET_ALL_CASES_SLUG,
  initializeApollo,
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
    <main className='site-content container-cases flex flex-column flex-justify-center flex-align-center '>
      {pageData ? (
        <>
          <div className='title-container'>
            <h4 className='sub-heading-m case'>CASE</h4>
            <h1 className='heading-1'>{pageData.title}</h1>
            <DocumentRenderer document={pageData.preamble?.document} />
          </div>

          {pageData.sections &&
            pageData.sections.map((section, index) => (
              <SectionRenderer
                key={index}
                section={section}
                multipleTextMedia={checkIfMultipleTextMediaSections[index]}
              />
            ))}

          {pageData.resources.length > 0 ? (
            <Resources
              resources={pageData.resources}
              title={pageData.resourcesTitle}
              preamble={pageData.resourcesPreamble}
            />
          ) : null}
        </>
      ) : null}
    </main>
  );
}

export async function getStaticProps({ params }) {
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

    if (!data.cases) {
      return {
        props: {
          tabTitle: 'Page not found',
        },
      };
    }

    return {
      props: {
        pageData: data.cases[0] || [],
        tabTitle: data.cases[0].title,
      },
      revalidate: Number(process.env.NEXT_PUBLIC_STATIC_REVALIDATE),
    };
  } catch (error) {
    console.error('(cases/[slug].jsx) Error fetching data:', error);
    return null;
  }
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();
  try {
    const { data } = await apolloClient.query({
      query: GET_ALL_CASES_SLUG,
    });

    const paths = data.cases
      .filter((page) => page.url.startsWith('/cases/') && page.linkType === 'internal')
      .map((page) => ({
        params: { slug: page.url },
      }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('(cases/[slug].jsx) Error fetching data:', error);
    return null;
  }
}
