import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import {
  fetchMainMenuData,
  fetchFooterMenuData,
  fetchGetPageBySlugData,
 
} from '../graphql';
import SectionRender from '../themes/sources/js/section-renderer';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import PrimaryButton from '../themes/components/buttons/primary-button';
import SecondaryButton from '../themes/components/buttons/secondary-button';
import RootLayout from '../app/layout';

//kolla textfil vilka sidor man ska kolla modal url slack share osv

export default function SlugPage(props) {
  //const { resolvedUrl } = props;
  //console.log("slug", props.pageData.ctaOneUrl, props.pageData.ctaTwoUrl)
  //console.log("([slug].jsx) :", props.allCasesData, props.resolvedUrl) // remove this later!


   const title = props.pageData ? props.pageData.title : 'Default Title';

  // if (!props.navMenuData || (!props.pageData && !props.allCasesData)) { // add footerMenuData here please!
  //     return notFound();
  // }
  
  return (
    <RootLayout
      navMenuData={props.navMenuData}
      footerMenuData={null}
      tabTitle={title}
      resolvedUrl={props.resolvedUrl}
      language='en_GB'
    >
      {RenderPageDataContent(props.pageData)}
    </RootLayout>
  );
}

function RenderPageDataContent(pageData) {
  if (!pageData) {
    return notFound();
  }
  return (
    <main className='site-content flex flex-column flex-align-center flex-justify-start'>
      {pageData?.title && <h1 className='heading-background'>{pageData.title}</h1>}

      {(pageData?.heroPreamble ||
        pageData?.ctaOneAnchorText ||
        pageData?.ctaTwoUrlAnchorText) && (
          <div className='flex flex-column flex-align-center flex-justify-center margin-b--xl width--m max-width-40 text-align-center'>
            {pageData.heroPreamble && (
              <DocumentRenderer document={pageData.heroPreamble.document} />
            )}

            {pageData.ctaOneUrl && pageData.ctaTwoUrlAnchorText && (
              <nav className='flex flex-row'>
                {pageData.ctaOneAnchorText && pageData.ctaOneUrl && (
                  <Link href={pageData.ctaOneUrl} passHref className='margin-lr--xxxs'>
                    <PrimaryButton title={pageData.ctaOneAnchorText} />
                  </Link>
                )}

                {pageData.ctaTwoUrlAnchorText && pageData.ctaTwoUrl && (
                  <Link
                    href={pageData.ctaTwoUrl}
                    passHref
                    className='no-decoration margin-lr--xxxs'
                  >
                    <SecondaryButton title={pageData.ctaTwoUrlAnchorText} />
                  </Link>
                )}
              </nav>
            )}
          </div>
        )}

      {pageData?.sections &&
        pageData?.sections.map((section, index) => (
          <section
            key={index}
            className='flex flex-column flex-align-center flex-justify-center'
          >
            <SectionRender key={index} section={section} />
          </section>
        ))}
    </main>
  );
}


async function fetchMenuData() {
  const navMenuData = await fetchMainMenuData();
  const footerMenuData = await fetchFooterMenuData();
  return { navMenuData, footerMenuData };
}

export async function getServerSideProps({ resolvedUrl }) {
  try {
    const { navMenuData, footerMenuData } = await fetchMenuData();

    const pageData = await fetchGetPageBySlugData(resolvedUrl) ;

    return { props: { navMenuData, footerMenuData, resolvedUrl, pageData } };
  } catch (error) {
    console.error('([slug].jsx) Error fetching data:', error);
    return { props: { error: error.message } };
  }
}
