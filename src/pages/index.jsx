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
    <RootLayout
      // navMenuData={props.navMenuData}
      // footerMenuData={null}
      tabTitle={null}
      // resolvedUrl={props.resolvedUrl}
      language='en_GB'
    >
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
    </RootLayout>
  );
}

export async function getServerSideProps({ resolvedUrl }) {
  const apolloClient = initializeApollo();
  try {
    await apolloClient.query({
      query: FRONT_PAGE_QUERY,
    });
    // const pageData = await fetchFrontPageData();
    // const navMenuData = await fetchMainMenuData();
    // const footerMenuData = await fetchFooterMenuData();
    // return { props: { pageData, resolvedUrl } };
    return addApolloState(apolloClient, {
      props: {},
    });
  } catch (error) {
    console.error('(index.jsx) Error fetching data:', error);
    return { notFound: true };
  }
}
