exports.isAuthenticated = (req, res, next) => {
    if (req.session.userId) return next();
    res.redirect('/login');
};
exports.isAdmin = (req, res, next) => {
    if (req.session.isAdmin) return next();
    res.redirect('/login');
};