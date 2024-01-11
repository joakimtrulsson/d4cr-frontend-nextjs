var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.js
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core3 = require("@keystone-6/core");
var import_dotenv = __toESM(require("dotenv"));

// schemas/userSchema.js
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");

// auth/access.js
function isSignedIn({ session: session2 }) {
  return Boolean(session2);
}
var permissions = {
  canCreateItems: ({ session: session2 }) => session2?.data.role?.canCreateItems ?? false,
  canManageAllItems: ({ session: session2 }) => session2?.data.role?.canManageAllItems ?? false,
  canManageUsers: ({ session: session2 }) => session2?.data.role?.canManageUsers ?? false,
  canManageRoles: ({ session: session2 }) => session2?.data.role?.canManageRoles ?? false
};
var rules = {
  canReadItems: ({ session: session2 }) => {
    if (!session2)
      return true;
    if (session2.data.role?.canManageAllItems) {
      return true;
    }
    return { author: { id: { equals: session2.itemId } } };
  },
  canManageItems: ({ session: session2 }) => {
    if (!session2)
      return false;
    if (session2.data.role?.canManageAllItems)
      return true;
    return { author: { id: { equals: session2.itemId } } };
  },
  canReadUsers: ({ session: session2 }) => {
    if (!session2)
      return false;
    if (session2.data.role?.canSeeOtherUsers)
      return true;
    return { id: { equals: session2.itemId } };
  },
  canUpdateUsers: ({ session: session2 }) => {
    if (!session2)
      return false;
    if (session2.data.role?.canEditOtherUsers)
      return true;
    return { id: { equals: session2.itemId } };
  }
};

// schemas/userSchema.js
var userSchema = (0, import_core.list)({
  access: {
    operation: {
      ...(0, import_access.allOperations)(isSignedIn),
      create: permissions.canManageUsers,
      delete: permissions.canManageUsers,
      query: () => true
    },
    filter: {
      query: rules.canReadUsers,
      update: rules.canUpdateUsers
    }
  },
  ui: {
    isHidden: (args) => {
      return !permissions?.canManageRoles(args);
    },
    hideCreate: (args) => !permissions.canManageUsers(args),
    hideDelete: (args) => !permissions.canManageUsers(args),
    listView: {
      initialColumns: ["username", "email", "role"]
    },
    itemView: {
      defaultFieldMode: ({ session: session2, item }) => {
        if (session2?.data.role?.canEditOtherUsers)
          return "edit";
        if (session2?.itemId === item.id)
          return "edit";
        return "read";
      }
    }
  },
  fields: {
    username: (0, import_fields.text)({
      isFilterable: false,
      isOrderable: false,
      isIndexed: "unique",
      validation: {
        isRequired: true
      }
    }),
    email: (0, import_fields.text)({
      isIndexed: "unique"
    }),
    password: (0, import_fields.password)({
      access: {
        read: import_access.denyAll,
        update: ({ session: session2, item }) => permissions.canManageUsers({ session: session2 }) || session2?.itemId === item.id
      },
      validation: { isRequired: true }
    }),
    //  Rolen som är kopplad till användare.
    role: (0, import_fields.relationship)({
      ref: "Role.assignedTo",
      access: {
        create: permissions.canManageUsers,
        update: permissions.canManageUsers
      },
      ui: {
        itemView: {
          fieldMode: (args) => permissions.canManageUsers(args) ? "edit" : "read"
        }
      }
    })
  }
});

// schemas/roleSchema.js
var import_core2 = require("@keystone-6/core");
var import_access3 = require("@keystone-6/core/access");
var import_fields2 = require("@keystone-6/core/fields");
var roleSchema = (0, import_core2.list)({
  access: {
    operation: {
      ...(0, import_access3.allOperations)(permissions.canManageRoles),
      query: isSignedIn
    }
  },
  ui: {
    isHidden: (args) => {
      return !permissions?.canManageRoles(args);
    },
    hideCreate: (args) => !permissions.canManageRoles(args),
    hideDelete: (args) => !permissions.canManageRoles(args),
    listView: {
      initialColumns: ["name", "assignedTo"]
    },
    itemView: {
      defaultFieldMode: (args) => permissions.canManageRoles(args) ? "edit" : "read"
    }
  },
  fields: {
    name: (0, import_fields2.text)({ validation: { isRequired: true } }),
    canCreateItems: (0, import_fields2.checkbox)({ defaultValue: false }),
    canManageAllItems: (0, import_fields2.checkbox)({ defaultValue: false }),
    canSeeOtherUsers: (0, import_fields2.checkbox)({ defaultValue: false }),
    canEditOtherUsers: (0, import_fields2.checkbox)({ defaultValue: false }),
    canManageUsers: (0, import_fields2.checkbox)({ defaultValue: false }),
    canManageRoles: (0, import_fields2.checkbox)({ defaultValue: false }),
    assignedTo: (0, import_fields2.relationship)({
      ref: "User.role",
      many: true,
      ui: {
        itemView: { fieldMode: "read" }
      }
    })
  }
});

// schema.js
var lists = {
  User: userSchema,
  Role: roleSchema
};

// auth/auth.js
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var sessionMaxAge = process.env.SESSION_MAX_AGE;
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  // Ett identity field på usern.
  identityField: "username",
  secretField: "password",
  initFirstItem: {
    fields: ["username", "password"],
    // Följande data sparas som default på den första användaren.
    itemData: {
      role: {
        create: {
          name: "Admin Role",
          canCreateItems: true,
          canManageAllItems: true,
          canSeeOtherUsers: true,
          canEditOtherUsers: true,
          canManageUsers: true,
          canManageRoles: true
        }
      }
    }
  },
  sessionData: `
    username
    role {
      id
      name
      canCreateItems
      canManageAllItems
      canSeeOtherUsers
      canEditOtherUsers
      canManageUsers
      canManageRoles
    }`
});
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.js
import_dotenv.default.config();
var { ASSET_BASE_URL, PORT, MAX_FILE_SIZE, FRONTEND_URL, DATABASE_URL } = process.env;
var keystone_default = withAuth(
  (0, import_core3.config)({
    server: {
      port: PORT,
      maxFileSize: MAX_FILE_SIZE,
      cors: { origin: [FRONTEND_URL], credentials: true }
    },
    db: {
      provider: "mysql",
      url: DATABASE_URL,
      idField: { kind: "uuid" }
    },
    lists,
    session
  })
);
//# sourceMappingURL=config.js.map
