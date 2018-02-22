'use strict';

const path = process.cwd();

module.exports = (app, passport) => {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	app.route('/')
		.get(isLoggedIn, (req, res) => {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/logout')
		.get((req, res) => {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, (req, res) => {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, (req, res) => {
			res.json(req.user.twitter);
		});

	app.route('/auth/github')
		.get(passport.authenticate('twitter'));

	app.route('/auth/github/twitter')
		.get(passport.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));
};
