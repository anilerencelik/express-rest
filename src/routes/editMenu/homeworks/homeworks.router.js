import express from 'express';
import config from 'config';
import db from 'db'

const route = () => {
    const router = new express.Router();

    router.route('/').get((req, res) => {
        const SELECT_HOMEWORKS_QUERY = "SELECT HOMEWORKID, NAME, TEACHERNAME, DEADLINE FROM TBL_HOMEWORKS T1, TBL_TEACHERS T2 WHERE T1.TEACHERID=T2.TEACHERID;"
        db.query(SELECT_HOMEWORKS_QUERY, (err, results) => {
            if (err) {
                return res.json({ status: false, message: err });
            } else {
                return res.json({ status: true, data: results });

            }
        })
    });

    router.route('/').post((req, res) => {
        const { name, teacherid, deadline } = req.body
        const INSERT_HOMEWORK = `INSERT INTO TBL_HOMEWORKS (TEACHERID, NAME, DEADLINE) VALUES(${teacherid}, '${name}', '${deadline}');`
        db.query(INSERT_HOMEWORK, (err, results) => {
            if (err) {
                return res.json({ status: false, message: err });
            } else {
                return res.json({ status: true, data: results });

            }
        })
    });

    router.route('/:id').delete((req, res) => {
        const id = req.params.id
        if (id == "") {
            res.send("etudeid is null")
        } else {
            const DELETE_HOMEWORK = `DELETE FROM TBL_HOMEWORKS WHERE HOMEWORKID=${id};DELETE FROM TBL_HW2CLASS WHERE HOMEWORKID=${id};`
            db.query(DELETE_HOMEWORK, (err, results) => {
                if (err) {
                    return res.json({ status: false, message: err });
                } else {
                    return res.json({ status: true, data: "Ödev başarı ile çıkarıldı" });

                }
            })
        }
    });

    router.route('/:id').post((req, res) => {
        //id is homeworkid
        const id = req.params.id
        const { classid } = req.body
        const INSERT_HW2CLASS = `INSERT INTO TBL_HW2CLASS (HOMEWORKID, CLASSID) VALUES(${id}, ${classid});`
        db.query(INSERT_HW2CLASS, (err, results) => {
            if (err) {
                return res.json({ status: false, message: err });
            } else {
                return res.json({ status: true, data: results });

            }
        })
    });

    router.route('/last').get((req, res) => {
        const SELECT_LAST_HWID_QUERY = `SELECT HOMEWORKID FROM TBL_HOMEWORKS ORDER BY HOMEWORKID DESC LIMIT 1;`
        db.query(SELECT_LAST_HWID_QUERY, (err, results) => {
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

    router.route('/').put((req, res) => {
        const { id } = req.body
        const SELECT_UPDATE_HOMEWORKS = `SELECT T1.STUDENTID, STATE, SCHOOLNO, STUDENTNAME, CLASSNAME, ${id} as HOMEWORKID FROM TBL_HWCHECKLIST AS T1, TBL_STUDENTS AS T2, TBL_CLASSES AS T3 WHERE HOMEWORKID = ${id} AND T1.STUDENTID = T2.STUDENTID AND T2.CLASSID = T3.CLASSID;`
        db.query(SELECT_UPDATE_HOMEWORKS, (err, results) => {
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
    routePrefix: `/${config.version}/homeworks`
}
