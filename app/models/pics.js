'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pic = new Schema({
	user_id: Number,
	user_displayName: String,
	url: String,
	description: String,
	likes: [{
	    user_id: Number
	}]
});

module.exports = mongoose.model('Pic', Pic);