// Скрипты хедера и поиска (тропы в поиске тоже тут)

// Константы для DOM-элементов
const popular = document.querySelector("#popular-cont");
const cotalog = document.querySelector("#cotalog-cont");
const faq = document.querySelector("#FAQ-cont");
const header = document.querySelector("header");
const animation1 = document.querySelector("#animation1");
const animation2 = document.querySelector("#animation2");
const animation3 = document.querySelector("#animation3");
const CotColor = document.querySelectorAll(".cotalog-color");
const search = document.querySelector("#search");
const contSearchElement = document.querySelector('#cont-search');
const voidSearch = document.querySelector("#VoidSearch");
const elasticBox = document.querySelector("#elasticId");
const introBlock = document.querySelector('.intro');
let lastScrollPosition = 0;
const SCROLL_THRESHOLD = 50; // Порог в пикселях для срабатывания

// Данные маршрутов
const trailsData = [
  { name: "Высота Мюллера", url: "/catalog/kaliningradskaya-oblast/vysota-myullera/" },
  { name: "Черепахинская экотропа", url: "/catalog/voronezhskaya-oblast/cherepahinskaya/" },
  { name: "Королевский бор", url: "/catalog/kaliningradskaya-oblast/korolevsky-bor/" },
  { name: "Книга Природы (Красноярские Столбы)", url: "/catalog/krasnoyarsky-krai/kniga-prirody/" },
  { name: "Экотропа Петяярви", url: "/catalog/lenoblast/petyayarvi/" },
  { name: "Танцующий лес", url: "/catalog/kaliningradskaya-oblast/tancuyushchij-les/" },
  { name: "Высота Эфа", url: "/catalog/kaliningradskaya-oblast/vysota-efa/" },
  { name: "Долина Нарзанов", url: "/catalog/kabardino-balkariya/dolina-narzanov/" },
  { name: "Экотропа PlesActive", url: "/catalog/tambovskaya-oblast/ples-active/" },
  { name: "В гостях у серой цапли", url: "/catalog/yaroslavskaya-oblast/v-gostyah-u-seroy-tsapli/" },
  { name: "Лиственничная роща", url: "/catalog/lenoblast/listvennichnaya-roscha/" },
  { name: "В гармонии с природой", url: "/catalog/moskva/v-garmonii-s-prirodoy/" },
  { name: "Вдоль реки Чермянки", url: "/catalog/moskva/chermyanka/" },
  { name: "Экотропа Абрау-Дюрсо", url: "/catalog/krasnodarsky-krai/abrau-durso/" },
  { name: "Терренкур Маркотх", url: "/catalog/krasnodarsky-krai/terrenkur-markoth/" },
  { name: "В парке Швейцария", url: "/catalog/nizhegorodskaya-oblast/v-parke-shveitsaria/" },
  { name: "Природа Чувств", url: "/catalog/yaroslavskaya-oblast/priroda-chuvstv/" },
  { name: "Тропа Сказок", url: "/catalog/yaroslavskaya-oblast/tropa-skazok/" },
  { name: "На террасах Воробьёвых гор", url: "/catalog/moskva/na-terrasah-vorobiovyh-gor/" },
  { name: "К Андреевским прудам", url: "/catalog/moskva/k-andreevskim-prudam/" },
  { name: "В пойме реки Шмелёвки", url: "/catalog/moskva/shmelevka/" },
  { name: "Бурнаковская экотропа", url: "/catalog/nizhegorodskaya-oblast/burnakovskaya/" },
  { name: "Тропа здоровья Роза Хутор", url: "/catalog/krasnodarsky-krai/tropa-zdoroviya-rh/" },
  { name: "Солнечная тропа", url: "/catalog/krym/solnechnaya-tropa/" },
  { name: "Трын-тропа", url: "/catalog/lenoblast/tryn-tropa/" },
  { name: "Бугаиная тропа", url: "/catalog/lenoblast/bugainaya-tropa/" },
  { name: "У Лукоморья", url: "/catalog/lenoblast/u-lukomoriya/" },
  { name: "В парке Монрепо", url: "/catalog/lenoblast/monrepo/" },
  { name: "На гору Железная", url: "/catalog/stavropolsky-krai/na-goru-zheleznaya/" },
  { name: "Комаровский Берег", url: "/catalog/lenoblast/komarovsky-bereg/" },
  { name: "Лесная Тропа", url: "/catalog/lenoblast/lesnaya-tropa/" },
  { name: "Юкковские камы", url: "/catalog/lenoblast/yukkovskie-kamy/" },
  { name: "Тропа здоровья Сокольники", url: "/catalog/moskva/tropa-zdorovia-sokolniki/" },
  { name: "Еловые холмы", url: "/catalog/lenoblast/elovye-holmy/" },
  { name: "Тропа Голицына", url: "/catalog/krym/tropa-golicyna/" },
  { name: "К леднику Безенги", url: "/catalog/kabardino-balkariya/k-ledniku-bezengi/" },
  { name: "Экотропа Фиалка", url: "/catalog/krasnodarsky-krai/ecotropa-fialka/" },
  { name: "Экотропа Горизонт", url: "/catalog/krasnodarsky-krai/ecotropa-gorizont/" },
  { name: "Экотропа Крокус", url: "/catalog/krasnodarsky-krai/ecotropa-krokus/" },
  { name: "Дудергофские Высоты", url: "/catalog/lenoblast/dudergofskie-vysoty/" },
  { name: "Сестрорецкое болото", url: "/catalog/lenoblast/sestroreckoe-boloto/" },
  { name: "Раковые озёра", url: "/catalog/lenoblast/rakovye-ozyora/" },
  { name: "Западный Котлин", url: "/catalog/lenoblast/zapadniy-kotlin/" },
  { name: "Воздушная экотропа", url: "/catalog/moskva/vozdushnaya-ecotropa/" },
  { name: "Тропарёвская экотропа", url: "/catalog/moskva/troparevskaya-ecotropa/" },
  { name: "У озера Бездонное", url: "/catalog/moskva/ecotropa-u-ozera-bezdonnoe/" },
];

