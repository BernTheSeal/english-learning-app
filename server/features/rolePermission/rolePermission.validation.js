import { idSchema } from "../../validators/schema/id.schema.js";

const addPermissionToRole = [idSchema("roleId"), idSchema("permissionId")];

const removePermissionFromRole = [idSchema("roleId"), idSchema("permissionId")];

export default { addPermissionToRole, removePermissionFromRole };
