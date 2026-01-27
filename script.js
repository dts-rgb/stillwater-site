/**
 * Stillwater Landing Page
 * Phone crossfade + rotating subtitle animations
 */

(function() {
    'use strict';

    // ==================
    // Phone Crossfade
    // ==================
    const PHONE_INTERVAL = 1500; // Synced with subtitle

    let phoneIndex = 0;
    let phoneScreens = [];
    let phoneIntervalId = null;

    function initPhoneCrossfade() {
        phoneScreens = document.querySelectorAll('.phone-animated .phone-screen');

        if (phoneScreens.length === 0) return;

        phoneIntervalId = setInterval(nextPhoneScreen, PHONE_INTERVAL);
    }

    function nextPhoneScreen() {
        phoneScreens[phoneIndex].classList.remove('active');
        phoneIndex = (phoneIndex + 1) % phoneScreens.length;
        phoneScreens[phoneIndex].classList.add('active');
    }

    // ==================
    // Rotating Subtitle
    // ==================
    const WORDS = [
        'companion',
        'logbook',
        'bestiary',
        'AI',
        'journal',
        'grandpa',
        'local guide'
    ];
    const WORD_INTERVAL = 1500; // Synced with phones
    const FADE_DURATION = 400; // ms

    let wordIndex = 0;
    let wordElement = null;
    let wordIntervalId = null;

    function initRotatingWord() {
        wordElement = document.getElementById('rotating-word');

        if (!wordElement) return;

        wordIntervalId = setInterval(rotateWord, WORD_INTERVAL);
    }

    function rotateWord() {
        // Fade out
        wordElement.classList.add('fade-out');

        setTimeout(function() {
            // Change word
            wordIndex = (wordIndex + 1) % WORDS.length;
            wordElement.textContent = WORDS[wordIndex];

            // Fade in
            wordElement.classList.remove('fade-out');
            wordElement.classList.add('fade-in');

            setTimeout(function() {
                wordElement.classList.remove('fade-in');
            }, FADE_DURATION);
        }, FADE_DURATION);
    }

    // ==================
    // Visibility Handling
    // ==================
    function handleVisibilityChange() {
        if (document.hidden) {
            if (phoneIntervalId) clearInterval(phoneIntervalId);
            if (wordIntervalId) clearInterval(wordIntervalId);
            phoneIntervalId = null;
            wordIntervalId = null;
        } else {
            if (!phoneIntervalId && phoneScreens.length > 0) {
                phoneIntervalId = setInterval(nextPhoneScreen, PHONE_INTERVAL);
            }
            if (!wordIntervalId && wordElement) {
                wordIntervalId = setInterval(rotateWord, WORD_INTERVAL);
            }
        }
    }

    // ==================
    // Hamburger Menu
    // ==================
    function initHamburgerMenu() {
        var hamburger = document.querySelector('.hamburger');
        var mobileNav = document.querySelector('.mobile-nav');

        if (!hamburger || !mobileNav) return;

        hamburger.addEventListener('click', function() {
            var isActive = hamburger.classList.toggle('active');
            mobileNav.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive);
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu when clicking a link
        mobileNav.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ==================
    // Initialize
    // ==================
    function init() {
        initPhoneCrossfade();
        initRotatingWord();
        initHamburgerMenu();
        document.addEventListener('visibilitychange', handleVisibilityChange);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
