const photographs = [
  {
    title: "Where the water rests",
    category: "nature",
    label: "Nature",
    location: "Dolomites, Italy",
    alt: "A still alpine lake reflecting the mountains under a cloudy sky",
    image: "photo-1470770841072-f978cf4d019e",
    shape: "landscape",
  },
  {
    title: "A quiet geometry",
    category: "architecture",
    label: "Spaces",
    location: "Copenhagen, Denmark",
    alt: "Minimal modern architecture seen in the warm light of the afternoon",
    image: "photo-1511818966892-d7d671e672a2",
    shape: "wide",
  },
  {
    title: "Morning, unhurried",
    category: "people",
    label: "People",
    location: "Paris, France",
    alt: "A quiet portrait in the soft light of the morning",
    image: "photo-1534528741775-53994a69daeb",
    shape: "portrait",
  },
  {
    title: "The long way around",
    category: "travel",
    label: "Elsewhere",
    location: "Marrakech, Morocco",
    alt: "A winding road disappearing into an open, sunlit landscape",
    image: "photo-1464822759023-fed622ff2c3b",
    shape: "landscape",
  },
  {
    title: "Light finds a way",
    category: "nature",
    label: "Nature",
    location: "Olympic National Park, USA",
    alt: "Golden light filtering softly through a quiet forest",
    image: "photo-1448375240586-882707db888b",
    shape: "portrait",
  },
  {
    title: "Rooms for dreaming",
    category: "architecture",
    label: "Spaces",
    location: "Kyoto, Japan",
    alt: "A serene minimalist room opening out to a garden",
    image: "photo-1600210492486-724fe5c67fb0",
    shape: "landscape",
  },
  {
    title: "Between the lines",
    category: "people",
    label: "People",
    location: "Lisbon, Portugal",
    alt: "A candid portrait in soft, natural afternoon light",
    image: "photo-1506794778202-cad84cf45f1d",
    shape: "portrait",
  },
  {
    title: "The edge of somewhere",
    category: "travel",
    label: "Elsewhere",
    location: "Faroe Islands",
    alt: "A dramatic open coastline disappearing beneath a cloudy sky",
    image: "photo-1464278533981-50106e6176b1",
    shape: "wide",
  },
  {
    title: "A softer green",
    category: "nature",
    label: "Nature",
    location: "Madeira, Portugal",
    alt: "Dense tropical foliage glowing in the soft morning light",
    image: "photo-1441974231531-c6227db76b6e",
    shape: "landscape",
  },
  {
    title: "Everyday monument",
    category: "architecture",
    label: "Spaces",
    location: "New York, USA",
    alt: "Sculptural city buildings reaching high into the sky",
    image: "photo-1487958449943-2429e8be8625",
    shape: "landscape",
  },
  {
    title: "A pause in passing",
    category: "people",
    label: "People",
    location: "Amsterdam, Netherlands",
    alt: "A thoughtful portrait captured in an unposed moment",
    image: "photo-1531123897727-8f129e1688ce",
    shape: "portrait",
  },
  {
    title: "Past the last turn",
    category: "travel",
    label: "Elsewhere",
    location: "Iceland",
    alt: "A remote landscape beneath a hazy, open sky",
    image: "photo-1500530855697-b586d89ba3ee",
    shape: "landscape",
  },
];

const imageUrl = (id, width = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const grid = document.querySelector("#gallery-grid");
const filters = [...document.querySelectorAll(".filter-button")];
const visibleCount = document.querySelector("#visible-count");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxTitle = document.querySelector(".lightbox-title");
const lightboxCategory = document.querySelector(".lightbox-category");
const lightboxCounter = document.querySelector(".lightbox-counter");
const closeButton = document.querySelector(".lightbox-close");
const previousButton = document.querySelector(".lightbox-prev");
const nextButton = document.querySelector(".lightbox-next");

let activeFilter = "all";
let activePhotoIndex = 0;
let previouslyFocusedElement = null;

function createCard(photo, index) {
  const card = document.createElement("button");
  card.className = "gallery-card";
  card.type = "button";
  card.dataset.category = photo.category;
  card.setAttribute("aria-label", `${photo.title}, ${photo.location}. Open photograph.`);

  const image = document.createElement("img");
  image.src = imageUrl(photo.image, 900);
  image.alt = photo.alt;
  image.loading = index < 4 ? "eager" : "lazy";
  image.decoding = "async";

  const overlay = document.createElement("span");
  overlay.className = "card-overlay";

  const title = document.createElement("span");
  title.className = "gallery-card-title";
  title.textContent = photo.title;

  const category = document.createElement("span");
  category.className = "gallery-card-category";
  category.textContent = photo.label;

  overlay.append(title, category);
  card.append(image, overlay);
  card.addEventListener("click", () => openLightbox(index));
  return card;
}

photographs.forEach((photo, index) => grid.append(createCard(photo, index)));

function filterPhotos(category) {
  activeFilter = category;
  let count = 0;

  [...grid.children].forEach((card) => {
    const isVisible = category === "all" || card.dataset.category === category;
    card.hidden = !isVisible;
    if (isVisible) count += 1;
  });

  visibleCount.textContent = String(count).padStart(2, "0");
  filters.forEach((button) => {
    const isActive = button.dataset.filter === category;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

filters.forEach((button) => {
  button.addEventListener("click", () => filterPhotos(button.dataset.filter));
});

function showPhoto(index) {
  activePhotoIndex = (index + photographs.length) % photographs.length;
  const photo = photographs[activePhotoIndex];
  lightboxImage.src = imageUrl(photo.image, 1800);
  lightboxImage.alt = photo.alt;
  lightboxTitle.textContent = photo.title;
  lightboxCategory.textContent = `${photo.label} · ${photo.location}`;
  lightboxCounter.textContent = `${String(activePhotoIndex + 1).padStart(2, "0")} / ${String(photographs.length).padStart(2, "0")}`;
}

function openLightbox(index) {
  previouslyFocusedElement = document.activeElement;
  showPhoto(index);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  closeButton.focus();
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (previouslyFocusedElement instanceof HTMLElement) previouslyFocusedElement.focus();
}

previousButton.addEventListener("click", () => showPhoto(activePhotoIndex - 1));
nextButton.addEventListener("click", () => showPhoto(activePhotoIndex + 1));
closeButton.addEventListener("click", closeLightbox);
lightbox.querySelector("[data-close-lightbox]").addEventListener("click", closeLightbox);

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("is-open")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showPhoto(activePhotoIndex - 1);
  if (event.key === "ArrowRight") showPhoto(activePhotoIndex + 1);
});
