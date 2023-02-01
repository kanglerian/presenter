const Auth = {
    authLogin: (req, res, next) => {
        if (req.session.logged) {
            return res.redirect('/auth');
        }
        next();
    },
    checkLogin: (req, res, next) => {
        if (!req.session.logged) {
            return res.redirect('/auth');
        }
        next();
    },
    checkStatus: (req, res, next) => {
        if (!req.session.status == 1) {
            return res.redirect('/auth');
        }
        next();
    },
    checkRole: (req, res, next) => {
        if (!req.session.role == 1) {
            return res.redirect('/auth');
        }
        next();
    }
}

module.exports = Auth;