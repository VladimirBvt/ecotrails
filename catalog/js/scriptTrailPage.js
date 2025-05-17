// Автоматические хлебные крошки
function updateBreadcrumb() {
  const regionMatch = window.location.pathname.match(/\/catalog\/([^\/]+)/);
  if (!regionMatch) return;

  const regionData = regionsData.find(r => r.value === regionMatch[1]);
  if (!regionData) return;

  const breadcrumbLink = document.querySelector('.breadcrumb-region');
  if (!breadcrumbLink) return;

  breadcrumbLink.textContent = window.innerWidth <= 500 ? regionData.shortName : regionData.name;
  breadcrumbLink.href = `/catalog/?region=${regionMatch[1]}`;
}

// Инициализация при загрузке и ресайзе
window.addEventListener('DOMContentLoaded', updateBreadcrumb);
window.addEventListener('resize', () => {
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(updateBreadcrumb, 100);
});


const swiper = new Swiper(".image-slider", {
  // Optional parameters
  slidesPerView: 1,
  spaceBetween: 40,
  slidesPerGroup: 1,
  loop: true,
  centeredSlidesBounds: true,
  grabCursor: "true",

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-right-btn",
    prevEl: ".swiper-left-btn",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

document.querySelector(".container-location").addEventListener("click", () => {
  location.pathname = "/catalog/mappage.html";
});