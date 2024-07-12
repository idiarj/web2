import z from "zod"




export const userRegisterSchema = z.object({
    nombre: z.string({
        required_error: 'El campo user es requerido',
        message: 'El usuario debe ser un string'
    }).min(3).max(15),
    apellido: z.string({
        required_error: 'El campo user es requerido',
        message: 'El usuario debe ser un string'
    }).min(3).max(15),
cedula: z.number({
        required_error: 'El campo cedula es requerido',
        message: 'El campo cedula debe ser un numero'
    }).positive({
        message: 'La cedula debe ser un numero positivo'
    }).int({
        message: 'La cedula debe ser un numero entero'
    }).min(1000000).max(99999999),
    username: z.string({
            required_error: 'El campo user es requerido',
            message: 'El usuario debe ser un string'
        }).min(3).max(15),
    // profiles: z.array(z.string().min(3).max(20)).min(1).default(['Admin', 'User']),
    correo: z.string(
            {
                required_error: 'El campo email es requerido',
            }
        ).email({
            message: 'El email no es valido'
        }).toLowerCase(),
    password: z.string({
            required_error: 'El campo password es requerido',
            message: 'El password debe ser un string'
        }).min(6, 
            {
                message: `El passwor debe tener almenos 6 caracteres`
            }
        ).max(16, {
            message: `El password no puede tener mas de 16 caracteres`
        
        }),
    })