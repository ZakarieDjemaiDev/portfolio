class LiWithSubnav {
  #li = null;
  #button = null;
  #ul = null;

  constructor(li) {
    this.#li = li;
    this.#ul = this.#li.querySelector(":scope > ul");
    this.createButton();

    this.#button.addEventListener("click", (e) => {
      e.stopPropagation();
      if (this.#li.classList.contains("subnav-visible")) {
        this.collapse(true);
      } else {
        this.expand();
        const firstLink = this.#ul.querySelector(":scope > li:first-child > a");
        if (firstLink) firstLink.focus();
      }
    });

    this.#ul.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        this.collapse(true);
      }
    });

    this.#ul.addEventListener("focusout", (event) => {
      if (!this.#li.contains(event.relatedTarget)) {
        this.collapse();
      }
    });
  }

  expand() {
    this.#li.classList.add("subnav-visible");
    this.#button.setAttribute("aria-expanded", "true");
  }

  collapse(focus = false) {
    this.#li.classList.remove("subnav-visible");
    this.#button.setAttribute("aria-expanded", "false");
    if (focus) this.#button.focus();
  }

  createButton() {
    const button = document.createElement("button");
    const iconDown = document.createElement("span");
    const iconUp = document.createElement("span");

    iconDown.classList.add("bx", "bx-chevron-down", "icon-down");
    iconUp.classList.add("bx", "bx-chevron-up", "icon-up");
    iconDown.setAttribute("aria-label", "Afficher le sous-menu");
    iconUp.setAttribute("aria-label", "Masquer le sous-menu");

    button.append(iconDown, iconUp);
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", this.#ul.id);

    this.#li.classList.add("has-subnav");
    this.#li.insertBefore(button, this.#ul);
    this.#button = button;
  }
}

// Initialisation
document.querySelectorAll("#nav li:has(> ul)").forEach((li) => {
  const ul = li.querySelector(":scope > ul");
  if (!ul.id) {
    ul.id = "subnav-" + Math.random().toString(36).slice(2, 7);
  }
  new LiWithSubnav(li);
});