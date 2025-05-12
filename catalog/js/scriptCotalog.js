const upperCotalog = document.querySelector(".upper_cotalog");
const catalog = document.querySelector(".catalog");
const mainHeader = document.querySelector(".main-header");
const elementsToHide = [document.querySelector('.main-head'), document.querySelector('.title')];

let isCompact = false;
let isInitialState = true; // Флаг для начального состояния до скролла

function updateBreadcrumbsVisibility(hasRegion) {
  const breadcrumbs = document.querySelector('.breadcrumbs');
  const mainHeadRight = document.querySelector('.main-head-right');

  if (!breadcrumbs || !mainHeadRight) return;

  if (hasRegion) {
    breadcrumbs.style.display = '';
    mainHeadRight.style.marginLeft = '';
  } else {
    breadcrumbs.style.display = 'none';
    mainHeadRight.style.marginLeft = 'auto';
  }
}

// Функция для определения отступа в зависимости от ширины экрана
function getFixedOffset() {
  return window.innerWidth > 1250 ? 280 : 272; // Высота хедера + верхнего каталога (больше 1250 и меньше)
}


function updateLayout() {
  elementsToHide.forEach(el => {
    if (el) el.style.display = isCompact ? 'none' : '';
  });

  requestAnimationFrame(() => {
    if (isInitialState) {
      const headerHeight = mainHeader.offsetHeight;
      const upperCotalogHeight = upperCotalog.offsetHeight;
      catalog.style.marginTop = `${headerHeight + upperCotalogHeight}px`;
    } else {
      catalog.style.marginTop = `${getFixedOffset()}px`;
    }

    // Новая строка:
    if (upperCotalog) upperCotalog.style.top = `${mainHeader.offsetHeight}px`;
  });
}



function handleScroll() {
  const scrolled = window.scrollY > 10;

  // Первый скролл - переключаем в компактный режим
  if (isInitialState && scrolled) {
    isInitialState = false;
    isCompact = true;
    updateLayout();
  }

  // Скролл вверх - возвращаем исходное состояние (если нужно)
  else if (!isInitialState && !scrolled) {
    isInitialState = true;
    isCompact = false;
    updateLayout();
  }
}

// Объединённый обработчик загрузки страницы
window.addEventListener('load', function () {
  // 1. Настройка параметров региона из URL
  const urlParams = new URLSearchParams(window.location.search);
  const region = urlParams.get('region') || 'all';

  // Установка значений фильтра
  regionSelect.value = region;
  filtredRegion = region;

  // Применение фильтра
  filterCards(region);
  updateTitleH1Description(region);

  // 2. Инициализация UI-элементов
  const switchBtn = document.querySelector(".switch-btn");
  const switchElements = {
    list: document.querySelector(".switch-list-icon"),
    map: document.querySelector(".switch-map-icon"),
    mapPath: document.querySelector(".map-path"),
    listPath: document.querySelector(".list-path"),
    text1: document.querySelector(".switch-btn-text"),
    text2: document.querySelector(".switch-btn-text2"),
    breadcrumbs: document.querySelector('.breadcrumbs')
  };

  // 3. Настройка фиксированных элементов
  mainHeader.style.cssText = 'position: fixed; top: 0; width: 100%; z-index: 1000';
  upperCotalog.style.cssText = `
    position: fixed;
    top: ${mainHeader.offsetHeight}px;
    width: 100%;
    transition: all 0.3s ease;
    z-index: 999
  `;
  catalog.style.transition = 'margin-top 0.3s ease';

  // 4. Первоначальная настройка макета
  updateLayout();

  // 5. Управление хлебными крошками
  if (switchElements.breadcrumbs) {
    const shouldShowBreadcrumbs = urlParams.has('region');
    switchElements.breadcrumbs.style.display = shouldShowBreadcrumbs ? '' : 'none';
    document.querySelector('.main-head-right').style.marginLeft = shouldShowBreadcrumbs ? '' : 'auto';
  }

  // 6. Обработчики событий
  const setupEventListeners = () => {
    // Скролл страницы
    window.addEventListener('scroll', handleScroll);

    // Ресайз окна
    window.addEventListener('resize', () => {
      clearTimeout(window.resizeTimeout);
      window.resizeTimeout = setTimeout(() => {
        isInitialState ? updateLayout() : (catalog.style.marginTop = `${getFixedOffset()}px`);
      }, 100);
    });

    // Кнопки переключения
    switchElements.list?.addEventListener("click", switchToListView);
    switchElements.map?.addEventListener("click", switchToMapView);
  };

  // 7. Функции переключения видов
  const switchToListView = () => {
    switchBtn.classList.replace("switch-map", "switch-list");
    switchElements.mapPath.setAttribute("fill", "black");
    switchElements.listPath.setAttribute("stroke", "white");
    switchElements.text2.style.color = "black";
    switchElements.text1.style.color = "white";
  };

  const switchToMapView = () => {
    switchBtn.classList.replace("switch-list", "switch-map");
    switchElements.mapPath.setAttribute("fill", "white");
    switchElements.listPath.setAttribute("stroke", "black");
    switchElements.text1.style.color = "black";
    switchElements.text2.style.color = "white";

    const mapUrl = filtredRegion === 'all'
      ? '/catalog/mappage.html'
      : `/catalog/mappage.html?region=${encodeURIComponent(filtredRegion)}`;
    location.href = mapUrl;
  };

  // Запуск инициализации
  setupEventListeners();
});

