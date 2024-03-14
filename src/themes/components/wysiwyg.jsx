import { DocumentRenderer } from '@keystone-6/document-renderer';

/* Please solve this issue with Spotify/YouTube embed. */

const renderers = {

    block: {
        paragraph: ({ children, textAlign }) => {
            return <p className="bg-yellow-100" style={{ textAlign }}>{children}</p>;
        },
        spotify: ({ url }) => {
            return <iframe src={url}
                height="100%"
                width="100%"
                frameborder="0"
                scrolling="no">
            </iframe>
        },
        video: ({ url }) => {
            return <iframe 
            width="100%" 
            height="100%" 
            src={url} 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen>
            </iframe>
        }
    },
};


export default function WYSIWYG({ content }) {

    console.log('DocumentRenderer', content)

    return <DocumentRenderer document={content} renderers={renderers} />;
}
