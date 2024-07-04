import session from 'express-session'

export class SessionWrapper{
    constructor(config){
        this.config = config
        this.session = session(this.config)
    }

    getSession(){

        return this.session

    }

async createSession(req){
    const {body, session} = req;
    for(let key in body){
        session[key] = body[key];
        console.log(`creare sesion con ${session[key]}`);
    }
    return new Promise((resolve, reject) => {
        session.save(err => {
            if(err) {
                console.error('Error al guardar la sesión:', err);
                reject(err);
            } else {
                console.log('Sesión guardada con éxito');
                resolve();
            }
        });
    });
}

    verifySession(req){
        return req.session && req.session.username ? true : false 
    }

    closeSession(req, res){
        try{
        req.session.destroy(err =>{
                if(err) {
                console.error(err)
                return res.json({mensaje: 'Error al cerra la sesion'})
                }
            })
        res.clearCookie('connect.sid')
        }catch(err){

            return {err}

        }
    }
}