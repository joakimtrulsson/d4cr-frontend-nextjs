import '../themes/sources/scss/app.scss';
import MenuProvider from '../context/MenuProvider';
import NavBar from '../components/navbar';
import Footer from '../components/footer';

function MyApp({ Component, pageProps }) {
  return (
    <MenuProvider>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </MenuProvider>
  );
}

export default MyApp;
