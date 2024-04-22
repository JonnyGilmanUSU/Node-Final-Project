const isAdmin = (req, res, next) => {
    if (req.session.isLoggedIn && req.session.user.admin) {
        next();
    } else {
        res.status(403).render('unauthorized', {
            pageTitle: 'Unauthorized',
            path: '/unauthorized'
        });
    }
}

module.exports = isAdmin;


