import React from 'react';

import {
  NavigationContainer,
  NavItem,
  ListNavItems,
} from '@keystone-6/core/admin-ui/components';

import { FieldLabel } from '@keystone-ui/fields';

export function CustomNavigation({ authenticatedItem, lists }) {
  return (
    <NavigationContainer authenticatedItem={authenticatedItem}>
      <NavItem href='/'>Dashboard</NavItem>
      <ListNavItems lists={lists} />
      <NavItem href='/site-config'>Site Config</NavItem>
      <FieldLabel style={{ marginLeft: '1.5rem' }}>Taxonomy</FieldLabel>
    </NavigationContainer>
  );
}
