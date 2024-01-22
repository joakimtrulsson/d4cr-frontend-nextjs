import Image from 'next/image'
import ArrowRight from '../sources/assets/graphics/icons/arrow-right.svg'
import '../sources/scss/components/country-card.scss'
import '../sources/scss/base/utils.scss'


const CountryCard = ({item}) => {
    return(
        <a href={item.subItemUrl} className='no-decoration'>
            <div className='country-card'>
            <h2 className='heading-4 no-decoration'>{item.subItemTitle}</h2>  
                <Image src={ArrowRight} alt='>' />
            </div>
        </a>
    )
}

export default CountryCard