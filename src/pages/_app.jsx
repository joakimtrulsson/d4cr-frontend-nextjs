import '../themes/sources/scss/app.scss';
import MenuProvider from '../context/MenuProvider';
import NavBar from '../components/navbar';
import Footer from '../components/footer';

// Test
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../data/apollo-client';

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <MenuProvider>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </MenuProvider>
    </ApolloProvider>
  );
}

export default MyApp;
