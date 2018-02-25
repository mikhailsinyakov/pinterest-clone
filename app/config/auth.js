'use strict';

module.exports = {
	'vkontakteAuth': {
		'clientID': process.env.VKONTAKTE_APP_ID,
		'clientSecret': process.env.VKONTAKTE_APP_SECRET,
		'callbackURL': process.env.APP_URL + 'auth/vkontakte/callback'
	}
};
