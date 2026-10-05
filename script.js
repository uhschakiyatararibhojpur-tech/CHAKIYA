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
// RELIABLE SUBMISSION SYSTEM
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
// MESSAGE
// =====================================================

function showMashalMessage(message, type) {

    if (!mashaalMessage) return;

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
// COMPRESS IMAGE
// =====================================================

function compressMashalImage(file) {

    return new Promise(function(resolve, reject) {

        if (!file) {
            reject("फोटो आवश्यक है।");
            return;
        }

        const reader = new FileReader();

        reader.onload = function(event) {

            const img = new Image();

            img.onload = function() {

                const maxSize = 900;

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
                        0.55
                    )
                );
            };

            img.onerror = function() {
                reject("फोटो पढ़ी नहीं जा सकी।");
            };

            img.src = event.target.result;
        };

        reader.onerror = function() {
            reject("फोटो पढ़ी नहीं जा सकी।");
        };

        reader.readAsDataURL(file);
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
            // BUTTON
            // -----------------------------------------

            if (mashaalSubmit) {

                mashaalSubmit.disabled = true;

                mashaalSubmit.textContent =
                    "⏳ फोटो तैयार हो रही है...";
            }

            if (mashaalMessage) {
                mashaalMessage.style.display = "none";
            }


            try {

                // -------------------------------------
                // GET FORM VALUES
                // -------------------------------------

                const studentName =
                    document
                        .getElementById("studentName")
                        .value
                        .trim();

                const motherName =
                    document
                        .getElementById("motherName")
                        .value
                        .trim();

                const fatherName =
                    document
                        .getElementById("fatherName")
                        .value
                        .trim();

                const mobile =
                    document
                        .getElementById("mobile")
                        .value
                        .trim();

                const email =
                    document
                        .getElementById("email")
                        .value
                        .trim();

                const accountNo =
                    document
                        .getElementById("accountNo")
                        .value
                        .trim();

                const ifsc =
                    document
                        .getElementById("ifsc")
                        .value
                        .trim()
                        .toUpperCase();


                // -------------------------------------
                // GET PHOTOS
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
                    !studentName ||
                    !motherName ||
                    !fatherName ||
                    !mobile ||
                    !accountNo ||
                    !ifsc
                ) {

                    throw new Error(
                        "कृपया सभी आवश्यक जानकारी भरें।"
                    );
                }


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
                // PHOTO PROCESSING
                // -------------------------------------

                if (mashaalSubmit) {
                    mashaalSubmit.textContent =
                        "⏳ फोटो तैयार हो रही है...";
                }

                const studentPhotoData =
                    await compressMashalImage(
                        studentPhoto
                    );

                const aadhaarFrontData =
                    await compressMashalImage(
                        aadhaarFront
                    );

                const aadhaarBackData =
                    await compressMashalImage(
                        aadhaarBack
                    );


                // -------------------------------------
                // CREATE POST FORM
                // -------------------------------------

                const submitFrame =
                    document.createElement("iframe");

                submitFrame.name =
                    "mashalHiddenFrame";

                submitFrame.style.display = "none";

                document.body.appendChild(
                    submitFrame
                );


                const submitForm =
                    document.createElement("form");

                submitForm.method = "POST";

                submitForm.action =
                    MASHAL_SCRIPT_URL;

                submitForm.target =
                    "mashalHiddenFrame";

                submitForm.style.display = "none";


                // -------------------------------------
                // ADD FIELD FUNCTION
                // -------------------------------------

                function addMashalField(
                    name,
                    value
                ) {

                    const input =
                        document.createElement("input");

                    input.type = "hidden";

                    input.name = name;

                    input.value = value || "";

                    submitForm.appendChild(
                        input
                    );
                }


                // -------------------------------------
                // TEXT FIELDS
                // -------------------------------------

                addMashalField(
                    "studentName",
                    studentName
                );

                addMashalField(
                    "motherName",
                    motherName
                );

                addMashalField(
                    "fatherName",
                    fatherName
                );

                addMashalField(
                    "mobile",
                    mobile
                );

                addMashalField(
                    "email",
                    email
                );

                addMashalField(
                    "accountNo",
                    accountNo
                );

                addMashalField(
                    "ifsc",
                    ifsc
                );


                // -------------------------------------
                // PHOTO FIELDS
                // -------------------------------------

                addMashalField(
                    "studentPhoto",
                    studentPhotoData
                );

                addMashalField(
                    "aadhaarFront",
                    aadhaarFrontData
                );

                addMashalField(
                    "aadhaarBack",
                    aadhaarBackData
                );


                document.body.appendChild(
                    submitForm
                );


                // -------------------------------------
                // SUBMIT
                // -------------------------------------

                if (mashaalSubmit) {
                    mashaalSubmit.textContent =
                        "⏳ जानकारी जमा हो रही है...";
                }

                submitForm.submit();


                // -------------------------------------
                // WAIT FOR GOOGLE
                // -------------------------------------

                setTimeout(function() {

                    showMashalMessage(
                        "✅ आपका फॉर्म Google Server पर भेज दिया गया है। कृपया कुछ क्षण प्रतीक्षा करें।",
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

                        submitForm.remove();

                        submitFrame.remove();

                    }, 5000);

                }, 6000);


            } catch (error) {

                console.error(
                    "MASHAL ERROR:",
                    error
                );


                showMashalMessage(
                    "❌ " +
                    (
                        error.message ||
                        error ||
                        "फॉर्म जमा नहीं हो सका।"
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

