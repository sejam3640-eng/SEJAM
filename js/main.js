// Shopping Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Product Data
const products = [
  {
    id: 1,
    name: 'Golden Prestige Watch',
    price: 320,
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1200&auto=format&fit=crop',
    category: 'Watches'
  },
  {
    id: 2,
    name: 'Luxury Fashion Sneakers',
    price: 210,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
    category: 'Footwear'
  },
  {
    id: 3,
    name: 'Premium Leather Bag',
    price: 450,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop',
    category: 'Handbags'
  },
  {
    id: 4,
    name: 'Diamond Jewelry Set',
    price: 620,
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop',
    category: 'Jewelry'
  },
  {
    id: 5,
    name: 'Elegant Sunglasses',
    price: 180,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1200&auto=format&fit=crop',
    category: 'Sunglasses'
  },
  {
    id: 6,
    name: 'Pearl Necklace',
    price: 280,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop',
    category: 'Jewelry'
  },
  {
    id: 7,
    name: 'Designer Belt',
    price: 120,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
    category: 'Accessories'
  },
  {
    id: 8,
    name: 'Luxury Wallet',
    price: 160,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop',
    category: 'Accessories'
  }
];

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupMobileMenu();
  setupScrollAnimations();
  updateCartUI();
});

// Render Products
function renderProducts() {
  const container = document.getElementById('products-container');
  container.innerHTML = products.map(product => `
    <div class="bg-gray-50 rounded-3xl shadow-lg overflow-hidden luxury-card product-card">
      <img src="${product.image}" class="h-64 w-full object-cover" alt="${product.name}">
      <div class="p-6">
        <h3 class="font-bold text-xl mb-2">${product.name}</h3>
        <p class="gold-text font-bold text-lg mb-3">$${product.price}</p>
        <button onclick="addToCart(${product.id})" class="w-full gold-bg text-white py-3 rounded-full hover:bg-yellow-600 transition">
          Add to Cart
        </button>
      </div>
    </div>
  `).join('');
}

// Add to Cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
  showNotification(`${product.name} added to cart!`);
}

// Remove from Cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

// Update Cart UI
function updateCartUI() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="text-gray-500 text-center py-8">Your cart is empty</p>';
    cartTotal.textContent = '$0';
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
      <div>
        <h4 class="font-semibold">${item.name}</h4>
        <p class="text-gray-600 text-sm">Qty: ${item.quantity}</p>
      </div>
      <div class="text-right">
        <p class="font-bold gold-text">$${(item.price * item.quantity).toFixed(2)}</p>
        <button onclick="removeFromCart(${item.id})" class="text-red-500 text-sm hover:text-red-700">Remove</button>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Open Cart
function openCart() {
  document.getElementById('cart-modal').classList.remove('hidden');
}

// Close Cart
function closeCart() {
  document.getElementById('cart-modal').classList.add('hidden');
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    showNotification('Your cart is empty!');
    return;
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  showNotification(`Order placed successfully! Total: $${total.toFixed(2)}`);
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
  closeCart();
}

// Notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse';
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Mobile Menu Toggle
function setupMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

// Toggle FAQ
function toggleFaq(element) {
  const answer = element.querySelector('.faq-answer');
  const toggle = element.querySelector('.faq-toggle');

  element.classList.toggle('active');
  answer.classList.toggle('hidden');
}

// Handle Contact Form
function handleContactForm(event) {
  event.preventDefault();
  showNotification('Message sent successfully! We will contact you soon.');
  document.getElementById('contact-form').reset();
}

// Scroll Animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.luxury-card, section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}