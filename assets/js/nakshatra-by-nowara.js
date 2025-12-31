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


window.onload = function initMap() {
  // Coordinates for your two offices
  var office1 = { lat: 28.403883510870727, lng: 76.99640950323717 }; // Example: Panipat
  var office2 = { lat: 28.457147465010387, lng: 76.81848665581106 }; // Example: Delhi

  // Create the map centered around the first office
  var map = new google.maps.Map(document.getElementById("map-container"), {
    zoom: 8,
    center: office1
  });

  // Add markers
  var marker1 = new google.maps.Marker({
    position: office1,
    map: map,
    title: "Nowara Realty Office",
    label: {
      text: "Nowara Realty Office",
      color: "black",
      fontSize: "14px",
      fontWeight: "bold"
    }
  });

  var marker2 = new google.maps.Marker({
    position: office2,
    map: map,
    title: "Nakshatra by Nowara",
    label: {
      text: "Nakshatra by Nowara",
      color: "black",
      fontSize: "14px",
      fontWeight: "bold"
    }
  });

  // Optional: Fit map bounds to show both markers nicely
  var bounds = new google.maps.LatLngBounds();
  bounds.extend(office1);
  bounds.extend(office2);
  map.fitBounds(bounds);

  // Marker 1 click → directions to Office 1
  google.maps.event.addListener(marker1, 'click', function () {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${office1.lat},${office1.lng}`,
      '_blank'
    );
  });

  // Marker 2 click → directions to Office 2
  google.maps.event.addListener(marker2, 'click', function () {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${office2.lat},${office2.lng}`,
      '_blank'
    );
  });
}