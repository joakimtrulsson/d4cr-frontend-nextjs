import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Animation from '../../styles/assets/graphics/animation.gif';
import Newscard from '../NewsCard/NewsCard.jsx';
import SecondaryButton from '../SecondaryButton/SecondaryButton.jsx';
import WYSIWYG from '../Wysiwyg/Wysiwyg.jsx';
import {
  fetchGetNewsItemByChapter,
  fetchAllNews,
  fetchGetNewsItemByCategory,
  fetchGetNewsItemByCategoryAndChapter,
} from '../../graphql/dataFetches.js';

export default function NewsTeaser({ content }) {
  const newsVar = content.selectedNews;
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let response;
      if (newsVar.chapter === 'ALLCHAPTERS') {
        if (newsVar.category === 'ALL') {
          response = await fetchAllNews();
        } else {
          response = await fetchGetNewsItemByCategory(newsVar.category);
        }
      } else {
        if (newsVar.category === 'ALL') {
          response = await fetchGetNewsItemByChapter(newsVar.chapter);
        } else {
          response = await fetchGetNewsItemByCategoryAndChapter(
            newsVar.category,
            newsVar.chapter
          );
        }
      }

      setData(response);
    }

    fetchData();
  }, [newsVar.chapter, newsVar.category]);

  return (
    <>
      {data ? (
        <div
          className='news-teaser-container flex flex-column flex-justify-center flex-align-center 
        padding-tb--xxl'
        >
          <div className='animation-background'>
            <Image src={Animation} alt='Animated GIF' />
          </div>

          <div className='text-align-center heading-text'>
            <h2 className='margin-t--xxs margin--zero'>{content.title}</h2>
            <WYSIWYG
              content={content.subHeading ? content.subHeading : content.preamble}
            />
          </div>

          <div className='news-card-container  margin-tb--s flex flex-row'>
            {data?.newsItems?.slice(0, 3).map((item) => (
              <Newscard
                key={item.id}
                type={item.newsCategory.categoryTitle}
                title={item.title}
                url={item.slug}
                imageUrl={item.image?.url}
              />
            ))}
          </div>

          <div className='button-wrapper margin-tb--s'>
            <Link className='no-decoration' href='../news'>
              <SecondaryButton title={'SEE ALL'} />
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
