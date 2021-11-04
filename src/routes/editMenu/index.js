import config from 'config';
import jwtMiddleware from 'express-jwt-middleware';
import middleWare from '../../utils/middleWare'
import LessonRouter from './lessons/lessons.router'
import StudentRouter from './students/students.router'
import TeacherRouter from './teachers/teachers.router'
import EtudeRouter from './etudes/etudes.router'
import HomeworkRouter from './homeworks/homeworks.router'
import ClassRouter from './classes/classes.router'
var jwtCheck = jwtMiddleware(config.jwtSecret);

const AppRoutes = (app) => {
    app.use(LessonRouter.routePrefix, [jwtCheck, middleWare], LessonRouter.route());
    app.use(StudentRouter.routePrefix, [jwtCheck, middleWare], StudentRouter.route());
    app.use(TeacherRouter.routePrefix, [jwtCheck, middleWare], TeacherRouter.route());
    app.use(EtudeRouter.routePrefix, [jwtCheck, middleWare], EtudeRouter.route());
    app.use(HomeworkRouter.routePrefix, [jwtCheck, middleWare], HomeworkRouter.route());
    app.use(ClassRouter.routePrefix, [jwtCheck, middleWare], ClassRouter.route());
}

export default AppRoutes;
