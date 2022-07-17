//Select elements
const shoppingBag = document.querySelector(".shopping-bag");
const displayBag = document.querySelector(".sale__items-item-button");
const cartProductElement = document.querySelector(".shopping-cart-products");
const totalElement = document.querySelector(".total");
const totalItemsInBag = document.querySelector(".total-items-in-cart");

//shopping-bag icon hidden
shoppingBag.style.display = "none";

//cart array
let cart = [];

//Add to Cart
function addToCart(id) {
  // check if product already exist in cart
  if (cart.some((product) => product.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    shoppingBag.style.display = "block"; //to display shopping bag icon
    const product = items.find((item) => item.id === id);

    cart.push({
      ...product,
      numberOfUnits: 1,
    });
    console.log(cart);
  }
  updateCart();
}

//update cart
function updateCart() {
  renderCartProducts();
  renderTotal();
}

//calculate and render Total
function renderTotal() {
  let total = 0;
  let totalItems = 0;

  cart.forEach((item) => {
    total += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  totalElement.innerHTML = `<h6 class="shopping-cart__h6">Total: $${total.toFixed(
    2
  )}</h6>`;
  totalItemsInBag.innerHTML = totalItems;
  //hide shopping bag if it empty
  if (total === 0) {
    shoppingBag.style.display = "none";
  }
}

// render cart products
function renderCartProducts() {
  cartProductElement.innerHTML = ""; //clear cart element
  cart.forEach((item) => {
    cartProductElement.innerHTML += `
    <article class="shopping-cart__products">
          <div class="shopping-cart__item">
              <img src="${item.smallImgUrl}" alt="${item.name}">
              <h6 class="shopping-cart__h6">${item.name}</h6>
              <div class="units">
                  <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                  <div class="number">${item.numberOfUnits}</div>
                  <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>
              </div>
              <p class="shopping-cart__price">$ ${item.price}</p>
          </div>
          <div class="bin-icon" onclick="removeItemfromCart(${item.id})">
              <img src="img/bin-icon.jpeg" alt="bin icon">
          </div>
          <div class="shopping-cart__special-divider"></div>
    </article>
    `;
  });
}
//remove item from the cart
function removeItemfromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}

//change number of units
function changeNumberOfUnits(action, id) {
  cart = cart.map((product) => {
    let oldNumberOfUnits = product.numberOfUnits;

    if (product.id === id) {
      if (action === "minus" && oldNumberOfUnits > 1) {
        oldNumberOfUnits--;
      } else if (action === "plus") {
        oldNumberOfUnits++;
      }
    }
    return {
      ...product,
      numberOfUnits: oldNumberOfUnits,
    };
  });

  updateCart();
}
