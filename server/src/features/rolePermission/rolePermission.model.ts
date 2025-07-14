import mongoose from "mongoose";

import { RolePermissionDocument } from "./rolePermission.type";

const rolePermissionSchema = new mongoose.Schema<RolePermissionDocument>({
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
  permissionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Permission",
  },
});

export const RolePermission = mongoose.model<RolePermissionDocument>("RolePermission", rolePermissionSchema);
