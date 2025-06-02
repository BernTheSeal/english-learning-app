import { checkToken } from "./checkToken.js";
import { checkPermissions } from "./checkPermissions.js";

export const authGuard = (permission) => [checkToken, checkPermissions(permission)];
