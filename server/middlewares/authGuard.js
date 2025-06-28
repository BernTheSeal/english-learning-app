import { checkAccessToken } from "./checkAccessToken.js";
import { checkPermissions } from "./checkPermissions.js";

export const authGuard = (permission) => [checkAccessToken, checkPermissions(permission)];
