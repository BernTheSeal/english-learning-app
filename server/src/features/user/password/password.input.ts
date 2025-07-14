import { UpdatePasswordDTO } from "./password.dto";

export type validatePasswordInput = UpdatePasswordDTO & { userId: string };