// Инициализация стилей и анимаций
function initializeStyles() {

  // Изменения хедера в зависимости от страниц  
  // 1. Страница карты
  if (document.body.classList.contains('map-page')) {
    // 1.1. Полупрозрачный фон
    header?.classList.add('transparent-bg');

    // 1.2. Активная иконка карты
    const mapIcon = document.querySelector('.icon-header[src="/img/map-black.svg"]');
    if (mapIcon) {
      mapIcon.src = "/img/map-orange.svg"; // Меняем путь к изображению
      document.querySelector('.header-icon').style.pointerEvents = "none"; // Отключаем клики
      document.querySelector('.container-location').style.cursor = "default"; // Убираем курсор-лапку
    }
  }

  // 2. Страница каталога
  if (document.body.classList.contains('catalog-page')) {
    // 2.1. Выделение пункта меню    
    cotalog.style.color = "#F28123";
    cotalog.style.pointerEvents = "none";
    cotalog.style.cursor = "default";
    animation1.hidden = false; // Подчёркивание
    // Иконка на мобиле (цвет и некликабельность)
    CotColor.forEach(el => el.style.fill = "#F28123");
    const catalogIcon = document.querySelector('.container-navigation-icon:last-child');
    if (catalogIcon) {
      catalogIcon.style.pointerEvents = "none";
      catalogIcon.style.cursor = "default";
    }
  }

  // 3. Главная
  if (document.body.classList.contains('main-page')) {

    // Проверяем позицию при загрузке
    const initialScroll = window.scrollY;
    const introBottom = introBlock?.offsetHeight || 0;

    // Определяем состояние хедера
    const isBelowHero = initialScroll > introBottom;
    const isAboveThreshold = initialScroll <= SCROLL_THRESHOLD;

    // Устанавливаем начальные классы (тёмный, тёмный прозрачный или светлый)
    if (!isBelowHero) {
      header?.classList.add('black');
      if (isAboveThreshold) {
        header?.classList.add('transparent-bg');
      }
    }

    // Настройка лого
    const logoHeader = document.querySelector('.logo-header');
    if (logoHeader) {
      logoHeader.style.pointerEvents = "none";
      logoHeader.style.cursor = "default";
    }

    // Подсветка меню при скролле блока popular
    const popularBlock = document.querySelector('.popular');
    const menuPopular = document.querySelector('#popular-cont');
    function checkAnchorAtTop() {
      if (!popularBlock || !menuPopular || !animation2 || !header) return;
      const rect = popularBlock.getBoundingClientRect();
      const headerRect = header.getBoundingClientRect();
      const offset =115; // px
      // Анимация появляется, когда верх блока <= 100px от верха окна и нижняя граница блока ниже нижней границы хедера
      if (rect.top <= offset && rect.bottom > headerRect.bottom) {
        menuPopular.style.color = '#F28123';
        animation2.hidden = false;
      } else {
        menuPopular.style.color = '';
        animation2.hidden = true;
      }
    }
    window.addEventListener('scroll', checkAnchorAtTop);
    // Проверяем при загрузке
    checkAnchorAtTop();

    // Настройка цвета хедера при скролле
    window.addEventListener('scroll', function () {
      const headerRect = header.getBoundingClientRect();
      const introRect = introBlock.getBoundingClientRect();
      // Хедер светлый, когда нижняя граница хедера ниже нижней границы hero-блока
      const isHeaderBelowHero = headerRect.bottom >= introRect.bottom;
      header?.classList.toggle('black', !isHeaderBelowHero);
      // Управление прозрачностью (оставляю как было)
      if (!isHeaderBelowHero) {
        header?.classList.toggle('transparent-bg', window.scrollY <= SCROLL_THRESHOLD);
      } else {
        header?.classList.remove('transparent-bg');
      }
    });

    // --- Анимация для блока FAQ ---
    const faqBlock = document.querySelector('.faq');
    const menuFaq = document.querySelector('#FAQ-cont');
    function checkFaqAtTop() {
      if (!faqBlock || !menuFaq || !animation3 || !header) return;
      const rect = faqBlock.getBoundingClientRect();
      const headerRect = header.getBoundingClientRect();
      const offset = 115; // px, аналогично popular
      if (rect.top <= offset && rect.bottom > headerRect.bottom) {
        menuFaq.style.color = '#F28123';
        animation3.hidden = false;
      } else {
        menuFaq.style.color = '';
        animation3.hidden = true;
      }
    }
    window.addEventListener('scroll', checkFaqAtTop);
    checkFaqAtTop();

  }

  // Инициализация поиска
  if (elasticBox) {
    trailsData.forEach(trail => {
      const searchItem = document.createElement("a");
      searchItem.classList.add("Searchlist");
      searchItem.setAttribute("href", trail.url);
      searchItem.setAttribute("hidden", true);
      searchItem.textContent = trail.name;
      elasticBox.appendChild(searchItem);

    });
  }
}

