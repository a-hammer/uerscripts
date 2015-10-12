// ==UserScript==
// @name         IFTTT - Delete Recipes
// @description  Adds option to delete recipes from the main recipe list
// @version      0.0.1
// @author       Arthur Hammer
// @namespace    https://github.com/arthurhammer
// @license      MIT
// @homepage     https://github.com/arthurhammer/userscripts/tree/master/IFTTT_DeleteRecipes
// @updateURL    https://github.com/arthurhammer/userscripts/raw/master/IFTTT_DeleteRecipes/ifttt_delete-recipes.user.js
// @downloadURL  https://github.com/arthurhammer/userscripts/raw/master/IFTTT_DeleteRecipes/ifttt_delete-recipes.user.js
// @supportURL   https://github.com/arthurhammer/userscripts/issues
// @match        https://ifttt.com/myrecipes/personal*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    var recipes = document.getElementsByClassName('personal-recipe-manage');

    for (var i = 0; i < recipes.length; i++) {
        var recipe = recipes[i];
        var container = recipe.getElementsByClassName('personal-recipe-manage_stats_info')[0];
        if (! container) return;

        var deleteLink = document.createElement('a');
        var recipeId = recipe.id.replace('statement_', '');

        deleteLink.href = '/myrecipes/personal/' + recipeId;
        deleteLink.rel = 'nofollow';
        deleteLink.title = 'Delete Recipe';
        deleteLink.textContent = 'Delete';
        deleteLink.setAttribute('data-method', 'delete');
        deleteLink.setAttribute('data-confirm', 'Are you sure you want to delete the recipe?');

        container.insertBefore(deleteLink, container.firstElementChild);
    }

})();
