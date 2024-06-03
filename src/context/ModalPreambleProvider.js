import { useState, useEffect } from 'react';
import ModalPreambleContext from './ModalPreambleContext';
import { fetchModalPreambles } from '.././graphql/index.js';

function ModalPreambleProvider({ children }) {
  const [allData, setAllData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchModalPreambles();

      setAllData(data);
    };

    fetchData();
  }, []);

  return (
    <ModalPreambleContext.Provider value={allData}>
      {children}
    </ModalPreambleContext.Provider>
  );
}

export default ModalPreambleProvider;
