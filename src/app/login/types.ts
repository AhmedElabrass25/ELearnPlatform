import { z } from "zod";
import { loginSchema } from "./schema";

export type ILoginInput = z.infer<typeof loginSchema>;

export interface ILoginForm {
    email: string;
    password: string;
}
