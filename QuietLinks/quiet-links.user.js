// ==UserScript==
// @name         Quiet Links
// @description  Mutes distracting links for focused reading.
// @version      0.2
// @author       Arthur Hammer
// @namespace    https://github.com/arthurhammer
// @license      MIT
// @homepage     https://github.com/arthurhammer/userscripts/tree/master/QuietLinks
// @updateURL    https://github.com/arthurhammer/userscripts/raw/master/QuietLinks/quiet-links.user.js
// @downloadURL  https://github.com/arthurhammer/userscripts/raw/master/QuietLinks/quiet-links.user.js
// @supportURL   https://github.com/arthurhammer/userscripts/issues
// @match        *://*/*
// @run-at       document-start
// @grant        GM_addStyle
// ==/UserScript==

(function() {

    var css = `
        a,
        a:visited,
        a:hover,
        a * {
        color: inherit !important;
        text-decoration: none !important;

        border: none !important;
        background-color: inherit !important;
        background-image: none !important;
        box-shadow: none !important;

        /* Hard mode: */
        /* pointer-events: none !important;
        cursor: default !important; */
        }
    `;

    GM_addStyle(css);

})();