// Функции для управления анимациями
function showAnimation(animation) {
  animation.hidden = false;
}

function hideAnimation(animation) {
  animation.hidden = true;
}

// Функции для поиска
function positionElasticBox() {
  const contSearchElementRect = contSearchElement.getBoundingClientRect();
  elasticBox.style.width = `${contSearchElementRect.width}px`;
  elasticBox.style.top = `${contSearchElementRect.bottom}px`;
  elasticBox.style.left = `${contSearchElementRect.left}px`;
}

function insertMark(stringmark, pos, len) {
  return (
    stringmark.slice(0, pos) +
    "<span class ='searchmark'>" +
    stringmark.slice(pos, pos + len) +
    "</span>" +
    stringmark.slice(pos + len)
  );
}

function handleSearchInput() {
  let k = 0;
  const searchInput = document.querySelector(".searcharea");

  // Убирание прозрачности хедера при поиске
  if (searchInput) {
    searchInput.addEventListener("click", () => {
      header?.classList.remove('transparent-bg');
    });

    // На случай, если фокус попадет в поле через Tab
    searchInput.addEventListener("focus", () => {
      header?.classList.remove('transparent-bg');
    });
  }

  searchInput.oninput = function () {
    let val = this.value.trim().toLowerCase();
    let elasticItems = document.querySelectorAll(".elastic a");

    if (val != "") {
      elasticItems.forEach(function (elem) {
        if (elem.innerText.toLowerCase().search(val) == -1) {
          elem.classList.add("hide");
          elem.removeAttribute("hidden");
          elem.innerHTML = elem.innerText;
        } else {
          k++;
          elem.classList.remove("hide");
          elem.removeAttribute("hidden");
          let str = elem.innerText;
          elem.innerHTML = insertMark(
            str,
            elem.innerText.toLowerCase().search(val),
            val.length
          );
        }
      });

      if (k === 0) {
        voidSearch.hidden = false;
        elasticBox.classList.add("elasticBig");
      } else if (k > 0) {
        voidSearch.hidden = true;
        elasticBox.classList.remove("elasticBig");
        elasticBox.style.background = "";
        elasticItems.forEach(function (elem) {
          elasticBox.classList.add("elasticBig");
          elem.classList.add("elemsearch");
          elem.style.background = "transparent";
        });
      }

      k = 0;
    } else {
      voidSearch.hidden = true;
      elasticBox.style.background = "";
      elasticItems.forEach(function (elem) {
        elem.classList.add("hide");
        elasticBox.classList.remove("elasticBig");
        elem.innerHTML = elem.innerText;
      });
    }
    positionElasticBox();
  };
}

