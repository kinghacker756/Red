// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
  // Create mobile menu toggle button
  const navbar = document.querySelector('.navbar');
  const navMenu = document.querySelector('.navbar nav');
  
  if (navbar && navMenu) {
    const toggleButton = document.createElement('button');
    toggleButton.classList.add('mobile-menu-toggle');
    toggleButton.innerHTML = '<span></span><span></span><span></span>';
    toggleButton.setAttribute('aria-label', 'Toggle navigation menu');
    
    // Insert toggle button after logo
    const logo = navbar.querySelector('.logo');
    if (logo) {
      logo.parentNode.insertBefore(toggleButton, logo.nextSibling);
    } else {
      navbar.insertBefore(toggleButton, navbar.firstChild);
    }
    
    // Add toggle functionality
    toggleButton.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      toggleButton.classList.toggle('active');
    });
    
    // Hide menu initially on mobile
    if (window.innerWidth <= 768) {
      navMenu.classList.add('mobile-hidden');
    }
    
    // Update on resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        navMenu.classList.remove('mobile-hidden');
      } else if (!toggleButton.classList.contains('active')) {
        navMenu.classList.add('mobile-hidden');
      }
    });
  }
});