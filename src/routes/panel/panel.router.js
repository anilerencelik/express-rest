import express from 'express';
import config from 'config';
import db from 'db';

const route = () => {
    const router = new express.Router();

    router.route('/etude').get((req, res) => {
        const SELECT_LAST_5_ETUDE = "SELECT ETUDEID, TEACHERNAME, STUDENTNAME, DATE, TIME FROM TBL_ETUDES AS T1, TBL_TEACHERS AS T2, TBL_STUDENTS AS T3 WHERE T1.TEACHERID = T2.TEACHERID AND T1.STUDENTID = T3.STUDENTID ORDER BY ETUDEID DESC LIMIT 5;"
        db.query(SELECT_LAST_5_ETUDE, (err, results) => {
            if (err) {
                return res.json({ status: false, message: err });
            } else {
                return res.json({ status: true, data: results });
            }
        })
    });

    router.route('/homework').get((req, res) => {
        const SELECT_LAST_5_HOMEWORK = "SELECT HOMEWORKID, NAME, TEACHERNAME, DEADLINE FROM TBL_HOMEWORKS AS T1, TBL_TEACHERS AS T2 WHERE T1.TEACHERID = T2.TEACHERID ORDER BY HOMEWORKID DESC LIMIT 5;"
        db.query(SELECT_LAST_5_HOMEWORK, (err, results) => {
            if (err) {
                return res.json({ status: false, message: err });
            } else {
                return res.json({ status: true, data: results });
            }
        })
    });

    router.route('/report').get((req, res) => {
        const SELECT_REPORTS =
            `
            SELECT COUNT(*) AS NUMBER FROM TBL_STUDENTS;
            SELECT COUNT(*) AS NUMBER FROM TBL_TEACHERS;
            SELECT COUNT(*) AS NUMBER FROM TBL_CLASSES;
            SELECT COUNT(*) AS NUMBER FROM TBL_ETUDES;
            SELECT COUNT(*) AS NUMBER FROM TBL_HOMEWORKS;
            SELECT COUNT(*) AS NUMBER FROM TBL_LESSONS;
            `
        db.query(SELECT_REPORTS, (err, results) => {
            if (err) {
                return res.json({ status: false, message: err });
            } else {
                return res.json({ status: true, data: results });
            }
        })
    })

    return router;
}

export default {
    route,
    routePrefix: `/${config.version}/panel`
}