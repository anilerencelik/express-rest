import config from 'config';
import jwtMiddleware from 'express-jwt-middleware';
import middleWare from '../../utils/middleWare'
import UERouter from './etude/update.etude.router'
import UHRouter from './homework/update.homework.router'


var jwtCheck = jwtMiddleware(config.jwtSecret);

const AppRoutes = (app) => {
    app.use(UERouter.routePrefix, [jwtCheck, middleWare], UERouter.route());
    app.use(UHRouter.routePrefix, [jwtCheck, middleWare], UHRouter.route());
}

export default AppRoutes;
