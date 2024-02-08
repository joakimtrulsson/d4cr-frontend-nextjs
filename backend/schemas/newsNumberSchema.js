import { list } from '@keystone-6/core';
import { relationship, integer } from '@keystone-6/core/fields';

import { allOperations } from '@keystone-6/core/access';
import { isSignedIn, permissions, rules } from '../auth/access';

export const newsNumberSchema = list({
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

    relatedNews: relationship({
      ref: 'News.newsNumber',
      many: true,
      ui: {
        description: 'News belonging to this number.',
      },
    }),
  },
});
