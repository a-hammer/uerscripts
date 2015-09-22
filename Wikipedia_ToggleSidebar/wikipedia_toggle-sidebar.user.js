// ==UserScript==
// @name         Wikipedia - Toggle Sidebar
// @description  Adds a small button to hide or show the sidebar. Makes reading easier.
// @version      0.1.2
// @author       Arthur Hammer
// @namespace    https://github.com/a-hammer
// @license      MIT
// @homepage     https://github.com/a-hammer/userscripts/tree/master/Wikipedia_ToggleSidebar
// @updateURL    https://github.com/a-hammer/userscripts/raw/master/Wikipedia_ToggleSidebar/wikipedia_toggle-sidebar.user.js
// @downloadURL  https://github.com/a-hammer/userscripts/raw/master/Wikipedia_ToggleSidebar/wikipedia_toggle-sidebar.user.js
// @match        *.wikipedia.org/wiki/*
// @run-at       document-body
// @grant        none
// ==/UserScript==

(function() {

    var prefs = {
        hiddenByDefault: true
    };

    function rotate(element, degrees) {
        var rotation = 'rotate(' + degrees + 'deg)';
        element.style.WebkitTransform = rotation;
        element.style.transform = rotation;
    }

    function addCSS(css) {
        var style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }

    var css = '\
        body { \
            background-color: white; \
        } \
        #content { \
            border-color: #ddd; \
            border-left-width: 0; \
        } \
        #content { \
            margin-left: 5em;    /* TODO: smaller margin for smaller widths */ \
            margin-right: 5em; \
        } \
        #content.with-sidebar { \
            margin-left: 10em; \
            margin-right: 0em; \
        } \
        #mw-panel { \
            display: none; \
        } \
        #sidebar-toggle { \
            position: absolute; \
            top: 0; \
            left: 5; \
            z-index: 999; \
            padding: 10px; \
            font-size: 20px; \
            opacity: 0.5; \
            cursor: pointer; \
            transition: all 0.1s; \
        } \
        #sidebar-toggle:hover { \
            font-size: 23px; \
            opacity: 1; \
            top: -2px; \
        } \
    ';

    addCSS(css);

    document.addEventListener('DOMContentLoaded', function() {
        var sidebarToggle = document.createElement('div'),
            sidebar = document.getElementById('mw-panel'),
            mainContent = document.getElementById('content');

        sidebar.style.display = 'none';  // Seems to be undefined initially

        sidebarToggle.id = 'sidebar-toggle';
        sidebarToggle.title = 'Toggle Sidebar';
        sidebarToggle.textContent = '▸';

        sidebarToggle.addEventListener('click', function() {
            rotate(sidebarToggle, mainContent.classList.contains('with-sidebar') ? 0 : 90);
            mainContent.classList.toggle('with-sidebar');
            sidebar.style.display = (sidebar.style.display === 'none') ? 'block' : 'none';
        });

        if (! prefs.hiddenByDefault) sidebarToggle.click();

        document.body.insertBefore(sidebarToggle, document.body.firstElementChild);
    });

})();
