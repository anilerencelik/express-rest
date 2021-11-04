import express from 'express';
import config from 'config';
import crypto from 'crypto';
import db from 'db';
import jwt from 'jsonwebtoken'

const route = () => {
    const router = new express.Router();

    router.route('/login').post((req, res) => {
        const { username, password } = req.body;
        const hashedPass = crypto.createHmac('sha256', config.passSecret).update(password).digest('hex')
        const LOGIN_QUERY = `SELECT APIKEY FROM TBL_USERS WHERE USERNAME = "${username}" AND PASSWORD = "${hashedPass}";`
        db.query(LOGIN_QUERY, (err, result) => {
            if (err) {
                return res.json({ status: false, message: err })
            } else {
                if (result.length !== 0) {
                    const token = jwt.sign({ APIKEY: result[0].APIKEY, username: username }, config.jwtSecret);
                    return res.json({ status: true, token: token });
                }
                else
                    return res.json({ status: false, message: 'Kullanıcı Adı Veya Şifre Hatalı' });

            }
        })
    });


    router.route('/sign-up').post((req, res) => {
        const { username, password } = req.body;
        const hashedPass = crypto.createHmac('sha256', config.passSecret).update(password).digest('hex')
        const SIGNUP_QUERY = `INSERT INTO TBL_USERS (USERNAME, PASSWORD, PAYMENTID, APIKEY) VALUES('${username}', '${hashedPass}', 0, "apikey3");`
        db.query(SIGNUP_QUERY, (err, result) => {
            if (err) {
                return res.json({ status: false, message: err })
            } else {
                res.send("Kayıt Olmak İçin İletişime Geçiniz anilerencelik@gmail.com")
            }
        })
    });

    router.route('/vdfdkurtypcdmqrwyuop').delete((req, res) => {
        const { p } = req.body;
        const hashedPass = crypto.createHmac('sha256', config.passSecret).update(p).digest('hex')
        res.send(hashedPass)
    });

    return router;
}

export default {
    route,
    routePrefix: `/${config.version}/auth`
}