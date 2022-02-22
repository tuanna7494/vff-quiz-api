const Router = require('express').Router;
const uploadControlers = require("../controllers/uploadController");
const uploadtor = require("../uploadtor") 
const authMiddleware = require('../middlewares/authJwt');

const router = Router();
router.post('/', authMiddleware, uploadtor.single('thumbnail'), uploadControlers.upload);


module.exports = router;