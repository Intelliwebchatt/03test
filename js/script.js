/*
==============================================
SCRIPT.JS
Global JavaScript for Willow Works
Version: 1.0
Author: Gemini AI for Willow Works
==============================================
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // --- Active Nav Link Highlighter ---
    const currentLocation = window.location.href;
    const navLinks = document.querySelectorAll('.main-nav a');
    const homeLink = document.querySelector('.main-nav a[href="index.html"]');
    let onHomePage = true;

    navLinks.forEach(link => {
        if (link.href === currentLocation) {
            link.classList.add('active');
            onHomePage = false;
        }
    });
    // If no other link is active and we are on index.html
    if (onHomePage && currentLocation.endsWith('index.html')) {
        homeLink.classList.add('active');
    }

    // --- Fade-in elements on scroll ---
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --- PWA Service Worker Registration ---
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                })
                .catch(err => {
                    console.log('ServiceWorker registration failed: ', err);
                });
        });
    }

});
