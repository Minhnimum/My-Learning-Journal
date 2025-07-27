import menuArray from './data.js';

// Cart state
let cart = [];

// DOM elements
const menuSection = document.getElementById('menu-section');
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

// Render menu
function renderMenu() {
    menuSection.innerHTML = menuArray.map(item => `
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
    // Populate order summary in modal
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
    
    // Debug: log the name to console
    console.log('Customer name:', customerName);
    
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

// Make functions globally available for onclick handlers
window.addToCart = addToCart;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
});




// Cookie Consent Modal

const modal = document.getElementById('modal')
const modalCloseBtn = document.getElementById('modal-close-btn')
const consentForm = document.getElementById('consent-form')
const modalText = document.getElementById('modal-text')
const declineBtn = document.getElementById('decline-btn')
const modalChoiceBtns = document.getElementById('modal-choice-btns')

setTimeout(function(){
    modal.style.display = 'inline'
}, 1500)

modalCloseBtn.addEventListener('click', function(){
    modal.style.display = 'none'
}) 

declineBtn.addEventListener('mouseenter', function(){
    modalChoiceBtns.classList.toggle('modal-btns-reverse')
}) 

consentForm.addEventListener('submit', function(e){
    e.preventDefault()
    
    const consentFormData = new FormData(consentForm)
    const fullName = consentFormData.get('fullName')
    
    modalText.innerHTML = `
    <div class="modal-inner-loading">
        <img src="images/loading.svg" class="loading">
        <p id="upload-text">Uploading your data to the dark web...</p>
    </div>` 
    
    setTimeout(function(){
        document.getElementById('upload-text').innerText = `
        Making the sale...`
    }, 1500)
    
    
    setTimeout(function(){
        document.getElementById('modal-inner').innerHTML = `
        <h2>Thanks <span class="modal-display-name">${fullName}</span>, you sucker! </h2>
        <p>We just sold the rights to your eternal soul.</p>
        <div class="idiot-gif">
            <img src="images/pirate.gif">
        </div>
    `
    modalCloseBtn.disabled = false
    }, 3000)
  
}) 
