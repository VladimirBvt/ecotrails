// Динамисечкое изменение заголовка в Open Graph
// Ждем, пока DOM полностью загрузится
// window.addEventListener('DOMContentLoaded', (event) => {

//   // Получаем значение из <title>
//   const pageTitle = document.querySelector('title').textContent;

//   // Находим тег <meta property="og:title">
//   const metaOgTitle = document.querySelector('meta[property="og:title"]');

//   // Если такой тег найден, обновляем его атрибут content значением из <title>
//   if (metaOgTitle) {
//     metaOgTitle.setAttribute('content', pageTitle);
//   } else {
//     console.error('Тег <meta property="og:title"> не найден');
//   }
// });

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
