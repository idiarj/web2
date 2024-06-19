
import { PgHandler } from '../../sub-sistemas/DB/pgHandler.js'
import config from '../../config/db-config.json' assert {type: 'json'}
import querys from './querys.json' assert {type: 'json'}


// const key = 'select'
// console.log(querys[key])
export const instancePG = new PgHandler({config, querys})

