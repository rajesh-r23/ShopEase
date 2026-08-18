/* ============================================
   SHOPEASE — script.js
   Complete E-Commerce Frontend Logic
   ============================================ */

'use strict';

/* ======================================================
   1. DATA — PRODUCTS & CATEGORIES
   ====================================================== */

const products = [
    {
        id: 1,
        name: "Premium Oversized Hoodie",
        category: "Fashion",
        price: 14.00,
        oldPrice: 45.60,
        rating: 4.9,
        reviews: 238,
        image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&h=400&fit=crop",
        sale: true,
        badge: "SALE"
    },
    {
        id: 2,
        name: "Wireless Noise-Cancelling Headphones",
        category: "Electronics",
        price: 89.99,
        oldPrice: 149.99,
        rating: 4.8,
        reviews: 412,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        sale: true,
        badge: "HOT"
    },
    {
        id: 3,
        name: "Air Max Running Sneakers",
        category: "Shoes",
        price: 59.00,
        oldPrice: 95.00,
        rating: 4.7,
        reviews: 187,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        sale: true,
        badge: "SALE"
    },
    {
        id: 4,
        name: "Luxury Skincare Gift Set",
        category: "Beauty",
        price: 34.50,
        oldPrice: 68.00,
        rating: 4.6,
        reviews: 94,
        image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop",
        sale: true,
        badge: "SALE"
    },
    {
        id: 5,
        name: "Atomic Habits — Hardcover",
        category: "Books",
        price: 12.99,
        oldPrice: 24.99,
        rating: 4.9,
        reviews: 3200,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
        sale: false,
        badge: ""
    },
    {
        id: 6,
        name: "Slim Leather Watch Band",
        category: "Accessories",
        price: 18.00,
        oldPrice: 32.00,
        rating: 4.5,
        reviews: 76,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        sale: true,
        badge: "SALE"
    },
    {
        id: 7,
        name: "Floral Summer Dress",
        category: "Fashion",
        price: 22.00,
        oldPrice: 49.00,
        rating: 4.7,
        reviews: 150,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop",
        sale: true,
        badge: "NEW"
    },
    {
        id: 8,
        name: "Smart Fitness Tracker",
        category: "Electronics",
        price: 49.00,
        oldPrice: 89.99,
        rating: 4.6,
        reviews: 522,
        image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop",
        sale: true,
        badge: "SALE"
    },
    {
        id: 9,
        name: "Classic Leather Oxford Shoes",
        category: "Shoes",
        price: 74.00,
        oldPrice: 120.00,
        rating: 4.8,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
        sale: false,
        badge: ""
    },
    {
        id: 10,
        name: "Rose Quartz Face Roller",
        category: "Beauty",
        price: 16.00,
        oldPrice: 28.00,
        rating: 4.4,
        reviews: 203,
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
        sale: true,
        badge: "SALE"
    },
    {
        id: 11,
        name: "The Psychology of Money",
        category: "Books",
        price: 10.99,
        oldPrice: 19.99,
        rating: 4.8,
        reviews: 2100,
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop",
        sale: false,
        badge: ""
    },
    {
        id: 12,
        name: "Vintage Sunglasses",
        category: "Accessories",
        price: 24.00,
        oldPrice: 45.00,
        rating: 4.6,
        reviews: 134,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
        sale: true,
        badge: "HOT"
    }
];

const categories = [
    { name: "Fashion", count: 238, icon: "bi-bag-heart" },
    { name: "Electronics", count: 168, icon: "bi-cpu" },
    { name: "Shoes", count: 132, icon: "bi-boot" },
    { name: "Beauty", count: 87, icon: "bi-stars" },
    { name: "Books", count: 48, icon: "bi-book" },
    { name: "Accessories", count: 68, icon: "bi-watch" }
];

const whyChooseUsItems = [
    {
        icon: "bi-truck",
        title: "Fast Delivery",
        desc: "Quick delivery with safe and reliable shipping to your doorstep."
    },
    {
        icon: "bi-shield-lock",
        title: "Secure Payment",
        desc: "Secure and protected payment experience with 256-bit encryption."
    },
    {
        icon: "bi-arrow-counterclockwise",
        title: "Easy Returns",
        desc: "Simple and hassle-free product returns within 30 days."
    },
    {
        icon: "bi-headset",
        title: "24/7 Support",
        desc: "Get expert support whenever you need assistance, any time."
    }
];

