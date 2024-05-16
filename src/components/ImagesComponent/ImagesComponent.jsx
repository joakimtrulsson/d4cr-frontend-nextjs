/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

export default function ImagesComponent({ content }) {
  let containerClass;
  let imageSize;

  if (content.images.length === 3) {
    containerClass = 'image-container-3';
    imageSize = 400;
  } else if (content.images.length === 2) {
    containerClass = 'image-container-2';
    imageSize = 600;
  } else {
    containerClass = 'image-container-1';
    imageSize = 1168;
  }

  return (
    <div className={`image-section flex ${containerClass}`}>
      {content.images.map((image, index) => (
        <>
          <Image
            className={`borderradius--xxs flex flex-justify-center flex-align-center section-image-${content.images.length}`}
            src={image.url}
            alt={image.alt}
            height={imageSize}
            width={imageSize}
            objectFit='cover'
            // layout='responsive'
          />
        </>
      ))}
    </div>
  );
}
