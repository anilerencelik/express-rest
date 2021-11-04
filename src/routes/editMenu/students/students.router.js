import express from 'express';
import config from 'config';
import db from 'db';

const route = () => {
    const router = new express.Router();

    router.route('/').get((req, res) => {
        const SELECT_STUDENTS_WITH_CLASSNAME_QUERY = "SELECT STUDENTID, STUDENTNAME, SCHOOLNO, CLASSNAME, PARENTTELNO FROM TBL_STUDENTS T1, TBL_CLASSES T2 WHERE T1.CLASSID=T2.CLASSID;"
        db.query(SELECT_STUDENTS_WITH_CLASSNAME_QUERY, (err, results) => {
            if (err) {
                return res.json({ status: false, message: err });
            } else {
                return res.json({ status: true, data: results });

            }
        })
    });

    router.route('/names').get((req, res) => {
        const SELECT_STUDENTS_ONLYNAME_QUERY = "SELECT STUDENTID, STUDENTNAME FROM TBL_STUDENTS;"
        db.query(SELECT_STUDENTS_ONLYNAME_QUERY, (err, results) => {
            if (err) {
                return res.json({ status: false, message: err });
            } else {
                return res.json({ status: true, data: results });
            }
        })
    });

    router.route('/').post((req, res) => {
        const { name, no, tel, classid } = req.body
        const INSERT_STUDENT = `INSERT INTO TBL_STUDENTS (SCHOOLNO, STUDENTNAME, CLASSID, PARENTTELNO) VALUES(${no}, '${name}', ${classid}, '${tel}');`
        db.query(INSERT_STUDENT, (err, results) => {
            if (err) {
                return res.json({ status: false, message: err });
            } else {
                return res.json({ status: true, data: "Öğrenci başarı ile eklendi" });

            }
        })
    });

    router.route('/:id').delete((req, res) => {
        const id = req.params.id
        if (id == "") {
            res.send("studentid is null")
        } else {
            const DELETE_STUDENT = `DELETE FROM TBL_STUDENTS WHERE STUDENTID=${id};`;
            db.query(DELETE_STUDENT, (err, results) => {
                if (err) {
                    return res.json({ status: false, message: err });
                } else {
                    return res.json({ status: true, data: "Öğrenci başarı ile çıkarıldı" });

                }
            })
        }
    });

    return router;
}

export default {
    route,
    routePrefix: `/${config.version}/students`
}