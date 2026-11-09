/* =========================================================
   MAIN.JS
   Part 3.1
   DOM + Variables + Global State
========================================================= */

"use strict";

/* =========================================================
   DOM Elements
========================================================= */

const introText = document.getElementById("typing");

const openBtn = document.getElementById("openBtn");

const overlay = document.getElementById("letterOverlay");

const closeBtn = document.getElementById("closeLetter");

const letterText = document.getElementById("letterText");

const loader = document.getElementById("loader");

const bgMusic = document.getElementById("bgMusic");

const musicBtn = document.getElementById("musicBtn");

const backToTop = document.getElementById("backToTop");

const cursorGlow = document.getElementById("cursorGlow");

const galleryGrid = document.getElementById("galleryGrid");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const closeLightboxBtn =
    document.getElementById("closeLightbox");

const nextImageBtn =
    document.getElementById("nextImage");

const prevImageBtn =
    document.getElementById("prevImage");

/* =========================================================
   Constants
========================================================= */

const TOTAL_IMAGES = 27;

const TYPE_SPEED = 35;

const LETTER_SPEED = 22;

/* =========================================================
   Intro Text
========================================================= */

const intro =
    "Every moment with you becomes my favorite memory. ❤️";

/* =========================================================
   Love Letter
========================================================= */

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

/* =========================================================
   Global State
========================================================= */

let images = [];

let currentImageIndex = 0;

let lightboxAnimating = false;

let touchStartX = 0;

/* =========================================================
   Utility
========================================================= */

const body = document.body;

/* =========================================================
   End Part 3.1
========================================================= */
/* =========================================================
   MAIN.JS
   Part 3.2
   TypeWriter + Intro + Love Letter + Event Binding
========================================================= */

/* =========================================================
   TypeWriter
========================================================= */

function typeWriter(element, text, speed = TYPE_SPEED){

    if(!element) return;

    element.textContent = "";

    let index = 0;

    function typing(){

        if(index >= text.length){

            return;

        }

        element.textContent += text.charAt(index);

        index++;

        setTimeout(typing, speed);

    }

    typing();

}

/* =========================================================
   Intro
========================================================= */

function startIntro(){

    typeWriter(

        introText,

        intro,

        TYPE_SPEED

    );

}

/* =========================================================
   Love Letter
========================================================= */

function startLetter(){

    typeWriter(

        letterText,

        message,

        LETTER_SPEED

    );

}

/* =========================================================
   Open Letter
========================================================= */

function openLetter(){

    if(!overlay) return;

    overlay.classList.add("show");

    body.style.overflow = "hidden";

    startLetter();

}

/* =========================================================
   Close Letter
========================================================= */

function closeLetter(){

    if(!overlay) return;

    overlay.classList.remove("show");

    body.style.overflow = "";

}

/* =========================================================
   Events
========================================================= */

openBtn?.addEventListener(

    "click",

    openLetter

);

closeBtn?.addEventListener(

    "click",

    closeLetter

);

overlay?.addEventListener(

    "click",

    (event)=>{

        if(event.target === overlay){

            closeLetter();

        }

    }

);

/* =========================================================
   Keyboard
========================================================= */

document.addEventListener(

    "keydown",

    (event)=>{

        if(

            event.key === "Escape" &&

            overlay?.classList.contains("show")

        ){

            closeLetter();

        }

    }

);

/* =========================================================
   End Part 3.2
========================================================= */
/* =========================================================
   MAIN.JS
   Part 3.3
   Gallery Builder
========================================================= */

/* =========================================================
   Build Gallery
========================================================= */

function buildGallery(){

    if(!galleryGrid) return;

    galleryGrid.innerHTML = "";

    images = [];

    const fragment = document.createDocumentFragment();

    for(let i = 1; i <= TOTAL_IMAGES; i++){

        const card = document.createElement("div");

        card.className = "photo-card hidden";

        const image = document.createElement("img");

        image.src = `assets/images/photo${i}.jpg`;

        image.alt = `Memory ${i}`;

        image.loading = "lazy";

        image.draggable = false;

        image.decoding = "async";

        image.dataset.index = i - 1;

        image.tabIndex = 0;

        image.setAttribute(

            "role",

            "button"

        );

        image.setAttribute(

            "aria-label",

            `Open Memory ${i}`

        );

        /* ---------------------------------
           Image Loaded
        --------------------------------- */

        image.addEventListener(

            "load",

            ()=>{

                card.classList.add("loaded");

            }

        );

        /* ---------------------------------
           Image Error
        --------------------------------- */

        image.addEventListener(

            "error",

            ()=>{

                console.warn(

                    `Cannot load photo${i}.jpg`

                );

                card.remove();

            }

        );

        card.appendChild(image);

        fragment.appendChild(card);

        images.push(image);

    }

    galleryGrid.appendChild(fragment);

    observeGallery();

}

