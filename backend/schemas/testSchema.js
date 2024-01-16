import { list } from '@keystone-6/core';
import { text, json } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
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
    content: document({
      formatting: {
        inlineMarks: {
          bold: true,
          italic: true,
          underline: true,
          strikethrough: true,
          code: true,
          superscript: true,
          subscript: true,
          keyboard: true,
        },
        listTypes: {
          ordered: true,
          unordered: true,
        },
        alignment: {
          center: true,
          end: true,
        },
        headingLevels: [1, 2, 3, 4, 5, 6],
        blockTypes: {
          blockquote: true,
          code: true,
        },
        softBreaks: true,
      },
    }),

    sections: json({
      ui: {
        views: './customComponents/sections/Main.jsx',
        createView: { fieldMode: 'edit' },
        listView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'edit' },
      },
    }),
  },
});
