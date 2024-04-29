import Image from 'next/image';
import ArrowLeft from '../../styles/assets/graphics/buttons/secondary-btn-arrow-left.svg';
import ArrowRight from '../../styles/assets/graphics/buttons/secondary-btn-arrow-right.svg';

export default function SecondaryButton({ className, title, onClick }) {
  return (
    <div
      className={`secondary-button flex flex-row flex-nowrap ${className}`}
      onClick={onClick}
    >
      <Image src={ArrowLeft} alt='<' />
      <button className='flex flex-align-center'>{title}</button>
      <Image src={ArrowRight} alt='>' />
    </div>
  );
}
