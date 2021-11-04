import express from 'express';
import config from 'config';
import db from 'db';

const route = () => {
    const router = new express.Router();

    router.route('/homework').post((req, res) => {
        const { homeworkid } = req.body
        const GET_REPORT =
            `
            SELECT NAME, TEACHERNAME, DEADLINE, LESSONNAME FROM TBL_HOMEWORKS AS T1, TBL_TEACHERS AS T2, TBL_LESSONS AS T3 WHERE T1.TEACHERID = T2.TEACHERID AND T2.LESSONID = T3.LESSONID AND HOMEWORKID = ${homeworkid};
            SELECT COUNT(*) AS ALLHW FROM TBL_HWCHECKLIST AS T1, TBL_STUDENTS AS T2, TBL_CLASSES AS T3 WHERE T1.STUDENTID = T2.STUDENTID AND T2.CLASSID = T3.CLASSID AND HOMEWORKID = ${homeworkid};
            SELECT COUNT(*) AS TRUEHW FROM TBL_HWCHECKLIST AS T1, TBL_STUDENTS AS T2, TBL_CLASSES AS T3 WHERE T1.STUDENTID = T2.STUDENTID AND T2.CLASSID = T3.CLASSID AND STATE = "Yapıldı" AND HOMEWORKID = ${homeworkid};
            `
        db.query(GET_REPORT, (err, results) => {
            if (err) {
                return res.json({ status: false, message: err });
            } else {
                return res.json({ status: true, data: results });

            }
        })
    });

    return router;
}

export default {
    route,
    routePrefix: `/${config.version}/reports`
}