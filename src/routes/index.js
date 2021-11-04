import config from 'config';
import jwtMiddleware from 'express-jwt-middleware';
import middleWare from '../utils/middleWare'
import authMiddleWare from '../utils/authMiddleWare'
import AuthRouter from './auth/auth.router';
import EditMenuRouter  from './editMenu/'
import ReportMenuRouter  from './reportMenu/'
import PanelRouter  from './panel/panel.router'
import UpdateMenuRouter from './updateMenu/'
var jwtCheck = jwtMiddleware(config.jwtSecret);

const AppRoutes = (app) => {
    app.use(AuthRouter.routePrefix, authMiddleWare, AuthRouter.route());
    EditMenuRouter(app)
    ReportMenuRouter(app)
    UpdateMenuRouter(app)
    app.use(PanelRouter.routePrefix, [jwtCheck, middleWare], PanelRouter.route());

}

export default AppRoutes;
