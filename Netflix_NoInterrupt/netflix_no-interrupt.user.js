// ==UserScript==
// @name         Netflix - No Interrupt
// @description  Automatically clicks the "continue playing" button whenever it appears.
// @version      0.0.1
// @author       Arthur Hammer
// @namespace    https://github.com/a-hammer
// @license      MIT
// @homepage     https://github.com/a-hammer/userscripts/tree/master/Netflix_NoInterrupt
// @updateURL    https://github.com/a-hammer/userscripts/raw/master/Netflix_NoInterrupt/netflix_no-interrupt.user.js
// @downloadURL  https://github.com/a-hammer/userscripts/raw/master/Netflix_NoInterrupt/netflix_no-interrupt.user.js
// @match        http*://www.netflix.com/*
// @run-at       document-body
// @grant        none
// ==/UserScript==

// TODO: Currently every click is followed by an exception in Netflix's JS (netflix.cadmium).

(function() {

    function noInterrupt() {
        var continuePlaying = document.querySelectorAll('.player-autoplay-interrupter .icon-player-play')[0];
        if (continuePlaying) continuePlaying.click();
    }

    new MutationObserver(noInterrupt)
        .observe(document.body, { childList: true, subtree: true });

})();
