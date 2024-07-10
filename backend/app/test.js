import { iPgHandler } from "../data/psql-data/iPgManager.js";

const result = await iPgHandler.exeQuery({key: 'project_info'})
console.log(result)
console.log(result.length)

let project_members = result.map((element)=>{
    return element.persona
})

console.log(project_members)