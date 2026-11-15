
// =====================================
// CHAKIYA SCHOOL WEBSITE - SCRIPT.JS
// =====================================

// MOBILE MENU
function toggleMenu() {
    const navbar = document.getElementById("navbar");

    if (navbar) {
        navbar.classList.toggle("active");
    }
}


// UPDATE FOOTER YEAR
document.addEventListener("DOMContentLoaded", function () {
    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});


// NOTICE TICKER
document.addEventListener("DOMContentLoaded", function () {
    const tickerText = document.getElementById("tickerText");

    if (tickerText) {
        // Keep the existing ticker content unchanged.
        // Add ticker functionality here only if required.
    }
});


// BACK TO TOP BUTTON
document.addEventListener("DOMContentLoaded", function () {
    const backToTop = document.getElementById("backToTop");

    if (!backToTop) return;

    window.addEventListener("scroll", function () {
        backToTop.style.display =
            window.scrollY > 300 ? "block" : "none";
    });

    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});


// CLOSE MOBILE MENU AFTER NAVIGATION
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("navbar");

    if (!navbar) return;

    navbar.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            if (window.innerWidth <= 700) {
                navbar.classList.remove("active");
            }
        });
    });
});


// FADE-IN ANIMATION
document.addEventListener("DOMContentLoaded", function () {
    const fadeElements = document.querySelectorAll(".fade-in");

    if (!("IntersectionObserver" in window)) {
        fadeElements.forEach(element => {
            element.classList.add("visible");
        });
        return;
    }

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(function (element) {
        observer.observe(element);
    });
});


// SCROLL REVEAL ANIMATION
document.addEventListener("DOMContentLoaded", function () {
    const revealElements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
        revealElements.forEach(element => {
            element.classList.add("active");
        });
        return;
    }

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });
});