/* =========================================================
   Preload Images
========================================================= */

function preloadImages(limit = 10){

    const max = Math.min(

        limit,

        TOTAL_IMAGES

    );

    for(let i = 1; i <= max; i++){

        const preload = new Image();

        preload.src =

            `assets/images/photo${i}.jpg`;

    }

}

/* =========================================================
   Refresh Gallery
========================================================= */

function refreshGallery(){

    buildGallery();

}

/* =========================================================
   End Part 3.3
========================================================= */
/* =========================================================
   MAIN.JS
   Part 3.4
   Gallery Observer + Scroll Animation
========================================================= */

/* =========================================================
   Gallery Observer
========================================================= */

const galleryObserver =

    "IntersectionObserver" in window

        ? new IntersectionObserver(

            (entries)=>{

                entries.forEach((entry)=>{

                    if(!entry.isIntersecting){

                        return;

                    }

                    entry.target.classList.remove(

                        "hidden"

                    );

                    entry.target.classList.add(

                        "show"

                    );

                    galleryObserver.unobserve(

                        entry.target

                    );

                });

            },

            {

                threshold:0.15,

                rootMargin:"0px 0px -40px 0px"

            }

        )

        : null;

/* =========================================================
   Observe Gallery
========================================================= */

function observeGallery(){

    const cards =

        document.querySelectorAll(

            ".photo-card"

        );

    if(!galleryObserver){

        cards.forEach((card)=>{

            card.classList.remove(

                "hidden"

            );

            card.classList.add(

                "show"

            );

        });

        return;

    }

    cards.forEach((card)=>{

        galleryObserver.observe(card);

    });

}

/* =========================================================
   Reveal All
========================================================= */

function revealGallery(){

    document

        .querySelectorAll(".photo-card")

        .forEach((card)=>{

            card.classList.remove(

                "hidden"

            );

            card.classList.add(

                "show"

            );

        });

}

/* =========================================================
   Reset Animation
========================================================= */

function resetGalleryAnimation(){

    document

        .querySelectorAll(".photo-card")

        .forEach((card)=>{

            card.classList.remove(

                "show"

            );

            card.classList.add(

                "hidden"

            );

        });

    observeGallery();

}

/* =========================================================
   End Part 3.4
========================================================= */
/* =========================================================
   MAIN.JS
   Part 3.5
   Gallery Interaction + Lightbox Preparation
========================================================= */

/* =========================================================
   Gallery Hover
========================================================= */

galleryGrid?.addEventListener(

    "mousemove",

    (event)=>{

        const card =

            event.target.closest(".photo-card");

        if(!card) return;

        const rect =

            card.getBoundingClientRect();

        const x =

            event.clientX - rect.left;

        const y =

            event.clientY - rect.top;

        const rotateY =

            (x - rect.width / 2) / 20;

        const rotateX =

            -(y - rect.height / 2) / 20;

        card.style.transform =

            `
            perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-8px)
            scale(1.02)
            `;

    }

);

/* =========================================================
   Reset Hover
========================================================= */

galleryGrid?.addEventListener(

    "mouseleave",

    ()=>{

        document

            .querySelectorAll(".photo-card")

            .forEach((card)=>{

                card.style.transform = "";

            });

    }

);

/* =========================================================
   Open Lightbox
========================================================= */

galleryGrid?.addEventListener(

    "click",

    (event)=>{

        const image =

            event.target.closest("img");

        if(!image) return;

        const index =

            Number(image.dataset.index);

        if(Number.isNaN(index)) return;

        openLightbox(index);

    }

);

/* =========================================================
   Keyboard Accessibility
========================================================= */

galleryGrid?.addEventListener(

    "keydown",

    (event)=>{

        const image =

            event.target.closest("img");

        if(!image) return;

        if(

            event.key !== "Enter" &&

            event.key !== " "

        ){

            return;

        }

        event.preventDefault();

        const index =

            Number(image.dataset.index);

        if(Number.isNaN(index)) return;

        openLightbox(index);

    }

);

/* =========================================================
   Disable Drag Image
========================================================= */

galleryGrid?.addEventListener(

    "dragstart",

    (event)=>{

        if(

            event.target.tagName === "IMG"

        ){

            event.preventDefault();

        }

    }

);

/* =========================================================
   End Part 3.5
========================================================= */
/* =========================================================
   MAIN.JS
   Part 3.6
   Premium Lightbox
========================================================= */

/* =========================================================
   Open Lightbox
========================================================= */

function openLightbox(index){

    if(!lightbox) return;

    if(images.length === 0) return;

    currentImageIndex = index;

    body.style.overflow = "hidden";

    lightbox.classList.add("show");

    renderLightbox();

}

/* =========================================================
   Close Lightbox
========================================================= */

function closeLightbox(){

    if(!lightbox) return;

    lightbox.classList.remove("show");

    body.style.overflow = "";

}

/* =========================================================
   Render Image
========================================================= */

function renderLightbox(){

    if(lightboxAnimating) return;

    if(images.length === 0) return;

    lightboxAnimating = true;

    const image = images[currentImageIndex];

    lightboxImage.style.opacity = "0";

    lightboxImage.style.transform = "scale(.96)";

    const preload = new Image();

    preload.src = image.src;

    preload.onload = ()=>{

        lightboxImage.src = preload.src;

        lightboxImage.alt = image.alt;

        requestAnimationFrame(()=>{

            lightboxImage.style.opacity = "1";

            lightboxImage.style.transform = "scale(1)";

            preloadNeighborImages();

            lightboxAnimating = false;

        });

    };

}

/* =========================================================
   Next Image
========================================================= */

function nextImage(){

    if(lightboxAnimating) return;

    currentImageIndex =

        (currentImageIndex + 1)

        % images.length;

    renderLightbox();

}

/* =========================================================
   Previous Image
========================================================= */

function previousImage(){

    if(lightboxAnimating) return;

    currentImageIndex =

        (

            currentImageIndex

            - 1

            + images.length

        )

        % images.length;

    renderLightbox();

}

/* =========================================================
   Preload Neighbors
========================================================= */

function preloadNeighborImages(){

    if(images.length < 2) return;

    [

        (currentImageIndex + 1) % images.length,

        (

            currentImageIndex

            - 1

            + images.length

        ) % images.length

    ]

    .forEach((index)=>{

        const preload = new Image();

        preload.src = images[index].src;

    });

}

/* =========================================================
   Close Button
========================================================= */

closeLightboxBtn?.addEventListener(

    "click",

    closeLightbox

);

/* =========================================================
   Click Background
========================================================= */

lightbox?.addEventListener(

    "click",

    (event)=>{

        if(event.target === lightbox){

            closeLightbox();

        }

    }

);

/* =========================================================
   End Part 3.6
========================================================= */
/* =========================================================
   MAIN.JS
   Part 3.7
   Lightbox Controls
========================================================= */

/* =========================================================
   Button Navigation
========================================================= */

nextImageBtn?.addEventListener(

    "click",

    ()=>{

        nextImage();

    }

);

prevImageBtn?.addEventListener(

    "click",

    ()=>{

        previousImage();

    }

);

/* =========================================================
   Keyboard Controls
========================================================= */

