import express from 'express';
import config from 'config';
import db from 'db';

const route = () => {
    const router = new express.Router();

    router.route('/').get((req, res) => {
        const SELECT_TEACHERS_QUERY = "SELECT TEACHERID, TEACHERNAME, LESSONNAME, TELNUMBER FROM TBL_LESSONS AS T1, TBL_TEACHERS AS T2 WHERE T1.LESSONID = T2.LESSONID;"
        db.query(SELECT_TEACHERS_QUERY, (err, results) => {
            if (err) {
                return res.json({ status: false, message: err });
            } else {
                return res.json({ status: true, data: results });

            }
        })
    });

    router.route('/names').get((req, res) => {
        const SELECT_TEACHERS_ONLYNAME_QUERY = "SELECT TEACHERID, TEACHERNAME FROM TBL_TEACHERS;"
        db.query(SELECT_TEACHERS_ONLYNAME_QUERY, (err, results) => {
            if (err) {
                return res.json({ status: false, message: err });
            } else {
                return res.json({ status: true, data: results });
            }
        })
    });

    router.route('/').post((req, res) => {
        const { name, branch, tel } = req.body
        const INSERT_TEACHER = `INSERT INTO TBL_TEACHERS (TEACHERNAME, LESSONID, TELNUMBER) VALUES('${name}', ${branch}, '${tel}');`
        db.query(INSERT_TEACHER, (err, results) => {
            if (err) {
                return res.json({ status: false, message: err });
            } else {
                return res.json({ status: true, data: "Öğretmen başarı ile eklendi" });

            }
        })
    });

    router.route('/:id').delete((req, res) => {
        const id = req.params.id
        if (id == "") {
            res.send("teacherid is null")
        } else {
            const DELETE_TEACHER = `DELETE FROM TBL_TEACHERS WHERE TEACHERID=${id};`;
            db.query(DELETE_TEACHER, (err, results) => {
                if (err) {
                    return res.json({ status: false, message: err });
                } else {
                    return res.json({ status: true, data: "Öğretmen başarı ile çıkarıldı" });

                }
            })
        }
    });

    return router;
}

export default {
    route,
    routePrefix: `/${config.version}/teachers`
}