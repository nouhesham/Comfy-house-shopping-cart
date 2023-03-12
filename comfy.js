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
//cart items
let cart = [];

cartbutton.addEventListener("click", function () {
  cartOverlay.classList.add("showcart");
  cartOverlay.classList.add("transparentBcg");
});
