const screens = document.querySelectorAll(".screen");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

let currentScreen = 0;

function showScreen(index){
    screens.forEach((screen, i) => {
        screen.classList.remove("active", "exit-left");

        if(i < index){
            screen.classList.add("exit-left");
        }

        if(i === index){
            screen.classList.add("active");
        }
    });
}

function nextScreen(){
    if(currentScreen < screens.length - 1){
        currentScreen++;
        showScreen(currentScreen);
    }
}

function prevScreen(){
    if(currentScreen > 0){
        currentScreen--;
        showScreen(currentScreen);
    }
}

if(nextButton && prevButton && screens.length > 0){

    nextButton.addEventListener("click", nextScreen);
    prevButton.addEventListener("click", prevScreen);

    document.addEventListener("dblclick", function(event){

        const middle = window.innerWidth / 2;

        if(event.clientX > middle){
            nextScreen();
        }else{
            prevScreen();
        }
    });
}

/* ========================= */
/* CAMBIO DE FONDO ACERCA */
/* ========================= */

const acercaPage = document.querySelector(".acerca-page");
const infoBlocks = document.querySelectorAll(".info-block");

if(acercaPage && infoBlocks.length > 0){

    infoBlocks.forEach(block => {

        block.addEventListener("mouseenter", () => {

            const image = block.getAttribute("data-bg");

            acercaPage.style.background = `
                linear-gradient(
                    90deg,
                    rgba(0, 61, 43, 0.92),
                    rgba(0, 61, 43, 0.65),
                    rgba(244,248,244,0.88)
                ),
                url("${image}")
            `;

            acercaPage.style.backgroundSize = "cover";
            acercaPage.style.backgroundPosition = "center";
            acercaPage.style.backgroundAttachment = "fixed";
        });

    });

}

/* ========================= */
/* PESTAÑA SERVICIOS */
/* ========================= */

const serviceTabs = document.querySelectorAll(".service-tab");
const serviceContents = document.querySelectorAll(".service-content");

if(serviceTabs.length > 0 && serviceContents.length > 0){
    serviceTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const target = tab.getAttribute("data-target");

            serviceTabs.forEach(item => {
                item.classList.remove("active");
            });

            serviceContents.forEach(content => {
                content.classList.remove("active");
            });

            tab.classList.add("active");
            document.getElementById(target).classList.add("active");
        });
    });
}

/* ========================= */
/* FORMULARIO DE CONTACTO */
/* ========================= */

const contactForm = document.getElementById("contactForm");
const contactButton = document.getElementById("contactButton");
const formStatus = document.getElementById("formStatus");

if(contactForm){
    contactForm.addEventListener("submit", function(event){
        event.preventDefault();

        const nombre = document.getElementById("nombre");
        const correo = document.getElementById("correo");

        let valid = true;

        document.querySelectorAll(".form-group").forEach(group => {
            group.classList.remove("error");
        });

        if(nombre.value.trim() === ""){
            nombre.parentElement.classList.add("error");
            valid = false;
        }

        if(correo.value.trim() === ""){
            correo.parentElement.classList.add("error");
            valid = false;
        }

        if(!valid){
            formStatus.textContent = "";
            return;
        }

        contactButton.textContent = "Enviando...";
        contactButton.classList.add("loading");

        setTimeout(() => {
            contactButton.textContent = "Enviar mensaje";
            contactButton.classList.remove("loading");
            contactButton.classList.add("success");

            formStatus.textContent = "Mensaje enviado";

            contactForm.reset();

            setTimeout(() => {
                contactButton.classList.remove("success");
                formStatus.textContent = "";
            }, 2500);

        }, 1500);
    });
}