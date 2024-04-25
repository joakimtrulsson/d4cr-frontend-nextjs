import React from 'react';
import HeroComponent from '../themes/components/hero-frontpage';
import SectionRenderer from '../themes/sources/js/section-renderer';
import RootLayout from '../app/layout';

import { useQuery } from '@apollo/client';
import { initializeApollo, addApolloState } from '../data/apollo-client';
import { FRONT_PAGE_QUERY } from '../data/queries';

export default function FrontPage() {
  const { loading, error, data } = useQuery(FRONT_PAGE_QUERY);

  return (
    // <RootLayout tabTitle={null} language='en_GB'>
    <main className='site-content flex flex-column flex-align-center flex-justify-start'>
      {data.frontPage ? <HeroComponent prop={data.frontPage} /> : null}

      {data.frontPage.sections &&
        data.frontPage.sections.map((section, index) => (
          <section
            key={index}
            className='flex flex-column flex-align-center flex-justify-center'
          >
            <SectionRenderer key={index} section={section} />
          </section>
        ))}
    </main>
    // </RootLayout>
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
