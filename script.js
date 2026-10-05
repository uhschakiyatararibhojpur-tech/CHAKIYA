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
// CONVERT IMAGE TO SMALL BASE64 IMAGE
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

                // Resize large images
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

                const base64 =
                    canvas.toDataURL(
                        "image/jpeg",
                        quality
                    );

                resolve(base64);

            };

            img.onerror = function() {

                reject(
                    new Error("Unable to read image.")
                );

            };

            img.src = event.target.result;

        };

        reader.onerror = function() {

            reject(
                new Error("Unable to read selected file.")
            );

        };

        reader.readAsDataURL(file);

    });

}


// =====================================================
// SUBMIT FORM
// =====================================================

if (mashaalForm) {

    mashaalForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            // ==========================================
            // TEXT DATA
            // ==========================================

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
            // IMAGE FILES
            // ==========================================

            const studentPhotoInput =
                document.getElementById("studentPhoto");

            const aadhaarFrontInput =
                document.getElementById("aadhaarFront");

            const aadhaarBackInput =
                document.getElementById("aadhaarBack");


            const studentPhotoFile =
                studentPhotoInput.files[0];

            const aadhaarFrontFile =
                aadhaarFrontInput.files[0];

            const aadhaarBackFile =
                aadhaarBackInput.files[0];


            // ==========================================
            // TEXT VALIDATION
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


            // ==========================================
            // MOBILE VALIDATION
            // ==========================================

            if (!/^[0-9]{10}$/.test(mobile)) {

                showMashaalMessage(
                    "❌ कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।",
                    "error"
                );

                return;
            }


            // ==========================================
            // IMAGE VALIDATION
            // ==========================================

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
            // BUTTON
            // ==========================================

            mashaalSubmit.disabled = true;

            mashaalSubmit.textContent =
                "⏳ फोटो अपलोड हो रही है...";


            try {

                // ======================================
                // CONVERT IMAGES TO BASE64
                // ======================================

                const studentPhoto =
                    await compressImage(
                        studentPhotoFile,
                        1600,
                        0.75
                    );


                const aadhaarFront =
                    await compressImage(
                        aadhaarFrontFile,
                        1800,
                        0.80
                    );


                const aadhaarBack =
                    await compressImage(
                        aadhaarBackFile,
                        1800,
                        0.80
                    );


                mashaalSubmit.textContent =
                    "⏳ जानकारी जमा हो रही है...";


                // ======================================
                // HIDDEN IFRAME
                // ======================================

                const iframe =
                    document.createElement("iframe");

                iframe.name =
                    "mashaalSubmitFrame";

                iframe.style.display =
                    "none";

                document.body.appendChild(iframe);


                // ======================================
                // CREATE POST FORM
                // ======================================

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


                // ======================================
                // ADD FIELD FUNCTION
                // ======================================

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


                // ======================================
                // TEXT DATA
                // ======================================

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


                // ======================================
                // IMAGE DATA
                // ======================================

                addField(
                    "studentPhoto",
                    studentPhoto
                );

                addField(
                    "aadhaarFront",
                    aadhaarFront
                );

                addField(
                    "aadhaarBack",
                    aadhaarBack
                );


                // ======================================
                // ADD FORM TO PAGE
                // ======================================

                document.body.appendChild(
                    submitForm
                );


                // ======================================
                // LISTEN FOR APPS SCRIPT RESPONSE
                // ======================================

                window.addEventListener(
                    "message",
                    function mashaalResponse(event) {

                        if (!event.data)
                            return;

                        if (
                            event.data.status === "success"
                        ) {

                            showMashaalMessage(
                                "✅ आपका MASHAAL फॉर्म सफलतापूर्वक जमा हो गया है।",
                                "success"
                            );

                            mashaalForm.reset();

                            mashaalSubmit.disabled =
                                false;

                            mashaalSubmit.textContent =
                                "🔥 मशाल फॉर्म जमा करें";

                        }

                        else if (
                            event.data.status === "duplicate"
                        ) {

                            showMashaalMessage(
                                "⚠️ यह विद्यार्थी पहले से पंजीकृत है।",
                                "error"
                            );

                            mashaalSubmit.disabled =
                                false;

                            mashaalSubmit.textContent =
                                "🔥 मशाल फॉर्म जमा करें";

                        }

                        else if (
                            event.data.status === "error"
                        ) {

                            showMashaalMessage(
                                "❌ " +
                                event.data.message,
                                "error"
                            );

                            mashaalSubmit.disabled =
                                false;

                            mashaalSubmit.textContent =
                                "🔥 मशाल फॉर्म जमा करें";

                        }

                        window.removeEventListener(
                            "message",
                            mashaalResponse
                        );

                        setTimeout(function() {

                            submitForm.remove();

                            iframe.remove();

                        }, 3000);

                    }
                );


                // ======================================
                // SEND TO GOOGLE APPS SCRIPT
                // ======================================

                submitForm.submit();


            } catch (error) {

                console.error(
                    "MASHAL ERROR:",
                    error
                );

                showMashaalMessage(
                    "❌ फोटो पढ़ने में समस्या हुई। कृपया दोबारा प्रयास करें।",
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
