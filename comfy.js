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
    btns.forEach((button) => {
      let id = button.dataset.id;
      console.log(id);
    });
  }

  // Products.insertAdjacentHTML("")
}

//local storage

class Storage {
  static saveproducts(products) {
    localStorage.setItem("product", JSON.stringify(products));
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
