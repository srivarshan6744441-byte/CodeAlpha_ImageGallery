
const images = [
    {
        title: "Mountain Serenity",
        category: "nature",
        src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80"
    },
    {
        title: "Architecture Lines",
        category: "architecture",
        src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=900&q=80"
    },
    {
        title: "Coastal Escape",
        category: "travel",
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80"
    },
    {
        title: "Forest Dreams",
        category: "nature",
        src: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80"
    },
    {
        title: "Urban Geometry",
        category: "architecture",
        src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=900&q=80"
    },
    {
        title: "Wanderlust",
        category: "travel",
        src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80"
    },
    {
        title: "Ocean Blue",
        category: "nature",
        src: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80"
    },
    {
        title: "Modern Living",
        category: "architecture",
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80"
    },
    {
        title: "Into the Wild",
        category: "travel",
        src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=900&q=80"
    },
    {
        title: "Golden Fields",
        category: "nature",
        src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=900&q=80"
    },
    {
        title: "City Perspective",
        category: "architecture",
        src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=900&q=80"
    },
    {
        title: "Hidden Paradise",
        category: "travel",
        src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80"
    }
];

// Get HTML elements
const galleryGrid = document.getElementById("gallery-grid");
const galleryCount = document.getElementById("gallery-count");
const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxCategory = document.getElementById("lightbox-category");

const closeLightboxBtn = document.getElementById("close-lightbox");
const prevImageBtn = document.getElementById("prev-image");
const nextImageBtn = document.getElementById("next-image");

let filteredImages = [...images];
let currentIndex = 0;

// Display images in the gallery
function displayImages(imageArray) {
    galleryGrid.innerHTML = "";

    galleryCount.textContent = `${imageArray.length} photographs`;

    imageArray.forEach((image, index) => {
        const card = document.createElement("div");
        card.classList.add("gallery-card");

        card.innerHTML = `
            <div class="image-wrapper">
                <img src="${image.src}" alt="${image.title}" loading="lazy">
            </div>
            <h3>${image.title}</h3>
            <p>${image.category.charAt(0).toUpperCase() + image.category.slice(1)}</p>
        `;

        // Open lightbox when image is clicked
        card.addEventListener("click", () => {
            openLightbox(index);
        });

        galleryGrid.appendChild(card);
    });
}

// Filter images by category
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove("active"));

        // Add active class to clicked button
        button.classList.add("active");

        const category = button.dataset.category;

        if (category === "all") {
            filteredImages = [...images];
        } else {
            filteredImages = images.filter(image => image.category === category);
        }

        displayImages(filteredImages);
    });
});

// Open the lightbox
function openLightbox(index) {
    currentIndex = index;
    updateLightbox();

    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
}

// Update lightbox content
function updateLightbox() {
    const image = filteredImages[currentIndex];

    lightboxImage.src = image.src;
    lightboxImage.alt = image.title;
    lightboxTitle.textContent = image.title;
    lightboxCategory.textContent = image.category.toUpperCase();
}

// Show previous image
function showPreviousImage() {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = filteredImages.length - 1;
    }

    updateLightbox();
}

// Show next image
function showNextImage() {
    currentIndex++;

    if (currentIndex >= filteredImages.length) {
        currentIndex = 0;
    }

    updateLightbox();
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove("show");
    document.body.style.overflow = "auto";
}

// Button events
closeLightboxBtn.addEventListener("click", closeLightbox);
prevImageBtn.addEventListener("click", showPreviousImage);
nextImageBtn.addEventListener("click", showNextImage);

// Close when clicking outside the image
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard controls
document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("show")) return;

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowLeft") {
        showPreviousImage();
    }

    if (event.key === "ArrowRight") {
        showNextImage();
    }
});

// Load gallery when page opens
displayImages(images);
