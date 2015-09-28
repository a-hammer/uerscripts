// ==UserScript==
// @name         Reddit - Highlight User
// @description  When hovering over a user, highlights that user's comments in the thread.
// @version      0.0.1
// @author       Arthur Hammer
// @namespace    https://github.com/arthurhammer
// @license      MIT
// @homepage     https://github.com/arthurhammer/userscripts/tree/master/Reddit_HighlightUser
// @updateURL    https://github.com/arthurhammer/userscripts/raw/master/Reddit_HighlightUser/reddit-highlight-user.user.js
// @downloadURL  https://github.com/arthurhammer/userscripts/raw/master/Reddit_HighlightUser/reddit-highlight-user.user.js
// @supportURL   https://github.com/arthurhammer/userscripts/issues
// @match        https://www.reddit.com/r/*/comments/*
// @grant        none
// ==/UserScript==


(function() {

    function getUsers(user) {
        return document.querySelectorAll(user ?
            '.author[href="https://www.reddit.com/user/' + user + '"]' :
            '.author'
        );
    }

    function highlight(yes) {
        var users = getUsers(this.textContent);
        for (var i = 0; i < users.length; i++) {
            users[i].style.background = yes ? 'yellow'  : 'inherit';
            users[i].style.padding    = yes ? '2px 5px' : 'inherit';
        }
    }

    var users = getUsers();

    for (var i = 0; i < users.length; i++) {
        users[i].addEventListener('mouseenter', highlight.bind(users[i], true));
        users[i].addEventListener('mouseleave', highlight.bind(users[i], false));
    }

})();