// Стилизация карточек при наведении мыши
const catalogCard = document.querySelectorAll(".catalog-item");
for (let j = 0; j < catalogCard.length; j++) {
  let cardColor = catalogCard[j].querySelectorAll("#color-letters-cot");
  let cardImgColor = catalogCard[j].querySelectorAll(".img-card-color");
  let difficulty_easy = catalogCard[j].querySelector("#easy");
  let difficulty_medium = catalogCard[j].querySelector("#medium");
  let difficulty_hard = catalogCard[j].querySelector("#hard");
  let cardImgLocation = catalogCard[j].querySelector("#trail-location");
  catalogCard[j].onmouseenter = function () {
    catalogCard[j].classList.add("catalog-item-orange");
    catalogCard[j].classList.remove("catalog-item-white");
    for (let i = 0; i < cardColor.length; i++) {
      cardColor[i].classList.remove("black-color");
      cardColor[i].classList.add("white-color");
    }
    cardImgLocation.classList.remove("trail-location-black");
    cardImgLocation.classList.add("trail-location-white");
    cardImgColor[0].innerHTML =
      '<img src="/img/dist-white.svg" alt="Длина тропы">';
    cardImgColor[2].innerHTML =
      '<img src="/img/duration-white.svg" alt="Длительность тропы">';
    if (difficulty_easy !== null)
      difficulty_easy.innerHTML =
        '<img src="/img/difficulty-white.svg" alt="Сложность тропы">';
    if (difficulty_medium !== null)
      difficulty_medium.innerHTML =
        '<img src="/img/difficulty-medium-white.svg" alt="Сложность тропы">';
    if (difficulty_hard !== null)
      difficulty_hard.innerHTML =
        '<img src="/img/difficulty-hard-white.svg" alt="Сложность тропы">';
  };
}

for (let j = 0; j < catalogCard.length; j++) {
  let cardColor = catalogCard[j].querySelectorAll("#color-letters-cot");
  let cardImgColor = catalogCard[j].querySelectorAll(".img-card-color");
  let difficulty_easy = catalogCard[j].querySelector("#easy");
  let difficulty_medium = catalogCard[j].querySelector("#medium");
  let difficulty_hard = catalogCard[j].querySelector("#hard");
  let cardImgLocation = catalogCard[j].querySelector("#trail-location");
  catalogCard[j].onmouseleave = function () {
    catalogCard[j].classList.remove("catalog-item-orange");
    catalogCard[j].classList.add("catalog-item-white");
    for (let i = 0; i < cardColor.length; i++) {
      cardColor[i].classList.add("black-color");
      cardColor[i].classList.remove("white-color");
    }
    cardImgLocation.classList.add("trail-location-black");
    cardImgLocation.classList.remove("trail-location-white");
    cardImgColor[0].innerHTML =
      '<img src="/img/dist-orange.svg" alt="Длина тропы">';
    cardImgColor[2].innerHTML =
      '<img src="/img/duration-orange.svg" alt="Длительность тропы">';
    if (difficulty_easy !== null)
      difficulty_easy.innerHTML =
        '<img src="/img/difficulty-easy.svg" alt="Сложность тропы">';
    if (difficulty_medium !== null)
      difficulty_medium.innerHTML =
        '<img src="/img/difficulty-medium.svg" alt="Сложность тропы">';
    if (difficulty_hard !== null)
      difficulty_hard.innerHTML =
        '<img src="/img/difficulty-hard.svg" alt="Сложность тропы">';
  };
}

