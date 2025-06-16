import { idSchema } from "../../validators/schema/id.schema.js";

const addPermissionToRole = [idSchema("roleId"), idSchema("permissionId")];

const removePermissionFromRole = [idSchema("roleId"), idSchema("permissinId")];

export default { addPermissionToRole, removePermissionFromRole };
