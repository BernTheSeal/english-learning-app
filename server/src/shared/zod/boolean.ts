import { z } from "zod";

const stringBoolean = z.enum(["true", "false"]).transform((val) => val === "true");

const bodyBoolean = z.boolean({ required_error: "Boolean value is required." });

export const zodBoolean = z.union([stringBoolean, bodyBoolean]);
