import session from 'express-session'

export class SessionWrapper{
    constructor(config){
        this.config = config
        this.session = session(this.config)
    }

    getSession(){
        return this.session
    }

    createSession(req, res){
        const {body, session} = req

            for(let key in body){
                session[key] = body[key]
            }
            return session

    }

    verifySession(req, res){

        try{
            if(req.session.user){
            return res.json({mensaje: 'ya tienes una sesion iniciada'})
        }else{
            this.createSession(req, res)
        }}catch(err){
            return {err}
        }
    }

    closeSession(req, res){
        try{
            req.session.destroy(err =>{
                if(err) console.error(err)
            })
        return res.json({mensaje: 'tu sesion ha sido cerrada'})
        }catch(err){
            return {err}
        }
    }
}