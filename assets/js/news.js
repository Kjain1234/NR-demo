function openOverlay(divElement) {
//   let innerDiv = divElement.querySelector("div");
  let imgElement = divElement.querySelector("img");
  const overlay = document.querySelector("#zoomed-img-overlay");
  const overlayImg = document.querySelector("#zoomed-img");
  overlay.style.display = "flex"; // show overlay
  overlayImg.src = imgElement.src; // set clicked image
}

function closeOverlay() {
  document.querySelector("#zoomed-img-overlay").style.display = "none";
}