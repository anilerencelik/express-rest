import config from 'config';
import jwtMiddleware from 'express-jwt-middleware';
import middleWare from '../../utils/middleWare'
import StudentRouter from './student/reports.router'
import TeacherRouter from './teacher/reports.router'
import HomeworkRouter from './homework/reports.router'
import ClassRouter from './class/reports.router'


var jwtCheck = jwtMiddleware(config.jwtSecret);

const AppRoutes = (app) => {
    app.use(StudentRouter.routePrefix, [jwtCheck, middleWare], StudentRouter.route());
    app.use(TeacherRouter.routePrefix, [jwtCheck, middleWare], TeacherRouter.route());
    app.use(HomeworkRouter.routePrefix, [jwtCheck, middleWare], HomeworkRouter.route());
    app.use(ClassRouter.routePrefix, [jwtCheck, middleWare], ClassRouter.route());
}

export default AppRoutes;
