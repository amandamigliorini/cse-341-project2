const isAuthenticated = (req,res, next) => {
    if(req.session.user === undefined){
        return res.status(401).json("You do not have authorization to execute this request");
    }
    next();
};

module.exports = { isAuthenticated }