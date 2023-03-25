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
let buttonsDom = [];

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
    !cartOverlay.classList.contains("hidden") &&
    !CartDom.classList.contains("translateX(100%)")
  ) {
    close();
  }
});
//getting the products

class Products {
  async getProducts() {
    try {
      let result = await fetch("products.json");
      let data = await result.json();
      let products = data.items;
      products = products.map((item) => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, price, id, image };
      });
      console.log(products);
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

//display produccts

class UI {
  displayProducts(products) {
    let result = "";
    products.forEach((product) => {
      result += ` <article class="product">
        <div class="img-container">
          <img src=${product.image} alt="" class="product-img" />
          <button class="bag-btn" data-id=${product.id}>
            <i class="fas fa-cart-shopping"></i>Add to the bag
          </button>
        </div>
        <h3>${product.title}</h3>
        <h4>${product.price}$</h4>
      </article>`;
    });
    productsDom.innerHTML = result;
    // productsDom.textContent = result;
  }

  getBagButtons() {
    const btns = [...document.querySelectorAll(".bag-btn")];
    buttonsDom = btns;
    btns.forEach((button) => {
      let id = button.dataset.id;
      let incart = cart.find((item) => item.id === id);
      if (incart) {
        button.innerText = "IN CART";
        button.disabled = true;
      } else {
        button.addEventListener("click", (event) => {
          event.target.innerText = "In Cart";
          event.target.disabled = true;

          //get product from products
          let cartItem = { ...Storage.getProducts(id), amount: 1 };

          //add product to the cart
          cart = [...cart, cartItem];
          console.log(cart);
          //save cart in local storgae
          Storage.saveCart(cart);
          //set cart values
          this.setCartValues(cart);

          //add cart item and display it
          this.addCartItem(cartItem);

          //show the cart
        });
      }
    });
  }
  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map((item) => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
  }
  addCartItem(item) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `<img src=${item.Image} alt="">
    <div>
      <h4>${item.title}</h4>
      <h5>${item.price}$</h5>
      <span class="remove-item" data-id=${item.id}>remove</span>
  </div>
  <div>
    <i class="fas fa-chevron-up" data-id=${item.id}></i>
    <p class="item-amount">1</p>
    <i class="fas fa-chevron-down" data-id=${item.id}></i>
  </div>`;
  }

  // Products.insertAdjacentHTML("")
}

//local storage

class Storage {
  static saveproducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProducts(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id === id);
  }
  static saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  // get products
  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);
      Storage.saveproducts(products);
    })
    .then(() => {
      ui.getBagButtons();
    });
});
