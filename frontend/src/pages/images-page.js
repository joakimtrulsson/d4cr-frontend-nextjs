import ImagesComponent from '../themes/components/images-component.js'
import Image1 from '../themes/sources/assets/graphics/placeholder/dummy-image2.jpeg'
import Image2 from '../themes/sources/assets/graphics/placeholder/dummy-image3.webp'
import Image3 from '../themes/sources/assets/graphics/placeholder/dummy-image4.png'


export default function ImagePage() {

    const Images1 = [Image1];
    const Images2 = [Image1, Image2];
    const Images3 = [Image1, Image2, Image3];
  
  return (
    <main>

        <ImagesComponent images={Images1} />
        <ImagesComponent images={Images2} />
        <ImagesComponent images={Images3} />

    </main>
  )
}

