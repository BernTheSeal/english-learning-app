import { z } from "zod";
import { zodMongoId, zodBoolean } from "../../shared/zod";
import { IPermission } from "./permission.type";

const name = z
  .string()
  .min(5, "Permission must be at least 5 characters.")
  .max(25, "Permission must be at most 25 characters.")
  .refine(
    (val) => {
      const parts = val.split(":");
      if (parts.length < 2 || parts.length > 3) return false;

      const validPart = /^[a-zA-Z0-9_-]+$/;
      return parts.every((part) => validPart.test(part));
    },
    {
      message:
        "Permission  must be in format resource:action[:scope] and contain only letters, numbers, -, _.",
    }
  );

const description = z
  .string()
  .trim()
  .min(15, "Description must be at least 15 characters.")
  .max(100, "Description must be at most 100 characters.");

export const createPermissionSchema = z
  .object({ name, description, isActive: zodBoolean, isDeleteable: zodBoolean })
  .strict();

export const updatePermissionSchema = z
  .object({
    name: name.optional(),
    description: description.optional(),
    isActive: zodBoolean.optional(),
    isDeleteable: zodBoolean.optional(),
  })
  .strict();

export const getPermissionByIdSchema = z.object({ permissionId: zodMongoId }).strict();

export const deletePermissionSchema = z.object({ permissionId: zodMongoId }).strict();

export const getPermissionsSchema = z
  .object({
    isActive: zodBoolean.optional(),
    isDeleteable: zodBoolean.optional(),
  })
  .strict();