/* ======================================================
   2. STATE
   ====================================================== */
let cartItems = JSON.parse(localStorage.getItem('shopease_cart') || '[]');
let wishlistIds = JSON.parse(localStorage.getItem('shopease_wishlist') || '[]');
let activeFilter = 'All';
let searchQuery = '';

/* ======================================================
   3. UTILS
   ====================================================== */

function formatPrice(price) {
    return '$' + price.toFixed(2);
}

function generateStars(rating) {
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < full) stars += '<i class="bi bi-star-fill"></i>';
        else if (i === full && hasHalf) stars += '<i class="bi bi-star-half"></i>';
        else stars += '<i class="bi bi-star"></i>';
    }
    return stars;
}

function saveCart() {
    localStorage.setItem('shopease_cart', JSON.stringify(cartItems));
}

function saveWishlist() {
    localStorage.setItem('shopease_wishlist', JSON.stringify(wishlistIds));
}

function getCartTotal() {
    return cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
    return cartItems.reduce((sum, item) => sum + item.qty, 0);
}

/* ======================================================
   4. TOAST SYSTEM
   ====================================================== */

function showToast(message, type = 'default', duration = 3500) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');

    const icons = {
        success: 'bi-check-circle-fill',
        error: 'bi-x-circle-fill',
        info: 'bi-info-circle-fill',
        default: 'bi-bag-check-fill',
        wishlist: 'bi-heart-fill',
        remove: 'bi-trash-fill'
    };

    const icon = icons[type] || icons.default;

    toast.innerHTML = `
        <div class="toast-icon"><i class="bi ${icon}"></i></div>
        <p class="toast-text">${message}</p>
        <button class="toast-close" aria-label="Close notification"><i class="bi bi-x"></i></button>
    `;

    container.appendChild(toast);

    const closeBtn = toast.querySelector('.toast-close');
    function dismissToast() {
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 350);
    }
    closeBtn.addEventListener('click', dismissToast);

    const timer = setTimeout(dismissToast, duration);
    closeBtn.addEventListener('click', () => clearTimeout(timer));
}

/* ======================================================
   5. BADGE UPDATES
   ====================================================== */

function updateBadges() {
    const cartBadge = document.getElementById('cartBadge');
    const wishlistBadge = document.getElementById('wishlistBadge');

    const cartCount = getCartCount();
    const wishCount = wishlistIds.length;

    cartBadge.textContent = cartCount;
    cartBadge.setAttribute('aria-label', `${cartCount} items in cart`);
    cartBadge.style.display = cartCount > 0 ? 'grid' : 'none';

    wishlistBadge.textContent = wishCount;
    wishlistBadge.setAttribute('aria-label', `${wishCount} items in wishlist`);
    wishlistBadge.style.display = wishCount > 0 ? 'grid' : 'none';

    // Bump animation
    [cartBadge, wishlistBadge].forEach(badge => {
        badge.classList.remove('bump');
        void badge.offsetWidth; // reflow
        badge.classList.add('bump');
        setTimeout(() => badge.classList.remove('bump'), 300);
    });
}

/* ======================================================
   6. RENDER CATEGORIES
   ====================================================== */

function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    grid.innerHTML = '';

    categories.forEach(cat => {
        const card = document.createElement('a');
        card.className = 'category-card';
        card.href = '#popular-products';
        card.setAttribute('role', 'listitem');
        card.setAttribute('aria-label', `Browse ${cat.name} — ${cat.count} items`);
        card.dataset.category = cat.name;

        card.innerHTML = `
            <div class="category-icon-wrap" aria-hidden="true">
                <i class="bi ${cat.icon}"></i>
            </div>
            <span class="category-name">${cat.name}</span>
            <span class="category-count">${cat.count} items</span>
        `;

        card.addEventListener('click', (e) => {
            e.preventDefault();
            setFilter(cat.name);
            document.getElementById('popular-products').scrollIntoView({ behavior: 'smooth' });
        });

        grid.appendChild(card);
    });
}

