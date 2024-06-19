import bcrypt from "bcryptjs"


export class CryptManager{

    /**
     * Encripta los datos proporcionados por el cliente para tener una capa mas de seguridad
     * @param {Object} params - Objeto con los datos a encriptar y el numero de saltRounds
     * @param {string} params.data - Dato o contrasena a encriptar
     * @param {number} params.saltRounds - Numero de saltRounds a utilizar
     * @returns {Promise<string>} - Retorna la contrasena encriptada
     */

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
            // console.log('estoy en compareData')
            // console.log('hashedData', hashedData)
            // console.log('toCompare', toCompare)
            const valid = await bcrypt.compare(toCompare, hashedData);
            // console.log('dentro del wrapper de bcryptjs', valid)
            return valid
        } catch (error) {
            console.log(error.message)
            return {error}
        }
    }
}