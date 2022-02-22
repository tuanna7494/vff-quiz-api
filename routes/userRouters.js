const Router = require('express').Router;
const User = require('../models/user');
const userControllers = require('../controllers/userControllers');
const authMiddleware = require('../middlewares/authJwt');
const requireAdmin = require("../middlewares/requireAdmin");
const userExist = require('../middlewares/userExist');

const router = Router();

// /api/users/ 
router.get('/', authMiddleware, requireAdmin, userControllers.getAllUsers)

// /api/users/:id
router.get('/:id', authMiddleware, userControllers.getUserById)

// /api/users/register
router.post('/', authMiddleware, requireAdmin, userExist, userControllers.register)

// /api/users/:id
router.delete('/:id', authMiddleware, requireAdmin, userControllers.deleteUser)

// /api/users/:id
router.put('/:id',  authMiddleware, userControllers.updateUser)

module.exports = router;