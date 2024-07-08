export class homeController{

    static async homeController(req, res){
        return res.json({mensaje: `Bienvenido, ${req.session.username}`, user: req.session.username})
    }
}