import * as z from "zod";

export const passwordSchema = z.object({
    currentPassword: z.string().min(1, "كلمة المرور الحالية مطلوبة"),
    newPassword: z
      .string()
      .min(8, "كلمة المرور لازم تكون 8 حروف على الأقل")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "كلمة المرور لازم تحتوي على حرف كبير وحرف صغير ورقم وحرف خاص"),
    passwordConfirm: z.string().min(1, "تأكيد كلمة المرور مطلوب"),
}).refine((data) => data.newPassword === data.passwordConfirm, {
    message: "كلمتا المرور لا تتطابقان",
    path: ["passwordConfirm"],
});

export type PasswordValues = z.infer<typeof passwordSchema>;
