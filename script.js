/**
 * VASTRA – Luxury Fashion eCommerce
 * script.js | Vanilla JS – No frameworks
 */

'use strict';

/* ============================================================
   1. PRODUCT DATA
   ============================================================ */
const products = [
  {
    id: 1,
    name: 'Obsidian Linen Blazer',
    category: 'men',
    price: 8499,
    badge: 'New',
    desc: 'A tailored masterpiece in premium breathable linen. Perfect for formal occasions or elevated casual wear.',
    img: 'https://images.unsplash.com/photo-1594938298603-c8148c4b8e9a?w=500&q=80',
    imgHover: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&q=80',
  },
  {
    id: 2,
    name: 'Ivory Silk Kurta',
    category: 'men',
    price: 3299,
    badge: 'Bestseller',
    desc: 'Handcrafted in pure silk with intricate embroidery. A timeless fusion of tradition and modernity.',
    img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80',
    imgHover: 'https://images.unsplash.com/photo-1602810319428-019690571b5b?w=500&q=80',
  },
  {
    id: 3,
    name: 'Noir Wrap Dress',
    category: 'women',
    price: 5999,
    badge: 'New',
    desc: 'An elegant wrap silhouette in fluid matte crepe. Effortlessly transitions from day to evening.',
    img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80',
    imgHover: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=500&q=80',
  },
  {
    id: 4,
    name: 'Champagne Anarkali',
    category: 'women',
    price: 7200,
    badge: 'Limited',
    desc: 'Luxuriously embellished with gold threadwork and delicate floral motifs. A celebration in fabric.',
    img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80',
    imgHover: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&q=80',
  },
  {
    id: 5,
    name: 'Gold Meridian Watch',
    category: 'accessories',
    price: 12999,
    badge: 'Premium',
    desc: 'A statement timepiece with a brushed gold case and genuine leather strap. Timeless elegance.',
    img: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=500&q=80',
    imgHover: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=80',
  },
  {
    id: 6,
    name: 'Heritage Leather Tote',
    category: 'accessories',
    price: 9500,
    badge: 'New',
    desc: 'Full-grain vegetable-tanned leather tote. Structured, spacious and supremely refined.',
    img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
    imgHover: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80',
  },
  {
    id: 7,
    name: 'Slate Slim Chinos',
    category: 'men',
    price: 2899,
    badge: null,
    desc: 'Clean-cut chinos in a stretch-comfort twill. The essential modern wardrobe staple.',
    img: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=500&q=80',
    imgHover: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&q=80',
  },
  {
    id: 8,
    name: 'Rosé Organza Saree',
    category: 'women',
    price: 11500,
    badge: 'Exclusive',
    desc: 'Six yards of pure organza silk with hand-painted botanical prints. An heirloom piece.',
    img: 'https://images.unsplash.com/photo-1583391265692-d03100020c8b?w=500&q=80',
    imgHover: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&q=80',
  },
];

/* ============================================================
   2. STATE
   ============================================================ */
let cart = JSON.parse(localStorage.getItem('vastra_cart')) || [];
let currentFilter = 'all';
let currentSlide = 0;
let carouselInterval;
let isDarkMode = localStorage.getItem('vastra_dark') === 'true';

/* ============================================================
   3. DOM REFERENCES
   ============================================================ */
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

const loader        = $('loader');
const navbar        = $('navbar');
const hamburger     = $('hamburger');
const navLinks      = $('navLinks');
const cartBtn       = $('cartBtn');
const cartCount     = $('cartCount');
const cartSidebar   = $('cartSidebar');
const cartOverlay   = $('cartOverlay');
const closeCart     = $('closeCart');
const cartItems     = $('cartItems');
const cartTotal     = $('cartTotal');
const toast         = $('toast');
const toastMsg      = $('toastMsg');
const backToTop     = $('backToTop');
const scrollProg    = $('scrollProgress');
const darkToggle    = $('darkModeToggle');
const sunIcon       = $('sunIcon');
const moonIcon      = $('moonIcon');
const searchBtn     = $('searchBtn');
const searchBar     = $('searchBar');
const searchClose   = $('searchClose');
const searchInput   = $('searchInput');
const productsGrid  = $('productsGrid');
const modalOverlay  = $('modalOverlay');
const closeModal    = $('closeModal');
const testimonials  = $('testimonialsCarousel');
const prevBtn       = $('prevBtn');
const nextBtn       = $('nextBtn');
const dotsWrap      = $('carouselDots');
const newsletter    = $('newsletterForm');
const emailInput    = $('emailInput');
const formMsg       = $('formMsg');

/* ============================================================
   4. PAGE LOADER
   ============================================================ */
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
    // Trigger hero animations
    $$('.hero .reveal-up').forEach(el => el.classList.add('visible'));
  }, 2100);
});

