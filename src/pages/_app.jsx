import { ApolloProvider } from '@apollo/client';
import MenuProvider from '../context/MenuProvider';
import NavBar from '../components/NavBar/NavBar.jsx';
import Footer from '../components/Footer/Footer.jsx';
// import CookieBanner from '../components/CookieBanner/CookieBanner.jsx';

import { useApollo } from '../graphql/apolloClient.js';
import MetaHeader from '../components/MetaHeader/MetaHeader';
import '../styles/scss/app.scss';

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

  return (
    <>
      <MetaHeader
        tabTitle={pageProps.tabTitle}
        resolvedUrl={pageProps.resolvedUrl}
        language={pageProps.language}
        // acceptsCookies={isAccepted}
      />
      <ApolloProvider client={apolloClient}>
        <MenuProvider>
          <div className='site-container'>
            <NavBar />
            {/* <CookieBanner /> */}
            <div className='site-content'>
              <Component {...pageProps} />
            </div>

            <Footer />
          </div>
        </MenuProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
