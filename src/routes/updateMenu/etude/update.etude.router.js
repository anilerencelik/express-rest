import express from 'express';
import config from 'config';
import db from 'db';

const route = () => {
    const router = new express.Router();

    
    router.route('/:id').post((req, res) => {
        //id is teacherid
        const id = req.params.id
        const { date } = req.body
        const SELECT_UPDATE_ETUDES = `SELECT ETUDEID, STUDENTNAME, DATE, TIME, STATE, ${id} as TEACHERID, CLASSNAME, SCHOOLNO FROM TBL_ETUDES AS T1, TBL_STUDENTS AS T2, TBL_CLASSES AS T3 WHERE T1.STUDENTID = T2.STUDENTID AND DATE = '${date}' AND TEACHERID = ${id} AND T3.CLASSID = T2.STUDENTID;`
        db.query(SELECT_UPDATE_ETUDES, (err, results) => {
            if (err) {
                return res.json({ status: false, message: err });
            } else {
                return res.json({ status: true, data: results });

            }
        })
    })

    router.route('/:id').put((req, res) => {
        //id is etudeid
        const id = req.params.id
        const { nextState } = req.body
        const CHANGE_STATE_ETUDE = `UPDATE TBL_ETUDES SET STATE = '${nextState}' WHERE ETUDEID = ${id};`
        db.query(CHANGE_STATE_ETUDE, (err, results) => {
            if (err) {
                return res.json({ status: false, message: err });
            } else {
                return res.json({ status: true, data: "Birebir durumu başarı ile değiştirildi" });

            }
        })
    })

    return router;
}

export default {
    route,
    routePrefix: `/${config.version}/update/etude`
}