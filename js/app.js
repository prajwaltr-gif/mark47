/**
 * Aura & Bean — Artisan Coffee Roasters & Botanical Café
 * Primary Client-Side Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const AppState = {
    cart: JSON.parse(localStorage.getItem('aura_cart') || '[]'),
    activeCategory: 'all',
    searchQuery: '',
    currentTheme: localStorage.getItem('aura_theme') || 'dark',
    tipRate: 0.15,
    quizSelections: {
      strength: 'balanced',
      milk: 'oat',
      flavor: 'floral'
    }
  };

  /* ==========================================================================
     1. Theme Switcher (Dark / Light)
     ========================================================================== */
  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');

  function applyTheme(theme) {
    AppState.currentTheme = theme;
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('aura_theme', theme);
    if (theme === 'light') {
      themeIcon.className = 'fa-solid fa-moon';
      themeToggleBtn.setAttribute('title', 'Switch to Dark Velvet theme');
    } else {
      themeIcon.className = 'fa-solid fa-sun';
      themeToggleBtn.setAttribute('title', 'Switch to Golden Latte light theme');
    }
  }

  applyTheme(AppState.currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const newTheme = AppState.currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    showToast(`Switched to ${newTheme === 'dark' ? 'Midnight Velvet' : 'Golden Latte'} mode`, 'fa-circle-half-stroke');
  });

  /* ==========================================================================
     2. Mobile Navigation Toggle
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('mobile-open');
    const isOpen = navMenu.classList.contains('mobile-open');
    mobileMenuBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });

  // Close mobile nav when clicking a link
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('mobile-open');
      mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  /* ==========================================================================
     3. Toast Notification Helper
     ========================================================================== */
  const toastContainer = document.getElementById('toastContainer');

  function showToast(message, icon = 'fa-circle-check') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid ${icon}" style="color:var(--accent-amber);"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  /* ==========================================================================
     4. Render Category Pills & Menu Items
     ========================================================================== */
  const categoryPillsContainer = document.getElementById('categoryPillsContainer');
  const menuGridContainer = document.getElementById('menuGridContainer');
  const menuSearchInput = document.getElementById('menuSearchInput');

  function renderCategoryPills() {
    categoryPillsContainer.innerHTML = MENU_CATEGORIES.map(cat => `
      <button class="filter-pill ${cat.id === AppState.activeCategory ? 'active' : ''}" data-category="${cat.id}">
        <i class="fa-solid ${cat.icon}"></i> ${cat.name}
      </button>
    `).join('');

    categoryPillsContainer.querySelectorAll('.filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        AppState.activeCategory = btn.getAttribute('data-category');
        categoryPillsContainer.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterAndRenderMenu();
      });
    });
  }

  function filterAndRenderMenu() {
    const query = AppState.searchQuery.toLowerCase().trim();
    const filtered = MENU_ITEMS.filter(item => {
      const matchesCategory = AppState.activeCategory === 'all' || item.category === AppState.activeCategory;
      const matchesSearch = !query || 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query) ||
        item.flavorNotes.some(note => note.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      menuGridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <i class="fa-solid fa-mug-saucer" style="font-size: 3rem; color: var(--border-active); margin-bottom: 1rem;"></i>
          <h3>No items matched your search</h3>
          <p>Try searching for "latte", "cold brew", "matcha", or "croissant".</p>
        </div>
      `;
      return;
    }

    menuGridContainer.innerHTML = filtered.map(item => `
      <article class="menu-card" data-item-id="${item.id}">
        <div class="card-image-wrap">
          <img src="${item.image}" alt="${item.name}" loading="lazy" width="400" height="220">
          <span class="card-badge">${item.badge}</span>
          <span class="card-rating-chip"><i class="fa-solid fa-star"></i> ${item.rating}</span>
        </div>
        <div class="card-content">
          <div class="card-header-row">
            <h3 class="card-title">${item.name}</h3>
            <span class="card-price">$${item.price.toFixed(2)}</span>
          </div>
          <p class="card-desc">${item.description}</p>
          <div class="card-flavor-notes">
            ${item.flavorNotes.map(n => `<span class="flavor-tag"><i class="fa-solid fa-leaf" style="font-size:0.6rem; color:var(--accent-gold);"></i> ${n}</span>`).join('')}
          </div>
          <div class="card-footer">
            <button class="btn-quick-view" data-action="quick-view" data-id="${item.id}">
              <i class="fa-regular fa-eye"></i> Details
            </button>
            <button class="btn-add-order" data-action="add-cart" data-id="${item.id}">
              <i class="fa-solid fa-plus"></i> Add
            </button>
          </div>
        </div>
      </article>
    `).join('');

    // Attach card event listeners
    menuGridContainer.querySelectorAll('[data-action="add-cart"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const item = MENU_ITEMS.find(i => i.id === id);
        if (item) {
          addToCart(item, item.sizes ? item.sizes[0] : null, item.temperatures ? item.temperatures[0] : null);
        }
      });
    });

    menuGridContainer.querySelectorAll('[data-action="quick-view"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        openQuickViewModal(id);
      });
    });
  }

  menuSearchInput.addEventListener('input', (e) => {
    AppState.searchQuery = e.target.value;
    filterAndRenderMenu();
  });

  /* ==========================================================================
     5. Shopping Cart Management
     ========================================================================== */
  const cartToggleBtn = document.getElementById('cartToggleBtn');
  const cartOverlay = document.getElementById('cartOverlay');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const cartCountBadge = document.getElementById('cartCountBadge');
  const cartTotalItemsCount = document.getElementById('cartTotalItemsCount');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const cartTax = document.getElementById('cartTax');
  const cartGrandTotal = document.getElementById('cartGrandTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');

  function saveCart() {
    localStorage.setItem('aura_cart', JSON.stringify(AppState.cart));
    updateCartUI();
  }

  function addToCart(item, selectedSize = null, selectedTemp = null) {
    const sizeName = selectedSize ? selectedSize.name : (item.sizes ? item.sizes[0].name : 'Standard');
    const extraPrice = selectedSize ? selectedSize.extra : 0;
    const finalPrice = item.price + extraPrice;
    const tempName = selectedTemp || (item.temperatures ? item.temperatures[0] : '');

    const cartItemId = `${item.id}-${sizeName}-${tempName}`;
    const existing = AppState.cart.find(c => c.cartItemId === cartItemId);

    if (existing) {
      existing.quantity += 1;
    } else {
      AppState.cart.push({
        cartItemId,
        id: item.id,
        name: item.name,
        price: finalPrice,
        image: item.image,
        size: sizeName,
        temperature: tempName,
        quantity: 1
      });
    }

    saveCart();
    showToast(`Added ${item.name} to order!`, 'fa-cart-plus');

    // Bounce cart button
    cartToggleBtn.style.transform = 'scale(1.2)';
    setTimeout(() => { cartToggleBtn.style.transform = 'scale(1)'; }, 200);
  }

  function updateCartUI() {
    const totalCount = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountBadge.textContent = totalCount;
    cartTotalItemsCount.textContent = totalCount;

    if (AppState.cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty-state">
          <i class="fa-solid fa-basket-shopping"></i>
          <h4>Your order is empty</h4>
          <p style="font-size:0.85rem; margin-top:0.35rem;">Explore our single-origin coffees, nitro brews, and artisan bakery items.</p>
        </div>
      `;
      cartSubtotal.textContent = '$0.00';
      cartTax.textContent = '$0.00';
      cartGrandTotal.textContent = '$0.00';
      checkoutBtn.disabled = true;
      checkoutBtn.style.opacity = '0.5';
      return;
    }

    checkoutBtn.disabled = false;
    checkoutBtn.style.opacity = '1';

    const subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.085;
    const total = subtotal + tax;

    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    cartTax.textContent = `$${tax.toFixed(2)}`;
    cartGrandTotal.textContent = `$${total.toFixed(2)}`;

    cartItemsContainer.innerHTML = AppState.cart.map(item => `
      <div class="cart-item-card">
        <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
        <div class="cart-item-info">
          <h4 class="cart-item-name">${item.name}</h4>
          <div class="cart-item-meta">${item.size}${item.temperature ? ' • ' + item.temperature : ''}</div>
          <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
          <div class="cart-item-actions">
            <button class="qty-btn" data-action="decrease" data-id="${item.cartItemId}">-</button>
            <span style="font-size:0.9rem; font-weight:600; min-width:18px; text-align:center;">${item.quantity}</span>
            <button class="qty-btn" data-action="increase" data-id="${item.cartItemId}">+</button>
            <button class="qty-btn" data-action="remove" data-id="${item.cartItemId}" style="margin-left:auto; color:var(--accent-ruby); border-color:rgba(231,111,81,0.3);" title="Remove">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Quantity events
    cartItemsContainer.querySelectorAll('[data-action="increase"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const itm = AppState.cart.find(c => c.cartItemId === id);
        if (itm) {
          itm.quantity += 1;
          saveCart();
        }
      });
    });

    cartItemsContainer.querySelectorAll('[data-action="decrease"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const itm = AppState.cart.find(c => c.cartItemId === id);
        if (itm) {
          itm.quantity -= 1;
          if (itm.quantity <= 0) {
            AppState.cart = AppState.cart.filter(c => c.cartItemId !== id);
          }
          saveCart();
        }
      });
    });

    cartItemsContainer.querySelectorAll('[data-action="remove"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        AppState.cart = AppState.cart.filter(c => c.cartItemId !== id);
        saveCart();
        showToast('Item removed from order', 'fa-trash-can');
      });
    });
  }

  cartToggleBtn.addEventListener('click', () => cartOverlay.classList.add('active'));
  closeCartBtn.addEventListener('click', () => cartOverlay.classList.remove('active'));
  cartOverlay.addEventListener('click', (e) => {
    if (e.target === cartOverlay) cartOverlay.classList.remove('active');
  });

  /* ==========================================================================
     6. Quick View / Item Details Modal
     ========================================================================== */
  const quickViewModal = document.getElementById('quickViewModal');
  const closeQuickViewBtn = document.getElementById('closeQuickViewBtn');
  const quickViewModalBody = document.getElementById('quickViewModalBody');

  function openQuickViewModal(itemId) {
    const item = MENU_ITEMS.find(i => i.id === itemId);
    if (!item) return;

    let selectedSize = item.sizes ? item.sizes[0] : null;
    let selectedTemp = item.temperatures ? item.temperatures[0] : null;

    quickViewModalBody.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:1.25rem;">
        <div style="height:240px; border-radius:var(--radius-md); overflow:hidden; border:1px solid var(--border-subtle); background:#110e0c;">
          <img src="${item.image}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div>
              <span class="card-badge" style="position:static; margin-bottom:0.5rem; display:inline-block;">${item.badge}</span>
              <h3 class="heading-serif" style="font-size:1.6rem;">${item.name}</h3>
            </div>
            <span class="card-price" id="modalCalculatedPrice" style="font-size:1.5rem;">$${item.price.toFixed(2)}</span>
          </div>
          <p style="color:var(--text-secondary); margin:0.75rem 0; font-size:0.95rem;">${item.description}</p>
        </div>

        <div style="background:var(--bg-surface); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-subtle); font-size:0.85rem; display:grid; grid-template-columns:1fr 1fr; gap:0.6rem;">
          <div><span style="color:var(--text-muted);">Origin:</span> <strong>${item.origin}</strong></div>
          <div><span style="color:var(--text-muted);">Calories:</span> <strong>${item.calories}</strong></div>
          <div><span style="color:var(--text-muted);">Dietary:</span> <strong>${item.dietary.join(', ')}</strong></div>
          <div><span style="color:var(--text-muted);">Rating:</span> <strong style="color:#ffc107;">★ ${item.rating} (${item.reviewsCount} reviews)</strong></div>
        </div>

        ${item.sizes && item.sizes.length > 1 ? `
          <div>
            <label style="font-size:0.85rem; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:0.4rem;">Select Size</label>
            <div style="display:flex; gap:0.6rem;" id="modalSizeGroup">
              ${item.sizes.map((s, idx) => `
                <button type="button" class="btn btn-outline btn-sm modal-size-btn ${idx === 0 ? 'active' : ''}" data-idx="${idx}" style="${idx === 0 ? 'border-color:var(--accent-gold); color:var(--accent-amber); font-weight:700;' : ''}">
                  ${s.name} ${s.extra > 0 ? `(+$${s.extra.toFixed(2)})` : ''}
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        ${item.temperatures && item.temperatures.length > 1 ? `
          <div>
            <label style="font-size:0.85rem; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:0.4rem;">Temperature</label>
            <div style="display:flex; gap:0.6rem;" id="modalTempGroup">
              ${item.temperatures.map((t, idx) => `
                <button type="button" class="btn btn-outline btn-sm modal-temp-btn ${idx === 0 ? 'active' : ''}" data-temp="${t}" style="${idx === 0 ? 'border-color:var(--accent-gold); color:var(--accent-amber); font-weight:700;' : ''}">
                  ${t}
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <button class="btn btn-primary btn-lg" id="modalAddToCartAction" style="width:100%; margin-top:0.5rem;">
          <i class="fa-solid fa-cart-plus"></i> Add to Order
        </button>
      </div>
    `;

    // Size clicks
    const sizeBtns = quickViewModalBody.querySelectorAll('.modal-size-btn');
    const priceDisplay = quickViewModalBody.querySelector('#modalCalculatedPrice');

    sizeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sizeBtns.forEach(b => {
          b.classList.remove('active');
          b.style.borderColor = 'var(--border-subtle)';
          b.style.color = 'var(--text-primary)';
          b.style.fontWeight = '500';
        });
        btn.classList.add('active');
        btn.style.borderColor = 'var(--accent-gold)';
        btn.style.color = 'var(--accent-amber)';
        btn.style.fontWeight = '700';

        const idx = parseInt(btn.getAttribute('data-idx'));
        selectedSize = item.sizes[idx];
        priceDisplay.textContent = `$${(item.price + selectedSize.extra).toFixed(2)}`;
      });
    });

    // Temp clicks
    const tempBtns = quickViewModalBody.querySelectorAll('.modal-temp-btn');
    tempBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tempBtns.forEach(b => {
          b.classList.remove('active');
          b.style.borderColor = 'var(--border-subtle)';
          b.style.color = 'var(--text-primary)';
          b.style.fontWeight = '500';
        });
        btn.classList.add('active');
        btn.style.borderColor = 'var(--accent-gold)';
        btn.style.color = 'var(--accent-amber)';
        btn.style.fontWeight = '700';
        selectedTemp = btn.getAttribute('data-temp');
      });
    });

    // Add action
    quickViewModalBody.querySelector('#modalAddToCartAction').addEventListener('click', () => {
      addToCart(item, selectedSize, selectedTemp);
      quickViewModal.classList.remove('active');
    });

    quickViewModal.classList.add('active');
  }

  closeQuickViewBtn.addEventListener('click', () => quickViewModal.classList.remove('active'));
  quickViewModal.addEventListener('click', (e) => {
    if (e.target === quickViewModal) quickViewModal.classList.remove('active');
  });

  /* ==========================================================================
     7. Interactive Coffee Matchmaker (Quiz)
     ========================================================================== */
  const quizStrengthOptions = document.getElementById('quizStrengthOptions');
  const quizMilkOptions = document.getElementById('quizMilkOptions');
  const quizFlavorOptions = document.getElementById('quizFlavorOptions');
  const quizResultImage = document.getElementById('quizResultImage');
  const quizResultTitle = document.getElementById('quizResultTitle');
  const quizResultDesc = document.getElementById('quizResultDesc');
  const quizResultPrice = document.getElementById('quizResultPrice');
  const quizAddToCartBtn = document.getElementById('quizAddToCartBtn');

  let currentMatchedItem = MENU_ITEMS[0];

  function evaluateQuizMatch() {
    const { strength, milk, flavor } = AppState.quizSelections;

    // Match algorithm based on selected combination
    let match = MENU_ITEMS[0]; // Default Swan Latte
    if (flavor === 'matcha') {
      match = MENU_ITEMS.find(i => i.id === 'item-4') || match;
    } else if (strength === 'bold' || milk === 'iced') {
      match = MENU_ITEMS.find(i => i.id === 'item-2') || match;
    } else if (flavor === 'citrus') {
      match = MENU_ITEMS.find(i => i.id === 'item-6') || match;
    } else if (strength === 'sweet') {
      match = MENU_ITEMS.find(i => i.id === 'item-8') || match;
    } else if (strength === 'bold' && milk === 'black') {
      match = MENU_ITEMS.find(i => i.id === 'item-5') || match;
    } else if (milk === 'oat' && flavor === 'floral') {
      match = MENU_ITEMS.find(i => i.id === 'item-1') || match;
    } else {
      match = MENU_ITEMS.find(i => i.strength === strength) || MENU_ITEMS[0];
    }

    currentMatchedItem = match;
    quizResultImage.src = match.image;
    quizResultImage.alt = match.name;
    quizResultTitle.textContent = match.name;
    quizResultDesc.textContent = match.description;
    quizResultPrice.textContent = `$${match.price.toFixed(2)}`;
  }

  function bindQuizGroup(container, stateKey) {
    const buttons = container.querySelectorAll('.quiz-option-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => {
          b.classList.remove('selected');
          b.querySelector('i').style.opacity = '0';
        });
        btn.classList.add('selected');
        btn.querySelector('i').style.opacity = '1';

        AppState.quizSelections[stateKey] = btn.getAttribute('data-value');
        evaluateQuizMatch();
      });
    });
  }

  bindQuizGroup(quizStrengthOptions, 'strength');
  bindQuizGroup(quizMilkOptions, 'milk');
  bindQuizGroup(quizFlavorOptions, 'flavor');

  quizAddToCartBtn.addEventListener('click', () => {
    addToCart(currentMatchedItem);
  });

  /* ==========================================================================
     8. Single Origin Bean Showcase Rendering
     ========================================================================== */
  const originsGridContainer = document.getElementById('originsGridContainer');

  function renderOrigins() {
    originsGridContainer.innerHTML = COFFEE_ORIGINS.map(origin => `
      <article class="origin-card">
        <span class="origin-flag-badge"><i class="fa-solid fa-mountain"></i> ${origin.process}</span>
        <h3 class="origin-country">${origin.country}</h3>
        <p class="origin-region">${origin.region}</p>

        <div class="origin-specs">
          <div class="spec-line"><span class="spec-label">Elevation</span><span class="spec-val">${origin.altitude}</span></div>
          <div class="spec-line"><span class="spec-label">Roast Degree</span><span class="spec-val">${origin.roastLevel}</span></div>
          <div class="spec-line"><span class="spec-label">Acidity</span><span class="spec-val">${origin.acidity}</span></div>
          <div class="spec-line"><span class="spec-label">Body</span><span class="spec-val">${origin.body}</span></div>
        </div>

        <div class="origin-profile-box">
          <strong>Cup Profile:</strong>
          <span>${origin.profile}</span>
        </div>

        <p style="font-size:0.85rem; color:var(--text-secondary); line-height:1.5; margin-bottom:1.5rem; flex-grow:1;">
          ${origin.farmerStory}
        </p>

        <button class="btn btn-outline btn-sm" onclick="showToast('Sample brew available at our Barista Counter today!', 'fa-mug-hot')">
          <i class="fa-solid fa-compass"></i> Request Barista Brew
        </button>
      </article>
    `).join('');
  }

  /* ==========================================================================
     9. Reviews Rendering & Review Submission Modal
     ========================================================================== */
  const reviewsGridContainer = document.getElementById('reviewsGridContainer');
  const openReviewModalBtn = document.getElementById('openReviewModalBtn');
  const reviewModal = document.getElementById('reviewModal');
  const closeReviewModalBtn = document.getElementById('closeReviewModalBtn');
  const newReviewForm = document.getElementById('newReviewForm');

  function renderReviews() {
    reviewsGridContainer.innerHTML = REVIEWS_DATA.map(rev => `
      <div class="review-card">
        <div>
          <div class="review-stars">
            ${'<i class="fa-solid fa-star"></i>'.repeat(rev.stars)}
          </div>
          <p class="review-text">"${rev.comment}"</p>
        </div>
        <div class="review-author">
          <img src="${rev.avatar}" alt="${rev.name}" class="author-avatar" loading="lazy">
          <div class="author-info">
            <h5>${rev.name}</h5>
            <span>${rev.role} • ${rev.source}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  openReviewModalBtn.addEventListener('click', () => reviewModal.classList.add('active'));
  closeReviewModalBtn.addEventListener('click', () => reviewModal.classList.remove('active'));
  reviewModal.addEventListener('click', (e) => {
    if (e.target === reviewModal) reviewModal.classList.remove('active');
  });

  newReviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reviewAuthorName').value.trim();
    const stars = parseInt(document.getElementById('reviewRating').value);
    const comment = document.getElementById('reviewComment').value.trim();

    REVIEWS_DATA.unshift({
      name,
      role: 'Verified Cafe Guest',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      stars,
      source: 'Direct Website Review',
      date: 'Just now',
      comment
    });

    renderReviews();
    reviewModal.classList.remove('active');
    newReviewForm.reset();
    showToast('Thank you for sharing your experience!', 'fa-heart');
  });

  /* ==========================================================================
     10. Table Reservation System
     ========================================================================== */
  const reservationForm = document.getElementById('reservationForm');
  const resDateInput = document.getElementById('resDate');
  const reservationModal = document.getElementById('reservationModal');
  const closeReservationModalBtn = document.getElementById('closeReservationModalBtn');
  const resDoneBtn = document.getElementById('resDoneBtn');
  const resSummaryDetails = document.getElementById('resSummaryDetails');
  const resRefCode = document.getElementById('resRefCode');

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];
  resDateInput.min = today;
  resDateInput.value = today;

  reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('resName').value.trim();
    const guests = document.getElementById('resGuests').value;
    const date = document.getElementById('resDate').value;
    const time = document.getElementById('resTime').value;
    const zone = document.querySelector('input[name="resZone"]:checked').value;
    const notes = document.getElementById('resNotes').value.trim();

    const randomRef = '#AB-' + Math.floor(10000 + Math.random() * 90000);
    resRefCode.textContent = randomRef;

    resSummaryDetails.innerHTML = `
      <div style="margin-bottom:0.4rem;"><strong>Guest Name:</strong> ${name}</div>
      <div style="margin-bottom:0.4rem;"><strong>Party Size:</strong> ${guests} Guest(s)</div>
      <div style="margin-bottom:0.4rem;"><strong>Date & Time:</strong> ${date} at ${time}</div>
      <div style="margin-bottom:0.4rem;"><strong>Preferred Atmosphere:</strong> ${zone}</div>
      ${notes ? `<div><strong>Special Request:</strong> ${notes}</div>` : ''}
    `;

    reservationModal.classList.add('active');
    reservationForm.reset();
    resDateInput.value = today;
    showToast(`Reservation confirmed for ${name}!`, 'fa-calendar-check');
  });

  closeReservationModalBtn.addEventListener('click', () => reservationModal.classList.remove('active'));
  resDoneBtn.addEventListener('click', () => reservationModal.classList.remove('active'));
  reservationModal.addEventListener('click', (e) => {
    if (e.target === reservationModal) reservationModal.classList.remove('active');
  });

  /* ==========================================================================
     11. Checkout Flow & Payment Simulation
     ========================================================================== */
  const checkoutModal = document.getElementById('checkoutModal');
  const closeCheckoutModalBtn = document.getElementById('closeCheckoutModalBtn');
  const checkoutForm = document.getElementById('checkoutForm');
  const checkoutModalContent = document.getElementById('checkoutModalContent');
  const checkoutSuccessContent = document.getElementById('checkoutSuccessContent');
  const orderReceiptDoneBtn = document.getElementById('orderReceiptDoneBtn');
  const orderSuccessId = document.getElementById('orderSuccessId');

  const checkoutSubtotal = document.getElementById('checkoutSubtotal');
  const checkoutTip = document.getElementById('checkoutTip');
  const checkoutTax = document.getElementById('checkoutTax');
  const checkoutTotal = document.getElementById('checkoutTotal');
  const tipButtons = document.querySelectorAll('.tip-btn');

  function calculateCheckoutTotals() {
    const subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tipAmount = subtotal * AppState.tipRate;
    const taxAmount = subtotal * 0.085;
    const grandTotal = subtotal + tipAmount + taxAmount;

    checkoutSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    checkoutTip.textContent = `$${tipAmount.toFixed(2)}`;
    checkoutTax.textContent = `$${taxAmount.toFixed(2)}`;
    checkoutTotal.textContent = `$${grandTotal.toFixed(2)}`;
  }

  tipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tipButtons.forEach(b => {
        b.classList.remove('active');
        b.style.borderColor = 'var(--border-subtle)';
        b.style.color = 'var(--text-primary)';
      });
      btn.classList.add('active');
      btn.style.borderColor = 'var(--accent-gold)';
      btn.style.color = 'var(--accent-amber)';
      AppState.tipRate = parseFloat(btn.getAttribute('data-tip'));
      calculateCheckoutTotals();
    });
  });

  checkoutBtn.addEventListener('click', () => {
    cartOverlay.classList.remove('active');
    calculateCheckoutTotals();
    checkoutModalContent.style.display = 'block';
    checkoutSuccessContent.style.display = 'none';
    checkoutModal.classList.add('active');
  });

  closeCheckoutModalBtn.addEventListener('click', () => checkoutModal.classList.remove('active'));
  checkoutModal.addEventListener('click', (e) => {
    if (e.target === checkoutModal) checkoutModal.classList.remove('active');
  });

  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const orderNum = '#AB-' + Math.floor(1000 + Math.random() * 9000);
    orderSuccessId.textContent = orderNum;

    checkoutModalContent.style.display = 'none';
    checkoutSuccessContent.style.display = 'block';

    // Clear cart
    AppState.cart = [];
    saveCart();

    showToast(`Order ${orderNum} received! Baristas are brewing.`, 'fa-mug-hot');
  });

  orderReceiptDoneBtn.addEventListener('click', () => checkoutModal.classList.remove('active'));

  /* ==========================================================================
     12. Location Section Current Day Highlight
     ========================================================================== */
  const currentDayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday...
  const todayRow = document.querySelector(`.hours-table tr[data-day="${currentDayIndex}"]`);
  if (todayRow) {
    todayRow.classList.add('today');
    const dayCell = todayRow.querySelector('.day');
    if (dayCell) {
      dayCell.innerHTML = `<strong>${dayCell.textContent} (Today)</strong>`;
    }
  }

  /* ==========================================================================
     13. Newsletter Signup Form
     ========================================================================== */
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterSuccessMessage = document.getElementById('newsletterSuccessMessage');

  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    newsletterForm.style.display = 'none';
    newsletterSuccessMessage.style.display = 'block';
    showToast('Welcome to the Velvet Bean Club!', 'fa-crown');
  });

  // Dynamic copyright year
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     Initial Render
     ========================================================================== */
  renderCategoryPills();
  filterAndRenderMenu();
  renderOrigins();
  renderReviews();
  updateCartUI();
  evaluateQuizMatch();
});
