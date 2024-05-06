import React from 'react';
import { useQuery } from '@apollo/client';

import HeroFrontPage from '../components/HeroFrontPage/HeroFrontPage.jsx';
import SectionRenderer from '../components/SectionRenderer/SectionRenderer.jsx';

import { initializeApollo, addApolloState } from '../graphql/apolloClient.js';
import { FRONT_PAGE_QUERY } from '../graphql/queries.jsx';
import { markConsecutiveMediaTextSections } from '../utils/markConsecutiveMediaTextSections.js';

export default function FrontPage() {
  const { loading, error, data } = useQuery(FRONT_PAGE_QUERY);

  const checkIfMultipleTextMediaSections = markConsecutiveMediaTextSections(
    data.frontPage.sections
  );

  return (
    <main className='site-content flex flex-column flex-align-center flex-justify-start'>
      {data.frontPage ? <HeroFrontPage prop={data.frontPage} /> : null}

      {data.frontPage.sections &&
        data.frontPage.sections.map((section, index) => (
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
    await apolloClient.query({
      query: FRONT_PAGE_QUERY,
    });

    return addApolloState(apolloClient, {
      props: {},
    });
  } catch (error) {
    console.error('(index.jsx) Error fetching data:', error);
    return { notFound: true };
  }
}
