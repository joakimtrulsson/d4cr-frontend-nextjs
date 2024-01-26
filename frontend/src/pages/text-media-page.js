import TextMedia from '../themes/components/text-media.js'
import data from '../database/sections-data/text-and-media-data.js'

export default function TextMediaPage() {
  
  return (
    <main>

      {data.map((item, key) => {
        return(
          <TextMedia key={key} data={item} />
        )})}

    </main>
  )
}

