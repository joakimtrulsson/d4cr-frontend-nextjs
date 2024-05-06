// import Image from 'next/image';

// export default function ImagesComponent({ content }) {
//   var containerClass;

//   if (content.images.length === 3) {
//     containerClass = 'image-container-3';
//   } else if (content.images.length === 2) {
//     containerClass = 'image-container-2';
//   } else {
//     containerClass = 'image-container-1';
//   }

//   return (
//     <div
//       className={`${containerClass} image-container flex
//         padding-tb--m `}
//     >
//       {content.images.map((image, index) => (
//         <div key={index} className='image-wrapper borderradius--xxs'>
//           <Image
//             className='center-image section-image'
//             src={image.url}
//             alt={image.alt}
//             fill={true}
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

// {
//   /* <main className='container' style={{ maxWidth: '1600px' }}>
//   <div className='wrapper-three-images'>
//     <Image className='image' src='' />
//     <Image className='image' src='' />
//     <Image className='image' src='' />
//   </div>
// </main>; */
// }

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
    <div className='image-section'>
      <div className={`${containerClass}`}>
        {content.images.map((image, index) => (
          <>
            <img
              className={`borderradius--xxs section-image-${content.images.length}`}
              src={image.url}
              alt={image.alt}
              fill={true}
            />
          </>
        ))}
      </div>
    </div>
  );
}
