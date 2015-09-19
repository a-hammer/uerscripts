// ==UserScript==
// @name         Wikipedia - Toggle Sidebar
// @description  Adds a small button to hide or show the sidebar. Makes reading easier.
//               (Sidebar is hidden by default. This can be changed in the preferences.)
// @version      0.1.2
// @author       Arthur Hammer
// @namespace    https://github.com/a-hammer
// @license      MIT
// @homepage     https://github.com/a-hammer/uerscripts/tree/master/Wikipedia_ToggleSidebar
// @updateURL    https://github.com/a-hammer/uerscripts/raw/master/Wikipedia_ToggleSidebar/wikipedia_toggle-sidebar.user.js
// @downloadURL  https://github.com/a-hammer/uerscripts/raw/master/Wikipedia_ToggleSidebar/wikipedia_toggle-sidebar.user.js
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

    // Waits for an element with id to arrive. Disconnects after found.
    HTMLElement.prototype.arriveById = function(id, callback) {
        new MutationObserver(function check(mutations, observer) {
            var wanted = document.getElementById(id);
            if (wanted) {
                observer.disconnect();
                callback.call(wanted, wanted);
            }
        })
        .observe(this, { childList: true, subtree: true });
        return this;
    };

    var css = ' \
        body { \
            background-color: white; \
        } \
        #content { \
            border-color: #ddd; \
            border-left-width: 0; \
        } \
        #content.snap-left { \
            margin-left: 5em;    /* TODO: smaller margin for smaller widths */ \
            margin-right: 5em; \
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
        '
    ;

    $('head').append('<style>' + css + '</style>');

    if (prefs.hiddenByDefault) {
        // Hide as soon as elements arrive to avoid layout jumping
        document.body
            .arriveById('mw-panel', function() {
                $(this).hide();
            })
            .arriveById('content', function() {
                $(this).addClass('snap-left');
            });
    }

    // Rest at document ready
    $(document).ready(function() {
        var sidebarToggle = $('<div id="sidebar-toggle" title="Toggle Sidebar">▸<div>'),
            sidebar = $('#mw-panel'),
            mainContent = $('#content');

        // 'document.ready' can fire before 'arriveById'. Double-check.
        if (prefs.hiddenByDefault) {
            sidebar.hide();
            mainContent.addClass('snap-left');
        }
        else {
            sidebarToggle.rotate(90);
        }

        sidebarToggle
            .prependTo(document.body)
            .click(function() {
                $(this).rotate(mainContent.hasClass('snap-left') ? 90 : 0);
                mainContent.toggleClass('snap-left');
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
    });

})(jQuery.noConflict(true));
