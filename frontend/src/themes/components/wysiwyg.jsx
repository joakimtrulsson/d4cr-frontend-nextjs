import '../sources/scss/base/utils.scss'
import '../sources/scss/components/wysiwyg.scss'
import { DocumentRenderer } from '@keystone-6/document-renderer';

export default function WYSIWYG({ value }) {

    return (
        <div className="wysiwyg-container">
            <h1>DocumentRenderer</h1>
        </div>
    )
}

//             <DocumentRenderer document={value} />
