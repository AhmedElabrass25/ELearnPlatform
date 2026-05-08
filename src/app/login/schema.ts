import { z } from "zod";

export const loginSchema = z
  .object({
    email: z
      .string()
      .email("صيغة البريد الإلكتروني غير صحيحة"),
    password: z
      .string()
  })
 