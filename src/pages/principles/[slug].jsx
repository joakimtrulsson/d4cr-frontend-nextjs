import React, { useState } from 'react';
import Image from 'next/image';

import {
  LargeBulletList,
  BottomWave,
  Resources,
  NotFound,
  ArrowLeftSvg,
  ArrowRightSvg,
  QuoteMarksSvg,
  ButtonDown,
  PrinciplesNavigation,
  PrinciplesDropDown,
} from '../../components/index.js';
import {
  initializeApollo,
  addApolloState,
  PRINCIPLES_BY_NUMBER,
} from '../../graphql/index.js';
import { getColorCode } from '../../utils/index.js';

import AnimationLeft from '../../styles/assets/graphics/buttons/left-gif-turqouise.gif';
import AnimationRight from '../../styles/assets/graphics/buttons/right-gif-turqouise.gif';

export default function PrinciplesPage({ principleNumber, resolvedUrl }) {
  const [logoSrc, setLogoSrc] = useState(ButtonDown);
  const [isHovered, setIsHovered] = useState(false);
  const principleExists = principleNumber.some(
    (principle) => principle.principles.slug === resolvedUrl
  );

  if (!principleExists) {
    return <NotFound />;
  }

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
        const bodyText = Array.isArray(subPrinciple.text)
          ? subPrinciple.text.map((textItem) => {
              return {
                type: 'paragraph',
                children: Array.isArray(textItem.children)
                  ? textItem.children.map((child) => {
                      return { text: child.text };
                    })
                  : [],
              };
            })
          : [];

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
    <main className='site-content outer-main-principle flex flex-column flex-justify-center flex-align-center'>
      <div className='flex flex-row bg-turquoise-100 flex-justify-center navbar-principle-links'>
        <PrinciplesDropDown
          principleNumber={principleNumber}
          resolvedUrl={resolvedUrl}
          previousSlug={previousSlug}
          nextSlug={nextSlug}
        />

        <PrinciplesNavigation
          principleNumber={principleNumber}
          resolvedUrl={resolvedUrl}
        />
        {/* 
        {previousSlug ? (
          <a href={`./${previousSlug}`} className='links image-arrows'>
            <ArrowLeftSvg width='20' height='18' color={getColorCode('grey-900')} />
            <p>Previous</p>
          </a>
        ) : (
          <div className='links image-arrows'>
            <ArrowLeftSvg width='20' height='18' color={getColorCode('grey-200')} />
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
                <h2 className={`numbers ${isActive ? 'active-link' : ''}`}>
                  {numbers.number}
                </h2>
              </a>
            </div>
          );
        })}

        {nextSlug ? (
          <a href={`./${nextSlug}`} className='links image-arrows'>
            <p>Next</p>

            <ArrowRightSvg width='20' height='18' color={getColorCode('grey-900')} />
          </a>
        ) : (
          <div className='links image-arrows'>
            <p className='link-no-previous'>Next</p>
            <ArrowRightSvg width='20' height='18' color={getColorCode('grey-200')} />
          </div>
        )} */}
      </div>
      <div>
        <div className='bg-turquoise-50 margin-tb--xxxs-negative main-container'>
          <div className='flex flex-row flex-nowrap title-image-container'>
            <Image src={AnimationLeft} alt='Animated GIF' className='left-absolute' />
            <div className='flex flex-row title-div'>
              <div className='flex flex-column left-part'>
                <p className='margin--zero sub-heading-m gray-color'>
                  {'Principle ' + principleNumber[currentIndex]?.number}
                </p>
                <h1>{useIndex?.title}</h1>
                <p className='padding-tb--xxs margin--zero gray-color'>
                  {useIndex?.subHeader}
                </p>
              </div>
              <div className='flex flex-column right-part'>
                <div className='quote-container'>
                  <div className='quote'>
                    <h4 className='quote-text'>{useIndex?.quote}</h4>
                    <p className='quote-author'>{useIndex?.quoteAuthor}</p>
                    <QuoteMarksSvg
                      width='46'
                      height='34'
                      color={getColorCode('turquoise-700')}
                    />
                  </div>
                </div>
                <div className='width-full flex flex-justify-center flex-align-center'>
                  {useIndex?.image ? (
                    <Image
                      className='img-size'
                      width={500}
                      height={500}
                      layout='responsive'
                      src={useIndex.image?.url}
                      alt='Image put in by user in principle-card'
                      objectFit='cover'
                    />
                  ) : (
                    <div className='no-image-placeholder'>No Image</div>
                  )}
                </div>
              </div>
            </div>
            <Image src={AnimationRight} alt='Animated GIF' className='right-absolute' />
          </div>
          <a
            className='image-container'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            href='#target-section'
          >
            <ButtonDown
              color={getColorCode('turquoise-700')}
              height='50'
              width='50'
              backgroundColor={getColorCode('turquoise-200')}
              className='scroll-button'
              isHovered={isHovered}
            />
          </a>
        </div>
        <BottomWave
          fillColorCode={getColorCode('turquoise-50')}
          className='bottom-wave'
        />
      </div>

      {/* <div id='target-section' className='bullet-div'> */}
      <LargeBulletList className='subprinciples' content={contentForLargeBulletList} />
      {/* </div> */}
      <div className='principles-resources'>
        {resources ? (
          <Resources
            resources={resources}
            title={principleNumber[currentIndex].principles.resourcesTitle}
            preamble={principleNumber[currentIndex].principles.resourcesPreamble}
          />
        ) : null}
      </div>
    </main>
  );
}

export async function getServerSideProps({ params }) {
  const apolloClient = initializeApollo();
  const resolvedUrl = `/${params.slug}`;
  try {
    const { data } = await apolloClient.query({
      query: PRINCIPLES_BY_NUMBER,
    });

    return addApolloState(apolloClient, {
      props: {
        principleNumber: data.principleNumbers || null,
        resolvedUrl,
        tabTitle: 'Principles',
      },
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { principleNumbers: null } };
  }
}

// const PrinciplesDropDown = ({ principleNumber, resolvedUrl, previousSlug, nextSlug }) => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const toggleDropdown = () => setShowDropdown(!showDropdown);

//   const handleChange = (event) => {
//     const url = event.target.value;

//     if (url) {
//       window.location.href = url;
//     }
//   };

//   const currentPrinciple = principleNumber.find(
//     (numbers) => numbers.principles.slug === resolvedUrl
//   );

//   return (
//     <div className='dropdown '>
//       <button onClick={toggleDropdown} className='dropbtn dropClick'>
//         {showDropdown ? 'Select Principle' : `Principle ${currentPrinciple?.number}`}
//         <svg
//           className='dropClick'
//           width='12'
//           height='12'
//           xmlns='http://www.w3.org/2000/svg'
//           viewBox='0 0 512 512'
//           fill='#2D2D2D'
//         >
//           <path
//             className='dropClick'
//             d='M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192

// c

// 12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z'
//           />
//         </svg>
//       </button>

//       {showDropdown && (
//         <div className='dropdown-content'>
//           {principleNumber.map((numbers) => {
//             const isActive = resolvedUrl === numbers.principles.slug;
//             return (
//               <p
//                 key={numbers.principles.id}
//                 onClick={() =>
//                   !isActive && (window.location.href = `.${numbers.principles.slug}`)
//                 }
//               >
//                 {`Principle ${numbers.number}`}
//               </p>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };
