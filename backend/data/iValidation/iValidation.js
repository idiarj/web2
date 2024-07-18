import { Validation } from "../../sub-sistemas/security/validation.js";
import { userLoginSchema } from "./schemas/loginSchema.js";
import { userRegisterSchema } from "./schemas/registerSchema.js";
import { projectSchema } from "./schemas/projectSchema.js";

export const loginValidation = new Validation(userLoginSchema)
export const registerValidation = new Validation(userRegisterSchema); 
export const projectValidation = new Validation(projectSchema)