import SectionRender from '../../themes/sources/js/section-render.js'
import DocumentRenderer from '../../themes/sources/js/document-renderer.js'
import Image from 'next/image'

export default function SlugPageComponent({ content }) {

  return (
    <div className='slug-content flex flex-column flex-align-center'>

      {content.heroImage && (
        <div className='image-container-1'>
          <div className='image-wrapper  borderradius--xxs'>
            <img className='center-image' src={content.heroImage.url} alt={content.heroImage.alt} />
          </div>
        </div>
      )}

      <h1>{content.title && content.title}</h1>

      <DocumentRenderer content={content.preamble.document} />

      {content.sections && content.sections.map((section, index) => (
        <SectionRender key={index} section={section} />
      ))}

    </div>
  )
}