let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to cart
function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart!");
}

// Filter Categories
function filterProducts(category) {
    let products = document.querySelectorAll(".product");
    products.forEach(p => {
        if (category === "all") p.style.display = "block";
        else p.style.display = p.classList.contains(category) ? "block" : "none";
    });
}

// Search Items
function searchProducts() {
    let input = document.getElementById("searchBar").value.toLowerCase();
    let products = document.querySelectorAll(".product");

    products.forEach(p => {
        let name = p.getAttribute("data-name").toLowerCase();
        p.style.display = name.includes(input) ? "block" : "none";
    });
}

// Load Cart Page
function loadCart() {
    if (!document.getElementById("cartItems")) return;

    let cartBox = document.getElementById("cartItems");
    cartBox.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        cartBox.innerHTML += `
            <div class="cart-item">
                <span>${item.name} - ₹${item.price}</span>
                <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    document.getElementById("totalAmount").innerText = "Total: ₹" + total;
}

// Remove Specific Item
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Clear Cart
function clearCart() {
    localStorage.removeItem("cart");
    cart = [];
    loadCart();
}

// Auto-load on cart page or payment page
loadCart();
