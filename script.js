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
// GOOGLE APPS SCRIPT SUBMISSION
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

function compressImage(file, maxSize = 1600, quality = 0.75) {

    return new Promise(function(resolve, reject) {

        if (!file) {
            reject(new Error("Image file not selected."));
            return;
        }

        const reader = new FileReader();

        reader.onload = function(event) {

            const img = new Image();

            img.onload = function() {

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
                        quality
                    )
                );
            };

            img.onerror = function() {
                reject(new Error("Unable to read image."));
            };

            img.src = event.target.result;
        };

        reader.onerror = function() {
            reject(new Error("Unable to read selected file."));
        };

        reader.readAsDataURL(file);
    });
}


// =====================================================
// SUBMIT MASHAL FORM
// =====================================================

if (mashaalForm) {

    mashaalForm.addEventListener(
        "submit",
        async function(event) {

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
            // FILES
            // ==========================================

            const studentPhotoFile =
                document.getElementById("studentPhoto")
                .files[0];

            const aadhaarFrontFile =
                document.getElementById("aadhaarFront")
                .files[0];

            const aadhaarBackFile =
                document.getElementById("aadhaarBack")
                .files[0];


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


            if (
                !studentPhotoFile ||
                !aadhaarFrontFile ||
                !aadhaarBackFile
            ) {

                showMashaalMessage(
                    "❌ Student Photo, Aadhaar Front और Aadhaar Back तीनों आवश्यक हैं।",
                    "error"
                );

                return;
            }


            // ==========================================
            // DISABLE BUTTON
            // ==========================================

            mashaalSubmit.disabled = true;

            mashaalSubmit.textContent =
                "⏳ फोटो तैयार हो रही है...";


            try {

                // ======================================
                // COMPRESS IMAGES
                // ======================================

                const studentPhoto =
                    await compressImage(
                        studentPhotoFile,
                        1400,
                        0.70
                    );

                const aadhaarFront =
                    await compressImage(
                        aadhaarFrontFile,
                        1600,
                        0.75
                    );

                const aadhaarBack =
                    await compressImage(
                        aadhaarBackFile,
                        1600,
                        0.75
                    );


                mashaalSubmit.textContent =
                    "⏳ फॉर्म जमा हो रहा है...";


                // ======================================
                // CREATE FORM DATA
                // ======================================

                const formData =
                    new URLSearchParams();


                formData.append(
                    "studentName",
                    studentName
                );

                formData.append(
                    "fatherName",
                    fatherName
                );

                formData.append(
                    "motherName",
                    motherName
                );

                formData.append(
                    "className",
                    className
                );

                formData.append(
                    "mobile",
                    mobile
                );

                formData.append(
                    "activity",
                    activity
                );

                formData.append(
                    "details",
                    details
                );

                formData.append(
                    "date",
                    date
                );


                // ======================================
                // IMAGES
                // ======================================

                formData.append(
                    "studentPhoto",
                    studentPhoto
                );

                formData.append(
                    "aadhaarFront",
                    aadhaarFront
                );

                formData.append(
                    "aadhaarBack",
                    aadhaarBack
                );


                // ======================================
                // SEND TO GOOGLE APPS SCRIPT
                // ======================================

                await fetch(
                    MASHAL_SCRIPT_URL,
                    {
                        method: "POST",
                        mode: "no-cors",
                        headers: {
                            "Content-Type":
                                "application/x-www-form-urlencoded"
                        },
                        body: formData.toString()
                    }
                );


                // ======================================
                // SUCCESS MESSAGE
                // ======================================

                showMashaalMessage(
                    "✅ आपका MASHAAL फॉर्म जमा कर दिया गया है।",
                    "success"
                );


                mashaalForm.reset();


                mashaalSubmit.disabled =
                    false;

                mashaalSubmit.textContent =
                    "🔥 मशाल फॉर्म जमा करें";


            } catch (error) {

                console.error(
                    "MASHAL ERROR:",
                    error
                );


                showMashaalMessage(
                    "❌ फॉर्म जमा नहीं हो पाया। कृपया दोबारा प्रयास करें।",
                    "error"
                );


                mashaalSubmit.disabled =
                    false;

                mashaalSubmit.textContent =
                    "🔥 मशाल फॉर्म जमा करें";
            }

        }
    );
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