/* ======================================================
   7. RENDER PRODUCTS
   ====================================================== */

function getFilteredProducts() {
    return products.filter(p => {
        const matchesFilter = activeFilter === 'All' || p.category === activeFilter;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              p.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });
}

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const emptyState = document.getElementById('emptyState');
    const filtered = getFilteredProducts();

    grid.innerHTML = '';

    if (filtered.length === 0) {
        grid.style.display = 'none';
        emptyState.hidden = false;
        return;
    }

    grid.style.display = 'grid';
    emptyState.hidden = true;

    filtered.forEach(product => {
        const isWishlisted = wishlistIds.includes(product.id);
        const card = document.createElement('article');
        card.className = 'product-card';
        card.dataset.productId = product.id;
        card.setAttribute('aria-label', `${product.name}, ${formatPrice(product.price)}`);

        card.innerHTML = `
            <div class="product-img-wrapper">
                ${product.badge ? `<span class="product-sale-badge" aria-label="${product.badge} deal">${product.badge}</span>` : ''}
                <button class="product-wishlist-btn ${isWishlisted ? 'wishlisted' : ''}"
                    aria-label="${isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}: ${product.name}"
                    data-product-id="${product.id}">
                    <i class="bi ${isWishlisted ? 'bi-heart-fill' : 'bi-heart'}"></i>
                </button>
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-img"
                    loading="lazy"
                    onerror="this.src='https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop'"
                >
            </div>
            <div class="product-body">
                <span class="product-category-label">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating" aria-label="Rating: ${product.rating} out of 5, ${product.reviews} reviews">
                    <span class="product-stars" aria-hidden="true">${generateStars(product.rating)}</span>
                    <span class="product-rating-num">(${product.reviews.toLocaleString()})</span>
                </div>
                <div class="product-price-row">
                    <span class="product-price" aria-label="Price: ${formatPrice(product.price)}">${formatPrice(product.price)}</span>
                    ${product.oldPrice ? `<span class="product-old-price" aria-label="Original price: ${formatPrice(product.oldPrice)}">${formatPrice(product.oldPrice)}</span>` : ''}
                </div>
            </div>
            <div class="product-footer">
                <button class="add-to-cart-btn" data-product-id="${product.id}" aria-label="Add ${product.name} to cart">
                    <i class="bi bi-bag-plus" aria-hidden="true"></i> Add to Cart
                </button>
            </div>
        `;

        // Wishlist handler
        const wishBtn = card.querySelector('.product-wishlist-btn');
        wishBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleWishlist(product.id, wishBtn);
        });

        // Add to Cart handler
        const cartBtn = card.querySelector('.add-to-cart-btn');
        cartBtn.addEventListener('click', () => addToCart(product.id));

        grid.appendChild(card);
    });
}

/* ======================================================
   8. FILTER & SEARCH
   ====================================================== */

function setFilter(filter) {
    activeFilter = filter;
    document.querySelectorAll('.filter-pill').forEach(pill => {
        const isActive = pill.dataset.filter === filter;
        pill.classList.toggle('active', isActive);
        pill.setAttribute('aria-pressed', isActive);
    });
    renderProducts();
}

function setupFilters() {
    document.getElementById('filterPills').addEventListener('click', (e) => {
        const pill = e.target.closest('.filter-pill');
        if (pill) setFilter(pill.dataset.filter);
    });
}

function setupSearch() {
    const productSearch = document.getElementById('productSearchInput');
    productSearch.addEventListener('input', () => {
        searchQuery = productSearch.value.trim();
        renderProducts();
    });

    // Navbar search also drives product search
    const navSearch = document.getElementById('navSearchInput');
    navSearch.addEventListener('input', () => {
        const query = navSearch.value.trim();
        productSearch.value = query;
        searchQuery = query;
        renderProducts();
        if (query) {
            document.getElementById('popular-products').scrollIntoView({ behavior: 'smooth' });
        }
    });
}

