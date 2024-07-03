import { Pool } from 'pg'

export class Transaction{

    constructor(config, querys){
        this.config = config
        this.querys = querys
        this.pool = new Pool(this.config)
    }

    async begin(){
        
    } 
}