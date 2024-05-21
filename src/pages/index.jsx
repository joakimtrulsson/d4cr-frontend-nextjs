import React from 'react';

import { HeroFrontPage, SectionRenderer } from '../components/index.js';
import { markConsecutiveMediaTextSections } from '../utils/index.js';
import { initializeApollo, addApolloState, FRONT_PAGE_QUERY } from '../graphql/index.js';

export default function FrontPage({ pageData }) {
  let checkIfMultipleTextMediaSections;
  if (pageData.sections) {
    checkIfMultipleTextMediaSections = markConsecutiveMediaTextSections(
      pageData.sections
    );
  }

  return (
    <main className='site-content flex flex-column flex-align-center flex-justify-start'>
      {pageData ? <HeroFrontPage prop={pageData} /> : null}

      {pageData.sections &&
        pageData.sections.map((section, index) => (
          <SectionRenderer
            key={index}
            section={section}
            multipleTextMedia={checkIfMultipleTextMediaSections[index]}
          />
        ))}
    </main>
  );
}

export async function getServerSideProps({ resolvedUrl }) {
  const apolloClient = initializeApollo();
  try {
    const { data } = await apolloClient.query({
      query: FRONT_PAGE_QUERY,
    });

    return addApolloState(apolloClient, {
      props: {
        pageData: data.frontPage,
      },
    });
  } catch (error) {
    console.error('(index.jsx) Error fetching data:', error);
    return { notFound: true };
  }
}
