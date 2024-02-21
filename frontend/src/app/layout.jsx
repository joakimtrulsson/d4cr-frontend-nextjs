import React from 'react';

export const metadata = {
  title: 'D4CR',
  description: 'designing for children\'s rights',
};

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        {/* <NavBar /> */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}