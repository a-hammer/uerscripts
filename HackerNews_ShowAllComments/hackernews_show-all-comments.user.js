// ==UserScript==
// @name         Hacker News - Show All Comments
// @description  On a comment detail page, adds a link back to the whole Hacker News thread
// @version      0.0.2
// @author       Arthur Hammer
// @namespace    https://github.com/arthurhammer
// @license      MIT
// @homepage     https://github.com/arthurhammer/userscripts/tree/master/HackerNews_ShowAllComments
// @updateURL    https://github.com/arthurhammer/userscripts/raw/master/HackerNews_ShowAllComments/hackernews_show-all-comments.user.js
// @downloadURL  https://github.com/arthurhammer/userscripts/raw/master/HackerNews_ShowAllComments/hackernews_show-all-comments.user.js
// @match        https://news.ycombinator.com/item?id=*
// @grant        none
// ==/UserScript==

(function() {

  var parentLinkSelector = '.par a';
  var allCommentsId = 'all-comments';

  var link = setAllCommentsLink({ status: 'loading…' });
  if (!link) return;

  getAllCommentsURL(document)
    .then(function(url) {
      setAllCommentsLink({ url: url });
    })
    .catch(function(err) {
      console.log('Couldn\'t insert link to all comments page: ');
      setAllCommentsLink({ status: 'failed loading' });
  });

  function setAllCommentsLink(data) {
    var parentLink = document.querySelector(parentLinkSelector);
    if (!parentLink) return null;
    var a = document.getElementById(allCommentsId);

    if (!a) {
      a = document.createElement('a');
      a.id = allCommentsId;
      parentLink.parentNode.appendChild(document.createTextNode(' | '));
      parentLink.parentNode.appendChild(a);
    }

    a.textContent = 'all comments';
    a.textContent += data.status ? (' (' + data.status + ')') : '';
    if (data.url) a.href = data.url;
    return a;
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

      xhr.onerror = function() {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      };

      xhr.onload = function() {
        var ok = (this.status >= 200) && (this.status < 300);
        if (ok) resolve(xhr.response);
        else xhr.onerror();
      };

      xhr.send();
    });
  }

})();
