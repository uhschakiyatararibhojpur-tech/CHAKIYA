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
// MASHAL SPORTS 2026 FORM
// =====================================================

// IMPORTANT:
// After deploying your Google Apps Script,
// paste the Web App URL between the quotation marks.

const MASHAL_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyK7eqHdnp4coNtg7KA0hXUU6jVC8rHP0Gh7iBH-XPpFHej-4NwyttUrDhH4055c46t/exec";


const mashaalForm =
    document.getElementById("mashaalForm");

const mashaalMessage =
    document.getElementById("mashaalMessage");

const mashaalSubmit =
    document.getElementById("mashaalSubmit");


// ===============================
// READ IMAGE
// ===============================

function readImage(file) {

    return new Promise(function(resolve, reject) {

        const reader =
            new FileReader();

        reader.onload = function() {

            resolve(reader.result);

        };

        reader.onerror = function() {

            reject(
                "Image could not be read."
            );

        };

        reader.readAsDataURL(file);

    });

}


// ===============================
// MASHAL FORM SUBMIT
// ===============================

if (mashaalForm) {

    mashaalForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            // Check URL

            if (
                !MASHAL_SCRIPT_URL ||
                MASHAL_SCRIPT_URL.includes(
                    "PASTE_YOUR"
                )
            ) {

                alert(
                    "पहले Google Apps Script Web App URL डालें।"
                );

                return;

            }


            // Disable button

            if (mashaalSubmit) {

                mashaalSubmit.disabled = true;

                mashaalSubmit.textContent =
                    "⏳ जानकारी जमा हो रही है...";

            }


            if (mashaalMessage) {

                mashaalMessage.style.display =
                    "none";

            }


            try {

                // =========================
                // GET FILES
                // =========================

                const studentPhoto =
                    document
                        .getElementById(
                            "studentPhoto"
                        )
                        .files[0];


                const aadhaarFront =
                    document
                        .getElementById(
                            "aadhaarFront"
                        )
                        .files[0];


                const aadhaarBack =
                    document
                        .getElementById(
                            "aadhaarBack"
                        )
                        .files[0];


                // =========================
                // READ FILES
                // =========================

                const studentPhotoData =
                    await readImage(
                        studentPhoto
                    );


                const aadhaarFrontData =
                    await readImage(
                        aadhaarFront
                    );


                const aadhaarBackData =
                    await readImage(
                        aadhaarBack
                    );


                // =========================
                // COLLECT FORM DATA
                // =========================

                const data = {

                    studentName:
                        document
                            .getElementById(
                                "studentName"
                            )
                            .value
                            .trim(),

                    motherName:
                        document
                            .getElementById(
                                "motherName"
                            )
                            .value
                            .trim(),

                    fatherName:
                        document
                            .getElementById(
                                "fatherName"
                            )
                            .value
                            .trim(),

                    mobile:
                        document
                            .getElementById(
                                "mobile"
                            )
                            .value
                            .trim(),

                    email:
                        document
                            .getElementById(
                                "email"
                            )
                            .value
                            .trim(),

                    accountNo:
                        document
                            .getElementById(
                                "accountNo"
                            )
                            .value
                            .trim(),

                    ifsc:
                        document
                            .getElementById(
                                "ifsc"
                            )
                            .value
                            .trim()
                            .toUpperCase(),

                    studentPhoto:
                        studentPhotoData,

                    aadhaarFront:
                        aadhaarFrontData,

                    aadhaarBack:
                        aadhaarBackData

                };


                // =========================
                // SEND TO GOOGLE APPS SCRIPT
                // =========================

                const response =
                    await fetch(
                        MASHAL_SCRIPT_URL,
                        {

                            method: "POST",

                            body:
                                JSON.stringify(data)

                        }
                    );


                const result =
                    await response.json();


                // =========================
                // SUCCESS
                // =========================

                if (
                    result.status ===
                    "success"
                ) {

                    if (mashaalMessage) {

                        mashaalMessage.textContent =
                            "✅ " +
                            result.message;

                        mashaalMessage.className =
                            "mashaal-success";

                        mashaalMessage.style.display =
                            "block";

                    }


                    mashaalForm.reset();


                    if (mashaalMessage) {

                        mashaalMessage
                            .scrollIntoView({

                                behavior:
                                    "smooth",

                                block:
                                    "center"

                            });

                    }

                }


                // =========================
                // DUPLICATE
                // =========================

                else if (
                    result.status ===
                    "duplicate"
                ) {

                    if (mashaalMessage) {

                        mashaalMessage.textContent =
                            "⚠️ " +
                            result.message;

                        mashaalMessage.className =
                            "mashaal-error";

                        mashaalMessage.style.display =
                            "block";

                    }

                }


                // =========================
                // ERROR
                // =========================

                else {

                    throw new Error(
                        result.message ||
                        "Submission failed"
                    );

                }

            }


            catch (error) {

                console.error(error);


                if (mashaalMessage) {

                    mashaalMessage.textContent =
                        "❌ जानकारी जमा नहीं हो सकी। कृपया पुनः प्रयास करें।";

                    mashaalMessage.className =
                        "mashaal-error";

                    mashaalMessage.style.display =
                        "block";

                }

            }


            finally {

                if (mashaalSubmit) {

                    mashaalSubmit.disabled =
                        false;

                    mashaalSubmit.textContent =
                        "🏆 MASHAL SPORTS 2026 — जमा करें";

                }

            }

        }

    );

}
