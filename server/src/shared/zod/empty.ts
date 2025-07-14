import { z } from "zod";

export const zodEmptyObject = z.union([z.object({}).strict(), z.undefined()]).transform(() => ({}));
