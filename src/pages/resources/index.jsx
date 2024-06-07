import React, { useState } from 'react';

import { ResourceCard } from '../../components/index.js';
import { ALL_RESOURCES, initializeApollo } from '../../graphql/index.js';

export default function ResourcesPage({ allResources, resourceCategories }) {
  return (
    <RenderResourcesContent
      resourcesCat={allResources}
      resourceCategories={resourceCategories}
    />
  );
}

function RenderResourcesContent(resourcesCat) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showType, setShowType] = useState(
    resourcesCat.resourceCategories.map((category) => category.title)
  );

  const [itemsPerPage] = useState(9);

  const filteredResources =
    showType.length === 0
      ? resourcesCat.resourcesCat
      : resourcesCat.resourcesCat.filter((resource) =>
          showType.includes(resource.resourceCategory.title)
        );

  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);

  const currentItems = filteredResources.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const goToPage = (number) => {
    setCurrentPage(number);
  };

  const handleCheckboxChange = (categoryTitle) => {
    if (showType.includes(categoryTitle)) {
      setShowType(showType.filter((type) => type !== categoryTitle));
    } else {
      setShowType([...showType, categoryTitle]);
    }
    setCurrentPage(1);
  };

  const groupByCategory = (resources) => {
    return resources.reduce((grouped, resource) => {
      const key = resource.resourceCategory.title;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(resource);
      return grouped;
    }, {});
  };

  return (
    <main className='site-content slug-resources-outer-container flex flex-column flex-align-center flex-justify-center'>
      <h1 className='heading-background margin-b--xxl'>Supporting resources</h1>

      <div
        className='flex flex-row flex-justify-start flex-align-between news-categories-container margin-b--l'
        style={{ gap: '1rem' }}
      >
        {resourcesCat.resourceCategories &&
          resourcesCat.resourceCategories.map((category) => (
            <label key={category.title} className='checkbox-container '>
              <input
                checked={showType.includes(category.title)}
                type='checkbox'
                onChange={() => handleCheckboxChange(category.title)}
              />
              <span className='checkmark'></span>
              <span className='heading-4'>{category.title}</span>
            </label>
          ))}
      </div>

      {showType.length === 0 ? (
        <p>Please select a category...</p>
      ) : (
        Object.entries(groupByCategory(currentItems)).map(([category, resources]) => (
          <>
            <h3 className='category-title sub-heading-m color-grey-400 text-align-center margin-t--s margin--zero'>
              {category}
            </h3>
            <div className='slug-resources-inner-container'>
              {resources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  img={resource.image?.url || null}
                  url={resource.url}
                  title={resource.title}
                  resourceType={resource.resourceType?.type}
                />
              ))}
            </div>
          </>
        ))
      )}

      <div className='pagination-buttons flex flex-row flex-wrap flex-justify-start flex-align-between '>
        <div>
          <button
            className='arrow-button'
            disabled={isFirstPage}
            onClick={goToPreviousPage}
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
          {Array.from({ length: totalPages }, (_, index) => (
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
      </div>
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
      props: {
        allResources: data.resources,
        resourceCategories: data.resourceCategories,
        tabTitle: 'Supporting resources',
      },
      revalidate: Number(process.env.NEXT_PUBLIC_STATIC_REVALIDATE),
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { error: error.message } };
  }
}
