import express from "express";
import {
  getUsers,
  getUserById,
  deleteUser,
  addRoleToUser,
  removeRoleFromUser,
} from "../controllers/user.controller.js";
import {
  getUserByIdValidator,
  deleteUserValidator,
  addRoleToUserValidator,
  removeRoleFromUserValidator,
  getUsersValidator,
} from "../validators/handlers/user.validation.js";
import { withValidation } from "../validators/withValidation.js";
import { whitelistFields } from "../middlewares/whiteListFields.js";
import { authGuard } from "../middlewares/authGuard.js";
import { checkFullAccess } from "../middlewares/checkFullAccess.js";

const route = express.Router();

route.get(
  "/",
  authGuard("user:read"),
  whitelistFields({ isVerified: "query", role: "query" }),
  withValidation(getUsersValidator),
  getUsers
);

route.get(
  "/:userId",
  authGuard("user:read:id"),
  checkFullAccess("admin"),
  whitelistFields({ userId: "params" }),
  withValidation(getUserByIdValidator),
  getUserById
);

route.delete(
  "/:userId",
  authGuard("user:delete:id"),
  checkFullAccess("admin"),
  whitelistFields({ userId: "params" }),
  withValidation(deleteUserValidator),
  deleteUser
);

route.post(
  "/:userId/role/:roleId",
  authGuard("user:assign-role:id"),
  whitelistFields({ userId: "params", roleId: "params" }),
  withValidation(addRoleToUserValidator),
  addRoleToUser
);

route.delete(
  "/:userId/role/:roleId",
  authGuard("user:revoke-role:id"),
  whitelistFields({ userId: "params", roleId: "params" }),
  withValidation(removeRoleFromUserValidator),
  removeRoleFromUser
);

export default route;
