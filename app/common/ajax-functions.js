'use strict';

export default {
   ready: function ready () {
      return new Promise((resolve, reject) => {
         
         if (document.readyState === 'complete') {
            return resolve();
         }
         document.addEventListener('DOMContentLoaded', resolve, false);
         
      });
   },
   ajaxRequest: function ajaxRequest (method, url, data) {
      return new Promise((resolve, reject) => {
         const xmlhttp = new XMLHttpRequest();

         xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState === 4) {
               resolve({data: xmlhttp.response, status: xmlhttp.status});
            }
         };
   
         xmlhttp.open(method, url, true);
         if (data) {
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlhttp.send(data);
         }
         else xmlhttp.send();
      });
   }
};

