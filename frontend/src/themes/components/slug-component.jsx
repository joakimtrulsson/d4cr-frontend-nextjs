import SectionRender from '../sources/js/section-render.js'
import WYSIWYG from './wysiwyg.jsx'

export default function SlugPageComponent({ content }) {

  console.log(content)

    return (
    <div className='margin-lr--xxxl max-width-60 flex flex-column flex-align-center'>

      {content.heroImage.url && (
        <div className='image-container-1 margin-t--s'>
          <div className='image-wrapper  borderradius--xxs'>
            <img className='center-image' src={content.heroImage.url} alt={content.heroImage.alt} />
          </div>
        </div>
      )}

      {content.title && <h1 className='moved-background'>{content.title}</h1>}

      <WYSIWYG content={content.preamble.document} />

      {content.sections && content.sections.map((section, index) => (
        <div className='margin-tb--xs'>
          <SectionRender key={index} section={section} />
        </div>
      ))}

    </div>
  )
}
