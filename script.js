/*
  Portfolio interaction:
  - Home/Works stickers move in their own section's coordinate system.
    Their positions are stored as absolute offsets inside that section, never fixed to the viewport.
  - Album windows are shared by all three objects.
  - Clicking a thumbnail opens a separate media-only preview with no arrows/context strip.
*/

const WORKS = {
  visual: {
    title: "Visual & Illustration",
    pages: [
      [
        { type: "image", src: "image/AFg.jpg", title: "Poster design" },
        { type: "placeholder", title: "Character design" },
        { type: "placeholder", title: "Poster / visual" },
        { type: "placeholder", title: "Sketchbook" },
        { type: "placeholder", title: "Digital drawing" }
      ],
      [
        { type: "placeholder", title: "Illustration 06" },
        { type: "placeholder", title: "Character study" },
        { type: "placeholder", title: "Visual experiment" },
        { type: "placeholder", title: "Drawing series" },
        { type: "placeholder", title: "More works" }
      ]
    ]
  },
  design: {
    title: "UI & Graphic Design",
    pages: [
      [
        { type: "image", src: "image/1.jpg", title: "Poster design" },
        { type: "image", src: "image/2.png", title: "Poster design" },
        { type: "image", src: "image/3.png", title: "Poster design" },
        { type: "image", src: "image/4.png", title: "Poster design" },
        { type: "image", src: "image/5.jpg", title: "Poster design" },

      ],
      [{ type: "image", src: "image/9.jpg", title: "Poster design" },
      { type: "image", src: "image/10.jpg", title: "Poster design" },
      { type: "image", src: "image/11.jpg", title: "Poster design" },
      { type: "image", src: "image/12.jpg", title: "Poster design" },
      { type: "image", src: "image/7.jpg", title: "Poster design" },


      ],
      [{ type: "image", src: "image/13.png", title: "Poster design" },
      { type: "image", src: "image/14.png", title: "Poster design" },
      { type: "image", src: "image/15.png", title: "Poster design" },
      { type: "image", src: "image/16.png", title: "Poster design" },
      { type: "image", src: "image/6.jpg", title: "Poster design" },
      { type: "image", src: "image/8.jpg", title: "Poster design" },
      ],
      [
        { type: "image", src: "image/8.jpg", title: "Poster design" },
      ]

    ]
  },
  motion: {
    title: "3D, Animation & Video",
    pages: [
      [
        { type: "image", src: "image/1.png", title: "Poster design" },
        { type: "placeholder", title: "Animation" },
        { type: "placeholder", title: "Video editing" },
        { type: "placeholder", title: "AI creative work" },
        { type: "placeholder", title: "Motion test" }
      ],
      [
        { type: "placeholder", title: "3D scene" },
        { type: "placeholder", title: "Short film" },
        { type: "placeholder", title: "Motion graphics" },
        { type: "placeholder", title: "AI experiment" },
        { type: "placeholder", title: "More works" }
      ]
    ]
  }
};

const modal = document.querySelector("#worksModal");
const spread = document.querySelector("#spread");
const modalTitle = document.querySelector("#modalTitle");
const pageCount = document.querySelector("#pageCount");
const prevPage = document.querySelector("#prevPage");
const nextPage = document.querySelector("#nextPage");
const lightbox = document.querySelector("#lightbox");
const lightboxContent = document.querySelector("#lightboxContent");

let currentCategory = "visual";
let currentPage = 0;
let lastFocusedElement = null;

