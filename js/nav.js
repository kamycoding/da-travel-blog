const hamburger = document.querySelector(".hamburger");
const menu = document.getElementById("header-menu");

hamburger.addEventListener("click", () => {
  const isOpen = hamburger.getAttribute("aria-expanded") === "true";

  hamburger.setAttribute("aria-expanded", String(!isOpen));
  hamburger.classList.toggle("is-open");
  menu.classList.toggle("is-open");
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.classList.remove("is-open");
    menu.classList.remove("is-open");
  });
});
