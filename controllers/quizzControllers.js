const { response } = require('express');
const quizzServices = require('../services/quizzServices');

module.exports = {
    create: async function(req, res) {
        const userAuth = res.locals.authUser;

        quizzServices.createQuizzByUserId(req.body, userAuth._id)
        .then(quizz => {
            return res.status(200).send({
                status: 1,
                data: quizz
            });
        })
        .catch(err => { 
            return res.status(500).send({
                status: 0,
                message: err.message
            });
        });
    },

    find: async function(req, res) {
        quizzServices.getQuizzes({})
        .then(quizzes => {
            return res.status(200).send({
                status: 1,
                data: quizzes
            });
        })
        .catch(err => { 
            return res.status(500).send({
                status: 0,
                message: err.message
            });
        }); 
    },

    findByUserId: async function(req, res) {
        const userAuth = res.locals.authUser;
        quizzServices.getQuizzes({
            user: userAuth._id
        })
        .then(quizzes => {
            return res.status(200).send({
                status: 1,
                data: quizzes
            });
        })
        .catch(err => { 
            return res.status(500).send({
                status: 0,
                message: err.message
            });
        }); 
    },
    findBySlug: function(req, res) {
        const resultId = req.query.result;

        if (resultId) {
            return quizzServices.getResultBySlug(req.params.id, resultId)
            .then(quizzes => {
                if (quizzes) {
                    return res.status(200).send({
                        status: 1,
                        data: quizzes
                    });
                } else {
                    return res.status(500).send({
                        status: 0,
                        data: []
                    });
                }
            })
            .catch(err => { 
                return res.status(500).send({
                    status: 0,
                    message: err.message,
                    data: []
                });
            }); 
            
        } else {
            return quizzServices.getQuizzes({
                slug: req.params.id,
            })
            .then(quizzes => {
                if (quizzes[0]) {
                    return res.status(200).send({
                        status: 1,
                        data: quizzes[0]
                    });
                } else {
                    return res.status(500).send({
                        status: 0,
                        data: [],
                    });
                }
            })
            .catch(err => { 
                return res.status(500).send({
                    status: 0,
                    data: [],
                    message: err.message,
                });
            }); 
        }
    },

    search: function(req, res) {
        const query = req.query;
        quizzServices.getQuizzes({
            title: { $regex: query.title, $options: 'i' }
        })
        .then(quizzes => {
            return res.status(200).send({
                status: 1,
                data: quizzes
            });
        })
        .catch(err => { 
            return res.status(500).send({
                status: 0,
                message: err.message
            });
        });
    },

    getOne: function(req, res) {
        const quizzId = req.params.id;
        quizzServices.getQuizzes({_id: quizzId})
        .then(quizzes => {
            if (quizzes.length > 0) {
                return res.status(200).send({
                    status: 1,
                    data: quizzes[0]
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
        });
    },

    update: async function(req, res) {
        const userAuth = res.locals.authUser;
        quizzServices.updateQuizzById(req.params.id, req.body, userAuth._id)
        .then(function(result) {
        
            return res.status(200)
            .send({   
                status: 1,
                message: "Quizz update successfully",
                data: result
            });
        })
        .catch(function(err) {
            console.log(err)
            return res.status(400).send({
                status: 0,
                message: err.message
            });
        });
    },

    delete: function(req, res) {
        const quizId = req.params.id;
        quizzServices.deleteQuizzById(quizId)
        .then(response => {
            res.send({   
                status: 1,
                message: "Quizz delete successfully",
            });
        })
        .catch(err => {
            res.status(500).send({   
                status: 0,
                message: "Quizz delete fail",
            });
        });
    },

    saveResult: function(req, res) {
        quizzServices.saveShareResult(req.body)
        .then(response => {
            res.send({   
                status: 1,
                message: "Created successfully",
                data: response
            });
        })
        .catch(err => {
            res.status(500).send({   
                status: 0,
                message: "Result create fail",
            });
        });
    }
    
}
