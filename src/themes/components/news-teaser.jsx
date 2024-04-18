
import Animation from '../sources/assets/graphics/animation.gif'
import Image from 'next/image'
import Newscard from './news-card.jsx'
import SecondaryButton from './buttons/secondary-button.jsx'
import WYSIWYG from './wysiwyg.jsx'
import Link from 'next/link'
import { fetchGetNewsItemByChapter, fetchAllNews, fetchGetNewsItemByCategory, fetchGetNewsItemByCategoryAndChapter } from '../../graphql.js'
import React, { useEffect, useState } from 'react';

export default function NewsTeaser({ content }) {

  const newsVar = content.selectedNews
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let response;
      if (newsVar.chapter === "ALLCHAPTERS") {
        if (newsVar.category === "ALL") {
          response = await fetchAllNews();
        } else {
          response = await fetchGetNewsItemByCategory(newsVar.category);
        }
      } else {
        if (newsVar.category === "ALL") {

          response = await fetchGetNewsItemByChapter(newsVar.chapter);
        } else {

          response = await fetchGetNewsItemByCategoryAndChapter(newsVar.category, newsVar.chapter);
        }
      }

      setData(response);

    }

    fetchData();
  }, [newsVar.chapter, newsVar.category]);


  return (
    <div className="news-teaser-container flex flex-column flex-justify-center flex-align-center 
        padding-tb--xxl">

      <div className='animation-background'>
        <Image src={Animation} alt="Animated GIF" />
      </div>

      <div className='text-align-center heading-text'>
        <h2 className='margin-t--xxs margin--zero'>{content.title}</h2>
        <WYSIWYG content={content.subHeading ? content.subHeading : content.preamble} />

      </div>

      <div className='news-card-container  margin-tb--s flex flex-row
            flex-justify-center flex-align-center'>

        {data?.newsItems?.slice(0, 3).map(item => (
          <Newscard type={item.newsCategory.categoryTitle} title={item.title} url={item.slug} imageUrl={item.image?.url} />
        ))
        }

      </div>

      <div className='button-wrapper margin-tb--s'>
        <Link className='no-decoration' href="../news">
          <SecondaryButton title={"SEE ALL"} />
        </Link>
      </div>

    </div>
  );
};

