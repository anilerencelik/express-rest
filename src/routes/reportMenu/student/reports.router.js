import express from 'express';
import config from 'config';
import db from 'db';

const route = () => {
    const router = new express.Router();

    router.route('/').post((req, res) => {
        const { studentid } = req.body
        const GET_REPORT =
            `
            SELECT SCHOOLNO, STUDENTNAME, CLASSNAME, PARENTTELNO FROM TBL_STUDENTS AS T1, TBL_CLASSES AS T2 WHERE T1.CLASSID = T2.CLASSID AND T1.STUDENTID = ${studentid};
            SELECT COUNT(ETUDEID) AS YAPILANETUT FROM TBL_ETUDES WHERE STUDENTID = ${studentid} AND STATE = "Yapıldı";
            SELECT COUNT(ETUDEID) AS YAPILMAYANETUT FROM TBL_ETUDES WHERE STUDENTID = ${studentid} AND STATE = "Yapılmadı";
            SELECT COUNT(HOMEWORKID) AS YAPILANODEV FROM TBL_HWCHECKLIST WHERE STUDENTID = ${studentid} AND STATE = "Yapıldı";
            SELECT COUNT(HOMEWORKID) AS YAPILMAYANODEV FROM TBL_HWCHECKLIST WHERE STUDENTID = ${studentid} AND STATE = "Yapılmadı";
            CALL etudesuccess(${studentid});
            CALL homeworksuccess(${studentid});
            `
        db.query(GET_REPORT, (err, results) => {
            if (err) {
                return res.json({ status: false, message: err });
            } else {
                return res.json({ status: true, data: results });

            }
        })
    });

    router.route('/student').post((req, res) => {
        const { schoolNo } = req.body
        const SELECT_STUDENTID = `SELECT STUDENTID FROM TBL_STUDENTS WHERE SCHOOLNO = ${schoolNo};`
        db.query(SELECT_STUDENTID, (err, results) => {
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
