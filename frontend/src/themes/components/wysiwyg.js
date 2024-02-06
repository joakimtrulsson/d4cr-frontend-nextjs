import '../sources/scss/base/utils.scss'
import '../sources/scss/components/wysiwyg.scss'
import DocumentRenderer from '../sources/js/document-renderer.js'

export default function ImagesComponent({value}) {

    return (
        <div className="wysiwyg-container">

        <DocumentRenderer content={value} />

        </div>
    )
}
