import { checkAccessToken } from "./checkAccessToken";
import { checkPermissions } from "./checkPermissions";

export const authGuard = (permission: string) => [checkAccessToken, checkPermissions(permission)];
