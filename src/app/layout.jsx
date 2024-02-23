import React from 'react';
import Head from 'next/head';

export const metadata = {
  title: 'D4CR',
  description: 'designing for children\'s rights',
};

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="stylesheet" href='../themes/sources/scss/app.scss' />
      </Head>
      <body>
        {/* <NavBar /> */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}