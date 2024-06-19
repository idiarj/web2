import Pool from 'pg-pool'

export class PgHandler{

    constructor( { config, querys } ){
        this.config = config
        this.querys = querys
        this.pool = new Pool(this.config)
        
    }


    async getConn(){
        try {
            return this.pool.connect()
        } catch (error) {
            return {error}
        }
    }

    async exeQuery({key, params = []}){
        try {
            console.log(`la key es ${key}`)
            // console.log(`no me lee ${this.querys}`)
            const query = this.querys[key]
            
            console.log(`la query entera es ${query}`)
            const {rows} = await this.pool.query(query, params)
            return rows

        } catch (error) {
            console.log(error)
            return { error }
        }
    }
    async releaseConn(){
        try {
            await this.pool.end()
        } catch (error) {
            
        }
    }

}