module.exports = function requiresLogin(req, res, next) {
    if (req.session && req.session.isLogin) {
        return next();
    } else {
        res.status(401).redirect('/');
    }
};
