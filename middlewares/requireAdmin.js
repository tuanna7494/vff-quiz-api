module.exports = function (req, res, next) {
    const authUser = res.locals.authUser;
    if (authUser.role != "admin") {
        return res.status(401).json({ 
            status: 1,
            message: "Need to be super admin to access" 
        });
    }
    next();
    
}