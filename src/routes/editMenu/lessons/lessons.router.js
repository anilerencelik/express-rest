import express from 'express';
import config from 'config';
import db from 'db';

const route = () => {
    const router = new express.Router();

    router.route('/').get((req, res) => {
        const SELECT_LESSONS_QUERY = "SELECT * FROM TBL_LESSONS;";
        db.query(SELECT_LESSONS_QUERY, (err, results) => {
            if (err) {
                return res.json({ status: false, message: err });
            } else {
                return res.json({ status: true, data: results });

            }
        })
    });

    router.route('/').post((req, res) => {
        const { name } = req.body
        const INSERT_LESSON = `INSERT INTO TBL_LESSONS (LESSONNAME) VALUES('${name}');`;
        db.query(INSERT_LESSON, (err, results) => {
            if (err) {
                return res.json({ status: false, message: err });
            } else {
                return res.json({ status: true, data: "Ders başarı ile eklendi" });

            }
        })
    });

    router.route('/:id').delete((req, res) => {
        const id = req.params.id
        if (id == "") {
            res.send("lessonid is null")
        } else {
            const DELETE_LESSON = `DELETE FROM TBL_LESSONS WHERE LESSONID=${id};`;
            db.query(DELETE_LESSON, (err, results) => {
                if (err) {
                    return res.json({ status: false, message: err });
                } else {
                    return res.json({ status: true, data: "Ders başarı ile çıkarıldı" });

                }
            })
        }
    });

    return router;
}

export default {
    route,
    routePrefix: `/${config.version}/lessons`
}