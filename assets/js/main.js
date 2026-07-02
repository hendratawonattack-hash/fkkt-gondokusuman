/**
 * MAIN.JS
 * Core interactions and behaviors for the website
 */

document.addEventListener('DOMContentLoaded', () => {
  // Navbar Scroll Behavior
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navbarNav = document.querySelector('.navbar-nav');
  
  // Toggle scrolled class based on scroll position
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  // Initial check and scroll event listener
  handleScroll();
  window.addEventListener('scroll', handleScroll);

  // Mobile Menu Toggle
  if (menuToggle && navbarNav) {
    menuToggle.addEventListener('click', () => {
      navbarNav.classList.toggle('show');
    });
  }

  // Set Active Menu Item based on current URL
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentPath.endsWith(linkPath) || (currentPath === '/' && linkPath === 'index.html')) {
      link.classList.add('active');
    }
  });
});
