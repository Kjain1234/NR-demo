const popupScriptURL = "../enquire.php";

const enquiryPopupForm = document.getElementById("popup-form");
const enquiryPopupFormAlert = document.getElementById("popupAlert");
enquiryPopupForm.addEventListener("submit", (e) => {
	e.preventDefault();

	fetch(popupScriptURL, { method: "POST", body: new FormData(enquiryPopupForm) })
		.then((response) => response.text())
		.then((data) => {
			enquiryPopupForm.reset();
			enquiryPopupFormAlert.style.display = "block";
			// Hide after 2 seconds
			setTimeout(() => {
				enquiryPopupFormAlert.style.display = "none";
			}, 2000);
		})
		.catch((error) => console.error("Error!", error.message));
});
