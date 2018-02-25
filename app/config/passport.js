'use strict';

const VkontakteStrategy = require('passport-vkontakte').Strategy;
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

	passport.use(new VkontakteStrategy({
		clientID: configAuth.vkontakteAuth.clientID,
		clientSecret: configAuth.vkontakteAuth.clientSecret,
		callbackURL: configAuth.vkontakteAuth.callbackURL
	},
	(accessToken, refreshToken, params, profile, done) => {
		process.nextTick(() => {
			User.findOne({ 'vkontakte.id': profile.id }, (err, user) => {
				if (err) return done(err);

				if (user) return done(null, user);
				else {
					const newUser = new User();

					newUser.vkontakte.id = profile.id;
					newUser.vkontakte.username = profile.username;
					newUser.vkontakte.displayName = profile.displayName;

					newUser.save(err => {
						if (err) throw err;

						return done(null, newUser);
					});
				}
			});
		});
	}));
};
