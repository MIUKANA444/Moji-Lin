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
   Part 2 - Premium Gallery
========================================================= */

// =========================================================
// Gallery
// =========================================================

const galleryGrid = document.getElementById("galleryGrid");

const TOTAL_IMAGES = 27;

let images = [];

// =========================================================
// Build Gallery
// =========================================================

function buildGallery() {

    if (!galleryGrid) return;

    galleryGrid.innerHTML = "";

    images = [];

    for (let i = 1; i <= TOTAL_IMAGES; i++) {

        const card = document.createElement("div");

        card.className = "photo-card hidden";

        const img = document.createElement("img");

        img.src = `assets/images/photo${i}.jpg`;

        img.alt = `Memory ${i}`;

        img.loading = "lazy";

        img.dataset.index = images.length;

        img.draggable = false;

        img.addEventListener("load", () => {

            card.classList.add("loaded");

        });

        img.addEventListener("error", () => {

            card.remove();

        });

        card.appendChild(img);

        galleryGrid.appendChild(card);

        images.push(img);

    }

    observeGallery();

}

// =========================================================
// Fade In
// =========================================================

const galleryObserver = new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

            galleryObserver.unobserve(entry.target);

        }

    });

},

{

    threshold:.15

}

);

// =========================================================
// Observe
// =========================================================

function observeGallery(){

    document.querySelectorAll(".photo-card").forEach(card=>{

        galleryObserver.observe(card);

    });

}

// =========================================================
// Hover Effect
// =========================================================

document.addEventListener("mousemove",(e)=>{

    const card = e.target.closest(".photo-card");

    if(!card) return;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const y = e.clientY - rect.top;

    const rotateY = (x - rect.width/2)/22;

    const rotateX = -(y - rect.height/2)/22;

    card.style.transform =

    `perspective(900px)
     rotateX(${rotateX}deg)
     rotateY(${rotateY}deg)
     translateY(-8px)`;

});

document.addEventListener("mouseleave",()=>{

    document.querySelectorAll(".photo-card").forEach(card=>{

        card.style.transform="";

    });

});

// =========================================================
// Initialize
// =========================================================

window.addEventListener("load",()=>{

    buildGallery();

});
/* =========================================================
   MAIN.JS
   Part 3 - Premium Lightbox
========================================================= */

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

const closeLightboxBtn = document.getElementById("closeLightbox");
const nextImageBtn = document.getElementById("nextImage");
const prevImageBtn = document.getElementById("prevImage");

let currentImageIndex = 0;

/* =========================================================
   Open Lightbox
========================================================= */

function openLightbox(index){

    if(!lightbox || images.length===0) return;

    currentImageIndex = index;

    renderLightbox();

    lightbox.classList.add("show");

    document.body.style.overflow = "hidden";

}

/* =========================================================
   Close
========================================================= */

function closeLightbox(){

    if(!lightbox) return;

    lightbox.classList.remove("show");

    document.body.style.overflow = "";

}

/* =========================================================
   Render Image
========================================================= */

function renderLightbox(){

    if(images.length===0) return;

    const img = images[currentImageIndex];

    lightboxImage.style.opacity = "0";

    setTimeout(()=>{

        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;

        lightboxImage.style.opacity = "1";

    },150);

}

/* =========================================================
   Next
========================================================= */

function nextImage(){

    currentImageIndex++;

    if(currentImageIndex>=images.length){

        currentImageIndex = 0;

    }

    renderLightbox();

}

/* =========================================================
   Previous
========================================================= */

function previousImage(){

    currentImageIndex--;

    if(currentImageIndex<0){

        currentImageIndex = images.length-1;

    }

    renderLightbox();

}

/* =========================================================
   Click Gallery
========================================================= */

galleryGrid?.addEventListener("click",(e)=>{

    const img = e.target.closest("img");

    if(!img) return;

    openLightbox(Number(img.dataset.index));

});

/* =========================================================
   Buttons
========================================================= */

nextImageBtn?.addEventListener("click",nextImage);

prevImageBtn?.addEventListener("click",previousImage);

closeLightboxBtn?.addEventListener("click",closeLightbox);

/* =========================================================
   Click Background
========================================================= */

lightbox?.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        closeLightbox();

    }

});

/* =========================================================
   Keyboard
========================================================= */

document.addEventListener("keydown",(e)=>{

    if(!lightbox?.classList.contains("show")) return;

    switch(e.key){

        case "ArrowRight":

            nextImage();

            break;

        case "ArrowLeft":

            previousImage();

            break;

        case "Escape":

            closeLightbox();

            break;

    }

});

/* =========================================================
   Touch Swipe
========================================================= */

let startX = 0;

lightbox?.addEventListener("touchstart",(e)=>{

    startX = e.changedTouches[0].screenX;

});

lightbox?.addEventListener("touchend",(e)=>{

    const endX = e.changedTouches[0].screenX;

    const distance = startX-endX;

    if(distance>50){

        nextImage();

    }

    if(distance<-50){

        previousImage();

    }

});
