import '../sources/scss/base/utils.scss'
import '../sources/scss/components/wysiwyg.scss'
import { DocumentRenderer } from '@keystone-6/document-renderer';

export default function WYSIWYG({ content }) {

    return (
        <div className="wysiwyg-container">
            <DocumentRenderer document={content} />
        </div>
    )
}