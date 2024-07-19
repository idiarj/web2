import { iPgHandler } from "../data/psql-data/iPgManager.js";
import { CryptManager } from "../sub-sistemas/security/CryptManager.js";

export class userModel{

    



    static async getAllUsers(){
        try{
        const result = await iPgHandler.exeQuery({key: 'select'})
        return result
        }catch(error){
            return error
        }
    }

    static async getUser({username}){
        try{
            console.log(username)
            const user = await iPgHandler.exeQuery({key: 'getUser', params: [username]})
            return user
        }catch(error){
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
       static async registerUser({nombre, apellido, cedula, username, correo, password}){ 

        const hashedPassword = await CryptManager.encriptarData({data: password});
        const client = await iPgHandler.beginTransaction()



        try {
            console.log('entre en el try de user model registeruser')
            console.log(`insertando la persona ${nombre} ${apellido}`);
            const [{
                id_persona
            }] = await iPgHandler.exeQuery({key: 'insert_persona', params: [nombre, apellido, cedula], client});
            console.log(`insertando el usuario ${username} ${correo} ${id_persona}`);
            await iPgHandler.exeQuery({key: 'insert_username', params:[username, correo, hashedPassword, id_persona], client});

            await iPgHandler.commitTransaction(client)
            return { success: true, message: "Usuario registrado con éxito" };
        } catch (error) {
            await iPgHandler.rollbackTransaction(client)
            console.log('error al insertar el usuario:', error);
            client.release();
            return { success: false, message: "Error al registrar el usuario", error };
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
            console.log(`user es ${user}`)
            const resultSet = await iPgHandler.exeQuery({key: 'verifyUser', params: [user]})
            // console.log(result)

            if(resultSet && resultSet.length > 0){

                // const [ {username} ] = result
                // console.log(username)
                return {success: true, resultSet}

            }else{
                console.log('usuario no encontrado')
                return { success: false, resultSet }
                
            }
        } catch (error) {
            return {error}
        }
    }

    static async verifyPassword({username, password_user}){
        console.log('------VERIFY PASSWORD-------')
        try{
            console.log(password_user)
            const result = await iPgHandler.exeQuery({key: 'verifyPassword', params: [username]})
            // console.log(result)

            if(result && result.length > 0){
                const [ {password} ] = result
                const validity = await CryptManager.compareData({hashedData : password, toCompare: password_user})
                return {success: validity}
            }else{
                return {success: false}
            }
        }catch(error){
            console.log(error)
            return {error}
        }
    }

    static async getUsernameId({user}){
        try{
            const key = 'getUserId'
            const params = [user]
            const [{id_usuario}] = await iPgHandler.exeQuery({key, params})
            return id_usuario
        }catch(error){
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
        const result = await iPgHandler.exeQuery({key: 'findByEmail', params: [email]});
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
            // Assuming iPgHandler is your database instance and there's a prepared statement for saving the token
            const query = 'UPDATE "public".usuario SET reset_token = $2, reset_token_expiration = $3 WHERE correo_usu = $1;';
            await iPgHandler.exeQuery(query, [email, resetToken, expirationDate]);
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


}