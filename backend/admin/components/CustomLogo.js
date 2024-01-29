/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from '@keystone-ui/core';

export const CustomLogo = () => {
  const imagePath = 'http://localhost:3000/public/images/logo/D4CR_Logo.svg';
  return <img src={imagePath} alt='logo' style={{ width: '175px', height: '50px' }} />;
};
