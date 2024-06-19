import z from "zod"

export const userLoginSchema = z.object({
    username: z.string({
        required_error: 'El campo user es requerido',
        message: 'El usuario debe ser un string'
    }).min(3).max(15),
    password: z.string({
        required_error: 'El campo password es requerido',
        message: 'La password debe ser un string'
    }).min(6, 
        {
            message: `La password debe tener almenos 6 caracteres`}
        ).max(16, {
            message: 'La password no debe tener mas de 16 caracteres'}
        )
})