/* ======================================================
   9. WISHLIST
   ====================================================== */

function toggleWishlist(productId, btn) {
    const idx = wishlistIds.indexOf(productId);
    const product = products.find(p => p.id === productId);

    if (idx === -1) {
        wishlistIds.push(productId);
        if (btn) {
            btn.classList.add('wishlisted');
            btn.setAttribute('aria-label', `Remove from wishlist: ${product.name}`);
            btn.innerHTML = '<i class="bi bi-heart-fill"></i>';
            // Animate heart
            btn.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(1.45)' },
                { transform: 'scale(1)' }
            ], { duration: 350, easing: 'ease' });
        }
        showToast(`<strong>${product.name}</strong> added to wishlist`, 'wishlist');
    } else {
        wishlistIds.splice(idx, 1);
        if (btn) {
            btn.classList.remove('wishlisted');
            btn.setAttribute('aria-label', `Add to wishlist: ${product.name}`);
            btn.innerHTML = '<i class="bi bi-heart"></i>';
        }
        showToast(`Removed from wishlist`, 'remove');
    }

    saveWishlist();
    updateBadges();
}

/* ======================================================
   10. CART — ADD / REMOVE / UPDATE
   ====================================================== */

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cartItems.find(i => i.id === productId);

    if (existing) {
        existing.qty += 1;
        showToast(`<strong>${product.name}</strong> quantity updated`, 'success');
    } else {
        cartItems.push({
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            image: product.image,
            qty: 1
        });
        showToast(`<strong>${product.name}</strong> added to cart`, 'success');
    }

    saveCart();
    updateBadges();
    renderCart();
}

function removeFromCart(productId) {
    const product = cartItems.find(i => i.id === productId);
    cartItems = cartItems.filter(i => i.id !== productId);
    saveCart();
    updateBadges();
    renderCart();
    if (product) showToast(`<strong>${product.name}</strong> removed from cart`, 'remove');
}

function updateCartQty(productId, delta) {
    const item = cartItems.find(i => i.id === productId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        removeFromCart(productId);
        return;
    }
    saveCart();
    updateBadges();
    renderCart();
}

/* ======================================================
   11. RENDER CART
   ====================================================== */

function renderCart() {
    const body = document.getElementById('cartBody');
    const footer = document.getElementById('cartFooter');

    if (cartItems.length === 0) {
        body.innerHTML = `
            <div class="cart-empty-state" role="status" aria-live="polite">
                <div class="cart-empty-icon" aria-hidden="true"><i class="bi bi-cart3"></i></div>
                <h3 class="cart-empty-title">Your cart is empty</h3>
                <p class="cart-empty-desc">Add some products to get started.</p>
                <button class="cart-continue-btn" id="cartContinueBtn" aria-label="Continue shopping">
                    <i class="bi bi-arrow-left"></i> Continue Shopping
                </button>
            </div>
        `;
        footer.innerHTML = '';

        const continueBtn = document.getElementById('cartContinueBtn');
        if (continueBtn) continueBtn.addEventListener('click', closeCart);
        return;
    }

    body.innerHTML = cartItems.map(item => `
        <div class="cart-item" data-item-id="${item.id}" aria-label="${item.name}, quantity ${item.qty}, ${formatPrice(item.price * item.qty)}">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img"
                 onerror="this.src='https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=64&h=64&fit=crop'">
            <div class="cart-item-info">
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-cat">${item.category}</p>
                <p class="cart-item-price">${formatPrice(item.price * item.qty)}</p>
            </div>
            <div class="cart-item-controls">
                <div class="cart-qty-wrap" aria-label="Quantity controls for ${item.name}">
                    <button class="cart-qty-btn" data-action="dec" data-id="${item.id}" aria-label="Decrease quantity">
                        <i class="bi bi-dash"></i>
                    </button>
                    <span class="cart-qty-num" aria-live="polite">${item.qty}</span>
                    <button class="cart-qty-btn" data-action="inc" data-id="${item.id}" aria-label="Increase quantity">
                        <i class="bi bi-plus"></i>
                    </button>
                </div>
                <button class="cart-remove-btn" data-id="${item.id}" aria-label="Remove ${item.name} from cart">
                    <i class="bi bi-trash3"></i> Remove
                </button>
            </div>
        </div>
    `).join('');

    // Attach event listeners for qty buttons and remove buttons
    body.querySelectorAll('.cart-qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            const action = btn.dataset.action;
            updateCartQty(id, action === 'inc' ? 1 : -1);
        });
    });

    body.querySelectorAll('.cart-remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            removeFromCart(id);
        });
    });

    const subtotal = getCartTotal();
    const shipping = subtotal >= 50 ? 0 : 5.99;
    const total = subtotal + shipping;

    footer.innerHTML = `
        <div class="cart-subtotal" aria-label="Subtotal: ${formatPrice(subtotal)}">
            <span>Subtotal</span>
            <span>${formatPrice(subtotal)}</span>
        </div>
        <div class="cart-subtotal" aria-label="Shipping: ${shipping === 0 ? 'Free' : formatPrice(shipping)}">
            <span>Shipping</span>
            <span style="color:var(--success)">${shipping === 0 ? 'Free 🎉' : formatPrice(shipping)}</span>
        </div>
        <div class="cart-total" aria-label="Total: ${formatPrice(total)}">
            <span>Total</span>
            <span class="cart-total-num">${formatPrice(total)}</span>
        </div>
        <button class="cart-checkout-btn" id="checkoutBtn" aria-label="Proceed to checkout">
            <i class="bi bi-lock-fill"></i> Proceed to Checkout
        </button>
    `;

    document.getElementById('checkoutBtn').addEventListener('click', () => {
        showToast('Checkout functionality coming soon — stay tuned! 🚀', 'info', 4000);
    });
}