function isPopularActiveByScroll() {
  const popularBlock = document.querySelector('.popular');
  if (!popularBlock) return false;
  const rect = popularBlock.getBoundingClientRect();
  const offset = 115; // px
  return rect.top <= offset && rect.bottom > offset;
}

function isFaqActiveByScroll() {
  const faqBlock = document.querySelector('.faq');
  if (!faqBlock) return false;
  const rect = faqBlock.getBoundingClientRect();
  const offset = 115; // px
  return rect.top <= offset && rect.bottom > offset;
}

// Обработчики событий для популярного раздела и FAQ
cotalog.addEventListener("mouseover", () => showAnimation(animation1));
cotalog.addEventListener("mouseout", () => hideAnimation(animation1));

popular.addEventListener("mouseover", () => {
  if (!popular.classList.contains('active')) {
    showAnimation(animation2);
  }
});

popular.addEventListener("mouseout", () => {
  if (!popular.classList.contains('active')) {
    hideAnimation(animation2);
    popular.style.color = '';
  }
});

faq.addEventListener("mouseover", () => {
  if (!faq.classList.contains('active')) {
    showAnimation(animation3);
  }
});

faq.addEventListener("mouseout", () => {
  if (!faq.classList.contains('active')) {
    hideAnimation(animation3);
    faq.style.color = '';
  }
});

// Функция для обновления состояния анимаций при скролле
function updateAnimationsOnScroll() {
  const popularActive = isPopularActiveByScroll();
  const faqActive = isFaqActiveByScroll();

  // Обновляем состояние Popular
  if (popularActive) {
    showAnimation(animation2);
    popular.classList.add('active');
    popular.style.color = '#F28123';
  } else {
    hideAnimation(animation2);
    popular.classList.remove('active');
    popular.style.color = '';
  }

  // Обновляем состояние FAQ
  if (faqActive) {
    showAnimation(animation3);
    faq.classList.add('active');
    faq.style.color = '#F28123';
  } else {
    hideAnimation(animation3);
    faq.classList.remove('active');
    faq.style.color = '';
  }
}

// Добавляем обработчик скролла
window.addEventListener('scroll', updateAnimationsOnScroll);

// Проверяем начальное состояние при загрузке
document.addEventListener('DOMContentLoaded', () => {
  updateAnimationsOnScroll();
  handleAnchorLinks();
});

// Обработчик изменения хэша в URL
window.addEventListener('hashchange', () => {
  handleAnchorLinks();
});

