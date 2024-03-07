import Image from 'next/image'
import ArrowRight from '../sources/assets/graphics/icons/arrow-right.svg'
import Link from 'next/link';

export default function CountryCard({ item }) {

    return(
        item.status === "published" ? (
            <Link href={item.slug} className='no-decoration'>
                <div className='country-card'>
                    <h2 className='heading-4 no-decoration'>{item.title}</h2>  
                    <Image src={ArrowRight} alt='>' />
                </div>
            </Link>
        ) 
        : null
    )
}