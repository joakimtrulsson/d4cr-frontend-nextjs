/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

export default function ImagesComponent({ content }) {
  let containerClass;

  if (content.images.length === 3) {
    containerClass = 'image-container-3';
  } else if (content.images.length === 2) {
    containerClass = 'image-container-2';
  } else {
    containerClass = 'image-container-1';
  }

  return (
    <div className={`image-section flex ${containerClass}`}>
      {content.images.map((image, index) => (
        <>
          <img
            className={`borderradius--xxs section-image-${content.images.length}`}
            src={image.url}
            alt={image.alt}
          />
        </>
      ))}
    </div>
  );
}
