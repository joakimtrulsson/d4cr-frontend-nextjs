import React, { useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import LargeBulletList from '../../components/LargeBulletList/LargeBulletList.jsx';
import ButtonDown from '../../styles/assets/graphics/buttons/btn-scroll-down-default.svg';
import ButtonDownHover from '../../styles/assets/graphics/buttons/btn-scroll-down-hover.svg';
import BottomWave from '../../components/BottomWave/BottomWave.jsx';
import AnimationLeft from '../../styles/assets/graphics/buttons/left-gif-turqouise.gif';
import AnimationRight from '../../styles/assets/graphics/buttons/right-gif-turqouise.gif';
import Resources from '../../components/Resources/Resources.jsx';
import getColorCode from '../../utils/colorCode.js';

import { initializeApollo, addApolloState } from '../../graphql/apolloClient';
import { PRINCIPLES_BY_NUMBER } from '../../graphql/queries.jsx';

export default function PrinciplesPage({ resolvedUrl }) {
  const { loading, error, data } = useQuery(PRINCIPLES_BY_NUMBER, {
    variables: { where: { slug: resolvedUrl } },
  });

  const principleNumber = data.principleNumbers;
  const [logoSrc, setLogoSrc] = useState(ButtonDown);

  //Toplinks
  // Find the index of the current principle in the principlesNumber array
  const currentIndex = principleNumber.findIndex(
    (numbers) => numbers.principles.slug === resolvedUrl
  );
  const previousIndex = currentIndex - 1;
  const previousSlug =
    previousIndex >= 0 ? principleNumber[previousIndex].principles.slug : null;
  const nextIndex = currentIndex + 1;
  const nextSlug =
    nextIndex < principleNumber.length
      ? principleNumber[nextIndex].principles.slug
      : null;
  const useIndex = principleNumber[currentIndex]?.principles;

  //Change props to work in large-bullet list
  const transformedSubPrinciples = Array.isArray(useIndex?.subPrinciples)
    ? useIndex.subPrinciples.map((subPrinciple) => {
        // Check if subPrinciple.text is an array and not undefined or null
        const bodyText = Array.isArray(subPrinciple.text)
          ? subPrinciple.text.map((textItem) => {
              // Check each textItem for 'children' array existence
              return {
                type: 'paragraph',
                children: Array.isArray(textItem.children)
                  ? textItem.children.map((child) => {
                      // Assuming 'child.text' is always present if 'child' exists, but you could add more checks here if needed
                      return { text: child.text };
                    })
                  : [], // Return an empty array if 'children' does not exist or is not an array
              };
            })
          : []; // Return an empty array if 'text' does not exist or is not an array

        return {
          bodyText: bodyText,
        };
      })
    : [];

  const contentForLargeBulletList = {
    bullets: transformedSubPrinciples,
    listType: 'UNORDERED',
  };

  const resources =
    principleNumber[currentIndex]?.principles?.resources.length !== 0
      ? principleNumber[currentIndex]?.principles?.resources
      : null;

  return (
    // <RootLayout
    //   className="navmenu"
    //   navMenuData={props.navMenuData}
    //   footerMenuData={null}
    //   tabTitle={useIndex?.title}
    //   resolvedUrl={props.resolvedUrl}
    //   language='en_GB'
    // >
    <main className='outer-main-principle'>
      <div className='flex flex-row bg-turquoise-100 flex-justify-center navbar-principle-links'>
        {previousSlug ? (
          <a href={`./${previousSlug}`} className='links image-arrows'>
            <svg
              width='16'
              height='14'
              viewBox='0 0 16 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              style={{ transform: 'scaleX(-1)' }}
            >
              <path
                d='M15.4336 8.05859L9.80859 13.6836C9.57422 13.8945 9.30469 14 9 14C8.69531 14 8.42578 13.8945 8.19141 13.6836C7.98047 13.4492 7.875 13.1797 7.875 12.875C7.875 12.5703 7.98047 12.3008 8.19141 12.0664L11.918 8.375H1.125C0.796875 8.375 0.527344 8.26953 0.316406 8.05859C0.105469 7.84766 0 7.57812 0 7.25C0 6.92188 0.105469 6.65234 0.316406 6.44141C0.527344 6.23047 0.796875 6.125 1.125 6.125H11.918L8.19141 2.43359C7.98047 2.19922 7.875 1.92969 7.875 1.625C7.875 1.32031 7.98047 1.05078 8.19141 0.816406C8.42578 0.605469 8.69531 0.5 9 0.5C9.30469 0.5 9.57422 0.605469 9.80859 0.816406L15.4336 6.44141C15.6445 6.67578 15.75 6.94531 15.75 7.25C15.75 7.55469 15.6445 7.82422 15.4336 8.05859Z'
                fill='#090909'
              />
            </svg>
            <p>Previous</p>
          </a>
        ) : (
          <div className='links image-arrows'>
            <svg
              width='16'
              height='14'
              viewBox='0 0 16 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              style={{ transform: 'scaleX(-1)' }}
            >
              <path
                d='M15.4336 8.05859L9.80859 13.6836C9.57422 13.8945 9.30469 14 9 14C8.69531 14 8.42578 13.8945 8.19141 13.6836C7.98047 13.4492 7.875 13.1797 7.875 12.875C7.875 12.5703 7.98047 12.3008 8.19141 12.0664L11.918 8.375H1.125C0.796875 8.375 0.527344 8.26953 0.316406 8.05859C0.105469 7.84766 0 7.57812 0 7.25C0 6.92188 0.105469 6.65234 0.316406 6.44141C0.527344 6.23047 0.796875 6.125 1.125 6.125H11.918L8.19141 2.43359C7.98047 2.19922 7.875 1.92969 7.875 1.625C7.875 1.32031 7.98047 1.05078 8.19141 0.816406C8.42578 0.605469 8.69531 0.5 9 0.5C9.30469 0.5 9.57422 0.605469 9.80859 0.816406L15.4336 6.44141C15.6445 6.67578 15.75 6.94531 15.75 7.25C15.75 7.55469 15.6445 7.82422 15.4336 8.05859Z'
                fill='#BDBDBD'
              />
            </svg>
            <p className='link-no-previous'>Previous</p>
          </div>
        )}

        {principleNumber.map((numbers) => {
          const isActive = resolvedUrl === numbers.principles.slug;
          return (
            <div key={numbers.principles.id}>
              <a
                href={!isActive ? `.${numbers.principles.slug}` : null}
                className={`links`}
              >
                {' '}
                <h2 className={`numbers ${isActive ? 'active-link' : ''}`}>
                  {' '}
                  {numbers.number}{' '}
                </h2>
              </a>
            </div>
          );
        })}

        {nextSlug ? (
          <a href={`./${nextSlug}`} className='links image-arrows'>
            <p>Next</p>
            <svg
              width='16'
              height='14'
              viewBox='0 0 16 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M15.4336 8.05859L9.80859 13.6836C9.57422 13.8945 9.30469 14 9 14C8.69531 14 8.42578 13.8945 8.19141 13.6836C7.98047 13.4492 7.875 13.1797 7.875 12.875C7.875 12.5703 7.98047 12.3008 8.19141 12.0664L11.918 8.375H1.125C0.796875 8.375 0.527344 8.26953 0.316406 8.05859C0.105469 7.84766 0 7.57812 0 7.25C0 6.92188 0.105469 6.65234 0.316406 6.44141C0.527344 6.23047 0.796875 6.125 1.125 6.125H11.918L8.19141 2.43359C7.98047 2.19922 7.875 1.92969 7.875 1.625C7.875 1.32031 7.98047 1.05078 8.19141 0.816406C8.42578 0.605469 8.69531 0.5 9 0.5C9.30469 0.5 9.57422 0.605469 9.80859 0.816406L15.4336 6.44141C15.6445 6.67578 15.75 6.94531 15.75 7.25C15.75 7.55469 15.6445 7.82422 15.4336 8.05859Z'
                fill='#090909'
              />
            </svg>
          </a>
        ) : (
          <div className='links image-arrows'>
            <p className='link-no-previous'>Next</p>
            <svg
              width='16'
              height='14'
              viewBox='0 0 16 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M15.4336 8.05859L9.80859 13.6836C9.57422 13.8945 9.30469 14 9 14C8.69531 14 8.42578 13.8945 8.19141 13.6836C7.98047 13.4492 7.875 13.1797 7.875 12.875C7.875 12.5703 7.98047 12.3008 8.19141 12.0664L11.918 8.375H1.125C0.796875 8.375 0.527344 8.26953 0.316406 8.05859C0.105469 7.84766 0 7.57812 0 7.25C0 6.92188 0.105469 6.65234 0.316406 6.44141C0.527344 6.23047 0.796875 6.125 1.125 6.125H11.918L8.19141 2.43359C7.98047 2.19922 7.875 1.92969 7.875 1.625C7.875 1.32031 7.98047 1.05078 8.19141 0.816406C8.42578 0.605469 8.69531 0.5 9 0.5C9.30469 0.5 9.57422 0.605469 9.80859 0.816406L15.4336 6.44141C15.6445 6.67578 15.75 6.94531 15.75 7.25C15.75 7.55469 15.6445 7.82422 15.4336 8.05859Z'
                fill='#BDBDBD'
              />
            </svg>
          </div>
        )}
      </div>
      <div>
        <div className='bg-turquoise-50 margin-tb--xxxs-negative main-container'>
          <div className='flex flex-row flex-nowrap title-image-container'>
            <Image src={AnimationLeft} alt='Animated GIF' className='left-absolute' />
            <div className='flex flex-row flex-nowrap title-div'>
              <div className='flex flex-column width--m left-part'>
                <p className='margin--zero sub-heading-m gray-color'>
                  {'Principle ' + principleNumber[currentIndex]?.number}
                </p>
                <h1>{useIndex?.title}</h1>
                <p className='padding-tb--xxs margin--zero gray-color'>
                  {useIndex?.subHeader}
                </p>
              </div>
              <div className='flex flex-column width--m right-part'>
                <div className='quote-container'>
                  <h4 className='quote'>{useIndex?.quote}</h4>
                  <p className='quote-author'>{useIndex?.quoteAuthor}</p>
                  <svg
                    className='quote-marks'
                    width='46'
                    height='34'
                    viewBox='0 0 46 34'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M9.84624 13.3912C12.6484 13.4595 14.9722 14.4163 16.8176 16.2617C18.6629 18.107 19.6197 20.4308 19.6881 23.233C19.6197 26.0352 18.6629 28.359 16.8176 30.2043C14.9722 32.0497 12.6484 33.0065 9.84624 33.0749C7.04405 33.0065 4.72028 32.0497 2.87493 30.2043C1.02959 28.359 0.0727407 26.0352 0.00439453 23.233V13.3912C0.0727407 9.70046 1.37132 6.62489 3.90013 4.16442C6.36059 1.63562 9.43617 0.337038 13.1269 0.268692C14.0837 0.268692 14.8697 0.57625 15.4848 1.19137C16.0999 1.80648 16.4075 2.59246 16.4075 3.54931C16.4075 4.50615 16.0999 5.29214 15.4848 5.90725C14.8697 6.52237 14.0837 6.82992 13.1269 6.82992C11.2815 6.89827 9.74372 7.54756 8.51349 8.77779C7.28326 10.008 6.63397 11.5458 6.56563 13.3912V14.0063C7.59082 13.5962 8.68436 13.3912 9.84624 13.3912ZM36.0912 13.3912C38.8934 13.4595 41.2171 14.4163 43.0625 16.2617C44.9078 18.107 45.8647 20.4308 45.933 23.233C45.8647 26.0352 44.9078 28.359 43.0625 30.2043C41.2171 32.0497 38.8934 33.0065 36.0912 33.0749C33.289 33.0065 30.9652 32.0497 29.1199 30.2043C27.2745 28.359 26.3177 26.0352 26.2493 23.233V13.3912C26.3177 9.70046 27.6162 6.62489 30.1451 4.16442C32.6055 1.63562 35.6811 0.337038 39.3718 0.268692C40.3286 0.268692 41.1146 0.57625 41.7297 1.19137C42.3448 1.80648 42.6524 2.59246 42.6524 3.54931C42.6524 4.50615 42.3448 5.29214 41.7297 5.90725C41.1146 6.52237 40.3286 6.82992 39.3718 6.82992C37.5264 6.89827 35.9887 7.54756 34.7584 8.77779C33.5282 10.008 32.8789 11.5458 32.8106 13.3912V14.0063C33.8357 13.5962 34.9293 13.3912 36.0912 13.3912Z'
                      fill='#486766'
                    />
                  </svg>
                </div>
                <div className='width-full flex flex-justify-center flex-align-center'>
                  {useIndex?.image ? (
                    <Image
                      className='img-size'
                      width={500}
                      height={500}
                      src={useIndex.image?.url}
                      alt='Image put in by user in principle-card'
                      objectFit='cover'
                    />
                  ) : (
                    <div className='no-image-placeholder'>No Image</div>
                    // Ändra till null eller exempelbild?
                  )}
                </div>
              </div>
            </div>
            <Image src={AnimationRight} alt='Animated GIF' className='right-absolute' />
          </div>
          <a className='image-container' href='#target-section'>
            <Image
              src={logoSrc}
              alt='arrow pointing down'
              onMouseEnter={() => {
                setLogoSrc(ButtonDownHover);
              }}
              onMouseOut={() => {
                setLogoSrc(ButtonDown);
              }}
              className='scroll-button'
            />
          </a>
        </div>
        <BottomWave
          fillColorCode={getColorCode('turquoise-50')}
          className='bottom-wave'
        />
      </div>
      <div id='target-section' className='bullet-div'>
        <LargeBulletList content={contentForLargeBulletList} />
      </div>
      <>
        {resources ? (
          <Resources
            resources={resources}
            title={principleNumber[currentIndex].principles.resourcesTitle}
            preamble={principleNumber[currentIndex].principles.resourcesPreamble}
          />
        ) : null}
      </>
    </main>
    //</RootLayout>
  );
}

export async function getServerSideProps({ params }) {
  // const slug = '/' + resolvedUrl.split('/').pop();
  const apolloClient = initializeApollo();
  const resolvedUrl = `/${params.slug}`;
  try {
    // const principleNumbersData = await fetchPrinciplesSortedByNumber();
    // const navMenuData = await fetchMainMenuData();
    // const footerMenuData = await fetchFooterMenuData();

    await apolloClient.query({
      query: PRINCIPLES_BY_NUMBER,
      // variables: { where: { slug: resolvedUrl } },
    });

    // return {
    //   props: {
    //     slug: slug,
    //     principleNumbers: principleNumbersData,
    //     // navMenuData,
    //     // footerMenuData,
    //     resolvedUrl,
    //   },
    // };
    return addApolloState(apolloClient, {
      props: { resolvedUrl },
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { principleNumbers: null } };
  }
}
