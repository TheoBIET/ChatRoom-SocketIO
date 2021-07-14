module.exports = {
    homePage: (req, res) => {
        if (!req.session.user) {
            return res.redirect('/login');
        }

        res.render('message');
    },

    loginForm: (req, res) => {
        res.render('login');
    },

    handleLoginForm: (req, res) => {
        const user = req.body;

        if (user.username) {
            req.session.user = {
                username: user.username,
            };
            res.redirect('/');
        } else {
            res.render('login', {
                error: 'Vous n\'avez pas saisi de nom d\'utilisateur.',
            });
        }
    },

    signupForm: (req, res) => {
        res.render('message');
    },

    handleSignupForm: (req, res) => {
        res.render('message');
    },
}