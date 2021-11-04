import express from 'express';
import config from 'config';
import db from 'db';

const route = () => {
    const router = new express.Router();

    
    router.route('/:id').post((req, res) => {
        //id is homeworkid
        const id = req.params.id
        const SELECT_UPDATE_HOMEWORKS = `SELECT T1.STUDENTID, STATE, SCHOOLNO, STUDENTNAME, CLASSNAME, ${id} as HOMEWORKID FROM TBL_HWCHECKLIST AS T1, TBL_STUDENTS AS T2, TBL_CLASSES AS T3 WHERE HOMEWORKID = ${id} AND T1.STUDENTID = T2.STUDENTID AND T2.CLASSID = T3.CLASSID;`
        db.query(SELECT_UPDATE_HOMEWORKS, (err, results) => {
            if (err) {
                return res.json({ status: false, message: err });
            } else {
                return res.json({ status: true, data: results });

            }
        })
    });

    router.route('/:id').put((req, res) => {
        //id is homeworkid
        const id = req.params.id
        const { studentid, nextState } = req.body
        const CHANGE_STATE_HOMEWORK = `UPDATE TBL_HWCHECKLIST SET STATE = '${nextState}' WHERE HOMEWORKID = ${id} AND STUDENTID = ${studentid};`
        db.query(CHANGE_STATE_HOMEWORK, (err, results) => {
            if (err) {
                return res.json({ status: false, message: err });
            } else {
                return res.json({ status: true, data: "Ödev durumu başarı ile değiştirildi" });

            }
        })
    });
    
    return router;
}

export default {
    route,
    routePrefix: `/${config.version}/update/homework`
}