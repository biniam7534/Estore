let cart = JSON.parse(localStorage.getItem("cart")) || [];
let activeCategory = "all";
let searchQuery = " ";
const products = [
    { id: 1, name: "Wireless Headphone", price: 3500.00, image: "./images/images (10).jpg", category: "electronics", description: "High-quality wireless headphones with noise cancellation and long battery life." },
    { id: 2, name: "Smart phone", price: 42500.00, image: "./images/iphone.avif", category: "electronics", description: "Latest smartphone with advanced features and sleek design." },
    { id: 3, name: "Men suit", price: 18000.00, image: "./images/shopping (1).webp", category: "fashion-clothes", description: "Suit designed for formal occasions, made with high-quality fabric." },
    { id: 4, name: "Camera", price: 60000.00, image: "./images/camera.avif", category: "electronics", description: "High quality camera for images and videos." },
    { id: 5, name: "Plate", price: 12000.00, image: "./images/download.jpg", category: "home-material", description: "A luxury plate for stylish dining." },
    { id: 6, name: "Eye glass", price: 2800.00, image: "./images/vishnu-prasad-STykhkcG-p8-unsplash.jpg", category: "electronics", description: "Stylish eyewear protecting eyes from UV rays." },
    { id: 7, name: "Female dress", price: 140000.00, image: "./images/download.webp", category: "fashion-clothes", description: "A beautiful and elegant dress." },
    { id: 8, name: "Habesha tebab", price: 10099.90, image: "./images/shopping.webp", category: "traditional-clothes", description: "Traditional Ethiopian wear." },
    { id: 9, name: "Smart watch", price: 6700.99, image: "./images/daniel-korpai-QhF3YGsDrYk-unsplash.jpg", category: "electronics", description: "A smartwatch combining digital watch with advanced features." },
    { id: 10, name: "Glass", price: 1199.99, image: "./images/glass.avif", category: "home-material", description: "A glass container for drinking beverages." }
];

function initProducts() {
    const container = document.getElementById("products-container");
    container.innerHTML = "";
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <h2 class="product-title">${product.name}</h2>
      <p class="product-description">${product.description}</p>
      <p class="product-price">Birr ${product.price.toFixed(2)}</p>
      <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
    `;
        container.appendChild(productCard);
    });
}

function toggleCart() {
    document.getElementById("cart-sidebar").classList.toggle("cart-sidebar-active");
}

function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.Quantity++;
    } else {
        cart.push({...product, Quantity: 1 });
    }
    updateCartDisplay();
    saveCartToLocalStorage();
}

function updateCartDisplay() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.Quantity;
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
      <div style="display: flex; align-items: center;">
        <img src="${item.image}" alt="${item.name}" style="width:50px;height:50px;margin-right:10px;">
        <div>
          <h3>${item.name}</h3>
          <p>${item.price} x ${item.Quantity}</p>
        </div>
      </div>
      <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
    `;
        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = cart.reduce((sum, item) => sum + item.Quantity, 0);
    cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    saveCartToLocalStorage();
}

function showPaymentModal() {
    if (cart.length === 0) {
        return alert("Your cart is empty");
    }
    document.getElementById("payment-total").textContent = cart
        .reduce((sum, item) => sum + item.price * item.Quantity, 0)
        .toFixed(2);
    document.getElementById("payment-modal").style.display = "block";
}

function closePaymentModal() {
    document.getElementById("payment-modal").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
    initProducts();
    updateCartDisplay();
});

function resetPaymentUI() {
    document.getElementById("payment-form").reset();
    document.getElementById("payment-processing").style.display = "none";
    document.getElementById("payment-success").style.display = "none";
    document.getElementById("payment-form").style.display = "block";

}

function processPayment(e) {
    e.preventDefault()
        //show animation processing
    document.getElementById("payment-form").style.display = "none"
    document.getElementById("payment-processing").style.display = "block";
    setTimeout(() => {
        document.getElementById("payment-processing").style.display = "none"
        document.getElementById("payment-success").style.display = "block"

        setTimeout(() => {
            cart = []
            localStorage.removeItem("cart")
            updateCartDisplay()
            closePaymentModal()
        }, 2000);
    }, 3000);

}
//filter and display products
function displayproducts(){
    const container = document.getElementById("products-container");
    container.innerHTML = " ";
    
    const filterproducts = products.filter((product)=>{
        const matchsCatagory = activeCategory === "all" || product.category === activeCategory
        const matchsSearch = product.name.to
    })
}