import React from 'react';
import MenuProvider from './MenuProvider';
import ModalPreambleProvider from './ModalPreambleProvider';

const AppProvider = ({ children }) => {
  return (
    <MenuProvider>
      <ModalPreambleProvider>{children}</ModalPreambleProvider>
    </MenuProvider>
  );
};

export default AppProvider;
