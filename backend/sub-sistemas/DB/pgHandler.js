import Pool from 'pg-pool'

/**
 * @class Clase para manejar conexiones y realizar consultas a una base de datos SQL.
 */

export class PgHandler{

    /**
     * Crea una instancia de PgHandler.
     * @param {Object} config - Configuracion para el pool de conexiones de la clase.
     * @param {Object} querys - Objeto que contiene las consultas SQL predefinidas/
     */

    constructor({ config, querys }) {
        this.config = config
        this.querys = querys
        this.pool = new Pool(this.config)
        
    }

    /**
     * Metodo asincronico que devuelve una conexion a una base de datos SQL.
     * @returns {Promise<PoolCLient>} - Promesa que se resuelve devolviendo la conexion
     */
    async getConn(){
        try {
            return await this.pool.connect()
        } catch (error) {
            return {error}
        }
    }

    /**
     * Funcion asincrona para ejecutar una consulta SQL a una base de datos.
     * @param {Object} options - Objeto con las opciones para la ejecucion de la consulta
     * @param {string} options.key - La clave que referencia la consulta SQL predefinidas en el objeto querys
     * @param {Array} [options.params=[]] - Parametros con los que se ejecutaran la consulta. 
     * @returns {Promise<Object>} - Promesa que resuelve con el resultado de la consulta SQL.
     * @throws {Error} - Lanza un error si la consulta no se puede ejecutar correctamente.
     */
    async exeQuery({key, params = []}){
        const client = await this.getConn()
        try {
            console.log(`la key es ${key}`)
            console.log(`no me lee ${this.querys}`)
            const query = this.querys[key]
            if (!query) {
                throw new Error(`Query not found for key: ${key}`);
            }
            console.log(`la query entera es ${query}`)
            console.log(`los parametros son ${params}`)
            
            const result = await client.query(query, params)

            return result

        } catch (error) {

            console.log(error)
            return { error }

        }finally{
            await this.releaseConn(client)
        }
    }
    

    /**
     * Funcion asincrona para liberar una conexion a una base de datos SQL.
     * @param {PoolClient} cnn - Conexion que se liberara.
     * 
     */
    async releaseConn(cnn){
        try {
            await cnn.release()
        } catch (error) {
            console.log(error.message)
            return {error}
        }
    }

}
