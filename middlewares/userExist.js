const User = require('../models/user')

module.exports = function(req, res, next) {
    try {
        const email = req.body.email;
        if (email.length > 0) {
            User.findOne({email: email})
            .then(data => {
                if (data) {
                    res.status(401).json(
                        {
                            status: 0,
                            message: "User is exist",
                        }
                    )
                } else {
                    next()
                }
                
            })
            
        } else {
            res.status(401).json({status: "failed", message: "User name not invalid"})
        }
    } catch (e) {
        res.status(401).json({status: "failed", message: e.message})
    }
    
    
}