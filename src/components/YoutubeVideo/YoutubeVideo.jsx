import { getYouTubeEmbedId } from '../../utils';

export default function YoutubeVideo({ url, altText = 'Embedded YouTube video' }) {
  const embedId = getYouTubeEmbedId(url);

  return (
    <iframe
      className='youtube-video-iframe'
      style={{
        left: 0,
        top: 0,
      }}
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder='0'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
      title={altText}
    />
  );
}
