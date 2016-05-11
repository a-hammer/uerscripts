// ==UserScript==
// @name         Wikipedia - Toggle Sidebar
// @description  Adds a button to hide or show the sidebar. Makes reading easier. Sidebar is hidden by default.
// @version      0.2.3
// @author       Arthur Hammer
// @namespace    https://github.com/arthurhammer
// @license      MIT
// @homepage     https://github.com/arthurhammer/userscripts/tree/master/Wikipedia_ToggleSidebar
// @updateURL    https://github.com/arthurhammer/userscripts/raw/master/Wikipedia_ToggleSidebar/wikipedia_toggle-sidebar.user.js
// @downloadURL  https://github.com/arthurhammer/userscripts/raw/master/Wikipedia_ToggleSidebar/wikipedia_toggle-sidebar.user.js
// @supportURL   https://github.com/arthurhammer/userscripts/issues
// @match        *.wikipedia.org/wiki/*
// @run-at       document-start
// @grant        none
// @noframes
// ==/UserScript==

// Note: Sidebar state is saved per subdomain, i.e. individually for each international Wiki subdomain.

(function() {

  var prefs = {
    hidden: true // Whether to hide sidebar by default
  };

  var sidebarId = 'mw-panel';
  var mainContentId = 'content';
  var toggleId = 'btn-sidebar';
  var sidebarOnClass = 'sidebar-on';
  var storageKey = 'sidebarHidden';

  // Insert CSS as soon as possible to minimize layout jumping
  // (i.e. during document-start instead of setting dynamically after elements load)
  var css =
    'body {                                \
       background-color: white !important; \
     }                                     \
     #content {                            \
       border-color: #ddd;                 \
       border-left-width: 0;               \
       margin-left: 5em;                   \
       margin-right: 5em;                  \
     }                                     \
     #content.sidebar-on {                 \
       margin-left: 10em;                  \
       margin-right: 0em;                  \
     }                                     \
     #mw-panel {                           \
       left: -200px !important;            \
       z-index: 998;                       \
       background-color: white;            \
       transition: .2s ease;               \
     }                                     \
     #mw-panel.sidebar-on {                \
       left: 0 !important;                 \
       transition: .2s ease;               \
     }                                     \
     #btn-sidebar {                        \
       position: absolute;                 \
       top: 0;                             \
       left: 5;                            \
       z-index: 999;                       \
       margin: 10px;                       \
       font-size: 22px;                    \
       opacity: 0.5;                       \
       cursor: pointer;                    \
       transition: all 0.1s;               \
     }                                     \
     #btn-sidebar:hover {                  \
       opacity: 1;                         \
     }                                     \
     #btn-sidebar.sidebar-on {             \
       -transform: rotate(90deg);          \
       -webkit-transform: rotate(90deg);   \
     }';

  document.addEventListener('DOMContentLoaded', init);
  init();   // Listener might never be called, double-check

  function init() {
    addCSS(css);
    addToggle();
    loadSidebar();
    hideSidebar(prefs.hidden);
  }

  function addToggle() {
    if (!document.body || document.getElementById(toggleId)) return;

    var toggle = document.createElement('div');
    toggle.id = toggleId;
    toggle.title = 'Toggle Sidebar';
    toggle.textContent = '▸';

    toggle.addEventListener('click', function() {
      if (hideSidebar(!prefs.hidden)) {
        saveSidebar(!prefs.hidden);
      }
    });

    document.body.insertBefore(toggle, document.body.firstChild);
  }

  function hideSidebar(hide){
    var sidebar = document.getElementById(sidebarId);
    var main = document.getElementById(mainContentId);
    var toggle = document.getElementById(toggleId);
    if (!sidebar || !main || !toggle) return false;

    sidebar.classList.toggle(sidebarOnClass, !hide);
    main.classList.toggle(sidebarOnClass, !hide);
    toggle.classList.toggle(sidebarOnClass, !hide);
    return true;
  }

  function loadSidebar() {
    if (storageAvailable()) {
      var data = localStorage.getItem(storageKey);
      prefs.hidden =
        (data === 'true')  ? true :
        (data === 'false') ? false : prefs.hidden;
    }
  }

  function saveSidebar(hidden) {
    prefs.hidden = hidden;
    if (storageAvailable()) {
      localStorage.setItem(storageKey, hidden);
    }
  }

  // from: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  function storageAvailable(type) {
    try {
      var storage = window[type || 'localStorage'];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    }
    catch(e) {
      return false;
    }
  }

  function addCSS(css) {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    return style.sheet;
  }

})();
