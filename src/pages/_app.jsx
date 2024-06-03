import { ApolloProvider } from '@apollo/client';

import MenuProvider from '../context/MenuProvider';
import ModalPreambleProvider from '../context/ModalPreambleProvider.js';
import AppProvider from '../context/AppProvider.js';
import { NavBar, Footer, MetaHeader } from '../components/index.js';
import { useApollo } from '../graphql/index.js';

import '../styles/scss/app.scss';

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
        <AppProvider>
          <div className='site-container'>
            <NavBar />
            <div className='site-content'>
              <Component {...pageProps} />
            </div>

            <Footer />
          </div>
        </AppProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
