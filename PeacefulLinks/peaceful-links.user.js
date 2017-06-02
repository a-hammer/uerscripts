// ==UserScript==
// @name         Peaceful Links
// @description  Mutes distracting links for focused reading.
// @version      0.1
// @author       Arthur Hammer
// @namespace    https://github.com/arthurhammer
// @license      MIT
// @homepage     https://github.com/arthurhammer/userscripts/tree/master/PeacefulLinks
// @updateURL    https://github.com/arthurhammer/userscripts/raw/master/PeacefulLinks/peaceful-links.user.js
// @downloadURL  https://github.com/arthurhammer/userscripts/raw/master/PeacefulLinks/peaceful-links.user.js
// @supportURL   https://github.com/arthurhammer/userscripts/issues
// @match        *://*/*
// @run-at       document-start
// @grant        GM_addStyle
// ==/UserScript==

(function() {

    var css = 'a, a:visited, a:hover { color: inherit !important; text-decoration: none !important; }';

    // Hard mode:
    // var css = 'a, a:visited, a:hover { color: inherit !important; text-decoration: none !important; pointer-events: none !important; cursor: default !important; }';

    GM_addStyle(css);

})();
