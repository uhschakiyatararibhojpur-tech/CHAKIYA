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


// ===============================
// CLOSE MOBILE MENU AFTER CLICK
// ===============================

document
    .querySelectorAll(".nav-container a")
    .forEach(function(link) {

        link.addEventListener("click", function() {

            const navbar =
                document.getElementById("navbar");

            if (navbar) {

                navbar.classList.remove("active");

            }

        });

    });


// ===============================
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
// =====================================================
// MASHAAL FORM 2026
// FRESH GOOGLE SHEET SUBMISSION
// =====================================================

const MASHAL_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxcxbzLfekECbnLRX6uM83dHCD8moXV4bwvMDgkEWjoJPBZN7skJz1OQd8S47NyxITf/exec";


const mashaalForm =
    document.getElementById("mashaalForm");

const mashaalMessage =
    document.getElementById("mashaalMessage");

const mashaalSubmit =
    document.getElementById("mashaalSubmit");


// =====================================================
// SUBMIT
// =====================================================

if (mashaalForm) {

    mashaalForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const studentName =
            document.getElementById("studentName")
            .value.trim();

        const fatherName =
            document.getElementById("fatherName")
            .value.trim();

        const motherName =
            document.getElementById("motherName")
            .value.trim();

        const className =
            document.getElementById("className")
            .value;

        const mobile =
            document.getElementById("mobile")
            .value.trim();

        const activity =
            document.getElementById("activity")
            .value;

        const details =
            document.getElementById("details")
            .value.trim();

        const date =
            document.getElementById("date")
            .value;


        // ==========================================
        // VALIDATION
        // ==========================================

        if (
            !studentName ||
            !fatherName ||
            !motherName ||
            !className ||
            !mobile ||
            !activity ||
            !date
        ) {

            showMashaalMessage(
                "❌ कृपया सभी आवश्यक जानकारी भरें।",
                "error"
            );

            return;
        }


        if (!/^[0-9]{10}$/.test(mobile)) {

            showMashaalMessage(
                "❌ कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।",
                "error"
            );

            return;
        }


        // ==========================================
        // BUTTON
        // ==========================================

        mashaalSubmit.disabled = true;

        mashaalSubmit.textContent =
            "⏳ जानकारी जमा हो रही है...";


        // ==========================================
        // HIDDEN IFRAME
        // ==========================================

        const iframe =
            document.createElement("iframe");

        iframe.name =
            "mashaalSubmitFrame";

        iframe.style.display =
            "none";

        document.body.appendChild(iframe);


        // ==========================================
        // FORM
        // ==========================================

        const submitForm =
            document.createElement("form");

        submitForm.method =
            "POST";

        submitForm.action =
            MASHAL_SCRIPT_URL;

        submitForm.target =
            "mashaalSubmitFrame";

        submitForm.style.display =
            "none";


        // ==========================================
        // ADD FIELD
        // ==========================================

        function addField(name, value) {

            const input =
                document.createElement("input");

            input.type =
                "hidden";

            input.name =
                name;

            input.value =
                value || "";

            submitForm.appendChild(input);
        }


        // ==========================================
        // ADD DATA
        // ==========================================

        addField(
            "studentName",
            studentName
        );

        addField(
            "fatherName",
            fatherName
        );

        addField(
            "motherName",
            motherName
        );

        addField(
            "className",
            className
        );

        addField(
            "mobile",
            mobile
        );

        addField(
            "activity",
            activity
        );

        addField(
            "details",
            details
        );

        addField(
            "date",
            date
        );


        document.body.appendChild(
            submitForm
        );


        // ==========================================
        // SEND
        // ==========================================

        submitForm.submit();


        // ==========================================
        // SUCCESS
        // ==========================================

        setTimeout(function() {

            showMashaalMessage(
                "✅ आपका MASHAAL फॉर्म सफलतापूर्वक जमा हो गया है।",
                "success"
            );


            mashaalForm.reset();


            mashaalSubmit.disabled =
                false;

            mashaalSubmit.textContent =
                "🔥 मशाल फॉर्म जमा करें";


            setTimeout(function() {

                submitForm.remove();

                iframe.remove();

            }, 3000);


        }, 3000);

    });

}


// =====================================================
// MESSAGE
// =====================================================

function showMashaalMessage(
    message,
    type
) {

    if (!mashaalMessage)
        return;


    mashaalMessage.textContent =
        message;


    mashaalMessage.className =
        type === "success"
            ? "mashaal-success"
            : "mashaal-error";


    mashaalMessage.style.display =
        "block";


    mashaalMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}
