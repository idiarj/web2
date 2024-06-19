// import { instancePG } from '../data/psql-data/iPgManager.js'
// import { v4 as uuidv4 } from 'uuid'
import express from 'express'
import cors from 'cors'
import { loginRouter, registerRouter, logoutRouter, changePassRouter, homeRouter } from '../src/routes/dispatcher.js'
import { instanceSess } from '../data/iSession/iSession.js'
import users from '../data/json-data/users.json' assert { type: "json" }
import { isAuthMiddleware } from '../src/middlewares/isAuthMiddleware.js'

const app = express()

const PORT = 3000



app.use(cors())
app.use(instanceSess.getSession())
app.use(express.json())


app.get('/users', (req, res)=>{
    res.json(users)
})


app.use('/home', isAuthMiddleware, homeRouter)


app.use('/register', registerRouter)

app.use('/login', loginRouter)

app.use('/logout', logoutRouter)

app.use('/changePassword', changePassRouter)


app.listen(PORT, ()=>{
    console.log(`servidor escuchando en http://localhost:${PORT}`)
})




