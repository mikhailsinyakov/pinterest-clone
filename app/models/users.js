'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
	vkontakte: {
		id: String,
		username: String,
		displayName: String
	}
});

module.exports = mongoose.model('User', User);
