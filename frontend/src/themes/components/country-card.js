import Image from 'next/image'
import ArrowRight from '../sources/assets/graphics/icons/arrow-right.svg'
import '../sources/scss/components/country-card.scss'

const CountryCard = ({item}) => {
    return(
        <a href={item.subItemUrl} className='country-card-link'>
            <div className='country-card'>
                <p>{item.subItemTitle}</p>  
                <Image src={ArrowRight} alt='>' />
            </div>
        </a>
    )
}

export default CountryCard