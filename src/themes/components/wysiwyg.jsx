import { DocumentRenderer } from '@keystone-6/document-renderer';

export default function WYSIWYG({ content }) {

    return (
        <DocumentRenderer document={content} />
    )
}

// margin-lr--xxxl max-width-60 margin-tb--l <--- we had this as className.. by mistake