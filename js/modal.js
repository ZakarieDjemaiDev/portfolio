const modal = document.getElementById("modal");
const openBtn = document.getElementById("open-modal");
const closeBtns = document.querySelectorAll(".modal-close, #modal-action");

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

function openModal() {
  modal.setAttribute("aria-hidden", "false");
  modal.classList.add("modal-visible");
  document.body.classList.add("modal-open");
  const firstFocusable = modal.querySelector(FOCUSABLE);
  if (firstFocusable) firstFocusable.focus();
}

function closeModal() {
  modal.setAttribute("aria-hidden", "true");
  modal.classList.remove("modal-visible");
  document.body.classList.remove("modal-open");
  if (openBtn) openBtn.focus();
}

if (openBtn && modal) {
  openBtn.addEventListener("click", openModal);
  
  closeBtns.forEach(btn => {
    btn.addEventListener("click", closeModal);
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  modal.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  modal.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    
    const focusables = [...modal.querySelectorAll(FOCUSABLE)];
    if (focusables.length === 0) return;
    
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}