// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector(".navbar-nav");
const hamburgerMenu = document.querySelector("#hamburger-menu");

hamburgerMenu.onclick = () => {
  navbarNav.classList.toggle("active");
};

// Toggle search form
const searchform = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

// klik search
document.querySelector("#search-button").onclick = (e) => {
  searchform.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

hamburgerMenu.onclick = (e) => {
  navbarNav.classList.toggle("active");
  e.preventDefault();
};

// Toggle class active untuk shopping cart
const shoppingCartMenu = document.querySelector(".shopping-cart");
document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCartMenu.classList.toggle("active");
  e.preventDefault();
};

// klik di luar elemen
const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");
const sc = document.querySelector("#shopping-cart-button");

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }

  if (!sb.contains(e.target) && !searchform.contains(e.target)) {
    searchform.classList.remove("active");
  }

  if (!sc.contains(e.target) && !shoppingCartMenu.contains(e.target)) {
    shoppingCartMenu.classList.remove("active");
  }
});

// Modal Box
const itemDetailModal = document.querySelector("#item-detail-modal");
const itemDetailButtons = document.querySelectorAll(".item-detail-button");

// Klik tombol detail
itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal.style.display = "flex";
    e.preventDefault();
  };
});

// Klik Tombol close modal icon
document.querySelector(".modal .close-icon").onclick = (e) => {
  itemDetailModal.style.display = "none";
  e.preventDefault();
};

// Klik luar modal box
window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = "none";
  }
};
