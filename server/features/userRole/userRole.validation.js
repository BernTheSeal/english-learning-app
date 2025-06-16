import { idSchema } from "../../validators/schema/id.schema.js";

const addRoleToUser = [idSchema("userId"), idSchema("roleId")];

const removeRoleFromUser = [idSchema("userId"), idSchema("roleId")];

export default { addRoleToUser, removeRoleFromUser };