// Скрипт для обновления рекламы в каталоге (лента)
function updateYandexAd() {
  // Очищаем контейнер с рекламой
  const adContainer = document.getElementById('yandex_rtb_R-A-11822438-15');
  if (adContainer) {
    adContainer.innerHTML = ''; // Очищаем контейнер
  }

  // Проверяем, загружен ли Yandex RTB API
  if (typeof Ya !== 'undefined' && Ya.Context && Ya.Context.AdvManager) {
    // Рендерим рекламу заново
    Ya.Context.AdvManager.render({
      blockId: "R-A-11822438-15", // Ваш ID рекламного блока
      renderTo: "yandex_rtb_R-A-11822438-15", // ID контейнера
      type: "feed" // Тип рекламы (лента)
    });
  } else {
    console.error('Yandex RTB API не загружен.');
  }
}


// Фильтр
const regionSelect = document.getElementById('region-select');
const cards = document.querySelectorAll('.trail-link');
const originalTitle = document.title;
const h1Element = document.querySelector('h1');
const originalH1 = h1Element.textContent;
const descriptionElement = document.querySelector('meta[name="description"]');
const originalDescription = descriptionElement.getAttribute('content');

regionsData
  .sort((a, b) => a.name.localeCompare(b.name))
  .forEach(region => {
    const option = document.createElement('option');
    option.value = region.value;
    option.textContent = region.name;
    regionSelect.appendChild(option);
  });

function updateTitleH1Description(regionHref) {
  const titleElement = document.querySelector('title');
  const canonicalElement = document.querySelector('link[rel="canonical"]');

  if (regionHref === 'all') {
    titleElement.textContent = originalTitle;
    h1Element.textContent = originalH1;
    descriptionElement.setAttribute('content', originalDescription);
    canonicalElement.setAttribute('href', "https://eco-trails.ru/catalog/");
    return;
  }

  const regionNameRodPodMap = {
    "lenoblast": "Санкт-Петербурга и Ленинградской области",
    "krasnodarsky-krai": "Краснодарского края",
    "nizhegorodskaya-oblast": "Нижегородской области",
    "yaroslavskaya-oblast": "Ярославской области",
    "moskva": "Москвы и Московской области",
    "krym": "Республики Крым",
    "stavropolsky-krai": "Ставропольского края",
    "kabardino-balkariya": "Кабардино-Балкарии",
    "tambovskaya-oblast": "Тамбовской области",
    "kaliningradskaya-oblast": "Калининградской области",
    "krasnoyarsky-krai": "Красноярского края",
    "voronezhskaya-oblast": "Воронежской области",

  };

  const regionNameRodPod = regionNameRodPodMap[regionHref] || regionHref;

  const titleText = `Экотропы ${regionNameRodPod}`;
  const descriptionText = `Экологические тропы ${regionNameRodPod} — что посмотреть, фото, где находятся на карте и как добраться — узнайте на сайте Экотропы России.`;
  const h1Text = `Экотропы ${regionNameRodPod}`;

  titleElement.textContent = titleText;
  h1Element.textContent = h1Text;
  descriptionElement.setAttribute('content', descriptionText);

  const newCanonicalUrl = `https://eco-trails.ru/catalog/?region=${encodeURIComponent(regionHref)}`;
  canonicalElement.setAttribute('href', newCanonicalUrl);
}

regionSelect.addEventListener('change', function () {
  const selectedRegion = this.value;
  filtredRegion = selectedRegion;

  let newRegion = selectedRegion;

  const newUrl = newRegion === 'all'
    ? window.location.pathname
    : `${window.location.pathname}?region=${encodeURIComponent(newRegion)}`;

  history.pushState(null, '', newUrl);

  filterCards(newRegion);
  updateTitleH1Description(newRegion);

  // Обновляем рекламу
  updateYandexAd();

  // Обновляем рекламу
  updateYandexAd();

  updateLayout();
  updateBreadcrumbsVisibility(newRegion !== 'all');

  window.scrollTo(0, 0);

});

function filterCards(selectedRegion) {
  let cardsFound = false;

  cards.forEach(card => {
    const hrefValue = card.getAttribute('href').split('/')[0];

    if (selectedRegion === 'all' || hrefValue === selectedRegion) {
      card.style.display = '';
      cardsFound = true;
    } else {
      card.style.display = 'none';
    }
  });

  if (!cardsFound) {
    console.error("В данном регионе экотроп не найдено.");
  }
}