const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

function renderCart() {
  const cart = getCartFromSession();
  cartList.innerHTML = ''; // Clear current cart list

  if (cart.length > 0) {
    cart.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `${item.name} - $${item.price} 
        <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>`;
      cartList.appendChild(li);
    });
  } else {
    const li = document.createElement("li");
    li.textContent = "Your cart is empty.";
    cartList.appendChild(li);
  }
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    const cart = getCartFromSession();
    cart.push(product);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

function removeFromCart(productId) {
  let cart = getCartFromSession();
  cart = cart.filter((item) => item.id !== productId);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

function getCartFromSession() {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

document.addEventListener("click", (event) => {
  if (event.target && event.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    addToCart(productId);
  }

  if (event.target && event.target.classList.contains("remove-from-cart-btn")) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    removeFromCart(productId);
  }
});

clearCartBtn.addEventListener("click", clearCart);

renderProducts();
renderCart();

