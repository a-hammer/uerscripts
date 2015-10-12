// ==UserScript==
// @name         GitHub - Skip Notification Confirmation
// @description  Skips the confirmation dialog when marking all notifications as read on GitHub.
// @version      0.0.1
// @author       Arthur Hammer
// @namespace    https://github.com/arthurhammer
// @license      MIT
// @homepage     https://github.com/arthurhammer/userscripts/tree/master/GitHub_SkipNotificationConfirmation
// @updateURL    https://github.com/arthurhammer/userscripts/raw/master/GitHub_SkipNotificationConfirmation/github_skip-notification-confirmation.user.js
// @downloadURL  https://github.com/arthurhammer/userscripts/raw/master/GitHub_SkipNotificationConfirmation/github_skip-notification-confirmation.user.js
// @supportURL   https://github.com/arthurhammer/userscripts/issues
// @match        https://github.com/notifications
// @match        https://github.com/notifications/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {

    function check() {
        var markRead = document.querySelectorAll('a[href="#mark_as_read_confirm_box"]')[0];
        if (! markRead) return;

        // Don't display confirmation dialog
        markRead.href = '';
        // Submit confirmation dialog on click
        markRead.addEventListener('click', function() {
            var markReadBox = document.getElementById('mark_as_read_confirm_box');
            if (markReadBox) markReadBox.getElementsByTagName('form')[0].submit();
        });
    }

    new MutationObserver(check)
        .observe(document.body, { childList: true, subtree: true });

})();
