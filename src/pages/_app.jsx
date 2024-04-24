import '../themes/sources/scss/app.scss';
import MenuProvider from '../context/MenuProvider';
import NavBar from '../components/navbar';
import Footer from '../components/footer';

// Test
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
            <div className='site-container__top'>
              <NavBar />
              {/* <main> */}
              <Component {...pageProps} />
              {/* </main> */}
              <Footer />
            </div>
          </div>
        </MenuProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
