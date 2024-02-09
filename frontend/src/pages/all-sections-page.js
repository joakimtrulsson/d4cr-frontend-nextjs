import Accordion from '../themes/components/accordion.js'
import Banner from '../themes/components/banner.js'
import ChapterTeaser from '../themes/components/chapter-teaser.js'
import ImagesComponent from '../themes/components/images-component.js'
import Image1 from '../themes/sources/assets/graphics/placeholder/dummy-image2.jpeg'
import Image2 from '../themes/sources/assets/graphics/placeholder/dummy-image3.webp'
import Image3 from '../themes/sources/assets/graphics/placeholder/dummy-image4.png'
import BulletList from '../themes/components/large-bullet-list.js'
import NewsTeaser from '../themes/components/news-teaser.js'
import TextMedia from '../themes/components/text-media-content.js'
import data from '../database/sections-data/text-and-media-data.js'
import React, { useEffect, useState } from 'react';
import RichTextViewer from '../themes/sources/js/document-renderer.js';
import LocalJsonFile from '../database/keystone-6/wysiwig-data.json';
import '../themes/sources/scss/components/wysiwyg.scss'

export default function AllSectionsPage() {

  // IMAGESOMPONENT's data
  const Images1 = [Image1];
  const Images2 = [Image1, Image2];
  const Images3 = [Image1, Image2, Image3];

  // WYSIWIG's data
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const convertedJson = LocalJsonFile.data.sections.map(section => ({
          type: section.type,
          children: section.children
        }));

        setJsonData(convertedJson);

      } catch (error) {
        console.error('Error fetching JSON data:', error);

      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  return (
    <main>

      <Accordion />
      <Banner title={null} text={null} />
      <ChapterTeaser />
      <ImagesComponent images={Images1} />
      <ImagesComponent images={Images2} />
      <ImagesComponent images={Images3} />
      <BulletList />
      <NewsTeaser />

      {data.map((item, key) => {
        return (
          <TextMedia key={key} data={item} />
        )
      })}

      <div className='wysiwig-container'>
        {loading ? (
          <h1>Loading...</h1>
        ) : jsonData != null ? (
          <RichTextViewer content={jsonData} />
        ) : (
          <h1>404 error</h1>
        )}
      </div>

    </main>
  )
}

