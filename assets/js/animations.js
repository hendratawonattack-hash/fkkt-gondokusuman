/**
 * ANIMATIONS.JS
 * Scroll-triggered animations using IntersectionObserver
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    return; // Skip animations
  }

  // Animation CSS classes injected dynamically
  const style = document.createElement('style');
  style.innerHTML = `
    .fade-up { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
    .fade-left { opacity: 0; transform: translateX(-30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
    .fade-right { opacity: 0; transform: translateX(30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
    .scale-in { opacity: 0; transform: scale(0.9); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
    
    .is-visible { opacity: 1; transform: translateY(0) translateX(0) scale(1); }
    
    /* Stagger children delays */
    .stagger-1 { transition-delay: 0.1s; }
    .stagger-2 { transition-delay: 0.2s; }
    .stagger-3 { transition-delay: 0.3s; }
    .stagger-4 { transition-delay: 0.4s; }
    .stagger-5 { transition-delay: 0.5s; }
  `;
  document.head.appendChild(style);

  // Setup Observer
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Helper to add classes and observe
  const animateElements = (selector, animationClass) => {
    document.querySelectorAll(selector).forEach((el, index) => {
      el.classList.add(animationClass);
      
      // Add stagger class to grid items or lists
      if (el.closest('.grid') || el.closest('.row')) {
        const staggerIndex = (index % 4) + 1;
        el.classList.add(`stagger-${staggerIndex}`);
      }
      
      observer.observe(el);
    });
  };

  // Add animations to typical components
  // Only applying to elements if they exist, otherwise skipping safely
  animateElements('.section-header', 'fade-up');
  animateElements('.card', 'fade-up');
  animateElements('.stats .stat-item', 'scale-in');
  animateElements('.gallery-item', 'fade-up');
});
