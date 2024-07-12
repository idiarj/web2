import z from "zod"




export const userRegisterSchema = z.object({
    nombre: z.string({
        required_error: 'El campo user es requerido.',
        message: 'El usuario debe ser un string.'
    }).min(2,
        {
            message: `El nombre debe tener almenos 3 caracteres.`
        }
    ).max(15,
        {
            message: `El nombre no puede tener mas de 15 caracteres.`
        }
    ),
    apellido: z.string({
        required_error: 'El campo user es requerido',
        message: 'El usuario debe ser un string.'
    }).min(3,
        {
            message: `El apellido debe tener almenos 3 caracteres.`
        }
    ).max(15,
        {
            message: `El apellido no puede tener mas de 15 caracteres.`
        }
    ),
cedula: z.number({
        required_error: 'El campo cedula es requerido',
        message: 'El campo cedula debe ser un numero.'
    }).positive({
        message: 'La cedula debe ser un numero positivo.'
    }).int({
        message: 'La cedula debe ser un numero entero.'
    }).min(1000000,
        {
            message: `La cedula debe tener almenos 7 digitos.`
        }
    ).max(99999999,
        {
            message: `La cedula no puede tener mas de 8 digitos.`
        }
    ),
    username: z.string({
            required_error: 'El campo user es requerido',
            message: 'El usuario debe ser un string'
        }).min(3,
            {
                message: `El nombre de usuario debe tener almenos 3 caracteres.`
            }
        ).max(15,
            {
                message: `El nombre de usuario no puede tener mas de 15 caracteres.`
            }
        ),
    // profiles: z.array(z.string().min(3).max(20)).min(1).default(['Admin', 'User']),
    correo: z.string(
            {
                required_error: 'El campo email es requerido',
            }
        ).email({
            message: 'El email no es valido.'
        }).toLowerCase(),
    password: z.string({
            required_error: 'El campo password es requerido',
            message: 'El password debe ser un string'
        }).min(6, 
            {
                message: `La contrasena debe tener almenos 6 caracteres.`
            }
        ).max(16, 
            {
                message: `La contrasena no puede tener mas de 16 caracteres.`
            }
        ),
    })