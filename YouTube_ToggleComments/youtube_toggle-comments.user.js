// ==UserScript==
// @name         YouTube - Toggle Comments
// @description  Adds a button to hide/show comments on YouTube videos. Hides comments by default.
// @version      0.0.1
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
// ==/UserScript==

(function() {

    var prefs = {
        hiddenByDefault: true
    };

    function toggle(el) {
        if (el) {
            el.style.display = (el.style.display == 'none') ? 'block' : 'none';
        }
    }

    new MutationObserver(function(_, observer) {
        var comments = document.getElementsByClassName('comments')[0];
        if (comments) {
            observer.disconnect();
            addToggleComments(comments);
        }
    })
    .observe(document.body, { childList: true, subtree: true });


    function addToggleComments(comments) {
        var commentsHeader = document.getElementsByClassName('all-comments')[0];
        if (! commentsHeader) return;

        var toggleComments = document.createElement('a');

        toggleComments.textContent = 'Hide';
        toggleComments.href = '#';
        toggleComments.style.textTransform = 'none';
        toggleComments.addEventListener('click', function(e) {
            e.preventDefault();

            toggleComments.textContent = (toggleComments.textContent === 'Hide') ? 'Show' : 'Hide';

            // Hide/show all the comments stuff
            toggle(comments);
            toggle(document.getElementsByClassName('comments-order-menu')[0]);
            toggle(document.getElementById('yt-comments-sb-container'));
        });

        var dash = document.createElement('span');
        dash.textContent = (' – ');
        commentsHeader.appendChild(dash);
        commentsHeader.appendChild(toggleComments);

        if (prefs.hiddenByDefault) toggleComments.click();
    }

})();

