// ==UserScript==
// @name         Wikipedia - Quiet Wiki
// @description  Makes links stand out less in Wiki articles. Useful if you fall into rabbit holes when you just wanted to focus on a single article.
// @version      0.1.0
// @author       Arthur Hammer
// @namespace    https://github.com/a-hammer
// @license      MIT
// @homepage     https://github.com/a-hammer/userscripts/tree/master/Wikipedia_QuietWiki
// @updateURL    https://github.com/a-hammer/userscripts/raw/master/Wikipedia_QuietWiki/wikipedia_quiet-wiki.user.js
// @downloadURL  https://github.com/a-hammer/userscripts/raw/master/Wikipedia_QuietWiki/wikipedia_quiet-wiki.user.js
// @match        *.wikipedia.org/wiki/*
// @exclude      *.wikipedia.org/wiki/Main_Page
// @exclude      *.wikipedia.org/wiki/Wikipedia:Hauptseite
// @run-at       document-body
// @grant        none
// ==/UserScript==

// Note: Besides articles, currently applies to most almost every page on Wikipedia (e.g. discussion pages, portals).

(function() {

    // Changes do not remove links completely. They are still clickable.
    var config = {
        removeLinkColor:     true,   // Make links black
        removeLinkUnderline: true,   // Remove underline when hovering on links
        removeLinkCursor:    false,  // Make pointer cursor when hovering links to default cursor
        smallCitations:      true,   // Make '[1][23][45]' citations to '1 23 45'
        removeCitations:     false,  // Remove citations completely
        removeEditing:       true    // Remove '[edit]' on headings
    };

    var css = styleSheet(),
        links = '#mw-content-text a:link, #mw-content-text a:visited, #mw-content-text a:active, #mw-content-text a:hover',
        citations = '#mw-content-text .reference';

    var rules = {
        removeLinkColor:      links + ' { color: inherit; }',
        removeLinkUnderline:  links + ' { text-decoration: none; }',
        removeLinkCursor:     links + ' { cursor: text; }',
        smallCitations:      [citations + ' span:nth-of-type(1) { display: none; }',
                              citations + ' span:nth-of-type(2) { visibility: hidden; }'],
        removeCitations:      citations + ' { display: none; }',
        removeEditing:        '.mw-editsection { display: none }'
    };

    for (var c in config) {
        if (config[c]) {
            if (Array.isArray(rules[c])) {
                rules[c].forEach(function(rule) { css.insertRule(rule, 0); });
            }
            else css.insertRule(rules[c], 0);
        }
    }

    function styleSheet() {
        var style = document.createElement('style');
        document.head.appendChild(style);
        return style.sheet;
    }

})();
