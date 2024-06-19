import users from '../data/json-data/users.json' assert { type: "json" }
import { CryptManager } from '../sub-sistemas/security/CryptManager.js'

export async function validateUser(user, pass){
    console.log(users)
    console.log(`usuario que recibi por parametro: ${user}, password que recibi por parametro: ${pass} `)
    for (const u of users) {
        const validPass = await CryptManager.compareData({toCompare: pass, hashedData: u.password})
        if(u.user === user && validPass){
            return u;
        }
    }
    return null;
}
