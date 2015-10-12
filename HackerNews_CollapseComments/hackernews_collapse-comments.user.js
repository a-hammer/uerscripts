// ==UserScript==
// @name         Hacker News - Collapse Comments
// @description  Adds buttons to collapse and expand comments.
// @version      0.0.1
// @author       Arthur Hammer
// @namespace    https://github.com/arthurhammer
// @license      MIT
// @homepage     https://github.com/arthurhammer/userscripts/tree/master/HackerNews_CollapseComments
// @updateURL    https://github.com/arthurhammer/userscripts/raw/master/HackerNews_CollapseComments/hackernews_collapse-comments.user.js
// @downloadURL  https://github.com/arthurhammer/userscripts/raw/master/HackerNews_CollapseComments/hackernews_collapse-comments.user.js
// @supportURL   https://github.com/arthurhammer/userscripts/issues
// @match        https://news.ycombinator.com/item*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @grant        none
// ==/UserScript==

/**
 * Initially based on a bookmarklet by Alexander Kirk (MIT license).
 * http://alexander.kirk.at/2010/02/16/collapsible-threads-for-hacker-news/
 **/

jQuery(function($) {

    // From: http://stackoverflow.com/a/2117523
    function guid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == "x" ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

    // Here and in the following, "children" denotes a comment's descendants on any level.
    function getChildren(comments) {
        return $(comments).map(function() {
            return $("tr[data-parents~='" + this.id + "']").get();
        });
    }

    function collapse(comment) {
        var children = getChildren(comment);
        $(".votearrow", comment).css("visibility", "hidden");
        $(".us-collapse-btn", comment).text("[+]");
        $(".us-num-children", comment).text("(" + children.length + " child" + (children.length === 1 ? "" : "ren") + ")");
        $(".comment", comment).hide();
        children.hide();
        comment.addClass("us-collapsed");
    }

    function expand(comment) {
        var children = getChildren(comment);
        $(".votearrow", comment).css("visibility", "visible");
        $(".us-collapse-btn", comment).text("[-]");
        $(".us-num-children", comment).text("");
        $(".comment", comment).show();
        // Collapsed children remain collapsed
        children
            .not(getChildren(children.filter(".us-collapsed")))
            .show();
        comment.removeClass("us-collapsed");
    }

    var SINGLE_INDENT = 40;
    var comments = $("body table table tr.athing").slice(1);
    var parents = [];

    $(comments).each(function() {
        var header = $(".comhead", this);
        var id = $("a[href^='item?id=']", header).first();
        var indent = $(".ind > img", this).attr("width");
        var level = Math.floor(indent / SINGLE_INDENT);

        // Collapse button and number of child comments
        header
            .append($("<span class='us-num-children'></span>"))
            .prepend($("<a href='#' class='us-collapse-btn'>[-]</a>")
                 .click(function(e) {
                     e.preventDefault();
                     if (this.hasClass("us-collapsed")) {
                         expand(this);
                     }
                     else {
                         collapse(this);
                     }
                 }.bind($(this)))
            );

        // Fill missing IDs for deleted, flagged comments
        this.id = (id.length === 0) ? guid() : id.attr("href").replace("item?id=", "");

        // Add all ancestors' IDs to comments
        parents[level] = this.id;
        var parentsStr = parents.slice(0, level).join(" ");
        $(this).attr("data-parents", parentsStr);
    });

});
