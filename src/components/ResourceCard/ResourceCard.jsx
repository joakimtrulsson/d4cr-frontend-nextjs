import Image from 'next/image';
import Link from 'next/link';
import ArrowRight from '../../styles/assets/graphics/icons/arrow-right.svg';
import img from '../../styles/assets/graphics/placeholder/dummy-image2.jpeg';
import placeholder from '../../styles/assets/graphics/placeholder/dummy-image1.svg';

const ResourceCard = (props) => {
  const { title, url, resourceType, img } = props;

  // // Initialize `type` variable
  let type = null;

  if (resourceType) {
    type = resourceType; // Assign the type if it exists
  }

  // Now `type` will either be null or `resourceType.type`
  const formattedUrl =
    url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`;

  return (
    <main className='resource-card flex flex-column '>
      <Image
        src={img ? img : placeholder}
        className='img-resource'
        width={230}
        height={120}
        alt='Image put in by user in principle-card'
      />

      <Link href={formattedUrl && formattedUrl} className='title-link'>
        <h5 className='title-div padding-lr--xs'>{title && title}</h5>
      </Link>

      <Link className='a-div' href={formattedUrl && formattedUrl}>
        <h5>{type && type}</h5>
      </Link>

      <Link href={formattedUrl && formattedUrl}>
        <Image className='arrow-right' src={ArrowRight} alt='link arrow' />
      </Link>
    </main>
  );
};

export default ResourceCard;
