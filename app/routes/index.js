'use strict';

const PicsHandler = require('../controllers/picsHandler.server');
const path = process.cwd();
const picsHandler = new PicsHandler();

module.exports = (app, passport) => {


	app.route('/')
		.get((req, res) => res.sendFile(path + '/public/index.html'));

	app.route('/logout')
		.get((req, res) => {
			req.logout();
			res.redirect('/');
		});

	app.route('/api/users/getUserData')
		.get((req, res) => res.json(req.user ? req.user.vkontakte : {}));
	
	app.route('/api/pics/getAllPics')
		.get(picsHandler.getAllPics);
		
	app.route('/api/pics/addPicture')
		.post(picsHandler.addPicture);
		
	app.route('/api/pics/likeUnlikePicture')
		.put(picsHandler.likeOrUnlikePicture);
		
	app.route('/api/pics/deletePicture')
		.delete(picsHandler.deletePicture);
		
	app.route('/auth/vkontakte')
		.get(passport.authenticate('vkontakte'));

	app.route('/auth/vkontakte/callback')
		.get(passport.authenticate('vkontakte', {
			successRedirect: '/',
			failureRedirect: '/'
		}));
};
