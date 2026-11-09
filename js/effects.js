/* =========================================================
   EFFECTS.JS
   Part 1 - Floating Hearts Premium
========================================================= */

const heartsContainer = document.getElementById("hearts");

const HEARTS = [
    "❤",
    "❤️",
    "💖",
    "💕",
    "💗",
    "💓",
    "💞"
];

const MAX_HEARTS = 40;

/* =========================================================
   Random Number
========================================================= */

function random(min, max) {
    return Math.random() * (max - min) + min;
}

/* =========================================================
   Create Heart
========================================================= */

function createHeart() {

    if (!heartsContainer) return;

    // จำกัดจำนวนหัวใจ
    if (heartsContainer.children.length >= MAX_HEARTS) {
        heartsContainer.removeChild(heartsContainer.firstChild);
    }

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.textContent =
        HEARTS[Math.floor(Math.random() * HEARTS.length)];

    // ตำแหน่ง

    heart.style.left = random(0, 100) + "%";

    // ขนาด

    heart.style.fontSize =
        random(16, 36) + "px";

    // ความโปร่งใส

    heart.style.opacity =
        random(.35, .9);

    // ระยะเวลา

    heart.style.animationDuration =
        random(6, 12) + "s";

    // หน่วงเวลา

    heart.style.animationDelay =
        random(0, 1) + "s";

    // หมุน

    heart.style.rotate =
        random(-25,25) + "deg";

    heartsContainer.appendChild(heart);

    // ลบเมื่อเล่น Animation เสร็จ

    heart.addEventListener("animationend", () => {

        heart.remove();

    });

}

/* =========================================================
   Auto Create Hearts
========================================================= */

let heartInterval = setInterval(() => {

    createHeart();

}, 400);

/* =========================================================
   Pause When Hidden
========================================================= */

document.addEventListener("visibilitychange", () => {

    if(document.hidden){

        clearInterval(heartInterval);

    }else{

        heartInterval = setInterval(createHeart,400);

    }

});

/* =========================================================
   Initial Hearts
========================================================= */

for(let i=0;i<12;i++){

    setTimeout(createHeart,i*150);

}
/* =========================================================
   EFFECTS.JS
   Part 2 - Stars & Sparkles
========================================================= */

const starsContainer = document.getElementById("stars");

/* =========================================================
   Create Star
========================================================= */

function createStar() {

    if (!starsContainer) return;

    const star = document.createElement("span");

    star.className = "star";

    star.style.left = random(0, 100) + "%";
    star.style.top = random(0, 100) + "%";

    const size = random(2, 5);

    star.style.width = size + "px";
    star.style.height = size + "px";

    star.style.animationDuration =
        random(2, 5) + "s";

    star.style.animationDelay =
        random(0, 3) + "s";

    starsContainer.appendChild(star);

}

/* =========================================================
   Generate Stars
========================================================= */

function generateStars(count = 120){

    if(!starsContainer) return;

    starsContainer.innerHTML = "";

    for(let i=0;i<count;i++){

        createStar();

    }

}

generateStars();

/* =========================================================
   Sparkles
========================================================= */

function createSparkle(x, y){

    const sparkle = document.createElement("div");

    sparkle.className = "sparkle";

    sparkle.style.left = x + "px";
    sparkle.style.top = y + "px";

    sparkle.style.width =
        random(4,8) + "px";

    sparkle.style.height =
        sparkle.style.width;

    document.body.appendChild(sparkle);

    sparkle.animate(
        [
            {
                transform:"translate(-50%,-50%) scale(.2)",
                opacity:1
            },
            {
                transform:`translate(${random(-25,25)}px,${random(-25,25)}px) scale(1.5)`,
                opacity:0
            }
        ],
        {
            duration:700,
            easing:"ease-out"
        }
    );

    setTimeout(()=>{

        sparkle.remove();

    },700);

}

/* =========================================================
   Mouse Sparkles
========================================================= */

let sparkleTimer = null;

document.addEventListener("mousemove",(e)=>{

    if(sparkleTimer) return;

    sparkleTimer = setTimeout(()=>{

        createSparkle(e.clientX,e.clientY);

        sparkleTimer = null;

    },40);

});

/* =========================================================
   Shooting Star
========================================================= */

function createShootingStar(){

    if(!starsContainer) return;

    const star = document.createElement("div");

    star.className = "shooting-star";

    star.style.top =
        random(0,40) + "%";

    star.style.left =
        random(-20,20) + "%";

    starsContainer.appendChild(star);

    setTimeout(()=>{

        star.remove();

    },2200);

}

setInterval(createShootingStar,9000);

/* =========================================================
   Regenerate Stars on Resize
========================================================= */

window.addEventListener("resize",()=>{

    generateStars();

});
/* =========================================================
   EFFECTS.JS
   Part 3 - Scroll Animation + Parallax + Mouse Glow
========================================================= */

