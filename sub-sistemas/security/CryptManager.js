import bcrypt from "bcryptjs"


export default class CryptManager{

   static encriptarData = async ( {data, saltRounds = 10} )=>{
        try{
            const cryptedPass = await bcrypt.hash(data, saltRounds)
            return cryptedPass
        }catch(error){
            console.log(error)
            return {error}
        }
    }

    static compareData = async ({hashedData, toCompare})=>{
        try {
            const valid = await bcrypt.compare(toCompare, hashedData);
            return valid
        } catch (error) {
            return {error}
        }
    }
}