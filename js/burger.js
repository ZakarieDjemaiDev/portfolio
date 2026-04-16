const nav = document.getElementById("nav");
const burger = document.getElementById("burger");

if (burger && nav) {
  nav.classList.add("nav-hidden");

  burger.addEventListener("click", () => {
    if (nav.classList.contains("nav-hidden")) {
      nav.classList.remove("nav-hidden");
      burger.setAttribute("aria-expanded", "true");
    } else {
      nav.classList.add("nav-hidden");
      burger.setAttribute("aria-expanded", "false");
    }
  });

  nav.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      nav.classList.add("nav-hidden");
      burger.setAttribute("aria-expanded", "false");
      burger.focus();
    }
  });
}