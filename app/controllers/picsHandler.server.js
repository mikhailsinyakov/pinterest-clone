"use strict";

const Pics = require('../models/pics');

function PicsHandler() {
    
    this.getAllPics = (req, res) => {
        Pics.find({})
                .then(pics => res.json(pics))
                .catch(err => res.status(500).send(err));
    };
    
    this.addPicture = (req, res) => {
        const url = req.body.url;
        Pics.findOne({url})
                .then(picture => {
                    if (picture) return res.sendStatus(403);
                    const user_id = req.user.vkontakte.id;
                    const user_displayName = req.user.vkontakte.displayName;
                    const description = req.body.description;
                    const newPic = new Pics({user_id, user_displayName, url, description, likes: []});
                    newPic.save()
                            .then(() => res.sendStatus(200))
                            .catch(err => res.status(500).send(err));
                }).catch(err => res.status(500).send(err));
        
        
    };
    
    this.deletePicture = (req, res) => {
        Pics.findByIdAndRemove(req.query.id)
                .then(() => res.sendStatus(200))
                .catch(err => res.status(500).send(err));
    };
    
    this.likeOrUnlikePicture = (req, res) => {
        const user_id = req.user.vkontakte.id;
        Pics.findById(req.query.id)
                .then(picture => {
                    const wasLiked = !!picture.likes.filter(like => like.user_id == user_id).length;
                    if (wasLiked) {
                        picture.likes = picture.likes.filter(like => like.user_id != user_id);
                    }
                    else {
                        picture.likes.push({user_id});
                    }
                    picture.save()
                            .then(() => res.sendStatus(200))
                            .catch(err => res.status(500).send(err));
                }).catch(err => res.status(500).send(err));
    };
    
}


module.exports = PicsHandler;