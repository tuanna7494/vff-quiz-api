const jwt = require("jsonwebtoken");
const Boom = require("@hapi/boom");

require('dotenv').config();
const privateKey = process.env.APP_PRIVATE_KEY;

module.exports = function (req, res, next) {
    const token = req.header('Token');
    if (!token) 
        return res.status(401).json({ 
            status: 0,
            message: "Auth Error" 
        });
    try {
        const decoded = jwt.verify(token, privateKey);
        if (decoded.userAuth) {
            res.locals.authUser = decoded.userAuth;
            next();
            return;
        }
        return res.status(401).json({ 
            status: 0,
            message: "Auth Error" 
        });

    } catch (e) {
        res.status(500).send({
            status: 0,
            message: e.message 
        });
    }
}