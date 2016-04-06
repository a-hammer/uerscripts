// ==UserScript==
// @name         Hacker News - Show All Comments
// @description  On a comment detail page, adds a link back to the whole Hacker News thread
// @version      0.0.1
// @author       Arthur Hammer
// @namespace    https://github.com/arthurhammer
// @license      MIT
// @homepage     https://github.com/arthurhammer/userscripts/raw/master/HackerNews_ShowAllComments/hackernews_show-all-comments.user.js
// @updateURL    https://github.com/arthurhammer/userscripts/raw/master/HackerNews_ShowAllComments/hackernews_show-all-comments.user.js
// @downloadURL  https://github.com/arthurhammer/userscripts/raw/master/HackerNews_ShowAllComments/hackernews_show-all-comments.user.js
// @match        https://news.ycombinator.com/item?id=*
// @grant        none
// ==/UserScript==


(function() {

  var parentLinkSelector = '.par a';

  getAllCommentsURL(document)
    .then(insertAllCommentsURL)
    .catch(function(err) {
      console.log('Couldn\'t insert link to all comments page: ');
      console.log(err);
  });

  function insertAllCommentsURL(url) {
    var parentLink = document.querySelector(parentLinkSelector);
    if (!parentLink || !url || (url === document.URL)) return;

    var a = document.createElement('a');
    a.textContent = 'all comments';
    a.href = url;

    parentLink.parentNode.appendChild(document.createTextNode(' | '));
    parentLink.parentNode.appendChild(a);
  }

  function getAllCommentsURL(document) { // make iterative?
    var parentLink = document.querySelector(parentLinkSelector);

    return (parentLink && parentLink.href)
      ? request(parentLink.href).then(getAllCommentsURL)
      : Promise.resolve(document.URL);
  }

  function request(url) {
    return new Promise(function (resolve, reject) {
      var method = 'GET';
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'document';
      xhr.open(method, url);

      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        }
        else {
          reject({
            status: this.status,
            statusText: xhr.statusText,
          });
        }
      };

      xhr.onerror = function() {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      };

      xhr.send();
    });
  }

})();
