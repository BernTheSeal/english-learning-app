import { z } from "zod";
import { zodMongoId } from "../../shared/zod";

export const userRoleSchema = z.object({
  userId: zodMongoId,
  roleId: zodMongoId,
});