document.addEventListener(

    "keydown",

    (event)=>{

        /* -----------------------------
           Close Letter
        ----------------------------- */

        if(

            event.key === "Escape" &&

            overlay?.classList.contains("show")

        ){

            closeLetter();

            return;

        }

        /* -----------------------------
           Lightbox Closed
        ----------------------------- */

        if(

            !lightbox ||

            !lightbox.classList.contains("show")

        ){

            return;

        }

        /* -----------------------------
           Navigation
        ----------------------------- */

        switch(event.key){

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

    }

);

/* =========================================================
   Prevent Rapid Clicking
========================================================= */

function lockNavigationButton(button){

    if(!button) return;

    button.disabled = true;

    window.setTimeout(()=>{

        button.disabled = false;

    },180);

}

nextImageBtn?.addEventListener(

    "click",

    ()=>{

        lockNavigationButton(

            nextImageBtn

        );

    }

);

prevImageBtn?.addEventListener(

    "click",

    ()=>{

        lockNavigationButton(

            prevImageBtn

        );

    }

);

/* =========================================================
   Image Counter
========================================================= */

function getCurrentImage(){

    return currentImageIndex + 1;

}

function getTotalImages(){

    return images.length;

}

/* =========================================================
   End Part 3.7
========================================================= */
/* =========================================================
   MAIN.JS
   Part 3.8
   Lightbox Advanced Interaction
========================================================= */

/* =========================================================
   Touch Swipe
========================================================= */


lightbox?.addEventListener(

    "touchstart",

    (event)=>{

        touchStartX =

            event.changedTouches[0].clientX;

    },

    {

        passive:true

    }

);

lightbox?.addEventListener(

    "touchend",

    (event)=>{

        const touchEndX =

            event.changedTouches[0].clientX;

        const distance =

            touchStartX - touchEndX;

        if(Math.abs(distance) < 60){

            return;

        }

        if(distance > 0){

            nextImage();

        }else{

            previousImage();

        }

    },

    {

        passive:true

    }

);

/* =========================================================
   Mouse Wheel Navigation
========================================================= */

lightbox?.addEventListener(

    "wheel",

    (event)=>{

        if(

            !lightbox.classList.contains("show")

        ){

            return;

        }

        event.preventDefault();

        if(event.deltaY > 0){

            nextImage();

        }else{

            previousImage();

        }

    },

    {

        passive:false

    }

);

/* =========================================================
   Double Click
========================================================= */

lightboxImage?.addEventListener(

    "dblclick",

    closeLightbox

);

/* =========================================================
   Disable Image Drag
========================================================= */

lightboxImage?.addEventListener(

    "dragstart",

    (event)=>{

        event.preventDefault();

    }

);

/* =========================================================
   Cleanup
========================================================= */

window.addEventListener(

    "beforeunload",

    ()=>{

        lightboxImage?.removeAttribute(

            "src"

        );

    }

);

/* =========================================================
   End Part 3.8
========================================================= */
/* =========================================================
   MAIN.JS
   Part 3.9
   Music + Loader
========================================================= */

/* =========================================================
   Update Music Button
========================================================= */

function updateMusicButton(){

    if(!musicBtn || !bgMusic) return;

    const playing = !bgMusic.paused;

    musicBtn.classList.toggle(

        "playing",

        playing

    );

    musicBtn.textContent =

        playing ? "🎶" : "🎵";

}

/* =========================================================
   Play / Pause Music
========================================================= */

async function toggleMusic(){

    if(!bgMusic) return;

    try{

        if(bgMusic.paused){

            await bgMusic.play();

            localStorage.setItem(

                "music",

                "on"

            );

        }else{

            bgMusic.pause();

            localStorage.setItem(

                "music",

                "off"

            );

        }

    }catch(error){

        console.warn(

            "Music autoplay blocked."

        );

    }

    updateMusicButton();

}

musicBtn?.addEventListener(

    "click",

    toggleMusic

);

/* =========================================================
   Restore Music State
========================================================= */

async function restoreMusic(){

    if(!bgMusic) return;

    const state =

        localStorage.getItem("music");

    if(state !== "on"){

        updateMusicButton();

        return;

    }

    try{

        await bgMusic.play();

    }catch(error){

        console.warn(

            "Unable to restore music."

        );

    }

    updateMusicButton();

}

/* =========================================================
   Page Visibility
========================================================= */

document.addEventListener(

    "visibilitychange",

    ()=>{

        if(!bgMusic) return;

        bgMusic.volume =

            document.hidden

                ? 0.2

                : 1;

    }

);

/* =========================================================
   Loader
========================================================= */

function hideLoader(){

    if(!loader) return;

    loader.classList.add(

        "hide"

    );

}

/* =========================================================
   Window Loaded
========================================================= */

window.addEventListener(

    "load",

    ()=>{

        hideLoader();

        restoreMusic();

    }

);

/* =========================================================
   End Part 3.9
========================================================= */
/* =========================================================
   MAIN.JS
   Part 3.10
   Initialization + Utilities
========================================================= */

/* =========================================================
   Back To Top
========================================================= */

function updateBackToTop(){

    if(!backToTop) return;

    backToTop.classList.toggle(

        "show",

        window.scrollY > 400

    );

}

backToTop?.addEventListener(

    "click",

    ()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    }

);

window.addEventListener(

    "scroll",

    updateBackToTop,

    {

        passive:true

    }

);

/* =========================================================
   Cursor Glow
========================================================= */

document.addEventListener(

    "pointermove",

    (event)=>{

        if(!cursorGlow) return;

        cursorGlow.style.left =

            `${event.clientX}px`;

        cursorGlow.style.top =

            `${event.clientY}px`;

    },

    {

        passive:true

    }

);

/* =========================================================
   Initialize Website
========================================================= */

function initializeWebsite(){

    preloadImages();

    buildGallery();

    startIntro();

    updateMusicButton();

    updateBackToTop();

}

/* =========================================================
   DOM Ready
========================================================= */

document.addEventListener(

    "DOMContentLoaded",

    initializeWebsite

);

/* =========================================================
   End MAIN.JS
========================================================= */
