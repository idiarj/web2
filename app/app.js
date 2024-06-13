import  CryptManager  from '../components/CryptManager.js'
import { instancePG } from '../data/psql-data/iPgManager.js'
import express from 'express'

const app = express()

const PORT = 3000

app.get('/', (req, res)=>{
    res.send('<h1>Holi</h1>')
})

app.listen(PORT, ()=>{
    console.log(`servidor corriendo en http://localhost:${PORT}`)
})

// const data = '16012004'

// let hashedData = await CryptManager.encriptarData({data})
// console.log(await CryptManager.compareData({toCompare: data, hashedData}))
// console.log(hashedData)
// console.log(data)
// const key = 'where'
// const params = [1]
// const [result] = await instancePG.exeQuery({key, params })
// console.log(result.nombre_per + result.apellido_per)
// instancePG.releaseConn()

