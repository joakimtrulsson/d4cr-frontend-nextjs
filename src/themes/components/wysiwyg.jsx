import { DocumentRenderer } from '@keystone-6/document-renderer';

export default function WYSIWYG({ content }) {

    return (
        <DocumentRenderer document={content} />
    )
}