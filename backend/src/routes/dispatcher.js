import { loginRouter } from './sessions-routes/loginRoute.js'
import { registerRouter } from './sessions-routes/registerRoute.js'
import { logoutRouter } from './sessions-routes/logoutRouter.js'
import { changePassRouter } from './sessions-routes/changePassRouter.js'
import { homeRouter } from './sessions-routes/homeRouter.js'
import { passResetRouter } from './sessions-routes/passResetRouter.js';

export {
    loginRouter,
    registerRouter,
    logoutRouter,
    changePassRouter,
    homeRouter,
    passResetRouter
}