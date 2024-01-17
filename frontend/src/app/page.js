import '../styles/home.scss'
import TextAndMedia from '../sections/text-media'
import Item from '../database/sections-data/text-and-media-data'


import ChapterTeaser from '../sections/chapter-teaser'


export default function Home() {
  return (
    <main className='main'>


      {Item.map((item, key) => {
        return(
          
          <TextAndMedia key={key} data={item} />
        )})}

    </main>
  )
}