// Обработчик поиска
search.addEventListener("click", function () {
  if ($(window).width() > 775) {
    $(".center-navigation").css("display", "none");
  }
  if ($(window).width() <= 775) {
    $(".logo-header").css("visibility", "hidden");
    $(".icon-navigation .container-navigation-icon:not(#search-cont)").css("display", "none");
  }

  search.hidden = true;
  contSearchElement.style.display = 'flex';
  document.querySelector(".otstup-icon-search").hidden = false;
  handleSearchInput();
});

// Закрытие поиска
document.querySelector("#search-close").addEventListener("click", function () {

  // Возвращение прозрачности хедеру на карте и на главной при закрытии поиска
  if (document.body.matches('.map-page, .main-page')) {
    if (window.scrollY === 0) {
      header?.classList.add('transparent-bg');
    }

  }

  if ($(window).width() > 775) {
    $(".center-navigation").css("display", "");
  }
  if ($(window).width() <= 775) {
    $(".logo-header").css("visibility", "");
    $(".icon-navigation .container-navigation-icon:not(#search-cont)").css("display", "");
  }

  contSearchElement.style.display = 'none';
  document.querySelector(".searcharea").value = '';
  search.hidden = false;
  document.querySelector(".otstup-icon-search").hidden = true;
  voidSearch.hidden = true;
  elasticBox.classList.remove("elasticBig");
  document.querySelectorAll(".elastic a").forEach(elem => elem.classList.add("hide"));
});


// Обработчик ресайза
window.addEventListener("resize", function () {
  const windowWidth = $(window).width();
  const searchArea = document.querySelector(".searcharea");
  const isSearchVisible = searchArea &&
    getComputedStyle(searchArea).display !== "none" &&
    searchArea.offsetParent !== null;

  if (windowWidth <= 480) {
    $(".center-navigation").hide();
    if (isSearchVisible) {
      $(".container-location").hide();
      $(".icon-navigation .container-navigation-icon:not(#search-cont)").hide();
      $(".logo-header").css("visibility", "hidden");
    } else {
      $(".container-location, .icon-href-cotalog").show();
      $(".icon-navigation .container-navigation-icon").show();
      $(".logo-header").css("visibility", "");
    }
  } else if (windowWidth <= 775) {
    if (isSearchVisible) {
      $(".icon-navigation .container-navigation-icon:not(#search-cont)").hide();
      $(".logo-header").css("visibility", "hidden");
    } else {
      $(".icon-navigation .container-navigation-icon").show();
      $(".logo-header").css("visibility", "");
    }
    $(".center-navigation").hide();
    $(".container-location, .icon-href-cotalog").show();
  } else if (windowWidth > 775) {
    $(".logo-header").css("visibility", "");
    $(".icon-navigation .container-navigation-icon:not(:last-child)").show();
    $(".container-navigation-icon:last-child").css("display", "none");
    $(".container-location").show();
    $(".center-navigation").toggle(!isSearchVisible);
  } else {
    $(".center-navigation").show();
    $(".container-navigation-icon:last-child").css("display", "none");
  }

  positionElasticBox();
});

// Инициализация
$(function () {
  initializeStyles();
  $(window).trigger("resize");
  // --- Активация анимации по якорю при загрузке главной ---
  setTimeout(function() {
    if (location.hash === '#popular-place') {
      if (typeof checkAnchorAtTop === 'function') checkAnchorAtTop();
      if (typeof checkPopularByPrevBlock === 'function') checkPopularByPrevBlock();
    }
    if (location.hash === '#faq') {
      if (typeof checkFaqAtTop === 'function') checkFaqAtTop();
      if (typeof checkFaqByPrevBlock === 'function') checkFaqByPrevBlock();
    }
  }, 100);
});

// Функция для обработки якорных ссылок
function handleAnchorLinks() {
  const hash = window.location.hash;
  if (hash === '#popular-place') {
    showAnimation(animation2);
    popular.classList.add('active');
    popular.style.color = '#F28123';
  } else {
    popular.classList.remove('active');
    hideAnimation(animation2);
    popular.style.color = '';
  }
  if (hash === '#faq') {
    showAnimation(animation3);
    faq.classList.add('active');
    faq.style.color = '#F28123';
  } else {
    faq.classList.remove('active');
    hideAnimation(animation3);
    faq.style.color = '';
  }
}

