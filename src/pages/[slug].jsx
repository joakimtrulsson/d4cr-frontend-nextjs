import React from 'react';

import SectionRender from '../themes/sources/js/section-renderer';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import PrimaryButton from '../themes/components/buttons/primary-button';
import SecondaryButton from '../themes/components/buttons/secondary-button';
import RootLayout from '../app/layout';

import { useQuery } from '@apollo/client';
import { initializeApollo, addApolloState } from '../data/apollo-client';
import { GET_PAGE_BY_SLUG_QUERY } from '../data/queries.jsx';

//kolla textfil vilka sidor man ska kolla modal url slack share osv

export default function SlugPage({ resolvedUrl }) {
  const { loading, error, data } = useQuery(GET_PAGE_BY_SLUG_QUERY, {
    variables: { where: { slug: resolvedUrl } },
  });

  const title = data.page ? data.page.title : 'Default Title';

  return (
    <RootLayout tabTitle={title} resolvedUrl={resolvedUrl} language='en_GB'>
      {RenderPageDataContent(data.page)}
    </RootLayout>
  );
}

function RenderPageDataContent(pageData) {
  // if (!pageData) {
  //   return notFound();
  // }
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

export async function getServerSideProps({ params }) {
  const resolvedUrl = `/${params.slug}`;
  const apolloClient = initializeApollo();

  try {
    await apolloClient.query({
      query: GET_PAGE_BY_SLUG_QUERY,
      variables: { where: { slug: resolvedUrl } },
    });

    return addApolloState(apolloClient, {
      props: { resolvedUrl },
    });
  } catch (error) {
    console.error('([slug].jsx) Error fetching data:', error);
    return { props: { error: error.message } };
  }
}
