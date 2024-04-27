import React, { useState } from 'react';
import RootLayout from '../../app/layout';
import Newscard from '../../themes/components/news-card';

import { useQuery } from '@apollo/client';
import { initializeApollo, addApolloState } from '../../data/apollo-client';
import { GET_ALL_NEWS_QUERY } from '../../data/queries';

export default function NewsPage() {
  const { loading, error, data } = useQuery(GET_ALL_NEWS_QUERY, {
    variables: { orderBy: { createdAt: 'desc' } },
  });

  const title = 'News';

  return (
    // <RootLayout tabTitle={title} language='en_GB'>
    <RenderAllNews allNews={data.newsItems} newsCategories={data.newsCategories} />
    // </RootLayout>
  );
}

function RenderAllNews({ allNews, newsCategories }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showType, setShowType] = useState(
    newsCategories.map((category) => category.categoryTitle)
  );

  const [itemsPerPage] = useState(9);

  const filteredNews =
    showType.length === 0
      ? allNews
      : allNews.filter((news) => showType.includes(news.newsCategory.categoryTitle));

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  const currentItems = filteredNews.slice(
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

  return (
    <main className='slug-news-outer-container flex flex-column flex-align-center'>
      <h1 className='heading-background margin-b--xxl'>News</h1>
      <div
        className='flex flex-row flex-justify-start flex-align-between gap'
        style={{ gap: '1rem' }}
      >
        {newsCategories &&
          newsCategories.map((category) => (
            <label key={category.categoryTitle} className='checkbox-container '>
              <input
                checked={showType.includes(category.categoryTitle)}
                type='checkbox'
                onChange={() => handleCheckboxChange(category.categoryTitle)}
              />
              <span className='checkmark'></span>
              <span className='heading-4'>{category.categoryTitle}</span>
            </label>
          ))}
      </div>

      <div className='slug-news-inner-container flex flex-row flex-wrap flex-justify-center flex-align-between '>
        {showType.length === 0 ? (
          <p>Please select a category...</p>
        ) : (
          currentItems &&
          currentItems.map((news) => (
            <Newscard
              key={news.id}
              imageUrl={news.image?.url}
              type={news.newsCategory.categoryTitle}
              title={news.title}
              url={`${news.slug}`}
              alt='news image'
            />
          ))
        )}
      </div>

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

export async function getServerSideProps({ resolvedUrl }) {
  const apolloClient = initializeApollo();
  try {
    await apolloClient.query({
      query: GET_ALL_NEWS_QUERY,
      variables: { orderBy: { createdAt: 'desc' } },
    });

    return addApolloState(apolloClient, {
      props: {},
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { error: error.message } };
  }
}
