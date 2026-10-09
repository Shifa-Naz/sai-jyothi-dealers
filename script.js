const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle) {
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-label", "Open navigation");
    }
  });
});

document.querySelectorAll(".faq-list details").forEach(item => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    document.querySelectorAll(".faq-list details").forEach(other => {
      if (other !== item) other.open = false;
    });
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("inquiry-form");
const fileInput = document.getElementById("attachment");
const status = document.getElementById("form-status");

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file && file.size > 10 * 1024 * 1024) {
    status.textContent = "That file is larger than 10 MB. Please choose a smaller file.";
    fileInput.value = "";
  } else {
    status.textContent = "";
  }
});

form.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const file = fileInput.files[0];
  if (file && file.size > 10 * 1024 * 1024) {
    status.textContent = "That file is larger than 10 MB. Please choose a smaller file.";
    return;
  }

  const data = new FormData(form);
  const fields = [
    ["Name", data.get("name")],
    ["Phone", data.get("phone")],
    ["Email", data.get("email") || "Not provided"],
    ["Project type", data.get("projectType")],
    ["Kitchen size", data.get("kitchenSize") || "Not provided"],
    ["Wardrobe size", data.get("wardrobeSize") || "Not provided"],
    ["Room length (ft)", data.get("length") || "Not provided"],
    ["Room width (ft)", data.get("width") || "Not provided"],
    ["Room height (ft)", data.get("height") || "Not provided"],
    ["Requirement", data.get("requirement") || "Not provided"],
    ["File selected", file ? `${file.name} (please attach manually in WhatsApp)` : "No file"]
  ];

  const message = "Hello Sai Jyothi Dealers! I'd like to enquire about a project.\n\n" +
    fields.map(([label, value]) => `${label}: ${value}`).join("\n");
  status.textContent = "Opening WhatsApp with your inquiry. Please review the message and press Send.";
  window.open(`https://wa.me/919945278366?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});

// AI Interior Studio: accessible before/after slider. The transformation GIF loops automatically.
(() => {
  const slider = document.getElementById('comparison-slider');
  const frame = document.getElementById('comparison-frame');
  const afterWrap = frame?.querySelector('.comparison-after-wrap');
  function updateComparison(value) {
    if (!frame || !afterWrap) return;
    frame.style.setProperty('--compare', `${value}%`);
    frame.style.setProperty('--compare-num', Math.max(Number(value), 1));
    afterWrap.style.width = `${value}%`;
  }
  slider?.addEventListener('input', event => updateComparison(event.target.value));
  updateComparison(slider?.value || 50);
})();
