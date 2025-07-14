import { z } from "zod";
import { zodBoolean, zodMongoId } from "../../shared/zod";

const name = z
  .string()
  .min(3, "Role must be at least 3 characters.")
  .max(20, "Permission must be at most 20 characters.");

const description = z
  .string()
  .trim()
  .min(15, "Description must be at least 15 characters.")
  .max(100, "Description must be at most 100 characters.");

export const createRoleSchema = z
  .object({
    name,
    description,
    isActive: zodBoolean,
    isDeleteable: zodBoolean,
  })
  .strict();

export const updateRoleSchema = z
  .object({
    name: name.optional(),
    description: description.optional(),
    isActive: zodBoolean.optional(),
    isDeleteable: zodBoolean.optional(),
  })
  .strict();

export const getRoleByIdSchema = z.object({ roleId: zodMongoId }).strict();

export const deleteRoleSchema = z.object({ roleId: zodMongoId }).strict();

export const getRolesSchema = z
  .object({
    isActive: zodBoolean.optional(),
    isDeleteable: zodBoolean.optional(),
  })
  .strict();
