const form = document.querySelector(".contact_form");
const privacyCheckbox = document.getElementById("privacy");
const checkboxWrapper = document.querySelector(".contact_checkbox");
const privacyError = document.getElementById("privacy-error");

form.addEventListener("submit", (e) => {
  if (!privacyCheckbox.checked) {
    e.preventDefault();
    checkboxWrapper.classList.add("has-error");
    privacyError.textContent = "Please accept the privacy policy.";
  } else {
    checkboxWrapper.classList.remove("has-error");
    privacyError.textContent = "";
  }
});

privacyCheckbox.addEventListener("change", () => {
  if (privacyCheckbox.checked) {
    checkboxWrapper.classList.remove("has-error");
    privacyError.textContent = "";
  }
});
