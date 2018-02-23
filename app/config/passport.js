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
		consumerKey: configAuth.twitterAuth.consumerKey,
		consumerSecret: configAuth.twitterAuth.consumerSecret,
		callbackURL: configAuth.twitterAuth.callbackURL
	},
	(token, tokenSecret, profile, done) => {
		process.nextTick(() => {
			User.findOne({ 'twitter.id': profile.id }, (err, user) => {
				if (err) return done(err);

				if (user) return done(null, user);
				else {
					const newUser = new User();

					newUser.twitter.id = profile.id;
					newUser.twitter.username = profile.username;
					newUser.twitter.displayName = profile.displayName;
					newUser.twitter.location = profile._json.location;
					newUser.twitter.followers_count = profile._json.followers_count;
					newUser.twitter.following_count = profile._json.friends_count;

					newUser.save(err => {
						if (err) throw err;

						return done(null, newUser);
					});
				}
			});
		});
	}));
};
