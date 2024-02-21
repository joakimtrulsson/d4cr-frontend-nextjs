import SectionRender from '../../themes/sources/js/section-render.js'
import WYSIWYG from '../components/wysiwyg.js'

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

      <WYSIWYG content={content.preamble.document} />

      {content.sections && content.sections.map((section, index) => (
        <SectionRender key={index} section={section} />
      ))}

    </div>
  )
}