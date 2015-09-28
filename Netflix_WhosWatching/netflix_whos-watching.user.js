// ==UserScript==
// @name         Netflix - Who's Watching
// @description  Skips the profile-chooser page by automatically clicking a specific profile. Set up the profile to use below.
// @version      0.0.1
// @author       Arthur Hammer
// @namespace    https://github.com/arthurhammer
// @license      MIT
// @homepage     https://github.com/arthurhammer/userscripts/tree/master/Netflix_WhosWatching
// @updateURL    https://github.com/arthurhammer/userscripts/raw/master/Netflix_WhosWatching/netflix_whos-watching.user.js
// @downloadURL  https://github.com/arthurhammer/userscripts/raw/master/Netflix_WhosWatching/netflix_whos-watching.user.js
// @supportURL   https://github.com/arthurhammer/userscripts/issues
// @match        http*://www.netflix.com/*
// @run-at       document-body
// @grant        none
// ==/UserScript==

(function() {

    var profile = 'Arthur';  // Replace with the exact profile name

    function choose() {
        var chooseProfile = document.querySelectorAll('.choose-profile > .profile > .profile-link');

        for (var i = 0; i < chooseProfile.length; i++) {
            if (chooseProfile[i].textContent === profile) {
                chooseProfile[i].click();
                return;
            }
        }
    }

    new MutationObserver(choose)
        .observe(document.body, { subtree: true, childList: true });

    choose();

})();

// Profile-chooser page:
//   .list-profiles > .choose-profile > .profile > .profile-link  > .profile-icon > .profile-name
// But don't click elements in the profile menu on the main page:
//   .profile-link > .profile-icon > .profile-name
