const User = require('../models/user');
const bcrypt = require('bcryptjs');


exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isLoggedIn: req.session.isLoggedIn
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
                return res.redirect('/login');
            }
            console.log(user);
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
    res.render('auth/signUp', {
        path: '/signup',
        pageTitle: 'Sign Up',
        isLoggedIn: req.session.isLoggedIn
    });
}

exports.postSignUp = (req, res, next) => {
    const { email, password, confirmpassword } = req.body;
    const name = email.split('@');
    User
        .findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                return res.redirect('/signup');
            }
            return bcrypt
                .hash(password, 12)
                .then(hashedPassword => {
                    User.create({
                        name: name[0],
                        email: email,
                        password: hashedPassword,
                        cart: { items: [] }
                    })
                    .then(user => {
                        return user.save();
                    })
                    .catch(err => console.log(err));
                });            
        })
        .then(result => {
            res.redirect('/login');
        })
        .catch(err => console.log(err));
}