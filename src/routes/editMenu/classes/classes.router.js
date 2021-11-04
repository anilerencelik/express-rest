import express from 'express';
import config from 'config';
import db from 'db';

const route = () => {
    const router = new express.Router();

    router.route('/').get((req, res) => {
        const SELECT_CLASSES_QUERY = "SELECT * FROM TBL_CLASSES;"
        db.query(SELECT_CLASSES_QUERY, (err, results) => {
            if (err) {
                return res.json({ status: false, message: err });
            } else {
                return res.json({ status: true, data: results });

            }
        })
    });

    router.route('/').post((req, res) => {
        const { name } = req.body
        const INSERT_CLASS = `INSERT INTO TBL_CLASSES (CLASSNAME) VALUES('${name}');`
        db.query(INSERT_CLASS, (err, results) => {
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
            res.send("classid is null")
        } else {
            const DELETE_CLASS = `DELETE FROM TBL_CLASSES WHERE CLASSID=${id};DELETE FROM TBL_CLASS2LESSON WHERE CLASSID=${id};`
            db.query(DELETE_CLASS, (err, results) => {
                if (err) {
                    return res.json({ status: false, message: err });
                } else {
                    return res.json({ status: true, data: "Sınıf başarı ile çıkarıldı" });

                }
            })
        }
    });

    router.route('/:id').post((req, res) => {
        //id is classid
        const id = req.params.id
        const { lessonid } = req.body
        const INSERT_CLASS2LESSON = `INSERT INTO TBL_CLASS2LESSON (CLASSID, LESSONID) VALUES(${id}, ${lessonid});`
        db.query(INSERT_CLASS2LESSON, (err, results) => {
            if (err) {
                return res.json({ status: false, message: err });
            } else {
                return res.json({ status: true, data: results });

            }
        })
    });

    router.route('/last').get((req, res) => {
        const SELECT_LAST_CLASSID_QUERY = `SELECT CLASSID FROM TBL_CLASSES ORDER BY CLASSID DESC LIMIT 1;`
        db.query(SELECT_LAST_CLASSID_QUERY, (err, results) => {
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
    routePrefix: `/${config.version}/classes`
}
