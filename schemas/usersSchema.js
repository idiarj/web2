import z from "zod"

const userSchema = z.object({
    user: z.string().min(3).max(15),
    profiles: z.array(z.string().min(3).max(20)).min(1),
    email: z.string().email().toLowerCase(),
    password: z.string().min(6).max(16),
})


export const verifyUser = async (obj)=>{
    try{
        return await userSchema.safeParseAsync(obj)
    }catch(err){
        return {err}
    }
}

export const verifyUpateUser = async (obj)=>{
    try{
        return await userSchema.partial().safeParseAsync(obj)
    }catch(err){
        return {err}
    }
}