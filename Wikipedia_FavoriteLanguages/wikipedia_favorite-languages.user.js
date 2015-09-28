// ==UserScript==
// @name         Wikipedia - Favorite Languages
// @description  Easily access Wikipedia pages in your favorite languages. Setup languages to use in the script.
// @version      0.1.0
// @author       Arthur Hammer
// @namespace    https://github.com/arthurhammer
// @license      MIT
// @homepage     https://github.com/arthurhammer/userscripts/master/Wikipedia_FavoriteLanguages
// @updateURL    https://github.com/arthurhammer/userscripts/raw/master/Wikipedia_FavoriteLanguages/wikipedia_favorite-languages.user.js
// @downloadURL  https://github.com/arthurhammer/userscripts/raw/master/Wikipedia_FavoriteLanguages/wikipedia_favorite-languages.user.js
// @supportURL   https://github.com/arthurhammer/userscripts/issues
// @match        http*://*.wikipedia.org/wiki/*
// @run-at       document-body
// @grant        none
// ==/UserScript==

(function() {

    // Add language codes for favorite languages here.
    // Example: Use 'en' for the English Wikipedia https://en.wikipedia.org
    // For a list of Wikipedia languages see: https://en.wikipedia.org/wiki/List_of_Wikipedias
    var languages = ['en', 'de'];


    // Make room for the languages in heading's margin.
    // Avoids shifting main content down when they are inserted later.
    insertCSSRule('#firstHeading { margin-top: 22px; }');

    document.addEventListener('DOMContentLoaded', function() {
        var list = document.createElement('ul');

        list.style.listStyle = 'none';
        list.style.fontSize = '12px';
        list.style.marginLeft = '0px';
        list.style.marginBottom = '-18px'; // Clear additional space from above

        for (var i = 0; i < languages.length; i++) {
            var lang = document.querySelectorAll('.interlanguage-link.interwiki-' + languages[i])[0];

            if (lang) {
                lang = lang.cloneNode(true);
                lang.style.display = 'inline';
                lang.style.marginRight = '8px';
                list.appendChild(lang);
            }
        }

        var heading = document.getElementById('firstHeading');
        if (heading && list.childElementCount > 0) heading.parentElement.insertBefore(list, heading);

    });

    function insertCSSRule(rule) {
        var style = document.createElement('style');
        document.head.appendChild(style);
        style.sheet.insertRule(rule, 0);
    }

})();
