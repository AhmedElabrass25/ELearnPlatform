import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "الاسم لازم يكون 3 حروف على الأقل"),

    phone: z
      .string()
      .regex(/^01[0-2,5]{1}[0-9]{8}$/, "رقم الهاتف غير صحيح"),
    parentPhone: z
      .string()
      .regex(/^01[0-2,5]{1}[0-9]{8}$/, "رقم هاتف الوالد غير صحيح"),
    email: z
      .string()
      .email("صيغة البريد الإلكتروني غير صحيحة"),
// make password stronger by requiring at least one uppercase letter, one lowercase letter, one number, and one special character
    password: z
      .string()
      .min(8, "كلمة المرور لازم تكون 8 حروف على الأقل")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "(ex. pasSword@123)كلمة المرور لازم تحتوي على حرف كبير وحرف صغير ورقم وحرف خاص"),
    passwordConfirm: z
      .string(),

    educationLevel: z
      .string()
      .min(1, "اختار المرحلة الدراسية"),

    governorate: z
      .string()
      .min(1, "اختار المحافظة"),

    gender: z
      .string()
      .min(1, "اختار النوع"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "كلمة المرور غير متطابقة",
    path: ["passwordConfirm"], // 👈 مهم عشان يظهر تحت الحقل
  });