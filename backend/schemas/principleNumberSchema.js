import { list } from '@keystone-6/core';
import { relationship, integer } from '@keystone-6/core/fields';

import { allOperations } from '@keystone-6/core/access';
import { isSignedIn, permissions, rules } from '../auth/access';

export const principleNumberSchema = list({
  access: {
    operation: {
      ...allOperations(isSignedIn),
      create: permissions.canCreateItems,
      query: () => true,
    },
    filter: {
      query: () => true,
      // query: rules.canReadItems,
      update: rules.canManageItems,
      delete: rules.canManageItems,
    },
  },
  ui: {
    labelField: 'number',
  },
  fields: {
    number: integer({ isIndexed: 'unique', validation: { isRequired: true } }),

    // resources: relationship({
    //   ref: 'Resource.category',
    //   many: true,
    //   ui: {
    //     description: 'Resources belonging to this category.',
    //   },
    // }),
  },
});
