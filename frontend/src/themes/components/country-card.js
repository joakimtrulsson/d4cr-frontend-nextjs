import Image from 'next/image'
import ArrowRight from '../sources/assets/graphics/icons/arrow-right.svg'
import Link from 'next/link';
import '../sources/scss/components/country-card.scss'
import '../sources/scss/base/utils.scss'


const CountryCard = ({item}) => {
    return(
        <Link href={item.subItemUrl} className='no-decoration'>
            <div className='country-card'>
            <h2 className='heading-4 no-decoration'>{item.subItemTitle}</h2>  
                <Image src={ArrowRight} alt='>' />
            </div>
        </Link>
    )
}

export default CountryCard