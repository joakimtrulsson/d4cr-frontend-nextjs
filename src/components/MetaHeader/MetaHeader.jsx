import Head from 'next/head';
import Script from 'next/script';
import Icon from '../../styles/assets/graphics/d4cr-icon-OG.png';
import { metadata } from '../../graphql/metaData';

/**
    #### Component for managing metadata, including the webpage title, URL, and language, commonly used by search engines and browsers.
    */
export default function MetaHeader({ tabTitle, resolvedUrl, language, isAccepted }) {
  // Generate full URL for meta property
  const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${resolvedUrl}`;

  // Ensure tabTitle doesn't show undefined or null
  tabTitle =
    tabTitle === undefined || !tabTitle
      ? metadata.title
      : `${tabTitle} | ${metadata.title}`;

  return (
    <>
      <Head>
        {tabTitle ? <title>{tabTitle}</title> : <title>{metadata.title}</title>}

        <link rel='canonical' href={fullUrl} />

        <link rel='icon' href='../icon.png' type='image/png' sizes='any' />

        <link
          rel='apple-touch-icon'
          href='../apple-icon.png'
          type='image/png'
          sizes='any'
        />

        <meta name='description' content={metadata.description} />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta property='og:title' content={tabTitle} />
        <meta property='og:site_name' content={metadata.title}></meta>
        {fullUrl && <meta property='og:url' content={fullUrl} />}

        {Icon && (
          <>
            <meta property='og:image' content={Icon}></meta>
            <meta property='og:image:type' content='image/png' />
            <meta property='og:image:alt' content="D4CR's icon"></meta>
            <meta property='og:image:width' content='1200'></meta>
            <meta property='og:image:height' content='630'></meta>
          </>
        )}

        {language && <meta property='og:locale' content={language} />}

        <meta name='twitter:card' content='summary_large_image'></meta>
        <meta name='twitter:site' content='@D4C_Guide'></meta>
        <meta
          property='article:publisher'
          content='https://www.facebook.com/designingforchildren/'
        ></meta>
      </Head>
      {/* {isAccepted && (
        <>
          <Script
            strategy='afterInteractive'
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
          />

          <Script id='google-analytics' strategy='afterInteractive'>
            {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
        `}
          </Script>
        </>
      )} */}

      {/* <Script id='gtm' strategy='afterInteractive'>
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KJG5LFFZ');
        `}
      </Script>

      <noscript>
        <iframe
          src='https://www.googletagmanager.com/ns.html?id=GTM-KJG5LFFZ'
          height='0'
          width='0'
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript> */}
    </>
  );
}
