
import { fetchMainMenuData } from '../graphql'
import '../themes/sources/scss/app.scss'

function MyApp({ Component, pageProps, navMenuData }) {

  return (
    <>
      <Component {...pageProps} />
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