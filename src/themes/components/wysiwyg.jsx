import { DocumentRenderer } from '@keystone-6/document-renderer';

export default function WYSIWYG({ content }) {

    return (
        <div className="margin-l--xxs max-width-60 margin-tb--xxs">
            <DocumentRenderer document={content} />
        </div>
    )
}