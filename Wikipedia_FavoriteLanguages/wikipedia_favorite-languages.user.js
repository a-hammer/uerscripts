// ==UserScript==
// @name         Wikipedia - Favorite Languages
// @description  Easily access Wikipedia pages in your favorite languages. Setup languages below.
// @version      0.1.2
// @author       Arthur Hammer
// @namespace    https://github.com/arthurhammer
// @license      MIT
// @homepage     https://github.com/arthurhammer/userscripts/master/Wikipedia_FavoriteLanguages
// @updateURL    https://github.com/arthurhammer/userscripts/raw/master/Wikipedia_FavoriteLanguages/wikipedia_favorite-languages.user.js
// @downloadURL  https://github.com/arthurhammer/userscripts/raw/master/Wikipedia_FavoriteLanguages/wikipedia_favorite-languages.user.js
// @supportURL   https://github.com/arthurhammer/userscripts/issues
// @match        http*://*.wikipedia.org/wiki/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {

  // Add language codes for favorite languages here.
  // Example: Use 'en' for the English Wikipedia https://en.wikipedia.org
  // For a list of Wikipedia languages see: https://en.wikipedia.org/wiki/List_of_Wikipedias
  var languages = ['en', 'de'];

  var languageSelectorPrefix = '.interlanguage-link.interwiki-';

  // Makes room before main heading to avoid layout jumping during load
  var css =
    '#firstHeading {        \
      margin-top: 22px;     \
    }                       \
    #fav-langs {            \
      list-style: none;     \
      font-size: 12px;      \
      margin-left: 0px;     \
      margin-bottom: -18px; \
    }                       \
    .fav-lang {             \
      display: inline;      \
      margin-right: 8px;    \
    }';

  addCSS(css);
  addFavLanguages();
  document.addEventListener('DOMContentLoaded', addFavLanguages);

  function addFavLanguages() {
    if (!document.body || document.getElementById('fav-langs')) return;

    var heading = document.getElementById('firstHeading');
    var langList = document.createElement('ul');
    langList.id = 'fav-langs';

    languages.forEach(function(language) {
      var langElement = document.querySelector(languageSelectorPrefix + language);
      if (langElement) {
        langElement = langElement.cloneNode(true);
        langElement.classList.add('fav-lang');
        langList.appendChild(langElement);
      }
    });

    if (heading && langList.childElementCount > 0) {
      heading.parentElement.insertBefore(langList, heading);
    }
  }

  function addCSS(css) {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

})();
