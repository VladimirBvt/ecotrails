const upperCotalog = document.querySelector(".upper_cotalog");
const catalog = document.querySelector(".catalog");
const mainHeader = document.querySelector(".main-header");
const elementsToHide = [document.querySelector('.main-head'), document.querySelector('.title')]; 

let isCompact = false;
let isInitialState = true; // Флаг для начального состояния до скролла

// Функция для определения отступа в зависимости от ширины экрана
function getFixedOffset() {
  return window.innerWidth > 1250 ? 268 : 260;
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
      catalog.style.marginTop = `${getFixedOffset()}px`; // Используем адаптивный отступ
    }
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


addEventListener("load", () => {
  const swicthBtn = document.querySelector(".switch-btn");
  const switchList = document.querySelector(".switch-list-icon");
  const switchMap = document.querySelector(".switch-map-icon");
  const mapPath = document.querySelector(".map-path");
  const listPath = document.querySelector(".list-path");
  const colorSwitchText1 = document.querySelector(".switch-btn-text");
  const colorSwitchText2 = document.querySelector(".switch-btn-text2");
  const breadcrumbs = document.querySelector('.breadcrumbs');

  // Фиксируем позиции элементов
  mainHeader.style.position = 'fixed';
  mainHeader.style.top = '0';
  mainHeader.style.width = '100%';
  
  upperCotalog.style.position = 'fixed';
  upperCotalog.style.top = `${mainHeader.offsetHeight}px`;
  upperCotalog.style.width = '100%';
  
  // Добавляем плавность
  upperCotalog.style.transition = 'all 0.3s ease';
  catalog.style.transition = 'margin-top 0.3s ease';
  
  // Первоначальный расчёт
  updateLayout();
  
  // Обработчики событий
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', () => {
    if (!isInitialState) {
      // Обновляем отступ при ресайзе (только в компактном режиме)
      catalog.style.marginTop = `${getFixedOffset()}px`;
    } else {
      updateLayout();
    }
  });

  // Скрытие хлебных крошек на главной каталога
  const urlParams = new URLSearchParams(window.location.search);
  const hasRegion = urlParams.has('region');

  if (!hasRegion && breadcrumbs) {
    breadcrumbs.style.display = 'none';
    document.querySelector('.main-head-right').style.marginLeft = 'auto';
  }

  switchList.addEventListener("click", (e) => {
    swicthBtn.classList.remove("switch-map");
    swicthBtn.classList.add("switch-list");
    mapPath.setAttribute("fill", "black");
    listPath.setAttribute("stroke", "white");
    colorSwitchText2.style.color = "black";
    colorSwitchText1.style.color = "white";
  });

  switchMap.addEventListener("click", (e) => {
    swicthBtn.classList.remove("switch-list");
    swicthBtn.classList.add("switch-map");
    mapPath.setAttribute("fill", "white");
    listPath.setAttribute("stroke", "black");
    colorSwitchText1.style.color = "black";
    colorSwitchText2.style.color = "white";

    const newUrl = filtredRegion === 'all'
      ? `/catalog/mappage.html`
      : `/catalog/mappage.html?region=${encodeURIComponent(filtredRegion)}`;
    location.href = newUrl;
    const CotColor = document.querySelectorAll(".cotalog-color");
    CotColor[1].style.fill = "black";
    CotColor[0].style.fill = "black";
  });
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

window.addEventListener('load', function () {
  const params = new URLSearchParams(window.location.search);
  const selectedRegionHref = params.get('region') || 'all';

  regionSelect.value = selectedRegionHref;
  filtredRegion = selectedRegionHref;

  filterCards(selectedRegionHref);
  updateTitleH1Description(selectedRegionHref);
});