// ==UserScript==
// @name         Wikipedia - Favorite Languages
// @description  Easily access Wikipedia pages in your favorite languages. Setup languages below.
// @version      0.0.2
// @author       Arthur Hammer
// @namespace    https://github.com/a-hammer
// @license      MIT
// @homepage     https://github.com/a-hammer/userscripts/master/Wikipedia_FavoriteLanguages
// @updateURL    https://github.com/a-hammer/userscripts/raw/master/Wikipedia_FavoriteLanguages/wikipedia_favorite-languages.user.js
// @downloadURL  https://github.com/a-hammer/userscripts/raw/master/Wikipedia_FavoriteLanguages/wikipedia_favorite-languages.user.js
// @match        *.wikipedia.org/wiki/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @grant        none
// ==/UserScript==

(function($) {

    // Add language codes for favorite languages here.
    // Example: Use 'en' for the English Wikipedia https://en.wikipedia.org
    // For a list of Wikipedia languages see: https://en.wikipedia.org/wiki/List_of_Wikipedias
    var favoriteLanguages = ['en', 'de'];

    $(function() {
        var list = $('<ul></ul>')
            .insertBefore('#firstHeading')
            .css({
                'list-style': 'none',
                'font-size': '12px',
                'margin-left': '0px',
                'margin-bottom': '12px'
            });

        favoriteLanguages.forEach(function(lang) {
            $('.interlanguage-link.interwiki-' + lang)
                .clone()
                .appendTo(list)
                .css({
                    'display': 'inline',
                    'margin-right': '8px'
                });
        });
    });

})(jQuery.noConflict(true));
