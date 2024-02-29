import Layout from '../app/layout'
import { fetchMainMenuData } from '../graphql'
import '../themes/sources/scss/app.scss'
 
export default function App({ Component, pageProps, navMenuData }) {

console.log("navMenuData..", navMenuData)

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
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