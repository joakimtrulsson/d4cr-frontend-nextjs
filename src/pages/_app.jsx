
import { fetchMainMenuData } from '../graphql'
import '../themes/sources/scss/app.scss'
import { createContext, useState } from 'react';
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";


function MyApp({ Component, pageProps, navMenuData }) {



  return (
    <>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.RECAPTCH_SITE_KEY}
        scriptProps={{
          async: false,
          defer: false,
          appendTo: "head",
          nonce: undefined,
        }}
      >
        <Component {...pageProps} />
      </GoogleReCaptchaProvider>
    </>
  );
}

export async function getStaticProps() {
  try {
    const navMenuData = await fetchMainMenuData();
    return { props: { navMenuData: navMenuData } };
  } catch (error) {
    console.error("(_app.jsx) Error fetching data:", error);
    return { notFound: true };
  }
}

export default MyApp;