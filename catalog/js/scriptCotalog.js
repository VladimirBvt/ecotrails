const title = document.querySelector(".title");
const mainHead = document.querySelector(".main-head");
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
  const breadcrumbs = document.querySelector('.breadcrumbs');

  // Скрытие хлебных крошек на главной каталога
  // Проверяем наличие GET-параметра "region" в URL
  const urlParams = new URLSearchParams(window.location.search);
  const hasRegion = urlParams.has('region');

  // Если параметр "region" отсутствует, скрываем хлебные крошки
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

  // При клике на переключатль карты
  switchMap.addEventListener("click", (e) => {
    swicthBtn.classList.remove("switch-list");
    swicthBtn.classList.add("switch-map");
    mapPath.setAttribute("fill", "white");
    listPath.setAttribute("stroke", "black");
    colorSwitchText1.style.color = "black";
    colorSwitchText2.style.color = "white";


    // Переход на страницу карты с текущим фильтром региона
    const newUrl = filtredRegion === 'all'
      ? `/catalog/mappage.html`  // Без параметра "region=all"
      : `/catalog/mappage.html?region=${encodeURIComponent(filtredRegion)}`;
    location.href = newUrl;
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
    mainHead.style.display = 'none';
    backScroll.hidden = false;
    upperCotalog.classList.add("upper_cotalog_scroll");
  } else {
    title.style.display = 'flex';
    mainHead.style.display = 'flex';
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
// Подключение regionsData (массив регионов)
const regionSelect = document.getElementById('region-select');
const cards = document.querySelectorAll('.trail-link');

// Сохраняем оригинальные значения title, h1 и description при загрузке страницы
const originalTitle = document.title;
const h1Element = document.querySelector('h1');
const originalH1 = h1Element.textContent;
const descriptionElement = document.querySelector('meta[name="description"]');
const originalDescription = descriptionElement.getAttribute('content');

// Заполняем выпадающий список уникальными регионами из regionsData в алфавитном порядке
regionsData
  .sort((a, b) => a.name.localeCompare(b.name))  // Сортируем по алфавиту
  .forEach(region => {
    const option = document.createElement('option');
    option.value = region.value;
    option.textContent = region.name;
    regionSelect.appendChild(option);
  });

// Функция обновления title, h1 и description
function updateTitleH1Description(regionHref) {
  const titleElement = document.querySelector('title');
  const canonicalElement = document.querySelector('link[rel="canonical"]'); // Находим тег canonical

  // Если выбран "all", возвращаем значения по умолчанию
  if (regionHref === 'all') {
    titleElement.textContent = originalTitle;
    h1Element.textContent = originalH1;
    descriptionElement.setAttribute('content', originalDescription);
    canonicalElement.setAttribute('href', "https://eco-trails.ru/catalog/"); // Ссылка по умолчанию
    return;
  }

  // Определяем название региона в родительном падеже
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

  // Обновляем title, h1 и description
  const titleText = `Экотропы ${regionNameRodPod}`;
  const descriptionText = `Экологические тропы ${regionNameRodPod} — что посмотреть, фото, где находятся на карте и как добраться — узнайте на сайте Экотропы России.`;
  const h1Text = `Экотропы ${regionNameRodPod}`;

  titleElement.textContent = titleText;
  h1Element.textContent = h1Text;
  descriptionElement.setAttribute('content', descriptionText);

  // Обновляем canonical ссылку с учетом выбранного региона
  const newCanonicalUrl = `https://eco-trails.ru/catalog/?region=${encodeURIComponent(regionHref)}`;
  canonicalElement.setAttribute('href', newCanonicalUrl);
}

// Обработчик изменения значения выпадающего списка
regionSelect.addEventListener('change', function () {
  const selectedRegion = this.value;
  filtredRegion = selectedRegion; // Сохраняем фильтр в глобальную переменную

  let newRegion = selectedRegion;

  // console.log(`${newRegion}`);  

  // Обновляем URL без перезагрузки страницы с новым значением region
  const newUrl = newRegion === 'all'
    ? window.location.pathname  // Без параметра "region=all"
    : `${window.location.pathname}?region=${encodeURIComponent(newRegion)}`;

  history.pushState(null, '', newUrl);

  // Фильтруем карточки по выбранному региону
  filterCards(newRegion);

  // Обновляем title, h1, description и canonical на основе GET-параметра
  updateTitleH1Description(newRegion);

  // Прокручиваем страницу в начало
  window.scrollTo(0, 0);
});

// Функция фильтрации карточек
function filterCards(selectedRegion) {
  let cardsFound = false;

  cards.forEach(card => {
    const hrefValue = card.getAttribute('href').split('/')[0]; // Получаем первую часть href до "/"

    // Сравниваем hrefValue с selectedRegion
    if (selectedRegion === 'all' || hrefValue === selectedRegion) {
      card.style.display = ''; // Показываем карточки выбранного региона
      cardsFound = true;
    } else {
      card.style.display = 'none'; // Скрываем карточки другого региона
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

  // Устанавливаем выбранное значение в выпадающем списке
  regionSelect.value = selectedRegionHref;
  filtredRegion = selectedRegionHref; // сохранение значения в глобальную переменную

  // Применяем фильтрацию
  filterCards(selectedRegionHref);

  // Обновляем title, h1 и description на основе GET-параметра
  updateTitleH1Description(selectedRegionHref);
});



