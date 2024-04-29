import Image from 'next/image';
import Link from 'next/link';
import ArrowRight from '../../styles/assets/graphics/icons/arrow-right.svg';

export default function CountryCard({ item }) {
  return item.status === 'published' ? (
    <Link href={item.slug} className='no-decoration'>
      <div className='country-card'>
        <h2 className='heading-4 no-decoration'>{item.title}</h2>
        <Image src={ArrowRight} alt='>' />
      </div>
    </Link>
  ) : null;
}
