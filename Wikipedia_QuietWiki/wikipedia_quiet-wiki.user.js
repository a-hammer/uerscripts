// ==UserScript==
// @name         Wikipedia - Quiet Wiki
// @description  Makes links stand out less in Wiki articles. Useful if you fall into rabbit holes when you just wanted to focus on a single article.
// @version      0.1.1
// @author       Arthur Hammer
// @namespace    https://github.com/arthurhammer
// @license      MIT
// @homepage     https://github.com/arthurhammer/userscripts/tree/master/Wikipedia_QuietWiki
// @updateURL    https://github.com/arthurhammer/userscripts/raw/master/Wikipedia_QuietWiki/wikipedia_quiet-wiki.user.js
// @downloadURL  https://github.com/arthurhammer/userscripts/raw/master/Wikipedia_QuietWiki/wikipedia_quiet-wiki.user.js
// @supportURL   https://github.com/arthurhammer/userscripts/issues
// @match        *.wikipedia.org/wiki/*
// @exclude      *.wikipedia.org/wiki/Main_Page
// @exclude      *.wikipedia.org/wiki/Wikipedia:Hauptseite
// @run-at       document-end
// @grant        none
// ==/UserScript==

// Note: Besides articles, currently applies to most almost every page on Wikipedia (e.g. discussion pages, portals).

// Example test page: https://en.wikipedia.org/wiki/Malaysia_Airlines_Flight_370

(function() {

  var selectors = {
    link: '#mw-content-text a:link, #mw-content-text a:visited, #mw-content-text a:active, #mw-content-text a:hover',
    cite: '#mw-content-text .reference',
    edit: '.mw-editsection'
  }

  var config = {
    removeLinkColor:     true,   // Make links black
    removeLinkUnderline: true,   // Remove underline when hovering on links
    removeLinkCursor:    false,  // Make pointer cursor when hovering links to default cursor
    smallCitations:      true,   // Make '[1][23][45]' citations to '1 23 45'
    removeCitations:     false,  // Remove citations completely
    removeEditing:       true    // Remove '[edit]' on headings
  };

  var rules = {
    removeLinkColor:      selectors.link + ' { color: inherit; }',
    removeLinkUnderline:  selectors.link + ' { text-decoration: none; }',
    removeLinkCursor:     selectors.link + ' { cursor: text; }',
    smallCitations:       function() {
      var a = document.querySelectorAll(selectors.cite + ' > a');
      for (var i = 0; i < a.length; i++) {
        a[i].textContent = a[i].textContent.replace(/\[/g, ' ').replace(/\]/g, '');
      }
    },
    removeCitations:      selectors.cite + ' { display: none; }',
    removeEditing:        selectors.edit + ' { display: none }'
  };

  var sheet = styleSheet();

  for (var key in config) {
    if (config[key]) {
      var rule = rules[key];
      if (typeof rule === 'string') sheet.insertRule(rule, 0);
      else rule();
    }
  }

  function styleSheet() {
    var style = document.createElement('style');
    document.head.appendChild(style);
    return style.sheet;
  }

})();
