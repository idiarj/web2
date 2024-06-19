import { Validation } from "../../sub-sistemas/security/validation.js";
import { userLoginSchema } from "./schemas/loginSchema.js";
import { userRegisterSchema } from "./schemas/registerSchema.js";

export const loginValidation = new Validation(userLoginSchema)
export const registerValidation = new Validation(userRegisterSchema); 