import Image from 'next/image';
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import getColorCode from '../sources/js/color-code';
import ArrowRight from "../sources/assets/graphics/icons/arrow-right.svg";
import placeholder from '../sources/assets/graphics/placeholder/dummy-image1.svg'
const Newscard = ({ type, title, url, imageUrl }) => {
//url leder till fel /news/news annars kör på news item
  const { library, config } = require('@fortawesome/fontawesome-svg-core');
  library.add(fas);

  return (
    <main className="news-card flex flex-column ">


      <Image src={imageUrl ? imageUrl : placeholder} className="img-resource"
        width={230}
        height={160}
        alt="Image put in by user in principle-card" />
      <Link className="sub-heading-div sub-heading-m text-align-center uppercase" href={url && url}><h5>{type && type}</h5></Link>
      <Link href={url && url} className="title-link"><h3 className="title-div padding-lr--xs">{title && title}</h3></Link>



      <Link href={url && url}>
        <Image className="arrow-right" src={ArrowRight} alt="link arrow" />
      </Link>


    </main>
  );
};

export default Newscard;

{/* <div
      className={`news-card  flex flex-column flex-justify-start 
            bg-yellow-50 borderradius--xs`}
    >
      <Image
        className="img-resource"
        width='450'
        height='250'
        src={imageUrl}
        alt='image for news'
        fill={false}
      />

      <div className='sub-head-wrapper bg-yellow-100 margin-t--xxxs-negative'>
        <h2 className='sub-heading-m text-align-center color-yellow-600 uppercase'>
          {type}
        </h2>
      </div>

      <div className='margin-lr--xs'>
        <a className='no-decoration' href={url}>
          <h3 className='color-grey-700'>{title}</h3>
        </a>
      </div>

      <div className='arrow-right-wrapper margin-b--s flex flex-justify-end bottom-0'>
        <a href={url}>
          <FontAwesomeIcon
            icon={['fas', 'arrow-right']}
            color={getColorCode('orange-500')}
          />
        </a>
      </div>
    </div> */}