document.addEventListener('DOMContentLoaded', function () {

  // Слайдер популярных
  let swiperPopular = new Swiper(".popular-list", {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 40,
    loop: true,
    centeredSlidesBounds: true,
    grabCursor: 'true',
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-right-btn",
      prevEl: ".swiper-left-btn",
    },
    breakpoints: {
      1100: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },

      830: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      
      560: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      }
    },
  });

  // Тултип
  const tooltipIcon = document.getElementById('tooltipIcon');
  const tooltip = document.getElementById('tooltip');

  // Показать тултип при наведении на иконку
  tooltipIcon.addEventListener('mouseenter', function () {
    tooltip.style.display = 'block';
    positionTooltip();
  });

  // Скрыть тултип при уходе курсора с иконки
  tooltipIcon.addEventListener('mouseleave', function () {
    tooltip.style.display = 'none';
  });

  // Показать/скрыть тултип при клике на иконку
  tooltipIcon.addEventListener('click', function (event) {
    event.stopPropagation(); // Предотвращаем всплытие события

    if (tooltip.style.display === 'block') {
      // Если тултип уже отображается, скрываем его
      tooltip.style.display = 'none';
    } else {
      // Если тултип скрыт, показываем его и позиционируем
      tooltip.style.display = 'block';
      positionTooltip();
    }
  });

  // Закрыть тултип при клике вне его области
  document.addEventListener('click', function () {
    tooltip.style.display = 'none';
  });

  // Закрыть тултип при прокрутке страницы
  window.addEventListener('scroll', function () {
    tooltip.style.display = 'none';
  });

  // Функция для позиционирования тултипа и стрелочки
  function positionTooltip() {
    const iconRect = tooltipIcon.getBoundingClientRect();
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;
    const iconImgRect = document.querySelector('.tooltip-icon img');

    // Позиция тултипа
    let top = iconRect.bottom + window.scrollY;
    let left = iconRect.left + window.scrollX + (iconImgRect.offsetWidth / 2) - (tooltipWidth / 2);

    // Проверка, чтобы тултип не выходил за границы экрана
    if (left < 0) left = 10; // Отступ от левого края
    if (left + tooltipWidth > window.innerWidth) left = window.innerWidth - tooltipWidth - 10; // Отступ от правого края

    // Позиция стрелочки
    const iconCenterX = iconRect.left + window.scrollX + (iconImgRect.offsetWidth / 2); // Центр иконки
    const tooltipLeft = left; // Левый край тултипа
    const arrowOffset = iconCenterX - tooltipLeft; // Смещение стрелочки относительно центра иконки

    tooltip.style.setProperty('--arrow-offset', `${arrowOffset}px`); // Передаем смещение в CSS
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
  }

  // Слайдер партнёров
  //     let swiperPartner = new Swiper('.partner', {
  //         slidesPerView: 2,
  //         spaceBetween: 40,
  //         slidesPerGroup: 2,
  //         loop: true,
  //         centeredSlidesBounds: true,
  //         grabCursor: 'true',
  //         navigation: {
  //             nextEl: ".swiper-right-part",
  //             prevEl: ".swiper-left-part",
  //         },
  //         pagination: {
  //             el: ".swiper-pagination-part",
  //             clickable: true,
  //         },
  //         breakpoints: {
  //             360: {

  //                 slidesPerView: 3,
  //                 slidesPerGroup: 3,

  //             },
  //             1024: {
  //                 slidesPerView: 4,
  //                 slidesPerGroup: 4,
  //             },
  //         },
  //     })
});



// Анимация карточек
const catalogCard = document.querySelectorAll(".popular-item");
for (let j = 0; j < catalogCard.length; j++) {
  let cardColor = catalogCard[j].querySelectorAll("#color-letters");
  let cardImgColor = catalogCard[j].querySelectorAll(".img-card-color");
  let difficulty_easy = catalogCard[j].querySelector("#easy");
  let difficulty_medium = catalogCard[j].querySelector("#medium");
  let difficulty_hard = catalogCard[j].querySelector("#hard");
  let cardImgLocation = catalogCard[j].querySelector("#trail-location");
  catalogCard[j].onmouseenter = function () {
    catalogCard[j].classList.add("popular-item-orange");
    catalogCard[j].classList.remove("popular-item-white");
    for (let i = 0; i < cardColor.length; i++) {
      cardColor[i].classList.remove("black-color");
      cardColor[i].classList.add("white-color");
    }
    cardImgLocation.classList.remove("trail-location-black");
    cardImgLocation.classList.add("trail-location-white");
    cardImgColor[0].innerHTML =
      '<img src="img/dist-white.svg" alt="Длина тропы">';
    cardImgColor[2].innerHTML =
      '<img src="img/duration-white.svg" alt="Длительность тропы">';
    if (difficulty_easy !== null)
      difficulty_easy.innerHTML =
        '<img src="img/difficulty-easy-white.svg" alt="Сложность тропы">';
    if (difficulty_medium !== null)
      difficulty_medium.innerHTML =
        '<img src="img/difficulty-medium-white.svg" alt="Сложность тропы">';
    if (difficulty_hard !== null)
      difficulty_hard.innerHTML =
        '<img src="img/difficulty-hard-white.svg" alt="Сложность тропы">';
  };
}

for (let j = 0; j < catalogCard.length; j++) {
  let cardColor = catalogCard[j].querySelectorAll("#color-letters");
  let cardImgColor = catalogCard[j].querySelectorAll(".img-card-color");
  let difficulty_easy = catalogCard[j].querySelector("#easy");
  let difficulty_medium = catalogCard[j].querySelector("#medium");
  let difficulty_hard = catalogCard[j].querySelector("#hard");
  let cardImgLocation = catalogCard[j].querySelector("#trail-location");
  catalogCard[j].onmouseleave = function () {
    catalogCard[j].classList.remove("popular-item-orange");
    catalogCard[j].classList.add("popular-item-white");
    for (let i = 0; i < cardColor.length; i++) {
      cardColor[i].classList.add("black-color");
      cardColor[i].classList.remove("white-color");
    }
    cardImgLocation.classList.add("trail-location-black");
    cardImgLocation.classList.remove("trail-location-white");
    cardImgColor[0].innerHTML =
      '<img src="img/dist-orange.svg" alt="Длина тропы">';
    cardImgColor[2].innerHTML =
      '<img src="img/duration-orange.svg" alt="Длительность тропы">';
    if (difficulty_easy !== null)
      difficulty_easy.innerHTML =
        '<img src="img/difficulty-easy.svg" alt="Сложность тропы">';
    if (difficulty_medium !== null)
      difficulty_medium.innerHTML =
        '<img src="img/difficulty-medium.svg" alt="Сложность тропы">';
    if (difficulty_hard !== null)
      difficulty_hard.innerHTML =
        '<img src="img/difficulty-hard.svg" alt="Сложность тропы">';
  };
}


