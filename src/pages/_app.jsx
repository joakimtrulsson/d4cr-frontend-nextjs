import '../themes/sources/scss/app.scss';
import NavBar from '../components/Navbar';
import MenuProvider from '../context/MenuProvider';
import Footer from '../components/Footer';

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
