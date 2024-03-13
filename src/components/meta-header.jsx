import Head from 'next/head';
import Icon from '../themes/sources/assets/graphics/d4cr-icon-OG.png'
import { metadata } from '../data/metadata';

export default function MetaHeader({ title, resolvedUrl, language }) {

    let fullUrl

    /**
     * Component for managing metadata, including the webpage title, URL, and language,
     * commonly used by search engines and browsers.
     */

    try { /* Attempting to retrieve the full URL for metadata */
        if (process.env.NEXT_PUBLIC_BASE_URL && resolvedUrl) {
            fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${resolvedUrl}`
        } else {
            throw new Error("NEXT_PUBLIC_BASE_URL or resolvedUrl is not defined")
        }
    } catch (error) {
        console.error("(meta-header.jsx) fullUrl variable couldn't be created:", error.message)
    }

    return (
        <Head>
            {title ? <title>{title} | {metadata.title}</title> :
                <title>{metadata.title}</title>}

            <link rel="canonical" href={fullUrl} />

            <link
                rel="icon"
                href="../icon.png"
                type="image/png"
                sizes="any"
            />

            <link
                rel="apple-touch-icon"
                href="../apple-icon.png"
                type="image/png"
                sizes="any"
            />
            
            <meta name="description" content={metadata.description} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta property="og:title" content={`${title} | ${metadata.title}`} />
            <meta property="og:site_name" content={metadata.title}></meta>
            {fullUrl && <meta property="og:url" content={fullUrl} />}

            {Icon && (<>
                <meta property="og:image" content={Icon}></meta>
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:alt" content="D4CR&apos;s icon"></meta>
                <meta property="og:image:width" content="1200"></meta>
                <meta property="og:image:height" content="630"></meta>
            </>)}

            {language && <meta property="og:locale" content={language} />}

            <meta name="twitter:card" content="summary_large_image"></meta>
            <meta name="twitter:site" content="@D4C_Guide"></meta>
            <meta property="article:publisher" content="https://www.facebook.com/designingforchildren/"></meta>
        </Head>
    );
}