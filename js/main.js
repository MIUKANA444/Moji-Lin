/* =========================================================
   MAIN.JS
   Part 1 - Intro + Love Letter
========================================================= */

// =========================================================
// Elements
// =========================================================

const introText = document.getElementById("typing");
const openBtn = document.getElementById("openBtn");
const overlay = document.getElementById("letterOverlay");
const closeBtn = document.getElementById("closeLetter");
const letterText = document.getElementById("letterText");

// =========================================================
// Intro
// =========================================================

const intro =
"Every moment with you becomes my favorite memory. ❤️";

// =========================================================
// Love Letter
// =========================================================

const message = `ถึงพี่โมจิ ❤️

ขอบคุณที่เข้ามาเป็นช่วงเวลาที่ดีที่สุดในชีวิตของผมนะ

ตั้งแต่วันที่เราได้รู้จักกัน
ทุกช่วงเวลาที่ได้หัวเราะ
ได้คุย
ได้ใช้เวลาอยู่ด้วยกัน

มันกลายเป็นความทรงจำที่มีค่ามากที่สุดสำหรับผม

แม้บางครั้งเราจะมีเรื่องให้ไม่เข้าใจกัน
หรือทำให้กันเสียใจ

แต่ไม่เคยมีวันไหน
ที่ผมหยุดรักพี่เลย

ผมอาจไม่ใช่คนที่สมบูรณ์แบบ

แต่ผมจะพยายามเป็นคนที่ดีขึ้น
เพื่อพี่
และเพื่อความรักของเราทั้งสองคน

ขอบคุณที่ยังอยู่กับผม

รักพี่โมจิที่สุด ❤️`;

// =========================================================
// Type Writer
// =========================================================

function typeWriter(element, text, speed = 40) {

    if (!element) return;

    element.textContent = "";

    let index = 0;

    function typing() {

        if (index >= text.length) return;

        element.textContent += text.charAt(index);

        index++;

        setTimeout(typing, speed);

    }

    typing();

}

// =========================================================
// Intro
// =========================================================

function startIntro() {

    typeWriter(introText, intro, 35);

}

// =========================================================
// Letter
// =========================================================

function startLetter() {

    typeWriter(letterText, message, 25);

}

// =========================================================
// Open Letter
// =========================================================

if (openBtn) {

    openBtn.addEventListener("click", () => {

        overlay.classList.add("show");

        document.body.style.overflow = "hidden";

        startLetter();

    });

}

// =========================================================
// Close Letter
// =========================================================

function closeLetter() {

    overlay.classList.remove("show");

    document.body.style.overflow = "";

}

if (closeBtn) {

    closeBtn.addEventListener("click", closeLetter);

}

// =========================================================
// Close when clicking background
// =========================================================

if (overlay) {

    overlay.addEventListener("click", (e) => {

        if (e.target === overlay) {

            closeLetter();

        }

    });

}

// =========================================================
// ESC Close
// =========================================================

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        closeLetter();

    }

});

// =========================================================
// Start
// =========================================================

window.addEventListener("load", () => {

    startIntro();

});
/* =========================================================
   MAIN.JS
   Part 2 - Gallery
========================================================= */

// =========================================================
// Gallery
// =========================================================

const galleryGrid = document.getElementById("galleryGrid");

const TOTAL_IMAGES = 27;

const images = [];

// =========================================================
// Create Gallery
// =========================================================

function createGallery() {

    if (!galleryGrid) return;

    galleryGrid.innerHTML = "";

    for (let i = 1; i <= TOTAL_IMAGES; i++) {

        const card = document.createElement("div");
        card.className = "photo-card";

        const img = document.createElement("img");

        img.src = `assets/images/photo${i}.jpg`;

        img.alt = `Memory ${i}`;

        img.loading = "lazy";

        img.dataset.index = i - 1;

        // ซ่อนรูปไว้ก่อน
        img.style.opacity = "0";

        // โหลดสำเร็จ
        img.addEventListener("load", () => {

            img.animate(
                [
                    {
                        opacity:0,
                        transform:"scale(.95)"
                    },
                    {
                        opacity:1,
                        transform:"scale(1)"
                    }
                ],
                {
                    duration:700,
                    easing:"ease"
                }
            );

            img.style.opacity = "1";

        });

        // โหลดไม่สำเร็จ
        img.addEventListener("error", () => {

            console.warn(`Image not found : photo${i}.jpg`);

            card.style.display = "none";

        });

        card.appendChild(img);

        galleryGrid.appendChild(card);

        images.push(img);

    }

}

// =========================================================
// Lazy Fade Animation
// =========================================================

const imageObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("visible");

        }

    });

},{
    threshold:.15
});

// =========================================================
// Observe Images
// =========================================================

function observeImages(){

    document
    .querySelectorAll(".photo-card")
    .forEach(card=>{

        imageObserver.observe(card);

    });

}

// =========================================================
// Initialize Gallery
// =========================================================

window.addEventListener("load",()=>{

    createGallery();

    observeImages();

});

// =========================================================
// Refresh Gallery (Future Use)
// =========================================================

function refreshGallery(){

    images.length = 0;

    createGallery();

    observeImages();

}
