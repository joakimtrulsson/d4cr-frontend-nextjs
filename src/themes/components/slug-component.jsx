import SectionRender from '../sources/js/section-render.js'
import WYSIWYG from './wysiwyg.jsx'
import Image from 'next/image'

// delete this file ? 

export default function SlugPageComponent({ content }) {

    return (
    <div className='margin-lr--xxxl max-width-60 flex flex-column flex-align-center'>

      {content.heroImage.url && (
        <div className='image-container-1 margin-t--s'>
          <div className='image-wrapper  borderradius--xxs'>
            <Image className='center-image' src={content.heroImage.url} alt={content.heroImage.alt} fill={true} />
          </div>
        </div>
      )}

      {content.title && <h1 className='moved-background'>{content.title}</h1>}

      <WYSIWYG content={content.preamble.document} />

      {content.sections && content.sections.map((section, index) => (
        <div key={index} className='margin-tb--xs'>
          <SectionRender key={index} section={section} />
        </div>
      ))}

    </div>
  )
}
