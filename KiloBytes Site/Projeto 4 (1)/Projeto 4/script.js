window.addEventListener("DOMContentLoaded", () => {
    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo === "dark") {
        document.body.classList.add("dark");
        const botaoTema = document.getElementById("toggleTema");
        if (botaoTema) botaoTema.textContent = " Modo Claro";
    }

    const modoDaltonismoSalvo = localStorage.getItem("modoDaltonismo") || "normal";
    const selectDaltonismo = document.getElementById("modoDaltonismo");
    if (selectDaltonismo) {
        selectDaltonismo.value = modoDaltonismoSalvo;
        aplicarModoDaltonismo(modoDaltonismoSalvo);
    }

    const zoomSalvo = localStorage.getItem("zoom");
    if (zoomSalvo) {
        zoomAtual = parseInt(zoomSalvo);
        aplicarZoom();
    }
});

const botaoTema = document.getElementById("toggleTema");
if (botaoTema) {
    botaoTema.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        if (document.body.classList.contains("dark")) {
            botaoTema.textContent = " Modo Claro";
            localStorage.setItem("tema", "dark");
        } else {
            botaoTema.textContent = " Modo Escuro";
            localStorage.setItem("tema", "light");
        }
    });
}

let zoomAtual = 100;

function aplicarZoom() {
    document.documentElement.style.fontSize = zoomAtual + "%";
    localStorage.setItem("zoom", zoomAtual);
}

function aumentarZoom() {
    if (zoomAtual < 150) {
        zoomAtual += 10;
        aplicarZoom();
    }
}

function diminuirZoom() {
    if (zoomAtual > 80) {
        zoomAtual -= 10;
        aplicarZoom();
    }
}

function resetZoom() {
    zoomAtual = 100;
    aplicarZoom();
}

const selectDaltonismo = document.getElementById("modoDaltonismo");

function aplicarModoDaltonismo(modo) {
    document.body.classList.remove("protanopia", "deuteranopia", "tritanopia");
    if (modo !== "normal") {
        document.body.classList.add(modo);
    }
    localStorage.setItem("modoDaltonismo", modo);
}

if (selectDaltonismo) {
    selectDaltonismo.addEventListener("change", (e) => {
        aplicarModoDaltonismo(e.target.value);
    });
}

const links = document.querySelectorAll("nav a");
const secoes = document.querySelectorAll("section, footer");

window.addEventListener("scroll", () => {
    let scrollPos = window.scrollY + 150;
    secoes.forEach(secao => {
        if (secao.id && scrollPos >= secao.offsetTop && scrollPos < secao.offsetTop + secao.offsetHeight) {
            links.forEach(link => {
                link.classList.remove("ativo");
                if (link.getAttribute("href") === "#" + secao.id) {
                    link.classList.add("ativo");
                }
            });
        }
    });
});