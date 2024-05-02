import Image from 'next/image';
import ArrowRight from '../../styles/assets/graphics/icons/arrow-right.svg';
import placeholder from '../../styles/assets/graphics/placeholder/dummy-image1.svg';

const ResourceCard = (props) => {
  const { title, url, resourceType, img } = props;

  let type = null;

  if (resourceType) {
    type = resourceType;
  }

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

      <a target='_blank' href={formattedUrl && formattedUrl} className='title-link'>
        <h5 className='title-div padding-lr--xs'>{title && title}</h5>
      </a>

      <a target='_blank' className='a-div' href={formattedUrl && formattedUrl}>
        <h5>{type && type}</h5>
      </a>

      <a target='_blank' href={formattedUrl && formattedUrl}>
        <Image className='arrow-right' src={ArrowRight} alt='link arrow' />
      </a>
    </main>
  );
};

export default ResourceCard;
