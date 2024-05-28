import React, { useState, useRef } from 'react';
import Image from 'next/image';

import {
  LargeBulletList,
  BottomWave,
  Resources,
  NotFound,
  QuoteMarksSvg,
  ButtonDown,
  PrinciplesNavigation,
  PrinciplesDropDown,
} from '../../components/index.js';
import {
  initializeApollo,
  GET_ALL_PRINCIPLES_SLUG,
  PRINCIPLES_BY_NUMBER,
} from '../../graphql/index.js';
import { getColorCode } from '../../utils/index.js';

import AnimationLeft from '../../styles/assets/graphics/buttons/left-gif-turqouise.gif';
import AnimationRight from '../../styles/assets/graphics/buttons/right-gif-turqouise.gif';

export default function PrinciplesPage({ principleNumber, resolvedUrl }) {
  const largeBulletListRef = useRef(null);
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
          previousSlug={previousSlug}
          nextSlug={nextSlug}
        />
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
        <div id='target-section'></div>
        <BottomWave
          fillColorCode={getColorCode('turquoise-50')}
          className='bottom-wave'
        />
      </div>

      <LargeBulletList
        ref={largeBulletListRef}
        id='target-section'
        className='subprinciples'
        content={contentForLargeBulletList}
      />

      {resources ? (
        <Resources
          resources={resources}
          title={principleNumber[currentIndex].principles.resourcesTitle}
          preamble={principleNumber[currentIndex].principles.resourcesPreamble}
        />
      ) : null}
    </main>
  );
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();
  const resolvedUrl = `/${params.slug}`;

  try {
    const { data } = await apolloClient.query({
      query: PRINCIPLES_BY_NUMBER,
    });

    return {
      props: {
        principleNumber: data.principleNumbers || null,
        resolvedUrl,
        tabTitle: 'Principles',
      },
      revalidate: Number(process.env.NEXT_PUBLIC_STATIC_REVALIDATE),
    };
  } catch (error) {
    console.error('([slug].jsx) Error fetching data:', error);
    return { props: { error: error.message } };
  }
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();
  try {
    const { data } = await apolloClient.query({
      query: GET_ALL_PRINCIPLES_SLUG,
    });

    const paths = data.principles
      // .filter((page) => page.slug.startsWith('/principles/'))
      .map((page) => ({
        // params: { slug: page.slug.replace('/cases/', '') },
        params: { slug: page.slug },
      }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('(principles/[slug].jsx) Error fetching data:', error);
    return null;
  }
}
