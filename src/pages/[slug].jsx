import React, { useState } from 'react';
import Link from 'next/link';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import ShareForm from '../components/ShareForm/ShareForm.jsx';
import SlackForm from '../components/SlackForm/SlackForm.jsx';
import CloseIcon from '../components/CloseIcon/CloseIcon.jsx';
import SectionRender from '../components/SectionRenderer/SectionRenderer.jsx';
import PrimaryButton from '../components/PrimaryButton/PrimaryButton.jsx';
import SecondaryButton from '../components/SecondaryButton/SecondaryButton.jsx';
import NotFound from '../components/NotFound/NotFound.jsx';

import { initializeApollo, addApolloState } from '../graphql/apolloClient.js';
import { GET_PAGE_BY_SLUG_QUERY } from '../graphql/queries.jsx';
import { ensureValidUrl } from '../utils/modalFunctions.js';
import { markConsecutiveMediaTextSections } from '../utils/markConsecutiveMediaTextSections.js';

export default function SlugPage({ pageData }) {
  const [isClicked, setIsClicked] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const [shareOrSlack, setShareOrSlack] = useState('');

  const url1 = pageData?.ctaOneUrl && ensureValidUrl(pageData.ctaOneUrl);
  const url2 = pageData?.ctaTwoUrl && ensureValidUrl(pageData.ctaTwoUrl);

  if (!pageData) {
    return <NotFound />;
  }

  function clickedBtnCTA1() {
    setShareOrSlack(url1);
    setIsClicked(true);
  }
  function clickedBtnCTA2() {
    setShareOrSlack(url2);
    setIsClicked(true);
  }
  function exitModal() {
    setSlideOut(true);
    setTimeout(() => {
      setIsClicked(false);
      setSlideOut(false);
    }, 500);
  }

  let checkIfMultipleTextMediaSections;
  if (pageData.sections) {
    checkIfMultipleTextMediaSections = markConsecutiveMediaTextSections(
      pageData.sections
    );
  }

  return (
    <main className='site-content page-container flex flex-column flex-align-center flex-justify-start'>
      {pageData?.title && <h1 className='heading-background'>{pageData.title}</h1>}

      {((pageData.heroPreamble.document[0].children[0].text !== '' &&
        pageData.heroPreamble.document.length >= 1) ||
        pageData?.ctaOneAnchorText ||
        pageData?.ctaTwoUrlAnchorText) && (
        <div className='page-hero flex flex-column flex-align-center flex-justify-center margin-b--xl max-width-40 text-align-center'>
          {pageData.heroPreamble && (
            <DocumentRenderer document={pageData.heroPreamble.document} />
          )}

          <nav className='page-hero-buttons flex flex-row'>
            {pageData.ctaOneAnchorText &&
              url1 &&
              (url1 === 'share' || url1 === 'slack' ? (
                <>
                  <PrimaryButton
                    className='margin-r--xxs'
                    title={pageData.ctaOneAnchorText}
                    onClick={clickedBtnCTA1}
                  />
                </>
              ) : url1.startsWith('/') ? (
                <Link href={url1} passHref className='margin-lr--xxxs'>
                  <PrimaryButton title={pageData.ctaOneAnchorText} />
                </Link>
              ) : (
                <Link
                  href={url1}
                  className='margin-r--xxxs'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  <PrimaryButton title={pageData.ctaOneAnchorText} />
                </Link>
              ))}

            {pageData.ctaTwoUrlAnchorText &&
              url2 &&
              (url2 === 'share' || url2 === 'slack' ? (
                <>
                  <SecondaryButton
                    className='margin-r--xxs'
                    title={pageData.ctaTwoUrlAnchorText}
                    onClick={clickedBtnCTA2}
                  />
                </>
              ) : url2.startsWith('/') ? (
                <Link href={url2} passHref className='no-decoration margin-lr--xxxs'>
                  <SecondaryButton title={pageData.ctaTwoUrlAnchorText} />
                </Link>
              ) : (
                <Link
                  href={url2}
                  className='margin-r--xxxs'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  <PrimaryButton title={pageData.ctaTwoUrlAnchorText} />
                </Link>
              ))}
          </nav>
        </div>
      )}
      <div
        className={` ${isClicked ? 'clicked' : 'not-clicked'} ${
          slideOut ? 'clicked-exit' : ''
        }`}
      >
        <div
          className={`modal flex flex-column flex-align-center ${
            slideOut ? 'slide-out' : ''
          }`}
        >
          <button onClick={exitModal} className='btn-exit-video'>
            <CloseIcon />
          </button>
          <div className='box'>
            {shareOrSlack === 'slack' && <SlackForm />}
            {shareOrSlack === 'share' && <ShareForm />}
          </div>
        </div>
      </div>
      {pageData?.sections &&
        pageData?.sections.map((section, index) => (
          <SectionRender
            key={index}
            section={section}
            multipleTextMedia={checkIfMultipleTextMediaSections[index]}
          />
        ))}
    </main>
  );
}

export async function getServerSideProps({ params }) {
  const resolvedUrl = `/${params.slug}`;
  const apolloClient = initializeApollo();

  try {
    const { data, error } = await apolloClient.query({
      query: GET_PAGE_BY_SLUG_QUERY,
      variables: { where: { slug: resolvedUrl } },
    });

    return addApolloState(apolloClient, {
      props: {
        pageData: data.page,
        tabTitle: data.page?.title || 'Page not found',
      },
    });
  } catch (error) {
    console.error('([slug].jsx) Error fetching data:', error);
    return { props: { error: error.message } };
  }
}
