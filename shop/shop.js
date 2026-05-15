// shop/shop.js
document.addEventListener('DOMContentLoaded', () => {
  // Products Data
  const products = [
    // Metal
    { id: 1, name: 'Steel gate (standard)', category: 'metal', catLabel: 'Metal fabrication', priceStr: '₦85,000', priceVal: 85000, desc: 'Single-leaf or double-leaf mild steel gate. Powder-coated finish. Custom dimensions available.', type: ['org', 'individual'], tags: [], icon: '🚪' },
    { id: 2, name: 'Metal burglar-proof window frame', category: 'metal', catLabel: 'Metal fabrication', priceStr: '₦22,000', priceVal: 22000, desc: 'Heavy-duty steel window frame with burglar-proof bars. All sizes. Galvanised finish.', type: ['org', 'individual'], tags: [], icon: '🪟' },
    { id: 3, name: 'Steel staircase railing', category: 'metal', catLabel: 'Metal fabrication', priceStr: '₦18,000', priceVal: 18000, desc: 'Fabricated steel handrail for staircases — residential or commercial. Per metre rate.', type: ['org', 'individual'], tags: [], icon: '🪜' },
    { id: 4, name: 'Student project chassis', category: 'metal', catLabel: 'Metal fabrication', priceStr: '₦15,000', priceVal: 15000, desc: 'Custom metal chassis for engineering project — robot, vehicle model, structural frame. Ideal for final-year projects.', type: ['student'], tags: ['student'], icon: '🤖' },
    { id: 5, name: 'Industrial shelving unit', category: 'metal', catLabel: 'Metal fabrication', priceStr: '₦55,000', priceVal: 55000, desc: 'Heavy-duty steel shelving for warehouses, factories, stores. Load-rated. Multiple tiers available.', type: ['org'], tags: [], icon: '🏗️' },
    { id: 6, name: 'Metal roofing frame', category: 'metal', catLabel: 'Metal fabrication', priceStr: '₦180,000', priceVal: 180000, desc: 'Structural steel frame for roofing — residential and commercial. Includes fabrication and delivery.', type: ['org', 'individual'], tags: [], icon: '🏠' },
    
    // Solar
    { id: 7, name: '100W solar starter kit', category: 'solar', catLabel: 'Solar & energy', priceStr: '₦95,000', priceVal: 95000, desc: '1 × 100W panel, charge controller, battery, inverter, wiring. Ideal for students and small homes.', type: ['individual', 'student'], tags: ['popular', 'student'], icon: '☀️' },
    { id: 8, name: '1kVA solar home system', category: 'solar', catLabel: 'Solar & energy', priceStr: '₦280,000', priceVal: 280000, desc: 'Full off-grid solar system for a standard apartment. Installation included within Lagos.', type: ['individual'], tags: ['popular'], icon: '🔋' },
    { id: 9, name: '5kVA commercial solar system', category: 'solar', catLabel: 'Solar & energy', priceStr: '₦950,000', priceVal: 950000, desc: 'For offices, SMEs, and commercial premises. Includes panels, inverter, batteries, installation & 1-year support.', type: ['org'], tags: [], icon: '🏢' },
    { id: 10, name: 'Solar street light (standalone)', category: 'solar', catLabel: 'Solar & energy', priceStr: '₦120,000', priceVal: 120000, desc: 'All-in-one solar street light with pole. Suitable for estates, campuses, and road lighting.', type: ['org'], tags: [], icon: '💡' },
    { id: 11, name: 'Solar lab kit (educational)', category: 'solar', catLabel: 'Solar & energy', priceStr: '₦45,000', priceVal: 45000, desc: 'Demonstration solar kit for schools and universities. Includes panels, battery, charge controller, and lab manual.', type: ['student', 'org'], tags: ['student'], icon: '🔬' },
    
    // Engineering
    { id: 12, name: 'Architectural drawing (residential)', category: 'eng', catLabel: 'Engineering design', priceStr: '₦120,000', priceVal: 120000, desc: 'Full floor plan, elevation, and section drawings for a residential building. Stamped by a registered engineer.', type: ['org', 'individual'], tags: [], icon: '📐' },
    { id: 13, name: 'Structural engineering design', category: 'eng', catLabel: 'Engineering design', priceStr: 'Quote/Project', priceVal: 0, desc: 'Structural analysis and design for beams, columns, slabs, and foundations. Includes calculation report.', type: ['org'], tags: [], icon: '🏛️' },
    { id: 14, name: 'Final year project design support', category: 'eng', catLabel: 'Engineering design', priceStr: 'Quote/Student', priceVal: 0, desc: 'Engineering design consultation and drawing for student final year projects. Includes 3 review sessions.', type: ['student'], tags: ['student'], icon: '🎓' },
    { id: 15, name: 'Electrical wiring design (building)', category: 'eng', catLabel: 'Engineering design', priceStr: 'Quote/Building', priceVal: 0, desc: 'Full electrical layout design for residential or commercial building. Load schedule and single-line diagram included.', type: ['org', 'individual'], tags: [], icon: '⚡' },
    { id: 16, name: 'MEP design package', category: 'eng', catLabel: 'Engineering design', priceStr: 'Quote/Project', priceVal: 0, desc: 'Mechanical, Electrical & Plumbing design for commercial buildings. Coordinated drawing set.', type: ['org'], tags: ['popular'], icon: '⚙️' }
  ];

  let cart = [];
  let currentCategory = 'all';
  let currentCustomer = 'all';

  // Elements
  const grid = document.getElementById('product-grid');
  const countEl = document.getElementById('product-count');
  const cartBtn = document.getElementById('cart-toggle');
  const cartBadge = document.getElementById('cart-badge');
  const cartPanel = document.getElementById('cart-panel');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total-amt');
  
  // Render Products
  function renderProducts() {
    grid.innerHTML = '';
    let filtered = products.filter(p => {
      let matchCat = currentCategory === 'all' || p.category === currentCategory;
      let matchCust = currentCustomer === 'all' || p.type.includes(currentCustomer);
      return matchCat && matchCust;
    });

    countEl.textContent = `Showing ${filtered.length} product${filtered.length !== 1 ? 's' : ''}`;

    filtered.forEach(p => {
      let tagsHTML = '';
      if(p.tags.includes('popular')) tagsHTML += `<span class="badge-pill popular">Popular</span>`;
      if(p.tags.includes('student')) tagsHTML += `<span class="badge-pill student">Student</span>`;
      
      let inCart = cart.find(i => i.id === p.id);
      let btnClass = inCart ? 'btn-success' : 'btn-primary';
      let btnText = inCart ? 'Added ✓' : 'Add to cart';

      let card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="product-img img-${p.category}">${p.icon}</div>
        <div class="product-content">
          <div class="product-tags">
            <span class="product-cat cat-${p.category}">${p.catLabel}</span>
            ${tagsHTML}
          </div>
          <h3 class="product-title">${p.name}</h3>
          <p class="product-desc">${p.desc}</p>
          <div class="product-footer">
            <div>
              <div class="product-price">${p.priceStr}</div>
              <span class="price-note">per unit · quote may vary</span>
            </div>
            <button class="btn ${btnClass} add-cart-btn" data-id="${p.id}">${btnText}</button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    document.querySelectorAll('.add-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        let id = parseInt(e.target.dataset.id);
        toggleCart(id, e.target);
      });
    });
  }

  // Cart Logic
  function toggleCart(id, btn) {
    let index = cart.findIndex(i => i.id === id);
    if(index > -1) {
      cart.splice(index, 1);
      btn.textContent = 'Add to cart';
      btn.className = 'btn btn-primary add-cart-btn';
    } else {
      let prod = products.find(p => p.id === id);
      cart.push(prod);
      btn.textContent = 'Added ✓';
      btn.className = 'btn btn-success add-cart-btn';
    }
    updateCartUI();
  }

  function removeFromCart(id) {
    let index = cart.findIndex(i => i.id === id);
    if(index > -1) {
      cart.splice(index, 1);
      updateCartUI();
      renderProducts(); // Re-render to update buttons
    }
  }

  function updateCartUI() {
    cartBadge.textContent = cart.length;
    cartItems.innerHTML = '';
    let total = 0;
    let hasVariable = false;
    
    if(cart.length === 0) {
      cartItems.innerHTML = '<p style="color: var(--text-secondary); font-style: italic;">Your cart is empty.</p>';
    } else {
      cart.forEach(item => {
        if(item.priceVal === 0) hasVariable = true;
        total += item.priceVal;
        let div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <div class="cart-item-price">${item.priceStr} ${item.priceVal > 0 ? '(est)' : ''}</div>
          </div>
          <button class="cart-remove" data-id="${item.id}">Remove</button>
        `;
        cartItems.appendChild(div);
      });
      
      document.querySelectorAll('.cart-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
          removeFromCart(parseInt(e.target.dataset.id));
        });
      });
    }
    
    if(total > 0) {
      cartTotal.textContent = '₦' + total.toLocaleString() + (hasVariable ? ' + custom quote' : ' (est)');
    } else if (hasVariable) {
      cartTotal.textContent = 'Custom Quote';
    } else {
      cartTotal.textContent = '₦0';
    }
  }

  // Filter Listeners
  document.querySelectorAll('.filter-item').forEach(item => {
    item.addEventListener('click', (e) => {
      let filterType = e.currentTarget.dataset.filterType;
      let val = e.currentTarget.dataset.val;
      
      if(filterType === 'cat') currentCategory = val;
      if(filterType === 'cust') currentCustomer = val;
      
      // Update active classes
      document.querySelectorAll(`.filter-item[data-filter-type="${filterType}"]`).forEach(el => el.classList.remove('active'));
      e.currentTarget.classList.add('active');
      
      renderProducts();
    });
  });

  // UI Toggles
  cartBtn.addEventListener('click', () => {
    cartPanel.classList.toggle('open');
  });

  // Modals
  const customModal = document.getElementById('custom-modal');
  const checkoutModal = document.getElementById('checkout-modal');
  
  document.getElementById('open-custom').addEventListener('click', () => customModal.classList.add('open'));
  document.getElementById('checkout-btn').addEventListener('click', () => {
    if(cart.length === 0) {
      alert("Please add items to your quote request first.");
      return;
    }
    checkoutModal.classList.add('open');
    cartPanel.classList.remove('open');
  });

  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      customModal.classList.remove('open');
      checkoutModal.classList.remove('open');
    });
  });

  // Forms
  document.getElementById('custom-form').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('custom-success').style.display = 'block';
    
    // Gather form data and send to WhatsApp
    const inputs = e.target.querySelectorAll('input, select, textarea');
    let message = "New Custom Fabrication Order Request:\n\n";
    inputs.forEach(input => {
      const label = input.previousElementSibling ? input.previousElementSibling.textContent : input.name;
      if(input.value) {
        message += `${label}: ${input.value}\n`;
      }
    });

    const whatsappUrl = `https://wa.me/2348000000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Simulate sending email
    setTimeout(() => {
      customModal.classList.remove('open');
      document.getElementById('custom-success').style.display = 'none';
      e.target.reset();
    }, 4000);
  });

  document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('checkout-success').style.display = 'block';
    
    // Gather form data and send to WhatsApp
    const inputs = e.target.querySelectorAll('input');
    let message = "New Preset Fabrication Quote Request:\n\n";
    inputs.forEach(input => {
      const label = input.previousElementSibling ? input.previousElementSibling.textContent : input.name;
      if(input.value) {
        message += `${label}: ${input.value}\n`;
      }
    });

    message += "\nCart Items:\n";
    cart.forEach(item => {
      message += `- ${item.name} (${item.priceStr})\n`;
    });

    const whatsappUrl = `https://wa.me/2348000000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Reset cart logic after checkout
    setTimeout(() => {
      checkoutModal.classList.remove('open');
      document.getElementById('checkout-success').style.display = 'none';
      cart = [];
      updateCartUI();
      renderProducts();
      e.target.reset();
    }, 4000);
  });

  // Theme Toggle Logic
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('orie-shop-theme') || 'dark';
  
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggleBtn.textContent = '🌙';
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('orie-shop-theme', 'dark');
      themeToggleBtn.textContent = '☀️';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('orie-shop-theme', 'light');
      themeToggleBtn.textContent = '🌙';
    }
  });

  // Init
  renderProducts();
  updateCartUI();
});
