let cart = JSON.parse(localStorage.getItem("cart")) || [];
let activeCategory = "all";
let searchQuery = "";
let products = [];

async function fetchProducts() {
    try {
        const url = new URL('/api/products', window.location.origin);
        if (activeCategory !== 'all') url.searchParams.append('category', activeCategory);
        if (searchQuery) url.searchParams.append('search', searchQuery);

        const response = await fetch(url);
        products = await response.json();
        renderProducts();
    } catch (error) {
        console.error('Error fetching products:', error);
        document.getElementById("products-container").innerHTML =
            '<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: red;">Failed to load products. Make sure the server and MongoDB are running.</div>';
    }
}

function initProducts() {
    fetchProducts();
}

function renderProducts() {
    const container = document.getElementById("products-container");
    container.innerHTML = "";

    if (products.length === 0) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem;">No products found</div>';
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <h2 class="product-title">${product.name}</h2>
      <p class="product-description">${product.description}</p>
      <p class="product-price">Birr ${product.price.toFixed(2)}</p>
      <button class="add-to-cart" onclick="addToCart('${product._id}')">Add to Cart</button>
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
    const product = products.find(p => p._id === productId);
    const existingItem = cart.find(item => item._id === productId);
    if (existingItem) {
        existingItem.Quantity++;
    } else {
        cart.push({ ...product, Quantity: 1 });
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
        <img src="${item.image}" alt="${item.name}" style="width:50px;height:50px;margin-right:10px;object-fit:cover;">
        <div>
          <h3>${item.name}</h3>
          <p>${item.price} x ${item.Quantity}</p>
        </div>
      </div>
      <button class="remove-item" onclick="removeFromCart('${item._id}')">Remove</button>
    `;
        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = cart.reduce((sum, item) => sum + item.Quantity, 0);
    cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item._id !== productId);
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

    // Event listeners for category buttons
    const categoryBtns = document.querySelectorAll(".category-btn");
    categoryBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            categoryBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeCategory = btn.dataset.category;
            fetchProducts();
        });
    });

    // Event listener for search input
    const searchInput = document.getElementById("search-input");
    let searchTimeout;
    searchInput.addEventListener("input", (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchQuery = e.target.value;
            fetchProducts();
        }, 300);
    });
});

function resetPaymentUI() {
    document.getElementById("payment-form").reset();
    document.getElementById("payment-processing").style.display = "none";
    document.getElementById("payment-success").style.display = "none";
    document.getElementById("payment-form").style.display = "block";
}

function generateOrderNumber() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `EST-${timestamp}-${random}`;
}

function processPayment(e) {
    e.preventDefault();

    // Capture cardholder name before form resets
    const cardholderName = document.getElementById('cardholder-name')?.value || 'Customer';

    // Snapshot cart before clearing
    const receiptItems = cart.map(item => ({ ...item }));
    const subtotal = receiptItems.reduce((sum, item) => sum + item.price * item.Quantity, 0);
    const tax = subtotal * 0.15;
    const total = subtotal + tax;
    const orderNumber = generateOrderNumber();
    const orderDate = new Date().toLocaleString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });

    document.getElementById('payment-form').style.display = 'none';
    document.getElementById('payment-processing').style.display = 'block';

    setTimeout(() => {
        document.getElementById('payment-processing').style.display = 'none';
        document.getElementById('payment-success').style.display = 'block';

        setTimeout(() => {
            // Clear cart
            cart = [];
            localStorage.removeItem('cart');
            updateCartDisplay();
            closePaymentModal();
            resetPaymentUI();

            // Show receipt
            showReceipt({ orderNumber, orderDate, cardholderName, receiptItems, subtotal, tax, total });
        }, 1800);
    }, 3000);
}

function showReceipt({ orderNumber, orderDate, cardholderName, receiptItems, subtotal, tax, total }) {
    const itemsHTML = receiptItems.map(item => `
        <tr>
            <td>${item.name}</td>
            <td class="receipt-qty">${item.Quantity}</td>
            <td class="receipt-price">ETB ${(item.price * item.Quantity).toFixed(2)}</td>
        </tr>
    `).join('');

    document.getElementById('receipt-order-number').textContent = orderNumber;
    document.getElementById('receipt-date').textContent = orderDate;
    document.getElementById('receipt-customer').textContent = cardholderName;
    document.getElementById('receipt-items').innerHTML = itemsHTML;
    document.getElementById('receipt-subtotal').textContent = `ETB ${subtotal.toFixed(2)}`;
    document.getElementById('receipt-tax').textContent = `ETB ${tax.toFixed(2)}`;
    document.getElementById('receipt-total').textContent = `ETB ${total.toFixed(2)}`;

    document.getElementById('receipt-modal').style.display = 'flex';
}

function closeReceipt() {
    document.getElementById('receipt-modal').style.display = 'none';
}

function printReceipt() {
    window.print();
}