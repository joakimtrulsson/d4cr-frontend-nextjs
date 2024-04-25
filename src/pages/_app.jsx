import '../themes/sources/scss/app.scss';
import MenuProvider from '../context/MenuProvider';
import NavBar from '../components/navbar';
import Footer from '../components/footer';

import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../data/apollo-client';
import MetaHeader from '../components/meta-header';
import '../themes/sources/scss/app.scss';

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

  return (
    <>
      <MetaHeader
        tabTitle={pageProps.tabTitle}
        resolvedUrl={pageProps.resolvedUrl}
        language={pageProps.language}
      />
      <ApolloProvider client={apolloClient}>
        <MenuProvider>
          <div className='site-container'>
            <div className='site-content'>
              <NavBar />

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
