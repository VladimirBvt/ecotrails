document.addEventListener('DOMContentLoaded', function() {
// Главная (некликабельность лого)
  function initFooterStyles() {
    const path = window.location.pathname;
    const isHomePage = path === '/' || path.endsWith('index.html') || path === '/index';
    
    if (!isHomePage) return;
    
    const logoFooter = document.querySelector('.container-logo-footer');
    if (logoFooter) {
      logoFooter.style.pointerEvents = 'none';
      logoFooter.style.cursor = 'default';
    }
  }

  initFooterStyles();
});