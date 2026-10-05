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
// MASHAL SPORTS 2026
// NEW SIMPLE SUBMISSION SYSTEM
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
// COMPRESS IMAGE
// =====================================================

function compressImage(file) {

    return new Promise(function(resolve, reject) {

        if (!file) {
            reject("Photo is required.");
            return;
        }

        const reader = new FileReader();

        reader.onload = function(event) {

            const img = new Image();

            img.onload = function() {

                const maxSize = 1200;

                let width = img.width;
                let height = img.height;

                if (width > maxSize || height > maxSize) {

                    if (width > height) {

                        height =
                            Math.round(
                                height * maxSize / width
                            );

                        width = maxSize;

                    } else {

                        width =
                            Math.round(
                                width * maxSize / height
                            );

                        height = maxSize;

                    }

                }

                const canvas =
                    document.createElement("canvas");

                canvas.width = width;
                canvas.height = height;

                const ctx =
                    canvas.getContext("2d");

                ctx.drawImage(
                    img,
                    0,
                    0,
                    width,
                    height
                );

                resolve(
                    canvas.toDataURL(
                        "image/jpeg",
                        0.70
                    )
                );

            };

            img.onerror = function() {
                reject("Image could not be processed.");
            };

            img.src = event.target.result;

        };

        reader.onerror = function() {
            reject("Image could not be read.");
        };

        reader.readAsDataURL(file);

    });

}


// =====================================================
// SHOW MESSAGE
// =====================================================

function showMashalMessage(message, type) {

    if (!mashaalMessage) {
        return;
    }

    mashaalMessage.textContent = message;

    mashaalMessage.className =
        type === "success"
            ? "mashaal-success"
            : "mashaal-error";

    mashaalMessage.style.display = "block";

    mashaalMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


// =====================================================
// MASHAL FORM
// =====================================================

if (mashaalForm) {

    mashaalForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            // -----------------------------------------
            // DISABLE BUTTON
            // -----------------------------------------

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

                // -------------------------------------
                // GET FILES
                // -------------------------------------

                const studentPhoto =
                    document
                        .getElementById("studentPhoto")
                        .files[0];

                const aadhaarFront =
                    document
                        .getElementById("aadhaarFront")
                        .files[0];

                const aadhaarBack =
                    document
                        .getElementById("aadhaarBack")
                        .files[0];


                if (
                    !studentPhoto ||
                    !aadhaarFront ||
                    !aadhaarBack
                ) {

                    throw new Error(
                        "कृपया तीनों फोटो अपलोड करें।"
                    );

                }


                // -------------------------------------
                // COMPRESS PHOTOS
                // -------------------------------------

                const studentPhotoData =
                    await compressImage(
                        studentPhoto
                    );

                const aadhaarFrontData =
                    await compressImage(
                        aadhaarFront
                    );

                const aadhaarBackData =
                    await compressImage(
                        aadhaarBack
                    );


                // -------------------------------------
                // CREATE HIDDEN IFRAME
                // -------------------------------------

                const frame =
                    document.createElement("iframe");

                frame.name =
                    "mashalSubmitFrame";

                frame.style.display = "none";

                document.body.appendChild(frame);


                // -------------------------------------
                // CREATE FORM
                // -------------------------------------

                const form =
                    document.createElement("form");

                form.method = "POST";

                form.action =
                    MASHAL_SCRIPT_URL;

                form.target =
                    "mashalSubmitFrame";

                form.style.display = "none";


                // -------------------------------------
                // ADD FIELD
                // -------------------------------------

                function addField(name, value) {

                    const input =
                        document.createElement("input");

                    input.type = "hidden";

                    input.name = name;

                    input.value = value || "";

                    form.appendChild(input);

                }


                // -------------------------------------
                // TEXT DATA
                // -------------------------------------

                addField(
                    "studentName",
                    document
                        .getElementById("studentName")
                        .value
                        .trim()
                );

                addField(
                    "motherName",
                    document
                        .getElementById("motherName")
                        .value
                        .trim()
                );

                addField(
                    "fatherName",
                    document
                        .getElementById("fatherName")
                        .value
                        .trim()
                );

                addField(
                    "mobile",
                    document
                        .getElementById("mobile")
                        .value
                        .trim()
                );

                addField(
                    "email",
                    document
                        .getElementById("email")
                        .value
                        .trim()
                );

                addField(
                    "accountNo",
                    document
                        .getElementById("accountNo")
                        .value
                        .trim()
                );

                addField(
                    "ifsc",
                    document
                        .getElementById("ifsc")
                        .value
                        .trim()
                        .toUpperCase()
                );


                // -------------------------------------
                // PHOTO DATA
                // -------------------------------------

                addField(
                    "studentPhoto",
                    studentPhotoData
                );

                addField(
                    "aadhaarFront",
                    aadhaarFrontData
                );

                addField(
                    "aadhaarBack",
                    aadhaarBackData
                );


                document.body.appendChild(form);


                // -------------------------------------
                // SUBMIT
                // -------------------------------------

                form.submit();


                // -------------------------------------
                // SHOW SUCCESS
                // -------------------------------------

                setTimeout(function() {

                    showMashalMessage(
                        "✅ MASHAL SPORTS 2026 का विवरण सफलतापूर्वक जमा कर दिया गया है।",
                        "success"
                    );

                    mashaalForm.reset();

                    if (mashaalSubmit) {

                        mashaalSubmit.disabled =
                            false;

                        mashaalSubmit.textContent =
                            "🏆 MASHAL SPORTS 2026 — जमा करें";

                    }

                    setTimeout(function() {

                        form.remove();
                        frame.remove();

                    }, 3000);

                }, 4000);


            } catch (error) {

                console.error(error);


                showMashalMessage(
                    "❌ " +
                    (
                        error.message ||
                        "जानकारी जमा नहीं हो सकी। कृपया पुनः प्रयास करें।"
                    ),
                    "error"
                );


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
