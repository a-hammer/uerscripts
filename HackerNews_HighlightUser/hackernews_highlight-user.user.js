// ==UserScript==
// @name         Hacker News - Highlight User
// @description  When hovering over a user, highlights comments by the same user in the thread. Makes following who said what easier.
// @version      0.0.1
// @author       Arthur Hammer
// @namespace    https://github.com/arthurhammer
// @license      MIT
// @homepage     https://github.com/arthurhammer/userscripts/tree/master/HackerNews_HighlightUser
// @updateURL    https://github.com/arthurhammer/userscripts/raw/master/HackerNews_HighlightUser/hackernews-highlight-user.user.js
// @downloadURL  https://github.com/arthurhammer/userscripts/raw/master/HackerNews_HighlightUser/hackernews-highlight-user.user.js
// @supportURL   https://github.com/arthurhammer/userscripts/issues
// @match        https://news.ycombinator.com/item?id=*
// @grant        none
// ==/UserScript==


(function() {

    function getUsers(user) {
        return document.querySelectorAll(user ?
            '.comhead a[href="user?id=' + user + '"]' :
            '.comhead a[href^="user?id="]'
        );
    }

    function highlight(yes) {
        var users = getUsers(this.textContent);
        for (var i = 0; i < users.length; i++) {
            users[i].style.fontWeight = yes ? 'bold'   : 'inherit';
            users[i].style.color      = yes ? 'white'  : 'inherit';
            users[i].style.background = yes ? 'orange' : 'inherit';
            users[i].style.padding    = yes ? '2px'    : 'inherit';
        }
    }

    var users = getUsers();

    for (var i = 0; i < users.length; i++) {
        users[i].addEventListener('mouseenter', highlight.bind(users[i], true));
        users[i].addEventListener('mouseleave', highlight.bind(users[i], false));
    }

})();
