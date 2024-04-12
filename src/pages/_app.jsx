import { fetchMainMenuData } from '../graphql';
import '../themes/sources/scss/app.scss';
import TestNavBar from '../components/TestNavBar';
import MenuProvider from '../context/MenuProvider';
import TestFooter from '../components/TestFooter';

function MyApp({ Component, pageProps }) {
  return (
    <MenuProvider>
      <TestNavBar />
      <Component {...pageProps} />
      <TestFooter />
    </MenuProvider>
  );
}

export async function getStaticProps() {
  try {
    const navMenuData = await fetchMainMenuData();

    return { props: { navMenuData } };
  } catch (error) {
    console.error('(_app.jsx) Error fetching data:', error);
    return { notFound: true };
  }
}

// MyApp.getInitialProps = async () => {
//   try {
//     const navMenuData = await fetchMainMenuData();
//     // const testDataToNavbar = 'HELLO WORLD!';
//     return {};
//   } catch (error) {
//     console.error('(_app.jsx) Error fetching data:', error);
//     return { testDataToNavbar: undefined };
//   }
// };

export default MyApp;
