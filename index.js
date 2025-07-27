import { menuArray, categories } from './data.js';

// Cart state
let cart = [];
let currentCategory = null;

// DOM elements
const categoriesSection = document.getElementById('categories-section');
const cartSection = document.getElementById('cart-section');
const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');
const completeOrderBtn = document.getElementById('complete-order-btn');
const paymentModal = document.getElementById('payment-modal');
const modalOrderItems = document.getElementById('modal-order-items');
const modalTotalPrice = document.getElementById('modal-total-price');
const paymentForm = document.getElementById('payment-form');
const thankYouMessage = document.getElementById('thank-you-message');
const thankYouTitle = document.getElementById('thank-you-title');
const deliveryTime = document.getElementById('delivery-time');

// Render categories
function renderCategories() {
    categoriesSection.innerHTML = categories.map(category => `
        <div class="category-card ${category.id === currentCategory ? 'active' : ''}" onclick="toggleCategory('${category.id}')">
            <div class="category-info">
                <div class="category-emoji">${category.emoji}</div>
                <h3 class="category-name">${category.name}</h3>
            </div>
            <div class="category-arrow">▼</div>
        </div>
        <div class="menu-items ${category.id === currentCategory ? 'show' : ''}" id="menu-${category.id}">
            ${renderMenuItems(category.id)}
        </div>
    `).join('');
}

// Render menu items for a specific category
function renderMenuItems(categoryId) {
    const filteredItems = menuArray.filter(item => item.category === categoryId);
    
    return filteredItems.map(item => `
        <div class="card">
            <div class="logo">${item.emoji}</div>
            <div class="item-details">
                <h3 class="name">${item.name}</h3>
                <p class="ingredients">${item.ingredients.join(', ')}</p>
                <p class="price">$${item.price}</p>
            </div>
            <button class="add-to-cart" onclick="addToCart(${item.id})">+</button>
        </div>
    `).join('');
}

// Toggle category visibility
function toggleCategory(categoryId) {
    const wasActive = currentCategory === categoryId;
    
    // Close all categories first
    currentCategory = null;
    
    // If it wasn't active, open the clicked category
    if (!wasActive) {
        currentCategory = categoryId;
    }
    
    renderCategories();
}

// Add item to cart
function addToCart(itemId) {
    const item = menuArray.find(item => item.id === itemId);
    const existingItem = cart.find(cartItem => cartItem.id === itemId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    renderCart();
    showCart();
}

// Show cart section
function showCart() {
    cartSection.classList.add('show');
}

// Hide cart section
function hideCart() {
    cartSection.classList.remove('show');
}

// Update quantity
function updateQuantity(itemId, change) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            renderCart();
        }
    }
}

// Remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    renderCart();
    
    if (cart.length === 0) {
        hideCart();
    }
}

