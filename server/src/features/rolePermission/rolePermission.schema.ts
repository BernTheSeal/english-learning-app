import { z } from "zod";
import { zodMongoId } from "../../shared/zod";

export const rolePermissionSchema = z.object({
  roleId: zodMongoId,
  permissionId: zodMongoId,
});
