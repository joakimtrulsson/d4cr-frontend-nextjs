import '../sources/scss/components/chapter-teaser.scss'
import Image from 'next/image'
import Mapbase from  '../sources/assets/graphics/mapbase.png'
import LocalsCityAndUrl from '../../database/sections-data/locals-city-url-data'
import CountryCard from './country-card'

const ChapterTeaser = () => {

const Title = "Our local chapters"

    return (
        <div className="chapter-teaser">
            <div className='image-container'>
                <Image className='full-width-height' src={Mapbase} alt='A map of the world' />
            </div>

            <div className='text-container'>
                <h1 className='heading-2' >{Title}</h1>
                <div className='country-card-container'>
                    { LocalsCityAndUrl.map((item, index) => {
                        return(
                            <CountryCard key={index} item={item}/>
                    )})}
                </div>
            </div>
        </div>
    )
}

export default ChapterTeaser