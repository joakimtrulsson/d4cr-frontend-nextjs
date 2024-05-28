import React, { useState } from 'react';

import { ResourceCard, DropDown } from '../../components/index.js';
import { ALL_RESOURCES, initializeApollo } from '../../graphql/index.js';

export default function ResourcesPage({ allResources }) {
  return <RenderResourcesContent resourcesCat={allResources} />;
}

function RenderResourcesContent(resourcesCat) {
  const [showType, setShowType] = useState('All areas');
  const [currentPage, setCurrentPage] = useState(1);

  const groupedByType = resourcesCat.resourcesCat.reduce((acc, resource) => {
    const type = resource.resourceType.type;

    if (!acc[type]) {
      acc[type] = [];
    }

    acc[type].push(resource);
    return acc;
  }, {});

  const groupsBtn = Object.entries(groupedByType).map(([type, resources]) => {
    return (
      <>
        {type !== showType ? (
          <p
            key={type}
            onClick={() => {
              setShowType(type);
              setCurrentPage(1);
            }}
          >
            {type}
          </p>
        ) : null}
      </>
    );
  });

  let arrayToShow = resourcesCat.resourcesCat;
  if (showType !== 'All areas') {
    arrayToShow = groupedByType[showType];
  }

  //Bestäm hur många som visas på sidorna mm
  const numberOfCards = arrayToShow.length;
  const itemsPerPage = 20;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = arrayToShow.slice(startIndex, endIndex);
  const goToNextPage = () => setCurrentPage((prev) => prev + 1);
  const goToPreviousPage = () => setCurrentPage((prev) => prev - 1);
  const isFirstPage = currentPage === 1;
  const isLastPage = endIndex >= arrayToShow.length;
  const goToPage = (page) => setCurrentPage(page);
  const totalPageCount = Math.ceil(numberOfCards / itemsPerPage);

  return (
    <main className='site-content slug-resources-outer-container flex flex-column flex-align-center flex-justify-center'>
      <h1 className='heading-background'>Supporting resources</h1>

      <DropDown
        className='margin-tb--m'
        showType={showType}
        currentPage={currentPage}
        groupsBtn={groupsBtn}
        setShowType={setShowType}
        setCurrentPage={setCurrentPage}
      />
      <div className='slug-resources-inner-container'>
        {currentItems.map((resource) => (
          <ResourceCard
            key={resource.id}
            img={resource.image?.url || null}
            url={resource.url}
            title={resource.title}
            resourceType={resource.resourceType?.type}
          />
        ))}
      </div>
      {arrayToShow.length > 20 ? (
        <div className='pagination-buttons flex flex-row flex-wrap flex-justify-start flex-align-between '>
          <button
            className='arrow-button'
            onClick={goToPreviousPage}
            disabled={isFirstPage}
          >
            <svg
              width='12'
              height='12'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 320 512'
              fill={`${isFirstPage ? '#DEDEDE' : '#FC7C37'}`}
            >
              <g transform='translate(320, 0) scale(-1, 1)'>
                <path d='M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z' />
              </g>{' '}
            </svg>
          </button>
          {Array.from({ length: totalPageCount }, (_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              className={`page-button ${
                currentPage === index + 1 ? 'active' : ''
              } heading-4`}
            >
              {index + 1}
            </button>
          ))}
          <button className={`arrow-button`} onClick={goToNextPage} disabled={isLastPage}>
            <svg
              width='12'
              height='12'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 320 512'
              fill={`${isLastPage ? '#DEDEDE' : '#FC7C37'}`}
            >
              <path d='M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z' />
            </svg>
          </button>
        </div>
      ) : null}
    </main>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();
  try {
    const { data } = await apolloClient.query({
      query: ALL_RESOURCES,
      variables: { orderBy: { createdAt: 'desc' } },
    });

    return {
      props: { allResources: data.resources, tabTitle: 'Supporting resources' },
      revalidate: Number(process.env.NEXT_PUBLIC_STATIC_REVALIDATE),
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { error: error.message } };
  }
}
