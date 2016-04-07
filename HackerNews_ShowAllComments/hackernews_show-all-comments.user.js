// ==UserScript==
// @name         Hacker News - Show All Comments
// @description  On comment detail pages, adds a link back to the whole Hacker News thread
// @version      0.0.3
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

  if (!setRootLink()) return;

  getItem(pageItemId())
    .then(getRootItem)
    .then(setRootLink)
    .catch(function(err) {
      console.log(err);
    });

  function setRootLink(item) {
    var id = 'all-comments';
    var a = document.getElementById(id);

    if (!a) {
      var target = '.par a';
      var parentLink = document.querySelector(target);
      if (!parentLink) return null; // Skip if alreay on root/main page

      a = document.createElement('a');
      a.textContent = 'all comments';
      a.id = id;

      parentLink.parentNode.appendChild(document.createTextNode(' | '));
      parentLink.parentNode.appendChild(a);
    }

    if (item) a.href = itemURL(item.id);
    return a;
  }

  function getRootItem(item) { // make iterative?
    if (!item) return null;

    return item.parent
      ? getItem(item.parent)
          .then(getRootItem)
      : Promise.resolve(item);
  }

  function getItem(id) {
    var endpoint = 'https://hacker-news.firebaseio.com/v0/item/{id}.json';
    return request(endpoint.replace('{id}', id));
  }

  function itemURL(id) {
    var url = 'https://news.ycombinator.com/item?id={id}'
    return url.replace('{id}', id);
  }

  function pageItemId() {
    var re = /news\.ycombinator\.com\/item\?id=(\d+)/;
    return re.exec(document.URL)[1];
  }

  function request(url) {
    return new Promise(function (resolve, reject) {
      var method = 'GET';
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';
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
