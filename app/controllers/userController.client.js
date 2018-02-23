'use strict';

(function () {

   const profileId = document.querySelector('#profile-id') || null;
   const profileUsername = document.querySelector('#profile-username') || null;
   const displayName = document.querySelector('#display-name');
   const apiUrl = appUrl + '/api/:id';

   function updateHtmlElement (data, element, userProperty) {
      element.innerHTML = data[userProperty];
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, data => {
      const userObject = JSON.parse(data);

      if (userObject.displayName !== null) {
         updateHtmlElement(userObject, displayName, 'displayName');
      } else {
         updateHtmlElement(userObject, displayName, 'username');
      }

   }));
})();
