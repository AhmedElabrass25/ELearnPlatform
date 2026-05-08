import { z } from "zod";
import { registerSchema } from "./schema";

export type RegisterInput = z.infer<typeof registerSchema>;

export interface IRegisterForm {
  fullName: string;
  phone: string;
  parentPhone: string;
  email: string;
  password: string;
  passwordConfirm: string;
  educationLevel: string;
  governorate: string;
  gender: string;
}


export type EducationalLevel = "first_secondary" | "second_secondary" | "third_secondary" | "";

export type Governorate = "cairo" | "giza" | "alex" | "other" | "";

export type Gender = "male" | "female" | "";