/* ============================================================
   5. SCROLL EVENTS – Navbar, Progress Bar, Back-to-Top
   ============================================================ */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  // Navbar style
  if (scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');

  // Scroll progress
  scrollProg.style.width = ((scrollY / docHeight) * 100) + '%';

  // Back to top
  if (scrollY > 400) backToTop.classList.add('visible');
  else backToTop.classList.remove('visible');

  // Active nav link highlighting
  const sections = $$('main section[id], header + * ');
  const navLinkEls = $$('.nav-link');
  let currentSection = '';
  document.querySelectorAll('section[id]').forEach(sec => {
    if (scrollY >= sec.offsetTop - 100) currentSection = sec.getAttribute('id');
  });
  navLinkEls.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) link.classList.add('active');
  });
}, { passive: true });

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ============================================================
   6. HAMBURGER / MOBILE MENU
   ============================================================ */
hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close mobile menu on link click
$$('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  });
});

/* ============================================================
   7. DARK MODE
   ============================================================ */
function applyDarkMode(dark) {
  document.body.classList.toggle('dark-mode', dark);
  sunIcon.style.display = dark ? 'none' : 'block';
  moonIcon.style.display = dark ? 'block' : 'none';
  localStorage.setItem('vastra_dark', dark);
}
applyDarkMode(isDarkMode);

darkToggle.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  applyDarkMode(isDarkMode);
});

/* ============================================================
   8. SEARCH BAR
   ============================================================ */
searchBtn.addEventListener('click', () => {
  searchBar.classList.toggle('open');
  if (searchBar.classList.contains('open')) searchInput.focus();
});
searchClose.addEventListener('click', () => searchBar.classList.remove('open'));

searchInput.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase().trim();
  $$('.product-card').forEach(card => {
    const name = card.dataset.name?.toLowerCase() || '';
    card.style.display = (!q || name.includes(q)) ? '' : 'none';
  });
});

/* ============================================================
   9. SMOOTH SCROLLING (native + offset for fixed navbar)
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 70;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

/* ============================================================
   10. SCROLL REVEAL – Intersection Observer
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

function observeRevealElements() {
  $$('.reveal, .reveal-up, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
  });
}
observeRevealElements();

/* ============================================================
   11. RIPPLE EFFECT
   ============================================================ */
document.addEventListener('click', e => {
  const btn = e.target.closest('.ripple');
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const span = document.createElement('span');
  span.classList.add('ripple-span');
  span.style.cssText = `
    width:${size}px;height:${size}px;
    left:${e.clientX - rect.left - size/2}px;
    top:${e.clientY - rect.top - size/2}px;
  `;
  btn.appendChild(span);
  span.addEventListener('animationend', () => span.remove());
});

/* ============================================================
   12. PRODUCT RENDERING
   ============================================================ */
function formatPrice(n) {
  return '₹' + n.toLocaleString('en-IN');
}

