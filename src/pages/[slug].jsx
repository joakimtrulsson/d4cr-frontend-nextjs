import React, { useState } from 'react';
import PopupForm from '../themes/components/popup-form-share.jsx'
import SlackForm from '../themes/components/popup-form-slack.jsx'

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
import { ensureValidUrl } from '../themes/sources/js/modal-functions.js'


export default function SlugPage({ resolvedUrl }) {
  const { loading, error, data } = useQuery(GET_PAGE_BY_SLUG_QUERY, {
    variables: { where: { slug: resolvedUrl } },
  });
  //console.log(data.page)
  const pageData = data.page
  const url1 = pageData?.ctaOneUrl && ensureValidUrl(pageData.ctaOneUrl)
  const url2 = pageData?.ctaTwoUrl && ensureValidUrl(pageData.ctaTwoUrl)

  const [isClicked, setIsClicked] = useState(false)
  const [slideOut, setSlideOut] = useState(false)
  const [shareOrSlack, setShareOrSlack] = useState('')

  function clickedBtnCTA1() {
    setShareOrSlack(url1)
    setIsClicked(true);
  }
  function clickedBtnCTA2() {
    setShareOrSlack(url2)
    setIsClicked(true);
  }
  function exitModal() {
    setSlideOut(true);
    setTimeout(() => {
      setIsClicked(false);
      setSlideOut(false);
    }, 500);
  }
  const title = data.page ? data.page.title : 'Default Title';
  if (!pageData) {
    return notFound();
  }
  return (
    <RootLayout tabTitle={title} resolvedUrl={resolvedUrl} language='en_GB'>
      
      <main className='site-content flex flex-column flex-align-center flex-justify-start'>
      {pageData?.title && <h1 className='heading-background'>{pageData.title}</h1>}

        {(pageData?.heroPreamble ||
          pageData?.ctaOneAnchorText ||
          pageData?.ctaTwoUrlAnchorText) && (
          <div className='flex flex-column flex-align-center flex-justify-center margin-b--xl width--m max-width-40 text-align-center'>
            {pageData.heroPreamble && (
              <DocumentRenderer document={pageData.heroPreamble.document} />
            )}


              <nav className='flex flex-row'>
                {pageData.ctaOneAnchorText && url1 && (
                  (url1 === 'share' || url1 === 'slack') ? (
                    <>
                      <PrimaryButton className='margin-r--xxs' title={pageData.ctaOneAnchorText} onClick={clickedBtnCTA1} />
                    </>
                  ) : (
                    url1.startsWith("/") ? (
                      <Link href={url1} passHref className='margin-lr--xxxs'>
                        <PrimaryButton title={pageData.ctaOneAnchorText} />
                      </Link>) :
                      (< Link href={url1} className='margin-r--xxxs' rel="noopener noreferrer" target="_blank">
                        <PrimaryButton title={pageData.ctaOneAnchorText} />
                      </Link>)
                  )
                )}

                {pageData.ctaTwoUrlAnchorText && url2 && (
                  (url2 === 'share' || url2 === 'slack') ? (<>
                    <SecondaryButton className='margin-r--xxs' title={pageData.ctaTwoUrlAnchorText} onClick={clickedBtnCTA2} />
                  </>) : (
                    url2.startsWith("/") ? (
                      <Link
                        href={url2}
                        passHref
                        className='no-decoration margin-lr--xxxs'
                      >
                        <SecondaryButton title={pageData.ctaTwoUrlAnchorText} />
                      </Link>) : (< Link href={url2} className='margin-r--xxxs' rel="noopener noreferrer" target="_blank">
                        <PrimaryButton title={pageData.ctaTwoUrlAnchorText} />
                      </Link>)
                  )
                )}
              </nav>


            </div>
          )}
        < div className={` ${isClicked ? 'clicked' : 'not-clicked'} ${slideOut ? 'clicked-exit' : ''}`}>
          <div className={`modal flex flex-column flex-align-center ${slideOut ? 'slide-out' : ''}`}>
            <button onClick={exitModal} className="btn-exit-video">X</button>
            <div className="box">
              {shareOrSlack === 'slack' && <SlackForm />}
              {shareOrSlack === 'share' && <PopupForm />}
            </div>
          </div>
        </div>
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
    </RootLayout>
  );
}

/*function RenderPageDataContent(pageData) {
  if (!pageData) {
    return notFound();
  }
  return (
    // <main className='site-content flex flex-column flex-align-center flex-justify-start'>
    //   {pageData?.title && <h1 className='heading-background'>{pageData.title}</h1>}

    //     {(pageData?.heroPreamble ||
    //       pageData?.ctaOneAnchorText ||
    //       pageData?.ctaTwoUrlAnchorText) && (
    //       <div className='flex flex-column flex-align-center flex-justify-center margin-b--xl width--m max-width-40 text-align-center'>
    //         {pageData.heroPreamble && (
    //           <DocumentRenderer document={pageData.heroPreamble.document} />
    //         )}


    //           <nav className='flex flex-row'>
    //             {pageData.ctaOneAnchorText && url1 && (
    //               (url1 === 'share' || url1 === 'slack') ? (
    //                 <>
    //                   <PrimaryButton className='margin-r--xxs' title={pageData.ctaOneAnchorText} onClick={clickedBtnCTA1} />
    //                 </>
    //               ) : (
    //                 url1.startsWith("/") ? (
    //                   <Link href={url1} passHref className='margin-lr--xxxs'>
    //                     <PrimaryButton title={pageData.ctaOneAnchorText} />
    //                   </Link>) :
    //                   (< Link href={url1} className='margin-r--xxxs' rel="noopener noreferrer" target="_blank">
    //                     <PrimaryButton title={pageData.ctaOneAnchorText} />
    //                   </Link>)
    //               )
    //             )}

    //             {pageData.ctaTwoUrlAnchorText && url2 && (
    //               (url2 === 'share' || url2 === 'slack') ? (<>
    //                 <SecondaryButton className='margin-r--xxs' title={pageData.ctaTwoUrlAnchorText} onClick={clickedBtnCTA2} />
    //               </>) : (
    //                 url2.startsWith("/") ? (
    //                   <Link
    //                     href={url2}
    //                     passHref
    //                     className='no-decoration margin-lr--xxxs'
    //                   >
    //                     <SecondaryButton title={pageData.ctaTwoUrlAnchorText} />
    //                   </Link>) : (< Link href={url2} className='margin-r--xxxs' rel="noopener noreferrer" target="_blank">
    //                     <PrimaryButton title={pageData.ctaTwoUrlAnchorText} />
    //                   </Link>)
    //               )
    //             )}
    //           </nav>


    //         </div>
    //       )}
    //     < div className={` ${isClicked ? 'clicked' : 'not-clicked'} ${slideOut ? 'clicked-exit' : ''}`}>
    //       <div className={`modal flex flex-column flex-align-center ${slideOut ? 'slide-out' : ''}`}>
    //         <button onClick={exitModal} className="btn-exit-video">X</button>
    //         <div className="box">
    //           {shareOrSlack === 'slack' && <SlackForm />}
    //           {shareOrSlack === 'share' && <PopupForm />}
    //         </div>
    //       </div>
    //     </div>
    //     {pageData?.sections &&
    //       pageData?.sections.map((section, index) => (
    //         <section
    //           key={index}
    //           className='flex flex-column flex-align-center flex-justify-center'
    //         >
    //           <SectionRender key={index} section={section} />
    //         </section>
    //       ))}
    //   </main>
    
  );
}*/

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
