import {
  createRoleSchema,
  updateRoleSchema,
  getRoleByIdSchema,
  deleteRoleSchema,
  getRolesSchema,
} from "./role.schema";

import { z } from "zod";

export type CreateRoleDTO = z.infer<typeof createRoleSchema>;
export type DeleteRoleDTO = z.infer<typeof deleteRoleSchema>;
export type UpdateRoleDTO = z.infer<typeof updateRoleSchema>;
export type GetRoleByIdDTO = z.infer<typeof getRoleByIdSchema>;
export type GetRolesDTO = z.infer<typeof getRolesSchema>;
