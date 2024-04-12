import { useState, useEffect } from 'react';
import MenuContext from './MenuContext';
import { fetchAllMenuData, fetchMainMenuData } from '../graphql';

function MenuProvider({ children }) {
  const [allData, setAllData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const navbarData = await fetchMainMenuData();
      const data = await fetchAllMenuData();

      setAllData(data);
    };

    fetchData();
  }, []);

  return <MenuContext.Provider value={allData}>{children}</MenuContext.Provider>;
}

export default MenuProvider;
