import Accordion from '../themes/components/accordion.js'
import Banner from '../themes/components/banner.js'
import ChapterTeaser from '../themes/components/chapter-teaser.js'
import ImagesComponent from '../themes/components/images-component.js'
import Image1 from '../themes/sources/assets/graphics/placeholder/dummy-image2.jpeg'
import Image2 from '../themes/sources/assets/graphics/placeholder/dummy-image3.webp'
import Image3 from '../themes/sources/assets/graphics/placeholder/dummy-image4.png'
import BulletList from '../themes/components/large-bullet-list.js'
import NewsTeaser from '../themes/components/news-teaser.js'
import TextMedia from '../themes/components/text-media.js'
import data from '../database/sections-data/text-and-media-data.js'
// import Wysiswig from './wysiwig.js'



export default function AllSectionsPage() {

  const Images1 = [Image1];
  const Images2 = [Image1, Image2];
  const Images3 = [Image1, Image2, Image3];

  
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
        return(
          <TextMedia key={key} data={item} />
      )})}

      

    </main>
  )
}

