"strict";
const cartbutton = document.querySelector(".cart-btn");
const closeCartbtn = document.querySelector(".close-cart");
const clearCartbtn = document.querySelector(".clear-cart");
const CartDom = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDom = document.querySelector(".products-center");
const showcart = document.querySelector(".showcart");
const iconclose = document.querySelector("#icon");

//cart items
let cart = [];

const show = function () {
  cartOverlay.classList.add("showcart");
  cartOverlay.classList.add("transparentBcg");
  CartDom.style.transform = "translateX(0)";
};
console.log(iconclose);
const close = function () {
  cartOverlay.classList.remove("showcart");
  cartOverlay.classList.remove("transparentBcg");
  CartDom.style.transform = "translateX(100%)";
};
iconclose.addEventListener("click", close);

cartbutton.addEventListener("click", show);
iconclose.addEventListener("click", function () {
  console.log("hello");
});

document.addEventListener("keydown", function (e) {
  if (
    e.key === "Escape" &&
    cartOverlay.classList.contains("visible") &&
    CartDom.classList.contains("translateX(100%)")
  ) {
    close();
  }
});
//getting the products

class products {}

//display products

class UI {}

//local storage

class Storage {}
document.addEventListener("DOMContentLoaded", () => {});
