
import PgHandler from '../../components/pgHandler.js'
import config from './config.json' assert {type: 'json'}
import querys from './querys.json' assert {type: 'json'}


// const key = 'select'
// console.log(querys[key])
export const instancePG = new PgHandler({config, querys})

