import Pool from 'pg-pool'

/**
 * @class Clase para manejar conexiones y realizar consultas a una base de datos SQL.
 */

export class PgHandler{

    /**
     * @constructor Crea una instancia de PgHandler.
     * @param {Object} config - Configuracion para el pool de conexiones de la clase.
     * @param {Object} querys - Objeto que contiene las consultas SQL predefinidas/
     */

    constructor({ config, querys }) {
        this.config = config
        this.querys = querys
        this.pool = new Pool(this.config)
        
    }

    /**
     * @method Metodo asincronico que devuelve una conexion a una base de datos SQL.
     * @returns {Promise<PoolCLient>} -Promesa que se resuelve devolviendo la conexion
     */
    async getConn(){
        try {
            return await this.pool.connect()
        } catch (error) {
            return {error}
        }
    }

    /**
     * @method - Metodo asincrona para ejecutar una consulta SQL a una base de datos.
     * @param {Object} options - Objeto con las opciones para la ejecucion de la consulta
     * @param {string} options.key - La clave que referencia la consulta SQL predefinidas en el objeto querys
     * @param {Array} [options.params=[]] - Parametros con los que se ejecutaran la consulta. 
     * @param {PoolClient} [options.client=null] - Cliente opcional para ejecutar la consulta. Si no se proporciona, se obtiene uno nuevo.
     * @returns {Promise<Array>} - Promesa que resuelve con el resultado de la consulta SQL.
     * @throws {Error} - Lanza un error si la consulta no se puede ejecutar correctamente.
     */
    async exeQuery({key, params = [], client = null}){
        const isClientProvided = client ? true : false
        client = isClientProvided ? client : await this.getConn()
        console.log('estoy en una transaccion?', isClientProvided)
        // console.log(client)
        try {
            console.log(`la key es ${key}`)
            // console.log(`no me lee ${this.querys}`)
            const query = this.querys[key]
            if (!query) {
                console.log(`NO HAY QUERY`)
                throw new Error(`Query not found for key: ${key}`);
            }
            console.log(`la query entera es ${query}`)
            console.log(`los parametros son ${params}`)
            
            const result = await client.query(query, params)
            // console.log(result)
            console.log(result.rows)
            return result.rows

        } catch (error) {

            console.log(error)
            return { error }

        }finally{
            if(!isClientProvided){
                await this.releaseConn(client)
            }
        }
    }
    

    /**
     * @method Metodo asincrona para liberar una conexion a una base de datos SQL.
     * @param {PoolClient} client - Conexion que se liberara.
     * 
     */
    async releaseConn(client){
        try {
            await client.release()
        } catch (error) {
            console.log(error.message)
            return {error}
        }
    }

    /**
     * @method Metodo para inicializar una transaccion.
     * @returns {PoolClient}  - Cliente con el que se realizaran las demas operacion de la transaccion.
     * @throws {Error} Lanza un error si no se puede obtener una conexión o si ocurre un error 
     *                  al intentar comenzar la transacción.
     */
    async beginTransaction(){
        const client = await this.getConn()
        try {
            await client.query('BEGIN')
            return client
        } catch (error) {
            throw new Error(`No se ha podido inicializar la transaccion, ${error.message}`)
        }
    }

    /**
     * @method Metodo para realizar una transaccion.
     * @param {PoolClient} client - Cliente con el que se realizaran las demas operacion de la transaccion.
     * @throws {Error} Lanza un error si no se puede obtener una conexión o si ocurre un error 
     *                  al intentar realizar la transacción.
     */

    async commitTransaction(client){
        //if(client) throw new Error('No se ha proporcionado un cliente o se proporciono uno invalio.')
        try{
            await client.query('COMMIT')
            await this.releaseConn(client)
        }catch{     
            throw new Error(`No se ha podido realizar la transaccion, ${error.message}`)
        }
    }

    /**
     * @method Metodo para deshacer una transaccion si ocurre un error durante su ejecucion.
     * @param {PoolClient} client - Cliente con el que se realizaran las demas operacion de la transaccion.
     * @throws {Error} Lanza un error si no se puede obtener una conexión o si ocurre un error 
     *                  al intentar deshacer la transacción.
     */
    async rollbackTransaction(client){
        try {
            await client.query('ROLLBACK')
            await this.releaseConn(client)
        } catch (error) {
            throw new Error(error.message)
        }
    }

}
