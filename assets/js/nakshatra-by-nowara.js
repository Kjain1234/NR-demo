// Scroll spy functionality
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".project-navigation-menu a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("aria-label");
    }
  });

  navLinks.forEach(link => {
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
    slides.forEach(slide => {
        if(slide.classList.contains("hidden") === false){
            activeslideIndex = Array.from(slides).indexOf(slide);
        }
    });
    if(activeslideIndex !== -1){
        slides[activeslideIndex].classList.add("hidden");
        let nextSlideIndex = (activeslideIndex + 1) % slides.length;
        slides[nextSlideIndex].classList.remove("hidden");
    }
}, 4000);