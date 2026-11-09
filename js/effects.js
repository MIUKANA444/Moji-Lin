const hearts = document.getElementById("hearts");

function createHeart() {

    const heart = document.createElement("div");

    heart.innerHTML = "❤️";

    heart.style.position = "fixed";
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.top = window.innerHeight + "px";

    heart.style.fontSize = Math.random() * 20 + 15 + "px";

    heart.style.opacity = Math.random();

    heart.style.pointerEvents = "none";

    heart.style.transition = "transform 8s linear, opacity 8s linear";

    hearts.appendChild(heart);

    setTimeout(() => {

        heart.style.transform =
            `translateY(-${window.innerHeight + 200}px) rotate(${Math.random()*360}deg)`;

        heart.style.opacity = 0;

    }, 50);

    setTimeout(() => {

        heart.remove();

    }, 8000);

}

setInterval(createHeart, 350);