/* =========================================================
   Scroll Fade Animation
========================================================= */

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

document.querySelectorAll(
    ".photo-card,.glass,.gallery h2,.footer,.letter"
).forEach((el)=>{

    el.classList.add("hidden");

    observer.observe(el);

});

/* =========================================================
   Glass Parallax
========================================================= */

const glass = document.querySelector(".glass");

if(glass){

    document.addEventListener("mousemove",(e)=>{

        const x =
            (window.innerWidth/2-e.clientX)/35;

        const y =
            (window.innerHeight/2-e.clientY)/35;

        glass.style.transform=
            `rotateY(${-x}deg)
             rotateX(${y}deg)
             translateY(-6px)`;

    });

    document.addEventListener("mouseleave",()=>{

        glass.style.transform="";

    });

}

/* =========================================================
   Mouse Glow
========================================================= */

const glow=document.createElement("div");

glow.id="cursorGlow";

document.body.appendChild(glow);

document.addEventListener("mousemove",(e)=>{

    glow.style.left=e.clientX+"px";

    glow.style.top=e.clientY+"px";

});

/* =========================================================
   Button Hover
========================================================= */

document.querySelectorAll("button").forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        btn.animate([

            {
                transform:"scale(1)"
            },

            {
                transform:"scale(1.08)"
            },

            {
                transform:"scale(1)"
            }

        ],{

            duration:350

        });

    });

});

/* =========================================================
   Gallery Hover Tilt
========================================================= */

document.querySelectorAll(".photo-card").forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect=card.getBoundingClientRect();

        const x=e.clientX-rect.left;

        const y=e.clientY-rect.top;

        const rotateY=(x-rect.width/2)/18;

        const rotateX=-(y-rect.height/2)/18;

        card.style.transform=`
            perspective(800px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-8px)
        `;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="";

    });

});

/* =========================================================
   Random Floating Glow
========================================================= */

setInterval(()=>{

    const glow=document.createElement("div");

    glow.className="floatingGlow";

    glow.style.left=Math.random()*100+"vw";

    glow.style.top=Math.random()*100+"vh";

    document.body.appendChild(glow);

    setTimeout(()=>{

        glow.remove();

    },5000);

},2000);
/* =========================================================
   EFFECTS.JS
   Part 4 - Premium Features
========================================================= */

/* =========================================================
   Keyboard Lightbox
========================================================= */

const lightbox = document.getElementById("lightbox");
const nextBtn = document.getElementById("nextImage");
const prevBtn = document.getElementById("prevImage");

document.addEventListener("keydown", (e) => {

    if (!lightbox || !lightbox.classList.contains("show")) return;

    switch (e.key) {

        case "ArrowRight":
            if (nextBtn) nextBtn.click();
            break;

        case "ArrowLeft":
            if (prevBtn) prevBtn.click();
            break;

        case "Escape":
            document.getElementById("closeLightbox")?.click();
            break;
    }

});

/* =========================================================
   Double Click Heart Effect
========================================================= */

document.querySelectorAll(".photo-card").forEach(card => {

    card.addEventListener("dblclick", (e) => {

        const heart = document.createElement("div");

        heart.textContent = "❤️";
        heart.className = "popup-heart";

        heart.style.left = e.clientX + "px";
        heart.style.top = e.clientY + "px";

        document.body.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 1200);

    });

});

/* =========================================================
   Confetti on Open Button
========================================================= */

const openButton = document.getElementById("openBtn");

if (openButton) {

    openButton.addEventListener("click", () => {

        for (let i = 0; i < 35; i++) {

            const piece = document.createElement("div");

            piece.className = "confetti";

            piece.style.left = (window.innerWidth / 2) + "px";
            piece.style.top = (window.innerHeight / 2) + "px";

            piece.style.background =
                `hsl(${Math.random()*360},90%,70%)`;

            piece.style.transform =
                `rotate(${Math.random()*360}deg)`;

            piece.style.setProperty(
                "--x",
                (Math.random()*500-250) + "px"
            );

            piece.style.setProperty(
                "--y",
                (Math.random()*500-250) + "px"
            );

            document.body.appendChild(piece);

            setTimeout(() => {

                piece.remove();

            }, 1800);

        }

    });

}

/* =========================================================
   Music Button Animation
========================================================= */

const musicBtn = document.getElementById("musicBtn");

if (musicBtn) {

    musicBtn.addEventListener("click", () => {

        musicBtn.classList.toggle("playing");

    });

}

/* =========================================================
   Welcome Console
========================================================= */

console.log("%c❤️ Welcome To Moji-Lin ❤️",
"font-size:22px;color:#ff6fb5;font-weight:bold;");

console.log("%cMade with Love by Aphiwat",
"font-size:15px;color:#8f7cff;");

/* =========================================================
   Finish Loading
========================================================= */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});
