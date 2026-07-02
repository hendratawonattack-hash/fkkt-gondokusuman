/**
 * ADMIN.JS
 * Basic JS functionality for Admin Panel (v1.0 Mock Auth)
 */

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const logoutBtn = document.getElementById('logoutBtn');
  
  // Check auth state
  const isAuth = localStorage.getItem('fkkt_admin_auth') === 'true';
  const isLoginPage = window.location.pathname.endsWith('login.html');
  
  // Redirect logic
  if (!isAuth && !isLoginPage) {
    window.location.href = 'login.html';
  } else if (isAuth && isLoginPage) {
    window.location.href = 'index.html';
  }

  // Handle Login
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.getElementById('username').value;
      const pass = document.getElementById('password').value;
      const errorMsg = document.getElementById('loginError');
      
      // MOCK AUTH for v1.0
      if (user === 'admin' && pass === 'admin123') {
        localStorage.setItem('fkkt_admin_auth', 'true');
        window.location.href = 'index.html';
      } else {
        errorMsg.style.display = 'block';
      }
    });
  }

  // Handle Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('fkkt_admin_auth');
      window.location.href = 'login.html';
    });
  }
});
