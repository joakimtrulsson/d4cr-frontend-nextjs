import React, {useState} from 'react';
// import { fetchFrontPageData } from '../graphql';
import HeroComponent from '../themes/components/hero-frontpage';
import SectionRenderer from '../themes/sources/js/section-renderer';
import RootLayout from '../app/layout';
import PrimaryButton from '../themes/components/buttons/primary-button.jsx'
import SecondaryButton from '../themes/components/buttons/secondary-button.jsx'
import Link from 'next/link'
import { useQuery } from '@apollo/client';
import { initializeApollo, addApolloState } from '../data/apollo-client';
import { FRONT_PAGE_QUERY } from '../data/queries';

export default function FrontPage() {
  const { loading, error, data } = useQuery(FRONT_PAGE_QUERY);
  //console.log('index', data.frontPage, data.frontPage)
  
 
  return (
    // <RootLayout tabTitle={null} language='en_GB'>
    <main className='site-content flex flex-column flex-align-center flex-justify-start'>
      {data.frontPage ? <HeroComponent prop={data.frontPage} /> : null}

      {data.frontPage.sections &&
        data.frontPage.sections.map((section, index) => (
          // Detta borde kunna bo i SectionRenderer istället för på alla pages.
          // <section
          //   key={index}
          //   className={`flex  ${
          //     section.sectionType === 'MEDIATEXT' ||
          //     section.sectionType === 'CHAPTERTEASER'
          //       ? 'full-site-container-width'
          //       : ''
          //   }`}
          // >
          <SectionRenderer key={index} section={section} />
          // </section>
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
