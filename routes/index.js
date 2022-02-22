const Router = require('express').Router;
const User = require('../models/user');
const userRouters = require('./userRouters');
const userController = require("../controllers/userControllers");
const uploadRouters = require('./uploadRouters');
const quizzControllers = require("./quizzRouters");
const authMiddleware = require('../middlewares/authJwt');

const path = require('path');
const router = Router();

router.post('/api/auth/login', userController.login);
router.get('/api/auth/me', authMiddleware, userController.getProfile);
router.use('/api/users', userRouters);
router.use('/api/uploads', uploadRouters);
router.use("/api/quizz", quizzControllers);

module.exports = router;