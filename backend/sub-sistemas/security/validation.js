export class Validation{
    constructor(schema){
        this.schema = schema
    }

    async validateTotal(obj){
            try{
                return await this.schema.safeParseAsync(obj)
            }catch(err){
                return {error: err}
            }
    }

    async validateUpate(obj){
        try{
            return await this.schema.partial().safeParseAsync(obj)
        }catch(err){
            return {error: err}
        }
    }
}