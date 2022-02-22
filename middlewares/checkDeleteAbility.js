
require('dotenv').config();
const quizzServices = require('../services/quizzServices');
module.exports = function (req, res, next) {
    const quizId = req.params.id;
    const userAuth = res.locals.authUser;

    quizzServices.getQuizzes({
        _id: quizId
    }).then(quizzes => {
        if (quizzes.length > 0) {
            const quizz = quizzes[0];
            if (quizz.user._id == userAuth._id) {
                return next();
            }

            if (userAuth.role == 'admin') {
                return next();
            }

            return res.status(403).send({
                status: 0,
                message: "You don't have permission to access this resource"
            });
            
        } else {
            return res.status(404).send({
                status: 0,
                message: "Quizz not found"
            });
        }
    })
    .catch(err => {
        return res.status(500).send({
            status: 0,
            message: err.message
        });
    })
}