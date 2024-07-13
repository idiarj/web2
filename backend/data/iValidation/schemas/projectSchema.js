import z from 'zod'

export const projectSchema = z.object({
    projectName: z.string({
        required_error: 'El campo nombre es requerido.',
        message: 'El nombre debe ser un string.'
    }).min(5,
        {
            message: `El nombre debe tener almenos 3 caracteres.`
        }
    ).max(40,
        {
            message: `El nombre no puede tener mas de 15 caracteres.`
        }
    ),
    objective: z.string({
        required_error: 'El campo objetivo es requerido',
        message: 'La objetivo debe ser un string.'
    }).min(3,
        {
            message: `La descripcion debe tener almenos 3 caracteres.`
        }
    ).max(50,
        {
            message: `La descripcion no puede tener mas de 50 caracteres.`
        }
    ),
    members: z.array(z.object({
        cedula: z.number().positive().int(),
        profiles: z.array(z.string())
    })).optional(),
    startDate: z.string({
        required_error: 'El campo fecha_inicio es requerido',
        message: 'La fecha de inicio debe ser un string.'
    }),
    endDate: z.string({
        required_error: 'El campo fecha_fin es requerido',
        message: 'La fecha de fin debe ser un string.'
    }),
    state: z.string({
        required_error: 'El campo estado es requerido',
        message: 'El estado debe ser un string.'
    })
})