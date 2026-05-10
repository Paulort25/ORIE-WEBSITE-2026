document.addEventListener('DOMContentLoaded', () => {
  // Update year
  document.getElementById('year').textContent = new Date().getFullYear();

  const navBtns = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.page-section');
  const navbar = document.querySelector('.navbar');

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Navigation logic
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all btns and sections
      navBtns.forEach(b => b.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));

      // Add active to clicked btn
      btn.classList.add('active');

      // Show corresponding section
      const targetId = btn.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Re-trigger animations
        const animatedElements = targetSection.querySelectorAll('.fade-in-up');
        animatedElements.forEach(el => {
          el.style.animation = 'none';
          el.offsetHeight; /* trigger reflow */
          el.style.animation = null; 
        });
      }
    });
  });

  // Simple mobile menu toggle (alert for now, could expand to full menu)
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  mobileMenuBtn.addEventListener('click', () => {
    // Basic fallback for mobile viewing
    const links = document.querySelector('.nav-links');
    if (links.style.display === 'flex') {
      links.style.display = 'none';
    } else {
      links.style.display = 'flex';
      links.style.flexDirection = 'column';
      links.style.position = 'absolute';
      links.style.top = '100%';
      links.style.left = '0';
      links.style.width = '100%';
      links.style.background = 'rgba(11, 15, 25, 0.95)';
      links.style.padding = '1rem';
      links.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
    }
  });
});
