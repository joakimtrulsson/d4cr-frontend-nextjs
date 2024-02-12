import { list } from '@keystone-6/core';
import { text, json } from '@keystone-6/core/fields';

import { allOperations } from '@keystone-6/core/access';
import { isSignedIn, permissions, rules } from '../auth/access';

export const testSchema = list({
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
    title: text(),

    image: json({
      ui: {
        views: './customViews/ImageLibrary.jsx',
        createView: { fieldMode: 'edit' },
        listView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'edit' },
      },
    }),
    // sections: json({
    //   ui: {
    //     views: './customViews/AllSections.jsx',
    //     createView: { fieldMode: 'edit' },
    //     listView: { fieldMode: 'hidden' },
    //     itemView: { fieldMode: 'edit' },
    //   },
    // }),
    // principles: json({
    //   ui: {
    //     views: './customViews/Principles.jsx',
    //     createView: { fieldMode: 'edit' },
    //     listView: { fieldMode: 'hidden' },
    //     itemView: { fieldMode: 'edit' },
    //   },
    // }),
    // resources: json({
    //   ui: {
    //     views: './customViews/Resources.jsx',
    //     createView: { fieldMode: 'edit' },
    //     listView: { fieldMode: 'hidden' },
    //     itemView: { fieldMode: 'edit' },
    //   },
    // }),
  },
});
