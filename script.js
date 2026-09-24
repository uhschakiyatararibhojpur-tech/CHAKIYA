// ===============================
// MOBILE MENU
// ===============================

function toggleMenu() {

    const navbar = document.getElementById("navbar");

    navbar.classList.toggle("active");

}


// ===============================
// CURRENT YEAR
// ===============================

document.getElementById("year").textContent =
    new Date().getFullYear();


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

const ticker = document.getElementById("tickerText");

setInterval(function () {

    noticeIndex++;

    if (noticeIndex >= notices.length) {
        noticeIndex = 0;
    }

    ticker.style.opacity = "0";

    setTimeout(function () {

        ticker.textContent = notices[noticeIndex];
        ticker.style.opacity = "1";

    }, 300);

}, 4000);


// ===============================
// BACK TO TOP
// ===============================

const topButton = document.getElementById("topButton");

window.addEventListener("scroll", function () {

    if (window.scrollY > 400) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }

});


function scrollToTop() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ===============================
// CLOSE MOBILE MENU AFTER CLICK
// ===============================

document.querySelectorAll(".nav-container a").forEach(function(link) {

    link.addEventListener("click", function() {

        document.getElementById("navbar")
            .classList.remove("active");

    });

});


// ===============================
// FADE-IN ANIMATION
// ===============================

const observer = new IntersectionObserver(
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


document.querySelectorAll(
    ".academic-card, .staff-card, .facility-card, .notice-item, .contact-card"
).forEach(function(element) {

    element.classList.add("fade-element");

    observer.observe(element);

});