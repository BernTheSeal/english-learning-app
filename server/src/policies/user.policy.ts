import { RoleDocument } from "../features/role/role.type";

const canDeleteUser = ({
  requesterId,
  targetId,
  roles,
}: {
  requesterId: string;
  targetId: string;
  roles: RoleDocument[];
}) => {
  const isAdmin = roles.some((role) => role.name === "admin");

  if (isAdmin && requesterId === targetId) {
    return { allowed: false, reason: "Admin cannot delete themselves." };
  }

  if (!isAdmin && requesterId !== targetId) {
    return { allowed: false, reason: "You can only delete your own account." };
  }

  return { allowed: true };
};

const canViewFullUserInfo = (roles: RoleDocument[]) => {
  const isAdmin = roles.some((role) => role.name === "admin");

  if (isAdmin) {
    return { allowed: true };
  } else {
    return { allowed: false };
  }
};

export default { canDeleteUser, canViewFullUserInfo };
