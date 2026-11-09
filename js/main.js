const intro = "Every moment with you becomes my favorite memory. ❤️";

const introText = document.getElementById("typing");
const openBtn = document.getElementById("openBtn");
const overlay = document.getElementById("letterOverlay");
const closeBtn = document.getElementById("closeLetter");
const letterText = document.getElementById("letterText");

const message = `ถึงโมจิ ❤️

ขอบคุณที่เข้ามาเป็นช่วงเวลาที่ดีที่สุดในชีวิตของผมนะ

ทุกวันที่ได้อยู่ด้วยกัน

ไม่ว่าจะดีหรือทะเลาะกัน

ผมดีใจเสมอที่มีพี่อยู่ข้าง ๆ

ผมสัญญาว่าจะพยายามเป็นคนที่ดีขึ้น

เพื่อพี่และตัวผมเองด้วย

และเพื่อความรักของเรา

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
    overlay.classList.remove("hidden");
    typeLetter();
});

closeBtn.addEventListener("click", () => {
    overlay.classList.add("hidden");
});
