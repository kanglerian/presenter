const Auth = {
    authLogin: (req, res, next) => {
        if (req.session.logged) {
            return res.redirect('/');
        }
        next();
    },
    checkLogin: (req, res, next) => {
        if (!req.session.logged) {
            return res.redirect('/');
        }
        next();
    },
    checkStatus: (req, res, next) => {
        if (!req.session.status == 1) {
            return res.redirect('/');
        }
        next();
    },
    checkRole: (req, res, next) => {
        if (!req.session.role == 1) {
            return res.redirect('/');
        }
        next();
    }
}

module.exports = Auth;