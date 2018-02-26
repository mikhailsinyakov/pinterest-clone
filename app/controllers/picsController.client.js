"use strict";

import ajaxFunctions from '../common/ajax-functions';

function PicsController() {
    
    this.getAllPics = () => {
        return ajaxFunctions.ready()
                .then(() => ajaxFunctions.ajaxRequest('GET', '/api/pics/getAllPics'))
                .then(result => {
                    return new Promise((resolve, reject) => {
                        if (result.status == 200) {
                            let pics = JSON.parse(result.data);
                            pics = pics.map(pic => {
                                return {
                                    id: pic._id,
                                    user_id: pic.user_id,
                                	user_displayName: pic.user_displayName,
                                	url: pic.url,
                                	description: pic.description,
                                	likes: pic.likes.map(like => {
                                	    return {
                                	        user_id: like.user_id
                                	    };
                                	})
                                };
                            });
                            resolve(pics);
                        }
                        else reject(result.data);
                    });
                    
                }).catch(err => Promise.reject(err));
    };
    
    this.addPicture = data => {
        const url = `/api/pics/addPicture`;
        return ajaxFunctions.ready()
                .then(() => ajaxFunctions.ajaxRequest('POST', url, data))
                .then(result => {
                    return new Promise((resolve, reject) => {
                        if (result.status == 200) {
                            resolve(result.status);
                        }
                        else reject(result.data);
                    });
                    
                }).catch(err => Promise.reject(err));
    };
    
    this.likeOrUnlikePicture = id => {
        const url = `/api/pics/likeUnlikePicture?id=${id}`;
        return ajaxFunctions.ready()
                .then(() => ajaxFunctions.ajaxRequest('PUT', url))
                .then(result => {
                    return new Promise((resolve, reject) => {
                        if (result.status == 200) {
                            resolve(result.status);
                        }
                        else reject(result.data);
                    });
                    
                }).catch(err => Promise.reject(err));
    };
    
    this.deletePicture = id => {
        const url = `/api/pics/deletePicture?id=${id}`;
        return ajaxFunctions.ready()
                .then(() => ajaxFunctions.ajaxRequest('DELETE', url))
                .then(result => {
                    return new Promise((resolve, reject) => {
                        if (result.status == 200) {
                            resolve(result.status);
                        }
                        else reject(result.data);
                    });
                    
                }).catch(err => Promise.reject(err));
    };
    
}

export default PicsController;