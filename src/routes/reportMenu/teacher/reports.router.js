import express from 'express';
import config from 'config';
import db from 'db';

const route = () => {
    const router = new express.Router();

    router.route('/teacher').post((req, res) => {
        const { teacherid } = req.body
        const GET_REPORT =
            `
            SELECT TEACHERNAME, LESSONNAME, TELNUMBER FROM TBL_TEACHERS AS T1, TBL_LESSONS AS T2 WHERE T1.LESSONID = T2.LESSONID AND TEACHERID = ${teacherid};
            SELECT COUNT(ETUDEID) AS TEACHERETUDE FROM TBL_ETUDES WHERE TEACHERID = ${teacherid};
            SELECT COUNT(ETUDEID) AS ALLTEACHERETUDE FROM TBL_ETUDES;
            SELECT COUNT(HOMEWORKID) AS TEACHERHW FROM TBL_HOMEWORKS WHERE TEACHERID = ${teacherid};
            SELECT COUNT(HOMEWORKID) AS ALLTEACHERHW FROM TBL_HOMEWORKS;
            SELECT COUNT(*) AS TRUEHW FROM TBL_HOMEWORKS AS T1, TBL_HWCHECKLIST AS T2 WHERE STATE ="Yapıldı" AND T1.HOMEWORKID = T2.HOMEWORKID AND TEACHERID = ${teacherid} ; 
            SELECT COUNT(*) AS ALLHW FROM TBL_HOMEWORKS AS T1, TBL_HWCHECKLIST AS T2 WHERE T1.HOMEWORKID = T2.HOMEWORKID AND TEACHERID = ${teacherid} ;
            SELECT COUNT(*) AS YAPILANTEACHERETUDE FROM TBL_ETUDES WHERE STATE = "Yapıldı" AND TEACHERID = ${teacherid} ;
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