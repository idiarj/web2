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
     * @returns {Promise<Boolean>} - Devuelve true si el usuario existe, false si no existe.
     */
    static async verifyUser({ user }){
        try {
            // console.log(user)
            const result = await instancePG.exeQuery({key: 'verifyUser', params: [user]})
            // console.log(result)
            // console.log(`resultado ${result.rows}`)
            console.log(result)
            const userExists = result.rows.length > 0
            return userExists
        } catch (error) {
            return {error}
        }
    }

    /**
     * Method to find a user by their email.
     * @param {String} email - The email of the user to find.
     * @returns {Promise<Object|null>} - The user object if found, null otherwise.
     */
    static async findByEmail(email) {
    try {
        const query = 'SELECT * FROM users WHERE email = $1'; // Adjust the query according to your database schema
        const result = await instancePG.exeQuery({key: 'findByEmail', params: [email]});
        if (result && result.rows && result.rows.length > 0) {
            return result.rows[0]; // Assuming email is unique and can only find one user
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error finding user by email:', error);
        throw error; // Rethrow the error or handle it as needed
    }
}

    /**
     * Saves a password reset token for a user identified by their email.
     * @param {String} email - The email of the user to save the reset token for.
     * @param {String} resetToken - The reset token to save.
     * @param {Date} expirationDate - The expiration date of the reset token.
     * @returns {Promise<Boolean>} - True if the token was saved successfully, false otherwise.
     */
    static async saveResetToken(email, resetToken, expirationDate) {
        try {
            // Assuming instancePG is your database instance and there's a prepared statement for saving the token
            const query = 'UPDATE "public".usuario SET reset_token = $2, reset_token_expiration = $3 WHERE correo_usu = $1;';
            await instancePG.query(query, [email, resetToken, expirationDate]);
            return true;
        } catch (error) {
            console.error('Error saving reset token:', error);
            return false;
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
        try{
            console.log(password)
            const result = await instancePG.exeQuery({key: 'verifyPassword', params: [username]})
            console.log(result)
            const [ {contra_usu} ] = result.rows
            console.log(contra_usu)
            // console.log(result.rows['contra_usu'])
            console.log(password)
            return result.rows.length > 0 && await CryptManager.compareData({hashedData : contra_usu, toCompare: password})
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