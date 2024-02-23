import { DocumentRenderer } from '@keystone-6/document-renderer';

export default function WYSIWYG({ content }) {

    return (
        <div className="margin-lr--xxxl max-width-60 margin-tb--l">
            <DocumentRenderer document={content} />
        </div>
    )
}