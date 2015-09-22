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
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @run-at       document-body
// @grant        none
// ==/UserScript==

(function($) {

    var prefs = {
        hiddenByDefault: true
    };

    $.fn.rotate = function(degrees) {
        var rotation = 'rotate(' + degrees + 'deg)';
        $(this).css({
            '-webkit-transform': rotation,
            '-moz-transform':    rotation,
            '-ms-transform':     rotation,
            'transform':         rotation
        });
        return $(this);
    };

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
        }';

    $('head').append('<style>' + css + '</style>');

    $(document).ready(function() {
        var sidebarToggle = $('<div id="sidebar-toggle" title="Toggle Sidebar">▸<div>'),
            sidebar = $('#mw-panel'),
            mainContent = $('#content');

        sidebarToggle
            .prependTo(document.body)
            .click(function() {
                $(this).rotate(mainContent.hasClass('with-sidebar') ? 0 : 90);
                mainContent.toggleClass('with-sidebar');
                sidebar.toggle();
            })
            .hover(
                function() {
                    $(this).animate({
                        'font-size': '23px',
                         top: -2,
                         opacity: 1
                     }, { duration: 20 });
                },
                function() {
                    $(this).animate({
                        'font-size': '20px',
                         top: 0,
                         opacity: 0.5
                    }, { duration: 20 });
                }
            );

        if (! prefs.hiddenByDefault) sidebarToggle.click();
    });

})(jQuery.noConflict(true));
