const passport = require('passport');
// const crypto = require('crypto');
// const mongoose = require('mongoose');
// const User = mongoose.model('User');
// const promisify = require('es6-promisify');
// const mail = require('../handlers/mail');

exports.login = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Failed Login!',
    successRedirect: '/',
    successFlash: 'You are now logged in!'
}); // created a passport.js in handler to manage the local strategy

exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'You are now logged out! 👋');
    res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
    // check if user is authenticated
    if (req.isAuthenticated()) {
        next();
        return;
    }
    req.flash('error', 'You must be logged in');
    res.redirect('/login');
};

// exports.checkLoggedIn = (req, res, next) => {
//     if (req.user) {
//         res.locals.auth = !req.user.anonymous;
//     }
//     return next();
// };

// exports.forgot = async (req, res) => {
//     // see if user exists
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) {
//         req.flash('error', 'No account with that email'); // could set a success message saying that the email has been sent even if not, so nobody can know if the email exists in the db or no (more secure)
//         return res.redirect('/login');
//     };
//     // set reset token and expiry in account
//     user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
//     user.resetPasswordExpires = Date.now() + 3600000;
//     await user.save();
//     // send email with the token
//     const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
//     await mail.send({
//         user,
//         subject: 'Password Reset',
//         resetURL,
//         filename: 'password-reset'
//     });
//     req.flash('success', `The email password reset link has been emailed to you`);
//     // redirect to login page
//     res.redirect('/login');
// };

// exports.reset = async (req, res) => {
//     const user = await User.findOne({
//         resetPasswordToken: req.params.token,
//         resetPasswordExpires: { $gt: Date.now() }
//     });
//     if (!user) {
//         req.flash('error', 'Password token is invalid or has expired');
//         return res.redirect('/login');
//     }
//     // if there is a user, show the pass reset form
//     res.render('reset', { title: 'Reset your Password' });
// };

// exports.confirmedPasswords = (req, res, next) => {
//     if (req.body.password === req.body['password-confirm']) {
//         next();
//         return;
//     }
//     req.flash('error', 'Passwords do not match!');
//     res.redirect('back');
// };

// exports.update = async (req, res) => {
//     const user = await User.findOne({
//         resetPasswordToken: req.params.token,
//         resetPasswordExpires: { $gt: Date.now() }
//     });

//     if (!user) {
//         req.flash('error', 'Password token is invalid or has expired');
//         return res.redirect('/login');
//     }

//     const setPassword = promisify(user.setPassword, user);
//     await setPassword(req.body.password);
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;
//     const updatedUser = await user.save();
//     await req.login(updatedUser);
//     req.flash('success', '💃 Nice! Your password has been reset.');
//     res.redirect('/');
// };