import mongoose from "mongoose";

const rolePermissionSchema = new mongoose.Schema({
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
  permissionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Permission",
  },
});

export const RolePermission = mongoose.model("RolePermission", rolePermissionSchema);
