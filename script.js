// ==UserScript==
// @name         GitHub UX Improvements
// @namespace    https://github.com/
// @version      1.0.3
// @description  Makes the GitHub header fixed to the top of the viewport and adds padding to the main content so nothing is hidden behind it. Adds scroll-to-top and scroll-to-bottom buttons.
// @author       Ernesto Hegi
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

        #gh-scroll-top-btn,
        #gh-scroll-bottom-btn {
            position: fixed;
            right: 24px;
            z-index: 1000;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            border: 1px solid rgba(140, 149, 159, 0.4);
            background-color: #21262d;
            color: #c9d1d9;
            font-size: 18px;
            line-height: 1;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
            transition: opacity 0.2s ease, background-color 0.2s ease;
            opacity: 0.85;
        }

        #gh-scroll-top-btn {
            bottom: 24px;
        }

        #gh-scroll-bottom-btn {
            bottom: 76px;
        }

        #gh-scroll-top-btn:hover,
        #gh-scroll-bottom-btn:hover {
            opacity: 1;
            background-color: #30363d;
        }
    `;

    if (typeof GM_addStyle === 'function') {
        GM_addStyle(css);
    } else {
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }

    let topBtn = null;
    let bottomBtn = null;
    let rafPending = false;

    function ensureButtons() {
        if (!document.getElementById('gh-scroll-top-btn')) {
            topBtn = document.createElement('button');
            topBtn.id = 'gh-scroll-top-btn';
            topBtn.title = 'Scroll to top';
            topBtn.textContent = '↑';
            topBtn.addEventListener('click', function () {
                window.scrollTo(0, 0);
            });
            document.body.appendChild(topBtn);
        } else {
            topBtn = document.getElementById('gh-scroll-top-btn');
        }

        if (!document.getElementById('gh-scroll-bottom-btn')) {
            bottomBtn = document.createElement('button');
            bottomBtn.id = 'gh-scroll-bottom-btn';
            bottomBtn.title = 'Scroll to bottom';
            bottomBtn.textContent = '↓';
            bottomBtn.addEventListener('click', function () {
                window.scrollTo(0, document.body.scrollHeight);
            });
            document.body.appendChild(bottomBtn);
        } else {
            bottomBtn = document.getElementById('gh-scroll-bottom-btn');
        }
    }

    function toggleVisibility() {
        if (!topBtn || !bottomBtn) return;

        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

        topBtn.style.display = scrollY > 200 ? 'flex' : 'none';
        bottomBtn.style.display = (maxScroll - scrollY) > 200 ? 'flex' : 'none';
    }

    // Batch recalculations through rAF so rapid-fire events (resize observer,
    // mutation observer, scroll) don't thrash layout.
    function scheduleToggle() {
        if (rafPending) return;
        rafPending = true;
        requestAnimationFrame(function () {
            rafPending = false;
            toggleVisibility();
        });
    }

    function setup() {
        ensureButtons();
        scheduleToggle();

        // Recalculate whenever the page's layout size actually changes —
        // this catches lazy-loaded images, expanding file trees, etc.,
        // which is what makes button visibility lag on first load.
        const resizeObserver = new ResizeObserver(scheduleToggle);
        resizeObserver.observe(document.documentElement);

        window.addEventListener('scroll', scheduleToggle, { passive: true });
        window.addEventListener('resize', scheduleToggle, { passive: true });

        // GitHub is a Turbo/PJAX-driven SPA: most navigation doesn't reload
        // the page, so re-check (and re-attach buttons if Turbo wiped them)
        // whenever a new "page" is rendered in place.
        document.addEventListener('turbo:load', function () {
            ensureButtons();
            scheduleToggle();
        });
        document.addEventListener('turbo:render', scheduleToggle);
        document.addEventListener('pjax:end', function () {
            ensureButtons();
            scheduleToggle();
        });
    }

    // document-start means body may not exist yet, so wait for it.
    if (document.body) {
        setup();
    } else {
        document.addEventListener('DOMContentLoaded', setup);
    }
})();