function renderProducts(filter = 'all') {
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
  productsGrid.innerHTML = '';

  filtered.forEach((p, i) => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.dataset.id = p.id;
    card.dataset.name = p.name;
    card.style.animationDelay = (i * 0.07) + 's';
    card.innerHTML = `
      <div class="product-img-wrap">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <img class="product-img-front" src="${p.img}" alt="${p.name}" loading="lazy" />
        <img class="product-img-back" src="${p.imgHover}" alt="${p.name} – alternate view" loading="lazy" />
        <div class="product-actions">
          <button class="product-action-btn quick-view-btn" data-id="${p.id}" aria-label="Quick view ${p.name}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </button>
          <button class="product-action-btn wishlist-btn" aria-label="Wishlist ${p.name}" data-id="${p.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
        </div>
      </div>
      <div class="product-info">
        <p class="product-cat">${p.category}</p>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-price">${formatPrice(p.price)}</p>
        <button class="product-add-btn add-to-cart-btn ripple" data-id="${p.id}">Add to Cart</button>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

renderProducts();

/* ============================================================
   13. PRODUCT FILTER
   ============================================================ */
$$('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderProducts(currentFilter);
  });
});

// Category cards also filter products
$$('.category-card').forEach(card => {
  card.addEventListener('click', () => {
    const filter = card.dataset.filter;
    document.querySelector('#shop').scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      $$('.filter-btn').forEach(b => b.classList.remove('active'));
      document.querySelector(`.filter-btn[data-filter="${filter}"]`)?.classList.add('active');
      renderProducts(filter);
    }, 600);
  });
});

/* ============================================================
   14. CART LOGIC
   ============================================================ */
function saveCart() {
  localStorage.setItem('vastra_cart', JSON.stringify(cart));
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  updateCartUI();
  showToast(`${product.name} added to cart!`);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else { saveCart(); updateCartUI(); }
}

function updateCartUI() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  cartCount.textContent = total;
  cartCount.style.transform = 'scale(1.4)';
  setTimeout(() => (cartCount.style.transform = ''), 300);

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <span>🛍️</span>
        <p>Your cart is empty</p>
      </div>
    `;
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}" />
        <div class="cart-item-info">
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-price">${formatPrice(item.price)}</p>
          <div class="cart-item-qty">
            <button class="qty-btn" data-id="${item.id}" data-delta="-1">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" data-id="${item.id}" data-delta="1">+</button>
          </div>
        </div>
        <button class="cart-item-remove" data-remove="${item.id}" aria-label="Remove ${item.name}">✕</button>
      </div>
    `).join('');
  }

  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);
  cartTotal.textContent = formatPrice(totalPrice);
}

updateCartUI();

// Event delegation for cart interactions
cartItems.addEventListener('click', e => {
  const removeBtn = e.target.closest('[data-remove]');
  if (removeBtn) return removeFromCart(+removeBtn.dataset.remove);
  const qtyBtn = e.target.closest('.qty-btn');
  if (qtyBtn) changeQty(+qtyBtn.dataset.id, +qtyBtn.dataset.delta);
});

// Add to cart – event delegation on products grid
productsGrid.addEventListener('click', e => {
  const addBtn = e.target.closest('.add-to-cart-btn');
  if (addBtn) addToCart(+addBtn.dataset.id);

  const quickView = e.target.closest('.quick-view-btn');
  if (quickView) openQuickView(+quickView.dataset.id);
});

/* Cart sidebar open/close */
cartBtn.addEventListener('click', () => openCartSidebar());
closeCart.addEventListener('click', () => closeCartSidebar());
cartOverlay.addEventListener('click', () => closeCartSidebar());

function openCartSidebar() {
  cartSidebar.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCartSidebar() {
  cartSidebar.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* ============================================================
   15. TOAST NOTIFICATION
   ============================================================ */
let toastTimer;
function showToast(msg) {
  toastMsg.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ============================================================
   16. QUICK VIEW MODAL
   ============================================================ */
function openQuickView(id) {
  const p = products.find(pr => pr.id === id);
  if (!p) return;
  $('modalImg').src = p.img;
  $('modalImg').alt = p.name;
  $('modalCategory').textContent = p.category;
  $('modalName').textContent = p.name;
  $('modalPrice').textContent = formatPrice(p.price);
  $('modalDesc').textContent = p.desc;
  $('modalAddCart').dataset.id = id;
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

closeModal.addEventListener('click', closeModal_f);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal_f(); });
$('modalAddCart').addEventListener('click', e => {
  addToCart(+e.currentTarget.dataset.id);
  closeModal_f();
  openCartSidebar();
});
function closeModal_f() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* ============================================================
   17. TESTIMONIALS CAROUSEL
   ============================================================ */
const slides = $$('.testimonial-card');
const totalSlides = slides.length;

// Build dots
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', `Review ${i + 1}`);
  dot.addEventListener('click', () => goToSlide(i));
  dotsWrap.appendChild(dot);
});

function goToSlide(n) {
  currentSlide = (n + totalSlides) % totalSlides;
  testimonials.style.transform = `translateX(-${currentSlide * 100}%)`;
  $$('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  resetCarouselInterval();
}

prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

function resetCarouselInterval() {
  clearInterval(carouselInterval);
  carouselInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
}
resetCarouselInterval();

// Pause on hover
testimonials.addEventListener('mouseenter', () => clearInterval(carouselInterval));
testimonials.addEventListener('mouseleave', resetCarouselInterval);

// Touch/swipe support
let touchStartX = 0;
testimonials.addEventListener('touchstart', e => (touchStartX = e.touches[0].clientX), { passive: true });
testimonials.addEventListener('touchend', e => {
  const delta = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(delta) > 40) goToSlide(delta > 0 ? currentSlide + 1 : currentSlide - 1);
}, { passive: true });

/* ============================================================
   18. NEWSLETTER FORM
   ============================================================ */
newsletter.addEventListener('submit', e => {
  e.preventDefault();
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    formMsg.textContent = '⚠️ Please enter a valid email address.';
    formMsg.className = 'form-message error';
    emailInput.focus();
    return;
  }
  formMsg.textContent = '✅ Thank you! You\'re on the list.';
  formMsg.className = 'form-message success';
  emailInput.value = '';
  setTimeout(() => { formMsg.textContent = ''; formMsg.className = 'form-message'; }, 5000);
});

/* ============================================================
   19. KEYBOARD ACCESSIBILITY
   ============================================================ */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeCartSidebar();
    closeModal_f();
    searchBar.classList.remove('open');
    if (navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
  if (e.key === 'ArrowLeft' && !modalOverlay.classList.contains('open')) goToSlide(currentSlide - 1);
  if (e.key === 'ArrowRight' && !modalOverlay.classList.contains('open')) goToSlide(currentSlide + 1);
});
