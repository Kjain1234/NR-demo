// Scroll spy functionality
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".project-navigation-menu a");
const brochureName = "";

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("aria-label");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// interval of 4 seconds. query all slides and then if it contains hidden class, remove it and if it doesn't contain hidden class, add it.
setInterval(() => {
  const slides = document.querySelectorAll(".slide");
  let activeslideIndex = -1;
  slides.forEach((slide) => {
    if (slide.classList.contains("hidden") === false) {
      activeslideIndex = Array.from(slides).indexOf(slide);
    }
  });
  if (activeslideIndex !== -1) {
    slides[activeslideIndex].classList.add("hidden");
    let nextSlideIndex = (activeslideIndex + 1) % slides.length;
    slides[nextSlideIndex].classList.remove("hidden");
  }
}, 4000);

function openOverlay(divElement) {
  let innerDiv = divElement.querySelector("div");
  let imgElement = innerDiv.querySelector("img");
  const overlay = document.querySelector("#zoomed-img-overlay");
  const overlayImg = document.querySelector("#zoomed-img");
  overlay.style.display = "flex"; // show overlay
  overlayImg.src = imgElement.src; // set clicked image
}

function closeOverlay() {
  document.querySelector("#zoomed-img-overlay").style.display = "none";
}
function openBrochureOverlay(brochureNameSelector) {
  const overlay = document.querySelector("#brochure-overlay");
  overlay.style.display = "flex"; // show overlay
  console.log(brochureNameSelector);
  document.querySelector("#brochure-category").value = brochureNameSelector;
  this.brochureName = brochureNameSelector;
}
function downloadBrochure() {
  if (this.brochureName) {
    console.log(this.brochureName);
    if (this.brochureName == "Residential") {
      downloadPDF(
        "../assets/images/Brochure/Nakshatra/Residnetial_Brochure_Nakshatra.pdf",
        "Residnetial_Brochure_Nakshatra.pdf",
      );
    } else {
      downloadPDF(
        "../assets/images/Brochure/Nakshatra/Commercial_Brochure_Nakshatra.pdf",
        "Commercial_Brochure_Nakshatra.pdf",
      );
    }
    closeBrochureOverlay();
  }
}
function downloadPDF(pdfPath, fileName) {
  fetch(pdfPath) // your PDF path
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName; // force download name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // cleanup
    })
    .catch((err) => console.error("Download error:", err));
}

function closeBrochureOverlay() {
  document.querySelector("#brochure-overlay").style.display = "none";
}

const brochureScriptURL = "../brochure.php";
const brochurePopupForm = document.getElementById("brochure-form");
brochurePopupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  downloadBrochure();

  fetch(brochureScriptURL, { method: "POST", body: new FormData(brochurePopupForm) })
  	.then((response) => response.text())
  	.then((data) => {
  		brochurePopupForm.reset();
  	})
  	.catch((error) => console.error("Error!", error.message));
});
