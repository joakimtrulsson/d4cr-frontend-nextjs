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
var import_core4 = require("@keystone-6/core");
var import_express = __toESM(require("express"));
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

// schemas/testSchema.js
var import_core3 = require("@keystone-6/core");
var import_fields3 = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");
var import_access5 = require("@keystone-6/core/access");
var testSchema = (0, import_core3.list)({
  access: {
    operation: {
      ...(0, import_access5.allOperations)(isSignedIn),
      create: permissions.canCreateItems,
      query: () => true
    },
    filter: {
      query: () => true,
      // query: rules.canReadItems,
      update: rules.canManageItems,
      delete: rules.canManageItems
    }
  },
  fields: {
    title: (0, import_fields3.text)(),
    sections: (0, import_fields3.json)({
      ui: {
        views: "./customViews/sections/Main.jsx",
        createView: { fieldMode: "edit" },
        listView: { fieldMode: "hidden" },
        itemView: { fieldMode: "edit" }
      }
    })
  }
});

// schema.js
var lists = {
  User: userSchema,
  Role: roleSchema,
  Test: testSchema
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

// controllers/uploadController.js
var import_multer = __toESM(require("multer"));
var import_sharp = __toESM(require("sharp"));
var import_uuid = require("uuid");
var multerStorage = import_multer.default.memoryStorage();
var multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image. Please upload only images."), false);
  }
};
var upload = (0, import_multer.default)({
  storage: multerStorage,
  fileFilter: multerFilter
});
var uploadImage = upload.array("image", 3);
var resizeImage = async (req, res, commonContext) => {
  try {
    const imageObjects = {};
    for (const file of req.files) {
      const fileId = Date.now();
      const smallFilename = `sectionid-${req.body.id}-${fileId}-s.jpeg`;
      await (0, import_sharp.default)(file.buffer).resize(100, 100).toFormat("jpeg").jpeg({ quality: 90 }).toFile(`public/images/sections/${smallFilename}`);
      const mediumFilename = `sectionid-${req.body.id}-${fileId}-m.jpeg`;
      await (0, import_sharp.default)(file.buffer).resize(300, 300).toFormat("jpeg").jpeg({ quality: 90 }).toFile(`public/images/sections/${mediumFilename}`);
      const largeFilename = `sectionid-${req.body.id}-${fileId}-l.jpeg`;
      await (0, import_sharp.default)(file.buffer).resize(500, 500).toFormat("jpeg").jpeg({ quality: 90 }).toFile(`public/images/sections/${largeFilename}`);
      const imageId = (0, import_uuid.v4)();
      imageObjects[imageId] = {
        id: imageId,
        imageUrls: {
          small: `images/sections/${smallFilename}`,
          medium: `images/sections/${mediumFilename}`,
          large: `images/sections/${largeFilename}`
        }
      };
    }
    const imageUrls = Object.values(imageObjects);
    res.json({
      success: "true",
      imageUrls
    });
  } catch (error) {
    res.status(400).json({
      success: "false",
      message: "Something went wrong with the image upload."
    });
  }
};

// controllers/deleteController.js
var import_fs = require("fs");
var deleteImages = async (req, res, commonContext) => {
  try {
    const imagePaths = Object.values(req.body);
    await Promise.all(
      imagePaths.map(async (imagePath) => {
        try {
          await import_fs.promises.unlink(`public/${imagePath}`);
        } catch (error) {
          console.error(`Error deleting file: ${imagePath}`, error);
        }
      })
    );
    res.status(200).json({ success: true, message: "Images were deleted." });
  } catch (error) {
    console.error("Error deleting images:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong when removing the images."
    });
  }
};

// keystone.js
import_dotenv.default.config();
var { ASSET_BASE_URL, PORT, MAX_FILE_SIZE, FRONTEND_URL, DATABASE_URL } = process.env;
function withContext(commonContext, f) {
  return async (req, res) => {
    return f(req, res, await commonContext.withRequest(req, res));
  };
}
var keystone_default = withAuth(
  (0, import_core4.config)({
    server: {
      port: PORT,
      maxFileSize: MAX_FILE_SIZE,
      cors: { origin: ["*"], credentials: true },
      extendExpressApp: (app, commonContext) => {
        app.use(import_express.default.json());
        app.use("/public", import_express.default.static("public"));
        app.patch(
          "/api/imageupload",
          uploadImage,
          withContext(commonContext, resizeImage)
        );
        app.delete("/api/delete-images", withContext(commonContext, deleteImages));
      }
    },
    db: {
      provider: "mysql",
      url: DATABASE_URL,
      idField: { kind: "uuid" }
    },
    lists,
    session,
    ui: { publicPages: ["public"] }
  })
);
//# sourceMappingURL=config.js.map
