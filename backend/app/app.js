// import { iPgHandler } from '../data/psql-data/iPgManager.js'
// import { v4 as uuidv4 } from 'uuid'
// import users from '../data/json-data/users.json' assert { type: "json" }
import express from 'express'
import cors from 'cors'
import cors_config from '../config/cors-config.json'  assert {type: 'json'}
import { loginRouter, registerRouter, logoutRouter, changePassRouter, homeRouter, passResetRouter, ProyectosRouter, profilesRouter, recursosRouter, ActividadesRouter } from '../src/routes/dispatcher.js'
import { SessionHandler } from '../data/iSession/iSession.js'
import { iPgHandler } from '../data/psql-data/iPgManager.js'
import { isAuthMiddleware } from '../src/middlewares/isAuthMiddleware.js'


const app = express()

app.use(cors(cors_config));
app.use(SessionHandler.getSession())
app.use(express.json())


// app.get('/users', (req, res)=>{
//     res.json(users)
// })


app.use('/home', isAuthMiddleware, homeRouter)
app.use('/recursos', recursosRouter)

app.use('/profiles', profilesRouter)

app.use('/register', registerRouter)

app.use('/login', loginRouter)

app.use('/logout', logoutRouter)

app.use('/changePassword', changePassRouter)

app.use('/forgot-password',passResetRouter);

app.use('/projects', ProyectosRouter)

app.use('/actividades', ActividadesRouter)

app.get('/status', async (req, res)=>{
    try {
        const key = 'getEstados'
        const resultSet = await iPgHandler.exeQuery({key})
        const status = resultSet.map(s => s.status)
        return res.status(200).json({status})
    } catch (error) {
        return res.status(500).json({error})
    }

})

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`servidor escuchando en http://localhost:${PORT}`)
});




