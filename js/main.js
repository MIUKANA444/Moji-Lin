const text =
"Every moment with you becomes my favorite memory. ❤️";

const typing = document.getElementById("typing");

let i = 0;

function typeWriter() {

    if (i < text.length) {

        typing.innerHTML += text.charAt(i);

        i++;

        setTimeout(typeWriter, 50);

    }

}

window.onload = () => {

    typeWriter();

};
