import { list } from '@keystone-6/core';
import { text, json, relationship } from '@keystone-6/core/fields';

import { allOperations } from '@keystone-6/core/access';
import { isSignedIn, permissions, rules } from '../auth/access';

export const resourceTypeSchema = list({
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
  fields: {
    title: text({ isIndexed: 'unique', validation: { isRequired: true } }),
    icon: json({
      label: 'Icon',
      validation: { isRequired: true },
      ui: {
        views: './customViews/IconPickerSection.jsx',
        createView: { fieldMode: 'edit' },
        listView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'edit' },
      },
    }),
    resources: relationship({
      ref: 'Resource.type',
      many: true,
      ui: {
        description: 'Resources belonging to this type.',
      },
    }),
  },
});
