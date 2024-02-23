import React from 'react';
import Head from 'next/head';
import NavBar from '../themes/components/navbar'
import { metadata } from '../data/metadata'

export default function RootLayout({ children }) {
  return (
     <html lang="en">
       <Head>
         <title>{metadata.title}</title>
         <meta name="description" content={metadata.description} />
         <link rel="stylesheet" href="../themes/sources/scss/app.scss" />
       </Head>
       <body>
         <NavBar />
         {children}
         {/* <Footer /> */}
       </body>
     </html>
   );
 }