/* ======================================================
   12. CART DRAWER OPEN/CLOSE
   ====================================================== */

function openCart() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    drawer.classList.add('open');
    overlay.classList.add('visible');
    drawer.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    renderCart();

    // Focus trap — focus close button
    const closeBtn = document.getElementById('cartCloseBtn');
    setTimeout(() => closeBtn.focus(), 350);
}

function closeCart() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    drawer.classList.remove('open');
    overlay.classList.remove('visible');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Return focus to cart button
    document.getElementById('cartNavBtn').focus();
}

function setupCartDrawer() {
    document.getElementById('cartNavBtn').addEventListener('click', openCart);
    document.getElementById('cartCloseBtn').addEventListener('click', closeCart);
    document.getElementById('cartOverlay').addEventListener('click', closeCart);

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (document.getElementById('cartDrawer').classList.contains('open')) closeCart();
        }
    });
}

/* ======================================================
   13. WHY CHOOSE US — RENDER
   ====================================================== */

function renderWhyChooseUs() {
    const grid = document.getElementById('whyGrid');
    grid.innerHTML = '';

    whyChooseUsItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'why-card';
        card.setAttribute('role', 'listitem');

        card.innerHTML = `
            <div class="why-icon-wrap" aria-hidden="true">
                <i class="bi ${item.icon}"></i>
            </div>
            <div>
                <h3 class="why-card-title">${item.title}</h3>
                <p class="why-card-desc">${item.desc}</p>
            </div>
        `;

        grid.appendChild(card);
    });
}

/* ======================================================
   14. NEWSLETTER
   ====================================================== */

function setupNewsletter() {
    const form = document.getElementById('newsletterForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('newsletterEmail');
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
            showToast('Please enter a valid email address.', 'error');
            emailInput.focus();
            emailInput.style.borderColor = 'var(--danger)';
            setTimeout(() => emailInput.style.borderColor = '', 2500);
            return;
        }

        emailInput.value = '';
        showToast('Thanks for subscribing! Welcome to ShopEase ✨', 'success', 4000);
    });
}

/* ======================================================
   15. NAVBAR — MOBILE MENU & SEARCH
   ====================================================== */

