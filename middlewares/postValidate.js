const postValidator = require('../validator/postValidator');
const Utils = require('../utils/index')

module.exports = function(req, res, next) {
    try {
       const data = req.body;
        const validator = postValidator(data);
        if (validator.passes()) {
            next();
        } else {
            throw Utils.getOneValidatorError(validator.errors)
        }

    } catch (e) {
        console.log(e)
        res.status(401).json(
            {
                status: "failed",
                message: e.message,
                data: []
            }
        )
    }
}
