const card = document.querySelector("#membershipCard");
const tierButtons = document.querySelectorAll(".tier-option");
const tierLabel = card.querySelector(".tier-label");
const toast = document.querySelector("#toast");
const toastText = toast.querySelector("span");
let toastTimer;

const showToast = (message) => {
  toastText.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
};

document.querySelectorAll("[data-toast]").forEach((element) => {
  element.addEventListener("click", () => showToast(element.dataset.toast));
});

tierButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const tier = button.dataset.tier;
    tierButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
      item.querySelector("svg")?.remove();
    });

    const check = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    check.innerHTML = '<use href="#i-check"/>';
    button.append(check);

    card.className = `membership-card tier-${tier}`;
    tierLabel.textContent = button.querySelector("b").textContent.toUpperCase();
    card.setAttribute("aria-label", `Kartu ${button.querySelector("b").textContent} member Andi Rahman`);
  });
});

const resetCard = () => {
  card.style.transform = "rotateX(0deg) rotateY(0deg)";
};

card.addEventListener("pointermove", (event) => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const rect = card.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;
  card.style.setProperty("--mouse-x", `${x * 100}%`);
  card.style.setProperty("--mouse-y", `${y * 100}%`);
  card.style.transform = `rotateX(${(0.5 - y) * 9}deg) rotateY(${(x - 0.5) * 11}deg)`;
});
card.addEventListener("pointerleave", resetCard);
card.addEventListener("blur", resetCard);

document.querySelector("#copyId").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("IHC 0829 4012");
    showToast("Member ID berhasil disalin");
  } catch {
    showToast("Member ID: IHC 0829 4012");
  }
});

const searchInput = document.querySelector("#searchInput");
const benefits = [...document.querySelectorAll(".benefit-card")];
const emptyState = document.querySelector("#emptyState");

const filterBenefits = () => {
  const query = searchInput.value.trim().toLowerCase();
  let visible = 0;
  benefits.forEach((benefit) => {
    const matches = benefit.dataset.search.includes(query) || benefit.textContent.toLowerCase().includes(query);
    benefit.hidden = !matches;
    if (matches) visible += 1;
  });
  emptyState.style.display = visible ? "none" : "block";
  if (query) document.querySelector("#benefits").scrollIntoView({ behavior: "smooth", block: "start" });
};

searchInput.addEventListener("input", filterBenefits);
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === "Escape" && document.activeElement === searchInput) {
    searchInput.value = "";
    filterBenefits();
    searchInput.blur();
  }
});

const navLinks = [...document.querySelectorAll(".main-nav .nav-link, .mobile-nav a")];
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const target = link.getAttribute("href");
    document.querySelectorAll(`a[href="${target}"]`).forEach((item) => {
      const parent = item.closest("nav");
      parent?.querySelectorAll("a").forEach((navItem) => navItem.classList.remove("active"));
      item.classList.add("active");
    });
  });
});

document.querySelector(".notification-button")?.addEventListener("click", () => showToast("Tidak ada notifikasi baru"));
