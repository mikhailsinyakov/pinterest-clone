'use strict';

import ajaxFunctions from '../common/ajax-functions';

const apiUrl = '/api/users/getUserData';

export default function userController () {
   return ajaxFunctions.ready()
            .then(() => ajaxFunctions.ajaxRequest('GET', apiUrl))
            .then(result => {
               return new Promise((resolve, reject) => {
                  if (result.status == 200) {
                     let user = JSON.parse(result.data);
                     if (user.id) {
                        user = {
                           id: user.id,
                     		username: user.username,
                     		displayName: user.displayName
                        };
                     }
                     resolve(user);
                  }
                  else reject(result.data);
               });
            }).catch(err => Promise.reject(err));
}
