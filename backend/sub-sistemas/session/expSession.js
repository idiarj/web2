import session from 'express-session'

export class SessionWrapper{
    constructor(config){
        this.config = config
        this.session = session(this.config)
    }

    getSession(){

        return this.session

    }

async createSession({req, user}){
    try{       
        const {session} = req;
        console.log(user)
        for(let key in user){
            session[key] = user[key];
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
        }catch(error){
            console.log(error)
            return {error}
        }
}

    verifySession(req){
        return req.session && req.session.username ? true : false 
    }

   async closeSession(req, res) {
    try {
        await new Promise((resolve, reject) => {
            req.session.destroy(err => {
                if (err) {
                    console.error(err);
                    reject(new Error('Error al cerrar la sesión'));
                } else {
                    resolve();
                }
            });
        });
        res.clearCookie('connect.sid');
        // Enviar una respuesta de éxito después de cerrar la sesión y limpiar la cookie
        return { mensaje: 'Sesión cerrada con éxito' };
    } catch (err) {
        console.error(err);
        // Return the error message instead of sending a response
        return { mensaje: err.message };
    }
  }
}