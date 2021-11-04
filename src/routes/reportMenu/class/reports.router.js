import express from 'express';
import config from 'config';
import db from 'db';

const route = () => {
    const router = new express.Router();

    router.route('/class').post((req, res) => {
        const { classid } = req.body
        const GET_REPORT =
            `
            SELECT * FROM TBL_CLASSES WHERE CLASSID = ${classid};
            SELECT COUNT(*) AS HWNUMBER FROM TBL_HW2CLASS WHERE CLASSID = ${classid};
            SELECT COUNT(*) AS TRUEHW FROM TBL_STUDENTS AS T1, TBL_HWCHECKLIST AS T2 WHERE T1.STUDENTID = T2.STUDENTID AND STATE = "Yapıldı" AND CLASSID = ${classid};
            SELECT COUNT(*) AS ALLHWRECORD FROM TBL_STUDENTS AS T1, TBL_HWCHECKLIST AS T2 WHERE T1.STUDENTID = T2.STUDENTID AND CLASSID = ${classid};
            SELECT COUNT(*) AS TRUEETUDE FROM TBL_ETUDES AS T1, TBL_STUDENTS AS T2 WHERE T1.STUDENTID = T2.STUDENTID AND STATE = "Yapıldı" AND CLASSID = ${classid};
            SELECT COUNT(*) AS ALLETUDERECORD FROM TBL_ETUDES AS T1, TBL_STUDENTS AS T2 WHERE T1.STUDENTID = T2.STUDENTID AND CLASSID = ${classid};
            SELECT LESSONNAME FROM TBL_CLASS2LESSON AS T1, TBL_LESSONS AS T2 WHERE T1.LESSONID = T2.LESSONID AND CLASSID = ${classid}
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