function setupNavbar() {
    const hamburger = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const searchToggle = document.getElementById('searchToggleBtn');
    const searchBar = document.getElementById('navbarSearchBar');
    const searchBarClose = document.getElementById('searchBarClose');

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen);
        mobileMenu.setAttribute('aria-hidden', !isOpen);

        if (isOpen) {
            mobileMenu.style.display = 'block';
            // animate open
            requestAnimationFrame(() => {
                mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
            });
        } else {
            mobileMenu.style.maxHeight = '0';
            setTimeout(() => {
                if (!mobileMenu.classList.contains('open')) {
                    mobileMenu.style.display = 'none';
                }
            }, 400);
        }
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
            mobileMenu.style.maxHeight = '0';
            setTimeout(() => { mobileMenu.style.display = 'none'; }, 400);
        });
    });

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            if (mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
                mobileMenu.style.maxHeight = '0';
                setTimeout(() => { mobileMenu.style.display = 'none'; }, 400);
            }
        }
    });

    // Search toggle
    if (searchToggle) {
        searchToggle.addEventListener('click', () => {
            const isOpen = searchBar.classList.toggle('open');
            searchBar.setAttribute('aria-hidden', !isOpen);
            if (isOpen) {
                setTimeout(() => document.getElementById('navSearchInput').focus(), 300);
            }
        });
    }

    if (searchBarClose) {
        searchBarClose.addEventListener('click', () => {
            searchBar.classList.remove('open');
            searchBar.setAttribute('aria-hidden', 'true');
            document.getElementById('navSearchInput').value = '';
            searchQuery = '';
            renderProducts();
        });
    }

    // Sticky navbar — update active nav link on scroll
    const sections = document.querySelectorAll('section[id], #home');
    const navLinks = document.querySelectorAll('.nav-links .nav-link, .mobile-nav-links .mobile-nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    link.removeAttribute('aria-current');
                    const href = link.getAttribute('href');
                    if (href && href.includes(entry.target.id)) {
                        link.classList.add('active');
                        link.setAttribute('aria-current', 'page');
                    }
                });
            }
        });
    }, { threshold: 0.25, rootMargin: '-60px 0px -60px 0px' });

    sections.forEach(s => observer.observe(s));
}

/* ======================================================
   16. OFFER BUTTON
   ====================================================== */

function setupOfferButton() {
    const btn = document.getElementById('offerShopBtn');
    if (btn) {
        btn.addEventListener('click', () => {
            setFilter('All');
            document.getElementById('popular-products').scrollIntoView({ behavior: 'smooth' });
            showToast('Showing all sale items! 🔥', 'success');
        });
    }
}

/* ======================================================
   17. WISHLIST NAV BTN
   ====================================================== */

function setupWishlistNav() {
    document.getElementById('wishlistNavBtn').addEventListener('click', () => {
        if (wishlistIds.length === 0) {
            showToast('Your wishlist is empty. Heart some products! 💛', 'info');
        } else {
            showToast(`You have ${wishlistIds.length} item${wishlistIds.length > 1 ? 's' : ''} in your wishlist ❤️`, 'wishlist');
        }
    });
}

/* ======================================================
   18. SMOOTH SCROLL — HERO BUTTONS
   ====================================================== */

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

/* ======================================================
   19. INITIAL BADGE VISIBILITY
   ====================================================== */

function initBadges() {
    const cartBadge = document.getElementById('cartBadge');
    const wishlistBadge = document.getElementById('wishlistBadge');
    const cartCount = getCartCount();
    const wishCount = wishlistIds.length;

    cartBadge.textContent = cartCount;
    cartBadge.style.display = cartCount > 0 ? 'grid' : 'none';

    wishlistBadge.textContent = wishCount;
    wishlistBadge.style.display = wishCount > 0 ? 'grid' : 'none';
}

/* ======================================================
   20. INIT — ENTRY POINT
   ====================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Render dynamic content
    renderCategories();
    renderProducts();
    renderWhyChooseUs();

    // Initialize badges from localStorage
    initBadges();

    // Setup all interactions
    setupFilters();
    setupSearch();
    setupCartDrawer();
    setupNavbar();
    setupNewsletter();
    setupOfferButton();
    setupWishlistNav();
    setupSmoothScroll();
});
