require('dotenv').config();
const userServices = require('../services/userServices')
const jwt = require('jsonwebtoken')
const privateKey = process.env.APP_PRIVATE_KEY;

module.exports = {
    login: function(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;
        
        userServices.login(email, password)
        .then(userAuth => {
            if (userAuth) {
                const authToken = jwt.sign({userAuth}, privateKey);
                res.set('Token', authToken);
                res.json({
                    status: 1,
                    message: "Login successfully",
                    data: {token: authToken}
                })
            }  else {
                  res.json({
                    status: 1,
                    message: "Incorrect email or password",
                })
            }
            
        })
        .catch(error => next(error))
    },

    register: function(req, res, next) {
        const body = req.body;
        userServices.register(body)
        .then(data => {
            if (data) {
                res.send({
                    status: 1,
                    message: "Register successfully", 
                    data
                })
            } else {
                res.send({
                    status: 1,
                    message: "User already exists", 
                })
            }
        })
        .catch(error => {
            console.log(error);
            next(error)
        });
    },

    getAllUsers: function(req, res, next) {
        userServices.getAllUser()
        .then(data => res.send({
            status: 1,
            data
        }))
        .catch(error => next(error));
    },
    
    getUserById: function(req, res, next) {
        const userId = req.params.id;
        userServices.getUser(userId)
        .then(data => res.send({
            status: 1,
            data
        }))
        .catch(error => next(error));
    },
    
    deleteUser: function(req, res, next) {
        const userId = req.params.id;
        userServices.deleteUser(userId)
        .then(() => res.send({
            status: 1,
            message: "success"
        }))
        .catch(error => next(error));
    },

    updateUser: function(req, res, next) {
        const userId = req.params.id;
        
        userServices.updateUser(userId, req.body)
        .then(data => res.send({
            status: 1,
            data
        }))
        .catch(error => next(error))

    },
    
    getProfile: function(req, res, next) {
        const userAuth = res.locals.authUser;
        userServices.getUser(userAuth._id)
        .then(data => res.send({
            status: 1,
            data
        }))
        .catch(error => next(error));
    }
}