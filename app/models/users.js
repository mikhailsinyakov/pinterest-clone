'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
	twitter: {
		id: String,
		username: String,
		displayName: String,
		location: String,
		followers_count: Number,
		following_count: Number
	}
});

module.exports = mongoose.model('User', User);
