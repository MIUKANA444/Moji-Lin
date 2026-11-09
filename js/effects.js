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
