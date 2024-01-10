import { config } from '@keystone-6/core';

import { lists } from './schema';

import { withAuth, session } from './auth';

export default withAuth(
  config({
    // db: {
    //   provider: 'mqsql',
    //   url: 'mysql://dbuser:dbpass@localhost:3306/keystone',
    //   idField: { kind: 'uuid' },
    // },
    lists,
    session,
  })
);
