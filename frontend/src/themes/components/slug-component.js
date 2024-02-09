import SectionRender from '../../themes/sources/js/section-render.js'
import DocumentRenderer from '../../themes/sources/js/document-renderer.js'

export default function SlugPageComponent({ content }) {

  console.log("SlugPageComponent: ", content)

  return (
      <div className='slug-content flex flex-column flex-align-center'>

        <h1>{content.title && content.title}</h1>
        <DocumentRenderer content={content.preamble.document} />

        { content.sections && content.sections.map((section, index) => (
          <SectionRender key={index} section={section} />
        ))}

      </div>
    )
}