import '../sources/scss/components/chapter-teaser.scss'
import Image from 'next/image'
import Mapbase from  '../sources/assets/graphics/mapbase.png'
import Title from '../../database/sections-data/chapter-teaser-title'
import LocalsCityAndUrl from '../../database/sections-data/locals-city-url-data'
import CountryCard from './country-card'

const ChapterTeaser = () => {
    return (
        <div className="chapter-teaser-body">
            <div className='mapbase-image-container'>
                <Image id='mapbase-image' src={Mapbase} alt='A map of the world' />
            </div>

            <div className='mapbase-text-container'>
                <h2>{Title}</h2>
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