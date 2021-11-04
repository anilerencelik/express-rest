import express from 'express';
import config from 'config';
import db from 'db';

const route = () => {
    const router = new express.Router();

    router.route('/').get((req, res) => {
        const SELECT_ETUDES_QUERY = "SELECT ETUDEID, TEACHERNAME, STUDENTNAME, SCHOOLNO, DATE, TIME, STATE FROM TBL_ETUDES T1, TBL_TEACHERS T2, TBL_STUDENTS T3 WHERE T1.TEACHERID=T2.TEACHERID AND T1.STUDENTID=T3.STUDENTID;";
        db.query(SELECT_ETUDES_QUERY, (err, results) => {
            if (err) {
                return res.json({ status: false, message: err });
            } else {
                return res.json({ status: true, data: results });

            }
        })
    });

    router.route('/').post((req, res) => {
        const { teacherid, studentid, date, time } = req.body
        const INSERT_ETUDE = `INSERT INTO TBL_ETUDES (TEACHERID, STUDENTID, DATE, TIME) VALUES('${teacherid}', ${studentid}, '${date}', '${time}');`
        db.query(INSERT_ETUDE, (err, results) => {
            if (err) {
                return res.json({ status: false, message: err });
            } else {
                return res.json({ status: true, data: "Birebir başarı ile eklendi" });

            }
        })
    });

    router.route('/:id').delete((req, res) => {
        const id = req.params.id
        if (id == "") {
            res.send("etudeid is null")
        } else {
            const DELETE_ETUDE = `DELETE FROM TBL_ETUDES WHERE ETUDEID=${id};`;
            db.query(DELETE_ETUDE, (err, results) => {
                if (err) {
                    return res.json({ status: false, message: err });
                } else {
                    return res.json({ status: true, data: "Birebir başarı ile çıkarıldı" });

                }
            })
        }
    });

    router.route('/:id').get((req, res) => {
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
    });

    router.route('/:id').put((req, res) => {
        const id = req.params.id
        const { nextState } = req.body
        if (id == "") {
            res.send("etudeid is null")
        } else {
            const CHANGE_STATE_ETUDE = `UPDATE TBL_ETUDES SET STATE = '${nextState}' WHERE ETUDEID = ${id};`
            db.query(CHANGE_STATE_ETUDE, (err, results) => {
                if (err) {
                    return res.json({ status: false, message: err });
                } else {
                    return res.json({ status: true, data: "Birebir durumu başarı ile değiştirildi" });

                }
            })
        }
    });


    return router;
}

export default {
    route,
    routePrefix: `/${config.version}/etudes`
}