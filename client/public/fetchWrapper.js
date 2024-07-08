/**
 * @class Clase wrapper de fetch para desacoplar fetch.
 */
export class fetchWrapper{
    /**
     * 
     * @param {String} baseUrl - URL base donde se haran todas las peticion HTTP. 
     */
    constructor(baseUrl){
        this.baseUrl = baseUrl
    }

    /**
     * @method - Metodo asincrono envoltorio de fetch
     * @param {Object} params - Objeto con los parametros del fetch.
     * @param {String} params.endpoint - String con el endpoint al cual se realizara la peticion HTTP.
     * @param {Object} [params.headers] - Cebeceras para la peticion HTTP. Por defecto, se incluye {'Content-Type': 'application/json'}.
     * @param {String} [params.method] - Nombre del metodo HTTP con el cual se realizara la peticion.
     * @param {String} [params.credentials] - Credenciales para 
     * @param {Object} [params.body] - Cuerpo de la peticion en caso de ser un peticion.
     * @returns {Response} - Respuesta de la peticion HTTP.
     */
    async fetchMethod({endpoint, method = 'get', headers = {
        'Content-Type': 'application/json',
      }, body, credentials = 'same-origin'}){
        const response = await fetch(`${this.baseUrl}/${endpoint}`,
            {
                method: method.toUpperCase(),
                credentials: credentials,
                headers: headers,
                body: JSON.stringify(body)
            }
        )
        return response
      }

}


/**
 * @instance - Instancia e la clase fetchWrapper.
 */

export const ifetchWrapper = new fetchWrapper('http://localhost:3000')