function openWorks(category) {
  currentCategory = category;
  currentPage = 0;
  lastFocusedElement = document.activeElement;
  renderWorks();
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.querySelector("#closeModal").focus();
}
function closeWorks() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  if (!lightbox.classList.contains("open")) document.body.style.overflow = "";
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") lastFocusedElement.focus();
}
function makeThumb(item, index) {
  const button = document.createElement("button");
  button.className = "work-thumb";
  button.type = "button";
  button.setAttribute("aria-label", item.title || `Open work ${index + 1}`);

  if (item.type === "image" || item.type === "video") {
    const media = item.type === "image" ? document.createElement("img") : document.createElement("video");
    media.src = item.src;
    if (item.type === "image") media.alt = item.title || "Portfolio work";
    if (item.type === "video") {
      media.muted = true;
      media.playsInline = true;
      media.preload = "metadata";
    }
    button.appendChild(media);
    button.addEventListener("click", () => openLightbox(item));
  } else {
    const empty = document.createElement("div");
    empty.className = "empty-thumb";
    empty.textContent = item.title || "Add work";
    button.appendChild(empty);
    button.addEventListener("click", () => openLightbox(item));
  }
  return button;
}
function renderWorks() {
  const group = WORKS[currentCategory];
  const pages = group.pages;
  const items = pages[currentPage] || [];
  modalTitle.textContent = group.title;
  pageCount.textContent = `${String(currentPage + 1).padStart(2, "0")} / ${String(pages.length).padStart(2, "0")}`;
  spread.replaceChildren();

  const leftPage = document.createElement("div");
  leftPage.className = "spread-side";
  const rightPage = document.createElement("div");
  rightPage.className = "spread-side";
  items.slice(0, 3).forEach((item, i) => leftPage.appendChild(makeThumb(item, i)));
  items.slice(3, 5).forEach((item, i) => rightPage.appendChild(makeThumb(item, i + 3)));
  spread.append(leftPage, rightPage);
  prevPage.disabled = currentPage <= 0;
  nextPage.disabled = currentPage >= pages.length - 1;
}
document.querySelectorAll(".work-icon").forEach(button => {
  button.addEventListener("click", () => openWorks(button.dataset.category));
});
document.querySelector("#closeModal").addEventListener("click", closeWorks);
modal.addEventListener("click", event => { if (event.target === modal) closeWorks(); });
prevPage.addEventListener("click", () => {
  if (currentPage > 0) { currentPage--; renderWorks(); }
});
nextPage.addEventListener("click", () => {
  if (currentPage < WORKS[currentCategory].pages.length - 1) { currentPage++; renderWorks(); }
});

function openLightbox(item) {
  lightboxContent.replaceChildren();

  if (item.type === "placeholder") {
    const preview = document.createElement("div");
    preview.className = "preview-placeholder";
    preview.textContent = item.title || "Portfolio work";
    lightboxContent.appendChild(preview);
  } else {
    const media = item.type === "image" ? document.createElement("img") : document.createElement("video");
    media.src = item.src;
    if (item.type === "image") media.alt = item.title || "Portfolio work";
    if (item.type === "video") {
      media.controls = true;
      media.autoplay = true;
      media.playsInline = true;
    }
    lightboxContent.appendChild(media);
  }

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.querySelector("#closeLightbox").focus();
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxContent.replaceChildren();
  if (!modal.classList.contains("open")) document.body.style.overflow = "";
}
document.querySelector("#closeLightbox").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });

/* Drag only with a mouse/pen. Touch keeps native vertical scrolling available.
   The draggable item's coordinates are always relative to its parent section. */
document.querySelectorAll(".draggable").forEach(element => {
  let active = false;
  let pointerId = null;
  let grabX = 0;
  let grabY = 0;
  const section = element.closest(".page");

  element.addEventListener("pointerdown", event => {
    if (event.pointerType === "touch") return;
    if (event.button !== 0) return;
    const sectionRect = section.getBoundingClientRect();
    const itemRect = element.getBoundingClientRect();
    grabX = event.clientX - itemRect.left;
    grabY = event.clientY - itemRect.top;

    // Convert its current visual position into parent-relative absolute coordinates.
    element.style.left = `${itemRect.left - sectionRect.left + section.scrollLeft}px`;
    element.style.top = `${itemRect.top - sectionRect.top + section.scrollTop}px`;
    element.style.right = "auto";
    element.style.bottom = "auto";
    active = true;
    pointerId = event.pointerId;
    element.classList.add("dragging");
    element.setPointerCapture(pointerId);
    event.preventDefault();
  });

  element.addEventListener("pointermove", event => {
    if (!active || event.pointerId !== pointerId) return;
    const sectionRect = section.getBoundingClientRect();
    const maxLeft = Math.max(0, section.clientWidth - element.offsetWidth);
    const maxTop = Math.max(0, section.scrollHeight - element.offsetHeight);
    const left = Math.min(maxLeft, Math.max(0, event.clientX - sectionRect.left + section.scrollLeft - grabX));
    const top = Math.min(maxTop, Math.max(0, event.clientY - sectionRect.top + section.scrollTop - grabY));
    element.style.left = `${left}px`;
    element.style.top = `${top}px`;
  });

  function stopDrag(event) {
    if (!active || (event && event.pointerId !== pointerId)) return;
    active = false;
    element.classList.remove("dragging");
    pointerId = null;
  }
  element.addEventListener("pointerup", stopDrag);
  element.addEventListener("pointercancel", stopDrag);
  element.addEventListener("lostpointercapture", stopDrag);
});

const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#mainNav");
menuToggle.addEventListener("click", () => {
  const opened = nav.classList.toggle("show");
  menuToggle.setAttribute("aria-expanded", String(opened));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("show");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeLightbox();
    closeWorks();
    nav.classList.remove("show");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});
