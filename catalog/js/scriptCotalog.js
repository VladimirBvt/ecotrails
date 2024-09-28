  const title = document.querySelector(".title");
  const backScroll = document.querySelector("#back-scroll");
  const upperCotalog = document.querySelector(".upper_cotalog");

addEventListener("load", () => {
  const swicthBtn = document.querySelector(".switch-btn");
  const switchList = document.querySelector(".switch-list-icon");
  const switchMap = document.querySelector(".switch-map-icon");
  const mapPath = document.querySelector(".map-path");
  const listPath = document.querySelector(".list-path");
  const colorSwitchText1 = document.querySelector(".switch-btn-text");
  const colorSwitchText2 = document.querySelector(".switch-btn-text2");  

  switchList.addEventListener("click", (e) => {
    swicthBtn.classList.remove("switch-map");
    swicthBtn.classList.add("switch-list");
    mapPath.setAttribute("fill", "black");
    listPath.setAttribute("stroke", "white");
    colorSwitchText2.style.color = "black";
    colorSwitchText1.style.color = "white";
  });

  // При клике на переключатль карты
  switchMap.addEventListener("click", (e) => {
    swicthBtn.classList.remove("switch-list");
    swicthBtn.classList.add("switch-map");
    mapPath.setAttribute("fill", "white");
    listPath.setAttribute("stroke", "black");
    colorSwitchText1.style.color = "black";
    colorSwitchText2.style.color = "white";
    
    // Переход на карту:
    location.pathname = "/catalog/mappage.html";
    const CotColor = document.querySelectorAll(".cotalog-color");
    CotColor[1].style.fill = "black";
    CotColor[0].style.fill = "black";  
  });
});

// Настройка фиксированной части (Заголовок и Фильтр)
function handleScroll() {
  const y = window.scrollY;

  if (y > 85) {
    title.style.display = 'none';
    backScroll.hidden = false;
    upperCotalog.classList.add("upper_cotalog_scroll");
  } else {
    title.style.display = 'flex';
    backScroll.hidden = true;
    upperCotalog.classList.remove("upper_cotalog_scroll");
  }
}

// Проверяем положение прокрутки при загрузке страницы
handleScroll();

// Добавляем обработчик события на прокрутку
window.addEventListener('scroll', handleScroll);



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
const regions = new Set();

// Сохраняем оригинальные значения title, h1 и description при загрузке страницы
const originalTitle = document.title;
const h1Element = document.querySelector('h1');
const originalH1 = h1Element.textContent;
const descriptionElement = document.querySelector('meta[name="description"]');
const originalDescription = descriptionElement.getAttribute('content');

// Извлекаем уникальные регионы из title карточек
cards.forEach(card => {
  const locationElement = card.querySelector('#trail-location');
  if (locationElement) {
    const region = locationElement.getAttribute('title').split(',')[0].trim();
    regions.add(region); // Добавляем уникальные регионы в Set
  }
});

// Преобразуем Set в массив и сортируем его по алфавиту
const sortedRegions = Array.from(regions).sort();

// Заполняем выпадающий список уникальными регионами в алфавитном порядке
sortedRegions.forEach(region => {
  const option = document.createElement('option');
  option.value = region;
  option.textContent = region;
  regionSelect.appendChild(option);
});

// Меняем title, H1 и дескрипшен
function updateTitleH1Description(regionHref) {
  const titleElement = document.querySelector('title');

  // Если выбран "all", возвращаем значения по умолчанию
  if (regionHref === 'all') {
    titleElement.textContent = originalTitle;
    h1Element.textContent = originalH1;
    descriptionElement.setAttribute('content', originalDescription);
    return;
  }

  // Определяем название региона в родительном падеже
  const regionNameRodPodMap = {
    "lenoblast": "Ленинградской области",
    "krasnodarsky-krai": "Краснодарского края",
    "nizhegorodskaya-oblast": "Нижегородской области",
    "yaroslavskaya-oblast": "Ярославской области",
    "moskva": "Москвы и Московской области",
    "krym": "Республики Крым",
    "stavropolsky-krai": "Ставропольского края",
    "kabardino-balkariya": "Кабардино-Балкарии"
  };

  const regionNameRodPod = regionNameRodPodMap[regionHref];

  // Обновляем title, h1 и description
  const titleText = `Экотропы ${regionNameRodPod}`;
  const descriptionText = `Экотропы ${regionNameRodPod}: что посмотреть, фото, где находятся на карте и как добраться — узнайте на сайте Экотропы России.`;
  const h1Text = `Экотропы ${regionNameRodPod}`;

  titleElement.textContent = titleText;
  h1Element.textContent = h1Text;
  descriptionElement.setAttribute('content', descriptionText);
}

// Обработчик изменения значения выпадающего списка
regionSelect.addEventListener('change', function () {
  const selectedRegion = this.value;

  let newRegion = selectedRegion;

  // Если выбран не "all", ищем соответствующую карточку
  if (selectedRegion !== 'all') {
    cards.forEach(card => {
      const locationElement = card.querySelector('#trail-location');
      if (locationElement) {
        const region = locationElement.getAttribute('title').split(',')[0].trim();

        // Если регион совпадает, берём соответствующее значение из href
        if (region === selectedRegion) {
          const hrefValue = card.getAttribute('href');
          newRegion = hrefValue.split('/')[0]; // Извлекаем первую часть до "/"
        }
      }
    });
  }

  // Обновляем URL без перезагрузки страницы с новым значением region
  const newUrl = newRegion === 'all'
    ? window.location.pathname  // Без параметра "region=all"
    : `${window.location.pathname}?region=${encodeURIComponent(newRegion)}`;

  history.pushState(null, '', newUrl);

  // Фильтруем карточки по выбранному региону
  filterCards(selectedRegion);

  // Обновляем title, h1 и description на основе GET-параметра
  updateTitleH1Description(newRegion);
});

// Функция фильтрации карточек
function filterCards(selectedRegion) {
  let cardsFound = false;

  cards.forEach(card => {
    const locationElement = card.querySelector('#trail-location');
    if (locationElement) {
      const region = locationElement.getAttribute('title').split(',')[0].trim();

      // Сравниваем region с selectedRegion
      if (selectedRegion === 'all' || region === selectedRegion) {
        card.style.display = ''; // Показываем карточки выбранного региона
        cardsFound = true;
      } else {
        card.style.display = 'none'; // Скрываем карточки другого региона
      }
    }
  });

  // Если не нашлось карточек, можно показывать сообщение
  if (!cardsFound) {
    console.error("В данном регионе экотроп не найдено.");
  }
}

// Применяем фильтрацию при загрузке страницы
window.addEventListener('load', function () {
  const params = new URLSearchParams(window.location.search);
  const selectedRegionHref = params.get('region') || 'all';  // По умолчанию 'all'

  let selectedRegion = 'all';

  // Находим совпадение между параметром из href и region в title
  if (selectedRegionHref !== 'all') {
    cards.forEach(card => {
      const locationElement = card.querySelector('#trail-location');
      if (locationElement) {
        const region = locationElement.getAttribute('title').split(',')[0].trim();
        const hrefValue = card.getAttribute('href').split('/')[0];

        // Сравниваем значение из href с параметром в URL
        if (hrefValue === selectedRegionHref) {
          selectedRegion = region;
        }
      }
    });
  }

  // Устанавливаем выбранное значение в выпадающем списке
  regionSelect.value = selectedRegion;

  // Применяем фильтрацию
  filterCards(selectedRegion);

  // Обновляем title, h1 и description на основе GET-параметра
  updateTitleH1Description(selectedRegionHref);
});

