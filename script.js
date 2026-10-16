// ===============================
// MOBILE MENU
// ===============================

function toggleMenu() {

    const navbar = document.getElementById("navbar");

    if (navbar) {
        navbar.classList.toggle("active");
    }

}


// ===============================
// CURRENT YEAR
// ===============================

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


// ===============================
// NOTICE TICKER
// ===============================

const notices = [

    "विद्यालय की नवीनतम सूचनाओं के लिए Notice Section देखें।",

    "विद्यार्थी नियमित रूप से विद्यालय की सूचना पट्ट देखें।",

    "विद्यालय में शैक्षणिक एवं सह-शैक्षणिक गतिविधियाँ संचालित हैं।",

    "Admission एवं अन्य जानकारी के लिए विद्यालय कार्यालय से संपर्क करें।"

];

let noticeIndex = 0;

const ticker =
    document.getElementById("tickerText");

if (ticker) {

    setInterval(function () {

        noticeIndex++;

        if (noticeIndex >= notices.length) {
            noticeIndex = 0;
        }

        ticker.style.opacity = "0";

        setTimeout(function () {

            ticker.textContent =
                notices[noticeIndex];

            ticker.style.opacity = "1";

        }, 300);

    }, 4000);

}


// ===============================
// BACK TO TOP
// ===============================

const topButton =
    document.getElementById("topButton");

if (topButton) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {

            topButton.style.display = "block";

        } else {

            topButton.style.display = "none";

        }

    });

}


function scrollToTop() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}



// CLOSE MOBILE MENU ONLY AFTER A REAL NAVIGATION
document
    .querySelectorAll(".nav-container a")
    .forEach(function (link) {
        link.addEventListener("click", function () {
            // Do not close the menu when Academics is tapped
            if (link.id === "academicsToggle") {
                return;
            }

            // Do not close the menu when a dropdown option is tapped
            if (link.classList.contains("dropdown-option")) {
                return;
            }

            const navbar = document.getElementById("navbar");

            if (navbar) {
                navbar.classList.remove("active");
            }
        });
    });

// FADE-IN ANIMATION
// ===============================

const observer =
    new IntersectionObserver(

        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },

        {
            threshold: 0.12
        }

    );


document
    .querySelectorAll(
        ".academic-card, .staff-card, .facility-card, .notice-item, .contact-card"
    )
    .forEach(function(element) {

        element.classList.add("fade-element");

        observer.observe(element);

    });



/* CHAKIYA BACKEND TEST
   Disabled because /api/test currently returns 404.
   This test is not required to display website notices.
*/

// Re-enable after confirming the backend test route exists.

/* =========================================
   CHAKIYA SCROLL REVEAL
   Add at the bottom of script.js
   ========================================= */

(function () {
    function initChakScrollReveal() {
        const selectors = [
            ".academic-card",
            ".staff-card",
            ".facility-card",
            ".notice-card",
            ".gallery-item",
            ".info-card"
        ];

        const elements = document.querySelectorAll(selectors.join(","));

        if (!elements.length) return;

        /* Show everything if animation is unsupported
           or the visitor prefers reduced motion. */
        if (
            !("IntersectionObserver" in window) ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("chak-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        elements.forEach(function (element) {
            element.classList.add("chak-reveal");
            observer.observe(element);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initChakScrollReveal
        );
    } else {
        initChakScrollReveal();
    }
})();
