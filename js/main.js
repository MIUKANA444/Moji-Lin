const intro = "Every moment with you becomes my favorite memory. ❤️";

const introText = document.getElementById("typing");
const openBtn = document.getElementById("openBtn");
const overlay = document.getElementById("letterOverlay");
const closeBtn = document.getElementById("closeLetter");
const letterText = document.getElementById("letterText");

const message = `ถึงพี่โมจิ ❤️

ขอบคุณที่เข้ามาเป็นช่วงเวลาที่ดีที่สุดในชีวิตของผมนะ
ทุกวันที่ได้อยู่ด้วยกัน
ไม่ว่าจะดีหรือทะเลาะกัน
ผมดีใจเสมอที่มีพี่อยู่ข้าง ๆ
ผมจะพยายามเป็นคนที่ดีขึ้น
เพื่อพี่และตัวผมเองด้วย

รักพี่โมจินะ ❤️`;

function typeIntro() {
    introText.textContent = "";
    let i = 0;

    function type() {
        if (i < intro.length) {
            introText.textContent += intro.charAt(i);
            i++;
            setTimeout(type, 40);
        }
    }

    type();
}

function typeLetter() {
    letterText.textContent = "";
    let i = 0;

    function type() {
        if (i < message.length) {
            letterText.textContent += message.charAt(i);
            i++;
            setTimeout(type, 35);
        }
    }

    type();
}

window.addEventListener("load", () => {
    typeIntro();
});

openBtn.addEventListener("click", () => {
    overlay.classList.add("show");
    typeLetter();
});

closeBtn.addEventListener("click", () => {
    overlay.classList.remove("show");
});
// ===== Gallery Auto Load =====

const galleryGrid = document.getElementById("galleryGrid");

if (galleryGrid) {

    for (let i = 1; i <= 27; i++) {

        const card = document.createElement("div");
        card.className = "photo-card";

        const img = document.createElement("img");
        img.src = `assets/images/photo${i}.jpg`;
        img.alt = `Memory ${i}`;
        img.loading = "lazy";

        card.appendChild(img);
        galleryGrid.appendChild(card);
    }
