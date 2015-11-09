// ==UserScript==
// @name         YouTube - Toggle Comments
// @description  Adds a button to hide/show comments on YouTube videos. Hides comments by default.
// @version      0.0.2
// @author       Arthur Hammer
// @namespace    https://github.com/arthurhammer
// @license      MIT
// @homepage     https://github.com/arthurhammer/userscripts/tree/master/YouTube_ToggleComments
// @updateURL    https://github.com/arthurhammer/userscripts/raw/master/YouTube_ToggleComments/youtube_toggle-comments.user.js
// @downloadURL  https://github.com/arthurhammer/userscripts/raw/master/YouTube_ToggleComments/youtube_toggle-comments.user.js
// @supportURL   https://github.com/arthurhammer/userscripts/issues
// @match        https://www.youtube.com/*
// @run-at       document-end
// @grant        none
// @noframes
// ==/UserScript==

(function() {

    var prefs = {
        hiddenByDefault: true
    };

    function toggle(el) {
        if (el) el.style.display = (el.style.display === 'none') ? 'block' : 'none';
    }

    function addToggleButton(comments) {
        if (window.self !== window.top) return;
        var commentsHeader = document.getElementsByClassName('all-comments')[0];
        if (!commentsHeader) return;

        var button = document.createElement('a');
        button.textContent = 'Hide';
        button.href = '#';
        button.style.textTransform = 'none';
        button.addEventListener('click', function(e) {
            e.preventDefault();
            button.textContent = (button.textContent === 'Hide') ? 'Show' : 'Hide';

            // Toggle all the comment-related stuff
            toggle(comments);
            toggle(document.getElementsByClassName('comments-order-menu')[0]);
            toggle(document.getElementById('yt-comments-sb-container'));
        });

        var separator = document.createElement('span');
        separator.textContent = (' — ');
        commentsHeader.appendChild(separator);
        commentsHeader.appendChild(button);

        if (prefs.hiddenByDefault) button.click();
    }

    var observer = new MutationObserver(function() {
        var comments = document.getElementsByClassName('comments')[0];
        if (comments) {
            observer.disconnect();
            addToggleButton(comments);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

})();
