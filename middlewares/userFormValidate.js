module.exports = function(req, res, next) {
    try {
        const body = req.body;
        const user_name = body.user_name;
        const password = body.password;
        const first_name = body.first_name;
        const last_name = body.last_name;
        const role = body.role;
        
        if (user_name.length > 0 &&
            password.length > 0 &&
            first_name.length > 0 &&
            last_name.length > 0 &&
            role.length > 0
        ) {
            next();
        } else {
            throw new Error("Validate failed")
        }

    } catch (e) {
        res.status(401).json(
            {
                status: "failed",
                message: "Validate failed",
                data: []
            }
        )
    }
}
