// import React, { useEffect } from 'react';
// import { useSelected, useFocused } from 'slate-react';
// import Icon from '../../common/Icon.jsx';
// import useResize from '../../utils/customHooks/useResize.js';
// // import "./Video.css";

// const Video = ({ attributes, element, children }) => {
//   const { url, alt } = element;
//   const [size, onMouseDown, resizing] = useResize();
//   const selected = useSelected();
//   const focused = useFocused();
//   return (
//     <div
//       {...attributes}
//       className='embed'
//       style={{
//         display: 'flex',
//         boxShadow: selected && focused && '0 0 3px 3px lightgray',
//       }}
//       {...element.attr}
//     >
//       <div
//         contentEditable={false}
//         style={{ width: `${size.width}px`, height: `${size.height}px` }}
//       >
//         {
//           // The iframe reloads on each re-render and hence it stutters and the document doesn't detect mouse-up event leading to unwanted behaviour
//           // So during resize replace the iframe with a simple div
//           resizing ? (
//             <div
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 border: '2px dashed black',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}
//             >
//               <Icon icon='videoPlayer' />
//             </div>
//           ) : (
//             <iframe src={url} frameBorder='0' title={alt} />
//           )
//         }

//         {selected && (
//           <button
//             onMouseDown={onMouseDown}
//             style={{
//               width: '15px',
//               height: '15px',
//               opacity: 1,
//               background: 'transparent',
//             }}
//           >
//             <Icon icon='resize' />
//           </button>
//         )}
//       </div>
//       {children}
//     </div>
//   );
// };
// export default Video;

import React, { useEffect } from 'react';
import { useSelected, useFocused } from 'slate-react';
import Icon from '../../common/Icon.jsx';
import useResize from '../../utils/customHooks/useResize.js';

const Video = ({ attributes, element, children }) => {
  const { url, alt } = element;
  const [size, onMouseDown, resizing] = useResize();
  const selected = useSelected();
  const focused = useFocused();

  // Funktion för att byta ut video-URL:en för YouTube-inbäddning
  const getYouTubeEmbedUrl = (url) => {
    const videoId = getYouTubeVideoId(url);
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  // Funktion för att extrahera YouTube-videoid från URL
  const getYouTubeVideoId = (url) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  const youtubeUrl = getYouTubeEmbedUrl(url);

  return (
    <div
      {...attributes}
      className='embed'
      style={{
        display: 'flex',
        boxShadow: selected && focused && '0 0 3px 3px lightgray',
      }}
      {...element.attr}
    >
      <div
        contentEditable={false}
        style={{ width: `${size.width}px`, height: `${size.height}px` }}
      >
        {resizing ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              border: '2px dashed black',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon icon='videoPlayer' />
          </div>
        ) : (
          <iframe
            src={youtubeUrl}
            frameBorder='0'
            title={alt}
            allowFullScreen
            style={{ borderRadius: '7px' }}
          />
        )}

        {selected && (
          <button
            onMouseDown={onMouseDown}
            style={{
              width: '15px',
              height: '15px',
              opacity: 1,
              background: 'transparent',
            }}
          >
            <Icon icon='resize' />
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

export default Video;
