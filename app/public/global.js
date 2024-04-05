// Pour écrire nos fonctions javascript

const menuToggler = document.getElementById("menuToggler");
const menu = document.querySelector(".menu");

const searchToggler = document.getElementById("searchToggler");
const search = document.querySelector(".search");

// Pour le responsive -> Nous permet de gérer l'affichage dynamique du menu burger contenant : quand on clique dessus les pages s'affiches et quand on reclique dessus elles s'enlevent
menuToggler.addEventListener("click", () => {
  menu.classList.toggle("menu--on");
  search.classList.remove("search--on");
});

// L'évènement au dessus et celui ci permettent aux deux élements de ne pas de chevaucher sur notre page
searchToggler.addEventListener("click", () => {
  search.classList.toggle("search--on");
  menu.classList.remove("menu--on");
});

// Pour que notre bouton nous ramène en haut de page
const toTop = document.querySelector(".footer-totop");
toTop.addEventListener("click", () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

// Affichage du bouton si on se scroll vers le bas sur la page
window.addEventListener("scroll", () => {
  // console.log(window.scrollY);
  if (window.scrollY > 0) {
    toTop.classList.add("footer-totop--on");
  } else if (window.scrollY === 0) {
    toTop.classList.remove("footer-totop--on");
  }
});

// Fonction pour gérer l'affichae dynamique des cards
function switchToMode(mode) {
  const container = document.querySelector(".card-container");
  // On supprime toutes les classes pour en ajouter une nouvelle
  container.classList.remove("card-container--list", "card-container--grid");
  container.classList.add(`card-container--${mode}`);
  for (const btn of allbtns) {
    if (btn.dataset.mode === mode) {
      btn.classList.add("btn--hidden");
    } else {
      btn.classList.remove("btn--hidden");
    }
  }
}
// On applique cette fonction à notre bouton (en l'occurence il y a 2 boutons car l'un est en hidden quand l'autre s'affiche)
const allbtns = document.querySelectorAll(".btn--view-mode");
for (const btn of allbtns) {
  btn.addEventListener("click", () => {
    const currentMode = btn.dataset.mode;
    switchToMode(currentMode);
  });
}

// Fonction non fonctionnelle pour le moment -> marche bien dans le DOM mais pas de changement dynamique de l'icone visuellement, surement un problème avec la gestion data-feather
const button = document.querySelector(".btn--red");
button.addEventListener("click", function () {
  const icon = button.querySelector("#jeter_tomate");
  const currentFeather = icon.getAttribute("data-feather");
  if (currentFeather === "circle") {
    icon.setAttribute("data-feather", "check-circle");
    console.log("Icone check-circle");
  } else {
    icon.setAttribute("data-feather", "circle");
    console.log("icone circle");
  }
});
