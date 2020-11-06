/*!
 * seo-tabs.js - v@version@
 * Lightweight SEO friendly tab control written in pure JavaScript
 * https://github.com/john-doherty/seo-tabs
 * @author John Doherty <www.johndoherty.info>
 * @license MIT
 */
(function (window, document) {

    // check if we're using a touch screen
    var isTouch = (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));

    function init() {
        var tabs = Array.prototype.slice.call(document.querySelectorAll('[data-seo-tabs="true"]'));

        for (var i = 0, l = tabs.length; i < l; i++) {
            tabs[i].addEventListener(isTouch ? 'touchend' : 'click', switchTab);
        }
    }

    function switchTab(e) {

        var el = e.target;
        var isAnchor = (el.tagName === 'A');
        var isTabTop = (el.getAttribute('data-tabtop') === 'true');

        if (isAnchor && isTabTop) {

            // allow tabs to change the browser URL hash
            if (el.parentElement && el.parentElement.getAttribute('data-hashable') !== 'true') {
                cancelEvent(e);
            }

            // get the id of the box we need to show
            var tabBoxId = el.href.split("#").pop();

            // get the box to activate
            var tabBoxToActivate = document.getElementById(tabBoxId);

            // check if it is currently active
            var isActive = (tabBoxToActivate.getAttribute('data-active') === 'true');

            if (!isActive) {

                // get currently active elements
                var currentlyActive = el.parentElement.querySelectorAll('[data-active="true"]');

                // clear them
                for (var i = 0, l = currentlyActive.length; i < l; i++) {
                    currentlyActive[i].removeAttribute('data-active', false);
                }

                // set new items to active
                el.setAttribute('data-active', 'true');
                tabBoxToActivate.setAttribute('data-active', 'true');
            }

            console.log(tabBoxId);
        }
    }

    /**
    * Cancels the current event
    * @param {object} e - browser event object
    * @returns {void}
    */
    function cancelEvent(e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        e.stopPropagation();
    }

    window.addEventListener('DOMContentLoaded', init);

}(window, document));
