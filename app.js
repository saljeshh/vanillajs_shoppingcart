const productEl = document.querySelector('#products');
const cartEl = document.querySelector('#cart');
const subtotaEl = document.querySelector('#subtotal');
const totalInCartEl = document.querySelector('#totalInCart');

// render product function
function renderProduct() {
  products.forEach((product) => {
    productEl.innerHTML += `
        <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src="${product.imgSrc}" alt="${product.name}">
                    </div>
                    <div class="desc">
                        <h2>T-shirt 1</h2>
                        <h2><small>$</small>${product.price}/h2>
                        <p>
                            ${product.description}
                        </p>
                    </div>
                    <div class="add-to-wishlist">
                        <img src="./icons/heart.png" alt="add to wish list">
                    </div>
                    <div class="add-to-cart">
                        <img src="./icons/bag-plus.png" alt="add to cart" onclick="addToCart(${product.id})">
                    </div>
                </div>
        </div>
    `;
  });
}

renderProduct();

let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCart();

// function add to cart
function addToCart(id) {
  // check if product is already in cart
  if (cart.some((item) => item.id === id)) {
    changeQuantity('plus', id);
  } else {
    const item = products.find((product) => product.id === id);
    //   console.log(item);
    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }

  updateCart();
}

function updateCart() {
  renderCartItems();
  renderSubtotal();

  // add to localstorage
  localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCartItems() {
  // reset data
  cartEl.innerHTML = '';

  cart.forEach((item) => {
    cartEl.innerHTML += `
            <div class="cart-item">
                <div class="item-info">
                    <img src="${item.imgSrc}" alt="${item.name}" />
                    <h4>${item.name}</h4>
                </div>
                <div class="unit-price"><small>$</small>${item.price}</div>
                <div class="units">
                    <div class="btn minus" onclick="changeQuantity('minus', ${item.id})">-</div>
                    <div class="number">${item.numberOfUnits}</div>
                    <div class="btn plus" onclick="changeQuantity('plus', ${item.id})">+</div>
                </div>
            </div>
        `;
  });
}

function changeQuantity(operation, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (operation === 'plus' && numberOfUnits < item.instock) {
        numberOfUnits++;
      } else if (operation === 'minus' && numberOfUnits > 1) {
        numberOfUnits--;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
}

function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  subtotaEl.innerHTML = `Subtotal (${totalItems} items): $${totalPrice.toFixed(
    2
  )} `;

  totalInCartEl.innerHTML = totalItems;
}
