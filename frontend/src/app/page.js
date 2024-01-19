import '../styles/home.scss'
import Accordion from '../sections/accordion'


export default function Home() {
  return (
    <main className='main'>

      <Accordion />


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