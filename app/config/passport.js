'use strict';

const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/users');
const configAuth = require('./auth');

module.exports = passport => {
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});

	passport.use(new TwitterStrategy({
		clientID: configAuth.twitterAuth.clientID,
		clientSecret: configAuth.twitterAuth.clientSecret,
		callbackURL: configAuth.twitterAuth.callbackURL
	},
	(token, refreshToken, profile, done) => {
		process.nextTick(() => {
			User.findOne({ 'twitter.id': profile.id }, (err, user) => {
				if (err) {
					return done(err);
				}

				if (user) {
					return done(null, user);
				} else {
					const newUser = new User();

					newUser.twitter.id = profile.id;
					newUser.twitter.username = profile.username;
					newUser.twitter.displayName = profile.displayName;

					newUser.save(err => {
						if (err) throw err;

						return done(null, newUser);
					});
				}
			});
		});
	}));
};
