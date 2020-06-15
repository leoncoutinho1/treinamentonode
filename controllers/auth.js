const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isLoggedIn: req.session.isLoggedIn,
        errorMessage: message
    });
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User
        .findOne({
            email: email
        })
        .then(user => {
            if (!user) {
                req.flash('error', 'Invalid e-mail or password.');
                return res.redirect('/login');
            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.user = user;
                        req.session.isLoggedIn = true;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/');
                        });
                    }
                    req.flash('error', 'Invalid e-mail or password.');
                    res.redirect('/login')
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login');
                })
        })
        .catch(err => {
            req.session.isLoggedIn = false;
            res.redirect('/login');
        });
};


exports.getLogout = (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
}

exports.getSignUp = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/signUp', {
        path: '/signup',
        pageTitle: 'Sign Up',
        errorMessage: message
    });
}

exports.postSignUp = (req, res, next) => {
    const { email, password, confirmpassword } = req.body;
    const name = email.split('@');
    User
        .findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                req.flash('error', 'E-mail already exists, please pick a different one');
                return res.redirect('/signup');
            }
            return bcrypt
                .hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        name: name[0],
                        email: email,
                        password: hashedPassword,
                        cart: { items: [] }
                    });
                    return user.save();
                })
                .then(result => {
                    req.flash('success', 'You successfully signed up!');
                    return res.redirect('/signup');
                })
                .catch(err => console.log(err));
        })
        .catch(err => {
            console.log(err);
        });
}