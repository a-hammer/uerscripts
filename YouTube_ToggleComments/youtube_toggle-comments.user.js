// ==UserScript==
// @name         YouTube - Toggle Comments
// @description  Adds a button to hide/show comments on YouTube videos. Hides comments by default.
// @version      0.0.3
// @author       Arthur Hammer
// @namespace    https://github.com/arthurhammer
// @license      MIT
// @homepage     https://github.com/arthurhammer/userscripts/tree/master/YouTube_ToggleComments
// @updateURL    https://github.com/arthurhammer/userscripts/raw/master/YouTube_ToggleComments/youtube_toggle-comments.user.js
// @downloadURL  https://github.com/arthurhammer/userscripts/raw/master/YouTube_ToggleComments/youtube_toggle-comments.user.js
// @supportURL   https://github.com/arthurhammer/userscripts/issues
// @match        https://www.youtube.com/watch?v=*
// @run-at       document-body
// @grant        none
// @noframes
// ==/UserScript==

(function() {

  var config = {
    hidden: true,
    css:
      '#comments-toggle-btn {      \
        color: #767676;            \
        cursor: pointer;           \
        font-size: 11px;           \
        font-weight: 500;          \
        text-transform: uppercase; \
      }                            \
      #comments-toggle-btn:hover { \
        color: #222;               \
      }',
    buttonId: 'comments-toggle-btn',
    commentsHeaderClass: 'comment-section-header-renderer',
    commentsSelector: '#comment-section-renderer > *:not(.comment-section-header-renderer)'
  };

  function toggle(el, hide) {
    if (!el) return;
    el.style.display = hide ? 'none' : '';
  }

  function addCSS(css) {
    var style = document.createElement('style');
    style.type = "text/css";
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }

  function addToggleButton(target) {
    var button = document.getElementById(config.buttonId);
    if (button) return;

    button = document.createElement('button');
    button.id = config.buttonId;
    button.textContent = 'Show Less';
    button.addEventListener('click', function(e) {
      e.preventDefault();

      var hide = button.textContent === 'Show Less';
      button.textContent = hide ? 'Show More' : 'Show Less';
      var comments = document.querySelectorAll(config.commentsSelector);
      for (var i = 0; i < comments.length; i++) toggle(comments[i], hide);
    });

    target.appendChild(button);
    if (config.hidden) button.click();
  }

  var observer = new MutationObserver(function() {
    var commentsHeader = document.getElementsByClassName(config.commentsHeaderClass)[0];
    if (commentsHeader) {
      addToggleButton(commentsHeader);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
  addCSS(config.css);

})();
