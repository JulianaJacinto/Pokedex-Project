const inputElement = document.querySelector("#search-input");
const search_icon = document.querySelector("#search-close-icon");
const sort_wrapper = document.querySelector(".sort-wrapper");

inputElement.addEventListener("input", () => {
  handleInputChange(inputElement);
});
search_icon.addEventListener("click", handleSearchCloseOnClick);
sort_wrapper.addEventListener("click", handleSortIconOnClick);

function handleInputChange(inputElement) {
  const inputValue = inputElement.value;

  if (inputValue !== "") {
    document
      .querySelector("#search-close-icon")
      .classList.add("search-close-icon-visible");
  } else {
    document
      .querySelector("#search-close-icon")
      .classList.remove("search-close-icon-visible");
  }
}

function handleSearchCloseOnClick() {
  document.querySelector("#search-input").value = "";
  document
    .querySelector("#search-close-icon")
    .classList.remove("search-close-icon-visible");
}

function handleSortIconOnClick() {
  document
    .querySelector(".filter-wrapper")
    .classList.toggle("filter-wrapper-open");
  document.querySelector("body").classList.toggle("filter-wrapper-overlay");
}

function togglePassword(inputId, icon) {
  const input = document.getElementById(inputId);
  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  }
}
