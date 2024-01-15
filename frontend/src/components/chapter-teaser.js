import '../styles/components/chapter-teaser.scss'
import LocalChaptersData from '../database/local-chapters-data'
import Image from 'next/image'
import ArrowRight from '../features/icons/arrow-right.svg'
import Mapbase from  '../features/mapbase.png'

const Title = 'Our local chapters'

const ChapterTeaser = () => {
    return (
        <div className="chapter-teaser-body">
            <div className='mapbase-image-container'>
                <Image id='mapbase-image' src={Mapbase} alt='A map of the world' />
            </div>

            <div className='mapbase-text-container'>
                <h1>{Title}</h1>
                <div className='country-card-container'>
                    {LocalChaptersData.map((item, index) => {
                        return(
                        <div className='country-card'>
                            <p>{item.city}</p>
                            <Image src={ArrowRight} alt='>' />
                        </div>
                    )})}
                </div>
            </div>
        </div>
    )
}

export default ChapterTeaser