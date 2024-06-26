import Pool from 'pg-pool'
import { instancePG } from '../data/psql-data/iPgManager.js'
import { userModel } from '../models/userModel.js'

const pool = new Pool({
    "user": "postgres",
    "host": "localhost",
    "database": "pruebaweb2",
    "password": "16012004",
    "port": 5432
})

const insertP = 'insert into persona (nombre_persona, apellido_persona) values ($1, $2) returning id_persona'
const insertU = 'insert into usuario (nombre_usu, correo_usu, contra_usu, id_persona) values ($1, $2, $3, $4)'
const paramQi = ['Juan', 'Perez']
const query = `SELECT p.id_persona as id, nombre_persona || ' ' || apellido_persona as persona, nombre_usu as usuario FROM persona p
INNER JOIN usuario u ON p.id_persona = u.id_persona`

const user1 = {
    nombre: 'Jose',
    apellido: 'Burgos',
    nombre_usu: 'Burgosz',
    correo: 'joseburgos@gmail.com',
    password: 'nathaly2003'
}

const getConn = async ()=>{
    return await pool.connect()
}

const registerUser = async (params) =>{
    const {nombre, apellido} = params
    const {nombre_usu, correo, password} = params
    console.log(params)
    const client = await getConn();
    try{
        // const cnn = await getConn()
        client.query('BEGIN')
        console.log(`insertando persona ${nombre} ${apellido}`)
        const resultQ = await client.query(insertP, [nombre ,apellido])
        const id = resultQ.rows[0].id_persona
        console.log(`insertando usuario ${nombre_usu}`)
        await client.query(insertU, [nombre_usu, correo, password, id])
        client.query('COMMIT')
    }catch(err){
        client.query('ROLLBACK')
        console.log(err.message)
    }finally{
        client.release()
    }
}

const user = 'Idiarj'

// const verify = await userModel.verifyUser({user})
// console.log(verify)
const user2 = {
    "nombre": "Alexandra",
    "apellido": "Rodriguez",
    "username": "alesitaa",
    "correo": "correodealexandra@gmail.com",
    "password": "pelinegraloca2005"
}


await userModel.registerUser(user2)

// console.log(instancePG.querys['select'])


// // const cnn = await getConn()
// const resultQ = await pool.query(query)
// // console.log(resultQ)
// console.log(resultQ.rows)
// // cnn.release()

// await registerUser(user1)


