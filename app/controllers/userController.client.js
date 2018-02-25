'use strict';

(function () {

   const displayName = document.querySelector('#display-name');
   const apiUrl = appUrl + '/api/users/getUserData';


   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, data => {
      
      const userObject = JSON.parse(data);

      if (userObject.displayName) {
         displayName.innerHTML = userObject.displayName;
      } else if (userObject.username) {
         displayName.innerHTML = userObject.username;
      } else {
         displayName.innerHTML = "guest";
      }
      

   }));
})();