// Calculate total
function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Render cart
function renderCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        completeOrderBtn.disabled = true;
        totalPrice.textContent = '$0';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">remove</button>
                </div>
            </div>
            <div>$${item.price * item.quantity}</div>
        </div>
    `).join('');

    const total = calculateTotal();
    totalPrice.textContent = `$${total}`;
    completeOrderBtn.disabled = false;
}

// Show payment modal
function showPaymentModal() {
    modalOrderItems.innerHTML = cart.map(item => `
        <div class="summary-item">
            <span>${item.name} x${item.quantity}</span>
            <span>$${item.price * item.quantity}</span>
        </div>
    `).join('');
    
    modalTotalPrice.textContent = `$${calculateTotal()}`;
    paymentModal.classList.add('show');
}

// Hide payment modal
function hidePaymentModal() {
    paymentModal.classList.remove('show');
}

// Show thank you message with fun delivery times
function showThankYouMessage(customerName) {
    const funDeliveryTimes = [
        "Your food will be delivered in approximately 15-25 minutes... or right after our chef finishes his victory dance!",
        "Delivery time: 20-30 minutes, unless our delivery driver gets distracted by cute dogs again!",
        "Your order will arrive in 18-28 minutes... assuming our chef doesn't eat it first (just kidding)!",
        "Expected delivery: 15-30 minutes, or whenever our delivery hero defeats the traffic monsters!",
        "Food incoming in 20-35 minutes... our chef is putting extra love into every bite!",
        "Delivery window: 15-25 minutes, unless our driver stops to help more grandmas cross the street!",
        "Your delicious order will arrive in 20-30 minutes... time for a quick victory nap!",
        "Estimated arrival: 15-30 minutes, or whenever our magical food teleporter finishes charging!"
    ];
    
    const randomDeliveryTime = funDeliveryTimes[Math.floor(Math.random() * funDeliveryTimes.length)];
    
    thankYouTitle.textContent = `Thanks, ${customerName}! Your order is on its way!`;
    deliveryTime.textContent = randomDeliveryTime;
    thankYouMessage.classList.add('show');
    
    // Hide the message after 10 seconds
    setTimeout(() => {
        thankYouMessage.classList.remove('show');
    }, 10000);
}

// Event listeners
completeOrderBtn.addEventListener('click', showPaymentModal);

// Close modal when clicking X or outside
document.querySelector('.close').addEventListener('click', hidePaymentModal);
paymentModal.addEventListener('click', (e) => {
    if (e.target === paymentModal) {
        hidePaymentModal();
    }
});

// Handle payment form submission
paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get customer name from the form input
    const customerName = document.getElementById('card-name').value.trim();
    
    // Hide modal and cart first
    hidePaymentModal();
    hideCart();
    
    // Reset cart and form
    cart = [];
    renderCart();
    paymentForm.reset();
    
    // Show personalized thank you message after a short delay
    setTimeout(() => {
        showThankYouMessage(customerName);
    }, 300);
});

// Format card number input
document.getElementById('card-number').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s/g, '');
    let formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
    if (formattedValue.length <= 19) { // 16 digits + 3 spaces
        e.target.value = formattedValue;
    }
});

// Limit CVV to 3 digits
document.getElementById('card-cvv').addEventListener('input', (e) => {
    e.target.value = e.target.value.slice(0, 3);
});

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
});




// Cookie Consent Modal

const cookieModal = document.getElementById('cookie-modal')
const cookieModalCloseBtn = document.getElementById('cookie-modal-close-btn')
const cookieConsentForm = document.getElementById('cookie-consent-form')
const cookieModalText = document.getElementById('cookie-modal-text')
const cookieDeclineBtn = document.getElementById('cookie-decline-btn')
const cookieModalChoiceBtns = document.getElementById('cookie-modal-choice-btns')

setTimeout(function(){
    cookieModal.style.display = 'inline'
}, 1500)

cookieModalCloseBtn.addEventListener('click', function(){
    cookieModal.style.display = 'none'
}) 

cookieDeclineBtn.addEventListener('mouseenter', function(){
    cookieModalChoiceBtns.classList.toggle('cookie-modal-btns-reverse')
}) 

cookieConsentForm.addEventListener('submit', function(e){
    e.preventDefault()
    
    const consentFormData = new FormData(cookieConsentForm)
    const fullName = consentFormData.get('fullName')
    
    cookieModalText.innerHTML = `
    <div class="modal-inner-loading">
        <img src="images/loading.svg" class="loading">
        <p id="cookie-upload-text">Uploading your data to the dark web...</p>
    </div>` 
    
    setTimeout(function(){
        document.getElementById('cookie-upload-text').innerText = `
        Making the sale...`
    }, 1500)
    
    setTimeout(function(){
        document.getElementById('cookie-modal-inner').innerHTML = `
        <h2>Thanks <span class="modal-display-name">${fullName}</span>, you sucker! </h2>
        <p>We just sold the rights to your eternal soul.</p>
        <div class="idiot-gif">
            <img src="images/pirate.gif">
        </div>
    `
    cookieModalCloseBtn.disabled = false
    }, 3000)
  
}) 


window.toggleCategory = toggleCategory;
window.addToCart = addToCart;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;