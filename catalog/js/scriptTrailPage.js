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

// Автоматические хлебные крошки
window.addEventListener('DOMContentLoaded', function () {
  // Получаем текущий URL страницы
  const currentURL = window.location.pathname;

  // Ищем регион в URL
  const regionMatch = currentURL.match(/\/catalog\/([^\/]+)/); // Ищет /catalog/регион
  if (regionMatch) {
    const region = regionMatch[1]; // Извлекаем название региона из URL

    // Ищем данные региона в массиве regionsData
    const regionData = regionsData.find(r => r.value === region);
    if (regionData) {
      // Находим элемент <a> с классом breadcrumb-region
      const breadcrumbLink = document.querySelector('.breadcrumb-region');
      if (breadcrumbLink) {
        // Подставляем полное название региона и ссылку для ПК
        breadcrumbLink.textContent = regionData.name;
        breadcrumbLink.href = `/catalog/?region=${region}`;

        // Проверяем ширину экрана для мобильных устройств
        if (window.innerWidth <= 480 && region === 'lenoblast') {
          breadcrumbLink.textContent = regionData.shortName; // Подставляем короткое название ТОЛЬКО для "lenoblast"
        }

        if (window.innerWidth <= 480 && region === 'moskva') {
          breadcrumbLink.textContent = regionData.shortName; // Подставляем короткое название ТОЛЬКО для "moskva"
        }
      }

    } else {
      console.error('Регион не найден в данных regionsData.');
    }
  } else {
    console.error('Регион не найден в URL.');
  }
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