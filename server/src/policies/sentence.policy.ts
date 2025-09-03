import { Types } from "mongoose";
import { RoleDocument } from "../features/role/role.type";
import { Policy } from "./policy.type";

const canDeleteSentece = ({
  requesterId,
  sentenceOwnerId,
  roles,
}: {
  requesterId: string;
  sentenceOwnerId: Types.ObjectId;
  roles: RoleDocument[];
}): Policy => {
  const isAdmin = roles.some((r) => r.name === "admin");

  if (!isAdmin && requesterId !== sentenceOwnerId.toString()) {
    return {
      allowed: false,
      reason: "You are only allowed to delete your own sentences.",
    };
  }

  return { allowed: true };
};

export default { canDeleteSentece };
