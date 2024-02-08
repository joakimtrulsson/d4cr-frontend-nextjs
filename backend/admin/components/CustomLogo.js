/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from '@keystone-ui/core';

import { IMAGE_URL } from '../../utils/constants';

export const CustomLogo = () => {
  const imagePath = `${IMAGE_URL}/logo/D4CR_Logo.svg`;
  return <img src={imagePath} alt='logo' style={{ width: '175px', height: '50px' }} />;
};
