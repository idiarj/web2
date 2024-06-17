// import  CryptManager  from '../components/CryptManager.js'
// import { instancePG } from '../data/psql-data/iPgManager.js'
import { v4 as uuidv4 } from 'uuid'
import express from 'express'
import users from '../data/json-data/users.json' assert { type: "json" }
import { instanceSess } from '../data/iSession/iSession.js'


const app = express()

const PORT = 3000

function validateUser(user, pass){
    return users.find(u =>  u.user === user && u.password === pass)
}


app.use(instanceSess.getSession())
app.use(express.json())


// console.log(users)

// app.get('/', (req, res)=>{
//     res.send('<form action="/login" method="post">' +
//     'Username: <input name="user"><br>' +
//     'Password: <input name="pass" type="password"><br>' +
//     '<input type="submit" text="Login"></form>')
// })

app.get('/users', (req, res)=>{
    res.json(users)
})

app.post('/register', (req, res)=>{
    if(req.session.user){
        return res.json({mensaje: 'Ya tienes una sesion iniciada, no puedes registrarte. Por favor cierra sesion para registrarte'})
     }else{
        const userExists = users.find(u => u.user === req.body.user)
        if(userExists){
            return res.json({error: 'El usuario ya existe'})
        }else{
            users.push({id: uuidv4(), ...req.body})
            return res.json({mensaje: 'Usuario registrado', data: users})
        }
     }

})

app.post('/users/login', (req, res)=>{
    const {user, password} = req.body
    const valid = validateUser(user, password)
    console.log(valid)
    if(valid){
        instanceSess.verifySession(req, res)
        return res.json({mensaje: 'Sesion iniciada', dataSess: req.session, dataBody: req.body})
    }
    res.json({error: 'Usuario o contraseña incorrectos'})
})

app.get('/users/login', (req, res)=>{
    if(req.session.user){
        const { id, user, password } = req.session
        console.log(id)
        return res.json({
            mensaje: 'Ya tienes una sesion iniciada',
            id,
            user,
            password
        })
    }else{
        res.json({ error: 'no hay ninguna sesion iniciada'})
    }
})

app.delete('/users/logout', (req, res)=>{ 
    if(req.session.user){
        instanceSess.closeSession(req)
        return res.json({mensaje: 'Sesion cerrada'})
    }else{
        res.json({error: 'No hay ninguna sesion iniciada'})
    }
}

)

app.patch('/users/changePass', (req, res)=>{
    const {newPass} = req.body
    console.log(newPass)
    if(req.session.user){
        users[0].password = newPass
        instanceSess.closeSession(req)
    }else{
        return res.json({error: 'No hay ninguna sesion iniciada, por favor inicia sesion para cambiar la contrasena'})
    }
})





app.listen(PORT, ()=>{
    console.log(`servidor escuchando en http://localhost:${PORT}`)
})




