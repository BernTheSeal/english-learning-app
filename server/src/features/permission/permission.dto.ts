import {
  createPermissionSchema,
  getPermissionsSchema,
  deletePermissionSchema,
  updatePermissionSchema,
  getPermissionByIdSchema,
} from "./permission.schema";

import { z } from "zod";

export type CreatePermissionDTO = z.infer<typeof createPermissionSchema>;
export type DeletePermissionDTO = z.infer<typeof deletePermissionSchema>;
export type UpdatePermissionDTO = z.infer<typeof updatePermissionSchema>;
export type GetPermissionsDTO = z.infer<typeof getPermissionsSchema>;
export type GetPermissionByIdDTO = z.infer<typeof getPermissionByIdSchema>;
