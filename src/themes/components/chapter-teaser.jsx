import '../sources/scss/components/chapter-teaser.scss'
import Image from 'next/image'
import Mapbase from  '../sources/assets/graphics/mapbase.png'
import CountryCard from './country-card'

export default function ChapterTeaser({ content }) {

    const title = 'Our local chapters'

    return (
        <div className="chapter-teaser">
            <div className='image-container'>
                <Image className='full-width-height' src={Mapbase} alt='A map of the world' />
            </div>

            <div className='text-container'>
                <h1 className='heading-2' >{title}</h1>
                <div className='country-card-container'>
                    { content.chapters.map((item, index) => {
                        return(
                            <CountryCard key={index} item={item}/>
                    )})}
                </div>
            </div>
        </div>
    )
}
