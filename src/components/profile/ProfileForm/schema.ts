import * as z from "zod";

export const profileSchema = z.object({
    fullName: z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
    email: z.string().email("البريد الإلكتروني غير صالح"),
    governorate: z.string().min(1, "يجب اختيار المحافظة"),
});

export type ProfileValues = z.infer<typeof profileSchema>;

export interface ProfileFormProps {
    user: { 
        fullName: string; 
        email: string; 
        governorate: string; 
    };
}
