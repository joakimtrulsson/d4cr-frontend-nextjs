import { list } from '@keystone-6/core';
import { text, json, select, file } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';

import { allOperations } from '@keystone-6/core/access';
import { isSignedIn, permissions, rules } from '../auth/access';

export const frontPageSchema = list({
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
  isSingleton: true,
  fields: {
    heroTitle: text({ validation: { isRequired: true } }),
    heroPreamble: document({
      links: true,
      formatting: {
        inlineMarks: {
          bold: true,
          italic: true,
          underline: true,
          strikethrough: true,
        },
        softBreaks: true,
      },
    }),
    heroMedia: file({
      storage: 'frontPageHero',
      validation: { isRequired: true },
    }),
    ctaOneAnchorText: text({
      label: 'Call to action 1',
      ui: {
        description: 'Anchor text for the call to action button.',
      },
    }),
    ctaOneUrl: json({
      ui: {
        views: './customViews/DynamicLinkSelect.jsx',
        createView: { fieldMode: 'edit' },
        listView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'edit' },
      },
    }),
    ctaTwoUrlAnchorText: text({
      label: 'Call to action 2',
      ui: {
        description: 'Anchor text for the call to action button.',
      },
    }),
    ctaTwoUrl: json({
      ui: {
        views: './customViews/DynamicLinkSelect.jsx',
        createView: { fieldMode: 'edit' },
        listView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'edit' },
      },
    }),

    status: select({
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' },
      ],
      validation: { isRequired: true },
      defaultValue: 'draft',
      ui: { displayMode: 'segmented-control' },
    }),
    sections: json({
      ui: {
        views: './customViews/Main.jsx',
        createView: { fieldMode: 'edit' },
        listView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'edit' },
      },
    }),
  },
});
