import { iPgHandler } from "../data/psql-data/iPgManager.js";
import { userModel } from "../models/userModel.js";

// const result = await iPgHandler.exeQuery({key: 'project_info'})
// console.log(result)
// console.log(result.length)

// let project_members = result.map((element)=>{
//     return element.persona
// })

// console.log(project_members)

const id = await userModel.getUsernameId({user: 'Idiarj'})
console.log(id)
