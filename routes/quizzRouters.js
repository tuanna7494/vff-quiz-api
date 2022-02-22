const router = require('express').Router();
const quizzControllers = require("../controllers/quizzControllers");
const authMiddleware = require('../middlewares/authJwt');
const checkDeleteAbility = require('../middlewares/checkDeleteAbility');

router.post("/", authMiddleware, quizzControllers.create);
router.get("/", quizzControllers.find);
router.get("/get-created-quizzes", authMiddleware, quizzControllers.findByUserId);
router.get("/getquizbyslug/:id", quizzControllers.findBySlug);
router.post("/saveresult", quizzControllers.saveResult);
router.get("/search", quizzControllers.search);
router.get("/:id", quizzControllers.getOne);
router.put("/:id", authMiddleware, quizzControllers.update)
router.delete("/:id", authMiddleware, checkDeleteAbility, quizzControllers.delete)

module.exports = router;