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
// SIMPLE TEXT-ONLY REGISTRATION
// GOOGLE APPS SCRIPT
// =====================================================

const MASHAL_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxwAEcTidIaxR7o-KZpVIWetFDI57BpUVUUeOMz6mIoZwcoltidCbDcBYutHK4ouG9a/exec";


const mashaalForm =
    document.getElementById("mashaalForm");


const mashaalMessage =
    document.getElementById("mashaalMessage");


const mashaalSubmit =
    document.getElementById("mashaalSubmit");
function fileToBase64(file) {
    return new Promise(function(resolve, reject) {

        const reader = new FileReader();

        reader.onload = function() {
            resolve(reader.result);
        };

        reader.onerror = function(error) {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
}


// =====================================================
// SHOW MESSAGE
// =====================================================

function showMashaalMessage(message, type) {

    if (!mashaalMessage) {
        return;
    }

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
// MASHAL FORM SUBMISSION
// =====================================================

if (mashaalForm) {

    mashaalForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const studentName =
            document.getElementById("studentName").value.trim();

        const fatherName =
            document.getElementById("fatherName").value.trim();

        const motherName =
            document.getElementById("motherName").value.trim();

        const className =
            document.getElementById("className").value.trim();

        const mobile =
            document.getElementById("mobile").value.trim();

        const activity =
            document.getElementById("activity").value.trim();

        const accountNumber =
            document.getElementById("accountNumber").value.trim();

        const ifsc =
            document.getElementById("ifsc").value.trim();
        const studentPhoto =
    document.getElementById("studentPhoto").files[0];

const aadhaarFront =
    document.getElementById("aadhaarFront").files[0];

const aadhaarBack =
    document.getElementById("aadhaarBack").files[0];


        // VALIDATION
        if (
            !studentName ||
            !fatherName ||
            !motherName ||
            !className ||
            !mobile ||
            !activity ||
            !accountNumber ||
            !ifsc
        ) {

            showMashaalMessage(
                "❌ कृपया सभी जानकारी भरें।",
                "error"
            );

            return;
        }


        // MOBILE VALIDATION
        if (!/^[0-9]{10}$/.test(mobile)) {

            showMashaalMessage(
                "❌ कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।",
                "error"
            );

            return;
        }


        // DISABLE BUTTON
        if (mashaalSubmit) {

            mashaalSubmit.disabled = true;

            mashaalSubmit.textContent =
                "⏳ Registration जमा हो रहा है...";

        }


       try {

    const studentPhotoBase64 =
        await fileToBase64(studentPhoto);

    const aadhaarFrontBase64 =
        await fileToBase64(aadhaarFront);

    const aadhaarBackBase64 =
        await fileToBase64(aadhaarBack);

    const requestData = {
        studentName: studentName,
        fatherName: fatherName,
        motherName: motherName,
        className: className,
        mobile: mobile,
        activity: activity,
        accountNumber: accountNumber,
        ifsc: ifsc,
        studentPhoto: studentPhotoBase64,
        aadhaarFront: aadhaarFrontBase64,
        aadhaarBack: aadhaarBackBase64
    };

    await fetch(
        MASHAL_SCRIPT_URL,
        {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify(requestData)
        }
    );

    showMashaalMessage(
        "✅ आपका MASHAL SPORTS 2026 Registration सफलतापूर्वक जमा हो गया है।",
        "success"
    );

    mashaalForm.reset();

} catch (error) {

    console.error(
        "MASHAL ERROR:",
        error
    );

    showMashaalMessage(
        "❌ Registration जमा नहीं हो पाया। कृपया दोबारा प्रयास करें।",
        "error"
    );

}
            

            // SUCCESS
            showMashaalMessage(
                "✅ आपका MASHAL SPORTS 2026 Registration सफलतापूर्वक जमा हो गया है।",
                "success"
            );


            // CLEAR FORM
            mashaalForm.reset();


        // ENABLE BUTTON AGAIN
        if (mashaalSubmit) {

            mashaalSubmit.disabled = false;

            mashaalSubmit.textContent =
                "🏆 Submit MASHAL Registration";

        }

    });

}
