import { instancePG } from "../data/psql-data/iPgManager.js";
import { CryptManager } from "../sub-sistemas/security/CryptManager.js";

export class userModel{



    static async getAllUsers(){
        try{
        const result = await instancePG.exeQuery({key: 'select'})
        return result
        }catch(error){
            return error
        }
    }

    static async getFromUsername({username}){
        try{
            const result = await instancePG.exeQuery({key: 'where', params: [username]})
            return result
        }catch(error){
            return {error}
        }
    
    }
    /**
     * 
     * @param {Object} data - Objeto JSON con los parametros introucidos en el cliente 
     */
    static async addUser(data){
        let paramsArray = Object.values(data) 
        try{
        const addedUser = await instancePG.exeQuery({key: 'insert_username', params: paramsArray})
        }catch(error){
            return {error}
        }

    }

}

let paramsObj = {
    nombre_per: 'Alexandra',
    apellido_per: 'Rodriguez',
    direccion_per: 'Maracaibo'
}



// let asimismo = await userModel.getFromUsername({username: 'Victoria'})
// console.log(asimismo)

let result = await userModel.addUser(paramsObj)
console.log(result)