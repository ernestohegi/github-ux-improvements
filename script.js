// ==UserScript==
// @name         GitHub Sticky Header
// @namespace    https://github.com/
// @version      1.0.0
// @description  Makes the GitHub header fixed to the top of the viewport and adds padding to the main content so nothing is hidden behind it.
// @author       Ernesto
// @match        https://github.com/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==
 
(function () {
    'use strict';
 
    const css = `
        .application-main {
            padding-top: 100px;
        }
 
        .header-wrapper {
            position: fixed !important;
            top: 0;
            z-index: 1000;
            width: 100%;
        }
    `;
 
    if (typeof GM_addStyle === 'function') {
        GM_addStyle(css);
    } else {
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }
})();
