
import { fetchMainMenuData } from '../graphql'
import '../themes/sources/scss/app.scss'
import { createContext, useState } from 'react';
 
export const AppContext = createContext();

function MyApp({ Component, pageProps, navMenuData }) {
  const [submitted, setSubmitted] = useState(false);


  return (
    <AppContext.Provider value={{ submitted, setSubmitted }}>
        <Component {...pageProps} />
    </AppContext.Provider>
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