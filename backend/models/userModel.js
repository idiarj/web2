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
     * Metodo estatico y asincrono para verificar un usuario existe en la base de datos.
     * @param {String} param.user - Usuario a verificar.
     * @returns {Promise<String>} - Devuelve el usuario si existe, si no devuelve undefined.
     */
    static async verifyUser({ user }){
        console.log('------VERIFY USER-------')
        try {

            const result = await instancePG.exeQuery({key: 'verifyUser', params: [user]})

            if(result.rows && result.rows.length > 0){

                const [ {username} ] = result.rows
                return username

            }else{

                return false
                
            }
        } catch (error) {
            return {error}
        }
    }

    /**
     * 
     * @param {Object} param - Objeto con el usuario y contrasena introducidas por el cliente
     * @param {String} param.username - Usuario que intenta ingresar sesion y al cual se le validara la password
     * @param {String} param.password - Password a validar 
     * @returns {Promise<Boolean>} - Promesa que resuelva a un booleano, true si la contrasena es valia y false si no lo es.
     */
    static async verifyPassword({username, password}){
        console.log('------VERIFY PASSWORD-------')
        try{
            console.log(password)
            const result = await instancePG.exeQuery({key: 'verifyPassword', params: [username]})
            console.log(result)

            if(result.rows && result.rows.length > 0){
                const [ {contra_usu} ] = result.rows
                return await CryptManager.compareData({hashedData : contra_usu, toCompare: password})
            }else{
                return false
            }
        }catch(error){
            console.log(error)
            return {error}
        }
    }
    


   /**
 * Registra un nuevo usuario en la base de datos. Este método asume que el objeto proporcionado
 * contiene toda la información necesaria para crear un nuevo registro de usuario, incluyendo
 * nombre, apellido, nombre de usuario, correo electrónico y contraseña. La contraseña se cifrará
 * antes de almacenarse en la base de datos.
 *
 * @param {Object} obj - Objeto con los datos del usuario a registrar.
 * @param {string} obj.nombre - Nombre del usuario.
 * @param {string} obj.apellido - Apellido del usuario.
 * @param {string} obj.username - Nombre de usuario, debe ser único.
 * @param {string} obj.correo - Correo electrónico del usuario.
 * @param {string} obj.password - Contraseña del usuario.
 * @returns {Promise<Object>} - Promesa que resuelve a un objeto. Si el registro es exitoso,
 *                               el objeto tendrá una propiedad `success` con valor `true` y
 *                               un mensaje `message` indicando el éxito de la operación.
 *                               En caso de error, el objeto tendrá una propiedad `success` con
 *                               valor `false` y detalles del error en `message` y `error`.
 */
    static async registerUser(obj){
        const {nombre, apellido, username, correo, password} = obj;
        const hashedPassword = await CryptManager.encriptarData({data: password});
        const {insert_persona, insert_username} = instancePG.querys;
        const client = await instancePG.getConn();

        try {
            console.log('entre en el try de user model registeruser')
            await client.query('BEGIN');
            console.log(`insertando la persona ${nombre} ${apellido}`);
            const { rows: [{id_persona}] } = await client.query(insert_persona, [nombre, apellido]);
            console.log(`insertando el usuario ${username} ${correo} ${id_persona}`);
            await client.query(insert_username, [username, correo, hashedPassword, id_persona]);

            await client.query('COMMIT');
            client.release();
            return { success: true, message: "Usuario registrado con éxito" };
        } catch (error) {
            await client.query('ROLLBACK');
            console.log('error al insertar el usuario:', error);
            client.release();
            return { success: false, message: "Error al registrar el usuario", error };
        }
    }
}

// let paramsObj = {
//     nombre_per: 'Alexandra',
//     apellido_per: 'Rodriguez',
//     direccion_per: 'Maracaibo'
// }



// // let asimismo = await userModel.getFromUsername({username: 'Victoria'})
// // console.log(asimismo)

// let result = await userModel.addUser(paramsObj)
// console.log(result)