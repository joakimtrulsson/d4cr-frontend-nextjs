import '../styles/home.scss'
import BulletList from '../sections/large-bullet-list'


export default function Home() {
  return (
    <main className='main'>

      <BulletList />


    </main>
  )
}


{ /*  text + media section


      {Item.map((item, key) => {
        return(
          
          <TextAndMedia key={key} data={item} />
        )})}


import Item from '../database/sections-data/text-and-media-data'
import TextAndMedia from '../sections/text-media'

*/ }