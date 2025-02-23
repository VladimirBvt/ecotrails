// let filtredRegion = 'all'; // Глобальная переменная для хранения текущего выбранного региона

document.addEventListener("DOMContentLoaded", () => {
  const swicthBtn = document.querySelector(".switch-btn");
  const switchList = document.querySelector(".switch-list-icon");
  const switchMap = document.querySelector(".switch-map-icon");
  const mapPath = document.querySelector(".map-path");
  const listPath = document.querySelector(".list-path");
  const colorSwitchText1 = document.querySelector(".switch-btn-text");
  const colorSwitchText2 = document.querySelector(".switch-btn-text2");

  // Логика переключения на список
  switchList.addEventListener("click", () => {
    swicthBtn.classList.remove("switch-map");
    swicthBtn.classList.add("switch-list");
    mapPath.setAttribute("fill", "white");
    listPath.setAttribute("stroke", "black");
    colorSwitchText2.style.color = "white";
    colorSwitchText1.style.color = "black";

    // Переход на страницу каталога с текущим фильтром региона
    const newUrl = filtredRegion === 'all'
      ? `/catalog/`  // Без параметра "region=all"
      : `/catalog/?region=${encodeURIComponent(filtredRegion)}`;
    location.href = newUrl;
  });
});

// Инициализация карты
ymaps.ready(function () {
  var myMap = new ymaps.Map("map", {
    zoom: 4,
    center: [55.601755, 38.602655],
    controls: [],
  }, {
    // Выключение точек интересов по-умолчанию (аэропорты и ко)
    yandexMapDisablePoiInteractivity: true,

  });

  myMap.controls.add("geolocationControl", {
    float: "none",
    position: {
      top: "150px",
      left: "15px",
    },
  });
  myMap.controls.add("zoomControl", {
    float: "none",
    position: {
      top: "250px",
      left: "15px",
    },
  });
  myMap.controls.add("typeSelector", {
    float: "none",
    position: {
      top: "200px",
      left: "15px",
    },
  });

  // Закрытие балуна при клике вне его
  myMap.events.add('click', function (e) {
    myMap.balloon.close(); // Закрываем открытый балун
  });

  // Используем regionsData, который загружается из внешнего файла
  const regionCoordinates = regionsData.reduce((acc, region) => {
    acc[region.value] = region.coordinates; // Связываем регион с его координатами
    return acc;
  }, {});

  // Маппинг (отображение) латинских регионов на кириллические
  const regionNamesInCyrillic = regionsData.reduce((acc, region) => {
    acc[region.value] = region.name; // Связываем region.value с кириллическим названием
    return acc;
  }, {});

  // Сортировка регионов по алфавиту
  const regionsSorted = regionsData.map(region => region.value).sort();

  // Логика фильтрации регионов и центрирования карты
  const regionSelect = document.getElementById('region-select');

  // Очистка текущих опций фильтра
  regionSelect.innerHTML = '';

  // Добавляем пункт "Все регионы"
  const optionAll = document.createElement('option');
  optionAll.value = 'all';
  optionAll.textContent = 'Все регионы';
  regionSelect.appendChild(optionAll);

  // Добавляем отсортированные регионы в выпадающий список с русскими названиями
  regionsSorted.forEach(region => {
    const option = document.createElement('option');
    option.value = region;
    option.textContent = regionNamesInCyrillic[region];  // Русское название региона
    regionSelect.appendChild(option);
  });

  // Обработчик изменения фильтра
  regionSelect.addEventListener('change', function () {
    const selectedRegion = this.value;
    filtredRegion = selectedRegion; // Сохраняем текущий выбранный регион
    centerMapOnRegion(selectedRegion);

    // Обновляем URL без перезагрузки страницы с новым значением region
    const newUrl = selectedRegion === 'all'
      ? window.location.pathname  // Без параметра "region=all"
      : `${window.location.pathname}?region=${encodeURIComponent(selectedRegion)}`;

    history.pushState(null, '', newUrl); // Отвечает за изменение адреса
  });

  // Проверка URL при загрузке страницы и центрирование карты на выбранный регион
  const params = new URLSearchParams(window.location.search);
  const selectedRegion = params.get('region') || 'all';

  // Устанавливаем выбранное значение в выпадающем списке
  regionSelect.value = selectedRegion;
  filtredRegion = selectedRegion; // Сохраняем значение в глобальной переменной

  // Центрируем карту на выбранный регион при загрузке страницы
  centerMapOnRegion(selectedRegion);

  // Функция для центрирования карты на выбранный регион
  function centerMapOnRegion(region) {
    const coordinates = regionCoordinates[region];

    if (coordinates) {
      myMap.setCenter(coordinates, 8);
    } else {
      myMap.setCenter([55.601755, 38.602655], 4); // По умолчанию - Москва
    }
  }


  // -------------------------------------------------------------------------------Тест------------------------------------------------------ 


  // -------------------------------------------------------------------------------Тест------------------------------------------------------

  // .............................................................Танцующий Лес (Калининград)
  var myPolyline1 = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      // 1 часть
      [55.18261414, 20.85936698],
      [55.18240464, 20.85989672],
      [55.18225127, 20.86028351],
      [55.18215304, 20.86058928],
      [55.18205404, 20.86099027],
      [55.18200109, 20.86112975],
      [55.1820809, 20.86181639],
      [55.18208474, 20.86186333],
      [55.18206479, 20.86204304],
      [55.18205327, 20.86208864],
      [55.18180233, 20.86257143],
      [55.18145162, 20.86325137],
      [55.18141171, 20.86333318],
      [55.18125861, 20.86361012],
      [55.18120451, 20.86366846],
      [55.18114311, 20.86370802],
      [55.18112009, 20.86371607],
      [55.18103605, 20.86370802],
      [55.18084419, 20.86361817],
      [55.18114349, 20.86295164],
      [55.18083268, 20.86251578],
      [55.18045817, 20.86342371],
      [55.18001305, 20.86333385],
      [55.1805399, 20.86207053],
      [55.18024329, 20.86162797],
      [55.17984268, 20.86253992],
      [55.17956409, 20.86317158],
      [55.17961935, 20.86324132],
      [55.1796439, 20.86325607],
      [55.17971298, 20.86325473],
      [55.18001804, 20.86333452],

    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline1);
          },
        });
        return items;
      },
    }
  );

  var startPoint = new ymaps.Placemark(
    [55.18261414, 20.85936698],
    {
      hintContent: "Экотропа Танцующий Лес",

      // Тут контент карточки тропы
      balloonContent: `<a href="/catalog/kaliningradskaya-oblast/tancuyushchij-les/">
    <figure id="TancuyushchijLes" class="catalog-item">
        <img src="/catalog/kaliningradskaya-oblast/tancuyushchij-les/img/for-slider.jpg" alt="Экотропа Танцующий Лес"
            class="trail-img">
        <figcaption class="trail-info">
            <a href="/catalog/kaliningradskaya-oblast/tancuyushchij-les/" class="trail-title-link">
                <h2 id="color-letters-cot" class="black-color size-card-elem-h2" title="Танцующий Лес">Танцующий Лес
                </h2>
            </a>
            <a href="/catalog/kaliningradskaya-oblast/tancuyushchij-les/" id="trail-location"
                class="trail-location-black" title="Калининградская область, Куршская коса">
                <p id="color-letters-cot" class="black-color size-card-elem-p">
                    Калининградская область, Куршская коса</p>
            </a>
            <div class="trail-spec">
                <a href="/catalog/kaliningradskaya-oblast/tancuyushchij-les/" class="trail-distance">
                    <div class="img-card-color">
                        <img src="/img/dist-orange.svg" alt="Длина тропы">
                    </div>
                    <p id="color-letters-cot" class="black-color">1,2 км</p>
                </a>
                <a href="/catalog/kaliningradskaya-oblast/tancuyushchij-les/" class="trail-difficulty">
                    <div id="easy" class="img-card-color">
                        <img src="/img/difficulty-easy.svg" alt="Сложность тропы">
                    </div>
                    <p id="color-letters-cot" class="black-color">Простая</p>
                </a>
                <a href="/catalog/kaliningradskaya-oblast/tancuyushchij-les/" class="trail-duration">
                    <div class="img-card-color">
                        <img src="/img/duration-orange.svg" alt="Длительность тропы">
                    </div>
                    <p id="color-letters-cot" class="black-color">~0,5 ч</p>
                </a>
            </div>
        </figcaption>
    </figure>
</a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  // 2 часть
  var myPolyline2 = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      [55.18053607, 20.86206315],
      [55.18083307, 20.86251578],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline2);
          },
        });
        return items;
      },
    }
  );

  // 3 часть
  var myPolyline3 = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      [55.18045702, 20.86342303],
      [55.18084611, 20.86361884],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline3);
          },
        });
        return items;
      },
    }
  );

  // 4 часть
  var myPolyline4 = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      [55.18141171, 20.86333251],
      [55.18114283, 20.86295289],
      [55.18141911, 20.8623675],
      [55.18155686, 20.8620738],
      [55.18165432, 20.8618666],
      [55.1818243, 20.8615045],
      [55.18193757, 20.86126361],
      [55.18200165, 20.86112682],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline4);
          },
        });
        return items;
      },
    }
  );

  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline1).add(myPolyline2).add(myPolyline3).add(myPolyline4).add(startPoint);

  // ---------------------------------------Высота Эфа (Калининград)------------------------
  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.

      [55.22308391, 20.8890549],
      [55.22299805, 20.88925338],
      [55.22301798, 20.88930703],
      [55.22293365, 20.88955111],
      [55.22291679, 20.88978446],
      [55.22286926, 20.88993735],
      [55.22227129, 20.89137501],
      [55.22226362, 20.89139378],
      [55.2222594, 20.89141927],
      [55.22225864, 20.89145749],
      [55.22225327, 20.89148364],
      [55.22218504, 20.89164658],
      [55.22206698, 20.89194565],
      [55.22181322, 20.89258871],
      [55.22165414, 20.89299163],
      [55.22143975, 20.89353424],
      [55.22076082, 20.89525461],
      [55.22059062, 20.8956784],
      [55.22058295, 20.89571461],
      [55.22058602, 20.8957535],
      [55.22073322, 20.89650184],
      [55.22080912, 20.89745939],
      [55.22096092, 20.89818895],
      [55.22101817, 20.89932855],
      [55.22104921, 20.90001989],
      [55.22109509, 20.90115011],
      [55.22111578, 20.90155378],
      [55.22115565, 20.90209961],
      [55.22124382, 20.90238795],
      [55.22124918, 20.90259716],
      [55.22131972, 20.90335354],
      [55.22136035, 20.90377733],
      [55.22153438, 20.90525255],
      [55.22154358, 20.9055791],
      [55.22151789, 20.90603307],
      [55.22132393, 20.90647831],
      [55.22118478, 20.90647228],
      [55.22118555, 20.90638444],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );
  var startPoint = new ymaps.Placemark(
    [55.22308391, 20.8890549],
    {
      hintContent: "Экотропа Высота Эфа",
      balloonContent: `<a href="/catalog/kaliningradskaya-oblast/vysota-efa/"><figure id="VysotaEfa" class="catalog-item">
    <img src="/catalog/kaliningradskaya-oblast/vysota-efa/img/for-slider.jpg" alt="Экотропа Высота Эфа" class="trail-img">
    <figcaption class="trail-info">
        <a href="/catalog/kaliningradskaya-oblast/vysota-efa/" class="trail-title-link">
            <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
                title="Высота Эфа">Высота Эфа
            </h2>
        </a>
        <a href="/catalog/kaliningradskaya-oblast/vysota-efa/" id="trail-location" class="trail-location-black"
            title="Калининградская область, Куршская коса">
            <p id="color-letters-cot" class="black-color size-card-elem-p">
                Калининградская область, Куршская коса</p>
        </a>
        <div class="trail-spec">
            <a href="/catalog/kaliningradskaya-oblast/vysota-efa/" class="trail-distance">
                <div class="img-card-color">
                    <img src="/img/dist-orange.svg" alt="Длина тропы">
                </div>
                <p id="color-letters-cot" class="black-color">1,2 км</p>
            </a>
            <a href="/catalog/kaliningradskaya-oblast/vysota-efa/" class="trail-difficulty">
                <div id="medium" class="img-card-color">
                    <img src="/img/difficulty-medium.svg" alt="Сложность тропы">
                </div>
                <p id="color-letters-cot" class="black-color">Средняя</p>
            </a>
            <a href="/catalog/kaliningradskaya-oblast/vysota-efa/" class="trail-duration">
                <div class="img-card-color">
                    <img src="/img/duration-orange.svg" alt="Длительность тропы">
                </div>
                <p id="color-letters-cot" class="black-color">~0,5 ч</p>
            </a>
        </div>
    </figcaption>
</figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [55.22118555, 20.90638444],
    {
      hintContent: "Конец экотропы",
      balloonContent: ``,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );
  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

  // ---------------------------------------Долина Нарзанов (КБР)------------------------
  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.

      [43.69357428, 42.68196352],
      [43.69354898, 42.6821486],
      [43.69341858, 42.68278696],
      [43.6934361, 42.6828862],
      [43.69387866, 42.68361566],
      [43.69399349, 42.68387852],
      [43.6940169, 42.68405815],
      [43.69401106, 42.6842003],
      [43.69397603, 42.6843666],
      [43.69387678, 42.68458118],
      [43.69371436, 42.68476514],
      [43.69358397, 42.68493948],
      [43.69348471, 42.68511115],
      [43.69343801, 42.68521575],
      [43.69337183, 42.68544106],
      [43.69334459, 42.68556712],
      [43.69333559, 42.68570042],
      [43.693357, 42.68592573],
      [43.69335894, 42.68607057],
      [43.69334727, 42.68614567],
      [43.69330056, 42.68624759],
      [43.6932052, 42.68635488],
      [43.69314097, 42.68641389],
      [43.69313513, 42.68655068],
      [43.69305076, 42.68658372],
      [43.69279191, 42.68657835],
      [43.69260118, 42.68653007],
      [43.69248343, 42.68636269],
      [43.69232578, 42.68611324],
      [43.69203385, 42.68565458],
      [43.6920066, 42.68561167],
      [43.69190734, 42.68554998],
      [43.6918003, 42.68553388],
      [43.69171205, 42.68557702],
      [43.69158165, 42.68570577],
      [43.69144541, 42.68592303],
      [43.69123606, 42.68613479],
      [43.69115432, 42.6863896],
      [43.69113485, 42.68656126],
      [43.69112318, 42.68660954],
      [43.69108814, 42.6866605],
      [43.69104533, 42.68671147],
      [43.69092466, 42.68675438],
      [43.69085848, 42.68688581],
      [43.69075149, 42.68712412],
      [43.69066974, 42.68741111],
      [43.69047706, 42.68777053],
      [43.69037812, 42.6878924],
      [43.69026913, 42.68806942],
      [43.69022631, 42.68812575],
      [43.69005698, 42.68822231],
      [43.69002584, 42.68833228],
      [43.69001611, 42.68846371],
      [43.69003557, 42.68856027],
      [43.69006087, 42.68866219],
      [43.6900745, 42.68883385],
      [43.69009202, 42.68894382],
      [43.69028799, 42.68946132],
      [43.69041256, 42.68965444],
      [43.69049625, 42.689751],
      [43.6905488, 42.68989852],
      [43.69057799, 42.69004872],
      [43.69059372, 42.69021434],
      [43.69058204, 42.69071591],
      [43.69056257, 42.69095999],
      [43.69045591, 42.69146074],
      [43.69044618, 42.69164313],
      [43.69041309, 42.69171287],
      [43.69034692, 42.69181479],
      [43.6903294, 42.69186307],
      [43.6903294, 42.69190599],
      [43.69024378, 42.69211905],
      [43.69015425, 42.69218342],
      [43.68980975, 42.69232021],
      [43.68970712, 42.69244621],
      [43.68963122, 42.6925991],
      [43.68951638, 42.69296119],
      [43.68922898, 42.69341442],
      [43.68918227, 42.69384089],
      [43.68902269, 42.69411193],
      [43.68899349, 42.69425409],
      [43.68895653, 42.69475492],
      [43.6889507, 42.69480588],
      [43.68892345, 42.69486489],
      [43.6887872, 42.69507142],
      [43.68869962, 42.69513311],
      [43.68861837, 42.69519713],
      [43.68855414, 42.69526418],
      [43.68848797, 42.69539829],
      [43.68847045, 42.69541439],
      [43.68836924, 42.6954278],
      [43.68834004, 42.69541171],
      [43.68829659, 42.69541321],
      [43.68822263, 42.69545076],
      [43.68810779, 42.69545612],
      [43.68798153, 42.69549531],
      [43.68778105, 42.6956026],
      [43.68770709, 42.69569111],
      [43.68765259, 42.69582254],
      [43.68765064, 42.69587082],
      [43.68769152, 42.6960103],
      [43.68770709, 42.69608808],
      [43.68771098, 42.69617659],
      [43.68770514, 42.69628388],
      [43.68757084, 42.69652796],
      [43.68759225, 42.69664866],
      [43.6876716, 42.69689767],
      [43.68775335, 42.6972249],
      [43.68782926, 42.69776939],
      [43.68783705, 42.69782035],
      [43.68782926, 42.69812613],
      [43.68778644, 42.69830315],
      [43.68769691, 42.69842117],
      [43.68746661, 42.69860106],
      [43.6872019, 42.69878345],
      [43.68717465, 42.69883978],
      [43.68715908, 42.69898194],
      [43.68713378, 42.6990329],
      [43.68705008, 42.69911337],
      [43.68683438, 42.6993972],
      [43.68677015, 42.69955813],
      [43.68662027, 42.69998728],
      [43.68647169, 42.70027571],
      [43.68640746, 42.70046883],
      [43.68637632, 42.70073436],
      [43.68633739, 42.70087652],
      [43.68627315, 42.70102404],
      [43.68620521, 42.70106763],
      [43.68617602, 42.70106763],
      [43.68615266, 42.70103545],
      [43.68608648, 42.70090402],
      [43.68606702, 42.70081551],
      [43.6860495, 42.70052583],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );
  var startPoint = new ymaps.Placemark(
    [43.69357428, 42.68196352],
    {
      hintContent: "Экотропа Долина Нарзанов",
      balloonContent: `<a href="/catalog/kabardino-balkariya/dolina-narzanov/"><figure id="DolinaNarzanov" class="catalog-item">
    <img src="/catalog/kabardino-balkariya/dolina-narzanov/img/for-slider.jpg" alt="Экотропа Долина Нарзанов" class="trail-img">
    <figcaption class="trail-info">
        <a href="/catalog/kabardino-balkariya/dolina-narzanov/" class="trail-title-link">
            <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
                title="Долина Нарзанов">Долина Нарзанов
            </h2>
        </a>
        <a href="/catalog/kabardino-balkariya/dolina-narzanov/" id="trail-location" class="trail-location-black"
            title="Кабардино-Балкария, экопарк Долина Нарзанов">
            <p id="color-letters-cot" class="black-color size-card-elem-p">
                Кабардино-Балкария, экопарк Долина Нарзанов</p>
        </a>
        <div class="trail-spec">
            <a href="/catalog/kabardino-balkariya/dolina-narzanov/" class="trail-distance">
                <div class="img-card-color">
                    <img src="/img/dist-orange.svg" alt="Длина тропы">
                </div>
                <p id="color-letters-cot" class="black-color">2,7 км</p>
            </a>
            <a href="/catalog/kabardino-balkariya/dolina-narzanov/" class="trail-difficulty">
                <div id="medium" class="img-card-color">
                    <img src="/img/difficulty-medium.svg" alt="Сложность тропы">
                </div>
                <p id="color-letters-cot" class="black-color">Средняя</p>
            </a>
            <a href="/catalog/kabardino-balkariya/dolina-narzanov/" class="trail-duration">
                <div class="img-card-color">
                    <img src="/img/duration-orange.svg" alt="Длительность тропы">
                </div>
                <p id="color-letters-cot" class="black-color">~1 ч</p>
            </a>
        </div>
    </figcaption>
</figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [43.6860495, 42.70052583],
    {
      hintContent: "Конец экотропы",
      balloonContent: ``,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );
  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

  // ............................................................. PlesActive (Тамбов)

  var myPolyline1 = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      // 1 часть
      [52.70832606, 41.51374276],
      [52.70668064, 41.51440862],
      [52.70636621, 41.51453426],
      [52.70629127, 41.51456532],
      [52.70625787, 41.51458296],
      [52.70586015, 41.51481563],
      [52.70557667, 41.51498218],
      [52.70532292, 41.51513022],
      [52.70504514, 41.51529315],
      [52.70444212, 41.51564579],
      [52.70417818, 41.51594284],
      [52.70316314, 41.51668716],
      [52.70225562, 41.51735369],
      [52.70189839, 41.5176152],
      [52.70124502, 41.51855934],
      [52.70140592, 41.51922319],
      [52.70176682, 41.52057234],
      [52.70200959, 41.52139779],
      [52.70230429, 41.52197799],
      [52.70231712, 41.52199525],
      [52.70258637, 41.52221117],
      [52.7027214, 41.52232075],
      [52.70280592, 41.52238082],
      [52.70316192, 41.5226316],
      [52.70357535, 41.52302857],
      [52.70374928, 41.52307551],
      [52.70397045, 41.52313184],
      [52.70437043, 41.52319554],
      [52.7056457, 41.52362402],
      [52.70582166, 41.52368236],
      [52.70643627, 41.52363676],
      [52.70672789, 41.52212131],
      [52.7068012, 41.52175251],
      [52.70791064, 41.51810672],
      [52.70799698, 41.51781503],
      [52.70834561, 41.51564244],
      [52.70824786, 41.51378098],

    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline1);
          },
        });
        return items;
      },
    }
  );

  var startPoint = new ymaps.Placemark(
    [52.70832606, 41.51374276],
    {
      hintContent: "Экотропа PlesActive",

      // Тут контент карточки тропы
      balloonContent: `<a href="../catalog/tambovskaya-oblast/ples-active/"><figure id="PlesActive" class="catalog-item">
 <img src="../catalog/tambovskaya-oblast/ples-active/img/for-slider.jpg" alt="Экотропа PlesActive" class="trail-img">
 <figcaption class="trail-info">
     <a href="../catalog/tambovskaya-oblast/ples-active/" class="trail-title-link">
         <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
             title="Экотропа PlesActive">Экотропа PlesActive
         </h2>
     </a>
     <a href="../catalog/tambovskaya-oblast/ples-active/" id="trail-location" class="trail-location-black"
         title="Тамбовская область, г. Тамбов, Пригородный лес">
         <p id="color-letters-cot" class="black-color size-card-elem-p">
         Тамбовская область, г.&nbsp;Тамбов, Пригородный лес</p>
     </a>
     <div class="trail-spec">
         <a href="../catalog/tambovskaya-oblast/ples-active/" class="trail-distance">
             <div class="img-card-color">
                 <img src="../../img/dist-orange.svg" alt="Длина тропы">
             </div>
             <p id="color-letters-cot" class="black-color">10 км</p>
         </a>
         <a href="../catalog/tambovskaya-oblast/ples-active/" class="trail-difficulty">
             <div id="easy" class="img-card-color">
                 <img src="../../img/difficulty-easy.svg" alt="Сложность тропы">
             </div>
             <p id="color-letters-cot" class="black-color">Простая</p>
         </a>
         <a href="../catalog/tambovskaya-oblast/ples-active/" class="trail-duration">
             <div class="img-card-color">
                 <img src="../../img/duration-orange.svg" alt="Длительность тропы">
             </div>
             <p id="color-letters-cot" class="black-color">~3,5 ч</p>
         </a>
     </div>
 </figcaption>
</figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [52.70824786, 41.51378098],
    {
      hintContent: "Конец экотропы",
      ////balloonContent: "Это конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );

  // 2 часть
  var myPolyline2 = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      [52.70672585, 41.52213382],
      [52.70682401, 41.52224781],
      [52.70698651, 41.52243423],
      [52.70715594, 41.52262936],
      [52.70719056, 41.52267026],
      [52.70720604, 41.52268099],
      [52.70750578, 41.52278707],
      [52.70808573, 41.52290302],
      [52.70826575, 41.52303043],
      [52.70828367, 41.52304652],
      [52.70829344, 41.523072],
      [52.70837897, 41.52348506],
      [52.7083977, 41.52386325],
      [52.70830566, 41.52496698],
      [52.70801731, 41.52527946],
      [52.70774443, 41.52570727],
      [52.70759537, 41.52616861],
      [52.70752368, 41.52683112],
      [52.7075579, 41.52741986],
      [52.70669201, 41.52741584],
      [52.70629123, 41.52726429],
      [52.70583532, 41.52680333],
      [52.70581658, 41.52675907],
      [52.70565692, 41.52629907],
      [52.70558442, 41.52584444],
      [52.70556976, 41.52559365],
      [52.70561945, 41.52440811],
      [52.70563737, 41.52362089],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline2);
          },
        });
        return items;
      },
    }
  );

  // 3 часть
  var myPolyline3 = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      [52.70582777, 41.52678516],
      [52.70580577, 41.5270802],
      [52.70576767, 41.52758839],
      [52.70570576, 41.52842993],
      [52.70563509, 41.52902426],
      [52.70559558, 41.52934277],
      [52.70558214, 41.52938502],
      [52.70540496, 41.52964452],
      [52.70538134, 41.52966129],
      [52.70516737, 41.52969809],
      [52.70472952, 41.52967998],
      [52.70471526, 41.52968199],
      [52.70469897, 41.52969071],
      [52.70431691, 41.52996094],
      [52.70415765, 41.53004946],
      [52.70381021, 41.53024258],
      [52.70379066, 41.53026202],
      [52.70374056, 41.53034383],
      [52.70345625, 41.53079176],
      [52.70298642, 41.53153377],
      [52.70281494, 41.531804],
      [52.70261372, 41.53205143],
      [52.70243938, 41.53226534],
      [52.70184468, 41.53299691],
      [52.70182716, 41.53304653],
      [52.70180231, 41.53329464],
      [52.70176728, 41.53364869],
      [52.70175914, 41.5336802],
      [52.70174651, 41.53369697],
      [52.70172044, 41.53372044],
      [52.70098356, 41.53431522],
      [52.70041287, 41.53477522],
      [52.7002199, 41.53499676],
      [52.69947272, 41.53585077],
      [52.69945887, 41.5358776],
      [52.69934237, 41.53620483],
      [52.69922378, 41.53654417],
      [52.69890196, 41.53744807],
      [52.69869665, 41.53770959],
      [52.69848238, 41.53797781],
      [52.69845549, 41.53799658],
      [52.69792754, 41.53808241],
      [52.69669237, 41.53805693],
      [52.69595093, 41.5380623],
      [52.69508888, 41.53806766],
      [52.69480126, 41.53807169],
      [52.69438677, 41.53788054],
      [52.69355973, 41.53749967],
      [52.69274, 41.53687739],
      [52.69272086, 41.53686331],
      [52.69270252, 41.53683515],
      [52.69236558, 41.53582262],
      [52.69236029, 41.53579043],
      [52.69233177, 41.53515944],
      [52.6923171, 41.53483355],
      [52.69236558, 41.53459349],
      [52.6925807, 41.53352866],
      [52.69290745, 41.53191665],
      [52.69306798, 41.5311321],
      [52.69324072, 41.53028318],
      [52.69341917, 41.5293994],
      [52.69383717, 41.52923578],
      [52.69386162, 41.52921298],
      [52.69404658, 41.52894476],
      [52.69437984, 41.52846196],
      [52.69462946, 41.52810265],
      [52.69572517, 41.5265221],
      [52.69647884, 41.52543715],
      [52.69712576, 41.52450374],
      [52.69779712, 41.5235301],
      [52.69846521, 41.52256923],
      [52.6992779, 41.52139644],
      [52.69968485, 41.52080971],
      [52.69996839, 41.52040092],
      [52.70029183, 41.51993556],
      [52.7004344, 41.51972769],
      [52.70055945, 41.51954865],
      [52.7007314, 41.51929956],
      [52.70087682, 41.51909102],
      [52.70103527, 41.51886035],
      [52.70124668, 41.51855726],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline3);
          },
        });
        return items;
      },
    }
  );

  // 4 часть
  var myPolyline4 = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      [52.69171421, 41.53483858],
      [52.69181322, 41.5347903],
      [52.69199167, 41.53477152],
      [52.69210371, 41.53480237],
      [52.69212408, 41.53481712],
      [52.69220679, 41.53491837],
      [52.69224794, 41.53494654],
      [52.69227442, 41.53494922],
      [52.69229724, 41.53492843],
      [52.69230946, 41.53489021],
      [52.69231761, 41.53483187],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline4);
          },
        });
        return items;
      },
    }
  );

  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline1).add(myPolyline2).add(myPolyline3).add(myPolyline4).add(startPoint).add(endPoint);

  // .............................................................В гостях у серой цапли (Переславль)
  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.

      [56.80128731, 38.79955966],
      [56.80127039, 38.7994745],
      [56.80123047, 38.799388],
      [56.80121336, 38.79933502],
      [56.80118761, 38.79925389],
      [56.80116737, 38.79919555],
      [56.80113242, 38.79887503],
      [56.80114971, 38.7986296],
      [56.80115376, 38.79858334],
      [56.80114861, 38.79850622],
      [56.80095215, 38.79802611],
      [56.8009391, 38.79799218],
      [56.80088556, 38.79783701],
      [56.80085687, 38.79773777],
      [56.80076639, 38.79740899],
      [56.80062272, 38.79688136],
      [56.80059623, 38.7967915],
      [56.80026367, 38.7962852],
      [56.79995904, 38.79582118],
      [56.79975007, 38.79550199],
      [56.79973682, 38.7954859],
      [56.79971401, 38.79543226],
      [56.79970003, 38.79536118],
      [56.79969635, 38.79529278],
      [56.79969782, 38.79523243],
      [56.79970444, 38.79518281],
      [56.7997199, 38.7951399],
      [56.799987, 38.79466515],
      [56.80032548, 38.79406433],
      [56.80033872, 38.79404421],
      [56.80044395, 38.79399996],
      [56.80088764, 38.79380147],
      [56.80115694, 38.79368077],
      [56.80180003, 38.79455249],
      [56.80185889, 38.79456054],
      [56.80201782, 38.79502188],
      [56.80204284, 38.79519354],
      [56.80206491, 38.79614572],
      [56.80199648, 38.79655275],
      [56.80196264, 38.79664059],
      [56.80184086, 38.79683371],
      [56.80164478, 38.79743855],
      [56.80168672, 38.79873808],
      [56.80169702, 38.79888828],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );

  var startPoint = new ymaps.Placemark(
    [56.80128731, 38.79955966],
    {
      hintContent: "Экотропа В гостях у серой цапли",

      // Тут контент карточки тропы
      balloonContent: `<a href="yaroslavskaya-oblast/v-gostyah-u-seroy-tsapli/"><figure id="Tsaplya" class="catalog-item">
    <img src="yaroslavskaya-oblast/v-gostyah-u-seroy-tsapli/img/for-slider.jpg" alt="Экотропа В гостях у серой цапли" class="trail-img">
    <figcaption class="trail-info">
       <a href="yaroslavskaya-oblast/v-gostyah-u-seroy-tsapli/" class="trail-title-link">
           <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
               title="Экотропа В гостях у серой цапли">В гостях у серой цапли
           </h2>
       </a>
       <a href="yaroslavskaya-oblast/v-gostyah-u-seroy-tsapli/" id="trail-location" class="trail-location-black"
           title="Ярославская область, г. Переславль-Залесский">
           <p id="color-letters-cot" class="black-color size-card-elem-p">
           Ярославская область, г.&nbsp;Переславль-Залесский</p>
       </a>
       <div class="trail-spec">
           <a href="yaroslavskaya-oblast/v-gostyah-u-seroy-tsapli/" class="trail-distance">
               <div class="img-card-color">
                   <img src="/img/dist-orange.svg" alt="Длина тропы">
               </div>
               <p id="color-letters-cot" class="black-color">1,1 км</p>
           </a>
           <a href="yaroslavskaya-oblast/v-gostyah-u-seroy-tsapli/" class="trail-difficulty">
               <div id="easy" class="img-card-color">
                   <img src="/img/difficulty-easy.svg" alt="Сложность тропы">
               </div>
               <p id="color-letters-cot" class="black-color">Простая</p>
           </a>
           <a href="yaroslavskaya-oblast/v-gostyah-u-seroy-tsapli/" class="trail-duration">
               <div class="img-card-color">
                   <img src="/img/duration-orange.svg" alt="Длительность тропы">
               </div>
               <p id="color-letters-cot" class="black-color">~0,5 ч</p>
           </a>
       </div>
    </figcaption>
    </figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [56.80169702, 38.79888828],
    {
      hintContent: "Конец экотропы",
      ////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );

  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

  //   --------------------------------------------------Лиственничная роща (Линдуловская)
  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.

      [60.2422200351569, 29.5405737202671],
      [60.2421626953448, 29.5406515043285],
      [60.2420880200898, 29.5407024662998],
      [60.2419453365293, 29.540750746062],
      [60.2417639808349, 29.5407963436153],
      [60.2414452724313, 29.5409036319758],
      [60.2409892072873, 29.5410565178897],
      [60.2402837606206, 29.5415741842295],
      [60.2400543871572, 29.5417565744425],
      [60.2398490165252, 29.5418638628031],
      [60.2396783178816, 29.5418933671023],
      [60.2395702971851, 29.5418370407129],
      [60.2392755722238, 29.5414776247049],
      [60.2391595485491, 29.5413354676271],
      [60.2386314355702, 29.540774885943],
      [60.2379788691063, 29.5400845949502],
      [60.2373343506233, 29.5397051210357],
      [60.2365207942442, 29.5392652387573],
      [60.2356479063013, 29.5387765947679],
      [60.2353037966585, 29.5385351959565],
      [60.2351570821462, 29.5383152548173],
      [60.2348263051823, 29.5376447025636],
      [60.2345915582142, 29.5372316423753],
      [60.2343834856273, 29.536641556392],
      [60.2342794488277, 29.5363894287446],
      [60.2341887498169, 29.5361963096956],
      [60.2337459216174, 29.535010773311],
      [60.2336418827778, 29.5345816198685],
      [60.2335298405994, 29.5337447706559],
      [60.2334418071806, 29.5332834307053],
      [60.2333431027723, 29.532865006099],
      [60.2332817458185, 29.5326101962425],
      [60.2332630719429, 29.5325780097343],
      [60.2332363949592, 29.5325806919434],
      [60.2331046920193, 29.5326486844152],
      [60.2328739342615, 29.5327532905668],
      [60.2327645571868, 29.5327988881201],
      [60.2327165378675, 29.5328418034643],
      [60.2326298361401, 29.5328525323004],
      [60.2325684778464, 29.5328498500913],
      [60.2324951145287, 29.5328149813741],
      [60.2324204171631, 29.5327667016119],
      [60.2323523890566, 29.5326969641775],
      [60.232315040232, 29.5325682181448],
      [60.2322963658036, 29.5324421543211],
      [60.2322950319155, 29.5323241371244],
      [60.2323203757719, 29.5319808143705],
      [60.232321709659, 29.5318762082189],
      [60.2323137063356, 29.5318064707845],
      [60.2322870285765, 29.5318091529935],
      [60.2322470118969, 29.5318547505468],
      [60.2321949901403, 29.5319539922803],
      [60.2321389666173, 29.5321471113294],
      [60.2321042853317, 29.5324019211858],
      [60.2320911664212, 29.5326825567455],
      [60.2321138426539, 29.5329990574092],
      [60.2321551933904, 29.5333289691181],
      [60.2319751172197, 29.5334335752696],
      [60.2319497730863, 29.5334228464336],
      [60.2318844118096, 29.5333048292369],
      [60.2317656940449, 29.5331278034419],
      [60.2316803237068, 29.5331009813518],
      [60.2316096262175, 29.5331036635608],
      [60.2315616052003, 29.533151943323],
      [60.2315082484317, 29.5332163163394],
      [60.2314002007084, 29.5334308930606],
      [60.2313735222031, 29.5334523507327],
      [60.2309866814196, 29.5335891433924],
      [60.2307865895571, 29.5336106010646],
      [60.2306732036294, 29.5336454697817],
      [60.2303490510733, 29.5336588808268],
      [60.2301889745638, 29.5336535164088],
      [60.2300929282634, 29.5336749740809],
      [60.2296660524812, 29.533886868593],
      [60.2294832945725, 29.5341363140314],
      [60.2294392724439, 29.5341738649576],
      [60.2293805761801, 29.5341899582117],
      [60.2293325518858, 29.5341953226297],
      [60.2292204949155, 29.5341121741502],
      [60.2290470726701, 29.5339244195192],
      [60.2289016640598, 29.5337393470971],
      [60.2287842694947, 29.5335864611833],
      [60.2285107918831, 29.5331412144868],
      [60.2283240253603, 29.5326879211633],
      [60.2281786135405, 29.5323419162003],
      [60.2279865088625, 29.5317840167252],
      [60.2276836748937, 29.5309310742585],
      [60.2276356481047, 29.5307996460167],
      [60.2275862871557, 29.5306333490578],
      [60.2273901767383, 29.5300003477303],
      [60.2273047949552, 29.5297160335747],
      [60.2272127424801, 29.529415626165],
      [60.2271553763137, 29.5292868801323],
      [60.2271233579445, 29.5292707868782],
      [60.2270966759461, 29.5293297954765],
      [60.2269952841447, 29.5295551010338],
      [60.2269726043585, 29.5297374912468],
      [60.227017963906, 29.5303007551399],
      [60.2270499823695, 29.5309176632133],
      [60.2270606551867, 29.5310195871558],
      [60.2271940650985, 29.5315721222129],
      [60.2273381472012, 29.5318805762496],
      [60.2274101880051, 29.531950313684],
      [60.2274328674875, 29.5320227333274],
      [60.2274902331576, 29.5324304290977],
      [60.2275009058309, 29.5326155015197],
      [60.2274969035698, 29.5330419727531],
      [60.2274942354015, 29.5331707187858],
      [60.2274835627259, 29.533216316339],
      [60.2274542128411, 29.5333021470275],
      [60.2273608266973, 29.5336803384986],
      [60.2272594357157, 29.5343911238875],
      [60.2272581016128, 29.5344501324858],
      [60.2273221380558, 29.534841735002],
      [60.227402183424, 29.5353674479689],
      [60.2275849529578, 29.5359602161612],
      [60.2278344250177, 29.5363571830953],
      [60.2280372030792, 29.5366951414312],
      [60.2282132987957, 29.5369097181524],
      [60.228440087326, 29.5369848200048],
      [60.2286722104359, 29.5372262188161],
      [60.2288162860103, 29.537397880193],
      [60.2289710331514, 29.5376607366765],
      [60.2291044352709, 29.5377197452748],
      [60.2291577959481, 29.5377251096929],
      [60.229357897779, 29.5376124569143],
      [60.2295633343744, 29.5374676176274],
      [60.2297701036783, 29.5373710581029],
      [60.2298127913625, 29.5373496004307],
      [60.2300102212183, 29.5370947905743],
      [60.2303277072588, 29.5366388150418],
      [60.2305144623081, 29.5362901278698],
      [60.2309306554268, 29.5362391658985],
      [60.2315069140959, 29.5362364836895],
      [60.2318190499594, 29.5364027806484],
      [60.232104504932, 29.5365422555171],
      [60.232417968977, 29.536692459222],
      [60.2327514380538, 29.5369258114063],
      [60.233114248543, 29.5374434777461],
      [60.2332289598382, 29.5376258679591],
      [60.2331609333705, 29.5378779956064],
      [60.2330889052393, 29.5381918140612],
      [60.2330448879608, 29.5384680815897],
      [60.2330262139407, 29.5387684889994],
      [60.2330262139407, 29.5390045233927],
      [60.2330462218003, 29.539422947999],
      [60.2330715650738, 29.539594609376],
      [60.2332596382842, 29.5403000303469],
      [60.233427702789, 29.5408176966867],
      [60.2336757964342, 29.541415829297],
      [60.2337798351386, 29.5416545458993],
      [60.2339052146863, 29.5418825336656],
      [60.2340385966554, 29.5421212502679],
      [60.2342026557214, 29.5423331447801],
      [60.2342973561131, 29.5423760601243],
      [60.2343747167927, 29.5423867889603],
      [60.2344374054848, 29.5423760601243],
      [60.2346801562975, 29.5422634073456],
      [60.2349082337222, 29.5421614834031],
      [60.2353016968714, 29.5420917459686],
      [60.2357525064234, 29.5420541950424],
      [60.2359512341086, 29.5420327373703],
      [60.2360445956951, 29.5420112796981],
      [60.2364753892636, 29.5417564698417],
      [60.2366674440026, 29.5416169949729],
      [60.2367968135239, 29.5414775201041],
      [60.2369115118942, 29.5413219519812],
      [60.2370568848312, 29.541104693051],
      [60.2372436014065, 29.5408096500594],
      [60.2374196474849, 29.5405199714858],
      [60.2374556567949, 29.5404609628875],
      [60.2375463467333, 29.5403375812728],
      [60.2376343690705, 29.5402571150023],
      [60.237770403139, 29.5401686021048],
      [60.2378690941583, 29.5401310511786],
      [60.2379727860818, 29.5400901474911],
      [60.2379831219165, 29.5400874652821],

    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );
  var startPoint = new ymaps.Placemark(
    [60.2422200351569, 29.5405737202671],
    {
      hintContent: "Экотропа Лиственничная роща",
      balloonContent: `<a href="/catalog/lenoblast/listvennichnaya-roscha/"><figure id="ListvennichnayaRoscha" class="catalog-item">
    <img src="/catalog/lenoblast/listvennichnaya-roscha/img/for-slider.jpg" alt="Экотропа Лиственничная роща"
        class="trail-img">
    <figcaption class="trail-info">
        <a href="/catalog/lenoblast/listvennichnaya-roscha/" class="trail-title-link">
            <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
                title="Экотропа Лиственничная роща">Лиственничная роща</h2>
        </a>
        <a href="/catalog/lenoblast/listvennichnaya-roscha/" id="trail-location" class="trail-location-black" title="Ленинградская область, пос. Рощино">
            <p id="color-letters-cot" class="black-color size-card-elem-p">Ленинградская область, пос.&nbsp;Рощино</p>
        </a>
        <div class="trail-spec">
            <a href="/catalog/lenoblast/listvennichnaya-roscha/" class="trail-distance">
                <div class="img-card-color">
                    <img src="/img/dist-orange.svg" alt="Длина тропы">
                </div>
                <p id="color-letters-cot" class="black-color">4,6 км</p>
            </a>
            <a href="/catalog/lenoblast/listvennichnaya-roscha/" class="trail-difficulty">
                <div id="medium" class="img-card-color">
                    <img src="/img/difficulty-medium.svg" alt="Сложность тропы">
                </div>
                <p id="color-letters-cot" class="black-color">Средняя</p>
            </a>
            <a href="/catalog/lenoblast/listvennichnaya-roscha/" class="trail-duration">
                <div class="img-card-color">
                    <img src="/img/duration-orange.svg" alt="Длительность тропы">
                </div>
                <p id="color-letters-cot" class="black-color">~2 ч</p>
            </a>
        </div>
    </figcaption>
</figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [60.2379831219165, 29.5400874652821],
    {
      hintContent: "Конец экотропы",
      //////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );
  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

  // --------------------------------------------Экотропа В гармонии с природой (Сер. бор)

  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      [55.78069329, 37.43567138],
      [55.78069684, 37.43548475],
      [55.78070387, 37.43531532],
      [55.78071058, 37.43527491],
      [55.7807581, 37.435146],
      [55.78076386, 37.43512538],
      [55.78076434, 37.43510074],
      [55.78073939, 37.43491164],
      [55.78067818, 37.43456698],
      [55.78066004, 37.43422366],
      [55.78072655, 37.43310786],
      [55.78092003, 37.43171311],
      [55.78106514, 37.43116594],
      [55.78116188, 37.43079043],
      [55.7812042, 37.43023789],
      [55.78126769, 37.42968536],
      [55.78143698, 37.42892361],
      [55.78143094, 37.4285481],
      [55.78141885, 37.4283979],
      [55.78143698, 37.42774344],
      [55.78138257, 37.42757714],
      [55.78131908, 37.42748058],
      [55.78123444, 37.4274323],
      [55.78111049, 37.42740548],
      [55.78103793, 37.42734647],
      [55.78095933, 37.42724455],
      [55.78083564, 37.42695009],
      [55.78061344, 37.42726928],
      [55.78042449, 37.42755627],
      [55.78031263, 37.42779231],
      [55.78020077, 37.42808735],
      [55.78018565, 37.4282161],
      [55.78013426, 37.42800688],
      [55.78008891, 37.42764747],
      [55.78006321, 37.42751872],
      [55.7800224, 37.42736047],
      [55.77993875, 37.42718285],
      [55.7798279, 37.4270477],
      [55.77947217, 37.42668992],
      [55.77913054, 37.42634391],
      [55.7793724, 37.42566263],
      [55.77938752, 37.4255017],
      [55.7793724, 37.42540514],
      [55.77913961, 37.42549634],
      [55.77889774, 37.4255929],
      [55.77875262, 37.42596304],
      [55.77844424, 37.4256519],
      [55.7783868, 37.42555535],
      [55.77835354, 37.42543733],
      [55.77838378, 37.42525494],
      [55.77838075, 37.42456293],
      [55.77848355, 37.42446637],
      [55.77854099, 37.42432689],
      [55.7785682, 37.42425716],
      [55.77885844, 37.42379582],
      [55.77916984, 37.42374217],
      [55.77935728, 37.42368316],
      [55.77951147, 37.4235866],
      [55.77975333, 37.42329693],
      [55.77987124, 37.4230287],
      [55.77994914, 37.42281677],
      [55.78012751, 37.42247345],
      [55.78029681, 37.42197456],
      [55.78039355, 37.42155077],
      [55.78048727, 37.42130937],
      [55.78087424, 37.42130401],
      [55.78076843, 37.42097141],
      [55.78054471, 37.42024722],
      [55.78041774, 37.41984489],
      [55.78021519, 37.41910996],
      [55.78008821, 37.41839113],
      [55.77999147, 37.41802098],
      [55.77954705, 37.416873],
      [55.77951682, 37.41673352],
      [55.77947449, 37.41641166],
      [55.77929612, 37.41577329],
      [55.77927193, 37.41555335],
      [55.77921751, 37.41393866],
      [55.77924472, 37.4136007],
      [55.779281, 37.41334321],
      [55.77931728, 37.41314473],
      [55.77964077, 37.41246345],
      [55.77968914, 37.41229178],
      [55.77970124, 37.41214695],
      [55.77970124, 37.41197528],
      [55.779671, 37.41163733],
      [55.77965891, 37.41102846],
      [55.77965286, 37.41064491],
      [55.77975868, 37.41033377],
      [55.77972844, 37.40993681],
      [55.77971635, 37.40967395],
      [55.77974507, 37.40945937],
      [55.77970048, 37.40933197],
      [55.77963624, 37.40916433],
      [55.77937926, 37.40848037],
      [55.77923639, 37.40814179],
      [55.77928251, 37.40803512],
      [55.77933389, 37.40794372],
      [55.77961126, 37.40768217],
      [55.7797874, 37.40752282],
      [55.78000054, 37.40741016],
      [55.78037617, 37.4072157],
      [55.78060518, 37.40710976],
      [55.78066791, 37.40704672],
      [55.78067169, 37.40697028],
      [55.78067471, 37.4068697],
      [55.78068983, 37.40673961],
      [55.7806989, 37.40666317],
      [55.7807125, 37.40659477],
      [55.78073517, 37.40649151],
      [55.78079488, 37.40627559],
      [55.78094286, 37.40597145],
      [55.78099795, 37.40596393],
      [55.78110258, 37.40593358],
      [55.78125315, 37.40586261],
      [55.78132919, 37.40584164],
      [55.78144393, 37.40582527],
      [55.78159501, 37.40581555],
      [55.78178996, 37.40588574],
      [55.78184776, 37.40590564],
      [55.78198927, 37.40589447],
      [55.78234347, 37.40605833],
      [55.78264879, 37.40599396],
      [55.78285134, 37.40599396],
      [55.78298737, 37.40610661],
      [55.78324735, 37.40620853],
      [55.78335618, 37.40620853],
      [55.78369475, 37.40658404],
      [55.78415423, 37.40695955],
      [55.78450186, 37.40730288],
      [55.78493716, 37.40758183],
      [55.78520619, 37.40789833],
      [55.78561427, 37.4084455],
      [55.7858047, 37.40870299],
      [55.78614023, 37.40895512],
      [55.78631252, 37.40919115],
      [55.78666316, 37.40989389],
      [55.78698357, 37.41060199],
      [55.78723143, 37.41091849],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );
  var startPoint = new ymaps.Placemark(
    [55.78069329, 37.43567138],
    {
      hintContent: "Экотропа В гармонии с природой",
      balloonContent: `<a href="moskva/v-garmonii-s-prirodoy/"><figure id="VGarmoniiSPrirodoy" class="catalog-item">
    <img src="moskva/v-garmonii-s-prirodoy/img/for-slider.jpg" alt="Экотропа в гармонии с природой" class="trail-img">
    <figcaption class="trail-info">
        <a href="moskva/v-garmonii-s-prirodoy/" class="trail-title-link">
            <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
                title="Экотропа в гармонии с природой">В&nbsp;гармонии с&nbsp;природой
            </h2>
        </a>
        <a href="moskva/v-garmonii-s-prirodoy/" id="trail-location" class="trail-location-black"
            title="Москва, парк Серебряный Бор">
            <p id="color-letters-cot" class="black-color size-card-elem-p">
              г.&nbsp;Москва, парк &laquo;Серебряный Бор&raquo;</p>
        </a>
        <div class="trail-spec">
            <a href="moskva/v-garmonii-s-prirodoy/" class="trail-distance">
                <div class="img-card-color">
                    <img src="/img/dist-orange.svg" alt="Длина тропы">
                </div>
                <p id="color-letters-cot" class="black-color">3,5 км</p>
            </a>
            <a href="moskva/v-garmonii-s-prirodoy/" class="trail-difficulty">
                <div id="easy" class="img-card-color">
                    <img src="/img/difficulty-easy.svg" alt="Сложность тропы">
                </div>
                <p id="color-letters-cot" class="black-color">Простая</p>
            </a>
            <a href="moskva/v-garmonii-s-prirodoy/" class="trail-duration">
                <div class="img-card-color">
                    <img src="/img/duration-orange.svg" alt="Длительность тропы">
                </div>
                <p id="color-letters-cot" class="black-color">~1,5 ч</p>
            </a>
        </div>
    </figcaption>
</figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [55.78723143, 37.41091849],
    {
      hintContent: "Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );
  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

  // .............................................................Вдоль реки Чермянка (Мск)
  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      [55.87064362, 37.62383037],
      [55.87066473, 37.62376868],
      [55.87074768, 37.62374186],
      [55.87076728, 37.62369894],
      [55.87082157, 37.62339317],
      [55.87083816, 37.62336635],
      [55.87123629, 37.62305253],
      [55.87150171, 37.6227253],
      [55.87162688, 37.62238198],
      [55.87165553, 37.62234174],
      [55.87184554, 37.62217276],
      [55.87214413, 37.62166851],
      [55.87217278, 37.62159072],
      [55.87226176, 37.62115889],
      [55.8722693, 37.62106501],
      [55.87227835, 37.62063318],
      [55.8724201, 37.62029522],
      [55.87266138, 37.61967294],
      [55.87289964, 37.61927061],
      [55.873533, 37.61861079],
      [55.87372602, 37.61839085],
      [55.87390094, 37.61826747],
      [55.87403062, 37.61812263],
      [55.87415427, 37.6181119],
      [55.87422816, 37.61833989],
      [55.87449054, 37.61824869],
      [55.87453427, 37.6179456],
      [55.87454935, 37.6179],
      [55.87465039, 37.61767738],
      [55.87488713, 37.61689954],
      [55.87501238, 37.61679897],
      [55.8750908, 37.61671314],
      [55.87516167, 37.61660585],
      [55.87534412, 37.6162813],
      [55.87547079, 37.61587093],
      [55.87569245, 37.61598626],
      [55.87596978, 37.6161354],
      [55.87606478, 37.61623464],
      [55.87609795, 37.61624269],
      [55.87634072, 37.61621319],
      [55.87660459, 37.616181],
      [55.8767207, 37.61613808],
      [55.87686093, 37.61601202],
      [55.87698909, 37.61576257],
      [55.87704941, 37.61565529],
      [55.8771067, 37.61556141],
      [55.87713837, 37.61554263],
      [55.87717456, 37.61556141],
      [55.87723789, 37.61566601],
      [55.87724542, 37.61570625],
      [55.8772409, 37.61575989],
      [55.87722884, 37.61606298],
      [55.87724241, 37.61612735],
      [55.87729518, 37.61622928],
      [55.87732685, 37.61626415],
      [55.87748064, 37.61629365],
      [55.87792092, 37.61616759],
      [55.87810638, 37.61611126],
      [55.87825565, 37.61604957],
      [55.8783039, 37.61605494],
      [55.8784004, 37.61609785],
      [55.87863411, 37.6160308],
      [55.87881202, 37.61606835],
      [55.87882559, 37.6161354],
      [55.87901105, 37.61614613],
      [55.87927792, 37.61622391],
      [55.8795478, 37.61640899],
      [55.87968048, 37.61667453],
      [55.87971818, 37.61708222],
      [55.87965485, 37.61729143],
      [55.87949352, 37.61735312],
      [55.87925078, 37.61728875],
      [55.87906382, 37.61713587],
      [55.87892812, 37.61692129],
      [55.87887987, 37.61640094],
      [55.87882408, 37.61612735]

    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );

  var startPoint = new ymaps.Placemark(
    [55.87064362, 37.62383037],
    {
      hintContent: "Экотропа вдоль реки Чермянка",

      // Тут контент карточки тропы
      balloonContent: `<a href="moskva/chermyanka/">
    <figure id="Chermyanka" class="catalog-item">
        <img src="moskva/chermyanka/img/for-slider.jpg" alt="Экотропа вдоль реки Чермянки" class="trail-img">
        <figcaption class="trail-info">
            <a href="moskva/chermyanka/" class="trail-title-link">
                <h2 id="color-letters-cot" class="black-color size-card-elem-h2" title="Экотропа вдоль реки Чермянки">
                    Вдоль реки Чермянки
                </h2>
            </a>
            <a href="moskva/chermyanka/" id="trail-location" class="trail-location-black"
                title="г. Москва, парк Чермянка">
                <p id="color-letters-cot" class="black-color size-card-elem-p">
                    г.&nbsp;Москва, парк &laquo;Чермянка&raquo;</p>
            </a>
            <div class="trail-spec">
                <a href="moskva/chermyanka/" class="trail-distance">
                    <div class="img-card-color">
                        <img src="/img/dist-orange.svg" alt="Длина тропы">
                    </div>
                    <p id="color-letters-cot" class="black-color">1,5 км</p>
                </a>
                <a href="moskva/chermyanka/" class="trail-difficulty">
                    <div id="easy" class="img-card-color">
                        <img src="/img/difficulty-easy.svg" alt="Сложность тропы">
                    </div>
                    <p id="color-letters-cot" class="black-color">Простая</p>
                </a>
                <a href="moskva/chermyanka/" class="trail-duration">
                    <div class="img-card-color">
                        <img src="/img/duration-orange.svg" alt="Длительность тропы">
                    </div>
                    <p id="color-letters-cot" class="black-color">~0,5 ч</p>
                </a>
            </div>
        </figcaption>
    </figure>
</a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [55.87882408, 37.61612735],
    {
      hintContent: "Конец экотропы",
      ////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );

  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);
  // .............................................................Абрау-Дюрсо
  var myPolyline1 = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      // 1 часть
      [44.7058777381504, 37.5860318421467],
      [44.7055104819157, 37.5860747576211],
      [44.7042900852769, 37.586243740067],
      [44.7032571304027, 37.58638321082],
      [44.7020979061547, 37.5865870607881],
      [44.701026649512, 37.5867909107563],
      [44.7007550117974, 37.586812362717],
      [44.7002576362699, 37.586855280776],
      [44.699633996971, 37.5869786638548],
      [44.6988305172765, 37.587118135971],
      [44.6985473914296, 37.5871878679952],
      [44.6981686061754, 37.5872898009693],
      [44.6980385172514, 37.5872790701685],
      [44.6979505214367, 37.5871503218391],
      [44.6979199060059, 37.5868338219441],
      [44.697923729901, 37.586517322049],
      [44.6980193941016, 37.5861632702555],
      [44.6980614690837, 37.5860667071397],
      [44.6980959135556, 37.5858628571715],
      [44.6980538245673, 37.585803854787],
      [44.6979581668599, 37.5857448524026],
      [44.6977171210494, 37.5856751146704],
      [44.6974263311876, 37.5856536505761],
      [44.697277112191, 37.5857823999916],
      [44.6970513563665, 37.5859916121621],
      [44.6966228325628, 37.5864422202802],
      [44.6964085587479, 37.5868016423628],
      [44.6960948097053, 37.5878369665224],
      [44.6959494087487, 37.5880676391094],
      [44.6958881947842, 37.5880944580978],
      [44.6956892177787, 37.5881212770862],
      [44.694185468071, 37.5878155080842],
      [44.694835953102, 37.588185664038],
      [44.6949048226727, 37.5882285716268],
      [44.6953448514159, 37.5886308999661],
      [44.6956547784477, 37.5890761510027],
      [44.6957389553882, 37.5891297912767],
      [44.6958001779039, 37.5891405220774],
      [44.6962899429677, 37.5891029740634],
      [44.6964238601882, 37.5890332285743],
      [44.6964850794203, 37.5889473983213],
      [44.6965386486881, 37.5888132926975],
      [44.6967682239601, 37.5878262437311],
      [44.696810308315, 37.5877833254646],
      [44.6968447523353, 37.5878476997084],
      [44.6968753626447, 37.5880247170997],
      [44.6970131042687, 37.5883197674909],
      [44.697154672384, 37.5885236100839],
      [44.6972885864697, 37.5886630922811],
      [44.6974339807239, 37.5887489225341],
      [44.697747726582, 37.5887811075858],
      [44.6986086061633, 37.5887167319055],
      [44.6987769615281, 37.5887596473798],
      [44.6991404301492, 37.5887274633281],
      [44.6998367719662, 37.5885879862709],
      [44.7005178014461, 37.5884109611334],
      [44.7006440598487, 37.5884485057773],
      [44.7008621371263, 37.5884002287653],
      [44.7022432925977, 37.5881749271043],
      [44.7034292981091, 37.5879979018023],
      [44.7046076210413, 37.5877511397779],
      [44.7049863717433, 37.5876760374064],
      [44.705395714874, 37.5875150973462],
      [44.7066046125388, 37.5868981901524],
      [44.7076757616871, 37.5864100289535],
      [44.7083107757347, 37.5860827975175],
      [44.7091523767427, 37.5856912011691],
      [44.709630552975, 37.5854229827778],

    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline1);
          },
        });
        return items;
      },
    }
  );

  var startPoint = new ymaps.Placemark(
    [44.7058777381504, 37.5860318421467],
    {
      hintContent: "Экотропа Абрау-Дюрсо",

      // Тут контент карточки тропы
      balloonContent: `<a href="krasnodarsky-krai/abrau-durso/"><figure id="AbrauDurso" class="catalog-item">
    <img src="krasnodarsky-krai/abrau-durso/img/for-slider.jpg" alt="Экотропа Абрау-Дюрсо" class="trail-img">
    <figcaption class="trail-info">
       <a href="krasnodarsky-krai/abrau-durso/" class="trail-title-link">
           <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
               title="Экотропа Абрау-Дюрсо">Экотропа Абрау-Дюрсо
           </h2>
       </a>
       <a href="krasnodarsky-krai/abrau-durso/" id="trail-location" class="trail-location-black"
           title="Краснодарский край, с. Абрау-Дюрсо">
           <p id="color-letters-cot" class="black-color size-card-elem-p">
            Краснодарский край, с.&nbsp;Абрау-Дюрсо</p>
       </a>
       <div class="trail-spec">
           <a href="krasnodarsky-krai/abrau-durso/" class="trail-distance">
               <div class="img-card-color">
                   <img src="../img/dist-orange.svg" alt="Длина тропы">
               </div>
               <p id="color-letters-cot" class="black-color">3,7 км</p>
           </a>
           <a href="krasnodarsky-krai/abrau-durso/" class="trail-difficulty">
               <div id="medium" class="img-card-color">
                   <img src="../img/difficulty-medium.svg" alt="Сложность тропы">
               </div>
               <p id="color-letters-cot" class="black-color">Средняя</p>
           </a>
           <a href="krasnodarsky-krai/abrau-durso/" class="trail-duration">
               <div class="img-card-color">
                   <img src="../img/duration-orange.svg" alt="Длительность тропы">
               </div>
               <p id="color-letters-cot" class="black-color">~1,5 ч</p>
           </a>
       </div>
    </figcaption>
    </figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [44.709630552975, 37.5854229827778],
    {
      hintContent: "Конец экотропы",
      ////balloonContent: "Это конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );

  // 2 часть
  var myPolyline2 = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      [44.7033322686655, 37.5880113109173],
      [44.7027966540336, 37.5883841413647],
      [44.7027010064734, 37.5884592437362],
      [44.7026933572114, 37.5884887360366],
      [44.7027010064734, 37.5885316643789],
      [44.7027335324414, 37.5885584833673],
      [44.7032117470114, 37.588673822257],
      [44.7034833780991, 37.588692594848],
      [44.7038315299994, 37.5886952831077],
      [44.7042580956333, 37.5885611600088],
      [44.7043193086033, 37.5885745776142],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline2);
          },
        });
        return items;
      },
    }
  );

  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline1).add(myPolyline2).add(startPoint).add(endPoint);
  // .............................................................Маркотх
  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин
      [44.5750880713317, 38.0963596218673],
      [44.5750343871652, 38.0965795594299],
      [44.5749960533355, 38.0969121561654],
      [44.5749692051398, 38.0970140812233],
      [44.5748350097244, 38.0972662076576],
      [44.5748120010126, 38.0974056784106],
      [44.5748273372022, 38.0976202603291],
      [44.5749040185458, 38.0980494137681],
      [44.5748810217966, 38.0982532604737],
      [44.5749078637821, 38.0984088328724],
      [44.574930863931, 38.0985536727094],
      [44.5749423726501, 38.0987521465647],
      [44.5748810217966, 38.0988004298564],
      [44.5745014164135, 38.0987360571544],
      [44.5744208966882, 38.0987897030859],
      [44.5742246322784, 38.0991827592377],
      [44.5737721728853, 38.100137629197],
      [44.5737184871531, 38.1003843877465],
      [44.5737184871531, 38.1007008946362],
      [44.5737530048227, 38.1009047413417],
      [44.5738209221087, 38.1010767198656],
      [44.5743884102532, 38.1018921125756],
      [44.5744650955518, 38.1019886701702],
      [44.5744804325636, 38.1020905947318],
      [44.5744382614385, 38.1022032485943],
      [44.5743500734093, 38.1022783514713],
      [44.5736026241614, 38.1025322537667],
      [44.5735105987028, 38.1025805278904],
      [44.5732498615997, 38.1029721358064],
      [44.5730428031274, 38.103090151607],
      [44.5727973891231, 38.1033101029793],
      [44.5725680030578, 38.1036274912767],
      [44.5723647727696, 38.103943987895],
      [44.5716151326071, 38.105571075071],
      [44.5712536571734, 38.1062391719143],
      [44.5710810983035, 38.1068721846827],
      [44.5710210125767, 38.1073768194654],
      [44.5710593620867, 38.1078864404643],
      [44.5714159662485, 38.1088627618977],
      [44.5715003260636, 38.1089271345997],
      [44.5715348409077, 38.1088681334247],
      [44.5715310090045, 38.1087447367492],
      [44.5714811563354, 38.1085301744138],
      [44.571335444247, 38.108122471352],
      [44.5713392760074, 38.1079615419827],
      [44.5713162721672, 38.1076986778312],
      [44.5713469469083, 38.1075431137086],
      [44.571358450439, 38.107344625418],
      [44.5715770211698, 38.1066204313362],
      [44.5717457386304, 38.1063039275552],
      [44.5718952898542, 38.106137641907],
      [44.5727764404593, 38.1049551081395],
      [44.573375002585, 38.1045126086746],
      [44.573688819223, 38.104373644017],
      [44.5739035434138, 38.1043199885981],
      [44.5744537257158, 38.1038242306972],
      [44.5749982143697, 38.1036042864563],
      [44.5752435953837, 38.1037008481421],
      [44.5753432938953, 38.1036847549031],
      [44.5754729227483, 38.1035026934571],
      [44.5755572778795, 38.1034544075353],
      [44.5765695159481, 38.1031218144063],
      [44.5766308732623, 38.103068172745],
      [44.576657707027, 38.1029608797284],
      [44.5766308732623, 38.1028428613371],
      [44.5763854784232, 38.102360073403],
      [44.5761170822821, 38.1014856707448],
      [44.5761132520803, 38.1013140141427],
      [44.5762205967565, 38.1011047862363],
      [44.577299601796, 38.1007030069657],
      [44.5773916247413, 38.1006010868538],
      [44.5774491374044, 38.1004025973153],
      [44.5776473797286, 38.0992356545314],
      [44.5777458851976, 38.0989654617801],
      [44.5778800912737, 38.0987186920411],
      [44.5779951117435, 38.0986596785104],
      [44.5785612113636, 38.0986498379035],
      [44.5786800669424, 38.0986713034486],
      [44.5788320162911, 38.0987283202297],
      [44.5791655886311, 38.0988731578206],
      [44.5798096961654, 38.0993023080591],
      [44.5799899001858, 38.0994525179185],
      [44.5803092087438, 38.0996462373961],
      [44.5803628882563, 38.099748173484],
      [44.5803092087438, 38.0998232746484],
      [44.5801481868126, 38.0998018091033],
      [44.5797916279073, 38.0996355102547],
      [44.5795999319724, 38.0995174971642],
      [44.5791820216863, 38.0994048382375],
      [44.5788391554672, 38.0994306463002],
      [44.5786359583544, 38.099489659831],
      [44.5784289209356, 38.0995969480325],
      [44.5783714106424, 38.0998276226405],
      [44.5783867404887, 38.1001387554243],
      [44.5784442521955, 38.1003372449629],
      [44.5787433147134, 38.1011472660748],
      [44.5788468334892, 38.1016568935455],
      [44.5787866932653, 38.101829987038],
      [44.5786409941604, 38.1019909174856],
      [44.5785221415295, 38.1020928496342],
      [44.5784722878395, 38.1022108680255],
      [44.5785029622386, 38.1023288864168],
      [44.5790435734521, 38.102859957355],
      [44.579139419128, 38.103047712681],
      [44.5791585923503, 38.1032837503766],
      [44.5791563471314, 38.1039027823275],
      [44.5791946891454, 38.1039296071933],
      [44.5792406965301, 38.1039027823275],
      [44.5792598697524, 38.1037901313446],
      [44.5796586147361, 38.1025992253031],
      [44.5797621322571, 38.1023685572024],
      [44.5799230943405, 38.1021799608057],
      [44.5800764475828, 38.1020512234772],
      [44.5801377903091, 38.1020351250951],
      [44.5802067983391, 38.1021263159604],

    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );

  var startPoint = new ymaps.Placemark(
    [44.5750880713317, 38.0963596218673],
    {
      hintContent: "Экотропа Терренкур Маркотх",

      // Тут контент карточки тропы
      balloonContent: `<a href="krasnodarsky-krai/terrenkur-markoth/"><figure id="TerrenkurMarkoth" class="catalog-item">
    <img src="krasnodarsky-krai/terrenkur-markoth/img/for-slider.jpg" alt="Экотропа Терренкур Маркотх" class="trail-img">
    <figcaption class="trail-info">
       <a href="krasnodarsky-krai/terrenkur-markoth/" class="trail-title-link">
           <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
               title="Экотропа Терренкур Маркотх">Терренкур Маркотх
           </h2>
       </a>
       <a href="krasnodarsky-krai/terrenkur-markoth/" id="trail-location" class="trail-location-black"
           title="Краснодарский край, г. Геленджик">
           <p id="color-letters-cot" class="black-color size-card-elem-p">
            Краснодарский край, г.&nbsp;Геленджик</p>
       </a>
       <div class="trail-spec">
           <a href="krasnodarsky-krai/terrenkur-markoth/" class="trail-distance">
               <div class="img-card-color">
                   <img src="../img/dist-orange.svg" alt="Длина тропы">
               </div>
               <p id="color-letters-cot" class="black-color">3,8 км</p>
           </a>
           <a href="krasnodarsky-krai/terrenkur-markoth/" class="trail-difficulty">
               <div id="medium" class="img-card-color">
                   <img src="../img/difficulty-medium.svg" alt="Сложность тропы">
               </div>
               <p id="color-letters-cot" class="black-color">Средняя</p>
           </a>
           <a href="krasnodarsky-krai/terrenkur-markoth/" class="trail-duration">
               <div class="img-card-color">
                   <img src="../img/duration-orange.svg" alt="Длительность тропы">
               </div>
               <p id="color-letters-cot" class="black-color">~1,5 ч</p>
           </a>
       </div>
    </figcaption>
    </figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  // Координаты конца
  var endPoint = new ymaps.Placemark(
    [44.5802067983391, 38.1021263159604],
    {
      hintContent: "Конец экотропы",
      ////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );

  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);
  // .............................................................Швейцария (Нижний)
  var myPolyline1 = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      // 1 часть
      [56.28243035, 43.97982802],
      [56.28248369, 43.97894893],
      [56.28249849, 43.97870348],
      [56.28251428, 43.97833403],
      [56.28296746, 43.97839036],
      [56.28343892, 43.97844936],
      [56.28396259, 43.97852313],
      [56.28432214, 43.97856872],
      [56.28478314, 43.97862572],
      [56.28480925, 43.97757966],
      [56.28482118, 43.97709217],
      [56.28482596, 43.97702694],
      [56.28483372, 43.97696038],
      [56.2848399, 43.97689097],
      [56.28484608, 43.97661705],
      [56.28499866, 43.97665411],
      [56.28507829, 43.97666019],
      [56.28515975, 43.97664522],
      [56.28518846, 43.9766365],
      [56.28521159, 43.97661839],
      [56.28524031, 43.97658654],
      [56.28527294, 43.97654111],
      [56.28530259, 43.97648697],
      [56.28532199, 43.97643835],
      [56.28536525, 43.97629854],
      [56.28536935, 43.97626837],
      [56.28537327, 43.97622511],
      [56.28537299, 43.97617331],
      [56.28537234, 43.97614096],
      [56.2853673, 43.97611581],
      [56.28535509, 43.97609721],
      [56.28530459, 43.97604544],
      [56.28521569, 43.97595723],
      [56.28513811, 43.97588615],
      [56.28509657, 43.97586286],
      [56.28495246, 43.9758125],
      [56.28489708, 43.97579243],
      [56.2848595, 43.97578624],
      [56.28481997, 43.97578691],
      [56.28479316, 43.97579],
      [56.28476857, 43.97579975],
      [56.28472452, 43.97582518],
      [56.28469094, 43.97585131],
      [56.28466668, 43.97588146],
      [56.2846001, 43.97599646],
      [56.28454994, 43.97611146],
      [56.28447832, 43.97623517],
      [56.28442984, 43.9763428],
      [56.28441753, 43.97638839],
      [56.28441026, 43.9764293],
      [56.28440559, 43.9764702],
      [56.28440489, 43.97649991],
      [56.28440827, 43.97653022],
      [56.28441369, 43.97655657],
      [56.28442848, 43.97658111],
      [56.2845298, 43.97671764],
      [56.28461749, 43.97684477],
      [56.28465511, 43.97689131],
      [56.2847478, 43.97697211],
      [56.28482333, 43.97705828],
      [56.28480291, 43.9770628],
      [56.28476831, 43.97706331],
      [56.28474724, 43.97708845],
      [56.28473512, 43.97711997],
      [56.28472262, 43.97717428],
      [56.28470901, 43.97728157],
      [56.28469689, 43.9773151],
      [56.28468085, 43.97733387],
      [56.28466206, 43.97734455],
      [56.28464745, 43.9773479],
      [56.28456709, 43.97731979],
      [56.28452234, 43.97732449],
      [56.28450369, 43.97733454],
      [56.28444364, 43.97738182],
      [56.28439403, 43.97741769],
      [56.28430452, 43.9774539],
      [56.28419076, 43.97747201],
      [56.28415327, 43.97746798],
      [56.28407178, 43.9774425],
      [56.28387074, 43.97732046],
      [56.28384482, 43.97730571],
      [56.28378011, 43.97727755],
      [56.28373796, 43.97727621],
      [56.2836932, 43.97729029],
      [56.28356905, 43.9773931],
      [56.28350335, 43.97745457],
      [56.28344279, 43.9775102],
      [56.28335416, 43.97757527],
      [56.28323033, 43.97761953],
      [56.28319676, 43.9776202],
      [56.28315647, 43.97760679],
      [56.28303339, 43.97751626],
      [56.28294051, 43.97747201],
      [56.28289314, 43.97748408],
      [56.28284801, 43.97750956],
      [56.28278931, 43.97755703],
      [56.28273418, 43.97758426],
      [56.28271411, 43.977586],
      [56.28268762, 43.97757728],
      [56.28266077, 43.9775565],
      [56.282641, 43.97752699],
      [56.28261638, 43.97745457],
      [56.28260668, 43.97740495],
      [56.28259139, 43.97736002],
      [56.28258225, 43.9773503],
      [56.28256304, 43.97734326],
      [56.2825526, 43.97721787],
      [56.28254458, 43.97716791],
      [56.28252901, 43.97710672],
      [56.28249628, 43.97700128],
      [56.28244517, 43.97684108],
      [56.28242093, 43.97674184],
      [56.28236386, 43.97641595],
      [56.28235789, 43.97636197],
      [56.28235509, 43.97632023],
      [56.28235827, 43.97627715],
      [56.28237223, 43.97622198],
      [56.28256714, 43.97561464],
      [56.28257684, 43.97557776],
      [56.28258654, 43.97552211],
      [56.28259064, 43.97547651],
      [56.28259139, 43.97542421],
      [56.28256863, 43.97483144],
      [56.28256826, 43.97475701],
      [56.28257162, 43.97469733],
      [56.282583, 43.9746115],
      [56.28259474, 43.97454176],
      [56.28264902, 43.97438418],
      [56.28265778, 43.97433724],
      [56.28266412, 43.97428226],
      [56.28266319, 43.97414781],
      [56.28265666, 43.97408646],
      [56.28264902, 43.97403717],
      [56.28263176, 43.97397095],
      [56.28261153, 43.97391681],
      [56.28238656, 43.97390143],
      [56.28232576, 43.97389607],
      [56.28190278, 43.97386925],
      [56.28138431, 43.9738384],
      [56.28135167, 43.97385315],
      [56.2812959, 43.97388936],
      [56.28124667, 43.97395038],
      [56.28122261, 43.97399531],
      [56.28120125, 43.97406136],
      [56.28119034, 43.97411131],
      [56.28116125, 43.97436344],
      [56.28113215, 43.97462697],
      [56.28110007, 43.97488379],
      [56.28108068, 43.97500583],
      [56.28102883, 43.97530758],
      [56.28100831, 43.97540548],
      [56.28094528, 43.97538402],
      [56.28094904, 43.97517047],
      [56.28097776, 43.97468767],
      [56.28097739, 43.97462128],
      [56.28097068, 43.97455155],
      [56.28094979, 43.97438994],
      [56.28091193, 43.97420956],
      [56.28088526, 43.97411904],
      [56.28079312, 43.97412239],
      [56.28075843, 43.9741177],
      [56.28073866, 43.97410496],
      [56.28072188, 43.97409155],
      [56.28070975, 43.97406607],
      [56.28070108, 43.97403857],
      [56.28069465, 43.97400572],
      [56.28068914, 43.97394654],
      [56.28068364, 43.97384579],
      [56.28067711, 43.97378779],
      [56.28066406, 43.97369659],
      [56.2806469, 43.97361344],
      [56.28063403, 43.97356919],
      [56.28062377, 43.97355041],
      [56.28060941, 43.97353432],
      [56.2805903, 43.97352761],
      [56.28057267, 43.97352493],
      [56.28050689, 43.9735389],
      [56.28039512, 43.97357321],
      [56.2803235, 43.97360942],
      [56.28025337, 43.97365636],
      [56.28018996, 43.97372207],
      [56.28013177, 43.97381595],
      [56.28004896, 43.9739675],
      [56.27991019, 43.97417403],
      [56.27985983, 43.97422298],
      [56.27980313, 43.97426254],
      [56.27972368, 43.97428534],
      [56.27970428, 43.97428869],
      [56.2796689, 43.97428959],
      [56.27959862, 43.97427141],
      [56.27932753, 43.97419079],
      [56.27921413, 43.97413916],
      [56.27913318, 43.97409825],
      [56.27909905, 43.97407914],
      [56.27906818, 43.97406221],
      [56.27904267, 43.9740457],
      [56.27902408, 43.97402375],
      [56.27900548, 43.97399643],
      [56.27897878, 43.97394013],
      [56.27894835, 43.97384427],
      [56.27889457, 43.97367468],
      [56.27883936, 43.97355196],
      [56.27874909, 43.97340176],
      [56.27866031, 43.97325156],
      [56.27863681, 43.97321568],
      [56.27860734, 43.97318249],
      [56.27852819, 43.97313691],
      [56.27845104, 43.97310471],
      [56.27843549, 43.97310166],
      [56.27840683, 43.97310422],
      [56.27819401, 43.97317109],
      [56.27816231, 43.97317981],
      [56.27812985, 43.97319657],
      [56.27809553, 43.97323613],
      [56.27798064, 43.97342322],
      [56.27794482, 43.97348759],
      [56.27790752, 43.97358415],
      [56.27786164, 43.973731],
      [56.27785529, 43.97376118],
      [56.27783552, 43.97385036],
      [56.27782769, 43.97391406],
      [56.27782545, 43.97397575],
      [56.27783702, 43.97404616],
      [56.27787078, 43.97414641],
      [56.27790752, 43.97424129],
      [56.27802689, 43.97451756],
      [56.27813657, 43.97476432],
      [56.27816716, 43.97486625],
      [56.27817797, 43.97491537],
      [56.27819447, 43.97500803],
      [56.27820426, 43.97505376],
      [56.27822632, 43.97514702],
      [56.27825062, 43.97523493],
      [56.27827118, 43.97528059],
      [56.27836636, 43.97542817],
      [56.27884345, 43.97612291],
      [56.27891024, 43.97618723],
      [56.27905572, 43.97626971],
      [56.27909172, 43.9762905],
      [56.27913667, 43.97632134],
      [56.27915998, 43.9763428],
      [56.27917733, 43.97639108],
      [56.2791915, 43.97634347],
      [56.27927581, 43.97535039],
      [56.27948508, 43.97548383],
      [56.27988458, 43.97574065],
      [56.28022776, 43.97596059],
      [56.28032922, 43.97576747],
      [56.28038294, 43.97569237],
      [56.28043964, 43.97563604],
      [56.28050413, 43.97559592],
      [56.28068359, 43.97551534],
      [56.28082906, 43.97545097],
      [56.28088445, 43.97542727],
      [56.28094432, 43.97539017],
      [56.28100773, 43.97541095],
      [56.28099842, 43.97550286],
      [56.28099543, 43.97557828],
      [56.2809999, 43.97580122],
      [56.28099878, 43.97630078],
      [56.28099803, 43.97703637],
      [56.28099729, 43.97728582],
      [56.2809958, 43.9780241],
      [56.28102153, 43.97803281],
      [56.28103645, 43.97804891],
      [56.28104914, 43.97807238],
      [56.28105734, 43.97810792],
      [56.28105995, 43.97813273],
      [56.28105884, 43.97816558],
      [56.28105622, 43.97818067],
      [56.28105212, 43.97819308],
      [56.28104168, 43.97822057],
      [56.28102564, 43.97824203],
      [56.28101184, 43.97825477],
      [56.28099542, 43.97825678],
      [56.28099542, 43.97898433],
      [56.28101295, 43.97898969],
      [56.28102788, 43.97899774],
      [56.28104373, 43.97901886],
      [56.2810565, 43.97904082],
      [56.28106368, 43.97906882],
      [56.2810663, 43.97909832],
      [56.28106741, 43.97912112],
      [56.28200478, 43.97924383],
      [56.28201297, 43.97983141],
      [56.28222894, 43.97983677],
      [56.28235911, 43.97986829],
      [56.28242662, 43.97990651],

    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline1);
          },
        });
        return items;
      },
    }
  );

  var startPoint = new ymaps.Placemark(
    [56.2824303484431, 43.9798280204902],
    {
      hintContent: "Экотропа в парке Швейцария",

      // Тут контент карточки тропы
      balloonContent: `<a href="nizhegorodskaya-oblast/v-parke-shveitsaria/"><figure id="Shveitsaria" class="catalog-item">
  <img src="nizhegorodskaya-oblast/v-parke-shveitsaria/img/for-slider.jpg" alt="Экотропа в парке Швейцария" class="trail-img">
  <figcaption class="trail-info">
      <a href="nizhegorodskaya-oblast/v-parke-shveitsaria/" class="trail-title-link">
          <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
              title="Экотропа в парке Швейцария">В парке Швейцария
          </h2>
      </a>
      <a href="nizhegorodskaya-oblast/v-parke-shveitsaria/" id="trail-location" class="trail-location-black"
          title='г. Нижний Новгород, парк Швейцария'>
          <p id="color-letters-cot" class="black-color size-card-elem-p">
          г.&nbsp;Нижний Новгород, парк &laquo;Швейцария&raquo;</p>
      </a>
      <div class="trail-spec">
          <a href="nizhegorodskaya-oblast/v-parke-shveitsaria/" class="trail-distance">
              <div class="img-card-color">
                  <img src="/img/dist-orange.svg" alt="Длина тропы">
              </div>
              <p id="color-letters-cot" class="black-color">3 км</p>
          </a>
          <a href="nizhegorodskaya-oblast/v-parke-shveitsaria/" class="trail-difficulty">
              <div id="easy" class="img-card-color">
                  <img src="/img/difficulty-easy.svg" alt="Сложность тропы">
              </div>
              <p id="color-letters-cot" class="black-color">Простая</p>
          </a>
          <a href="/nizhegorodskaya-oblast/v-parke-shveitsaria/" class="trail-duration">
              <div class="img-card-color">
                  <img src="/img/duration-orange.svg" alt="Длительность тропы">
              </div>
              <p id="color-letters-cot" class="black-color">~1 ч</p>
          </a>
      </div>
  </figcaption>
 </figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [56.282426616788, 43.9799011512614],
    {
      hintContent: "Конец экотропы",
      ////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );

  // 2 часть
  var myPolyline2 = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      [56.27908114, 43.97407311],
      [56.27910656, 43.97442191],
      [56.27912926, 43.97458944],
      [56.27913607, 43.97469622],
      [56.27914512, 43.97480301],
      [56.27915491, 43.97490275],
      [56.27916843, 43.9749911],
      [56.27921582, 43.97520432],
      [56.2792231, 43.97524186],
      [56.2792356, 43.97528879],
      [56.27925721, 43.97533107],
      [56.27927661, 43.97535185],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline2);
          },
        });
        return items;
      },
    }
  );

  // 3 часть
  var myPolyline3 = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      [56.28486076, 43.97578864],
      [56.28485293, 43.97633447],
      [56.28519121, 43.9763177],
      [56.2852203, 43.9762312],
      [56.28529937, 43.97604747],

    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline2);
          },
        });
        return items;
      },
    }
  );

  // 4 часть
  var myPolyline4 = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      [56.28536016, 43.97630965],
      [56.28485286, 43.97633424],
      [56.28484652, 43.97661722],

    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline2);
          },
        });
        return items;
      },
    }
  );

  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline1).add(myPolyline2).add(myPolyline3).add(myPolyline4).add(startPoint).add(endPoint);

  // .............................................................Природа чувств (Переславль)
  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.

      [56.7168443420214, 38.8297225056264],
      [56.7167669085049, 38.8295461503837],
      [56.7167481032017, 38.8295481620404],
      [56.7167281893818, 38.8295615657784],
      [56.7167079061838, 38.8295635828978],
      [56.7166850509575, 38.8295407887873],
      [56.7166666058347, 38.8295139599737],
      [56.7166526038669, 38.8294871407893],
      [56.7166319495195, 38.8294650141518],
      [56.7166183122622, 38.8294609862089],
      [56.7166057683219, 38.8294737262728],
      [56.7165895470074, 38.8294723876958],
      [56.7165766402841, 38.8293476695146],
      [56.7165519425433, 38.8293107884189],
      [56.7165364515014, 38.8292752483401],
      [56.7165272253199, 38.8292423898981],
      [56.7165253852976, 38.8292242877599],
      [56.7165305486859, 38.8291679556337],
      [56.7165419791567, 38.8291263796282],
      [56.7165284475431, 38.829104188647],
      [56.716511493902, 38.8290807186546],
      [56.7164768318293, 38.8290592555576],
      [56.7164451225921, 38.829042497231],
      [56.7164123007827, 38.8290263966437],
      [56.7163621492608, 38.8289419102677],
      [56.716353672623, 38.8289264918968],
      [56.7163308117782, 38.8289177739296],
      [56.7162721831133, 38.8288983293595],
      [56.7162401018498, 38.8287353765586],
      [56.7162221039231, 38.8287037423138],
      [56.7162044044426, 38.8286554610516],
      [56.7161822700054, 38.8286118737865],
      [56.7161682576677, 38.8285944387623],
      [56.7161516690054, 38.8285662664624],
      [56.7161339681223, 38.8285280485476],
      [56.7160886051547, 38.8285173207418],
      [56.7160701757647, 38.8284556268931],
      [56.7160377347593, 38.8283537147367],
      [56.7160211361795, 38.8283134682824],
      [56.7160060183469, 38.8282517821583],
      [56.7160012231682, 38.828214895302],
      [56.7159706249441, 38.8281672892954],
      [56.7159488572197, 38.828288657837],
      [56.7159112471893, 38.828323528158],
      [56.7158581503321, 38.8283570592942],
      [56.7158301315375, 38.8283865723454],
      [56.7158375001613, 38.828426800796],
      [56.7158824873346, 38.8284965437655],
      [56.7158692090307, 38.828585048805],
      [56.7159252645071, 38.8287593942545],
      [56.7159591943094, 38.8288291282682],
      [56.7160100714322, 38.8288117033207],
      [56.7160307203121, 38.8288854627862],
      [56.716108889108, 38.8290651588028],
      [56.7161258647616, 38.8291134392445],
      [56.7161678936772, 38.829121490436],
      [56.716189281803, 38.829140269391],
      [56.716209192258, 38.8292448681358],
      [56.7162202462244, 38.8293803238656],
      [56.716216574199, 38.829432627399],
      [56.7162482803078, 38.8295050459724],
      [56.7162844144862, 38.8295425976566],
      [56.7163537359734, 38.8295828286366],
      [56.7163972532904, 38.8296820710778],
      [56.7164186279722, 38.8297625425154],
      [56.7164208532481, 38.8298282538113],
      [56.7164355934313, 38.8298966464131],
      [56.716479836983, 38.8299502881231],
      [56.7165203972537, 38.829912736439],
      [56.7166037364982, 38.8297933818453],
      [56.7166642076366, 38.8297303498313],
      [56.7167040349147, 38.8296954804263],
      [56.7167460663826, 38.8296753744533],
      [56.7167910504586, 38.8296941413465],
      [56.7168408320081, 38.8297142579607],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );

  var startPoint = new ymaps.Placemark(
    [56.7168443420214, 38.8297225056264],
    {
      hintContent: "Экотропа Природа Чувств",

      // Тут контент карточки тропы
      balloonContent: `<a href="yaroslavskaya-oblast/priroda-chuvstv/"><figure id="PrirodaChuvstv" class="catalog-item">
<img src="yaroslavskaya-oblast/priroda-chuvstv/img/for-slider.jpg" alt="Экотропа Природа Чувств" class="trail-img">
<figcaption class="trail-info">
   <a href="yaroslavskaya-oblast/priroda-chuvstv/" class="trail-title-link">
       <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
           title="Экотропа Природа Чувств">Природа Чувств
       </h2>
   </a>
   <a href="yaroslavskaya-oblast/priroda-chuvstv/" id="trail-location" class="trail-location-black"
       title="Ярославская область, г. Переславль-Залесский">
       <p id="color-letters-cot" class="black-color size-card-elem-p">
       Ярославская область, г.&nbsp;Переславль-Залесский</p>
   </a>
   <div class="trail-spec">
       <a href="yaroslavskaya-oblast/priroda-chuvstv/" class="trail-distance">
           <div class="img-card-color">
               <img src="/img/dist-orange.svg" alt="Длина тропы">
           </div>
           <p id="color-letters-cot" class="black-color">0,5 км</p>
       </a>
       <a href="yaroslavskaya-oblast/priroda-chuvstv/" class="trail-difficulty">
           <div id="easy" class="img-card-color">
               <img src="/img/difficulty-easy.svg" alt="Сложность тропы">
           </div>
           <p id="color-letters-cot" class="black-color">Простая</p>
       </a>
       <a href="yaroslavskaya-oblast/priroda-chuvstv/" class="trail-duration">
           <div class="img-card-color">
               <img src="/img/duration-orange.svg" alt="Длительность тропы">
           </div>
           <p id="color-letters-cot" class="black-color">~0,5 ч</p>
       </a>
   </div>
</figcaption>
</figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [56.7168408320081, 38.8297142579607],
    {
      hintContent: "Конец экотропы",
      ////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );

  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

  // .............................................................Тропа сказок (Переславль)
  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.

      [56.7183216407628, 38.8295527911489],
      [56.7179912697353, 38.8305666661566],
      [56.7176012210727, 38.8306650256868],
      [56.7174360327463, 38.8305738305803],
      [56.7172796931235, 38.8305523729082],
      [56.7169329110214, 38.8306111764119],
      [56.7166320263711, 38.830450243871],
      [56.7164491345203, 38.830450243871],
      [56.7163783374351, 38.8306111764119],
      [56.7152337659914, 38.8287872742818],
      [56.7150228072771, 38.8288267572046],
      [56.7149785574298, 38.8287999351144],
      [56.7148723575831, 38.8285799939752],
      [56.7148222075508, 38.8285853583933],
      [56.7146481569179, 38.8291110713602],
      [56.7145685063586, 38.8291539867044],
      [56.714217451861, 38.830339523089],
      [56.7140699489959, 38.8306828458429],
      [56.7134150292614, 38.8323350865961],
      [56.7138870446367, 38.83267840935],
      [56.7142410522655, 38.8328822572351],
      [56.7143885544496, 38.8329144437432],
      [56.7146983071613, 38.8328339774728],
      [56.7149166075339, 38.8327803332925],
      [56.7152086560431, 38.8326676805139],
      [56.7153007178289, 38.8326014629508],
      [56.715333167443, 38.8325424543525],
      [56.7155898134004, 38.8317753425742],
      [56.7156606119759, 38.8316787830497],
      [56.7157425714151, 38.8316511868847],
      [56.7160788620853, 38.831699466647],
      [56.7161437599373, 38.8316082715405],
      [56.7163723764675, 38.8306024431599],

    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );

  var startPoint = new ymaps.Placemark(
    [56.7183216407628, 38.8295527911489],
    {
      hintContent: "Экотропа Тропа Сказок",

      // Тут контент карточки тропы
      balloonContent: `<a href="yaroslavskaya-oblast/tropa-skazok/"><figure id="TropaSkazok" class="catalog-item">
<img src="yaroslavskaya-oblast/tropa-skazok/img/for-slider.jpg" alt="Экотропа Тропа Сказок" class="trail-img">
<figcaption class="trail-info">
   <a href="yaroslavskaya-oblast/tropa-skazok/" class="trail-title-link">
       <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
           title="Экотропа Тропа Сказок">Тропа Сказок
       </h2>
   </a>
   <a href="yaroslavskaya-oblast/tropa-skazok/" id="trail-location" class="trail-location-black"
       title="Ярославская область, г. Переславль-Залесский">
       <p id="color-letters-cot" class="black-color size-card-elem-p">
       Ярославская область, г.&nbsp;Переславль-Залесский</p>
   </a>
   <div class="trail-spec">
       <a href="yaroslavskaya-oblast/tropa-skazok/" class="trail-distance">
           <div class="img-card-color">
               <img src="/img/dist-orange.svg" alt="Длина тропы">
           </div>
           <p id="color-letters-cot" class="black-color">1,5 км</p>
       </a>
       <a href="yaroslavskaya-oblast/tropa-skazok/" class="trail-difficulty">
           <div id="easy" class="img-card-color">
               <img src="/img/difficulty-easy.svg" alt="Сложность тропы">
           </div>
           <p id="color-letters-cot" class="black-color">Простая</p>
       </a>
       <a href="yaroslavskaya-oblast/tropa-skazok/" class="trail-duration">
           <div class="img-card-color">
               <img src="/img/duration-orange.svg" alt="Длительность тропы">
           </div>
           <p id="color-letters-cot" class="black-color">~0,5 ч</p>
       </a>
   </div>
</figcaption>
</figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [56.7183216407628, 38.8295527911489],
    {
      hintContent: "Конец экотропы",
      ////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );

  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

  // .............................................................На террасах Воробьёвых гор (Мск)
  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.

      [55.7080821050252, 37.5535229485549],
      [55.7081487392273, 37.5534625988521],
      [55.7081540396703, 37.55344114118],
      [55.7081918999564, 37.5532453399219],
      [55.7082835216963, 37.5530790429629],
      [55.7082948797482, 37.5530481975593],
      [55.7083077521968, 37.5528684895553],
      [55.7083168386329, 37.5528188686885],
      [55.7083781720213, 37.5527048748054],
      [55.7083857440378, 37.5526807349242],
      [55.708387258441, 37.552547965578],
      [55.7083940732481, 37.5525130968608],
      [55.7085076532952, 37.5523467999019],
      [55.7085795871473, 37.5521335642852],
      [55.7085947311005, 37.5520101826705],
      [55.7085924595079, 37.5516293089904],
      [55.7085841303339, 37.5515220206298],
      [55.7084183036735, 37.5507669787921],
      [55.7084357192727, 37.5506368916549],
      [55.7084342048714, 37.5506033640422],
      [55.7083236534212, 37.5502506535567],
      [55.7083175957922, 37.5500924032248],
      [55.7080858910063, 37.5500642400301],
      [55.7080639319851, 37.5500736277617],
      [55.7080518166576, 37.5501058142699],
      [55.7080450017843, 37.5501567762411],
      [55.7080399098989, 37.5507774582375],
      [55.7080505108138, 37.5508311024178],
      [55.70811714507, 37.5509813061226],
      [55.7081315319905, 37.5510000815857],
      [55.7081663634753, 37.5510081282128],
      [55.7083295409783, 37.5510215392578],
      [55.7083723228904, 37.5510269036758],
      [55.7083662652877, 37.5510651251543],
      [55.7083155327357, 37.5513273110856],
      [55.7082443555873, 37.5515552988518],
      [55.7081777215427, 37.5523183873165],
      [55.7081285031394, 37.5529808929432],
      [55.7080770130511, 37.5535106292236],

    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );

  var startPoint = new ymaps.Placemark(
    [55.7080821050252, 37.5535229485549],
    {
      hintContent: "Экотропа на террасах Воробьёвых гор",

      // Тут контент карточки тропы
      balloonContent: `<a href="moskva/na-terrasah-vorobiovyh-gor/"><figure id="NaTerrasahVorobiovyhGor" class="catalog-item">
<img src="moskva/na-terrasah-vorobiovyh-gor/img/for-slider.jpg" alt="Экотропа на террасах Воробьевых гор" class="trail-img">
<figcaption class="trail-info">
   <a href="moskva/na-terrasah-vorobiovyh-gor/" class="trail-title-link">
       <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
           title="Экотропа на террасах Воробьевых гор">На террасах Воробьёвых гор
       </h2>
   </a>
   <a href="moskva/na-terrasah-vorobiovyh-gor/" id="trail-location" class="trail-location-black"
       title="г. Москва, Воробьёвы горы">
       <p id="color-letters-cot" class="black-color size-card-elem-p">
       г.&nbsp;Москва, Воробьёвы горы</p>
   </a>
   <div class="trail-spec">
       <a href="moskva/na-terrasah-vorobiovyh-gor/" class="trail-distance">
           <div class="img-card-color">
               <img src="/img/dist-orange.svg" alt="Длина тропы">
           </div>
           <p id="color-letters-cot" class="black-color">0,5 км</p>
       </a>
       <a href="moskva/na-terrasah-vorobiovyh-gor/" class="trail-difficulty">
           <div id="easy" class="img-card-color">
               <img src="/img/difficulty-easy.svg" alt="Сложность тропы">
           </div>
           <p id="color-letters-cot" class="black-color">Простая</p>
       </a>
       <a href="moskva/na-terrasah-vorobiovyh-gor/" class="trail-duration">
           <div class="img-card-color">
               <img src="/img/duration-orange.svg" alt="Длительность тропы">
           </div>
           <p id="color-letters-cot" class="black-color">~0,5 ч</p>
       </a>
   </div>
</figcaption>
</figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [55.7080770130511, 37.5535106292236],
    {
      hintContent: "Конец экотропы",
      ////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );

  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

  // .............................................................К андреевским прудам (Мск)
  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.

      [55.70801509, 37.56007626],
      [55.70804008, 37.56133488],
      [55.70808572, 37.56175627],
      [55.70813132, 37.5620631],
      [55.70816161, 37.56225756],
      [55.70820667, 37.56243727],
      [55.70823468, 37.56275109],
      [55.70822976, 37.56286978],
      [55.70822563, 37.56309503],
      [55.70823519, 37.56348261],
      [55.70824415, 37.56371937],
      [55.70825929, 37.56412639],
      [55.7084077, 37.56435371],
      [55.70842209, 37.56439461],
      [55.70846222, 37.56468228],
      [55.70852734, 37.56490893],
      [55.70857164, 37.56539172],
      [55.70858564, 37.56544134],
      [55.70877494, 37.5658021],
      [55.70891351, 37.56620711],
      [55.70911492, 37.56669796],
      [55.70920048, 37.56690784],
      [55.70925879, 37.56718009],
      [55.70932504, 37.56748921],
      [55.7094053, 37.56785734],
      [55.70951661, 37.56837233],
      [55.7095768, 37.56864725],
      [55.70968319, 37.56905093],
      [55.709736, 37.56924539],
      [55.7097873, 37.56940096],
      [55.7098986, 37.56972886],
      [55.7100065, 37.569869],
      [55.7101284, 37.56994276],
      [55.71011099, 37.5701285],
      [55.71022684, 37.57076084],
      [55.7103476, 37.57142066],
      [55.71042976, 37.5717908],
      [55.71045815, 37.57191419],
      [55.71053538, 37.57217101],
      [55.71081466, 37.57214994],
      [55.71083037, 37.57212178],
      [55.71094629, 37.57199287],
      [55.71099967, 37.57193185],
      [55.71105116, 37.57187485],
      [55.71106516, 37.571844],
      [55.71106592, 37.57181115],
      [55.71089329, 37.57118351],
      [55.71060481, 37.57012203],
      [55.71055787, 37.56995305],
      [55.71051774, 37.56988063],
      [55.71049313, 37.56984777],
      [55.71044998, 37.56982028],
      [55.71042385, 37.56978943],
      [55.71039357, 37.56970427],
      [55.71029589, 37.56940454],
      [55.71020882, 37.56914302],
      [55.71009221, 37.56878629],
      [55.7099794, 37.56843626],
      [55.70993169, 37.5682941],
      [55.70987188, 37.5681097],
      [55.70966441, 37.56750017],
      [55.70953039, 37.56710722],
      [55.70948799, 37.56689801],
      [55.70919912, 37.56690136],

    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );

  var startPoint = new ymaps.Placemark(
    [55.70801509, 37.56007626],
    {
      hintContent: "Экотропа к Андреевским прудам",

      // Тут контент карточки тропы
      balloonContent: `<a href="moskva/k-andreevskim-prudam/"><figure id="KAndreevskimPrudam" class="catalog-item">
<img src="moskva/k-andreevskim-prudam/img/for-slider.jpg" alt="Экотропа к Андреевским прудам" class="trail-img">
<figcaption class="trail-info">
   <a href="moskva/k-andreevskim-prudam/" class="trail-title-link">
       <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
           title="Экотропа к Андреевским прудам">К Андреевским прудам
       </h2>
   </a>
   <a href="moskva/k-andreevskim-prudam/" id="trail-location" class="trail-location-black"
       title="г. Москва, Воробьёвы горы">
       <p id="color-letters-cot" class="black-color size-card-elem-p">
       г.&nbsp;Москва, Воробьёвы горы</p>
   </a>
   <div class="trail-spec">
       <a href="moskva/k-andreevskim-prudam/" class="trail-distance">
           <div class="img-card-color">
               <img src="/img/dist-orange.svg" alt="Длина тропы">
           </div>
           <p id="color-letters-cot" class="black-color">1,8 км</p>
       </a>
       <a href="moskva/k-andreevskim-prudam/" class="trail-difficulty">
           <div id="easy" class="img-card-color">
               <img src="/img/difficulty-easy.svg" alt="Сложность тропы">
           </div>
           <p id="color-letters-cot" class="black-color">Простая</p>
       </a>
       <a href="moskva/k-andreevskim-prudam/" class="trail-duration">
           <div class="img-card-color">
               <img src="/img/duration-orange.svg" alt="Длительность тропы">
           </div>
           <p id="color-letters-cot" class="black-color">~1 ч</p>
       </a>
   </div>
</figcaption>
</figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [55.7080540883192, 37.5600836318051],
    {
      hintContent: "Конец экотропы",
      ////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );

  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);
  // .............................................................В пойме реки Шмелёвки (Мск)
  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      [55.6165332834293, 37.7726360540156],
      [55.6162630826641, 37.7727165202861],
      [55.6161112836548, 37.7727621178393],
      [55.6159685920537, 37.7728238086467],
      [55.6157484816462, 37.7729954700236],
      [55.6156665091468, 37.7731429915194],
      [55.6154539871296, 37.7732475976709],
      [55.6152566442023, 37.7732207755808],
      [55.6152315967617, 37.7732087056402],
      [55.6151002871831, 37.7730410675768],
      [55.6149287491511, 37.7728895227674],
      [55.6148019926858, 37.7727098147634],
      [55.6147040787321, 37.7725140135053],
      [55.6146281762673, 37.7723048012022],
      [55.6145947791387, 37.7722176294092],
      [55.6145074910541, 37.7720258514646],
      [55.614405022184, 37.7718515078786],
      [55.6146228630896, 37.7718112747434],
      [55.6148816829599, 37.7716267875279],
      [55.6149090076846, 37.7716254464234],
      [55.6151579654005, 37.7717099360074],
      [55.6151769407715, 37.7717193237389],
      [55.6151883259897, 37.7717448047245],
      [55.6153021779828, 37.7720760575378],
      [55.6153993314201, 37.7725816539372],
      [55.615513182804, 37.7728941312874],
      [55.6155230499083, 37.7729075423324],
      [55.6155397480792, 37.7729209533775],
      [55.6157541671259, 37.7729906908118],
      [55.6159678259957, 37.7732273957574],
      [55.6162554856571, 37.7733963749253],
      [55.6165029168091, 37.7735666951978],
      [55.6166911455908, 37.7738536915623],
      [55.6167738748919, 37.7739582977139],
      [55.6169021429051, 37.7739100179516],
      [55.6170296515182, 37.7737718841874],
      [55.6171662674338, 37.7737665197693],
      [55.6173552519895, 37.7738241872631],
      [55.6175677636203, 37.774180921062],
      [55.617643660364, 37.774545701488],
      [55.6176178554877, 37.7752403936229],
      [55.6176284810271, 37.7753476819835],
      [55.6179517996217, 37.7757178268275],
      [55.6179943013983, 37.7757366022906],
      [55.6181825229892, 37.7756910047373],
      [55.6183479750952, 37.7757419667086],
      [55.6184694073873, 37.7758358440241],
      [55.6185058370013, 37.7758412084422],
      [55.6185908392833, 37.7757875642617],
      [55.6186621803569, 37.7756829581102],
      [55.618732003409, 37.7755971274217],
      [55.6187471823169, 37.7755434832414],
      [55.6187836116716, 37.7753181776842],
      [55.6187881653386, 37.7752001604875],
      [55.6187912011162, 37.7750472745736],
      [55.6187851295607, 37.7748219690164],
      [55.6187547717686, 37.7746690831026],
      [55.6186940561136, 37.774564476951],
      [55.6186394119433, 37.7745322904428],
      [55.6185361949686, 37.7744250020822],
      [55.6184587820585, 37.7742747983774],

    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );

  var startPoint = new ymaps.Placemark(
    [55.6165332834293, 37.7726360540156],
    {
      hintContent: "Экотропа в пойме реки Шмелёвки",

      // Тут контент карточки тропы
      balloonContent: `<a href="moskva/shmelevka/"><figure id="Shmelevka" class="catalog-item">
 <img src="moskva/shmelevka/img/for-slider.jpg" alt="Экотропа в пойме реки Шмелёвки" class="trail-img">
 <figcaption class="trail-info">
     <a href="moskva/shmelevka/" class="trail-title-link">
         <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
             title="Экотропа в пойме реки Шмелёвки">В пойме реки Шмелёвки
         </h2>
     </a>
     <a href="moskva/shmelevka/" id="trail-location" class="trail-location-black"
         title="г. Москва, парк Шмелёвский ручей">
         <p id="color-letters-cot" class="black-color size-card-elem-p">
         г.&nbsp;Москва, парк &laquo;Шмелёвский ручей&raquo;</p>
     </a>
     <div class="trail-spec">
         <a href="moskva/shmelevka/" class="trail-distance">
             <div class="img-card-color">
                 <img src="/img/dist-orange.svg" alt="Длина тропы">
             </div>
             <p id="color-letters-cot" class="black-color">1 км</p>
         </a>
         <a href="moskva/shmelevka/" class="trail-difficulty">
             <div id="easy" class="img-card-color">
                 <img src="/img/difficulty-easy.svg" alt="Сложность тропы">
             </div>
             <p id="color-letters-cot" class="black-color">Простая</p>
         </a>
         <a href="moskva/shmelevka/" class="trail-duration">
             <div class="img-card-color">
                 <img src="/img/duration-orange.svg" alt="Длительность тропы">
             </div>
             <p id="color-letters-cot" class="black-color">~0,5 ч</p>
         </a>
     </div>
 </figcaption>
</figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [55.6184587820585, 37.7742747983774],
    {
      hintContent: "Конец экотропы",
      ////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );

  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

  // .............................................................Бурнаковская (Нижний)
  var myPolyline1 = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      // 1 часть
      [56.3447826465889, 43.9159021799857],
      [56.3448362700265, 43.9159155910308],
      [56.3448869143147, 43.9159129088218],
      [56.3448988306011, 43.9159263198668],
      [56.3449040439782, 43.9159826462562],
      [56.3448988306011, 43.91604031375],
      [56.344837014789, 43.9161476021106],
      [56.3448139269297, 43.9161771064097],
      [56.3448042449201, 43.9162159984405],
      [56.3447982867591, 43.9162522082622],
      [56.3448306292839, 43.9163863162072],
      [56.3448462694412, 43.9165083567174],
      [56.344874570662, 43.9166411260636],
      [56.3449200015249, 43.9167859653505],
      [56.3449766038355, 43.9169442156823],
      [56.3450138421517, 43.9170059064897],
      [56.345138962613, 43.9168677727254],
      [56.3454026079795, 43.9165968696149],
      [56.3457839223279, 43.9161999026807],
      [56.3460401157538, 43.9159182707341],
      [56.3462084279338, 43.9157492915662],
      [56.3463931236347, 43.9156768719227],
      [56.3465048343084, 43.915545443681],
      [56.3466016499529, 43.915365735677],
      [56.3467744280408, 43.9151511589558],
      [56.3471050873627, 43.9147810141118],
      [56.3474068483791, 43.9144504228427],
      [56.3476823934265, 43.914150015433],
      [56.3482290093007, 43.9135545650317],
      [56.3485745498801, 43.9131817379787],
      [56.3487279569778, 43.913058356364],
      [56.3488262563387, 43.9129725256754],
      [56.3491180369012, 43.9128395593463],
      [56.3494561226053, 43.9127081311045],
      [56.3495529307349, 43.9126518047152],
      [56.3494963352429, 43.9125659740268],
      [56.349401016329, 43.9124720967112],
      [56.3492773992563, 43.912423816949],
      [56.3490510151403, 43.9123943126498],
      [56.3488618642124, 43.9124077236948],
      [56.3487725012449, 43.9124533212481],
      [56.3486831380602, 43.9125391519365],
      [56.3485193050218, 43.9126759445963],
      [56.3482899375738, 43.9129092967806],
      [56.3481767427348, 43.9129937863646],
      [56.3480635475725, 43.9130460894404],
      [56.3479533308715, 43.9130729115304],
      [56.3479235425266, 43.9119839346704],
      [56.3478818387974, 43.9105972326097],
      [56.3478565186581, 43.9105328595933],
      [56.3478177937064, 43.9104979908762],
      [56.3477701321732, 43.9104899442491],
      [56.3476733194998, 43.9105060375032],
      [56.347631615496, 43.9100661552247],
      [56.3476286366373, 43.9100071466264],
      [56.347631615496, 43.9096316373643],
      [56.3476420414926, 43.9094412005242],

    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline1);
          },
        });
        return items;
      },
    }
  );

  var startPoint = new ymaps.Placemark(
    [56.3447826465889, 43.9159021799857],
    {
      hintContent: "Бурнаковская экотропа",

      // Тут контент карточки тропы
      balloonContent: `<a href="nizhegorodskaya-oblast/burnakovskaya/"><figure id="Burnakovskaya" class="catalog-item">
 <img src="nizhegorodskaya-oblast/burnakovskaya/img/for-slider.jpg" alt="Бурнаковская экотропа" class="trail-img">
 <figcaption class="trail-info">
     <a href="nizhegorodskaya-oblast/burnakovskaya/" class="trail-title-link">
         <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
             title="Бурнаковская экотропа">Бурнаковская экотропа
         </h2>
     </a>
     <a href="nizhegorodskaya-oblast/burnakovskaya/" id="trail-location" class="trail-location-black"
         title="г. Нижний Новгород, Бурнаковская низина">
         <p id="color-letters-cot" class="black-color size-card-elem-p">
         г.&nbsp;Нижний Новгород, Бурнаковская низина</p>
     </a>
     <div class="trail-spec">
         <a href="nizhegorodskaya-oblast/burnakovskaya/" class="trail-distance">
             <div class="img-card-color">
                 <img src="/img/dist-orange.svg" alt="Длина тропы">
             </div>
             <p id="color-letters-cot" class="black-color">2 км</p>
         </a>
         <a href="nizhegorodskaya-oblast/burnakovskaya/" class="trail-difficulty">
             <div id="easy" class="img-card-color">
                 <img src="/img/difficulty-easy.svg" alt="Сложность тропы">
             </div>
             <p id="color-letters-cot" class="black-color">Простая</p>
         </a>
         <a href="/nizhegorodskaya-oblast/burnakovskaya/" class="trail-duration">
             <div class="img-card-color">
                 <img src="/img/duration-orange.svg" alt="Длительность тропы">
             </div>
             <p id="color-letters-cot" class="black-color">~1 ч</p>
         </a>
     </div>
 </figcaption>
</figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [56.344807, 43.915919],
    {
      hintContent: "Конец экотропы",
      ////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );

  // 2 часть
  var myPolyline2 = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      [56.3465025878426, 43.9155453887016],
      [56.3465565812203, 43.9152751561433],
      [56.3466519072652, 43.9150967892438],
      [56.3467152095824, 43.9149593260318],
      [56.34675468039, 43.9148600842983],
      [56.3468075563132, 43.9147709008485],
      [56.346809045747, 43.9146066155463],
      [56.3468529848367, 43.9143410768539],
      [56.3469147973684, 43.9140755381614],
      [56.3469051158942, 43.9139360632926],
      [56.3469282024825, 43.9137764718562],
      [56.3469803334368, 43.913635655883],
      [56.3471424103512, 43.9134209918554],
      [56.3471506023065, 43.9133391844805],
      [56.347245182149, 43.9131930040892],
      [56.3472943337833, 43.9131286310728],
      [56.3473621033533, 43.9130857157286],
      [56.3474194467475, 43.9130803513106],
      [56.3474328516905, 43.9130508470114],
      [56.3474358305575, 43.9129676985319],
      [56.3474671087207, 43.9128443169172],
      [56.3475117917663, 43.9127960371549],
      [56.3475356227024, 43.9126994776304],
      [56.3475624324877, 43.9125358628805],
      [56.3475669007834, 43.9124205278929],
      [56.3475430698669, 43.9123159217413],
      [56.3475251966627, 43.9122059511717],
      [56.3475237072292, 43.9121281671102],
      [56.3475371121215, 43.9120316075857],
      [56.3475773267908, 43.911905543762],
      [56.347662224286, 43.9116829204137],
      [56.3477098859546, 43.9113503264959],
      [56.3477188225039, 43.9111598896558],
      [56.3477232907812, 43.9109828638608],
      [56.3477128648, 43.9108568000371],
      [56.3476935022559, 43.9107361006315],
      [56.347677118557, 43.9105107950742],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline2);
          },
        });
        return items;
      },
    }
  );

  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline1).add(myPolyline2).add(startPoint).add(endPoint);

  // .............................................................Тропа здоровья (Роза Хутор)
  var myPolyline1 = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      // 1 часть
      [43.6736882839447, 40.2982237447661],
      [43.6737369549158, 40.2982478846472],
      [43.6739452662232, 40.2984517325323],
      [43.673990043325, 40.2983015288275],
      [43.6740114584487, 40.2981727827948],
      [43.6740328735648, 40.2981701005858],
      [43.6742022473934, 40.2985938896101],
      [43.6742820670768, 40.2986797202986],
      [43.6743073757346, 40.298564385311],
      [43.674301535276, 40.2985214699667],
      [43.6742879075602, 40.2984678257864],
      [43.6742918012002, 40.2983605374258],
      [43.6743151630347, 40.2983229864996],
      [43.6743540994052, 40.29840345277],
      [43.6744417061688, 40.2984597791594],
      [43.6744689615729, 40.2984302748602],
      [43.6745020574041, 40.2983819950979],
      [43.6745565681447, 40.2981915582579],
      [43.6745624085782, 40.2981459607046],
      [43.6745935575474, 40.2981513251226],
      [43.674632493736, 40.2982532490652],
      [43.6746753235141, 40.2984892834585],
      [43.6747298341191, 40.2985938896101],
      [43.6747570893915, 40.2986931313437],
      [43.674751248977, 40.2987387288969],
      [43.6747259405078, 40.298942576782],
      [43.6747921318662, 40.2990847338598],
      [43.6748563763497, 40.2994468320768],
      [43.6748446955397, 40.2995728959005],
      [43.6749108867891, 40.2997821082037],
      [43.6749206207868, 40.299838434593],
      [43.6748135467247, 40.3003614653509],
      [43.6747220469191, 40.3005304445188],
      [43.6747629298284, 40.3008201230924],
      [43.6748641635781, 40.3009756912153],
      [43.6748758443843, 40.3010212887686],
      [43.6749050464128, 40.3012412299078],
      [43.6748972592127, 40.3013163317602],
      [43.6748680572034, 40.3013967980307],
      [43.6748933656123, 40.3014826287191],
      [43.675000439531, 40.3018661846083],
      [43.6750374286582, 40.3021236766737],
      [43.6750899921153, 40.3021612275999],
      [43.6752009592613, 40.3022953380507],
      [43.6752571846507, 40.3023240345075],
      [43.6755569893079, 40.3023669498517],
      [43.6757107846181, 40.3025117891386],
      [43.6757380394418, 40.3025198357656],
      [43.6758976745874, 40.3023964541509],
      [43.6759502373086, 40.3023267167165],
      [43.6759891726337, 40.3023079412534],
      [43.676055362589, 40.3023025768354],
      [43.676154647384, 40.3023562210156],
      [43.6761682747418, 40.30242595845],
      [43.6761887157038, 40.3024219351365],
      [43.6762188904445, 40.302246250446],
      [43.6762461450357, 40.3022060173108],
      [43.6762928671632, 40.3021805363252],
      [43.6763210950975, 40.3021778541161],
      [43.6763999385902, 40.3021912651612],
      [43.6765371844043, 40.3021376209809],
      [43.6769703339871, 40.3019525485588],
      [43.6770540434452, 40.3019337730957],
      [43.6771533265762, 40.3019552307678],
      [43.6771844741911, 40.301984735067],
      [43.6772039414421, 40.3020491080833],
      [43.6770890845921, 40.3024326639725],
      [43.6770637771157, 40.3025962787224],
      [43.6770910313206, 40.3026526051117],
      [43.6771358060586, 40.3026633339477],
      [43.6771883676647, 40.3025828676773],
      [43.6772214619855, 40.3025453167511],
      [43.677260396457, 40.3025453167511],
      [43.6773032243463, 40.3025962787224],
      [43.6773849866179, 40.3026177363944],
      [43.6774258677001, 40.3027947621894],
      [43.677455068456, 40.3028323131156],
      [43.6776516865061, 40.3029959278655],
      [43.6777198213226, 40.3031112628532],
      [43.6777451285432, 40.3032158690048],
      [43.677916438522, 40.3033258395744],
      [43.6780215603336, 40.3034894543243],
      [43.6780390806136, 40.3035591917587],
      [43.6780507607975, 40.3037764506889],
      [43.6780604942823, 40.3038944678855],
      [43.6782103897702, 40.3040983157707],
      [43.6783232977936, 40.304337032373],
      [43.6782512702862, 40.3046884017539],
      [43.6782103897702, 40.3047500925613],
      [43.6781636691463, 40.3047500925613],
      [43.6779281187758, 40.3047286348892],
      [43.6778872380382, 40.3047500925613],
      [43.6778444105916, 40.3047930079055],
      [43.6777626489734, 40.3048171477866],
      [43.6775835517035, 40.3047366815162],
      [43.6774025071999, 40.3047930079055],
      [43.6773265851379, 40.3048439698767],
      [43.6772292490196, 40.3048520165038],
      [43.6771046585561, 40.3048251944137],
      [43.6768360095056, 40.3048761563849],
      [43.6767776073728, 40.3049351649833],
      [43.6766646964435, 40.3049807625365],
      [43.6764778088799, 40.3049405294013],
      [43.6762636661822, 40.304707177217],
      [43.6761118190595, 40.3046240287375],
      [43.6760806708839, 40.3045650201392],
      [43.676063150028, 40.3044684606146],
      [43.676063150028, 40.3043075280737],
      [43.6759794392009, 40.3041036801886],
      [43.675899621791, 40.3040393071722],
      [43.6757983898234, 40.3039802985739],
      [43.6755200009624, 40.3039642053198],
      [43.6754109811939, 40.304004438455],
      [43.6750410912303, 40.3039132433485],
      [43.6748327837536, 40.3037308531354],
      [43.6747568584174, 40.3036369758199],
      [43.6746575712935, 40.303653069074],
      [43.6745641244374, 40.3036155181478],
      [43.6744005921097, 40.3036396580289],
      [43.6743597089519, 40.3036101537298],
      [43.6743480280445, 40.3035377340863],
      [43.6744336879788, 40.3034599500249],
      [43.6745193477899, 40.3033124285291],
      [43.6748522518189, 40.3030415254186],
      [43.6749067622391, 40.3030603008817],
      [43.6749262302343, 40.30311930948],
      [43.6750371976852, 40.3032534199308],
      [43.6750800271954, 40.3032507377218],
      [43.6751384309919, 40.3031273561071],
      [43.6750196765454, 40.3028457241605],
      [43.6748113689939, 40.3027089315007],
      [43.6746478373447, 40.3026874738286],
      [43.6744979329405, 40.3026338296483],
      [43.6743811240347, 40.3025211768697],
      [43.6743227194959, 40.3024272995542],
      [43.6742954640248, 40.3022261338781],
      [43.6742954640248, 40.3021510320256],
      [43.6743402408635, 40.3020115571569],
      [43.6743694431544, 40.3017460184644],
      [43.674367496337, 40.3014134245465],
      [43.6741144095309, 40.3011022883008],

    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline1);
          },
        });
        return items;
      },
    }
  );

  var startPoint = new ymaps.Placemark(
    [43.6736882839447, 40.2982237447661],
    {
      hintContent: "Тропа здоровья Роза&nbsp;Хутор",

      // Тут контент карточки тропы
      balloonContent: `<a href="krasnodarsky-krai/tropa-zdoroviya-rh/"><figure id="ZdoroviaRH" class="catalog-item">
   <img src="krasnodarsky-krai/tropa-zdoroviya-rh/img/for-slider.jpg" alt="Тропа здоровья в Роза Хутор" class="trail-img">
   <figcaption class="trail-info">
       <a href="krasnodarsky-krai/tropa-zdoroviya-rh/" class="trail-title-link">
           <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
               title="Тропа здоровья в Роза Хутор">Тропа здоровья Роза&nbsp;Хутор
           </h2>
       </a>
       <a href="krasnodarsky-krai/tropa-zdoroviya-rh/" id="trail-location" class="trail-location-black"
           title="Краснодарский край, г.о. Сочи, Роза Хутор">
           <p id="color-letters-cot" class="black-color size-card-elem-p">
           Краснодарский край, г.о.&nbsp;Сочи, Роза&nbsp;Хутор</p>
       </a>
       <div class="trail-spec">
           <a href="krasnodarsky-krai/tropa-zdoroviya-rh/" class="trail-distance">
               <div class="img-card-color">
                   <img src="/img/dist-orange.svg" alt="Длина тропы">
               </div>
               <p id="color-letters-cot" class="black-color">2 км</p>
           </a>
           <a href="krasnodarsky-krai/tropa-zdoroviya-rh/" class="trail-difficulty">
               <div id="hard" class="img-card-color">
                   <img src="/img/difficulty-hard.svg" alt="Сложность тропы">
               </div>
               <p id="color-letters-cot" class="black-color">Сложная</p>
           </a>
           <a href="krasnodarsky-krai/tropa-zdoroviya-rh/" class="trail-duration">
               <div class="img-card-color">
                   <img src="/img/duration-orange.svg" alt="Длительность тропы">
               </div>
               <p id="color-letters-cot" class="black-color">~1 ч</p>
           </a>
       </div>
   </figcaption>
</figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [43.6741144095309, 40.3011022883008],
    {
      hintContent: "Конец экотропы",
      ////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );

  // 2 часть
  var myPolyline2 = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      [43.6739406546919, 40.2984489130332],
      [43.6739669369099, 40.2984757351233],
      [43.6742049364908, 40.2989752965523],
      [43.674234138825, 40.2992079781844],
      [43.6741562659248, 40.299447365339],
      [43.6742414394523, 40.2998336034371],
      [43.6744877119179, 40.3004907446457],
      [43.6744424485092, 40.3007455545021],
      [43.6744487756576, 40.3008675950122],
      [43.6743694429249, 40.3014254944873],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline2);
          },
        });
        return items;
      },
    }
  );

  // 3 часть
  var myPolyline3 = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      [43.6770852863465, 40.3024575765933],
      [43.6769422016182, 40.3025769348945],
      [43.6767348741573, 40.3027807827796],
      [43.6766433773249, 40.3029752429332],
      [43.6764691435858, 40.3032327349986],
      [43.6763484450386, 40.3035626467074],
      [43.6763474716851, 40.3036109264697],
      [43.6763688859617, 40.3036471362914],
      [43.6765976288904, 40.3038134332503],
      [43.6767475280585, 40.3040575142707],
      [43.6767553150168, 40.3040950651969],
      [43.6767465546886, 40.3041312750186],
      [43.676671605162, 40.3042922075595],
      [43.6766531111085, 40.3043163474406],
      [43.6766258567033, 40.3043203707541],
      [43.6763747262636, 40.3042640443648],
      [43.676153769539, 40.3041755314673],
      [43.675942545826, 40.3040695842112],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline3);
          },
        });
        return items;
      },
    }
  );

  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline1).add(myPolyline2).add(myPolyline3).add(startPoint).add(endPoint);

  // ---------------------------------------Тропарёвская экотропа------------------------
  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.

      [55.64723916, 37.46332026],
      [55.6470526, 37.46199793],
      [55.64694444, 37.46150036],
      [55.64672777, 37.46069638],
      [55.64669831, 37.46060016],
      [55.64653233, 37.460284],
      [55.64635032, 37.45960808],
      [55.64613948, 37.45910114],
      [55.64609549, 37.45899654],
      [55.64602116, 37.45872564],
      [55.64591792, 37.45836547],
      [55.64575986, 37.45792789],
      [55.64566601, 37.45739103],
      [55.64556979, 37.45707941],
      [55.64556111, 37.45703562],
      [55.64556891, 37.45698889],
      [55.64558494, 37.45695531],
      [55.64573782, 37.45681338],
      [55.64588441, 37.45668924],
      [55.64616415, 37.45646086],
      [55.6467661, 37.45576257],
      [55.6466477, 37.45563142],
      [55.64663137, 37.45561775],
      [55.64661562, 37.4555975],
      [55.64655437, 37.45545923],
      [55.64652203, 37.45544586],
      [55.64650833, 37.45543079],
      [55.64649465, 37.45536022],
      [55.64648097, 37.45533525],
      [55.64645498, 37.4552857],
      [55.64646882, 37.4551469],
      [55.64647962, 37.45515025],
      [55.64652266, 37.45523005],
      [55.64653045, 37.45524161],
      [55.64658895, 37.45526458],
      [55.64658786, 37.45534157],
      [55.64657822, 37.45539674],
      [55.64655443, 37.45545917],
      [55.6466034, 37.45557098],
      [55.64661177, 37.45558827],
      [55.64661937, 37.45560278],
      [55.64667512, 37.45566166],
      [55.64676841, 37.45576188],
      [55.64694339, 37.45584763],
      [55.64708596, 37.45602465],
      [55.647164, 37.45602402],
      [55.64729326, 37.45597944],
      [55.64734736, 37.45597388],
      [55.6473964, 37.45599792],
      [55.64750548, 37.45617155],
      [55.64752665, 37.45619131],
      [55.64757513, 37.45620972],
      [55.64764167, 37.45618022],
      [55.64766272, 37.45619095],
      [55.64767846, 37.45621509],
      [55.64776368, 37.45647929],
      [55.64782084, 37.45656377],
      [55.64796561, 37.45662961],
      [55.64807334, 37.45668253],
      [55.64815756, 37.4566952],
      [55.64828375, 37.45671756],
      [55.64860355, 37.45677953],
      [55.64942129, 37.45679345],
      [55.64946118, 37.45681322],
      [55.6498088, 37.4573002],
      [55.64992323, 37.45756443],
      [55.65013716, 37.45787555],
      [55.65019427, 37.45791033],
      [55.65025137, 37.45792567],
      [55.65033338, 37.45799944],
      [55.65043884, 37.45810916],
      [55.6506586, 37.45843327],
      [55.65080923, 37.45812773],
      [55.65089695, 37.45787348],
      [55.65098316, 37.45760581],
      [55.65116764, 37.45764321],
      [55.65150309, 37.45775293],
      [55.65167509, 37.45780357],
      [55.65262564, 37.45797864],
      [55.65304367, 37.45805322],
      [55.65349408, 37.45808233],
      [55.65395489, 37.4580524],
      [55.65423848, 37.45801485],
      [55.65447582, 37.45799339],
      [55.65450463, 37.45803363],
      [55.65451948, 37.45813111],
      [55.65451714, 37.45841584],
      [55.65445421, 37.45880342],
      [55.65440218, 37.45904454],
      [55.65434399, 37.45918119],
      [55.65428132, 37.45928622],
      [55.65426134, 37.45943397],
      [55.65423201, 37.45950187],
      [55.6542181, 37.45957897],
      [55.6541594, 37.45965604],

    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );
  var startPoint = new ymaps.Placemark(
    [55.64723916, 37.46332026],
    {
      hintContent: "Тропарёвская экотропа",
      balloonContent: `<a href="moskva/troparevskaya-ecotropa/"><figure id="Troparevo" class="catalog-item">
      <img src="moskva/troparevskaya-ecotropa/img/for-slider.jpg" alt="Тропарёвская экотропа" class="trail-img">
      <figcaption class="trail-info">
          <a href="moskva/troparevskaya-ecotropa/" class="trail-title-link">
              <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
                  title="Тропарёвская экотропа">Тропарёвская экотропа
              </h2>
          </a>
          <a href="moskva/troparevskaya-ecotropa/" id="trail-location" class="trail-location-black"
              title="г. Москва, Тропарёвский лесопарк">
              <p id="color-letters-cot" class="black-color size-card-elem-p">
                  г. Москва, Тропарёвский лесопарк</p>
          </a>
          <div class="trail-spec">
              <a href="moskva/troparevskaya-ecotropa/" class="trail-distance">
                  <div class="img-card-color">
                      <img src="/img/dist-orange.svg" alt="Длина тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">1,8 км</p>
              </a>
              <a href="moskva/troparevskaya-ecotropa/" class="trail-difficulty">
                  <div id="easy" class="img-card-color">
                      <img src="/img/difficulty-easy.svg" alt="Сложность тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">Простая</p>
              </a>
              <a href="moskva/troparevskaya-ecotropa/" class="trail-duration">
                  <div class="img-card-color">
                      <img src="/img/duration-orange.svg" alt="Длительность тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">~1 ч</p>
              </a>
          </div>
      </figcaption>
  </figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [55.64723916, 37.46332026],
    {
      hintContent: "Конец экотропы",
      ////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );

  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

  // ---------------------------------------К леднику Безенги+------------------------
  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.

      [43.11647713180365, 43.14838930518987],
      [43.116525273105765, 43.148119743183855],
      [43.11651741330394, 43.14807682783962],
      [43.11643586780005, 43.14798160941959],
      [43.116259021752875, 43.14793869407535],
      [43.116238389680525, 43.14792125971675],
      [43.116071367884395, 43.1475470915592],
      [43.1158075568343, 43.14718283516195],
      [43.11570046568198, 43.1469763050678],
      [43.11557961947611, 43.14663834673191],
      [43.11544092055935, 43.14640292611723],
      [43.11493132631965, 43.14575155037909],
      [43.11423179183689, 43.14488574189381],
      [43.11404314919205, 43.144633614246416],
      [43.11385057588802, 43.14453705472189],
      [43.113724813400836, 43.144488774959626],
      [43.11369337273838, 43.14444049519734],
      [43.11365014180093, 43.144290291492524],
      [43.113654071887424, 43.14407571477132],
      [43.11355668190003, 43.143856314227065],
      [43.11343091880458, 43.143716839358305],
      [43.11325406401122, 43.14338424544044],
      [43.11309685931834, 43.14335205893228],
      [43.112790308997425, 43.143185761973356],
      [43.11257808094623, 43.14311602453897],
      [43.112409084005, 43.143040922686545],
      [43.112279388359234, 43.142890718981704],
      [43.112185064079355, 43.142606404826125],
      [43.112169343351795, 43.14230063299844],
      [43.11211432077337, 43.14215579371163],
      [43.11201606604509, 43.142037776514975],
      [43.11196497352359, 43.141984132334684],
      [43.11193746214808, 43.14191439490029],
      [43.11190209036124, 43.14175882677742],
      [43.111832329276886, 43.141695794865576],
      [43.111759620455835, 43.14167836050697],
      [43.11170656261259, 43.14171591143319],
      [43.11166038260021, 43.14176955561347],
      [43.11147764801672, 43.14189115898904],
      [43.11144424107692, 43.1418965234071],
      [43.111197885188716, 43.14186487755249],
      [43.1110229890245, 43.14166639408542],
      [43.11101512851093, 43.14160470327806],
      [43.111013163382374, 43.14138207992981],
      [43.11110159410439, 43.14110313019229],
      [43.11133740873402, 43.140818816036685],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );
  var startPoint = new ymaps.Placemark(
    [43.11648695656227, 43.14838930518987],
    {
      hintContent: "Экотропа к леднику Безенги",
      balloonContent: `<a href="/catalog/kabardino-balkariya/k-ledniku-bezengi/"><figure id="Bezengi" class="catalog-item">
      <img src="/catalog/kabardino-balkariya/k-ledniku-bezengi/img/for-slider.jpg" alt="Экотропа к леднику Безенги" class="trail-img">
      <figcaption class="trail-info">
          <a href="/catalog/kabardino-balkariya/k-ledniku-bezengi/" class="trail-title-link">
              <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
                  title="К леднику Безенги">К леднику Безенги
              </h2>
          </a>
          <a href="/catalog/kabardino-balkariya/k-ledniku-bezengi/" id="trail-location" class="trail-location-black"
              title="Кабардино-Балкария, ущелье Безенги">
              <p id="color-letters-cot" class="black-color size-card-elem-p">
                  Кабардино-Балкария, ущелье Безенги</p>
          </a>
          <div class="trail-spec">
              <a href="/catalog/kabardino-balkariya/k-ledniku-bezengi/" class="trail-distance">
                  <div class="img-card-color">
                      <img src="/img/dist-orange.svg" alt="Длина тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">5,8 км</p>
              </a>
              <a href="/catalog/kabardino-balkariya/k-ledniku-bezengi/" class="trail-difficulty">
                  <div id="hard" class="img-card-color">
                      <img src="/img/difficulty-hard.svg" alt="Сложность тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">Сложная</p>
              </a>
              <a href="/catalog/kabardino-balkariya/k-ledniku-bezengi/" class="trail-duration">
                  <div class="img-card-color">
                      <img src="/img/duration-orange.svg" alt="Длительность тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">~2 ч</p>
              </a>
          </div>
      </figcaption>
  </figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [43.11133937385209, 43.14081345161866],
    {
      hintContent: "Конец экотропы",
      balloonContent: ``,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );
  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

  // -----------------------Комаровский берег-------------------------------------------------------
  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.

      [60.17964698255261, 29.800178045172267],
      [60.17983469531133, 29.800088191170264],
      [60.1798654239878, 29.800021135944906],
      [60.17997230611607, 29.79968854202704],
      [60.18013129263616, 29.799291575092834],
      [60.180236837882646, 29.798822188515246],
      [60.180262222131674, 29.79854860319572],
      [60.180235501868985, 29.798355484146644],
      [60.180124612545804, 29.797738576073225],
      [60.18020450595732, 29.797404490379645],
      [60.1802445863811, 29.79719527807646],
      [60.180265962587065, 29.796910963920887],
      [60.18025794651147, 29.796739302543937],
      [60.18022321016121, 29.796599827675177],
      [60.18016175345117, 29.796476446060492],
      [60.18023389827289, 29.79630478468352],
      [60.18033810717904, 29.796208225158995],
      [60.18053583598642, 29.796288691429442],
      [60.18060530798653, 29.79630478468352],
      [60.18069348377426, 29.79615994539673],
      [60.18072287565077, 29.79589708891326],
      [60.18067477983915, 29.795596681503604],
      [60.1805946199961, 29.794995866684264],
      [60.1805839320022, 29.794899307159714],
      [60.18059729199405, 29.794657908348373],
      [60.18064004393127, 29.794432602791137],
      [60.180677451830526, 29.794336043266586],
      [60.180795019235646, 29.793821059135748],
      [60.18112634328705, 29.79213663187439],
      [60.18115039086992, 29.791991792587574],
      [60.18115039086992, 29.791841588882733],
      [60.181086263943044, 29.791353426842026],
      [60.181104967643, 29.791074477104477],
      [60.18120650182786, 29.790857884868487],
      [60.18122787740559, 29.79047164677036],
      [60.18118245428622, 29.790235612377046],
      [60.18113435914998, 29.79018733261478],
      [60.180637371936825, 29.789865467532994],
      [60.18120432472167, 29.786867608721483],
      [60.181968493004824, 29.78744696586869],
      [60.1819952118527, 29.786953439409956],
      [60.18209139952461, 29.78612731903336],
      [60.18219827438401, 29.785590877230387],
      [60.18247080369586, 29.784850587542287],
      [60.18263111399569, 29.783970822985395],
      [60.182887608842094, 29.783756246264215],
      [60.18301051191032, 29.783670415575713],
      [60.18364105082808, 29.783970822985395],
      [60.18300049265571, 29.783694555456858],
      [60.18293369754678, 29.783349891598448],
      [60.1828401841652, 29.783105810578093],
      [60.18202861038194, 29.782492925818183],
      [60.179347136945346, 29.78059863780274],
      [60.17933377644322, 29.78056108687653],
      [60.179345800895376, 29.7804135653807],
      [60.179483413755534, 29.779898581249864],
      [60.17955689611384, 29.77958744500413],
      [60.179548879864576, 29.779557940704958],
      [60.179488757932624, 29.779482838852537],
      [60.17837639245536, 29.78353885405908],
      [60.17830691572434, 29.783903634485107],
      [60.17809848464648, 29.785319840844966],
      [60.17746249443656, 29.78978303664575],
      [60.17704256698016, 29.792587121580727],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );
  var startPoint = new ymaps.Placemark(
    [60.17964698255261, 29.800178045172267],
    {
      hintContent: "Экотропа Комаровский берег",

      balloonContent: `<a href="lenoblast/komarovsky-bereg/"><figure id="Komarovsky" class="catalog-item">
    <img src="lenoblast/komarovsky-bereg/img/for-slider.jpg" alt="Экотропа Комаровский Берег" class="trail-img">
    <figcaption class="trail-info">
        <a href="lenoblast/komarovsky-bereg/" class="trail-title-link">
            <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
                title="Экотропа Комаровский Берег">Комаровский Берег
            </h2>
        </a>
        <a href="lenoblast/komarovsky-bereg/" id="trail-location" class="trail-location-black"
            title="г. Санкт-Петербург, пос. Комарово">
            <p id="color-letters-cot" class="black-color size-card-elem-p">
            г.&nbsp;Санкт-Петербург, пос.&nbsp;Комарово</p>
        </a>
        <div class="trail-spec">
            <a href="lenoblast/komarovsky-bereg/" class="trail-distance">
                <div class="img-card-color">
                    <img src="/img/dist-orange.svg" alt="Длина тропы">
                </div>
                <p id="color-letters-cot" class="black-color">2,8 км</p>
            </a>
            <a href="lenoblast/komarovsky-bereg/" class="trail-difficulty">
                <div id="easy" class="img-card-color">
                    <img src="/img/difficulty-easy.svg" alt="Сложность тропы">
                </div>
                <p id="color-letters-cot" class="black-color">Простая</p>
            </a>
            <a href="lenoblast/komarovsky-bereg/" class="trail-duration">
                <div class="img-card-color">
                    <img src="/img/duration-orange.svg" alt="Длительность тропы">
                </div>
                <p id="color-letters-cot" class="black-color">~1 ч</p>
            </a>
        </div>
    </figcaption>
</figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [60.17704256698016, 29.792587121580727],
    {
      hintContent: "Конец экотропы",
      //////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );
  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

  // -----------------------На гору Железная (Железногорск, Ставропольский край)-------------------------------------------------------
  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.

      [44.1359695764666, 43.032745886261],
      [44.1362747803202, 43.0328209881134],
      [44.1369547224347, 43.0330892090149],
      [44.1371903823506, 43.0330999378509],
      [44.1372676477125, 43.0331428531952],
      [44.137468537142, 43.0334110740966],
      [44.1375419388693, 43.0334915403671],
      [44.1377080582286, 43.0335398201293],
      [44.1378703139146, 43.0336524729079],
      [44.1384382052036, 43.0343498472518],
      [44.1386043220458, 43.0344249491042],
      [44.1387974805476, 43.0344356779403],
      [44.1389249648102, 43.0344678644485],
      [44.1390601750889, 43.0345483307189],
      [44.1391606168084, 43.0346717123336],
      [44.139241742687, 43.0348809246367],
      [44.1392958265655, 43.0349238399809],
      [44.1394503515955, 43.0349560264891],
      [44.1400684476436, 43.0348433737105],
      [44.140137983063, 43.0348058227843],
      [44.1401766138039, 43.0347199920958],
      [44.1402500121414, 43.0344356779402],
      [44.1403195473238, 43.0343015674895],
      [44.1405976872286, 43.0339582447356],
      [44.1407522088497, 43.033679294998],
      [44.1408294694966, 43.0334432606047],
      [44.1408642367545, 43.0332072262114],
      [44.1409376342313, 43.0328156236952],
      [44.1409608123628, 43.0324991230314],
      [44.1409878535046, 43.0323328260725],
      [44.1410805658961, 43.0320324186628],
      [44.1410960179471, 43.0317856554335],
      [44.1410805659179, 43.0315871719664],
      [44.1409917165456, 43.0311848406141],
      [44.1409917165456, 43.0310560945814],
      [44.1410264837073, 43.0309917215651],
      [44.1411462371065, 43.0308093313521],
      [44.1411616891402, 43.0306913141554],
      [44.1409775535523, 43.0296810883976],
      [44.1407689501206, 43.0290212649799],
      [44.1401006414666, 43.0280342120624],
      [44.13980318372, 43.0276640672183],
      [44.139729784845, 43.0275621432757],
      [44.1395598080996, 43.02725100703],
      [44.1393627889827, 43.0270793456531],
      [44.139127137797, 43.0266501922107],
      [44.1388644435775, 43.0263122338748],
      [44.1383854098724, 43.0261459369159],
      [44.1383004196128, 43.02616203017],
      [44.1382888300224, 43.0262210387683],
      [44.1384279049561, 43.0262532252765],
      [44.1386249272141, 43.0264517087436],
      [44.1386790116397, 43.026526810596],
      [44.1386867379822, 43.0266340989566],
      [44.1387717276819, 43.0268057603336],
      [44.1388528540985, 43.0269184131122],
      [44.1388953488434, 43.0270364303088],
      [44.1389262540931, 43.0270847100711],
      [44.1388876225284, 43.0271061677432],
      [44.1387717276819, 43.0270096082187],
      [44.1386828748111, 43.0269237775302],
      [44.1385128950309, 43.0266555566287],
      [44.1383892730631, 43.0266340989566],
      [44.1384008626337, 43.0266823787189],
      [44.1384819895634, 43.0267521161532],
      [44.1385360741427, 43.026891591022],
      [44.1387871803631, 43.0272885579562],
      [44.1387910435274, 43.0273743886447],
      [44.1387330960373, 43.0273743886447],
      [44.138543800504, 43.0271168965792],
      [44.1385013055043, 43.027073981235],
      [44.1385399373235, 43.0271919984317],
      [44.1386056113575, 43.0273422021365],
      [44.1385940218275, 43.0275460500216],
      [44.1385708427604, 43.0276747960543],
      [44.1385862954946, 43.0279698390459],
      [44.1385206214389, 43.0281200427508],
      [44.1383931362972, 43.0281897801852],
      [44.1382811036712, 43.028162958095],
      [44.1382192924755, 43.0281093139147],
      [44.1380956699324, 43.0281146783327],
      [44.1379797735206, 43.0281415004229],
      [44.1378870562263, 43.0282058734392],
      [44.1377943387854, 43.0284580010866],
      [44.1377054844336, 43.02869403548],
      [44.1376282196704, 43.0288496036028],
      [44.1375664078084, 43.0291392821764],
      [44.1375084591081, 43.0293967742419],
      [44.1375161856048, 43.0296435374712],
      [44.1374968693612, 43.0299385804629],
      [44.1375818607854, 43.030501844356],
      [44.137643672653, 43.030678870151],
      [44.1377054844554, 43.0307593364214],
      [44.1379488677939, 43.030855895946],
      [44.1382965565253, 43.0311133880114],
      [44.1386983276248, 43.0315639991259],
      [44.1389030752882, 43.0318590421175],
      [44.1390691907916, 43.0320199746584],
      [44.1393434735, 43.0322291869616],
      [44.1395675344786, 43.0322184581255],
      [44.1396641122226, 43.0321487206911],
      [44.1396988801715, 43.0319770593142],
      [44.1396872908575, 43.0318912286257],
      [44.1397104694832, 43.0318000335192],
      [44.139741374325, 43.0313762444949],
      [44.1398147732073, 43.0308505315279],
      [44.1398031839163, 43.0307110566591],
      [44.1397066064013, 43.0302336234545],
      [44.1394825459541, 43.0294772405123],
      [44.1391580430989, 43.0287745017504],
      [44.1391078222584, 43.0285760182833],
      [44.139030559343, 43.0284043569063],
      [44.1389223910903, 43.0284150857424],
      [44.1388026331493, 43.0285545606112],
      [44.1386017483337, 43.0287798661684],
      [44.1384433578805, 43.0289247054552],
      [44.1382772406041, 43.0288710612749],
      [44.1382038397972, 43.0289247054552],
      [44.138068627544, 43.0293055791353],
      [44.1381188492744, 43.0297079104876],
      [44.1382463350124, 43.0300029534792],
      [44.1384742633684, 43.0302014369463],
      [44.1386056115101, 43.030501844356],
      [44.1387717278563, 43.0307110566591],
      [44.1388953490178, 43.0307968873476],
      [44.1390537382501, 43.0307861585115],
      [44.1391232748511, 43.0307164210771],
      [44.1391734956783, 43.0306144971346],
      [44.1391850850939, 43.0304535645937],
      [44.1391734956783, 43.0303140897249],
      [44.1391000959933, 43.0300565976595],
      [44.1390382856609, 43.029965402553],
      [44.1389919278689, 43.0299975890612],
      [44.1390305593648, 43.030324818561],
      [44.1390035173203, 43.0304106492494],
      [44.1389223911121, 43.0303891915773],
      [44.138466536998, 43.029976131389],
      [44.1383506413192, 43.0297186393236],
      [44.1382695142078, 43.0291714686846],
      [44.1381903186077, 43.0289984662031],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );
  var startPoint = new ymaps.Placemark(
    [44.1359695764666, 43.032745886261],
    {
      hintContent: "Экотропа на гору Железная",

      balloonContent: `<a href="stavropolsky-krai/na-goru-zheleznaya/"><figure id="Zheleznaya" class="catalog-item">
    <img src="stavropolsky-krai/na-goru-zheleznaya/img/for-slider.jpg" alt="Экотропа на гору Железная" class="trail-img">
    <figcaption class="trail-info">
        <a href="stavropolsky-krai/na-goru-zheleznaya/" class="trail-title-link">
            <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
                title="Экотропа на гору Железная">На гору Железная
            </h2>
        </a>
        <a href="stavropolsky-krai/na-goru-zheleznaya/" id="trail-location" class="trail-location-black"
            title="Ставропольский край, г. Железноводск">
            <p id="color-letters-cot" class="black-color size-card-elem-p">
                Ставропольский край, г.&nbsp;Железноводск</p>
        </a>
        <div class="trail-spec">
            <a href="stavropolsky-krai/na-goru-zheleznaya/" class="trail-distance">
                <div class="img-card-color">
                    <img src="/img/dist-orange.svg" alt="Длина тропы">
                </div>
                <p id="color-letters-cot" class="black-color">3,3 км</p>
            </a>
            <a href="stavropolsky-krai/na-goru-zheleznaya/" class="trail-difficulty">
                <div id="hard" class="img-card-color">
                    <img src="/img/difficulty-hard.svg" alt="Сложность тропы">
                </div>
                <p id="color-letters-cot" class="black-color">Сложная</p>
            </a>
            <a href="stavropolsky-krai/na-goru-zheleznaya/" class="trail-duration">
                <div class="img-card-color">
                    <img src="/img/duration-orange.svg" alt="Длительность тропы">
                </div>
                <p id="color-letters-cot" class="black-color">~1,5 ч</p>
            </a>
        </div>
    </figcaption>
</figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [44.1381903186077, 43.0289984662031],
    {
      hintContent: "Конец экотропы",
      //////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );
  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

  // --------------------------------------------Тропа голицына----------------------------------
  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.

      [44.82501955440478, 34.91609077603822],
      [44.82483248765393, 34.91654138715272],
      [44.82473322749714, 34.91691153199677],
      [44.8245461598109, 34.917179752898264],
      [44.82453852438214, 34.91726558358674],
      [44.82429037239361, 34.91796832234863],
      [44.82417584034388, 34.91818289906983],
      [44.82385602527195, 34.918403077042996],
      [44.82374149235346, 34.91863374701828],
      [44.82364986585373, 34.91875712863297],
      [44.82349333691084, 34.91881613723128],
      [44.82315737090578, 34.91880540839523],
      [44.82284049207194, 34.918875145829624],
      [44.82275649979791, 34.918832230485386],
      [44.82270305010484, 34.918832230485386],
      [44.82266487172209, 34.91881077281325],
      [44.82272213928666, 34.91866056910844],
      [44.822783224625745, 34.918505000985576],
      [44.82277940679398, 34.91831724635452],
      [44.82279849595032, 34.91814558497757],
      [44.82273741062754, 34.917920279420315],
      [44.82276031763122, 34.91773252478929],
      [44.82274122846213, 34.91764669410079],
      [44.82269541443033, 34.91761450759263],
      [44.82264578252118, 34.917534041322185],
      [44.822599968413016, 34.91746966830582],
      [44.822542700726274, 34.91727118483871],
      [44.82239762233019, 34.91711025229782],
      [44.82222963635977, 34.91687421790451],
      [44.822114714569345, 34.916844725695206],
      [44.822019267584174, 34.91683399685913],
      [44.821969635089, 34.916807174769],
      [44.82190473099193, 34.916748166170656],
      [44.82174437937798, 34.91665697106416],
      [44.82170620035609, 34.91662478455597],
      [44.8216909287402, 34.91637802132661],
      [44.82174437937798, 34.91634047040039],
      [44.82185128050385, 34.91632437714632],
      [44.821893277320115, 34.91624927529389],
      [44.82191236677188, 34.916088342753],
      [44.82185128050385, 34.915777206507265],
      [44.821920002550804, 34.915498256769716],
      [44.82200017816804, 34.91541779049927],
      [44.82206126427725, 34.91542851933532],
      [44.8221414396967, 34.9153319598108],
      [44.82216434693877, 34.91502618798309],
      [44.82206936273685, 34.91466661091557],
      [44.82205027333744, 34.91454859371893],
      [44.82205027333744, 34.914462763030436],
      [44.82197773356155, 34.91392095680944],
      [44.82194337258303, 34.91388340588323],
      [44.82187083267175, 34.91373320217839],
      [44.82183647162909, 34.91362591381781],
      [44.821790656873425, 34.91347034569495],
      [44.821718116768714, 34.91299291249029],
      [44.82169520934813, 34.91278906460516],
      [44.82176011368264, 34.912494021613526],
      [44.821748659981886, 34.91232772465458],
      [44.82188228634806, 34.911737638671326],
      [44.82168173562996, 34.911181189959876],
      [44.82165882819481, 34.9110578083452],
      [44.82168555353493, 34.91093442673051],
      [44.82165501028808, 34.910596468394644],
      [44.821620649115914, 34.91055355305041],
      [44.8216435565663, 34.910414078181624],
      [44.8215862879231, 34.91020486587846],
      [44.82160919538725, 34.91014585728015],
      [44.82160919538725, 34.910081484263785],
      [44.8215748341876, 34.90999565357531],
      [44.821597741656326, 34.90993128055894],
      [44.82145647878649, 34.90977571243607],
      [44.8213152155682, 34.909491398280494],
      [44.8213152155682, 34.90941093201005],
      [44.82129230798645, 34.909351923411734],
      [44.82133048728427, 34.90928218597734],
      [44.82145647878649, 34.909217812960996],
      [44.82142975333949, 34.909115889018416],
      [44.82142975333949, 34.90906224483813],
      [44.82153665505267, 34.90899250740374],
      [44.82156719836266, 34.90890667671526],
      [44.82154810879582, 34.908831574862845],
      [44.821460296706476, 34.9087511085924],
      [44.82125794659664, 34.908740379756345],
      [44.821147226422575, 34.90871892208421],
      [44.821101411115535, 34.90867064232195],
      [44.82088760586463, 34.908633091395735],
      [44.82053464851703, 34.90865381694566],
      [44.82045828883479, 34.90862163043747],
      [44.82040101900629, 34.908632359273525],
      [44.82034756711469, 34.90866454578171],
      [44.82022920917717, 34.90868600345384],
      [44.820164303107596, 34.908669910199734],
      [44.820057398832624, 34.90861090160142],
      [44.81997722049543, 34.90861090160142],
      [44.81980922742497, 34.90854652858505],
      [44.81974432087941, 34.90855189300308],
      [44.81961450756758, 34.908487519986735],
      [44.818852651553385, 34.90845684847776],
      [44.81863120169064, 34.90836028895323],
      [44.818539567014206, 34.908322738027024],
      [44.818234117033924, 34.908328102445054],
      [44.818043209969, 34.908274458264735],
      [44.817718180438284, 34.908281866417965],
      [44.81757308981995, 34.90826040874584],
      [44.81747381707985, 34.90826577316386],
      [44.8173745441677, 34.908233586655676],
      [44.81716072500326, 34.908276501999914],
      [44.817023269404594, 34.908378425942495],
      [44.816973632579554, 34.90845889221294],
      [44.81693545037719, 34.9085983670817],
      [44.81684763121514, 34.90871638427836],
      [44.81674453898352, 34.90878612171275],
      [44.81660708238608, 34.9092260039912],
      [44.81662235535762, 34.90954786907299],
      [44.81666435600844, 34.90973562370404],
      [44.81666817424788, 34.90989655624493],
      [44.81665671952877, 34.90995020042522],

      [44.818600586313494, 34.9083425499749],
      [44.81853186028318, 34.90822185056923],
      [44.81841922577739, 34.907921443159545],
      [44.818430680144026, 34.907865116770246],
      [44.81866740320833, 34.90796435850381],
      [44.81890412529422, 34.90789462106942],
      [44.818974759920614, 34.907921443159545],
      [44.81901103172194, 34.907902667696455],
      [44.81919239038403, 34.90795362966773],
      [44.81919429941951, 34.90799118059394],
      [44.81913702832703, 34.908868262941816],
      [44.81904157637894, 34.90898091572045],
      [44.81963386198143, 34.90846717958117],
      [44.8199087603183, 34.90847790841723],
      [44.821474128474705, 34.90778053407337],
      [44.822252978640684, 34.90817750100757],
      [44.82232933592994, 34.90823114518786],
      [44.82250495730882, 34.90831697587634],
      [44.82279511318957, 34.90860665444994],
      [44.82305472509982, 34.908821231171146],
      [44.82311327843653, 34.90904532500728],
      [44.823302259702444, 34.90933500358088],
      [44.82337575224852, 34.90941681095582],
      [44.8234840385044, 34.90947708526305],
      [44.82378459179091, 34.90956666034344],
      [44.823907924800196, 34.90958263212414],
      [44.823986665977415, 34.90957056218357],
      [44.82403386057841, 34.909548584298236],
      [44.82414266630088, 34.90947147078905],
      [44.82424322060253, 34.909440189187855],
      [44.82440540810892, 34.9094400330789],
      [44.82475759201905, 34.909456126332984],
      [44.824848216376594, 34.90948493521278],
      [44.82490739060272, 34.90948761742179],
      [44.82497038245366, 34.909452748704595],
      [44.82515363108051, 34.90902359526223],
      [44.825172719445405, 34.90886266272133],
      [44.82518035478958, 34.90871782343452],
      [44.825222349164385, 34.90866954367226],
      [44.8254113234698, 34.90874196331566],
      [44.82551330119529, 34.90873899505973],
      [44.82560301589148, 34.90872021959663],
      [44.825690821628214, 34.90868803308845],
      [44.82277392410495, 34.908552948767976],
      [44.82317861289626, 34.90862805062037],
      [44.82329314694059, 34.90862805062037],
      [44.82336186725723, 34.90853149109584],
      [44.82344585864333, 34.908381287391],
      [44.82358329882761, 34.90824181252224],
      [44.824026159399594, 34.90740496330959],
      [44.824239952932636, 34.90721184426051],
      [44.82431630757242, 34.907093827063854],
      [44.82446901654654, 34.90695435219509],
      [44.82464463136333, 34.90658957176907],
      [44.82466753760405, 34.906192604834864],
      [44.82471335005804, 34.90601021462184],
      [44.82478677966878, 34.90588906956827],
      [44.82489367511512, 34.905867611896134],
      [44.82482495663682, 34.90540627194559],
      [44.82476387347573, 34.905202424060455],
      [44.824779144272114, 34.904923474322906],
      [44.82484022741689, 34.90479472829017],
      [44.82503111182437, 34.904816185962304],
      [44.82491658125625, 34.90468743992959],
      [44.8248478628054, 34.90451577855264],
      [44.824779144272114, 34.90450504971657],
      [44.82468751943275, 34.90453723622475],
      [44.82452717561111, 34.90450504971657],
      [44.8244508212525, 34.90451577855264],
      [44.824351560434096, 34.90449432088052],
      [44.82426757037646, 34.90439776135599],
      [44.824145402799935, 34.90435484601175],
      [44.8240232349628, 34.9042582864872],
      [44.823939244423556, 34.90416172696268],
      [44.823908702378745, 34.9040758962742],
      [44.82380180509362, 34.90411881161844],
      [44.82361855214056, 34.90408662511025],
      [44.82351928987946, 34.904150998126596],
      [44.823290222466355, 34.9040758962742],
      [44.82326349787513, 34.90402761651191],
      [44.82322722876711, 34.90399677110825],
      [44.82318523292911, 34.90393910361443],
      [44.8231747339648, 34.90390155268822],
      [44.823143237060314, 34.90387338949356],
      [44.823069744215815, 34.90385729623949],
      [44.82300865918235, 34.90386668397102],
      [44.822939323503086, 34.90385980239747],
      [44.822841968978494, 34.90383029809832],
      [44.8226835289081, 34.90381420484422],
      [44.82251363485158, 34.90375251403689],
      [44.822432639408625, 34.90374428122077],
      [44.82228565180135, 34.90374428122077],
      [44.822201658713496, 34.90376842110191],
      [44.822176842550334, 34.903787196565],
      [44.82213866381678, 34.90385156958137],
      [44.822125301254005, 34.90389984934363],
      [44.8221138476263, 34.90396690456901],
      [44.82209284930289, 34.904012502122264],
      [44.82203939899037, 34.90406882851156],
      [44.82178704634464, 34.90413484025405],
      [44.82168778090876, 34.904180437807305],
      [44.821630512309774, 34.90420725989746],
      [44.82157515260966, 34.90422335315154],
      [44.821510248065515, 34.90431186604903],
      [44.8214377076056, 34.90437355685638],
      [44.821382423340786, 34.90445017659221],
      [44.82132038202518, 34.90451723181759],
      [44.821181027440424, 34.90469023429903],
      [44.82116384671471, 34.904741196270336],
      [44.82115239289472, 34.90484043800387],
      [44.8211256673058, 34.904895423288686],
      [44.8211103955351, 34.90491151654276],
      [44.821093214788206, 34.90491956316983],
      [44.821072216090556, 34.90491017543827],
      [44.82106267122544, 34.9048806711391],
      [44.821059807765586, 34.90486189567601],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );
  var startPoint = new ymaps.Placemark(
    [44.82502337206724, 34.91605322511201],
    {
      hintContent: "Тропа Голицына",
      balloonContent: `<a href="/catalog/krym/tropa-golicyna/"><figure id="Golisyn" class="catalog-item">
      <img src="/catalog/krym/tropa-golicyna/img/for-slider.jpg" alt="Тропа Голицына"
          class="trail-img">
      <figcaption class="trail-info">
          <a href="/catalog/krym/tropa-golicyna/" class="trail-title-link">
              <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
                  title="Тропа Голицына">Тропа Голицына</h2>
          </a>
          <a href="/catalog/krym/tropa-golicyna/" id="trail-location" class="trail-location-black" title="Республика Крым, пгт. Новый
              свет">
              <p id="color-letters-cot" class="black-color size-card-elem-p">Республика Крым, пгт. Новый свет</p>
          </a>
          <div class="trail-spec">
              <a href="/catalog/krym/tropa-golicyna/" class="trail-distance">
                  <div class="img-card-color">
                      <img src="/img/dist-orange.svg" alt="Длина тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">8 км</p>
              </a>
              <a href="/catalog/krym/tropa-golicyna/" class="trail-difficulty">
                  <div id="easy" class="img-card-color">
                      <img src="/img/difficulty-medium.svg" alt="Сложность тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">Средняя</p>
              </a>
              <a href="/catalog/krym/tropa-golicyna/" class="trail-duration">
                  <div class="img-card-color">
                      <img src="/img/duration-orange.svg" alt="Длительность тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">~3 ч</p>
              </a>
          </div>
      </figcaption>
  </figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [44.82568403425213, 34.9086912136472],
    {
      hintContent: "Конец экотропы",
      balloonContent: ``,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );
  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);
  // -----------------------------------Солнечная тропа-------------------------------------------
  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.

      [44.4668840385744, 34.1438761517742],
      [44.4668533066723, 34.143835918639],
      [44.4667803183395, 34.1438117787579],
      [44.4660459798175, 34.1433807751646],
      [44.4657885959346, 34.1432198426237],
      [44.4655158445806, 34.1431849739065],
      [44.4654812703737, 34.1431474229803],
      [44.4654543793096, 34.1429972192754],
      [44.4654025179365, 34.1428148290624],
      [44.4650817447299, 34.1422354719152],
      [44.4650567742845, 34.1420611283292],
      [44.4650049125557, 34.1419592043867],
      [44.4649588132023, 34.141833140563],
      [44.4646534040812, 34.1411733171453],
      [44.4645554423175, 34.1408058545103],
      [44.4645151050726, 34.1407736680021],
      [44.4642750018854, 34.1407200238218],
      [44.4641482269794, 34.1406797906865],
      [44.4641117311217, 34.1406476041783],
      [44.4640829185863, 34.140583231162],
      [44.4639791933402, 34.1404920360555],
      [44.4639619057811, 34.1404518029203],
      [44.4639369348534, 34.1403552433957],
      [44.4638716262223, 34.1402989170064],
      [44.4638581803395, 34.1402560016621],
      [44.4638620220266, 34.1401916286458],
      [44.4638370510558, 34.1401272556294],
      [44.4637141168891, 34.1398804924001],
      [44.4636564914088, 34.1398295304288],
      [44.4635642905211, 34.1398000261296],
      [44.4633203416529, 34.1395210763921],
      [44.4632627157811, 34.1394915720929],
      [44.4632242985015, 34.1394969365109],
      [44.4631455429987, 34.1395264408101],
      [44.4629073549943, 34.1394727966298],
      [44.4628132320582, 34.1394057414044],
      [44.4625788844399, 34.1393172285069],
      [44.4623541403425, 34.1391884824742],
      [44.4619757231201, 34.1389309904088],
      [44.4616683773697, 34.138611807536],
      [44.4615108620305, 34.1384911081303],
      [44.4611382021063, 34.1383409044255],
      [44.4609922109594, 34.1383114001263],
      [44.4606714133533, 34.1384133240689],
      [44.4604159265484, 34.138619854163],
      [44.4601200983364, 34.1391884824741],
      [44.4600182869721, 34.1394030591953],
      [44.4598934237551, 34.1396095892894],
      [44.4598338735008, 34.1396685978878],
      [44.4597301406536, 34.1397463819492],
      [44.4596744322171, 34.1397597929943],
      [44.4596148817379, 34.1397597929943],
      [44.4595073065236, 34.139708831023],
      [44.4594247039915, 34.1396685978878],
      [44.4593632322633, 34.1396444580066],
      [44.4591538437212, 34.1396659156787],
      [44.4591192657206, 34.1396417757976],
      [44.4590481886546, 34.1395505806911],
      [44.4589675064742, 34.1394996187198],
      [44.4589386913826, 34.1394325634944],
      [44.4588676141163, 34.1390329143512],
      [44.4587139331973, 34.1385662099826],
      [44.4586332505728, 34.1384052774417],
      [44.4585544888344, 34.1383167645442],
      [44.4584584377892, 34.1382550737369],
      [44.4583681496617, 34.1382336160648],
      [44.4582144674401, 34.1382443449008],
      [44.4580511796111, 34.1382953068721],
      [44.4579455225357, 34.1383167645442],
      [44.4578437073535, 34.138289942454],
      [44.4578129706597, 34.1382604381549],
      [44.4577611024728, 34.1381853363024],
      [44.457738049942, 34.1381021878229],
      [44.4577438130808, 34.1379600307452],
      [44.4577630235393, 34.1379010221468],
      [44.4578878913644, 34.1377052208887],
      [44.4580338903476, 34.1372841140734],
      [44.4581145738479, 34.1369622489916],
      [44.458141468316, 34.136860325049],
      [44.4581722048358, 34.1366859814631],
      [44.45837696275593, 34.136785709947716],
      [44.4583796759182, 34.1367771765696],
      [44.458412501711145, 34.136730724662904],
      [44.458411541199126, 34.136659646124016],
      [44.45840481761456, 34.13662880072035],
      [44.45838176531873, 34.136585885376114],
      [44.45836159455235, 34.1365657688085],
      [44.45821367538454, 34.1364410460893],
      [44.45812338687591, 34.13622781047261],
      [44.45797258554269, 34.13606956014073],
      [44.45738474587903, 34.13571282067046],
      [44.457104270723825, 34.135621625563935],
      [44.456981322282935, 34.13544996418699],
      [44.45671621382039, 34.13517101444944],
      [44.456574053710874, 34.1351280991052],
      [44.456439577610894, 34.135149556777336],
      [44.456241985432264, 34.13513904172906],
      [44.45607004709301, 34.13506259877212],
      [44.45604006918028, 34.13501409735036],
      [44.45559245054639, 34.13443339909866],
      [44.45537260173406, 34.134094940840356],
      [44.45485172893734, 34.13362043762504],
      [44.45477296206328, 34.13328784370717],
      [44.45465769327427, 34.13240539694127],
      [44.45464040293616, 34.13233029508885],
      [44.454590453041554, 34.132180091384036],
      [44.45448863196934, 34.13197087908088],
      [44.45440986460215, 34.13180994653999],
      [44.45437689618369, 34.13173062579773],
      [44.454342315334905, 34.13162065522811],
      [44.454328867221456, 34.13148386256834],
      [44.454328867221456, 34.131365845371704],
      [44.45435384228678, 34.13128269689222],
      [44.45441531932483, 34.131183455158684],
      [44.45447679629771, 34.13104666249893],
      [44.454486402068845, 34.130928645302276],
      [44.45445566359564, 34.13078917043349],
      [44.454432609730034, 34.130711386372056],
      [44.45438265965648, 34.13064701335571],
      [44.45429812866478, 34.13057191150329],
      [44.45423088801521, 34.13052094953201],
      [44.454207834060284, 34.13047535197874],
      [44.454207834060284, 34.130397567917306],
      [44.454127145145826, 34.130368063618164],
      [44.45401955975195, 34.13018299119612],
      [44.45392350119593, 34.12985039727828],
      [44.45366581416124, 34.12940551891485],
      [44.45350827708509, 34.128858348275806],
      [44.453423744819055, 34.12874033107914],
      [44.453116353722194, 34.128525754357966],
      [44.453103, 34.128534],
      [44.4530111227112, 34.1285897335518],
      [44.4529611714135, 34.1285870513428],
      [44.4528958504208, 34.128624602269],
      [44.4527229415766, 34.1285414537896],
      [44.452544268541, 34.1284878096093],
      [44.4523540676291, 34.1285253605355],
      [44.4521677085343, 34.1286541065682],
      [44.4521081503469, 34.1286380133141],
      [44.45196790018, 34.1284690341462],
      [44.4517277450182, 34.1283161482323],
      [44.4515798089307, 34.1281874021996],
      [44.451470297558, 34.1281203469742],
      [44.4512589592577, 34.128090842675],
      [44.4510668328429, 34.1281230291832],
      [44.4507863271346, 34.1284127077568],
      [44.4506614440408, 34.1284985384452],
      [44.4505749863423, 34.1284341654289],
      [44.4505192690905, 34.1282464107978],
      [44.450475079508, 34.1281498512733],
      [44.4504366537567, 34.1281337580192],
      [44.4503290615176, 34.1281096181381],
      [44.4502887143765, 34.1281391224372],
      [44.4501964922343, 34.1282437285888],
      [44.45014077464, 34.128444894265],
      [44.4500831356713, 34.1285843691337],
      [44.44998322799, 34.1286809286583],
      [44.449821838316, 34.1286916574943],
      [44.4496104939888, 34.1286728820312],
      [44.4494548672403, 34.1286943397033],
      [44.4492358362858, 34.1287828526008],
      [44.4490609951767, 34.1288740477073],
      [44.448978377766, 34.1289571961868],
      [44.4488938388984, 34.1291100821006],
      [44.4487900865044, 34.1291073998916],
      [44.4487458956046, 34.129000111531],
      [44.4486613563982, 34.1289625606048],
      [44.4485710530399, 34.1288847765433],
      [44.448319355645, 34.1286004623878],
      [44.4482002313064, 34.1285495004165],
      [44.4479139476424, 34.128469034146],
      [44.4478082720997, 34.1284288010108],
      [44.4476065273473, 34.1281847199905],
      [44.447368275519, 34.1280184230315],
      [44.4471646078399, 34.1278253039825],
      [44.4470762235303, 34.1276804646957],
      [44.4470819877285, 34.1276107272613],
      [44.4471415510974, 34.1273585996138],
      [44.4471569222741, 34.1272674045073],
      [44.4471511580833, 34.1271547517287],
      [44.4471357869051, 34.127026005696],
      [44.44713194411, 34.1268141111838],
      [44.4471050445366, 34.1267658314215],
      [44.4469782320941, 34.126669271897],
      [44.4466016359759, 34.1265700301635],
      [44.446550, 34.126557],
      [44.446470161065655, 34.12655442683565],
      [44.446416361292734, 34.12655710904467],
      [44.44634911150642, 34.12659197776187],
      [44.4461396759582, 34.12691116063464],
      [44.445827110437754, 34.12697375698652],
      [44.44562920169085, 34.12694693489637],
      [44.44534212558365, 34.1270357914926],
      [44.445235296918234, 34.12726711434511],
      [44.445196867696154, 34.12737976712374],
      [44.44516420283739, 34.12750314873843],
      [44.44506560243869, 34.127621489558834],
      [44.44494262847879, 34.127602714095744],
      [44.44484847636458, 34.12749810794415],
      [44.44483310457631, 34.12739886621061],
      [44.44486576962149, 34.127227204833666],
      [44.44483694752374, 34.127077001128825],
      [44.44478506771174, 34.12699385264936],
      [44.444534057987134, 34.12726940835829],
      [44.44446584527602, 34.12729488934393],
      [44.44433518408433, 34.12724526847717],
      [44.4442102870819, 34.127080312622745],
      [44.44420164035641, 34.12706958378669],
      [44.44413630949985, 34.12703069175596],
      [44.444037352327015, 34.127022645128925],
      [44.443900213929, 34.12703633786266],
      [44.44376955146352, 34.127076570997886],
      [44.44360910523943, 34.12717178941792],
      [44.4433433119739, 34.127469382312675],
      [44.44319151144848, 34.12756460073271],
      [44.443151081156394, 34.127561885107184],
      [44.44312514050248, 34.127524334180976],
      [44.44299801023478, 34.1272760228544],
      [44.44290193342726, 34.12715800565775],
      [44.442880796508256, 34.12712850135858],
      [44.442742445575504, 34.12709095043237],
      [44.44260360037357, 34.12710139942037],
      [44.44248446429875, 34.127133585928554],
      [44.44231152440003, 34.12719527673588],
      [44.44215395648801, 34.127200641153934],
      [44.442061721414134, 34.12723282766209],
      [44.4419521920735, 34.12729183626043],
      [44.441830602707675, 34.127289888533404],
      [44.44172491608433, 34.127332803877636],
      [44.44160001346311, 34.127453503283306],
      [44.441567346579376, 34.12751519409066],
      [44.441519307011035, 34.127737817438884],
      [44.441386717596075, 34.12785047021752],
      [44.441026094664366, 34.12797368156657],
      [44.44066098954206, 34.1281614361976],
      [44.44054184947873, 34.1281614361976],
      [44.44027282262944, 34.12811852085336],
      [44.43981982278665, 34.12829167722917],
      [44.439758330280235, 34.128302406065224],
      [44.43938168725658, 34.128120015852225],
      [44.43929482403986, 34.12817932007371],
      [44.43925639088328, 34.12817127344667],
      [44.43922180102061, 34.128093489385236],
      [44.4391987411007, 34.12792182800829],
      [44.43915646455708, 34.127766259885426],
      [44.439048851397935, 34.12759728071747],
      [44.43898735807455, 34.127524861074086],
      [44.43894123803925, 34.1274926745659],
      [44.43888358794358, 34.12746853468475],
      [44.43881632942625, 34.1274578058487],
      [44.438791347671376, 34.12748194572985],
      [44.438775974278435, 34.12760800955354],
      [44.43876444423104, 34.12781453964769],
      [44.43878366097543, 34.12795669672546],
      [44.43878366097543, 34.128069349504095],
      [44.43876636590577, 34.128098853803266],
      [44.43874138412939, 34.1281069004303],
      [44.43869170330921, 34.128081505192874],
      [44.43866479982267, 34.12807345856584],
      [44.43851288414987, 34.12788355860882],
      [44.43844178183213, 34.127773588039204],
      [44.4382181085966, 34.127206626408906],
      [44.43816237947728, 34.127021553986864],
      [44.43808743333589, 34.126688960069025],
      [44.438065357247055, 34.126635354361824],
      [44.43789240417788, 34.1263778622964],
      [44.43783667474581, 34.12626789172678],
      [44.43771945059329, 34.1259808953622],
      [44.43770984204568, 34.125927251181906],
      [44.437862827155044, 34.12462471036949],
      [44.43792432167003, 34.12401853113212],
      [44.437941616990635, 34.12383345871009],
      [44.43794467099871, 34.1234308904666],
      [44.43780823000331, 34.12300978365125],
      [44.437384876487435, 34.122105594914295],
      [44.43724651245096, 34.121711310189106],
      [44.43721576484249, 34.12151014451299],
      [44.43720231275868, 34.12143236045155],
      [44.43718501721774, 34.121107813160755],
      [44.437148948811064, 34.12099459229162],
      [44.43709321866505, 34.12091144381216],
      [44.43702595807272, 34.1208631640499],
      [44.43695485393321, 34.120844388586804],
      [44.436776132332994, 34.12086852846792],
      [44.436747306216915, 34.120860481840886],
      [44.43665506254922, 34.12082024870566],
      [44.436583957955285, 34.1207719689434],
      [44.43649747927771, 34.12060567198448],
      [44.43641484397652, 34.12033745108298],
      [44.43636872189677, 34.12009068785361],
      [44.436341817333336, 34.119682992083355],
      [44.436295695195575, 34.119489873034276],
      [44.436211137847785, 34.11928066073112],
      [44.436065083956905, 34.119098270518094],
      [44.43591902969847, 34.118867600542835],
      [44.43589981200552, 34.11883004961662],
      [44.435807566990796, 34.11850818453483],
      [44.43571916538078, 34.118046844584256],
      [44.43570763472608, 34.1177303439205],
      [44.43568072985617, 34.11763378439597],
      [44.435564494967394, 34.11750488364118],
      [44.4354491880099, 34.11743514620679],
      [44.435310819358506, 34.11736540877239],
      [44.4351147965377, 34.11721520506758],
      [44.43506098623576, 34.117113281125],
      [44.43501870667783, 34.11688261114971],
      [44.43503408106611, 34.11667876326459],
      [44.435057142640865, 34.1165553816499],
      [44.4353646294288, 34.115745354527405],
      [44.43562599191772, 34.115069437855645],
      [44.43602505381783, 34.11470587974249],
      [44.436159577244524, 34.11433037048041],
      [44.43627103927614, 34.114164073521465],
      [44.436598547595835, 34.11382686457838],
      [44.43682528733173, 34.113644654575936],
      [44.437048208623864, 34.11336570483839],
      [44.43722116420891, 34.11303847533857],
      [44.43732109386756, 34.112738067928916],
      [44.43733646764592, 34.11260932189618],
      [44.43725191181452, 34.11126285297072],
      [44.437155825492916, 34.11106436950361],
      [44.437052052086926, 34.11091953021682],
      [44.436909843784726, 34.1108283351103],
      [44.43670229590748, 34.110715682331666],
      [44.436656174056175, 34.11067813140548],
      [44.43648706028782, 34.11038845283185],
      [44.436506277786314, 34.11009877425825],
      [44.436513964783934, 34.109894926373116],
      [44.4364255642499, 34.109176094357124],
      [44.43644938395745, 34.10892358999104],
      [44.43653009746076, 34.108687555597726],
      [44.43661081085182, 34.10846225004047],
      [44.436699211103694, 34.1082154868111],
      [44.4368222025345, 34.10790971498339],
      [44.43689522857321, 34.107775604532655],
      [44.43696441105144, 34.10771123151631],
      [44.43716427108087, 34.107485925959054],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );
  var startPoint = new ymaps.Placemark(
    [44.4668840385744, 34.1438761517742],
    {
      hintContent: "Солнечная тропа",
      balloonContent: `<a href="krym/solnechnaya-tropa/"><figure id="Solnechnaya" class="catalog-item">
    <img src="krym/solnechnaya-tropa/img/for-slider.jpg" alt="Солнечная тропа" class="trail-img">
    <figcaption class="trail-info">
        <a href="krym/solnechnaya-tropa/" class="trail-title-link">
            <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
                title="Солнечная тропа">Солнечная тропа
            </h2>
        </a>
        <a href="krym/solnechnaya-tropa/" id="trail-location" class="trail-location-black"
            title="Республика Крым, пгт. Ливадия">
            <p id="color-letters-cot" class="black-color size-card-elem-p">
                Республика Крым, пгт.&nbsp;Ливадия</p>
        </a>
        <div class="trail-spec">
            <a href="krym/solnechnaya-tropa/" class="trail-distance">
                <div class="img-card-color">
                    <img src="/img/dist-orange.svg" alt="Длина тропы">
                </div>
                <p id="color-letters-cot" class="black-color">6,7 км</p>
            </a>
            <a href="krym/solnechnaya-tropa/" class="trail-difficulty">
                <div id="easy" class="img-card-color">
                    <img src="/img/difficulty-easy.svg" alt="Сложность тропы">
                </div>
                <p id="color-letters-cot" class="black-color">Простая</p>
            </a>
            <a href="krym/solnechnaya-tropa/" class="trail-duration">
                <div class="img-card-color">
                    <img src="/img/duration-orange.svg" alt="Длительность тропы">
                </div>
                <p id="color-letters-cot" class="black-color">~2,5 ч</p>
            </a>
        </div>
    </figcaption>
 </figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [44.43716523194472, 34.10748572466747],
    {
      hintContent: "Конец экотропы",
      //////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );
  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);
  // =======================================Воздушная экотропа
  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.

      [55.83383904699007, 37.613389041944814],
      [55.83389338954267, 37.61325359038959],
      [55.83396961993935, 37.61312886767038],
      [55.83413705266413, 37.61304013023897],
      [55.83417026175532, 37.61299721489473],
      [55.83419818755997, 37.61290870199724],
      [55.834205735071286, 37.612770568232975],
      [55.83418762104168, 37.61264316330479],
      [55.83417026175532, 37.61256269703434],
      [55.83410157928524, 37.61246211419628],
      [55.834064596366275, 37.61242053995654],
      [55.834042708499645, 37.61240578780695],
      [55.833939307031365, 37.61239103565737],
      [55.83387364318188, 37.61234946141765],
      [55.83383091568284, 37.6122694654701],
      [55.83374789217387, 37.61221582128981],
      [55.833692039894984, 37.61204281880834],
      [55.8336226018143, 37.611962352537894],
      [55.83359543035752, 37.611871157431395],
      [55.83361432724608, 37.61179203176221],
      [55.83360602485676, 37.61175582194051],
      [55.83358036291488, 37.61172497653685],
      [55.83354726236607, 37.61152386026556],
      [55.833548771893824, 37.61145412283116],
      [55.83356235764097, 37.61136292772466],
      [55.83357594338333, 37.61100351171667],
      [55.833550281421516, 37.61093243317778],
      [55.83349097161835, 37.610879322079725],
      [55.833446440458395, 37.610879322079725],
      [55.83335964228758, 37.610924919633],
      [55.83330378944872, 37.61092089631947],
      [55.83324675436799, 37.61100138302778],
      [55.833218827877204, 37.61104698058103],
      [55.83318800063268, 37.61118007542508],
      [55.83317592429649, 37.611220308560306],
      [55.83310044711002, 37.61135307790655],
      [55.83308610642795, 37.611409404295856],
      [55.8330627084616, 37.61169505955595],
      [55.833018656300794, 37.61182594607349],
      [55.83301186333245, 37.61191714117999],
      [55.83301639197815, 37.61213976452824],
      [55.83298695577166, 37.61226046393391],
      [55.83297110549736, 37.61247235844608],
      [55.83299299396969, 37.612649384241074],
      [55.832982474494756, 37.61278220688199],
      [55.8329115255892, 37.61290558849667],
      [55.83284812432958, 37.61295655046795],
      [55.83280887587875, 37.61297532593107],
      [55.83265942949032, 37.61297532593107],
      [55.83253444849195, 37.61300561002512],
      [55.832496709291966, 37.612989516771044],
      [55.832404625489666, 37.612892957246515],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );
  var startPoint = new ymaps.Placemark(
    [55.83383980174827, 37.613395747467365],
    {
      hintContent: "Воздушная экотропа",
      balloonContent: `<a href="/catalog/moskva/vozdushnaya-ecotropa/"><figure id="VDNH" class="catalog-item">
      <img src="/catalog/moskva/vozdushnaya-ecotropa/img/for-slider.jpg" alt="Воздушная экотропа" class="trail-img">
      <figcaption class="trail-info">
          <a href="/catalog/moskva/vozdushnaya-ecotropa/" class="trail-title-link">
              <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
                  title="Воздушная экотропа">Воздушная экотропа</h2>
          </a>
          <a href="/catalog/moskva/vozdushnaya-ecotropa/" id="trail-location" class="trail-location-black"
              title="г. Москва, парк ВДНХ">
              <p id="color-letters-cot" class="black-color size-card-elem-p">г. Москва, парк ВДНХ</p>
          </a>
          <div class="trail-spec">
              <a href="/catalog/moskva/vozdushnaya-ecotropa/" class="trail-distance">
                  <div class="img-card-color">
                      <img src="/img/dist-orange.svg" alt="Длина тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">0,5 км</p>
              </a>
              <a href="/catalog/moskva/vozdushnaya-ecotropa/" class="trail-difficulty">
                  <div id="easy" class="img-card-color">
                      <img src="/img/difficulty-easy.svg" alt="Сложность тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">Простая</p>
              </a>
              <a href="/catalog/moskva/vozdushnaya-ecotropa/" class="trail-duration">
                  <div class="img-card-color">
                      <img src="/img/duration-orange.svg" alt="Длительность тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">~0,5 ч</p>
              </a>
          </div>
      </figcaption>
  </figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [55.832402928275506, 37.612892266370395],
    {
      hintContent: "Конец экотропы",
      //////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );
  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);
  // Токсовские высоты (Еловые холмы)
  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.

      [60.1679460496032, 30.5340693038021],
      [60.1668514315289, 30.5291939987275],
      [60.1667765840859, 30.5286790145966],
      [60.1667872765882, 30.5280996574494],
      [60.1668193540742, 30.5275632156464],
      [60.1668621240068, 30.5270696891876],
      [60.1661350275571, 30.52496683732],
      [60.1659639436934, 30.5245805992218],
      [60.1657500876071, 30.5244947685333],
      [60.1655790017325, 30.5247522605988],
      [60.1652876606208, 30.5249771172789],
      [60.1650844931766, 30.5251487786558],
      [60.1649027107108, 30.5255779320982],
      [60.1648171656719, 30.5257495934751],
      [60.1646033020971, 30.5254706437376],
      [60.1642611174727, 30.5252131516722],
      [60.1638761554969, 30.5250629479673],
      [60.1636622857774, 30.5249127442625],
      [60.1635446568364, 30.5245050484922],
      [60.1635553503939, 30.5240329797056],
      [60.1637371403381, 30.5236681992796],
      [60.1639937832473, 30.5232605035093],
      [60.164346663964, 30.5227240617063],
      [60.1645391427524, 30.5221447045591],
      [60.1647850862247, 30.5218872124937],
      [60.1651593444869, 30.5217155511167],
      [60.1654908268046, 30.5218228394773],
      [60.1656298345201, 30.5226167733458],
      [60.1658971553914, 30.5221661622312],
      [60.1660254686346, 30.5220803315428],
      [60.1661003177943, 30.5221447045591],
      [60.1664317905881, 30.523389249542],
      [60.1667204899653, 30.5243548447874],
      [60.1667739525336, 30.5245265061644],
      [60.1672230346618, 30.5234321648863],
      [60.1675224193261, 30.5231746728208],
      [60.1677576482136, 30.5227669770506],
      [60.1680249517166, 30.5225524003294],
      [60.1683991729552, 30.5226167733458],
      [60.168805465458, 30.5228742654112],
      [60.1691369108715, 30.5230673844603],
      [60.1694362780387, 30.5235179955748],
      [60.169590666198, 30.5242399640139],
      [60.1697327789603, 30.5247631437612],
      [60.169379956277, 30.5246987707449],
      [60.1690485133237, 30.5248489744497],
      [60.1687491426113, 30.5251708395315],
      [60.168449769162, 30.5255356199575],
      [60.1682145452461, 30.525986231072],
      [60.1680541643347, 30.5264368421865],
      [60.1680007038563, 30.5269303686453],
      [60.1680648564199, 30.5275311834646],
      [60.1678189375771, 30.5280032522512],
      [60.1676478625103, 30.5283036596609],
      [60.1675789038243, 30.5287802111699],
      [60.1676856185165, 30.5295845877552],
      [60.1678032325853, 30.5303141486072],
      [60.1679315383605, 30.5310651671314],
      [60.1679101540996, 30.5317947279835],
      [60.1678139247525, 30.5323311697864],
      [60.1677497716974, 30.5327603232288],

    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );
  var startPoint = new ymaps.Placemark(
    [60.16794650735289, 30.5340212103623],
    {
      hintContent: "Еловые холмы",
      balloonContent: `<a href="/catalog/lenoblast/elovye-holmy/"><figure id="ElovyeHolmy" class="catalog-item">
      <img src="/catalog/lenoblast/elovye-holmy/img/for-slider.jpg" alt="Еловые холмы"
          class="trail-img">
      <figcaption class="trail-info">
          <a href="/catalog/lenoblast/elovye-holmy/" class="trail-title-link">
              <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
                  title="Еловые холмы">Еловые холмы</h2>
          </a>
          <a href="/catalog/lenoblast/elovye-holmy/" id="trail-location" class="trail-location-black" title="Ленинградская область, пос. Токсово">
              <p id="color-letters-cot" class="black-color size-card-elem-p">
                  Ленинградская область, пос. Токсово</p>
          </a>
          <div class="trail-spec">
              <a href="/catalog/lenoblast/elovye-holmy/" class="trail-distance">
                  <div class="img-card-color">
                      <img src="/img/dist-orange.svg" alt="Длина тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">3,2 км</p>
              </a>
              <a href="/catalog/lenoblast/elovye-holmy/" class="trail-difficulty">
                  <div id="easy" class="img-card-color">
                      <img src="/img/difficulty-easy.svg" alt="Сложность тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">Простая</p>
              </a>
              <a href="/catalog/lenoblast/elovye-holmy/" class="trail-duration">
                  <div class="img-card-color">
                      <img src="/img/duration-orange.svg" alt="Длительность тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">~1,5 ч</p>
              </a>
          </div>
      </figcaption>
  </figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [60.16794650735289, 30.5340212103623],
    {
      hintContent: "Конец экотропы",
      //////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );
  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);
  // Большая Севастопольская тропа
  //   var myPolyline = new ymaps.Polyline(
  //     [
  //       // Указываем координаты вершин.

  //       [44.43088285674113, 33.7059104185999],
  //       [44.43063684844653, 33.705513451665695],
  //       [44.43059072177524, 33.705084298223305],
  //       [44.430413902529, 33.70467660245304],
  //       [44.43030627315891, 33.70366809186344],
  //       [44.43025245839903, 33.70345351514226],
  //       [44.4299987595733, 33.70284197148687],
  //       [44.42986037792832, 33.70240208920843],
  //       [44.42996800812515, 33.702048037618454],
  //       [44.43044465374095, 33.7014794093073],
  //       [44.43057534620999, 33.70106098470096],
  //       [44.43083673026533, 33.70071766194707],
  //       [44.4309289831803, 33.700277779668625],
  //       [44.43092129544299, 33.69995591458684],
  //       [44.430875168997716, 33.69973060902957],
  //       [44.4307137261506, 33.69970915135747],
  //       [44.43055997064067, 33.699752066701706],
  //       [44.430413902529, 33.69973060902957],
  //       [44.43034471224257, 33.6994623881281],
  //       [44.430398526916925, 33.69889375981695],
  //       [44.43039083910935, 33.69841096219427],
  //       [44.43024477057211, 33.69814274129277],
  //       [44.43021401925427, 33.6976062994898],
  //       [44.43008332597175, 33.69727370557193],
  //       [44.429898817307226, 33.69702694234257],
  //       [44.429814250640014, 33.6967801791132],
  //       [44.42977581120508, 33.69626519498233],
  //       [44.42976812331505, 33.69584677037602],
  //       [44.429598989476624, 33.69524595555668],
  //       [44.429368351630046, 33.69511720952397],
  //       [44.42893782519807, 33.694945548147025],
  //       [44.42869949669312, 33.69478461560613],
  //       [44.428514983630194, 33.694409106344025],
  //       [44.428391974595776, 33.69414088544256],
  //       [44.42821514865218, 33.69382974919682],
  //       [44.42818439625917, 33.69360444363956],
  //       [44.428169020056565, 33.693357680410195],
  //       [44.42834584614068, 33.69304654416446],
  //       [44.42812289142429, 33.69224188145999],
  //       [44.428192084358955, 33.691480134099784],
  //       [44.42774617288888, 33.69073984441166],
  //       [44.427743784471, 33.69044696215369],
  //       [44.427751472629126, 33.69018947008827],
  //       [44.427697655500836, 33.6898354184983],
  //       [44.42770534366508, 33.68957792643288],
  //       [44.427743784471, 33.68928824785925],
  //       [44.42766690283372, 33.68919168833472],
  //       [44.42778222525147, 33.68866597536781],
  //       [44.42793598811875, 33.6883762967942],
  //       [44.4280359337641, 33.68814026240089],
  //       [44.42811281491266, 33.687711108958496],
  //       [44.42824351263156, 33.68739997271276],
  //       [44.42838958620448, 33.68706737879492],
  //       [44.42833576966773, 33.68683134440161],
  //       [44.4280974386911, 33.68610178354956],
  //       [44.42810512680238, 33.685458053385986],
  //       [44.427820666006454, 33.68474995020607],
  //       [44.42788985930132, 33.68335520151832],
  //       [44.42793598811875, 33.68299042109229],
  //       [44.42808206246546, 33.68255053881385],
  //       [44.42788985930132, 33.68236814860085],
  //       [44.42765921466439, 33.682046283519064],
  //       [44.427382439890515, 33.68187462214209],
  //       [44.4270364695676, 33.68169223192909],
  //       [44.42678275668709, 33.681424011027595],
  //       [44.426667432283956, 33.68119870547036],
  //       [44.42648291276247, 33.680705179011596],
  //       [44.42643678279046, 33.680565704142836],
  //       [44.42619844401784, 33.680512059962545],
  //       [44.42596779266113, 33.68035112742165],
  //       [44.42596010426679, 33.680115093028334],
  //       [44.42608311845402, 33.679514278209],
  //       [44.42629839265452, 33.67938553217629],
  //       [44.42645215945187, 33.67909585360266],
  //       [44.42706722256868, 33.67876325968482],
  //       [44.42719023441009, 33.678248275553955],
  //       [44.427582332915115, 33.67818390253761],
  //       [44.428305017338644, 33.6774972570298],
  //       [44.42835883390387, 33.67716466311194],
  //       [44.428381898130844, 33.67663895014502],
  //       [44.42821276025359, 33.67620979670265],
  //       [44.42815894355292, 33.67610250834205],
  //       [44.42826657690435, 33.67545877817847],
  //       [44.42831270542244, 33.6749223363755],
  //       [44.428320393505246, 33.67480431917885],
  //       [44.428228136444616, 33.67464338663795],
  //       [44.427774537097406, 33.67423569086769],
  //       [44.427674591002024, 33.674171317851325],
  //       [44.42752851563005, 33.67390309694983],
  //       [44.42734399884533, 33.673785079753195],
  //       [44.42725174023306, 33.67345248583533],
  //       [44.42695574286225, 33.67278729799965],
  //       [44.4267135620727, 33.67218648318031],
  //       [44.4266366790711, 33.67193971995094],
  //       [44.42688270431782, 33.6707810056565],
  //       [44.42730940188291, 33.67078637007453],
  //       [44.42759002109462, 33.66940771464088],
  //       [44.4275746447346, 33.66916631582954],
  //       [44.42751698334819, 33.6691073072312],
  //       [44.42750545106402, 33.66870497587897],
  //       [44.42744394550985, 33.66853331450202],
  //       [44.427401660403554, 33.668163169657966],
  //       [44.427347842951, 33.667873491084364],
  //       [44.427048001944904, 33.66752480391242],
  //       [44.42682119810389, 33.66684888724066],
  //       [44.426655899831054, 33.66660212401129],
  //       [44.42668280888428, 33.666103233134535],
  //       [44.42667512058462, 33.66599594477393],
  //       [44.42674431524483, 33.66560434225775],
  //       [44.42682888638419, 33.66535221461035],
  //       [44.42676738011324, 33.665137637889174],
  //       [44.42674431524483, 33.664901603495856],
  //       [44.426859639495234, 33.66463338259436],
  //       [44.42689808086113, 33.664365161692885],
  //       [44.42697496351654, 33.66413985613563],
  //       [44.4270403136936, 33.66401647452094],
  //       [44.42711335203975, 33.66353367689826],
  //       [44.427159481474156, 33.663115252291945],
  //       [44.427144105000096, 33.66294359091498],
  //       [44.42705953431993, 33.66270755652169],
  //       [44.427074910816394, 33.662294496333374],
  //       [44.427171013827056, 33.66210137728432],
  //       [44.427136416761535, 33.66194580916145],
  //       [44.42716332559205, 33.66170977476814],
  //       [44.42709797555345, 33.66157566431738],
  //       [44.42700571655021, 33.66151129130104],
  //       [44.42697496351654, 33.66141473177649],
  //       [44.4270364695676, 33.661253799235595],
  //       [44.42701340480608, 33.661092866694695],
  //       [44.42709797555345, 33.66096412066199],
  //       [44.42723636378343, 33.66082464579323],
  //       [44.42720561087194, 33.66069589976052],
  //       [44.42729018133932, 33.66041695002296],
  //       [44.427253662288976, 33.66033380154351],
  //       [44.42729210339396, 33.66026674631812],
  //       [44.42727672695503, 33.660156775748504],
  //       [44.42729786955753, 33.66010581377723],
  //       [44.42726135051202, 33.66005753401497],
  //       [44.427232519670376, 33.65985636833885],
  //       [44.427215221158534, 33.65971152905204],
  //       [44.42725750640062, 33.65961496952751],
  //       [44.427267116678614, 33.65941112164238],
  //       [44.42729594750306, 33.6589283240197],
  //       [44.427293995240234, 33.65877518891826],
  //       [44.427328592211836, 33.658598163123266],
  //       [44.42734012453112, 33.658270933623456],
  //       [44.42736318916281, 33.65776667832864],
  //       [44.42737087737135, 33.6574340844108],
  //       [44.427343968637054, 33.65713367700114],
  //       [44.4273093716746, 33.65668306588665],
  //       [44.42738240968224, 33.65648994683757],
  //       [44.427482356280635, 33.65659187078012],
  //       [44.42761689950674, 33.65669915914073],
  //       [44.42768224896121, 33.656811811919354],
  //       [44.42770915753873, 33.65697810887828],
  //       [44.42771684570143, 33.65712831258312],
  //       [44.42774375426292, 33.65741799115672],
  //       [44.42772453386313, 33.657536008353375],
  //       [44.42759383497583, 33.65805099248424],
  //       [44.42742469480255, 33.658447959418424],
  //       [44.42737856557886, 33.65854921280876],
  //       [44.42732811169848, 33.6586310201837],
  //       [44.42731081321511, 33.65870746314064],
  //       [44.42729015113102, 33.65878994106782],
  //       [44.4272978393492, 33.65894617974296],
  //       [44.42737904609181, 33.659157403702885],
  //       [44.42740163019529, 33.659215071196684],
  //       [44.42753617360849, 33.659382038707875],
  //       [44.42758614679683, 33.65943031847014],
  //       [44.42771684570143, 33.659473233814374],
  //       [44.42811278470479, 33.65952151357664],
  //       [44.42841454222898, 33.65961539089218],
  //       [44.42866217447469, 33.65982655627674],
  //       [44.428927411145715, 33.66022084100194],
  //       [44.429167660707535, 33.66069022757955],
  //       [44.42937715751391, 33.66110060555882],
  //       [44.42948671058868, 33.661309817861984],
  //       [44.42971350401622, 33.66169337375112],
  //       [44.43023243479698, 33.66240147693104],
  //       [44.43067448328457, 33.66305325372166],
  //       [44.43083592624083, 33.66340998752064],
  //       [44.43131256473008, 33.663702348303254],
  //       [44.43145094291325, 33.66383914096303],
  //       [44.43151240614779, 33.663733778116665],
  //       [44.43157198547865, 33.66371500265355],
  //       [44.43165847149527, 33.66379010450597],
  //       [44.43170459731811, 33.66387325298543],
  //       [44.431892944047625, 33.66404223215336],
  //       [44.432075524477575, 33.66437482607123],
  //       [44.432150478382525, 33.6644955254769],
  //       [44.432429152308494, 33.66440701257939],
  //       [44.432555996548956, 33.664348003981075],
  //       [44.43273280927015, 33.66432654630894],
  //       [44.43284043414108, 33.664197800276234],
  //       [44.432915277229604, 33.66410606469622],
  //       [44.432999839379164, 33.66408728923312],
  //       [44.43307479209055, 33.66409265365115],
  //       [44.43321124421406, 33.66398000087252],
  //       [44.433409195316, 33.664073878188034],
  //       [44.433468772699946, 33.66400414075366],
  //       [44.4336917068844, 33.66393172111026],
  //       [44.43410874525794, 33.66414361562243],
  //       [44.43427642211485, 33.66425472197921],
  //       [44.43436674774278, 33.664203760007936],
  //       [44.43474342331409, 33.664324459413606],
  //       [44.434837591824966, 33.66445320544632],
  //       [44.43489140233399, 33.664458569864344],
  //       [44.43503745917848, 33.664324459413606],
  //       [44.43514123618673, 33.66438078580294],
  //       [44.43532666903561, 33.66434156603834],
  //       [44.43545158515961, 33.66436034150143],
  //       [44.4357513827602, 33.66400897212047],
  //       [44.435874376199656, 33.66394191689512],
  //       [44.436254885502386, 33.66361200518629],
  //       [44.43647396548442, 33.66367637820263],
  //       [44.436546991961315, 33.663673695993616],
  //       [44.43666421848207, 33.66358518309613],
  //       [44.436794896947454, 33.663499352407655],
  //       [44.4368967490767, 33.66347789473553],
  //       [44.437015896623684, 33.66324722476026],
  //       [44.43729646891327, 33.66302460141202],
  //       [44.43774615043862, 33.662635681104845],
  //       [44.438218888798055, 33.66251229949017],
  //       [44.43854006180926, 33.6621227446388],
  //       [44.43899357703301, 33.661607760507934],
  //       [44.439270296445436, 33.66128589542615],
  //       [44.43943940210346, 33.660846013147705],
  //       [44.43950858154879, 33.66063143642652],
  //       [44.43950858154879, 33.660373944361076],
  //       [44.43941634227003, 33.66012718113171],
  //       [44.43938559581119, 33.65984823139416],
  //       [44.43950858154879, 33.659547823984504],
  //       [44.43972380596246, 33.65934397609937],
  //       [44.43970843281652, 33.65901138218153],
  //       [44.439992835356996, 33.65837838085401],
  //       [44.440284923001755, 33.657927769739516],
  //       [44.440377160899935, 33.65723039539562],
  //       [44.4404693986515, 33.656436461527235],
  //       [44.44056163625642, 33.65616824062573],
  //       [44.44079991605724, 33.655953663904555],
  //       [44.441068940462856, 33.65572835834729],
  //       [44.44134564997885, 33.655674714167],
  //       [44.44200667292584, 33.655567425806396],

  //       [44.4420096581924, 33.655567425806396],
  //       [44.442057697354755, 33.65555535586582],
  //       [44.44211198156037, 33.65550171168554],
  //       [44.442150412825676, 33.65546281965481],
  //       [44.44220950084644, 33.65532334478604],
  //       [44.44220277538369, 33.655220079738974],
  //       [44.44215617751329, 33.65511480303513],
  //       [44.44211390312425, 33.655077252108924],
  //       [44.44206442283432, 33.654971304852836],
  //       [44.44204328561023, 33.65494247110594],
  //       [44.441982275852034, 33.65477885635601],
  //       [44.44190156993164, 33.65445162685619],
  //       [44.442097569829315, 33.6541994992088],
  //       [44.44224745165731, 33.65397419365154],
  //       [44.44237043132958, 33.65355576904523],
  //       [44.442939208923384, 33.65280475052105],
  //       [44.443361945414985, 33.652343410570495],
  //       [44.44382310898411, 33.65226830871808],
  //       [44.44537566605783, 33.65087356003035],
  //       [44.446121186125524, 33.65089501770245],
  //       [44.44646704269775, 33.65075554283369],
  //       [44.44683595410226, 33.650283474047065],
  //       [44.447189491997, 33.649274963457465],
  //       [44.44744311568128, 33.64897455604778],
  //       [44.44788119034257, 33.64901747139202],
  //       [44.44837305970421, 33.64892091186749],
  //       [44.44878807123424, 33.64870633514631],
  //       [44.44907242927223, 33.64834155472028],
  //       [44.44941058296252, 33.64828791053997],
  //       [44.449741049437236, 33.647730011064894],
  //       [44.45004845842122, 33.647730011064894],
  //       [44.45027901409017, 33.64755834968792],
  //       [44.450816973754165, 33.64761199386824],
  //       [44.451216597703535, 33.64733304413069],
  //       [44.45150862884858, 33.647590536196105],
  //       [44.45248461700772, 33.647837299425476],
  //       [44.453137828255606, 33.64774073990095],
  //       [44.45340679545486, 33.64747251899945],
  //       [44.45398314953908, 33.647590536196105],
  //       [44.454236743521776, 33.64740814598311],
  //       [44.454474967162184, 33.646871704180114],
  //       [44.455251108364884, 33.646871704180114],
  //       [44.455573857094635, 33.64672150047527],
  //       [44.45573523078598, 33.646496194918036],
  //       [44.455996501524794, 33.646099227983825],
  //       [44.45700315130883, 33.646496194918036],
  //       [44.457364311476205, 33.646399635393486],
  //       [44.45771778520689, 33.645863193590515],
  //       [44.4577254693945, 33.64534820945965],
  //       [44.457979047014426, 33.64524092109907],
  //       [44.458117361612516, 33.64536966713178],
  //       [44.458478514841175, 33.645434040148146],
  //       [44.458816613697756, 33.64526237877117],
  //       [44.45901019890992, 33.64505867430166],
  //       [44.45929450683725, 33.645037216629525],
  //       [44.45953270970325, 33.645230335678605],
  //       [44.45991690581242, 33.64524106451466],
  //       [44.46016278998646, 33.644951385941056],
  //       [44.460354886272015, 33.64497284361318],
  //       [44.460762128292835, 33.64469389387563],
  //       [44.4610848463536, 33.644608063187135],
  //       [44.461461348487816, 33.64504794546558],
  //       [44.462029938914064, 33.64515523382618],
  //       [44.4623680170649, 33.64570240446523],
  //       [44.46253705540116, 33.645949167694596],
  //       [44.46260620730576, 33.64606718489126],
  //       [44.46285208007647, 33.64603499838307],
  //       [44.46315173610611, 33.646142286743675],
  //       [44.463628109170564, 33.64570240446523],
  //       [44.46384324411034, 33.645380539383446],
  //       [44.464027644851946, 33.645369810547365],
  //       [44.464227411660225, 33.645520014252206],
  //       [44.46449632743065, 33.6455736584325],
  //       [44.46519550259666, 33.64530543753102],
  //       [44.46587930312006, 33.64530543753102],
  //       [44.46609442970689, 33.64550928541615],
  //       [44.466301872445335, 33.64573459097339],
  //       [44.46649394839319, 33.6457882351537],
  //       [44.46673980467792, 33.64572386213734],
  //       [44.467016391752, 33.645648760284914],
  //       [44.467278771274614, 33.64560140676163],
  //       [44.46753230711924, 33.64598764485976],
  //       [44.46780889041246, 33.646073475548256],
  //       [44.46813156925349, 33.646212950417016],
  //       [44.468300590786754, 33.64645971364639],
  //       [44.468569487664986, 33.64629878110549],
  //       [44.468784604269565, 33.64589108533523],
  //       [44.469545188720794, 33.64521516866347],
  //       [44.4698524927393, 33.645054236122576],
  //       [44.4700983347812, 33.64477528638503],
  //       [44.470167477667616, 33.64460362500808],
  //       [44.470298080672535, 33.64452852315566],
  //       [44.47043636588643, 33.64432467527053],
  //       [44.470651475563464, 33.644228115746],
  //       [44.47078207747792, 33.644045725532976],
  //       [44.470851219548805, 33.643605843254534],
  //       [44.47105864526663, 33.643369808861216],
  //       [44.47121229346797, 33.64310158795975],
  //       [44.47146581210982, 33.64298357076309],
  //       [44.47161945923191, 33.642747536369775],
  //       [44.471903705334135, 33.64258660382888],
  //       [44.47217258549933, 33.64257587499283],
  //       [44.47241841770173, 33.642125263878334],
  //       [44.47266424886155, 33.641932144829255],
  //       [44.47302531148731, 33.64185704297683],
  //       [44.47351696761655, 33.64170683927199],
  //       [44.473801204413824, 33.64176048345231],
  //       [44.473962527381424, 33.64176048345231],
  //       [44.474070075777036, 33.641781941124414],
  //       [44.474262125987124, 33.641642466255654],
  //       [44.47437735580773, 33.64161027974747],
  //       [44.47444649359014, 33.64147080487868],
  //       [44.474723043895054, 33.64141716069839],
  //       [44.47494581956995, 33.64151372022292],
  //       [44.47511482123489, 33.6413849741902],
  //       [44.47532991355028, 33.641309872337786],
  //       [44.4755603687167, 33.64112748212479],
  //       [44.475767777582995, 33.641063109108416],
  //       [44.47619795656912, 33.6413849741902],
  //       [44.47678279937158, 33.64151062513422],
  //       [44.476959477318694, 33.64157499815058],
  //       [44.477266742030814, 33.641650100003005],
  //       [44.477658502176126, 33.64204706693719],
  //       [44.47791199262368, 33.64247622037958],
  //       [44.478034896684, 33.64263715292047],
  //       [44.47835751860218, 33.64262642408442],
  //       [44.478572598883176, 33.642658610592605],
  //       [44.47877999696961, 33.64261569524837],
  //       [44.47891826194817, 33.64242257619929],
  //       [44.479263922951404, 33.64230455900263],
  //       [44.47969407598715, 33.642079253445374],
  //       [44.48013958826529, 33.6415428116424],
  //       [44.48041611140488, 33.64157499815058],
  //       [44.48056205364099, 33.641639371166924],
  //       [44.480876980371846, 33.64167155767511],
  //       [44.48113045674133, 33.64166082883906],
  //       [44.481353207787066, 33.64139260793756],
  //       [44.48178334531423, 33.641220946560615],
  //       [44.4823517364349, 33.64118876005243],
  //       [44.48262824901819, 33.641360421429376],
  //       [44.48305837708053, 33.64075960661006],
  //       [44.48302681218445, 33.64055095763884],
  //       [44.4831189821183, 33.640164719540685],
  //       [44.483280279149795, 33.640068160016156],
  //       [44.48353374500638, 33.63989649863918],
  //       [44.48366431789372, 33.63988576980313],
  //       [44.4843863038414, 33.63956390472134],
  //       [44.48449383289367, 33.63960682006558],
  //       [44.48465512609789, 33.63969265075406],
  //       [44.48477033525459, 33.63996087165555],
  //       [44.4850007528807, 33.63988576980313],
  //       [44.485169725224125, 33.63967119308195],
  //       [44.48530797495677, 33.63979993911466],
  //       [44.485507668432625, 33.63979993911466],
  //       [44.48560751491244, 33.63982139678679],
  //       [44.4857073612202, 33.639681921918005],
  //       [44.48582256828456, 33.63961754890166],
  //       [44.48595313601392, 33.6394137010165],
  //       [44.486083703449005, 33.63932787032803],
  //       [44.48610674473053, 33.63918839545927],
  //       [44.48606066215831, 33.63904892059048],
  //       [44.4860760230198, 33.638855801541425],
  //       [44.48597617734736, 33.63851247878751],
  //       [44.48597617734736, 33.638233529049955],
  //       [44.485937775119844, 33.63801895232878],
  //       [44.48597617734736, 33.63778291793546],
  //       [44.486137466424985, 33.637718544919096],
  //       [44.48609906430438, 33.63746105285367],
  //       [44.48612978600289, 33.637267933804594],
  //       [44.4862910746529, 33.63705335708342],
  //       [44.48628339425118, 33.63677440734586],
  //       [44.4864293217098, 33.636270152051054],
  //       [44.486682773790676, 33.63613067718229],
  //       [44.486667413090075, 33.635926829297155],
  //       [44.48674421655241, 33.63556204887114],
  //       [44.486667413090075, 33.63539038749419],
  //       [44.486713495179686, 33.63527237029753],
  //       [44.486759577232654, 33.63504706474027],
  //       [44.486758617190254, 33.63496928067884],
  //       [44.4867912586228, 33.63486467452727],
  //       [44.48680085904065, 33.63475872727116],
  //       [44.486833500449386, 33.63466619106016],
  //       [44.48684694102411, 33.63459913583478],
  //       [44.486838300655, 33.63452671619138],
  //       [44.4868575014735, 33.6344194278308],
  //       [44.48687094204266, 33.63430677505217],
  //       [44.48686518179912, 33.63418339343748],
  //       [44.486841180778185, 33.63398088665685],
  //       [44.48684694102411, 33.63379581423484],
  //       [44.48704094283595, 33.63324018422417],
  //       [44.487125426094224, 33.632821759617855],
  //       [44.487179188103525, 33.632338961995174],
  //       [44.48728671197245, 33.63204928342157],
  //       [44.48724063033878, 33.63174887601189],
  //       [44.48729439224116, 33.631523570454654],
  //       [44.48727135143196, 33.631148061192555],
  //       [44.48724831061361, 33.630815467274715],
  //       [44.4873635146138, 33.630375584996266],
  //       [44.48766304394217, 33.63001080457025],
  //       [44.487947211360655, 33.62962456647212],
  //       [44.48810081479027, 33.6292812437182],
  //       [44.48820065680113, 33.62881990376765],
  //       [44.488331219171094, 33.628744801915225],
  //       [44.48843874090189, 33.62839075032525],
  //       [44.4885232221218, 33.62789722386652],
  //       [44.48856162263558, 33.627350053227474],
  //       [44.4886153833121, 33.627114018834156],
  //       [44.48894562637339, 33.62684579793269],
  //       [44.489114587211645, 33.626427373326344],
  //       [44.489176027394294, 33.62623425427729],
  //       [44.48969826631581, 33.62563343945796],
  //       [44.490059222818815, 33.62496825162225],
  //       [44.49030497915091, 33.62476440373712],
  //       [44.49085024728987, 33.62449618283562],
  //       [44.49124959534684, 33.62338038388545],
  //       [44.49197148677088, 33.62300487462334],
  //       [44.49226331266533, 33.622790297902164],
  //       [44.4923643106375, 33.62275700655477],
  //       [44.4923873494211, 33.62217764940754],
  //       [44.49244110654723, 33.62199525919454],
  //       [44.492348951443326, 33.62176995363728],
  //       [44.492402708605084, 33.621201325326126],
  //       [44.49242574737343, 33.620911646752525],
  //       [44.492379669827585, 33.62081508722797],
  //       [44.49254094107772, 33.620321560769234],
  //       [44.49259469806131, 33.62010698404806],
  //       [44.49268685277425, 33.619892407326844],
  //       [44.492748289168105, 33.61944179621235],
  //       [44.49280972549679, 33.61885171022909],
  //       [44.49289420034233, 33.6187122353603],
  //       [44.493009393114995, 33.61859421816364],
  //       [44.49305547015991, 33.61845474329488],
  //       [44.49298635457879, 33.61829381075399],
  //       [44.49337032898585, 33.61734967318073],
  //       [44.49353159747778, 33.61670594301715],
  //       [44.49352391803596, 33.616244603066605],
  //       [44.49356999467159, 33.61577253427998],
  //       [44.49347016191474, 33.61545066919819],
  //       [44.49299403409187, 33.615150261788536],
  //       [44.49280972549679, 33.61496787157551],
  //       [44.49263309587619, 33.61460309114948],
  //       [44.49245646571697, 33.61429195490375],
  //       [44.49243342696085, 33.61392717447772],
  //       [44.49245646571697, 33.61354093637959],
  //       [44.492487184044215, 33.613176155953575],
  //       [44.49245646571697, 33.61284356203571],
  //       [44.49253326150456, 33.61235003557697],
  //       [44.49253326150456, 33.61203889933126],
  //       [44.492471824882635, 33.61123423662679],
  //       [44.49242574737343, 33.610762167840164],
  //       [44.49232591264443, 33.610333014397774],
  //       [44.49229519423166, 33.610193539529014],
  //       [44.492471824882635, 33.60971074190633],
  //       [44.49262541631526, 33.60930304613607],
  //       [44.49273293007575, 33.60906701174276],
  //       [44.49278668688117, 33.60876660433308],
  //       [44.4927790073406, 33.608423281579185],
  //       [44.49267149366561, 33.607833195595894],
  //       [44.492648454995006, 33.607404042153505],
  //       [44.49275596871275, 33.607071448235665],
  //       [44.49290187986763, 33.606921244530824],
  //       [44.49310922666599, 33.60681395617024],
  //       [44.49364678898281, 33.60671739664569],
  //       [44.493892530094584, 33.606642294793296],
  //       [44.494222743071745, 33.60611658182638],
  //       [44.49422201925473, 33.605190213285844],
  //       [44.4943295300517, 33.60481470402377],
  //       [44.494467757925996, 33.604374821745324],
  //       [44.49461366476876, 33.6040100413193],
  //       [44.49479796762371, 33.60359161671298],
  //       [44.49502066612432, 33.60321610745088],
  //       [44.49518960924325, 33.60286205586094],
  //       [44.495258722195324, 33.602647479139726],
  //       [44.4953508726698, 33.60222905453342],
  //       [44.49545838137138, 33.6017033415665],
  //       [44.495658039859165, 33.601005967222605],
  //       [44.495903772437735, 33.600533898436005],
  //       [44.49604199655502, 33.60036223705903],
  //       [44.49618981920429, 33.60032200392381],
  //       [44.49630500542269, 33.600254948698456],
  //       [44.49645858669087, 33.60015570696489],
  //       [44.496529617889664, 33.60016911800998],
  //       [44.49658529093053, 33.600128884874756],
  //     ],
  //     [],

  //     {
  //       // Задаем опции геообъекта.
  //       // Цвет с прозрачностью.
  //       strokeColor: "#F28123",
  //       // Ширину линии.
  //       strokeWidth: 2,
  //       // Максимально допустимое количество вершин в ломаной.
  //       editorMaxPoints: 6,
  //       // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
  //       editorMenuManager: function (items) {
  //         items.push({
  //           title: "Удалить линию",
  //           onClick: function () {
  //             myMap.geoObjects.remove(myPolyline);
  //           },
  //         });
  //         return items;
  //       },
  //     }
  //   );
  //   var startPoint = new ymaps.Placemark(
  //     [44.43088285674113, 33.7059104185999],
  //     {
  //       hintContent: "Большая Севастопольская экотропа",
  //       balloonContent: `<a href="/bolshaya-sevastopolskaya-tropa/"><figure id="Big_Sevas" class="catalog-item">
  //       <img src="/img/for-slider-25-Крым-Большая-Севастопольская.jpg" alt="Большая Севастопольская экотропа"
  //           class="trail-img">
  //       <figcaption class="trail-info">
  //           <a href="/bolshaya-sevastopolskaya-tropa/" class="trail-title-link">
  //               <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
  //                   title="Большая севастопольская">Большая <br> севастопольская</h2>
  //           </a>
  //           <a href="/bolshaya-sevastopolskaya-tropa/" id="trail-location" class="trail-location-black" title="Республика Крым, Севастополь,
  //               Балаклава">
  //               <p id="color-letters-cot" class="black-color size-card-elem-p">
  //                   Севастополь,
  //                   Балаклава</p>
  //           </a>
  //           <div class="trail-spec">
  //               <a href="/bolshaya-sevastopolskaya-tropa/" class="trail-distance">
  //                   <div class="img-card-color">
  //                       <img src="/img/dist-orange.svg" alt="Длина тропы">
  //                   </div>
  //                   <p id="color-letters-cot" class="black-color">117 км</p>
  //               </a>
  //               <a href="/bolshaya-sevastopolskaya-tropa/" class="trail-difficulty">
  //                   <div id="hard" class="img-card-color">
  //                       <img src="/img/difficulty-hard.svg" alt="Сложность тропы">
  //                   </div>
  //                   <p id="color-letters-cot" class="black-color">Сложная</p>
  //               </a>
  //               <a href="/bolshaya-sevastopolskaya-tropa/" class="trail-duration">
  //                   <div class="img-card-color">
  //                       <img src="/img/duration-orange.svg" alt="Длительность тропы">
  //                   </div>
  //                   <p id="color-letters-cot" class="black-color">~40 ч</p>
  //               </a>
  //           </div>
  //       </figcaption>
  //   </figure></a>`,
  //     },
  //     {
  //       iconLayout: "default#image",
  //       iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
  //       iconImageSize: [32, 51],
  //       iconImageOffset: [-10, -45],
  //     }
  //   );

  //   var endPoint = new ymaps.Placemark(
  //     [44.49658529093053, 33.600128884874756],
  //     {
  //       hintContent: "Конец экотропы",
  //       //////balloonContent: "Это Конец экотропы",
  //     },
  //     {
  //       iconLayout: "default#image",
  //       iconImageHref: "2",
  //       iconImageSize: [15, 15],
  //       iconImageOffset: [0, 0],
  //     }
  //   );
  //   // Добавляем линию на карту.
  //   myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

  // // Реликтовый лес
  // var myPolyline = new ymaps.Polyline(
  //   [
  //     // Указываем координаты вершин.

  //     [43.6586705395959, 40.250742455585296],
  //     [43.65943388814301, 40.25137545691282],
  //     [43.659605250759334, 40.251944085223975],
  //     [43.65969872106974, 40.252459069354835],
  //     [43.659628618350666, 40.2528667651251],
  //     [43.6595117803024, 40.25327446089536],
  //     [43.66007260084599, 40.25363924132138],
  //     [43.66015049217095, 40.25397183523925],
  //     [43.6595117803024, 40.25514127836974],
  //     [43.659262525034165, 40.25561334715634],
  //     [43.65908337216649, 40.255924483402076],
  //     [43.65878737929269, 40.256299992664154],
  //     [43.6586705395959, 40.25667550192626],
  //     [43.65877180067967, 40.256782790286834],
  //     [43.65901326872392, 40.25671841727049],
  //     [43.65943388814301, 40.25663258658202],
  //     [43.661178648123325, 40.25656821356565],
  //     [43.661435684341, 40.25640728102476],
  //     [43.662510551062724, 40.256031771762686],
  //     [43.6626974824274, 40.25604250059874],
  //     [43.66271306001467, 40.25620343313963],
  //     [43.66270527122153, 40.25633217917234],
  //     [43.66229246372977, 40.25705101118833],
  //     [43.662113319966586, 40.257319232089834],
  //     [43.66203543120601, 40.25782348738462],
  //     [43.66208995334909, 40.25797369108946],
  //     [43.6621989974857, 40.25805952177793],
  //     [43.66233919679685, 40.25802733526975],
  //     [43.66249497342253, 40.257887860400984],
  //     [43.662728637597866, 40.25784494505675],
  //     [43.66290777951204, 40.25799514876159],
  //     [43.66314923080552, 40.25834920035154],
  //     [43.66332058274311, 40.25853159056456],
  //     [43.66342962462876, 40.258563777072744],
  //     [43.66356982104585, 40.25851013289243],
  //     [43.663902827296226, 40.2582148358915],
  //     [43.66410533151872, 40.25815046287516],
  //     [43.66496207254061, 40.25815046287516],
  //     [43.66541380375801, 40.25813973403908],
  //     [43.66560072601904, 40.258096818694845],
  //     [43.66586553155215, 40.25793588615395],
  //     [43.66618485430693, 40.25750673271158],
  //     [43.666340620883645, 40.25745308853127],
  //     [43.66674630353562, 40.257757325791545],
  //     [43.667400514260365, 40.25813283505362],
  //     [43.66775098133784, 40.258336682938754],
  //     [43.66801577731862, 40.258186479233935],
  //     [43.668412969084144, 40.25817575039786],
  //   ],
  //   [],

  //   {
  //     // Задаем опции геообъекта.
  //     // Цвет с прозрачностью.
  //     strokeColor: "#010101",
  //     // Ширину линии.
  //     strokeWidth: 1,
  //     // Максимально допустимое количество вершин в ломаной.
  //     editorMaxPoints: 6,
  //     // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
  //     editorMenuManager: function (items) {
  //       items.push({
  //         title: "Удалить линию",
  //         onClick: function () {
  //           myMap.geoObjects.remove(myPolyline);
  //         },
  //       });
  //       return items;
  //     },
  //   }
  // );
  // var startPoint = new ymaps.Placemark(
  //   [43.6586705395959, 40.250742455585296],
  //   {
  //     hintContent: "Начало экотропы",

  //   Тут контент карточки тропы
  //     balloonContent: `Начало маршрута Реликтовый лес`,
  //   },
  //   {
  //     iconLayout: "default#image",
  //     iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
  //     iconImageSize: [32, 51],
  //     iconImageOffset: [-10, -45],
  //   }
  // );

  // var endPoint = new ymaps.Placemark(
  //   [43.668412969084144, 40.25817575039786],
  //   {
  //     hintContent: "Конец экотропы",
  //     //////balloonContent: "Это Конец экотропы",
  //   },
  //   {
  //     iconLayout: "default#image",
  //     iconImageHref: "2",
  //     iconImageSize: [15, 15],
  //     iconImageOffset: [0, 0],
  //   }
  // );
  // // Добавляем линию на карту.
  // myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

  // Монрепо
  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      [60.7374410581998, 28.7202147286447],
      [60.7377562266826, 28.7195227187188],
      [60.7379348207834, 28.7190077345879],
      [60.7381895782906, 28.718653682998],
      [60.738404938716, 28.7184391062768],
      [60.7385782765494, 28.7181655209573],
      [60.7389827278426, 28.717398409179],
      [60.7391185542334, 28.7172650404711],
      [60.7392656255392, 28.7171845742006],
      [60.7393916861205, 28.7171255656023],
      [60.7395597661229, 28.7169109888811],
      [60.7397094616318, 28.7166374035616],
      [60.7398591564313, 28.7157415457506],
      [60.7398749137388, 28.7156771727342],
      [60.7399825884659, 28.7155108757753],
      [60.740153291559, 28.715462596013],
      [60.7403660125914, 28.7152158327836],
      [60.7404080313953, 28.7149476118821],
      [60.7404106575688, 28.7146311112184],
      [60.7403817696494, 28.7144540854234],
      [60.7402872271854, 28.714196593358],
      [60.7400009719016, 28.713670880391],
      [60.7399694574029, 28.7135099478502],
      [60.7399642049835, 28.7133543797273],
      [60.7401532915138, 28.7127106495637],
      [60.7406154983946, 28.7118416138429],
      [60.7411302209266, 28.7118094273347],
      [60.7413663038387, 28.7117488967063],
      [60.7415947732764, 28.7116684304358],
      [60.741773345954, 28.7115879641654],
      [60.7421436184681, 28.7113358365179],
      [60.7423510742408, 28.711169539559],
      [60.7424823746735, 28.7109925137641],
      [60.7426714463407, 28.7107403861167],
      [60.7428447610625, 28.7103863345267],
      [60.7429891892801, 28.7101181136252],
      [60.7431992655146, 28.7098069773795],
      [60.7433226846644, 28.7096514092566],
      [60.7433988366683, 28.7095548497321],
      [60.7434986217783, 28.7094958411337],
      [60.7435826511033, 28.7095280276419],
      [60.743624665683, 28.7096675025107],
      [60.7435852770071, 28.7095360742689],
      [60.7435790404637, 28.7095253454329],
      [60.7435074842476, 28.7094998644472],
      [60.743417692695, 28.7095407497066],
      [60.7432128697637, 28.709790195145],
      [60.7431879232926, 28.709800923981],
      [60.7431577249067, 28.7097499620098],
      [60.743105205907, 28.7097553264278],
      [60.7430841982829, 28.7097338687557],
      [60.7430710685109, 28.7096855889934],
      [60.7430671295782, 28.709610487141],
      [60.743081572329, 28.7095192920345],
      [60.7431854982144, 28.7091986863583],
      [60.74336453656, 28.7086910928956],
      [60.7435148707393, 28.7084268953076],
      [60.7437137834397, 28.7080715026132],
      [60.7439330455033, 28.707679900097],
      [60.7440538359483, 28.7072936619989],
      [60.7440984757799, 28.7068591441384],
      [60.7441221086068, 28.7067196692697],
      [60.7441614966127, 28.7065533723107],
      [60.7438962830674, 28.7064782704582],
      [60.743809628672, 28.7064621772041],
      [60.7436231896316, 28.7064782704582],
      [60.7435155271557, 28.7065319146385],
      [60.7434209939513, 28.706617745327],
      [60.7433448419912, 28.7068108643761],
      [60.7432214229268, 28.7070308055153],
      [60.7431111331473, 28.7071917380562],
      [60.7430008429876, 28.707347306179],
      [60.7429063082534, 28.7075779761543],
      [60.7428301550771, 28.7077550019493],
      [60.7427277418992, 28.707883747982],
      [60.7426121984331, 28.7078944768181],
      [60.7425307925587, 28.7078408326378],
      [60.7424047443355, 28.7078515614738],
      [60.7422471833693, 28.7077925528755],
      [60.7421316381677, 28.7077925528755],
      [60.7420344748343, 28.7078622903099],
      [60.7418165127697, 28.7078515614738],
      [60.741687835664, 28.7079052056541],
      [60.7415512798027, 28.7080446805229],
      [60.7414672451424, 28.7081895198097],
      [60.7413201839558, 28.7082270707359],
      [60.7411573654251, 28.7083289946785],
      [60.7410601991329, 28.7084094609489],
      [60.7410234334319, 28.7084684695473],
      [60.7408474826975, 28.7085650290717],
      [60.7407109232405, 28.7085757579077],
      [60.7405717370589, 28.7084577407111],
      [60.7404378026143, 28.7084282364119],
      [60.7402224558525, 28.7085650290716],
      [60.7399611490048, 28.7087152327765],
      [60.7398272119954, 28.7087796057928],
      [60.7395304476248, 28.708819838928],
      [60.7394188319853, 28.7088332499731],
      [60.7390025679065, 28.7089324917067],
      [60.738927718559, 28.7092087592352],
      [60.7388712531663, 28.7094179715383],
      [60.7386138747655, 28.7107295717466],
      [60.7385692272631, 28.7111345853079],
      [60.7385876115289, 28.7114671792257],
      [60.7387714536059, 28.7119499768484],
      [60.7387346852388, 28.7121699179876],
      [60.7386243799926, 28.7125776137578],
      [60.7385902378064, 28.7128404702413],
      [60.7385593784997, 28.7131140555608],
      [60.7385455902891, 28.7133098568189],
      [60.7385318020636, 28.7134922470319],
      [60.7385390244635, 28.7137336458433],
      [60.7385357415547, 28.7137819256055],
      [60.7384792754613, 28.7140997673738],
      [60.7384136170984, 28.7145034398305],
      [60.7381713365101, 28.7145544018018],
      [60.7378666776368, 28.71458658831],
      [60.7377328574345, 28.7146080459816],
      [60.7376304279403, 28.7146348680718],
      [60.737496481184, 28.7146187748177],
      [60.7374255679684, 28.7145919527275],
      [60.7373231374906, 28.7145490373833],
      [60.7372692956887, 28.7145517195923],
      [60.7370631201809, 28.7146053637726],
      [60.7370053382625, 28.7147046055062],
      [60.7368989667476, 28.7149379576905],
      [60.736842497775, 28.7150881613953],
      [60.7368004742889, 28.715222271846],
      [60.736767643402, 28.7153751577599],
      [60.7367295595309, 28.7155924166901],
      [60.7366914756055, 28.7157828535302],
      [60.7366612710879, 28.715930375026],
      [60.7366218738482, 28.7161288584931],
      [60.736589042778, 28.7162415112717],
      [60.73654701895, 28.7163192953331],
      [60.7364708506375, 28.7163514818413],
      [60.7363881158496, 28.7167323555214],
      [60.7363001278631, 28.7170971359474],
      [60.7362278987381, 28.7173948611481],
      [60.736114958325, 28.7178320612175],
      [60.73599282463, 28.718301447795],
      [60.7359114019137, 28.7187252368194],
      [60.73585887101, 28.719014915393],
      [60.7358155329571, 28.7193475093108],
      [60.7358037134779, 28.7197149719459],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );
  var startPoint = new ymaps.Placemark(
    [60.7374410581998, 28.7202147286447],
    {
      hintContent: "Экотропа в парке Монрепо",

      // Тут контент карточки тропы
      balloonContent: `<a href="lenoblast/monrepo/"><figure id="Monrepo" class="catalog-item">
    <img src="lenoblast/monrepo/img/for-slider.jpg" alt="Экотропа в парке Монрепо" class="trail-img">
    <figcaption class="trail-info">
        <a href="lenoblast/monrepo/" class="trail-title-link">
            <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
                title="Экотропа в парке Монрепо">В парке Монрепо
            </h2>
        </a>
        <a href="lenoblast/monrepo/" id="trail-location" class="trail-location-black"
            title="Ленинградская область, г. Выборг">
            <p id="color-letters-cot" class="black-color size-card-elem-p">
            Ленинградская область, г.&nbsp;Выборг</p>
        </a>
        <div class="trail-spec">
            <a href="lenoblast/monrepo/" class="trail-distance">
                <div class="img-card-color">
                    <img src="/img/dist-orange.svg" alt="Длина тропы">
                </div>
                <p id="color-letters-cot" class="black-color">3 км</p>
            </a>
            <a href="lenoblast/monrepo/" class="trail-difficulty">
                <div id="medium" class="img-card-color">
                    <img src="/img/difficulty-medium.svg" alt="Сложность тропы">
                </div>
                <p id="color-letters-cot" class="black-color">Средняя</p>
            </a>
            <a href="lenoblast/monrepo/" class="trail-duration">
                <div class="img-card-color">
                    <img src="/img/duration-orange.svg" alt="Длительность тропы">
                </div>
                <p id="color-letters-cot" class="black-color">~1 ч</p>
            </a>
        </div>
    </figcaption>
</figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [60.7358037134779, 28.7197149719459],
    {
      hintContent: "Конец экотропы",
      ////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );

  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);


  // Линдуловская роща
  // var myPolyline = new ymaps.Polyline(
  //   [
  //     // Указываем координаты вершин.

  //     [60.23797777585307, 29.54010087421513],
  //     [60.23568914180496, 29.538802685051927],
  //     [60.23544906600174, 29.538641752511033],
  //     [60.235278344356836, 29.538491548806192],
  //     [60.23454348299105, 29.5371259954755],
  //     [60.234282057860476, 29.53639643462345],
  //     [60.23371118346457, 29.53491585524725],
  //     [60.233449751671806, 29.533317258674366],
  //     [60.233252342604864, 29.53256624015019],
  //     [60.23276148245578, 29.532802274543503],
  //     [60.232963114704724, 29.533198742140165],
  //     [60.233021804531134, 29.533971218336475],
  //     [60.23301646909674, 29.53441110061492],
  //     [60.233117842201416, 29.53514066146697],
  //     [60.23312851303624, 29.535880951155068],
  //     [60.233245891989185, 29.537554649580375],
  //     [60.23312851303624, 29.53805890487516],
  //     [60.233048481690105, 29.538445142973316],
  //     [60.233021804531134, 29.53879919456326],
  //     [60.233048481690105, 29.539507297743203],
  //     [60.23337927665094, 29.540698198545826],
  //     [60.23379009798651, 29.541695980299348],
  //     [60.234062197584755, 29.54217877792203],
  //     [60.23421691987474, 29.542350439299],
  //     [60.23440898790463, 29.542393354643238],
  //     [60.234745104239046, 29.542232422102344],
  //     [60.23510789259113, 29.542092947233556],
  //     [60.23605219043418, 29.542017845381135],
  //     [60.23669771166507, 29.541599420774823],
  //     [60.236905769508, 29.54136338638151],
  //     [60.23754593917208, 29.540333418119804],
  //     [60.23770798012796, 29.540206013191586],
  //     [60.23796204272407, 29.540094701517475],
  //     [60.23276009981498, 29.53280335458799],
  //     [60.23271808290877, 29.532838223305188],
  //     [60.232603369810235, 29.532852975454773],
  //     [60.23247998608593, 29.53281140121503],
  //     [60.232405288685804, 29.53275775703474],
  //     [60.23234993246658, 29.532698748436424],
  //     [60.23231658530128, 29.53258341344878],
  //     [60.2323012455938, 29.53246137293859],
  //     [60.23229591004168, 29.53229373487518],
  //     [60.23232125390646, 29.53197857531591],
  //     [60.232323254737054, 29.531868604746318],
  //     [60.23231658530128, 29.531810937252498],
  //     [60.2322905744887, 29.531809596147976],
  //     [60.232255226428144, 29.531845805969667],
  //     [60.232193200493604, 29.53196114095731],
  //     [60.23214317949288, 29.532140848961323],
  //     [60.232115834646756, 29.532292393770657],
  //     [60.232102495689126, 29.5324251631169],
  //     [60.2320898236743, 29.532717523899517],
  //     [60.232119836332984, 29.533056823339905],
  //     [60.23215529467192, 29.533328016625802],
  //     [60.23198450876761, 29.533423012672213],
  //     [60.23181643682751, 29.533203071532977],
  //     [60.23175507701483, 29.533133334098586],
  //     [60.23161901788858, 29.533101147590425],
  //     [60.231517640131905, 29.533192342696925],
  //     [60.23144027268487, 29.53335327523782],
  //     [60.23138424786747, 29.533455199180374],
  //     [60.23097606415434, 29.533589309631132],
  //     [60.23045315469006, 29.533675140319605],
  //     [60.23034376950874, 29.533675140319605],
  //     [60.23025839545416, 29.53364831822945],
  //     [60.2300876466756, 29.533680504737635],
  //     [60.2296581028327, 29.53388971704079],
  //     [60.229498022937236, 29.53413111585213],
  //     [60.22940197462338, 29.534195488868498],
  //     [60.229321934146114, 29.53418476003242],
  //     [60.22912716816555, 29.5340184630735],
  //     [60.22889504828844, 29.533750242172026],
  //     [60.22866025868886, 29.53340691941811],
  //     [60.22848683346921, 29.533079689918296],
  //     [60.22828939440614, 29.53259152787759],
  //     [60.22816399330048, 29.532312578140036],
  //     [60.227745096755726, 29.531094855247282],
  //     [60.22759034380724, 29.530638879714733],
  //     [60.22719011726503, 29.529351419387584],
  //     [60.22713675335564, 29.529270953117138],
  //     [60.22700867961734, 29.529512351928478],
  //     [60.22697132468246, 29.529700106559527],
  //     [60.227027357068785, 29.53038675206734],
  //     [60.22705403912376, 29.530987566886676],
  //     [60.22720345822878, 29.531577652869963],
  //     [60.22734487210943, 29.531888789115673],
  //     [60.22743025377874, 29.531996077476276],
  //     [60.22749962622075, 29.532521790443194],
  //     [60.22749695805261, 29.53316552060677],
  //     [60.22745693550464, 29.533321088729636],
  //     [60.22734754028997, 29.53366977590158],
  //     [60.227254153841294, 29.534452980933917],
  //     [60.227408908382316, 29.535397118507174],
  //     [60.22759301196775, 29.5359603824003],
  //     [60.22800880838862, 29.536660747786975],
  //     [60.228222257805406, 29.536912875434368],
  //     [60.22843303773585, 29.53698797728679],
  //     [60.228785223952066, 29.537358122130836],
  //     [60.22895864758761, 29.537663893958545],
  //     [60.22908205797997, 29.537720201740893],
  //     [60.229186111326264, 29.537709472904837],
  //     [60.2294822613439, 29.53753781152789],
  //     [60.22963433733663, 29.537435887585314],
  //     [60.22982376433741, 29.537344692478815],
  //     [60.2302292945051, 29.53677606416766],
  //     [60.23053343882698, 29.53628790212695],
  //     [60.23152247327774, 29.536243901982584],
  //     [60.232403412553325, 29.536691654635366],
  //     [60.232758223702845, 29.536916960192627],
  //     [60.23322774230661, 29.53761969895452],
  //   ],
  //   [],

  //   {
  //     // Задаем опции геообъекта.
  //     // Цвет с прозрачностью.
  //     strokeColor: "#010101",
  //     // Ширину линии.
  //     strokeWidth: 1,
  //     // Максимально допустимое количество вершин в ломаной.
  //     editorMaxPoints: 6,
  //     // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
  //     editorMenuManager: function (items) {
  //       items.push({
  //         title: "Удалить линию",
  //         onClick: function () {
  //           myMap.geoObjects.remove(myPolyline);
  //         },
  //       });
  //       return items;
  //     },
  //   }
  // );
  // var startPoint = new ymaps.Placemark(
  //   [60.23797777585307, 29.54010087421513],
  //   {
  //     hintContent: "Начало экотропы",

  //  // Тут контент карточки тропы
  //     balloonContent: `Начало маршрута Линдуловская роща`,
  //   },
  //   {
  //     iconLayout: "default#image",
  //     iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
  //     iconImageSize: [32, 51],
  //     iconImageOffset: [-10, -45],
  //   }
  // );

  // var endPoint = new ymaps.Placemark(
  //   [60.23322774230661, 29.53761969895452],
  //   {
  //     hintContent: "Конец экотропы",
  //     ////balloonContent: "Это Конец экотропы",
  //   },
  //   {
  //     iconLayout: "default#image",
  //     iconImageHref: "2",
  //     iconImageSize: [15, 15],
  //     iconImageOffset: [0, 0],
  //   }
  // );
  // // Добавляем линию на карту.
  // myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);


  // .............................................................Раковые Озера
  var myPolyline1 = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      // 1 часть
      [60.6096313377694, 29.3455313962171],
      [60.6097341767231, 29.3452631753156],
      [60.6098185571575, 29.345161251373],
      [60.6102167243458, 29.3448179286191],
      [60.6105305082511, 29.3443887751767],
      [60.6110921474376, 29.3435251038739],
      [60.6113373671093, 29.3431656878659],
      [60.6114982090955, 29.3429028313824],
      [60.6115667644555, 29.3426667969891],
      [60.6120993818818, 29.3426828902432],
      [60.6124289674615, 29.3427794497677],
      [60.6127242732631, 29.3427472632595],
      [60.6128771984119, 29.3425058644481],
      [60.6129879368654, 29.3423342030712],
      [60.6131725001072, 29.3421410840221],
      [60.6136286304242, 29.341770939178],
      [60.6140056581133, 29.341406158752],
      [60.6147306989567, 29.3406712334819],
      [60.615439904904, 29.3398772996135],
      [60.6159355488439, 29.3393140357203],
      [60.6160120038794, 29.3390619080729],
      [60.616054185881, 29.338718585319],
      [60.6160410040086, 29.3384020846553],
      [60.6159856400855, 29.3380158465571],
      [60.6162569282106, 29.3377236016946],
      [60.6164085183903, 29.3375224360184],
      [60.6168342852541, 29.3371066936211],
      [60.6172633418066, 29.336826402779],
      [60.6175889200891, 29.3365206309513],
      [60.6179975359433, 29.3359546848492],
      [60.6183679219562, 29.3352385350422],
      [60.6189610579267, 29.3341093250469],
      [60.6196741246918, 29.3330659457401],
      [60.6204833901834, 29.3313412853435],
      [60.6206863623497, 29.3307431527332],
      [60.6208642914654, 29.3301906176761],
      [60.6211753355453, 29.3286483474925],
      [60.621560717843, 29.3268217631442],
      [60.6216865828829, 29.3262598403556],
      [60.6219099756696, 29.325349230395],
      [60.6222486862397, 29.3246706315142],
      [60.6227692655634, 29.3239249774081],
      [60.6229616800889, 29.3236621209246],
      [60.6232489818395, 29.3229647465808],
      [60.6234150358, 29.3222029992205],
      [60.6234967445813, 29.3214680739504],
      [60.6235099233884, 29.320861894713],
      [60.6236127179606, 29.3198748417955],
      [60.623768227087, 29.3194617816072],
      [60.6239290069183, 29.3191828318697],
      [60.6241214145029, 29.3190004416567],
      [60.6247935141746, 29.3187805005174],
      [60.6249503353981, 29.3187724538904],
      [60.625167775348, 29.3186785765748],
      [60.6253549043052, 29.3184425421815],
      [60.6255367609806, 29.3179382868867],
      [60.6256448202569, 29.31743939601],
      [60.6256764472935, 29.3168546744447],
      [60.6256474558445, 29.3163879700761],
      [60.6255262185837, 29.3157174178224],
      [60.6253522686756, 29.3150254078965],
      [60.6252415727952, 29.3144621440034],
      [60.6252363015533, 29.3141241856675],
      [60.625281107082, 29.3138291426759],
      [60.625455057357, 29.3130673953156],
      [60.6255393965499, 29.3126167842011],
      [60.6256474558174, 29.3120910712342],
      [60.6256448202298, 29.3118013926606],
      [60.6256105575717, 29.3115653582673],
      [60.6255051337795, 29.3112917729478],
      [60.6251150627328, 29.3107231446366],
      [60.6248119637173, 29.3102993556122],
      [60.6242004857196, 29.3095215149979],
      [60.6233939495297, 29.3085398264984],
      [60.6227534504923, 29.3077190705399],
      [60.6220628569882, 29.3068607636551],

    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline1);
          },
        });
        return items;
      },
    }
  );

  var startPoint = new ymaps.Placemark(
    [60.6096313377694, 29.3455313962171],
    {
      hintContent: "Экотропа Раковые озёра",

      // Тут контент карточки тропы
      balloonContent: `<a href="/catalog/lenoblast/rakovye-ozyora/"><figure id="Rakov" class="catalog-item">
      <img src="/catalog/lenoblast/rakovye-ozyora/img/for-slider.jpg" alt="Экотропа Раковые озёра" class="trail-img">
      <figcaption class="trail-info">
          <a href="/catalog/lenoblast/rakovye-ozyora/" class="trail-title-link">
              <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
                  title="Экотропа Раковые озёра">Раковые озёра</h2>
          </a>
          <a href="/catalog/lenoblast/rakovye-ozyora/" id="trail-location" class="trail-location-black" title="Ленинградская область, пос. Грибное">
              <p id="color-letters-cot" class="black-color size-card-elem-p">Ленинградская область, пос. Грибное</p>
          </a>
          <div class="trail-spec">
              <a href="/catalog/lenoblast/rakovye-ozyora/" class="trail-distance">
                  <div class="img-card-color">
                      <img src="/img/dist-orange.svg" alt="Длина тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">8,3 км</p>
              </a>
              <a href="/catalog/lenoblast/rakovye-ozyora/" class="trail-difficulty">
                  <div id="easy" class="img-card-color">
                      <img src="/img/difficulty-easy.svg" alt="Сложность тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">Простая</p>
              </a>
              <a href="/catalog/lenoblast/rakovye-ozyora/" class="trail-duration">
                  <div class="img-card-color">
                      <img src="/img/duration-orange.svg" alt="Длительность тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">~3 ч</p>
              </a>
          </div>
      </figcaption>
  </figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [60.6220628569882, 29.3068607636551],
    {
      hintContent: "Конец экотропы",
      ////balloonContent: "Это конец маршрута",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );

  // 2 часть
  var myPolyline2 = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      [60.6127269098103, 29.3427506160206],
      [60.6128119415542, 29.3427975546783],
      [60.6128798349466, 29.3428719859785],
      [60.6130146325678, 29.3430818688339],
      [60.6131728295568, 29.3428807031578],
      [60.6136447793017, 29.3442674052184],
      [60.6139176632811, 29.3450640212958],

    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline2);
          },
        });
        return items;
      },
    }
  );

  // 3 часть
  var myPolyline3 = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      [60.6128116118837, 29.3433420431083],
      [60.6132084237198, 29.3428270589774],
      [60.6132334714788, 29.3425856601661],
      [60.613228198268, 29.342387176699],
      [60.6131728295025, 29.3421404134696],

    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline3);
          },
        });
        return items;
      },
    }
  );

  // 4 часть
  var myPolyline4 = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      [60.6222719760735, 29.3453390444203],
      [60.6218410093885, 29.3442715252323],
      [60.6214525222226, 29.3433382689063],
      [60.6213510386953, 29.3431263743941],
      [60.6212015393853, 29.3428610580454],
      [60.6209142193382, 29.3423541205416],
      [60.6206757411871, 29.3419044530825],
      [60.6204108225919, 29.3414323842959],
      [60.6200918629702, 29.3408583915667],
      [60.6196595490142, 29.3404158270792],
      [60.6194644786138, 29.3402227080301],
      [60.6190456504765, 29.3397947456214],
      [60.6186527890788, 29.3393870565531],
      [60.6183483110433, 29.3390678736803],
      [60.6182718615622, 29.3389874074099],
      [60.6182125471844, 29.3388854834673],
      [60.6178645672886, 29.3381639692423],
      [60.6172595478294, 29.3368282291528],

    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline4);
          },
        });
        return items;
      },
    }
  );

  // 5 часть
  var myPolyline5 = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      [60.6115714689192, 29.3426492017263],
      [60.6115965179439, 29.3424694937223],
      [60.6116136567453, 29.3422012728208],
      [60.6116400241141, 29.3419598740094],
      [60.6116835302254, 29.3417748015874],
      [60.6117507668181, 29.3415816825384],
      [60.6120012548816, 29.341160575723],
      [60.6124613568119, 29.340452472543],
      [60.6127276592162, 29.3400099080556],
      [60.6133868140953, 29.3393018048756],
      [60.6138824896768, 29.3388190072529],
      [60.6140459554838, 29.3387278121464],
      [60.6142278761307, 29.3387009900563],
      [60.6145653493795, 29.3386956256382],
      [60.6148711814607, 29.3386634391301],
      [60.6151401003615, 29.3385990661137],
      [60.6153826527435, 29.338470320081],
      [60.6159916620655, 29.3380036157124],

    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline5);
          },
        });
        return items;
      },
    }
  );

  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline1).add(myPolyline2).add(myPolyline3).add(myPolyline4).add(myPolyline5).add(startPoint).add(endPoint);


  //Западный Котлин
  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.

      [60.026807155822844, 29.675434768065582],
      [60.02669440481048, 29.67527383552469],
      [60.02661655269571, 29.67519336925424],
      [60.02630782698037, 29.67501634345927],
      [60.02562862021956, 29.67451208816446],
      [60.02522055250504, 29.674592554434906],
      [60.02518028239071, 29.67468374954143],
      [60.02510779606081, 29.674968063697005],
      [60.024970877002424, 29.675225555762427],
      [60.024691667746964, 29.67490369068064],
      [60.024728652835975, 29.67450230026406],
      [60.024962222016526, 29.673472332002326],
      [60.02509656207744, 29.673102735601244],
      [60.02478513740553, 29.6727486840113],
      [60.024495187650125, 29.672625302396614],
      [60.02445223191375, 29.672662853322826],
      [60.02388306311744, 29.673966406904054],
      [60.02383742179744, 29.6740468731745],
      [60.02350987635115, 29.673843025289372],
      [60.023850845721654, 29.67404419096549],
      [60.02446162848586, 29.67267626436789],
      [60.02454351278665, 29.672625302396614],
      [60.02452069259212, 29.672373174749197],
      [60.02443209639299, 29.672155915819],
      [60.024422699812455, 29.672099589429695],
      [60.02443478112981, 29.672032534204316],
      [60.02454082805869, 29.6718876949175],
      [60.02460526146897, 29.67183941515524],
      [60.02468043362163, 29.67167311819632],
      [60.024783795051434, 29.671225189290833],
      [60.02481869624016, 29.671174227319558],
      [60.024989174592164, 29.671115218721216],
      [60.02502407556327, 29.67118495615561],
      [60.0250603188403, 29.671273469053098],
      [60.025381577005476, 29.671919041325726],
      [60.02588417473703, 29.67218654348904],
      [60.02592981322081, 29.672224094415252],
      [60.02607209749966, 29.67235284044796],
      [60.02631639548805, 29.672492315316724],
      [60.02669760411354, 29.672771265054273],
      [60.026896260380724, 29.672615696931434],
      [60.027111022564874, 29.672604968095353],
      [60.02744658567385, 29.67220263674312],
      [60.027653290847184, 29.671676923776204],
      [60.02779556768017, 29.67139797403865],
      [60.027846572432885, 29.67144088938289],
      [60.027859994723094, 29.671623279595913],
      [60.02792979054405, 29.672014882112094],
      [60.02800227066306, 29.672476222062645],
      [60.0280264306673, 29.672717620873986],
      [60.028098910573625, 29.673162867570454],
      [60.028184812478244, 29.673447181726033],
      [60.028278767429875, 29.6742518444305],
      [60.02829218954393, 29.67440204813534],
      [60.02814415536325, 29.67453128584379],
      [60.02805020002757, 29.674745862564976],
      [60.02799651114399, 29.674922888359973],
      [60.02779517705093, 29.675099914154945],
      [60.02772806541306, 29.675035541138605],
      [60.02763410889025, 29.675019447884498],
      [60.02747572443075, 29.674997990212393],
      [60.02731465470767, 29.674922888359973],
      [60.027158953226504, 29.674826328835422],
      [60.02707304864593, 29.674756591401053],
      [60.027019358169284, 29.674643938622424],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );
  var startPoint = new ymaps.Placemark(
    [60.027019358169284, 29.674643938622424],
    {
      hintContent: "Экотропа Западный Котлин",

      // Тут контент карточки тропы
      balloonContent: `<a href="lenoblast/zapadniy-kotlin/"><figure id="ZapKotlin" class="catalog-item">
    <img src="lenoblast/zapadniy-kotlin/img/for-slider.jpg" alt="Экотропа Западный Котлин" class="trail-img">
    <figcaption class="trail-info">
        <a href="lenoblast/zapadniy-kotlin/" class="trail-title-link">
            <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
                title="Экотропа Западный Котлин">Западный Котлин
            </h2>
        </a>
        <a href="lenoblast/zapadniy-kotlin/" id="trail-location" class="trail-location-black"
            title="г. Санкт-Петербург, г. Кронштадт">
            <p id="color-letters-cot" class="black-color size-card-elem-p">
                г.&nbsp;Санкт-Петербург, г.&nbsp;Кронштадт</p>
        </a>
        <div class="trail-spec">
            <a href="lenoblast/zapadniy-kotlin/" class="trail-distance">
                <div class="img-card-color">
                    <img src="/img/dist-orange.svg" alt="Длина тропы">
                </div>
                <p id="color-letters-cot" class="black-color">1,5 км</p>
            </a>
            <a href="lenoblast/zapadniy-kotlin/" class="trail-difficulty">
                <div id="easy" class="img-card-color">
                    <img src="/img/difficulty-easy.svg" alt="Сложность тропы">
                </div>
                <p id="color-letters-cot" class="black-color">Простая</p>
            </a>
            <a href="lenoblast/zapadniy-kotlin/" class="trail-duration">
                <div class="img-card-color">
                    <img src="/img/duration-orange.svg" alt="Длительность тропы">
                </div>
                <p id="color-letters-cot" class="black-color">~0,5 ч</p>
            </a>
        </div>
    </figcaption>
</figure></a>`,
    },

    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [60.026807155822844, 29.675434768065582],
    {
      hintContent: "Конец экотропы",
      ////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );
  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);


  //Сокольники
  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.

      [55.7917890322544, 37.6650575360331],
      [55.792115440396, 37.6648858746561],
      [55.7922907325235, 37.6647571286234],
      [55.7927622039697, 37.6639095505747],
      [55.7934210454926, 37.6629332264933],
      [55.7937370124678, 37.6624663659333],
      [55.7939485629878, 37.6620908566712],
      [55.7941057140556, 37.6615973302125],
      [55.7944371519822, 37.6612253642851],
      [55.7948568207933, 37.6606347446963],
      [55.796616853314, 37.6611630139512],
      [55.7973376966251, 37.6618473831568],
      [55.7986234852632, 37.6622922229897],
      [55.7990646623027, 37.6624102401864],
      [55.7992399230211, 37.6625819015633],
      [55.7995179211565, 37.6623673248422],
      [55.7999945514465, 37.6627176948456],
      [55.8000972881205, 37.6628571697144],
      [55.8002785874695, 37.6637262054352],
      [55.8005988809141, 37.6639300533204],
      [55.8009980977878, 37.6644226403637],
      [55.8017897469874, 37.6650663705273],
      [55.8020798128766, 37.6656242700024],
      [55.8023718654174, 37.665643658067],
      [55.8026981844906, 37.6658796924604],
      [55.8028250856107, 37.6661586421979],
      [55.8030728437432, 37.6668452877057],
      [55.8032964289915, 37.6672744411481],
      [55.8036287830586, 37.668883766557],
      [55.803713283259, 37.6694239407058],
      [55.8037314115412, 37.6699067383285],
      [55.8037253687814, 37.6705611973282],
      [55.8036709839009, 37.6710869102951],
      [55.8035984706082, 37.671623352098],
      [55.8035803422638, 37.6718915729995],
      [55.8036286844966, 37.6722885399337],
      [55.8038099673328, 37.6728357105728],
      [55.803930822086, 37.6733185081955],
      [55.8039549929914, 37.673586729097],
      [55.8039368648137, 37.6738334923263],
      [55.8038052468114, 37.6741754241364],
      [55.8034366374425, 37.6752053923982],
      [55.8033580808944, 37.6755272574799],
      [55.8033218239723, 37.6757418342011],
      [55.8033097383241, 37.6761280722993],
      [55.8032734813569, 37.676449937381],
      [55.8031405388536, 37.6769434638398],
      [55.803074067431, 37.6772438712495],
      [55.8030559388414, 37.6775871940034],
      [55.8031042817281, 37.6779841609376],
      [55.8032655757776, 37.6783195202112],
      [55.8033803894143, 37.6787057583094],
      [55.8032837042691, 37.6789096061945],
      [55.8031024189721, 37.6790705387354],
      [55.802878832605, 37.6792743866205],
      [55.8026371161629, 37.6799073879481],
      [55.8024713827531, 37.6802769015728],
      [55.8020967176881, 37.6807704280315],
      [55.8019456420407, 37.6809313605724],
      [55.8017160059294, 37.6811244796215],
      [55.8015770149907, 37.6813712428509],
      [55.8014319804364, 37.6816931079327],
      [55.8013292472989, 37.6820900748669],
      [55.8012265138892, 37.6824012111126],
      [55.8011177370411, 37.6825514148174],
      [55.8009424848104, 37.682658703178],
      [55.8006967214583, 37.6827892033466],
      [55.8005395970993, 37.6828964917072],
      [55.8003764288219, 37.683035966576],
      [55.800291822778, 37.6832076279529],
      [55.8002132598577, 37.6833900181659],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );
  var startPoint = new ymaps.Placemark(
    [55.7917890322544, 37.6650575360331],
    {
      hintContent: "Тропа здоровья Сокольники",

      // Тут контент карточки тропы
      balloonContent: `<a href="moskva/tropa-zdorovia-sokolniki/"><figure id="Sokolniki" class="catalog-item">
    <img src="moskva/tropa-zdorovia-sokolniki/img/for-slider.jpg" alt="Тропа здоровья Сокольники" class="trail-img">
    <figcaption class="trail-info">
        <a href="moskva/tropa-zdorovia-sokolniki/" class="trail-title-link">
            <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
                title="Тропа здоровья в Сокольниках">Тропа здоровья Сокольники
            </h2>
        </a>
        <a href="moskva/tropa-zdorovia-sokolniki/" id="trail-location" class="trail-location-black"
            title="г. Москва, парк Сокольники">
            <p id="color-letters-cot" class="black-color size-card-elem-p">
                г.&nbsp;Москва, парк &laquo;Сокольники&raquo;</p>
        </a>
        <div class="trail-spec">
            <a href="moskva/tropa-zdorovia-sokolniki/" class="trail-distance">
                <div class="img-card-color">
                    <img src="/img/dist-orange.svg" alt="Длина тропы">
                </div>
                <p id="color-letters-cot" class="black-color">2,7 км</p>
            </a>
            <a href="moskva/tropa-zdorovia-sokolniki/" class="trail-difficulty">
                <div id="easy" class="img-card-color">
                    <img src="/img/difficulty-easy.svg" alt="Сложность тропы">
                </div>
                <p id="color-letters-cot" class="black-color">Простая</p>
            </a>
            <a href="moskva/tropa-zdorovia-sokolniki/" class="trail-duration">
                <div class="img-card-color">
                    <img src="/img/duration-orange.svg" alt="Длительность тропы">
                </div>
                <p id="color-letters-cot" class="black-color">~1 ч</p>
            </a>
        </div>
    </figcaption>
</figure></a>`,
    },

    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [55.8002132598577, 37.6833900181659],
    {
      hintContent: "Конец экотропы",
      ////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );
  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

  // .............................................................Бугаинаяя Тропа (лисий нос)
  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.

      [59.999131386805, 30.0327850036753],
      [59.9988573321695, 30.0326777153147],
      [59.9987417986504, 30.0325972490443],
      [59.9986370120852, 30.0323773079051],
      [59.9985617804998, 30.0321090870036],
      [59.9985564068085, 30.03146535684],
      [59.9985214777941, 30.0311703138484],
      [59.9984811750391, 30.0309664659632],
      [59.9984193773858, 30.0307679824961],
      [59.998387135077, 30.0304729395045],
      [59.9984005693724, 30.0301671676768],
      [59.9984731144732, 30.0298774891032],
      [59.9985375988732, 30.0297058277262],
      [59.9986316383972, 30.0295770816935],
      [59.9986800014765, 30.0293785982264],
      [59.9986853751476, 30.0290942840708],
      [59.9985805883942, 30.0285471134318],
      [59.998564467327, 30.0283057146205],
      [59.9986128305048, 30.028048222555],
      [59.9986907488088, 30.0278497390879],
      [59.9986504462608, 30.0275600605143],
      [59.9986074568219, 30.0274903230799],
      [59.9985564067904, 30.0274366788996],
      [59.998489235576, 30.027318661703],
      [59.9984677407494, 30.0270397119654],
      [59.9984408722078, 30.026792948736],
      [59.9983951956368, 30.0266320161951],
      [59.9982474180618, 30.0263745241297],
      [59.998236670576, 30.026251142515],
      [59.9982715998921, 30.02607411672],
      [59.9982608524142, 30.0259400062693],
      [59.9982017412228, 30.025714700712],
      [59.9982151755938, 30.0255591325892],
      [59.9982581655441, 30.0255001239908],
      [59.9982769736208, 30.025355284704],
      [59.9983172766253, 30.0252211742533],
      [59.9983333978134, 30.0249636821879],
      [59.9984247510633, 30.0247061901224],
      [59.99840862992, 30.024454062475],
      [59.9984354984788, 30.0243253164423],
      [59.9984543064634, 30.0241965704096],
      [59.9984354984788, 30.0239444427622],
      [59.9984596801712, 30.0238854341639],
      [59.9985080435028, 30.0238800697458],
      [59.9985644672999, 30.0239390783442],
      [59.998843898015, 30.023917620672],
      [59.9989728652386, 30.0239229850901],
      [59.9990615299123, 30.0239229850901],
      [59.9991475075408, 30.0238639764917],
      [59.99928453, 30.02371914],

    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );
  var startPoint = new ymaps.Placemark(
    [59.999131386805, 30.0327850036753],
    {
      hintContent: "Бугаиная тропа",

      // Тут контент карточки тропы
      balloonContent: `<a href="lenoblast/bugainaya-tropa/"><figure id="BugainaTropa" class="catalog-item">
    <img src="lenoblast/bugainaya-tropa/img/for-slider.jpg" alt="Экотропа Бугаиная тропа" class="trail-img">
    <figcaption class="trail-info">
        <a href="lenoblast/bugainaya-tropa/" class="trail-title-link">
            <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
                title="Экотропа Бугаиная тропа">Бугаиная тропа
            </h2>
        </a>
        <a href="lenoblast/bugainaya-tropa/" id="trail-location" class="trail-location-black"
            title="г. Санкт-Петербург, пос. Лисий Нос">
            <p id="color-letters-cot" class="black-color size-card-elem-p">
            г.&nbsp;Санкт-Петербург, пос.&nbsp;Лисий Нос</p>
        </a>
        <div class="trail-spec">
            <a href="lenoblast/bugainaya-tropa/" class="trail-distance">
                <div class="img-card-color">
                    <img src="/img/dist-orange.svg" alt="Длина тропы">
                </div>
                <p id="color-letters-cot" class="black-color">0,7 км</p>
            </a>
            <a href="lenoblast/bugainaya-tropa/" class="trail-difficulty">
                <div id="easy" class="img-card-color">
                    <img src="/img/difficulty-easy.svg" alt="Сложность тропы">
                </div>
                <p id="color-letters-cot" class="black-color">Простая</p>
            </a>
            <a href="lenoblast/bugainaya-tropa/" class="trail-duration">
                <div class="img-card-color">
                    <img src="/img/duration-orange.svg" alt="Длительность тропы">
                </div>
                <p id="color-letters-cot" class="black-color">~0,5 ч</p>
            </a>
        </div>
    </figcaption>
</figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [59.99928453, 30.02371914],
    {
      hintContent: "Конец экотропы",
      ////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );
  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);


  // .............................................................Трын-тропа (Ленобласть)
  var myPolyline1 = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      // 1 часть
      [60.8114229744453, 28.9343354743037],
      [60.8113391233608, 28.934394482902],
      [60.8113102994996, 28.9345125000987],
      [60.8112998180891, 28.934582237533],
      [60.811261822938, 28.9346761148485],
      [60.8112172768518, 28.9347297590288],
      [60.8111740408851, 28.934767309955],
      [60.8111425965089, 28.9348638694796],
      [60.8111098419174, 28.9349094670328],
      [60.8110718465491, 28.9349228780779],
      [60.8109997862436, 28.93494433575],
      [60.810982753784, 28.9349041026148],
      [60.8109709620758, 28.9348048608812],
      [60.8109539296008, 28.9346305172953],
      [60.8109290359671, 28.9345956485781],
      [60.8108478039657, 28.9345473688158],
      [60.8108202898569, 28.9345125000986],
      [60.8107993267104, 28.9344534915003],
      [60.8107953961189, 28.9343944829019],
      [60.810816359268, 28.9343032877954],
      [60.8108360122077, 28.9342576902422],
      [60.8108373223942, 28.9341611307176],
      [60.8108058776861, 28.9340028803858],
      [60.810774432947, 28.9339224141153],
      [60.8107207147794, 28.9338741343531],
      [60.8106525842905, 28.9338821809801],
      [60.8105116799065, 28.9339747912198],
      [60.8104160345047, 28.9340284354001],
      [60.8103059764376, 28.9341330415517],
      [60.8102666698931, 28.9341974145681],
      [60.8102260530796, 28.9342027789861],
      [60.8101867464366, 28.934181321314],
      [60.8101382681769, 28.9341330415517],
      [60.8101042023287, 28.9340820795804],
      [60.8100766875786, 28.9339882022649],
      [60.8100727568981, 28.9338621384412],
      [60.8100504830327, 28.9337360746175],
      [60.8100151068525, 28.9336636549741],
      [60.8099679385632, 28.9336207396299],
      [60.8099076678699, 28.9335965997487],
      [60.8098290537511, 28.9336100107938],
      [60.809764852077, 28.9336287862569],
      [60.8097307858301, 28.93364756172],
      [60.8096678942018, 28.9337012059003],
      [60.8095801077635, 28.9337736255437],
      [60.8093861905867, 28.9338406807691],
      [60.8093547444485, 28.9339265114575],
      [60.8092289595856, 28.9341464525968],
      [60.8092171672202, 28.9342993385106],
      [60.8092001338089, 28.9344388133793],
      [60.8091817901251, 28.9345434195309],
      [60.8091529643149, 28.9345890170842],
      [60.8090979331413, 28.9346131569653],
      [60.8090337299961, 28.9346372968464],
      [60.8089983526976, 28.9346694833546],
      [60.8089590445421, 28.9347231275349],
      [60.8089092541424, 28.9347579962521],
      [60.808875186973, 28.9347579962521],
      [60.8088502917174, 28.934747267416],
      [60.8087913291925, 28.9347794539242],
      [60.8087297459945, 28.9348438269406],
      [60.808685196364, 28.9349323398381],
      [60.808661611245, 28.9350235349446],
      [60.8086170615284, 28.9351120478421],
      [60.8085227207376, 28.9353427178174],
      [60.8084794811194, 28.9354178196698],
      [60.8084296899713, 28.9354365951329],
      [60.8083956222989, 28.9355465657025],
      [60.8083667957784, 28.9356109387188],
      [60.8083340383282, 28.9356189853459],
      [60.8082894881542, 28.9356592184811],
      [60.8082423173139, 28.9357691890507],
      [60.8081872845788, 28.9359274393826],
      [60.8081243898991, 28.9361044651776],
      [60.8080732878879, 28.9362171179562],
      [60.808027427039, 28.9362707621365],
      [60.8080182548613, 28.936353910616],
      [60.8080523229366, 28.9363995081692],
      [60.8080719775789, 28.9364343768864],
      [60.8080903219007, 28.9365845805913],
      [60.808091632209, 28.9367052799969],
      [60.8080955631336, 28.9367321020871],
      [60.8080575641214, 28.9367830640582],
      [60.8080130135614, 28.9368393904475],
      [60.8079697732525, 28.9368930346279],
      [60.8078125352716, 28.9369922763614],
      [60.8077706050125, 28.9370700604228],
      [60.8077352263135, 28.9371156579761],
      [60.8077037785392, 28.9371612555293],
      [60.8076448138956, 28.9372470862178],
      [60.8075910904588, 28.9373275524882],
      [60.807528194613, 28.9373811966685],
      [60.8074652986342, 28.9374402052669],
      [60.8073879888349, 28.9375233537463],
      [60.8073250925887, 28.9375769979266],
      [60.8072818513476, 28.9375904089717],
      [60.8072333686742, 28.9376681930331],
      [60.8071796445448, 28.9377111083773],
      [60.8071442651906, 28.9377325660495],
      [60.8071246099678, 28.9377701169756],
      [60.8071010236954, 28.9378479010371],
      [60.807055161449, 28.9378854519633],
      [60.8070014370195, 28.9379578716067],
      [60.8069752299479, 28.9380463845042],
      [60.8069752299479, 28.9381053931025],
      [60.8070027473725, 28.9382207280901],
      [60.8069883334864, 28.9383065587786],
      [60.8069975059601, 28.9383494741229],
      [60.8070394372351, 28.9383441097048],
      [60.8070407475866, 28.9384218937662],
      [60.8070171612521, 28.9384540802744],
      [60.8069804713639, 28.9384701735285],
      [60.8069424710419, 28.9385372287539],
      [60.8069241260601, 28.9386042839792],
      [60.8069018499967, 28.9386659747866],
      [60.8068952982103, 28.9387678987291],
      [60.806897918925, 28.9388617760447],
      [60.8068572978231, 28.9392238742617],
      [60.8068690910515, 28.9393231159952],
      [60.806897918925, 28.939465273073],
      [60.8069450917527, 28.9395832902697],
      [60.8069699884858, 28.9397066718844],
      [60.8069817816726, 28.939830053499],
      [60.8069529538749, 28.9400178081301],
      [60.8069241260511, 28.9401465541628],
      [60.8068808842666, 28.9402887112406],
      [60.8068533667369, 28.9404764658716],
      [60.8067970212358, 28.9406749493387],
      [60.8067380549167, 28.9407741910723],
      [60.8066961232457, 28.9408707505968],
      [60.8066856403193, 28.9409324414042],
      [60.8066790884886, 28.9410209543016],
      [60.8066607433554, 28.9411148316172],
      [60.8066620537134, 28.9412140733507],
      [60.8066686055476, 28.9413159972933],
      [60.8066987439586, 28.9414179212358],
      [60.8067406756262, 28.9415815359857],
      [60.806764262165, 28.9416915065553],
      [60.8067878486863, 28.9418658501413],
      [60.8067747450655, 28.9419543630388],
      [60.8067550896242, 28.941997278383],
      [60.8066869506672, 28.9421260244157],
      [60.806652881107, 28.9422145373131],
      [60.8066410877986, 28.942362058809],
      [60.8066502603722, 28.9424908048417],
      [60.806677778077, 28.9426061398293],
      [60.8067052957582, 28.9427026993539],
      [60.80668695064, 28.9428046232964],
      [60.806658122576, 28.9428636318947],
      [60.8066410877986, 28.9429414159562],
      [60.8066489500047, 28.9430433398988],
      [60.8066672951447, 28.9431211239602],
      [60.8067131579484, 28.9431908613946],
      [60.8067446066901, 28.9432579166199],
      [60.8067550895971, 28.9433303362633],
      [60.80674067559, 28.943440306833],
      [60.8067328134066, 28.9435100442673],
      [60.8067328134066, 28.9436575657632],
      [60.806762951757, 28.9438587314393],

    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline1);
          },
        });
        return items;
      },
    }
  );

  var startPoint = new ymaps.Placemark(
    [60.8114229744453, 28.9343354743037],
    {
      hintContent: "Трын-тропа",

      // Тут контент карточки тропы
      balloonContent: `<a href="lenoblast/tryn-tropa/"><figure id="TrynTropa" class="catalog-item">
   <img src="lenoblast/tryn-tropa/img/for-slider.jpg" alt="Экотропа Трын-тропа" class="trail-img">
   <figcaption class="trail-info">
       <a href="lenoblast/tryn-tropa/" class="trail-title-link">
           <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
               title="Экотропа Трын-тропа">Трын-тропа
           </h2>
       </a>
       <a href="lenoblast/tryn-tropa/" id="trail-location" class="trail-location-black"
           title="Ленинградская область, пос. Гвардейское">
           <p id="color-letters-cot" class="black-color size-card-elem-p">
           Ленинградская область, пос.&nbsp;Гвардейское</p>
       </a>
       <div class="trail-spec">
           <a href="lenoblast/tryn-tropa/" class="trail-distance">
               <div class="img-card-color">
                   <img src="/img/dist-orange.svg" alt="Длина тропы">
               </div>
               <p id="color-letters-cot" class="black-color">1,2 км</p>
           </a>
           <a href="lenoblast/tryn-tropa/" class="trail-difficulty">
               <div id="easy" class="img-card-color">
                   <img src="/img/difficulty-easy.svg" alt="Сложность тропы">
               </div>
               <p id="color-letters-cot" class="black-color">Простая</p>
           </a>
           <a href="lenoblast/tryn-tropa/" class="trail-duration">
               <div class="img-card-color">
                   <img src="/img/duration-orange.svg" alt="Длительность тропы">
               </div>
               <p id="color-letters-cot" class="black-color">~0,5 ч</p>
           </a>
       </div>
   </figcaption>
</figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [60.806762951757, 28.9438587314393],
    {
      hintContent: "Конец экотропы",
      ////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );

  // 2 часть
  var myPolyline2 = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      [60.8080968733604, 28.936732102087],
      [60.8081093212845, 28.9368051922826],
      [60.8081204588968, 28.9368360376863],
      [60.8081551820158, 28.936877611926],
      [60.8081790950852, 28.9368910229711],
      [60.8081974393455, 28.9369272327928],
      [60.8082069390476, 28.9370452499894],
      [60.8082210247985, 28.9370834714679],
      [60.808246575696, 28.9371163285283],
      [60.8082996428703, 28.9372464156655],
      [60.8083510720843, 28.9372792727259],
      [60.8084408273361, 28.9373195058611],
      [60.8084748949603, 28.9373731500414],
      [60.8084938941874, 28.9374375230577],
      [60.8085063419566, 28.9375287181643],
      [60.8085083073934, 28.9376990384367],
      [60.8085128934122, 28.9377325660494],
      [60.808525341174, 28.937755364826],
      [60.8085875799104, 28.9377862102297],
      [60.808631474498, 28.9378385133054],
      [60.8086648867763, 28.9379136151578],
      [60.8086779896209, 28.9379712826516],
      [60.8086858513252, 28.938136238506],
      [60.8086982990195, 28.9381925648953],
      [60.8087238495258, 28.9382596201207],
      [60.8087356420645, 28.9383347219731],
      [60.8087271252315, 28.9384513980653],
      [60.808714022407, 28.9385412520673],
      [60.8087192635374, 28.9386860913541]
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline2);
          },
        });
        return items;
      },
    }
  );

  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline1).add(myPolyline2).add(startPoint).add(endPoint);


  //.......................................................................  Тропа лукоморье (лисий нос)
  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.

      [60.004475450154104, 30.03664961944124],
      [59.9995241104461, 30.033044730525233],
      [59.999744424602476, 30.032358085017425],
      [60.00026027637999, 30.03137103209993],
      [60.00046983885909, 30.030931149821484],
      [60.001227476708266, 30.029150163035602],
      [60.00138330077374, 30.030330335002173],
      [60.001367181076986, 30.03157487998506],
      [60.00114150449477, 30.033184205393997],
      [60.00096418609638, 30.034074698786963],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );
  var startPoint = new ymaps.Placemark(
    [60.004475450154104, 30.03664961944124],
    {
      hintContent: "Сказочная экотропа у Лукоморья",

      // Тут контент карточки тропы
      balloonContent: `<a href="lenoblast/u-lukomoriya/"><figure id="Lukomorie" class="catalog-item">
    <img src="lenoblast/u-lukomoriya/img/for-slider.jpg" alt="Экотропа у Лукоморья" class="trail-img">
    <figcaption class="trail-info">
        <a href="lenoblast/u-lukomoriya/" class="trail-title-link">
            <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
                title="Сказочная экотропа у Лукоморья">У Лукоморья
            </h2>
        </a>
        <a href="lenoblast/u-lukomoriya/" id="trail-location" class="trail-location-black"
            title="г. Санкт-Петербург, пос. Лисий Нос">
            <p id="color-letters-cot" class="black-color size-card-elem-p">
            г.&nbsp;Санкт-Петербург, пос.&nbsp;Лисий Нос</p>
        </a>
        <div class="trail-spec">
            <a href="lenoblast/u-lukomoriya/" class="trail-distance">
                <div class="img-card-color">
                    <img src="/img/dist-orange.svg" alt="Длина тропы">
                </div>
                <p id="color-letters-cot" class="black-color">1,5 км</p>
            </a>
            <a href="lenoblast/u-lukomoriya/" class="trail-difficulty">
                <div id="easy" class="img-card-color">
                    <img src="/img/difficulty-easy.svg" alt="Сложность тропы">
                </div>
                <p id="color-letters-cot" class="black-color">Простая</p>
            </a>
            <a href="lenoblast/u-lukomoriya/" class="trail-duration">
                <div class="img-card-color">
                    <img src="/img/duration-orange.svg" alt="Длительность тропы">
                </div>
                <p id="color-letters-cot" class="black-color">~0,5 ч</p>
            </a>
        </div>
    </figcaption>
</figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [60.00096418609638, 30.034074698786963],
    {
      hintContent: "Конец экотропы",
      ////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );
  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

  //   Дудергофские высоты
  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.

      [59.70248632223368, 30.119334067809042],
      [59.702375173585445, 30.12053033302969],
      [59.70240499399082, 30.12073418091482],
      [59.702611025154376, 30.12110432575887],
      [59.70269235289504, 30.12146374176687],
      [59.702646267199675, 30.122965778815203],
      [59.70278723500856, 30.123008694159463],
      [59.70273301669101, 30.12333055924125],
      [59.70274928219553, 30.12400111149496],
      [59.70273572760897, 30.12431761215872],
      [59.70265163071282, 30.124828762606597],
      [59.702518795138424, 30.125483221606252],
      [59.70240222470887, 30.126051849917406],
      [59.702356138612735, 30.12647027452372],
      [59.702333190920406, 30.126953814475268],
      [59.70238740988773, 30.127624366729002],
      [59.70246602723378, 30.128665063826784],
      [59.70231692521305, 30.129233692137937],
      [59.70228439377453, 30.129405353514883],
      [59.70225457326134, 30.13005981251454],
      [59.7022708389991, 30.13074109360432],
      [59.70225186230427, 30.131685231177553],
      [59.70207631451687, 30.131639616299083],
      [59.7017997942841, 30.131521599102427],
      [59.70161815719781, 30.1316986248974],
      [59.70131452284545, 30.132776872921394],
      [59.70108408421587, 30.133533255863597],
      [59.701048840520436, 30.133662001896308],
      [59.70089702109915, 30.133898036289622],
      [59.70079138989985, 30.134131573109574],
      [59.700650413658046, 30.134319327740627],
      [59.70047961472098, 30.13430323448652],
      [59.700410041884716, 30.135253065082512],
      [59.70000066224183, 30.13547300622172],
      [59.699976261972054, 30.1353067092628],
      [59.69987323841406, 30.13516723439404],
      [59.699832571132546, 30.134931200000725],
      [59.69987323841406, 30.134571783992726],
      [59.69989492761059, 30.134485953304253],
      [59.69978919264431, 30.133879774066887],
      [59.69955381785817, 30.13381416138623],
      [59.69951315018736, 30.13339037236189],
      [59.69942787232307, 30.132853170057356],
      [59.69933569185014, 30.132445474287096],
      [59.69913506288168, 30.13159789623839],
      [59.69911066197893, 30.130900521894525],
      [59.69877446994655, 30.129843731542664],
      [59.69873651256878, 30.1297096210919],
      [59.69847894350778, 30.129377027174062],
      [59.697820099915354, 30.12817003311736],
      [59.697685834882115, 30.12842254240091],
      [59.697813267063204, 30.128921433277693],
      [59.697355051204795, 30.129447146244612],
      [59.697248833988695, 30.129576966676453],
      [59.697172915719136, 30.129753992471425],
      [59.69720274077421, 30.129957840356557],
      [59.69718376119679, 30.130311891946526],
      [59.69721900897482, 30.13060157052013],
      [59.69719189530272, 30.130848333749523],
      [59.69724341126088, 30.13170664063428],
      [59.69728950441919, 30.132098243150462],
      [59.69730034985894, 30.132495210084645],
      [59.69739223701556, 30.132648162375123],
      [59.69747628882277, 30.132363848219548],
      [59.6974085051238, 30.13268034888331],
      [59.697804359979884, 30.133334807882935],
      [59.697874854187695, 30.13352792693201],
      [59.69726209186414, 30.13243895007197],
      [59.69708043007489, 30.13230483962123],
      [59.696950283707416, 30.132095627318073],
      [59.696912324254605, 30.131961516867314],
      [59.696863519180425, 30.131650380621604],
      [59.6967442175875, 30.131215862761184],
      [59.69665474111288, 30.13092081976953],
      [59.69642969316168, 30.130303911696114],
      [59.695798168758415, 30.128711668525167],
      [59.69546736636947, 30.127649513755276],
      [59.695465374392754, 30.12706999004316],
      [59.69520506855273, 30.126233140830532],
      [59.695123722561355, 30.126222411994455],
      [59.695077626411546, 30.126141945724008],
      [59.6949067989483, 30.12495104492141],
      [59.69478477879632, 30.124656001929754],
      [59.6946031035212, 30.124387781028283],
      [59.6943581817257, 30.12441679102073],
      [59.69424293858836, 30.12423708301672],
      [59.69407617428502, 30.123432420312252],
      [59.69400702786609, 30.123250030099253],
      [59.692734472617154, 30.12349096270578],
      [59.69239279282866, 30.123533878050015],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );
  var startPoint = new ymaps.Placemark(
    [59.70248632223368, 30.119334067809042],
    {
      hintContent: "Экотропа Дудергофские высоты",
      balloonContent: `<a href="/catalog/lenoblast/dudergofskie-vysoty/"><figure id="Dudergov" class="catalog-item">
      <img src="/catalog/lenoblast/dudergofskie-vysoty/img/for-slider.jpg" alt="Экотропа Дудергофские Высоты"
          class="trail-img">
      <figcaption class="trail-info">
          <a href="/catalog/lenoblast/dudergofskie-vysoty/" class="trail-title-link">
              <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
                  title="Экотропа Дудергофские Высоты">Дудергофские Высоты</h2>
          </a>
          <a href="/catalog/lenoblast/dudergofskie-vysoty/" id="trail-location" class="trail-location-black" title="г. Санкт-Петербург, г. Красное Село">
              <p id="color-letters-cot" class="black-color size-card-elem-p">г.&nbsp;Санкт-Петербург, г. Красное Село</p>
          </a>
          <div class="trail-spec">
              <a href="/catalog/lenoblast/dudergofskie-vysoty/" class="trail-distance">
                  <div class="img-card-color">
                      <img src="/img/dist-orange.svg" alt="Длина тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">2,5 км</p>
              </a>
              <a href="/catalog/lenoblast/dudergofskie-vysoty/" class="trail-difficulty">
                  <div id="medium" class="img-card-color">
                      <img src="/img/difficulty-medium.svg" alt="Сложность тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">Средняя</p>
              </a>
              <a href="/catalog/lenoblast/dudergofskie-vysoty/" class="trail-duration">
                  <div class="img-card-color">
                      <img src="/img/duration-orange.svg" alt="Длительность тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">~1 ч</p>
              </a>
          </div>
      </figcaption>
  </figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [59.69239279282866, 30.123533878050015],
    {
      hintContent: "Конец экотропы",
      //////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );
  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

  // Тропа здоровья
  // var myPolyline = new ymaps.Polyline(
  //   [
  //     // Указываем координаты вершин.

  //     [43.5455814134358, 39.78831236305254],
  //     [43.545531662406596, 39.78827615323095],
  //     [43.54540484587066, 39.78832845630662],
  //     [43.54534046198778, 39.78829492869402],
  //     [43.54536192328989, 39.788227873468614],
  //     [43.54533265787611, 39.78818495812453],
  //     [43.54536192328989, 39.78813131394419],
  //     [43.54539801728028, 39.78800390901603],
  //     [43.5454887399168, 39.787951605940435],
  //     [43.54560189914149, 39.787818836594035],
  //     [43.5456682337602, 39.78754793348365],
  //     [43.545609703218155, 39.78744198622709],
  //     [43.545575560375674, 39.78734810891152],
  //     [43.545578486905974, 39.787301170253805],
  //     [43.54562140933148, 39.78725557270091],
  //     [43.54587113919615, 39.78729982914936],
  //     [43.54590430636512, 39.787243502760184],
  //     [43.545835045491344, 39.787169742012026],
  //     [43.54578822119235, 39.78705440702451],
  //     [43.545786270178965, 39.78698466959017],
  //     [43.54586918818544, 39.78704367818861],
  //     [43.545951130573435, 39.78695382418617],
  //     [43.5459452775489, 39.7868934744837],
  //     [43.545997954744095, 39.78683446588525],
  //     [43.54613159853093, 39.78665744009051],
  //     [43.546153059549354, 39.786426770115064],
  //     [43.546270119513174, 39.78619341793082],
  //     [43.546338404386816, 39.78610222282406],
  //     [43.54641254216112, 39.7860217565541],
  //     [43.546607641128105, 39.78597079458257],
  //     [43.546627150990155, 39.78589837493896],
  //     [43.54654911150499, 39.785858141803914],
  //     [43.5464983857848, 39.785817908669046],
  //     [43.54650033677459, 39.78545581045176],
  //     [43.54647302290883, 39.785321700000736],
  //     [43.546486679843426, 39.785227822685535],
  //     [43.546607641128105, 39.78511785211604],
  //     [43.5466583667557, 39.78500519933713],
  //     [43.54660178816853, 39.784914004230735],
  //     [43.5464710719179, 39.78493009748468],
  //     [43.54639498322257, 39.78490595760354],
  //     [43.546354012346654, 39.78493009748468],
  //     [43.546334502395666, 39.78486036005029],
  //     [43.54637352229135, 39.78475575389883],
  //     [43.54638522825522, 39.78467260541888],
  //     [43.54645936597094, 39.784581410312946],
  //     [43.5465296016175, 39.784479486370415],
  //     [43.54654911150499, 39.784211265468564],
  //     [43.54662324901805, 39.78389208259591],
  //     [43.546787131616426, 39.78342001380901],
  //     [43.54678322965507, 39.78331272544894],
  //     [43.54682029827789, 39.783154475116774],
  //     [43.54701929786279, 39.78270922842051],
  //     [43.54710709158686, 39.78260194006018],
  //     [43.54715391485382, 39.78252952041635],
  //     [43.547362668139236, 39.78233640136719],
  //     [43.54743568669676, 39.782234814574096],
  //     [43.54753518554879, 39.78215434830337],
  //     [43.547546891285336, 39.7819934157624],
  //     [43.547583959435634, 39.781880762983995],
  //     [43.54758591038982, 39.781802978922336],
  //     [43.54761517470228, 39.78173860590594],
  //     [43.54762297851584, 39.78146770279584],
  //     [43.54767569490197, 39.78134686672133],
  //     [43.547693253464054, 39.781274447078246],
  //     [43.54773422342367, 39.78122080289763],
  //     [43.547738125323214, 39.78114033662731],
  //     [43.54778104619995, 39.78103573047577],
  //     [43.54779665378405, 39.78090162002478],
  //     [43.54782201609885, 39.78085065805366],
  //     [43.54792541619591, 39.78076750957427],
  //     [43.54795468034224, 39.78067363225883],
  //     [43.54803466893458, 39.780550250644154],
  //     [43.54806588396606, 39.7803624960133],
  //     [43.54803271799475, 39.78027666532478],
  //     [43.54804247269384, 39.78013719045581],
  //     [43.548056129270584, 39.77977241002951],
  //     [43.548118559295055, 39.779724130267525],
  //     [43.54815562709088, 39.77960074865264],
  //     [43.5482161060775, 39.779238650435985],
  //     [43.548229762614476, 39.77899456941515],
  //     [43.548221958879545, 39.778895327681916],
  //     [43.548221958879545, 39.7787263485137],
  //     [43.54825317381324, 39.77866197549766],
  //     [43.54827463407098, 39.77852786504736],
  //     [43.5483156036321, 39.77844203435812],
  //     [43.54833511293727, 39.778265008563174],
  //     [43.548317554562885, 39.778133580321736],
  //     [43.54837803338592, 39.77798874103479],
  //     [43.54844631585439, 39.777760753268645],
  //     [43.548485334373495, 39.77761323177284],
  //     [43.54849118714882, 39.777398655051606],
  //     [43.54854776395029, 39.777181396121364],
  //     [43.54859848395336, 39.77716262066013],
  //     [43.54866091341208, 39.77706069671758],
  //     [43.54865701157283, 39.77691585743076],
  //     [43.5487506556449, 39.77674687826283],
  //     [43.54877406664003, 39.77649206840642],
  //     [43.548816986774, 39.77630431377537],
  //     [43.54884625048405, 39.77614069902546],
  //     [43.54887746509233, 39.77604413950093],
  //     [43.54891453241852, 39.77601999961979],
  //     [43.548863808703196, 39.775987813111605],
  //     [43.548898925126075, 39.77585102045186],
  //     [43.548939894260045, 39.77580542289861],
  //     [43.54899256881967, 39.775692770119974],
  //     [43.54914083770156, 39.77574909650928],
  //     [43.54920911929995, 39.77567131244785],
  //     [43.549302762508205, 39.77571154558307],
  //     [43.54936128943897, 39.77571154558307],
  //     [43.54940420915182, 39.77565790140278],
  //     [43.549406160047134, 39.77561230384953],
  //     [43.549351534954496, 39.77558279955036],
  //     [43.549296909811986, 39.77537626945622],
  //     [43.549314467898945, 39.77529580318577],
  //     [43.54936519123232, 39.775177785989115],
  //     [43.54939640556996, 39.77511609518178],
  //     [43.549435423469106, 39.774780819054904],
  //     [43.549451030621654, 39.77472181045659],
  //     [43.549589543922096, 39.7743838521207],
  //     [43.549646119685, 39.77429533922321],
  //     [43.549712449821655, 39.774201461907694],
  //     [43.5498177975347, 39.77392519437916],
  //     [43.54989583275815, 39.77383399927266],
  //     [43.54998167138641, 39.77381254160053],
  //     [43.55011433084248, 39.77386082136279],
  //     [43.550198218287946, 39.773777672883334],
  //     [43.55030551601193, 39.77357650720722],
  //     [43.55024699000452, 39.77345312559253],
  //     [43.550237235664376, 39.773353883858995],
  //     [43.55028405648253, 39.773217091199214],
  //     [43.55032112293758, 39.773107120629625],
  //     [43.550445978196215, 39.77287645065434],
  //     [43.550522061741724, 39.77277989112981],
  //     [43.55058839090762, 39.77268869602329],
  //     [43.55068593366509, 39.77255994999058],
  //     [43.55077762371216, 39.77247680151112],
  //     [43.550816640710835, 39.77231318676121],
  //     [43.550851755987935, 39.772093245621974],
  //     [43.550884920397365, 39.77190280878194],
  //     [43.550949729864584, 39.77179593051518],
  //     [43.5509828942197, 39.7716725489005],
  //     [43.551053124558166, 39.77150625194155],
  //     [43.55110774809777, 39.77138287032687],
  //     [43.5512247983719, 39.77120048011387],
  //     [43.55140622584437, 39.771074416290176],
  //     [43.551464750718154, 39.771093191753266],
  //     [43.55156229204729, 39.77102613652791],
  //     [43.55156619369713, 39.77094030583941],
  //     [43.551556439572025, 39.7708812972411],
  //     [43.551595456062984, 39.770798148761635],
  //     [43.551577898645185, 39.770712318073166],
  //     [43.55148035734149, 39.77068013156498],
  //     [43.551423783312494, 39.7706130763396],
  //     [43.551425734141986, 39.77050578797902],
  //     [43.55145304574796, 39.770393135200386],
  //     [43.55148816065164, 39.7703046223029],
  //     [43.55162990468301, 39.77014236444357],
  //     [43.55187570784963, 39.76984732145194],
  //     [43.55199665824354, 39.769681024493025],
  //     [43.552160526129214, 39.76954691404229],
  //     [43.55236731115411, 39.76964883798484],
  //     [43.552613111291976, 39.76985268586997],
  //     [43.55273406019554, 39.769868779124074],
  //     [43.55276527277614, 39.769643473566816],
  //     [43.55270421769251, 39.76888097441594],
  //     [43.55274323343516, 39.76856983817024],
  //     [43.5529578195651, 39.76848937189979],
  //     [43.55312948791504, 39.768333803776926],
  //     [43.553184109559474, 39.76805485403937],
  //     [43.553148995650915, 39.76800657427711],
  //     [43.55303194914025, 39.76801730311316],
  //     [43.55303975224808, 39.76789392149848],
  //     [43.55355085359523, 39.767207275990664],
  //     [43.553859072908345, 39.7667620292942],
  //     [43.554639367869996, 39.7653941026966],
  //     [43.555021708686944, 39.765104424122995],
  //     [43.55506072291865, 39.76478792345924],
  //     [43.55520897676719, 39.76470209277076],
  //     [43.55537673725809, 39.764471422795474],
  //     [43.55539624426139, 39.764342676762766],
  //     [43.555712256828876, 39.76405836260719],
  //     [43.555766876115854, 39.763902794484316],
  //     [43.555837100840115, 39.763849150304004],
  //     [43.55594243777197, 39.76359702265661],
  //     [43.55613750567464, 39.76345218336982],
  //     [43.55626625014205, 39.76318932688635],
  //     [43.556492527625615, 39.76287282622259],
  //     [43.5565666528221, 39.76287282622259],
  //     [43.55666418583546, 39.76272262251775],
  //     [43.556781225241615, 39.76243294394415],
  //     [43.55691777092614, 39.76228810465736],
  //     [43.55700359948264, 39.76214862978857],
  //     [43.557108934361, 39.76205207026404],
  //   ],
  //   [],

  //   {
  //     // Задаем опции геообъекта.
  //     // Цвет с прозрачностью.
  //     strokeColor: "#010101",
  //     // Ширину линии.
  //     strokeWidth: 1,
  //     // Максимально допустимое количество вершин в ломаной.
  //     editorMaxPoints: 6,
  //     // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
  //     editorMenuManager: function (items) {
  //       items.push({
  //         title: "Удалить линию",
  //         onClick: function () {
  //           myMap.geoObjects.remove(myPolyline);
  //         },
  //       });
  //       return items;
  //     },
  //   }
  // );
  // var startPoint = new ymaps.Placemark(
  //   [43.5455814134358, 39.78831236305254],
  //   {
  //     hintContent: "Начало экотропы",

  //  // Тут контент карточки тропы
  //     balloonContent: `Начало маршрута Тропа здоровья`,
  //   },
  //   {
  //     iconLayout: "default#image",
  //     iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
  //     iconImageSize: [32, 51],
  //     iconImageOffset: [-10, -45],
  //   }
  // );

  // var endPoint = new ymaps.Placemark(
  //   [43.557108934361, 39.76205207026404],
  //   {
  //     hintContent: "Конец экотропы",
  //     ////balloonContent: "Это Конец экотропы",
  //   },
  //   {
  //     iconLayout: "default#image",
  //     iconImageHref: "2",
  //     iconImageSize: [15, 15],
  //     iconImageOffset: [0, 0],
  //   }
  // );
  // // Добавляем линию на карту.
  // myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

  // Гряда Вярямянселькя
  // var myPolyline = new ymaps.Polyline(
  //   [
  //     // Указываем координаты вершин.

  //     [60.630891536172584, 30.121123527572188],
  //     [60.63086386700685, 30.12121472267869],
  //     [60.63044948546098, 30.121587549731753],
  //     [60.630232740044185, 30.12163851170303],
  //     [60.62994747713114, 30.121639852807547],
  //     [60.629616094632944, 30.12174311785462],
  //     [60.62928932047396, 30.121710931346435],
  //     [60.628572513908146, 30.12192550806762],
  //     [60.628430204820454, 30.122183000133063],
  //     [60.627918941048364, 30.123502646968397],
  //     [60.62776081658582, 30.123974715755],
  //     [60.6274709197175, 30.12445751337768],
  //     [60.627075601592715, 30.12486520914794],
  //     [60.6268015115056, 30.125090514705203],
  //     [60.62651160598563, 30.126206313655405],
  //     [60.625568077191936, 30.129027997539072],
  //     [60.625525907660816, 30.12914601473573],
  //     [60.6253203304043, 30.12934986262086],
  //     [60.62433986694077, 30.12946787981752],
  //     [60.62355969185379, 30.129918490932013],
  //     [60.62164607414153, 30.130004321620486],
  //     [60.62116633393912, 30.12966099886657],
  //     [60.62101872012905, 30.12942496447328],
  //     [60.619510911683165, 30.13002577929262],
  //     [60.619447645447515, 30.13001505045654],
  //     [60.61927893487724, 30.129768287227172],
  //     [60.619170842028794, 30.129660395167214],
  //     [60.618675247943315, 30.12935998775753],
  //     [60.61788966294522, 30.12988570072445],
  //     [60.617821121061965, 30.13000371792111],
  //     [60.617436229311565, 30.13035776951108],
  //     [60.6171128752174, 30.130393836377245],
  //     [60.61598452452146, 30.130844447491768],
  //     [60.616042524821516, 30.129599902508854],
  //     [60.616205979649784, 30.128140780804756],
  //     [60.61630088852367, 30.12742194878876],
  //     [60.61627452497567, 30.126692387936714],
  //     [60.616374706343024, 30.125662419674985],
  //     [60.61650652345616, 30.12496504533112],
  //     [60.61654343215101, 30.12405309426605],
  //     [60.61630616123065, 30.123033854840397],
  //     [60.61573143107889, 30.121360156415093],
  //     [60.61505650549413, 30.119546983121026],
  //     [60.615003776336295, 30.119343135235894],
  //     [60.61476122109677, 30.118967625973816],
  //     [60.6146873995738, 30.11883887994111],
  //     [60.61416537111138, 30.11821660744964],
  //     [60.613706611831184, 30.117487046597592],
  //     [60.61330175846402, 30.117623606211126],
  //     [60.612943178922286, 30.11763433504718],
  //     [60.61268478824481, 30.11756996203084],
  //     [60.61245276219409, 30.11694768953937],
  //     [60.61222073446956, 30.115874805933426],
  //     [60.612041439172366, 30.114319124704778],
  //     [60.612004525310624, 30.11323551226276],
  //     [60.612352568609296, 30.112398663050108],
  //     [60.6130275509388, 30.109609165674627],
  //     [60.61328066566044, 30.108665028101395],
  //     [60.613628695150226, 30.107656517511796],
  //     [60.613686699699066, 30.107087889200642],
  //     [60.61363396829534, 30.10570386934894],
  //     [60.613423041816006, 30.104545155054502],
  //     [60.613338670836946, 30.10385850954669],
  //     [60.613359763602475, 30.10300020266193],
  //     [60.61260041532912, 30.10063985872884],
  //     [60.61272697461965, 30.099009075647775],
  //     [60.6137394310163, 30.094417133814275],
  //     [60.61401363247231, 30.09343008089681],
  //     [60.6160173413821, 30.08999685335773],
  //     [60.616650065628626, 30.088709393030577],
  //     [60.61732495777029, 30.088366070276685],
  //     [60.61778893790161, 30.086778202539854],
  //     [60.61825291133843, 30.08574823427815],
  //     [60.6186325209892, 30.083902874475896],
  //     [60.6189699480278, 30.083216228968087],
  //     [60.61776403223897, 30.082071689998294],
  //     [60.61689933593709, 30.081127552425038],
  //     [60.6161822530755, 30.079754261409413],
  //     [60.61567606731077, 30.07941093865552],
  //     [60.614705855658414, 30.079539684688232],
  //     [60.614052000861854, 30.07919636193431],
  //     [60.61395708535102, 30.07879939500013],
  //     [60.61384107712404, 30.078348783885605],
  //     [60.61377252661142, 30.076675085460327],
  //     [60.61400454314144, 30.07495847169079],
  //     [60.61422601190421, 30.06846752587475],
  //     [60.614347291770876, 30.069240002071034],
  //     [60.61459512311979, 30.07016268197216],
  //     [60.61526478551033, 30.07157888833202],
  //     [60.61577097774854, 30.071568159495968],
  //     [60.61666206764264, 30.07086005631605],
  //     [60.61692042636741, 30.070334343349106],
  //     [60.617853664062224, 30.069765715037953],
  //     [60.61807510631917, 30.069400934611927],
  //     [60.61921920035385, 30.06859627190746],
  //     [60.619556621236065, 30.06739464226881],
  //     [60.6199994807706, 30.066278843318607],
  //     [60.620199819984855, 30.066064266597397],
  //     [60.62036852572342, 30.066278843318607],
  //     [60.62051087050184, 30.066761640941287],
  //     [60.62072175049672, 30.067051319514892],
  //     [60.62123840063891, 30.067083506023074],
  //     [60.62186885221211, 30.06656525592714],
  //     [60.622121897352216, 30.06660817127138],
  //     [60.6222431474427, 30.06688712100893],
  //     [60.62238548392202, 30.067874173926423],
  //     [60.6225067330185, 30.068314056204866],
  //     [60.62265433999701, 30.06827114086063],
  //     [60.62276504478616, 30.06805656413942],
  //     [60.62273868653761, 30.06754158000858],
  //     [60.62278085972492, 30.066661815451692],
  //     [60.622786131369445, 30.06625411968143],
  //     [60.62275450148933, 30.065942983435697],
  //     [60.622786131369445, 30.06539581279665],
  //     [60.622854662669646, 30.06524024467378],
  //     [60.623043122991874, 30.065103452014032],
  //     [60.624575701002136, 30.06500077835337],
  //     [60.62460732909051, 30.064421421206163],
  //     [60.62486035267744, 30.06291938415783],
  //     [60.62520825685782, 30.062061077273047],
  //     [60.62527151175882, 30.06210399261731],
  //     [60.62720072645083, 30.06643844238536],
  //     [60.62751868191571, 30.067161697641524],
  //     [60.627890275968014, 30.066888112321998],
  //     [60.62821179359646, 30.066973943010495],
  //     [60.62833038535245, 30.06711341787926],
  //     [60.628404175557556, 30.067869800821466],
  //     [60.62840154019599, 30.068261403337647],
  //     [60.628491142367565, 30.069082159296194],
  //     [60.628638721870324, 30.06940402437798],
  //     [60.62889171372717, 30.069441575304193],
  //     [60.629039291390754, 30.069264549509192],
  //     [60.62915260949397, 30.06923772741906],
  //     [60.62931599768366, 30.069505948320533],
  //     [60.62946620867368, 30.06958641459098],
  //     [60.62962959526926, 30.069543499246745],
  //     [60.62958743106605, 30.07000483919732],
  //     [60.62949783195055, 30.070348161951213],
  //     [60.629371338656405, 30.070568103090448],
  //     [60.628965502643666, 30.07100798536889],
  //     [60.62972182927099, 30.073057193056272],
  //     [60.62990629648036, 30.07377602507224],
  //     [60.630190900955185, 30.074430484071897],
  //     [60.63037536547244, 30.074966925874868],
  //     [60.630833886971644, 30.07593252112023],
  //     [60.63120280756691, 30.07756330420127],
  //     [60.631334563896104, 30.077885169283057],
  //     [60.63173509981988, 30.078593272463],
  //     [60.63178516645939, 30.081441778436826],
  //     [60.63166926875162, 30.082228353727317],
  //     [60.63153224358508, 30.082898905981047],
  //     [60.63149008187786, 30.083692839849437],
  //     [60.63151643295135, 30.08404689143941],
  //     [60.631653458185305, 30.084545782316194],
  //     [60.63151116273838, 30.084690621602984],
  //     [60.63128190763759, 30.08692221950339],
  //     [60.63140839341267, 30.090156963575343],
  //     [60.631384677367755, 30.091122558820704],
  //     [60.631363596424244, 30.091546347845043],
  //     [60.63135832618622, 30.09261923145101],
  //     [60.631400488066305, 30.093670657384845],
  //     [60.63146109567202, 30.09390669177816],
  //     [60.63135832618622, 30.097624233472793],
  //     [60.63141893387145, 30.098729303586943],
  //     [60.63162447212683, 30.09992020438954],
  //     [60.631740416203854, 30.101207664716693],
  //     [60.63161393173548, 30.102838447797758],
  //     [60.631735146027594, 30.103868416059463],
  //     [60.63166926875162, 30.104361942518224],
  //     [60.63158758074189, 30.10613756488608],
  //     [60.63159285094235, 30.10760741542623],
  //     [60.63151906805751, 30.108326247442225],
  //     [60.63133461010437, 30.109366944540007],
  //     [60.631208124038935, 30.110450556982027],
  //     [60.63111325916314, 30.11261778186604],
  //     [60.631097448323295, 30.11461334537313],
  //     [60.63097096132447, 30.1167161972408],
  //     [60.630739067200444, 30.118357709157923],
  //     [60.6307970408883, 30.120063594091384],

  //     [60.624578592253066, 30.065006707617144],
  //     [60.62461153817481, 30.06548548192629],
  //     [60.62462537545191, 30.065718163558348],
  //     [60.62463117709654, 30.06623889244255],
  //     [60.62463513060249, 30.06671766675172],
  //     [60.62456792093559, 30.067278248435837],
  //     [60.62443745471049, 30.06792197859941],
  //     [60.624416369210266, 30.068391365177],
  //     [60.62444009039703, 30.068887573844773],
  //     [60.62450861817161, 30.069627863532872],
  //     [60.62469047963442, 30.070228678352212],
  //     [60.62497513029344, 30.070711475974893],
  //     [60.62526241405116, 30.07093678153213],
  //     [60.625721008491034, 30.070797306663366],
  //     [60.627522414841714, 30.06716405070918],
  //     [60.627258870387585, 30.06807063735623],
  //     [60.62718903074507, 30.068317400585595],
  //     [60.6271086490819, 30.068749236237],
  //     [60.62702958495482, 30.069465386043955],
  //     [60.627059892893165, 30.070178853641924],
  //     [60.6271086490819, 30.070626782547407],
  //     [60.62715476973288, 30.07075821078916],
  //     [60.62724701083634, 30.070857452522695],
  //     [60.62796384696168, 30.070629464756422],
  //     [60.62809166348852, 30.07083063043254],
  //     [60.628182584213704, 30.07090841449397],
  //     [60.628305129132045, 30.070959376465275],
  //     [60.62873732683488, 30.07093523658413],
  //     [60.62897318837407, 30.070991562973433],
  //   ],
  //   [],

  //   {
  //     // Задаем опции геообъекта.
  //     // Цвет с прозрачностью.
  //     strokeColor: "#010101",
  //     // Ширину линии.
  //     strokeWidth: 1,
  //     // Максимально допустимое количество вершин в ломаной.
  //     editorMaxPoints: 6,
  //     // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
  //     editorMenuManager: function (items) {
  //       items.push({
  //         title: "Удалить линию",
  //         onClick: function () {
  //           myMap.geoObjects.remove(myPolyline);
  //         },
  //       });
  //       return items;
  //     },
  //   }
  // );
  // var startPoint = new ymaps.Placemark(
  //   [60.63089483011932, 30.121119504258658],
  //   {
  //     hintContent: "Начало экотропы",

  //  // Тут контент карточки тропы
  //     balloonContent: `Начало маршрута Гряда Вярямянселькя`,
  //   },
  //   {
  //     iconLayout: "default#image",
  //     iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
  //     iconImageSize: [32, 51],
  //     iconImageOffset: [-10, -45],
  //   }
  // );

  // var endPoint = new ymaps.Placemark(
  //   [60.63089483011932, 30.121119504258658],
  //   {
  //     hintContent: "Конец экотропы",
  //     ////balloonContent: "Это Конец экотропы",
  //   },
  //   {
  //     iconLayout: "default#image",
  //     iconImageHref: "2",
  //     iconImageSize: [15, 15],
  //     iconImageOffset: [0, 0],
  //   }
  // );
  // // Добавляем линию на карту.
  // myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

  // Колтушские высоты (Лесная Тропа)
  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.

      [59.95596530417698, 30.69663745171536],
      [59.95640651304511, 30.69598567492472],
      [59.95663518605397, 30.695749640531407],
      [59.95683157455074, 30.695663809842934],
      [59.95703334233802, 30.69574427611338],
      [59.957162473074966, 30.69589447981822],
      [59.9573561682337, 30.696194887227904],
      [59.957453015387046, 30.696522116727717],
      [59.95749067809219, 30.696811795301322],
      [59.95751488980853, 30.697122931547057],
      [59.957904965014166, 30.69776666171063],
      [59.958273514596, 30.698168993062865],
      [59.95850755489592, 30.698238730497234],
      [59.958690176612315, 30.69817574729825],
      [59.95886503225818, 30.698283035658857],
      [59.959010296244486, 30.698449332617777],
      [59.95911789878533, 30.698626358412774],
      [59.95926316165934, 30.698996503256826],
      [59.959327722731544, 30.699146706961667],
      [59.959793096726386, 30.700015742682478],
      [59.95997870649016, 30.700444896124868],
      [59.96021920616812, 30.700629423631735],
      [59.960342944529835, 30.70079035617263],
      [59.96058772992298, 30.701541374696806],
      [59.96075450574489, 30.701986621393278],
      [59.96082444374213, 30.70209390975388],
      [59.960964319292216, 30.702217291368566],
      [59.96104770635747, 30.702319215311118],
      [59.96088279894189, 30.703483659012537],
      [59.96123786586146, 30.70450289843819],
      [59.96160504951164, 30.705311112114533],
      [59.96198604180597, 30.70586607993781],
      [59.9624271702405, 30.705839257847654],
      [59.96270690716969, 30.705930452954153],
      [59.96302160838222, 30.706112843167176],
      [59.96358644918903, 30.706751208912724],
      [59.96366713994406, 30.706820946347094],
      [59.96387424531263, 30.70661709846196],
      [59.96406790110534, 30.70612357200323],
      [59.96421314220446, 30.70563540996252],
      [59.96443907153312, 30.705329638134813],
      [59.964619275960715, 30.705501299511784],
      [59.965111471101615, 30.70646689475715],
      [59.96530265884279, 30.707167155636416],
      [59.9653456916997, 30.708004004849066],
      [59.96546941085089, 30.708637006176588],
      [59.96514666426625, 30.709967381847974],
      [59.9650767354237, 30.710224873913397],
      [59.965033702216225, 30.71079350222455],
      [59.96481853533739, 30.711641080273253],
      [59.96483467290196, 30.71202731837141],
      [59.96492611895209, 30.712252623928645],
      [59.96534031259564, 30.71228481043683],
      [59.96600731481396, 30.71241355646954],
      [59.96622785290556, 30.712520844830145],
      [59.96645376844742, 30.712467200649854],
      [59.96671733462567, 30.712059504879594],
      [59.966900216043356, 30.711887843502623],
      [59.96702392936909, 30.711587436092966],
      [59.96723370307923, 30.71141577471602],
      [59.96743271793103, 30.7118985723387],
      [59.96742733916701, 30.712327725781066],
      [59.967508020535035, 30.71256376017438],
      [59.96761559538571, 30.712649590862853],
      [59.967755442167444, 30.712606675518618],
      [59.96798672592944, 30.71220970858441],
      [59.968053959277206, 30.711984403027174],
      [59.968183046921055, 30.711769826305964],
      [59.968301376817806, 30.711641080273253],
      [59.96867787821283, 30.711678631199465],
      [59.96882847756846, 30.711576707256913],
      [59.96894142663428, 30.711571342838887],
      [59.96904630756369, 30.71146405447828],
      [59.969229176079374, 30.711040265453917],
      [59.96930985304367, 30.71066475619184],
      [59.96931523150094, 30.710326797855974],
      [59.969390529810774, 30.70980644930708],
      [59.96938564776368, 30.709253766198444],
      [59.9694609459129, 30.708792426247868],
      [59.969232361714944, 30.708406188149738],
      [59.968971504872805, 30.708272077698975],
      [59.968371795243314, 30.708454467912002],
      [59.96840450456477, 30.70798122122575],
      [59.96844753337854, 30.7077022714882],
      [59.96844484407933, 30.706956617382072],
      [59.968573930194616, 30.706672303226494],
      [59.968565862327196, 30.706495277431497],
      [59.96868150157178, 30.706135861423526],
      [59.968775626239236, 30.706039301898972],
      [59.968837479446, 30.705862276104],
      [59.96893429292829, 30.705250732448608],
      [59.96893160366873, 30.705105893161793],
      [59.96897463179542, 30.704746477153797],
      [59.969200528540455, 30.70439778998185],
      [59.96921666396311, 30.70400082304767],
      [59.96914674374138, 30.70379697516254],
      [59.96898001030732, 30.70370041563799],
      [59.968762179874616, 30.703636042621646],
      [59.968536280129804, 30.70330344870378],
      [59.96844753337854, 30.70297085478594],
      [59.96842870827943, 30.70280455782702],
      [59.9683426505467, 30.7027294559746],
      [59.96825928190419, 30.702584616687783],
      [59.96830380895084, 30.702450243792715],
      [59.96834683789587, 30.701962081752008],
      [59.96839121143668, 30.700937477908305],
      [59.96831322153737, 30.702420739493544],
      [59.96825540132064, 30.70261385854262],
      [59.968233886795545, 30.703582135996996],
      [59.9682089669983, 30.703617004714193],
      [59.96788893654035, 30.7037806194641],
      [59.967373221658214, 30.703896887316116],
      [59.96678020658015, 30.70389956952513],
      [59.96610246201827, 30.703459687246685],
      [59.96604509929325, 30.703673589717017],
      [59.96564705165925, 30.703609216700677],
      [59.96553678085767, 30.70359312344657],
      [59.965404993318984, 30.703394639979468],
      [59.96524630966621, 30.703051317225572],
      [59.964913374216145, 30.70257724830589],
      [59.964835376100346, 30.702453866691204],
      [59.96410917790188, 30.702475324363338],
      [59.963756831539435, 30.701895967216103],
      [59.96370034818505, 30.701633110732658],
      [59.963146268252444, 30.70066215106927],
      [59.962906881327456, 30.700351014823536],
      [59.9626379051838, 30.70005597183188],
      [59.962492657155146, 30.699841395110695],
      [59.962342028894945, 30.699573174209224],
      [59.962242506274634, 30.69936396190604],
      [59.962067668512546, 30.699208393783174],
      [59.96194124678476, 30.699267402381516],
      [59.96159425700198, 30.69991113254509],
      [59.961540459809896, 30.70016862461051],
      [59.961543149671606, 30.700742617339717],
      [59.961368308206374, 30.70111812660179],
      [59.961266092767076, 30.701423898429475],
      [59.961080490239524, 30.70193888256034],
      [59.96095002986753, 30.702199727387047],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );
  var startPoint = new ymaps.Placemark(
    [59.95596530417698, 30.69663745171536],
    {
      hintContent: "Лесная Тропа",

      // Тут контент карточки тропы
      balloonContent: `<a href="lenoblast/lesnaya-tropa/"><figure id="LesnayaTropa" class="catalog-item">
      <img src="lenoblast/lesnaya-tropa/img/for-slider.jpg" alt="Экотропа Лесная Тропа" class="trail-img">
      <figcaption class="trail-info">
          <a href="lenoblast/lesnaya-tropa/" class="trail-title-link">
              <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
                  title="Экотропа Лесная Тропа">Лесная Тропа
              </h2>
          </a>
          <a href="lenoblast/lesnaya-tropa/" id="trail-location" class="trail-location-black"
              title="Ленинградская область, пос. Воейково">
              <p id="color-letters-cot" class="black-color size-card-elem-p">
              Ленинградская область, пос.&nbsp;Воейково</p>
          </a>
          <div class="trail-spec">
              <a href="lenoblast/lesnaya-tropa/" class="trail-distance">
                  <div class="img-card-color">
                      <img src="/img/dist-orange.svg" alt="Длина тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">4,8 км</p>
              </a>
              <a href="lenoblast/lesnaya-tropa/" class="trail-difficulty">
                  <div id="easy" class="img-card-color">
                      <img src="/img/difficulty-easy.svg" alt="Сложность тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">Простая</p>
              </a>
              <a href="lenoblast/lesnaya-tropa/" class="trail-duration">
                  <div class="img-card-color">
                      <img src="/img/duration-orange.svg" alt="Длительность тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">~2 ч</p>
              </a>
          </div>
      </figcaption>
  </figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [59.95596530417698, 30.69663745171536],
    {
      hintContent: "Конец экотропы",
      ////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );
  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

  // Сестрорецкое болото
  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      [60.1313695241645, 29.9971059254531],
      [60.1312276950289, 29.9976101807479],
      [60.1311420620462, 29.9977442911987],
      [60.131091217357, 29.9978301218871],
      [60.1310269923737, 29.9980232409362],
      [60.1309707954011, 29.9982485464934],
      [60.1309467109587, 29.9983987501983],
      [60.1309360067564, 29.9986240557555],
      [60.1309012180747, 29.9988547257308],
      [60.1308423448371, 29.9990853957061],
      [60.1307807954303, 29.9992677859191],
      [60.1306710766269, 29.9994716338042],
      [60.1305265683863, 29.9997076681975],
      [60.1304757227429, 29.9998525074843],
      [60.1303981160825, 30.000147550476],
      [60.1303124809337, 30.0005874327544],
      [60.1302134650142, 30.0008181027297],
      [60.1301438860811, 30.0009200266723],
      [60.130085011484, 30.0009629420165],
      [60.1298655688727, 30.0009200266723],
      [60.1297611993016, 30.0010058573607],
      [60.1297210570739, 30.0010755947951],
      [60.1296300678426, 30.0012633494261],
      [60.1295096405306, 30.0016549519423],
      [60.1293142797285, 30.0021109274748],
      [60.1291483559416, 30.0024542502287],
      [60.1290038409827, 30.0026259116057],
      [60.1288620016163, 30.0027546576384],
      [60.1286452270601, 30.0028994969252],
      [60.1284900048836, 30.0028994969251],
      [60.1284177460379, 30.0029155901792],
      [60.1283133718685, 30.0030282429578],
      [60.1281420904605, 30.0032803706052],
      [60.127952074093, 30.0036236933591],
      [60.1278262880107, 30.0039348296048],
      [60.1276603566872, 30.0043800763013],
      [60.1274569558662, 30.0049755267026],
      [60.1272990517185, 30.0056729010465],
      [60.1272294666026, 30.0060108593823],
      [60.1270715613598, 30.0064668349149],
      [60.1268574513541, 30.0071373871686],
      [60.126512196017, 30.0081834486844],
      [60.1262472301522, 30.0088003567578],
      [60.1259287330079, 30.0093958071591],
      [60.1256262916717, 30.0097284010769],
      [60.1254068192191, 30.0098946980358],
      [60.1252034044236, 30.0100556305767],
      [60.1250535190304, 30.0102541140438],
      [60.1249384279867, 30.0104311398388],
      [60.124783188277, 30.011015861404],
      [60.1245235615856, 30.0116005829692],
      [60.1243843794301, 30.0117829731822],
      [60.1242585796661, 30.0118527106166],
      [60.1241515156572, 30.0118205241084],
      [60.1240257149912, 30.0117025069117],
      [60.1238383514163, 30.0115362099528],
      [60.123701842995, 30.0114932946086],
      [60.123570687301, 30.0114342860102],
      [60.1232842842888, 30.0112626246333],
      [60.1231986305568, 30.0112465313792],
      [60.1226391991783, 30.0113377264857],
      [60.1222912226861, 30.0115147522807],
      [60.1221172330514, 30.0116005829691],
      [60.1219967781546, 30.0117078713297],
      [60.1219030907069, 30.0117722443461],
      [60.1218254637619, 30.0118044308542],
      [60.1217531902251, 30.0117883376001],
      [60.1216139963157, 30.0117346934198],
      [60.1215390454954, 30.0116971424936],
      [60.1214560640404, 30.0116703204035],
      [60.1213704055441, 30.0116595915674],
      [60.1212365636869, 30.0116864136576],
      [60.1211562583159, 30.0116756848215],
      [60.1209662014882, 30.0115952185511],
      [60.1208751879605, 30.0115737608789],
      [60.1204388549382, 30.0115415743707],
      [60.1201765169536, 30.0114879301905],
      [60.1200640857467, 30.0114450148462],
      [60.1199302385695, 30.0113752774118],
      [60.119772298189, 30.0113377264856],
      [60.1196116800824, 30.0113001755594],
      [60.1193546894764, 30.0114181927561],
      [60.1192877645, 30.0114396504282],
      [60.1191780072581, 30.0114396504282],
      [60.1190843117611, 30.0114450148462],
      [60.1189959700474, 30.0114503792643],
      [60.1188969199644, 30.011402099502],
      [60.1188380251787, 30.0113323620676],
      [60.1188246399854, 30.0111446074365],
      [60.1188219629461, 30.0110748700022],
      [60.1188862118204, 30.0105867079615],
      [60.1190414794177, 30.0100341729043],
      [60.1191458830908, 30.0097123078225],
      [60.119207454332, 30.0095299176095],
      [60.1192957954763, 30.0094226292489],
      [60.1194109063074, 30.0093689850686],
      [60.1195286937165, 30.0093636206506],
      [60.1196571885897, 30.0094226292489],
      [60.1198044216709, 30.0094870022653],
      [60.1199596849412, 30.0095191887734],
      [60.1200694395683, 30.0095138243554],
      [60.1200774703082, 30.0093394807693],
      [60.1200814857135, 30.0092348746177],
      [60.1201269936052, 30.0090042046425],
      [60.1202166707366, 30.0087574414131],
      [60.1202969784073, 30.008561640155],
      [60.120442870164, 30.0082370928642],
      [60.1205271925868, 30.008035927188],
      [60.1206329299782, 30.0078481725569],
      [60.1206770986611, 30.0077677062865],
      [60.1208162965365, 30.0075933627005],
      [60.1210090310937, 30.0072983197088],
      [60.121145550711, 30.0070891074056],
      [60.1215256611786, 30.0063327244634],
      [60.1217264219681, 30.0059303931112],
      [60.121888368117, 30.0056112102384],
      [60.1220623589474, 30.0052652052755],
      [60.1222256418189, 30.0049433401937],
      [60.1224277366977, 30.0045517376775],
      [60.1227502828949, 30.0039106897229],
      [60.122908208922, 30.0036129645222],
      [60.1231196680172, 30.0031864932888],
      [60.1232896373055, 30.0028163484448],
      [60.1234341774324, 30.002486436736],
      [60.1235680103063, 30.0021109274739],
      [60.1235880851917, 30.0020599655026],
      [60.1236536630649, 30.0019392660969],
      [60.1237982015789, 30.0017381004208],
      [60.1239213264761, 30.0016120365971],
      [60.1240538190655, 30.0014511040562],
      [60.1241595450913, 30.0013277224415],
      [60.1242478728933, 30.0011721543186],
      [60.1243455685284, 30.0008958867901],
      [60.1245048251639, 30.0002709320896],
      [60.1245449737668, 30.0001287750118],
      [60.1245944903205, 29.999986617934],
      [60.1246921849233, 29.9998417786472],
      [60.1248460867807, 29.9996164730899],
      [60.1249571633313, 29.9994662693851],
      [60.1250468272605, 29.9993938497417],
      [60.1251860065963, 29.9993321589343],
      [60.1253251853507, 29.9992570570819],
      [60.1254014657456, 29.9992114595286],
      [60.1254917975841, 29.9991216055266],
      [60.1256323132559, 29.998940556418],
      [60.1257514165674, 29.9987286619058],
      [60.125938769207, 29.9983665636888],
      [60.1259655337837, 29.9982914618364],
      [60.1259842689744, 29.9981063894143],
      [60.125996313011, 29.9977898887506],
      [60.1259936365568, 29.997671871554],
      [60.1260096952786, 29.9975806764474],
      [60.1260337833465, 29.997500210177],
      [60.1260993563218, 29.9973714641443],
      [60.126223810809, 29.9971488407961],
      [60.1263884111707, 29.9968377045503],
      [60.1264526452376, 29.9967974714151],
      [60.1265824511973, 29.9967438272348],
      [60.1267042274464, 29.9966419032922],
      [60.1268852707401, 29.9965047297196],
      [60.1269789439511, 29.9964081701951],
      [60.1270793078185, 29.9962660131173],
      [60.1272024204099, 29.9960648474412],
      [60.1273563104903, 29.9957805332856],
      [60.1276279581813, 29.9952843246178],
      [60.1277805081109, 29.9949973282532],
      [60.1278996036135, 29.9947720226959],
      [60.1281150449572, 29.9944769797043],
      [60.1282475205996, 29.9942945894913],

    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );
  var startPoint = new ymaps.Placemark(
    [60.1313695241645, 29.9971059254531],
    {
      hintContent: "Экотропа Сестрорецкое болото",
      balloonContent: `<a href="/catalog/lenoblast/sestroreckoe-boloto/"><figure id="Sestroleckoe" class="catalog-item">
      <img src="/catalog/lenoblast/sestroreckoe-boloto/img/for-slider.jpg" alt="Экотропа Сестрорецкое болото"
          class="trail-img">
      <figcaption class="trail-info">
          <a href="/catalog/lenoblast/sestroreckoe-boloto/" class="trail-title-link">
              <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
                  title="Сестрорецкое болото">Сестрорецкое болото</h2>
          </a>
          <a href="/catalog/lenoblast/sestroreckoe-boloto/" id="trail-location" class="trail-location-black"
              title="г. Санкт-Петербург, г. Белоостров">
              <p id="color-letters-cot" class="black-color size-card-elem-p">г.&nbsp;Санкт-Петербург, г. Белоостров</p>
          </a>
          <div class="trail-spec">
              <a href="/catalog/lenoblast/sestroreckoe-boloto/" class="trail-distance">
                  <div class="img-card-color">
                      <img src="/img/dist-orange.svg" alt="Длина тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">3,5 км</p>
              </a>
              <a href="/catalog/lenoblast/sestroreckoe-boloto/" class="trail-difficulty">
                  <div id="easy" class="img-card-color">
                      <img src="/img/difficulty-easy.svg" alt="Сложность тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">Простая</p>
              </a>
              <a href="/catalog/lenoblast/sestroreckoe-boloto/" class="trail-duration">
                  <div class="img-card-color">
                      <img src="/img/duration-orange.svg" alt="Длительность тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">~1,5 ч</p>
              </a>
          </div>
      </figcaption>
  </figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [60.1282475205996, 29.9942945894913],
    {
      hintContent: "Конец экотропы",
      //////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );
  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

  // Поляна нарзанов чегет

  // var myPolyline = new ymaps.Polyline(
  //   [
  //     // Указываем координаты вершин.

  //     [43.247298523267474, 42.560450183484974],
  //     [43.24736126614524, 42.5598976484279],
  //     [43.24742008753401, 42.55945776614946],
  //     [43.2475455729722, 42.55894278201859],
  //     [43.24757694429108, 42.5587818494777],
  //     [43.2475926299444, 42.55864237460894],
  //     [43.24756125863368, 42.55856190833849],
  //     [43.2474396946509, 42.55844925555986],
  //     [43.247427930381505, 42.558250772092755],
  //     [43.24745145891796, 42.55765532169146],
  //     [43.24742400895789, 42.55760704192918],
  //     [43.247204408828814, 42.55748902473252],
  //     [43.24715343011339, 42.55729590568347],
  //     [43.247145587230285, 42.5570893755893],
  //     [43.247222055297215, 42.55667899761003],
  //     [43.2471960757725, 42.55616803679269],
  //     [43.24729215094032, 42.55569596800606],
  //     [43.2472838178961, 42.55551290724082],
  //     [43.24722842763177, 42.55539556059641],
  //     [43.24709558882657, 42.555234628055516],
  //     [43.246830019725486, 42.5546019687491],
  //     [43.24678688362515, 42.55358809374147],
  //     [43.246924134746735, 42.553046287520445],
  //     [43.24695942784193, 42.55246156595521],
  //     [43.24715942165912, 42.551705183013006],
  //     [43.24729078978701, 42.55138868234925],
  //     [43.247347650529996, 42.55084687612825],
  //     [43.24716530382019, 42.54910612247757],
  //     [43.24698099583443, 42.548510672076276],
  //     [43.24659277079289, 42.54815662048631],
  //     [43.246420225530095, 42.5452759280043],
  //     [43.24613395616745, 42.5447341217833],
  //     [43.24556925646593, 42.54210555694871],
  //     [43.24500455149227, 42.54143500469498],
  //     [43.24493004141454, 42.54105413101488],
  //     [43.24496141409005, 42.54097902916246],
  //     [43.24543984537513, 42.540447951777516],
  //     [43.245788862531874, 42.53951454304031],
  //     [43.24558494263994, 42.538468481524504],
  //     [43.24553984487869, 42.53715822242073],
  //     [43.24559523668942, 42.536581547482534],
  //     [43.245643275563836, 42.53610277317338],
  //     [43.24583445029832, 42.53590428970628],
  //     [43.24585111678498, 42.535877467616125],
  //     [43.245854057929215, 42.53583857558542],
  //     [43.245811901514905, 42.53487029813105],
  //     [43.24575307856211, 42.53424802563958],
  //     [43.24576484315725, 42.53418901704126],
  //     [43.24614719125346, 42.533494324906385],
  //     [43.24648836136029, 42.532861323578885],
  //     [43.246802079300366, 42.53205666087442],
  //     [43.246974623473804, 42.53158459208779],
  //     [43.24746088167795, 42.53091940425211],
  //     [43.24754715288648, 42.53067264102272],
  //     [43.24766479524526, 42.5302542164164],
  //     [43.24745303883471, 42.52967485926919],
  //     [43.24739813890354, 42.529395909531644],
  //     [43.2474059817539, 42.529170603974386],
  //     [43.24783733695755, 42.52837667010597],
  //     [43.24797850708331, 42.5275505497294],
  //   ],
  //   [],

  //   {
  //     // Задаем опции геообъекта.
  //     // Цвет с прозрачностью.
  //     strokeColor: "#010101",
  //     // Ширину линии.
  //     strokeWidth: 1,
  //     // Максимально допустимое количество вершин в ломаной.
  //     editorMaxPoints: 6,
  //     // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
  //     editorMenuManager: function (items) {
  //       items.push({
  //         title: "Удалить линию",
  //         onClick: function () {
  //           myMap.geoObjects.remove(myPolyline);
  //         },
  //       });
  //       return items;
  //     },
  //   }
  // );
  // var startPoint = new ymaps.Placemark(
  //   [43.247298523267474, 42.560450183484974],
  //   {
  //     hintContent: "Начало экотропы",

  //  // Тут контент карточки тропы
  //     balloonContent: `Начало маршрута Поляна нарзанов чегет`,
  //   },
  //   {
  //     iconLayout: "default#image",
  //     iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
  //     iconImageSize: [32, 51],
  //     iconImageOffset: [-10, -45],
  //   }
  // );

  // var endPoint = new ymaps.Placemark(
  //   [43.24797850708331, 42.5275505497294],
  //   {
  //     hintContent: "Конец экотропы",
  //     ////balloonContent: "Это Конец экотропы",
  //   },
  //   {
  //     iconLayout: "default#image",
  //     iconImageHref: "2",
  //     iconImageSize: [15, 15],
  //     iconImageOffset: [0, 0],
  //   }
  // );
  // // Добавляем линию на карту.
  // myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

  // Юкковские камы
  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.

      [60.1116586603053, 30.2993484452377],
      [60.1119478424063, 30.2996703103195],
      [60.1123441248509, 30.3006144478927],
      [60.112901054253, 30.3018589928756],
      [60.1132009354013, 30.3029962494979],
      [60.1135972027159, 30.3047128632675],
      [60.1142290785269, 30.3054424241195],
      [60.1146360429529, 30.3063865616928],
      [60.1150644210981, 30.3067513421188],
      [60.1156641411199, 30.3068157151352],
      [60.1158033602717, 30.3078885987411],
      [60.115942578833, 30.3086396172653],
      [60.1161995961636, 30.3092618897567],
      [60.1164994471718, 30.3103562310348],
      [60.1169813448287, 30.3113432839522],
      [60.1170455973161, 30.3115364030013],
      [60.1168528394764, 30.3129311516891],
      [60.1165101560767, 30.3125234559188],
      [60.1154285381237, 30.3118582680831],
      [60.11508583985, 30.3120728448043],
      [60.1146360429349, 30.3116436913619],
      [60.1143468845196, 30.3111930802474],
      [60.1139077872393, 30.3113861992965],
      [60.1137043011417, 30.3114505723128],
      [60.113747140425, 30.3120513871322],
      [60.1136507519589, 30.3127809479842],
      [60.1137257207904, 30.3135963395247],
      [60.1136293322614, 30.3143902733932],
      [60.1137899796524, 30.3152914956221],
      [60.1140363041246, 30.3160854294906],
      [60.1140041749414, 30.3166004136214],
      [60.1140363041156, 30.317244143785],
      [60.1140684332583, 30.3177376702437],
      [60.1143468845106, 30.318703265489],
      [60.114453980508, 30.319046588243],
      [60.1145932047939, 30.3199907258162],
      [60.1148930704804, 30.3204198792586],
      [60.1156962686418, 30.3200980141768],
      [60.1159747060824, 30.3187247231612],
      [60.1160817967766, 30.3176732972273],
      [60.1163923578135, 30.3168793633589],
      [60.1167136247589, 30.3151842072615],
      [60.1168314218507, 30.3146048501143],
      [60.1170134710701, 30.3139396622786],
      [60.1172490626783, 30.3129955247054],
      [60.1189945296203, 30.3128667786727],
      [60.1213288126863, 30.3126092866072],
      [60.1213073979911, 30.3078027680525],
      [60.1219391253571, 30.3077813103804],
      [60.1237592887242, 30.3074809029707],
      [60.1240162448308, 30.3073306992658],
      [60.1253224072534, 30.3070732072004],
      [60.1258684105566, 30.3070732072004],
      [60.1261681732116, 30.3078456833967],
      [60.1259647631373, 30.3072448685774],
      [60.1257399400088, 30.3070302918562],
      [60.1248299258904, 30.3071375802168],
      [60.1241982541886, 30.3073092415937],
      [60.1235344504798, 30.3075238183149],
      [60.1223776668434, 30.3077038918651],
      [60.1207822854586, 30.3079184685863],
      [60.1207715779118, 30.3072318230784],
      [60.1208251154754, 30.3064808045543],
      [60.1209750201886, 30.3059229050792],
      [60.1210178499808, 30.305171886555],
      [60.1209214828696, 30.3045925294078],
      [60.1208037004605, 30.3040346299327],
      [60.1206323798378, 30.3034552727855],
      [60.1206002571215, 30.3027471696055],
      [60.1204182278014, 30.3022321854747],
      [60.1201077048659, 30.301566997639],
      [60.1196579767834, 30.3013524209178],
      [60.1193046146797, 30.3013095055736],
      [60.1188548755894, 30.3016099129832],
      [60.1185550461044, 30.3021892701304],
      [60.118469380025, 30.3028759156382],
      [60.118383713731, 30.3037556801951],
      [60.1183408805001, 30.3047212754404],
      [60.1183087555403, 30.3056868706858],
      [60.1183194638637, 30.3066953812754],
      [60.1184800882961, 30.3073820267832],
      [60.1189619568753, 30.307875553242],
      [60.1194224024524, 30.308240333668],
      [60.1209536052534, 30.307875553242],
      [60.121403315577, 30.3078326378977],
      [60.1213176569429, 30.3079828416026],
      [60.1213283642844, 30.3124031220591],
      [60.1212319980853, 30.3125747834361],
      [60.1193474466345, 30.3128322755015],
      [60.1183730054195, 30.3128966485178],
      [60.1177626264016, 30.3129395638621],
      [60.117377118014, 30.3129610215342],
      [60.116948770049, 30.3129610215342],
      [60.116905934945, 30.3126391564524],
      [60.1170344400893, 30.3117808495677],
      [60.116948770049, 30.3111371194041],
      [60.1165846698824, 30.3104719315684],
      [60.1162955286279, 30.3094848786509],
      [60.1159100030041, 30.3084549103891],
      [60.1157922026045, 30.3075751458323],
      [60.1157065293211, 30.306995788685],
      [60.1158029117492, 30.3067168389475],
      [60.1164240361626, 30.3063735161936],
      [60.1170772750166, 30.305901447407],
      [60.1174520783149, 30.3059872780954],
      [60.1176555411657, 30.3065880929148],
      [60.1177840433744, 30.3071459923899],
      [60.1182016720775, 30.3076395188486],
      [60.1185550460593, 30.3079399262583],
      [60.1187692102567, 30.3082188759959],
      [60.119111870065, 30.3079613839304],
      [60.1185657543024, 30.3074463997995],
      [60.1182337971422, 30.3069528733408],
      [60.1181695469814, 30.3063520585215],
      [60.1180731715043, 30.3052577172434],
      [60.1178375858129, 30.304828563801],
      [60.1158025458199, 30.3050233645285],
      [60.1155026884437, 30.3037573618735],
      [60.1149779314423, 30.3026201052512],
      [60.1145923903391, 30.3021265787924],
      [60.1145067139232, 30.30169742535],
      [60.1145709712561, 30.3011824412192],
      [60.1144638756315, 30.300431422695],
      [60.1146459379854, 30.2992941660727],
      [60.1147101950456, 30.2985002322043],
      [60.1143460700407, 30.2968694491233],
      [60.1142818122404, 30.2967997116889],
      [60.114131876947, 30.2967460675086],
      [60.1137168739021, 30.2967621607627],
      [60.1135267739807, 30.296826533779],
      [60.1132697356982, 30.2972395939673],
      [60.113106408255, 30.2975721878851],
      [60.112932369921, 30.2977223915899],
      [60.1127690407988, 30.2976043743933],
      [60.1126083884104, 30.2975829167212],
      [60.1124370249868, 30.2977974934424],
      [60.112345987809, 30.2978082222784],
      [60.112201398831, 30.2977062983359],
      [60.1121826557687, 30.297920875057],
      [60.1119684485822, 30.2984412236059],
      [60.1118292131522, 30.2988006396139],
      [60.1116819442758, 30.2991868777121],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );
  var startPoint = new ymaps.Placemark(
    [60.1116586603053, 30.2993484452377],
    {
      hintContent: "Экотропа Юкковские камы",

      // Тут контент карточки тропы
      balloonContent: `<a href="lenoblast/yukkovskie-kamy/"><figure id="Yukki" class="catalog-item">
    <img src="lenoblast/yukkovskie-kamy/img/for-slider.jpg" alt="Экотропа Юкковские камы" class="trail-img">
    <figcaption class="trail-info">
        <a href="lenoblast/yukkovskie-kamy/" class="trail-title-link">
            <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
                title="Экотропа Юкковские камы">Юкковские камы
            </h2>
        </a>
        <a href="lenoblast/yukkovskie-kamy/" id="trail-location" class="trail-location-black"
            title="Ленинградская область, п. Юкки">
            <p id="color-letters-cot" class="black-color size-card-elem-p">
                Ленинградская область, п.&nbsp;Юкки</p>
        </a>
        <div class="trail-spec">
            <a href="lenoblast/yukkovskie-kamy/" class="trail-distance">
                <div class="img-card-color">
                    <img src="/img/dist-orange.svg" alt="Длина тропы">
                </div>
                <p id="color-letters-cot" class="black-color">8,5 км</p>
            </a>
            <a href="lenoblast/yukkovskie-kamy/" class="trail-difficulty">
                <div id="medium" class="img-card-color">
                    <img src="/img/difficulty-medium.svg" alt="Сложность тропы">
                </div>
                <p id="color-letters-cot" class="black-color">Средняя</p>
            </a>
            <a href="lenoblast/yukkovskie-kamy/" class="trail-duration">
                <div class="img-card-color">
                    <img src="/img/duration-orange.svg" alt="Длительность тропы">
                </div>
                <p id="color-letters-cot" class="black-color">~3 ч</p>
            </a>
        </div>
    </figcaption>
</figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [60.1116819442758, 30.2991868777121],
    {
      hintContent: "Конец экотропы",
      ////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );
  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

  // Экотропа Фиалка

  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      [43.61821772905557, 40.316277187145694],
      [43.618061836779916, 40.31638983992432],
      [43.617894252129624, 40.316518585957034],
      [43.61753569734458, 40.31707112101408],
      [43.61712647457847, 40.31765047816131],
      [43.616771812579216, 40.31803671625944],
      [43.61666658278959, 40.31819228438231],
      [43.61662371134066, 40.318283479488834],
      [43.61644443040248, 40.318916480816334],
      [43.616105354112875, 40.31984452513549],
      [43.61595725122129, 40.32011274603698],
      [43.61590658435827, 40.32014493254517],
      [43.61561427469361, 40.3201717546353],
      [43.6154817605076, 40.32024685648772],
      [43.6153960158776, 40.320311229504085],
      [43.615341451048934, 40.320407789028614],
      [43.61508421618512, 40.32185081747863],
      [43.61497898342144, 40.32201711443755],
      [43.61453856280573, 40.32235507277344],
      [43.614331992725326, 40.32263402251099],
      [43.61423455376013, 40.322993438518964],
      [43.614242348883195, 40.323385041035145],
      [43.61428132448326, 40.323814194477535],
      [43.61433589028062, 40.324152152813404],
      [43.614355378053325, 40.32441500929688],
      [43.61428522204188, 40.325450341976605],
      [43.61421506594801, 40.326035063541866],
      [43.61417219273896, 40.32697383669707],
      [43.61406695836808, 40.327569287098385],
      [43.61389546492187, 40.32803062704896],
      [43.61372007338794, 40.32837394980285],
      [43.613353698299576, 40.32888356951569],
      [43.61289377745361, 40.32964531687592],
      [43.61268330402069, 40.33018712309692],
      [43.612570271685755, 40.3304714372525],
      [43.6123636947967, 40.3308684041867],
      [43.61223507108971, 40.33117954043244],
      [43.61232471794505, 40.33123318461273],
      [43.612472829846, 40.33118490485047],
      [43.61263653204599, 40.33104542998168],
      [43.61276125723048, 40.33105615881775],
      [43.612983423320145, 40.331029336727596],
      [43.61324456486005, 40.3309381416211],
      [43.61326015536362, 40.33100787905546],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );
  var startPoint = new ymaps.Placemark(
    [43.61821772905557, 40.316277187145694],
    {
      hintContent: "Экотропа Фиалка",
      balloonContent: `<a href="krasnodarsky-krai/ecotropa-fialka/"><figure id="Fialka" class="catalog-item">
      <img src="krasnodarsky-krai/ecotropa-fialka/img/for-slider.jpg" alt="Экотропа Фиалка" class="trail-img">
      <figcaption class="trail-info">
          <a href="krasnodarsky-krai/ecotropa-fialka/" class="trail-title-link">
              <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
                  title="Экотропа Фиалка">Экотропа Фиалка
              </h2>
          </a>
          <a href="krasnodarsky-krai/ecotropa-fialka/" id="trail-location" class="trail-location-black"
              title="Краснодарский край, г.о. Сочи, Роза Хутор">
              <p id="color-letters-cot" class="black-color size-card-elem-p">
                  Краснодарский край, г.о.&nbsp;Сочи, Роза Хутор</p>
          </a>
          <div class="trail-spec">
              <a href="krasnodarsky-krai/ecotropa-fialka/" class="trail-distance">
                  <div class="img-card-color">
                      <img src="/img/dist-orange.svg" alt="Длина тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">1,7 км</p>
              </a>
              <a href="krasnodarsky-krai/ecotropa-fialka/" class="trail-difficulty">
                  <div id="hard" class="img-card-color">
                      <img src="/img/difficulty-hard.svg" alt="Сложность тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">Сложная</p>
              </a>
              <a href="krasnodarsky-krai/ecotropa-fialka/" class="trail-duration">
                  <div class="img-card-color">
                      <img src="/img/duration-orange.svg" alt="Длительность тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">~1 ч</p>
              </a>
          </div>
      </figcaption>
  </figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [43.61326015536362, 40.33100787905546],
    {
      hintContent: "Конец экотропы",
      // ////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );
  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

  // Экотропа Горизонт

  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      [43.6248328289864, 40.3099218244671],
      [43.6234221453811, 40.3109303350567],
      [43.6228453922071, 40.3111770982861],
      [43.6227051000519, 40.3112843866467],
      [43.6225648075671, 40.31152042104],
      [43.6224089266417, 40.3119495744824],
      [43.6224089266417, 40.3119495744824],
      [43.622158571764, 40.3125396604657],
      [43.6219637192178, 40.3128078813671],
      [43.6217688660356, 40.312958085072],
      [43.6215740122174, 40.313140475285],
      [43.6213713635718, 40.3132155771374],
      [43.6211453315788, 40.3132692213177],
      [43.6208257676456, 40.3132799501538],
      [43.620560762111, 40.3132263059735],
      [43.620004492656, 40.3128014335629],
      [43.619778455488, 40.3126941452023],
      [43.6196459505433, 40.3127048740384],
      [43.6194776582661, 40.3128843839226],
      [43.6193139748201, 40.313141875988],
      [43.6191814688446, 40.3135066564141],
      [43.6190326342419, 40.3141281417894],
      [43.6189937456495, 40.3144378398076],
      [43.618965202545, 40.3147586737101],
      [43.6189340245128, 40.3149625215952],
      [43.6188482848401, 40.3153058443491],
      [43.6187391614423, 40.3155740652506],
      [43.6186144487435, 40.3158208284799],
      [43.6184039954735, 40.3160890493814],
      [43.6182870766697, 40.3162392530863],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );
  var startPoint = new ymaps.Placemark(
    [43.6248328289864, 40.3099218244671],
    {
      hintContent: "Экотропа Горизонт",
      balloonContent: `<a href="krasnodarsky-krai/ecotropa-gorizont/"><figure id="Gorizont" class="catalog-item">
      <img src="krasnodarsky-krai/ecotropa-gorizont/img/for-slider.jpg" alt="Экотропа Горизонт" class="trail-img">
      <figcaption class="trail-info">
          <a href="krasnodarsky-krai/ecotropa-gorizont/" class="trail-title-link">
              <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
                  title="Экотропа Горизонт">Экотропа Горизонт
              </h2>
          </a>
          <a href="krasnodarsky-krai/ecotropa-gorizont/" id="trail-location" class="trail-location-black"
              title="Краснодарский край, г.о. Сочи, Роза Хутор">
              <p id="color-letters-cot" class="black-color size-card-elem-p">
                  Краснодарский край, г.о.&nbsp;Сочи, Роза Хутор</p>
          </a>
          <div class="trail-spec">
              <a href="krasnodarsky-krai/ecotropa-gorizont/" class="trail-distance">
                  <div class="img-card-color">
                      <img src="/img/dist-orange.svg" alt="Длина тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">1,2 км</p>
              </a>
              <a href="krasnodarsky-krai/ecotropa-gorizont/" class="trail-difficulty">
                  <div id="easy" class="img-card-color">
                      <img src="/img/difficulty-easy.svg" alt="Сложность тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">Простая</p>
              </a>
              <a href="krasnodarsky-krai/ecotropa-gorizont/" class="trail-duration">
                  <div class="img-card-color">
                      <img src="/img/duration-orange.svg" alt="Длительность тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">~0,5 ч</p>
              </a>
          </div>
      </figcaption>
  </figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [43.6182870766697, 40.3162392530863],
    {
      hintContent: "Конец экотропы",
      // ////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );
  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

  // Экотропа у озера бездонное (Сер. бор)

  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      [55.7796049326206, 37.4307850640327],
      [55.7795610953303, 37.4307555597335],
      [55.7788635057132, 37.4305753874487],
      [55.7784634082469, 37.430478449103],
      [55.7781610722059, 37.4303979828326],
      [55.778109674832, 37.4303684785334],
      [55.778015194211, 37.430214251515],
      [55.7779698434312, 37.4300586833922],
      [55.7779517031044, 37.4299554183451],
      [55.7779305393791, 37.4299165263144],
      [55.7778999933322, 37.4298825232208],
      [55.7777745223393, 37.4298020569503],
      [55.7775771957474, 37.4297112645741],
      [55.7773738703759, 37.4296911480065],
      [55.7772453742322, 37.4296723725433],
      [55.7770352443315, 37.4296589614982],
      [55.7770420471157, 37.4294645013446],
      [55.7768763302522, 37.4294035439188],
      [55.7767576587835, 37.4293726985152],
      [55.7765263617446, 37.4298420850927],
      [55.7764583329451, 37.4300003354246],
      [55.7764008863104, 37.4301559035475],
      [55.7763933275363, 37.4302256409819],
      [55.7764114685916, 37.4302900139982],
      [55.7764915914842, 37.4304911796743],
      [55.7765989256597, 37.4305984680349],
      [55.7767077712873, 37.4307164852316],
      [55.7768135931326, 37.4308210913832],
      [55.7768922034595, 37.4309149686987],
      [55.7769829074849, 37.4310249392683],
      [55.7770070951892, 37.4310571257765],
      [55.7770902403015, 37.4312690202886],
      [55.7772051314449, 37.4313709442312],
      [55.777239901066, 37.4313548509772],
      [55.7772701354938, 37.4312958423788],
      [55.7773094402147, 37.4312073294813],
      [55.7773290925602, 37.4311858718092],
      [55.7774077018428, 37.4311831896002],
      [55.7774288658533, 37.4311992828543],
      [55.7774439829965, 37.4312663380796],
      [55.7774711938395, 37.4317008559401],
      [55.7775437559878, 37.4319342081244],
      [55.777635970197, 37.4322158400709],
      [55.7777599299235, 37.432588667124],
      [55.7778748190842, 37.4328568880254],
      [55.7779897079048, 37.4330070917303],
      [55.7780562223296, 37.4331036512548],
      [55.7780985496316, 37.4334469740087],
      [55.7780804093649, 37.4336615507299],
      [55.7781711106131, 37.4339297716314],
      [55.778225531254, 37.4340585176641],
      [55.7783071620816, 37.4340638820821],
      [55.7783373956716, 37.4339673225576],
      [55.7783253022359, 37.4336937372381],
      [55.7782859985439, 37.4332216684515],
      [55.7786911665584, 37.4324964578287],
      [55.7788000063177, 37.4324052627222],
      [55.7788846592527, 37.4322872455255],
      [55.7790297781403, 37.4319922025339],
      [55.7793109444344, 37.4314503963129],
      [55.7793925729787, 37.4312358195917],
      [55.7794439686408, 37.4310587937967],
      [55.7794772246211, 37.430935412182],
      [55.7795890854367, 37.4308173949853],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );
  var startPoint = new ymaps.Placemark(
    [55.7796049326206, 37.4307850640327],
    {
      hintContent: "Экотропа У озера Бездонное",
      balloonContent: `<a href="moskva/ecotropa-u-ozera-bezdonnoe/"><figure id="Bezdonnoe" class="catalog-item">
      <img src="moskva/ecotropa-u-ozera-bezdonnoe/img/for-slider.jpg" alt="Экотропа у озера Бездонное" class="trail-img">
      <figcaption class="trail-info">
          <a href="moskva/ecotropa-u-ozera-bezdonnoe/" class="trail-title-link">
              <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
                  title="Экотропа У озера Бездонное">У озера Бездонное
              </h2>
          </a>
          <a href="moskva/ecotropa-u-ozera-bezdonnoe/" id="trail-location" class="trail-location-black"
              title="Москва, парк Серебряный Бор">
              <p id="color-letters-cot" class="black-color size-card-elem-p">
                г. Москва, парк &laquo;Серебряный Бор&raquo;</p>
          </a>
          <div class="trail-spec">
              <a href="moskva/ecotropa-u-ozera-bezdonnoe/" class="trail-distance">
                  <div class="img-card-color">
                      <img src="/img/dist-orange.svg" alt="Длина тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">1,2 км</p>
              </a>
              <a href="moskva/ecotropa-u-ozera-bezdonnoe/" class="trail-difficulty">
                  <div id="easy" class="img-card-color">
                      <img src="/img/difficulty-easy.svg" alt="Сложность тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">Простая</p>
              </a>
              <a href="moskva/ecotropa-u-ozera-bezdonnoe/" class="trail-duration">
                  <div class="img-card-color">
                      <img src="/img/duration-orange.svg" alt="Длительность тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">~0,5 ч</p>
              </a>
          </div>
      </figcaption>
  </figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [55.7795890854367, 37.4308173949853],
    {
      hintContent: "Конец экотропы",
      // ////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );
  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

  // Экотропа Крокус

  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
      [43.6181673425846, 40.31620666292],
      [43.6180942326691, 40.3162022572076],
      [43.6179724416116, 40.3162357848203],
      [43.617877008233, 40.3162837272592],
      [43.6177737290565, 40.3163628524251],
      [43.6177103974208, 40.3164124732919],
      [43.6176012719433, 40.3165358549066],
      [43.6175174790538, 40.3166297322221],
      [43.6174707108653, 40.3166860586114],
      [43.6173226113602, 40.3168255334802],
      [43.6171511272869, 40.3169623261399],
      [43.6171257943673, 40.3169743960805],
      [43.6170624620212, 40.3170106059022],
      [43.6169864631173, 40.3170481568284],
      [43.6169513866905, 40.3170588856645],
      [43.6168900028537, 40.3170669322915],
      [43.6166395951658, 40.3170629089779],
      [43.6165246216132, 40.3171178942627],
      [43.6164456989847, 40.3171997016377],
      [43.6163911351153, 40.317264074654],
      [43.6159195453316, 40.3180258220143],
      [43.6156925183553, 40.3182712441391],
      [43.6155648762099, 40.3183664625591],
      [43.6154430799932, 40.3183892613357],
      [43.6153105654504, 40.318353051514],
      [43.6148847630258, 40.318083489508],
      [43.6145524986, 40.317830020756],
      [43.6143888016752, 40.3177026158279],
      [43.6142923371922, 40.3176503127521],
      [43.6141948981623, 40.3176301961845],
      [43.6140789455327, 40.3176650649017],
      [43.6139688390238, 40.3177254146045],
      [43.6137934477284, 40.3179842477744],
      [43.613580054263, 40.318374509186],
      [43.6134338939383, 40.3186454122965],
      [43.6131766508805, 40.3189806884234],
      [43.6129749481441, 40.3192194050257],
      [43.6128979696487, 40.319275731415],
      [43.6128414537111, 40.3192931657736],
      [43.612765449458, 40.3193106001321],
    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 2,
      // Максимально допустимое количество вершин в ломаной.
      editorMaxPoints: 6,
      // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
      editorMenuManager: function (items) {
        items.push({
          title: "Удалить линию",
          onClick: function () {
            myMap.geoObjects.remove(myPolyline);
          },
        });
        return items;
      },
    }
  );
  var startPoint = new ymaps.Placemark(
    [43.6181673425846, 40.31620666292],
    {
      hintContent: "Экотропа Крокус",
      balloonContent: `<a href="krasnodarsky-krai/ecotropa-krokus/"><figure id="Krokus" class="catalog-item">
      <img src="krasnodarsky-krai/ecotropa-krokus/img/for-slider.jpg" alt="Экотропа Крокус" class="trail-img">
      <figcaption class="trail-info">
          <a href="krasnodarsky-krai/ecotropa-krokus/" class="trail-title-link">
              <h2 id="color-letters-cot" class="black-color size-card-elem-h2"
                  title="Экотропа Крокус">Экотропа Крокус
              </h2>
          </a>
          <a href="krasnodarsky-krai/ecotropa-krokus/" id="trail-location" class="trail-location-black"
              title="Краснодарский край, г.о. Сочи, Роза Хутор">
              <p id="color-letters-cot" class="black-color size-card-elem-p">
                  Краснодарский край, г.о.&nbsp;Сочи, Роза Хутор</p>
          </a>
          <div class="trail-spec">
              <a href="krasnodarsky-krai/ecotropa-krokus/" class="trail-distance">
                  <div class="img-card-color">
                      <img src="/img/dist-orange.svg" alt="Длина тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">0,8 км</p>
              </a>
              <a href="krasnodarsky-krai/ecotropa-krokus/" class="trail-difficulty">
                  <div id="easy" class="img-card-color">
                      <img src="/img/difficulty-easy.svg" alt="Сложность тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">Простая</p>
              </a>
              <a href="krasnodarsky-krai/ecotropa-krokus/" class="trail-duration">
                  <div class="img-card-color">
                      <img src="/img/duration-orange.svg" alt="Длительность тропы">
                  </div>
                  <p id="color-letters-cot" class="black-color">~0,5 ч</p>
              </a>
          </div>
      </figcaption>
  </figure></a>`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [43.612765449458, 40.3193106001321],
    {
      hintContent: "Конец экотропы",
      // ////balloonContent: "Это Конец экотропы",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "2",
      iconImageSize: [15, 15],
      iconImageOffset: [0, 0],
    }
  );
  // Добавляем линию на карту.
  myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

  // Абрау Дюрсо (Путь к дому Виноградаря)

  // var myPolyline = new ymaps.Polyline(
  //   [
  //     // Указываем координаты вершин.

  //     [44.706555430968244, 37.5953947629349],
  //     [44.70659751225418, 37.59549668687748],
  //     [44.70656690768564, 37.59567371267245],
  //     [44.70668550029795, 37.595931204737894],
  //     [44.70675053485245, 37.59599557775424],
  //     [44.706903557043496, 37.59601703542637],
  //     [44.70776047378694, 37.596800240458705],
  //     [44.707967050019874, 37.59705236810613],
  //     [44.708464360128886, 37.597476157130465],
  //     [44.70885455427961, 37.59789994615483],
  //     [44.709091913547574, 37.597876467614796],
  //     [44.71064500662315, 37.59768334856572],
  //     [44.71230516316823, 37.59749022951664],
  //     [44.71282538668961, 37.59758678904119],
  //     [44.71294779153983, 37.59755460253301],
  //     [44.713070196129415, 37.59758678904119],
  //     [44.71307784640762, 37.59795156946721],
  //     [44.712595876892884, 37.59813395968021],
  //     [44.71225161047964, 37.59836999407353],
  //     [44.71178493493886, 37.59861675730289],
  //     [44.71149421711304, 37.59876696100773],
  //     [44.71131825560949, 37.598820605188024],
  //     [44.71127235251998, 37.599110283761625],
  //     [44.7122363097023, 37.59876696100773],
  //     [44.71289423944994, 37.598573841958654],
  //     [44.713621013557, 37.59791938295903],
  //     [44.7137510669016, 37.59795156946721],
  //     [44.71388111995195, 37.59941069117131],
  //     [44.71343740833426, 37.599496521859784],
  //     [44.71240461802898, 37.59989348879399],
  //     [44.7100176538802, 37.601470627694745],
  //     [44.70965813263465, 37.60167037042746],
  //     [44.709474514754305, 37.6017132857717],
  //     [44.709237340790835, 37.60193859132894],
  //     [44.70926029315265, 37.60219608339438],
  //     [44.70971168773929, 37.603301153508504],
  //     [44.70978819494509, 37.60349427255758],
  //     [44.70992590765893, 37.60370884927877],
  //     [44.710174754565855, 37.60391804039088],
  //     [44.71106987529021, 37.605473721619525],
  //     [44.71104692365087, 37.605913603897974],
  //     [44.711299391179615, 37.606879199143336],
  //     [44.711467702249436, 37.60748001396267],
  //     [44.711467702249436, 37.607780421372325],
  //     [44.7115748090373, 37.60843488037196],
  //     [44.71094746644117, 37.60940047561732],
  //     [44.7108327079085, 37.60947557746974],
  //     [44.71098571923451, 37.60902496635524],
  //     [44.7108327079085, 37.608842576142244],
  //     [44.71051903341696, 37.608509982224376],
  //     [44.71022065853179, 37.60771604835599],
  //     [44.71063379257581, 37.60728689491359],
  //     [44.70911130242769, 37.60338159858791],
  //     [44.70881292023617, 37.60287734329312],
  //     [44.708537489146394, 37.60257693588344],
  //     [44.70754286589175, 37.60199757873623],
  //     [44.707458704672916, 37.60177227317897],
  //     [44.70799427396294, 37.60111781417935],
  //     [44.70817789657103, 37.60082813560574],
  //     [44.70896593693809, 37.600431168671534],
  //     [44.709409683070575, 37.60014149009793],
  //     [44.709409683070575, 37.59951921760646],
  //     [44.70934847691111, 37.599197352524676],
  //     [44.70924136597523, 37.5989291316232],
  //     [44.709073048387125, 37.59861799537747],
  //     [44.70893533363029, 37.59825321495144],
  //     [44.708845436319415, 37.59789111673443],
  //   ],
  //   [],

  //   {
  //     // Задаем опции геообъекта.
  //     // Цвет с прозрачностью.
  //     strokeColor: "#010101",
  //     // Ширину линии.
  //     strokeWidth: 1,
  //     // Максимально допустимое количество вершин в ломаной.
  //     editorMaxPoints: 6,
  //     // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
  //     editorMenuManager: function (items) {
  //       items.push({
  //         title: "Удалить линию",
  //         onClick: function () {
  //           myMap.geoObjects.remove(myPolyline);
  //         },
  //       });
  //       return items;
  //     },
  //   }
  // );
  // var startPoint = new ymaps.Placemark(
  //   [44.706555430968244, 37.5953947629349],
  //   {
  //     hintContent: "Начало экотропы",

  //  // Тут контент карточки тропы
  //     balloonContent: `Начало маршрута Абрау Дюрсо (Путь к дому Виноградаря)`,
  //   },
  //   {
  //     iconLayout: "default#image",
  //     iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
  //     iconImageSize: [32, 51],
  //     iconImageOffset: [-10, -45],
  //   }
  // );

  // var endPoint = new ymaps.Placemark(
  //   [44.706555430968244, 37.5953947629349],
  //   {
  //     hintContent: "Конец экотропы",
  //     //////balloonContent: "Это Конец экотропы",
  //   },
  //   {
  //     iconLayout: "default#image",
  //     iconImageHref: "2",
  //     iconImageSize: [15, 15],
  //     iconImageOffset: [0, 0],
  //   }
  // );
  // // Добавляем линию на карту.
  // myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

  // Абрау Дюрсо (ВИНОГРАДНЫЙ ТЕРРУАР)
  //   var myPolyline = new ymaps.Polyline(
  //      [
  //       // Указываем координаты вершин.

  //       [44.70654439987693, 37.59539666235058],
  //       [44.706586481170945, 37.59547712862103],
  //       [44.706567353313844, 37.59571316301434],
  //       [44.706731852676874, 37.59598674833384],
  //       [44.70688487491763, 37.59600820600597],
  //       [44.70733246263397, 37.596372986431994],
  //       [44.707627027007675, 37.59669485151378],
  //       [44.70781065078869, 37.59685041963665],
  //       [44.7079636701582, 37.59705426752178],
  //       [44.70847245663348, 37.597483420964174],
  //       [44.70885117447012, 37.59790184557048],
  //       [44.70924035253317, 37.59786965422147],
  //       [44.70969939800421, 37.59779455236905],
  //       [44.710097234447524, 37.59774090818873],
  //       [44.71070928513827, 37.597655077500264],
  //       [44.71235413908107, 37.59749414495937],
  //       [44.712820810000906, 37.59756924681179],
  //       [44.713073269739006, 37.59756924681179],
  //       [44.7130656194602, 37.59791256956571],
  //       [44.712560698808005, 37.59817006163113],
  //       [44.711634999426614, 37.59869577459804],
  //       [44.71132132931275, 37.598813791794704],
  //       [44.71126012518853, 37.59911419920436],
  //       [44.71213992820989, 37.59878160528652],
  //       [44.71288201246348, 37.59858848623744],
  //       [44.71362408713714, 37.59791256956571],
  //       [44.71376347729037, 37.59792833702089],
  //       [44.71388588014301, 37.59940891639709],
  //       [44.71376347729037, 37.59941964523317],
  //       [44.71376347729037, 37.59955912010193],
  //       [44.71367167497984, 37.59975223915101],
  //       [44.71351867080314, 37.59990244285585],
  //       [44.71332741500956, 37.60000973121643],
  //       [44.71243232943767, 37.60069637672424],
  //       [44.71180499619972, 37.60116844551087],
  //       [44.71165963752132, 37.60125427619934],
  //       [44.71155253089151, 37.60129719154358],
  //       [44.71131536550104, 37.601554683609024],
  //       [44.71104759694874, 37.60200529472352],
  //       [44.71091753748758, 37.602284244461075],
  //       [44.710894585787436, 37.602477363510125],
  //       [44.71098639253309, 37.60256319419862],
  //       [44.71121590875579, 37.60254173652649],
  //       [44.71146837554238, 37.60245590583802],
  //       [44.71195035451058, 37.60216622726441],
  //       [44.71229462272799, 37.601994565887445],
  //       [44.71306730610907, 37.60190873519897],
  //       [44.713702275766316, 37.60183363334657],
  //       [44.71453614092717, 37.60179071800231],
  //       [44.7149109938013, 37.60206966773986],
  //       [44.715239944309545, 37.602144769592286],
  //       [44.71553829314247, 37.602327159805306],
  //       [44.715675992081515, 37.60239153282165],
  //       [44.71572135070453, 37.602252644117485],
  //       [44.715981447595176, 37.60185567718328],
  //       [44.71624154330881, 37.601544540937546],
  //       [44.71637159072426, 37.601437252576964],
  //       [44.716532237125314, 37.60111538749518],
  //       [44.71666228388303, 37.60094372611821],
  //       [44.71740430975347, 37.600578945692185],
  //       [44.71781739216946, 37.60040728431524],
  //       [44.717947436019294, 37.60034291129887],
  //       [44.71790918785871, 37.600546759184],
  //       [44.71826871956324, 37.60045019965947],
  //       [44.71858235176662, 37.6004716573316],
  //       [44.71891893076381, 37.600868624265786],
  //       [44.719385548385624, 37.60146943908512],
  //       [44.71981391532588, 37.602016609724174],
  //       [44.720020448245506, 37.60237066131415],
  //       [44.720471758338654, 37.602789085920456],
  //       [44.72124433179674, 37.60369030814945],
  //       [44.721710930537725, 37.60410873275579],
  //       [44.722322857570305, 37.604806107099655],
  //       [44.72279709653863, 37.60529963355839],
  //       [44.723171895535, 37.605675142820495],
  //       [44.72395208152331, 37.6067051110822],
  //       [44.724535275076676, 37.60708343964995],
  //       [44.72470354738925, 37.60721218568266],
  //       [44.72514717203299, 37.60738384705963],
  //       [44.725797305409216, 37.60772716981352],
  //       [44.72640154042203, 37.60772716981352],
  //       [44.72680193290495, 37.607639570785096],
  //       [44.728148044502554, 37.60726406152302],
  //       [44.728645180015555, 37.60712458665423],
  //       [44.72947882837438, 37.60680272157244],
  //       [44.730006544477455, 37.60736062104755],
  //       [44.73012126472796, 37.60746790940815],
  //       [44.73032776060162, 37.60813309724383],
  //       [44.73119197601914, 37.6084656911617],
  //       [44.7303354085827, 37.61302544648701],
  //       [44.72863753180946, 37.61447383935505],
  //       [44.72547873565454, 37.61304690415911],
  //       [44.72349770708833, 37.612059851241646],
  //       [44.720772089531906, 37.61235890006834],
  //       [44.71855650482808, 37.61215446815418],
  //       [44.71655228817469, 37.612036450957525],
  //       [44.71596324938113, 37.61200426444934],
  //       [44.71487695421605, 37.61182187423634],
  //       [44.71365293506499, 37.61104939804006],
  //       [44.71326277348237, 37.6104807697289],
  //       [44.71223844805058, 37.61005136420371],
  //       [44.71244500819322, 37.60971877028587],
  //       [44.71237615489481, 37.60955783774498],
  //       [44.71208544005897, 37.60912868430259],
  //       [44.71169526783695, 37.607658833762436],
  //       [44.71146575352812, 37.60762664725426],
  //       [44.71146575352812, 37.60748717238549],
  //       [44.71128214142128, 37.6067683403695],
  //       [44.71106027600972, 37.605931491156845],
  //       [44.71106792655541, 37.60551306655053],
  //       [44.71014220313533, 37.60388228346947],
  //       [44.70984382629434, 37.603624791404044],
  //       [44.709690811929, 37.60327073981407],
  //       [44.70928532189125, 37.602240771552346],
  //       [44.709254718753456, 37.60195109297874],
  //       [44.70946894037587, 37.601704329749374],
  //       [44.70966785973908, 37.60167214324119],
  //       [44.71001979231099, 37.60146829535606],
  //       [44.70937713122716, 37.600170106192856],
  //       [44.70940773427949, 37.59965512206199],
  //       [44.70936948043616, 37.59926888396386],
  //       [44.7093082742339, 37.59908649375084],
  //       [44.709132306039386, 37.598732442160866],
  //       [44.70900606765501, 37.59844812800529],
  //       [44.70891425774683, 37.59820672919395],
  //       [44.70884731292966, 37.59789760460498],
  //      ],
  //      [],

  //      {
  //       // Задаем опции геообъекта.
  //       // Цвет с прозрачностью.
  //       strokeColor: "#010101",
  //       // Ширину линии.
  //       strokeWidth: 1,
  //       // Максимально допустимое количество вершин в ломаной.
  //       editorMaxPoints: 6,
  //       // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
  //       editorMenuManager: function (items) {
  //          items.push({
  //           title: "Удалить линию",
  //           onClick: function () {
  //              myMap.geoObjects.remove(myPolyline);
  //           },
  //          });
  //          return items;
  //       },
  //      }
  //   );
  //   var startPoint = new ymaps.Placemark(
  //      [44.70654439987693, 37.59539666235058],
  //      {
  //       hintContent: "Начало экотропы",

  //  // Тут контент карточки тропы
  //       balloonContent: `Начало маршрута Абрау Дюрсо(ВИНОГРАДНЫЙ ТЕРРУАР)`,
  //      },
  //      {
  //       iconLayout: "default#image",
  //       iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
  //       iconImageSize: [32, 51],
  //       iconImageOffset: [-10, -45],
  //      }
  //   );

  //   var endPoint = new ymaps.Placemark(
  //      [44.70654439987693, 37.59539666235058],
  //      {
  //       hintContent: "Конец экотропы",
  //       //////balloonContent: "Это Конец экотропы",
  //      },
  //      {
  //       iconLayout: "default#image",
  //       iconImageHref: "2",
  //       iconImageSize: [15, 15],
  //       iconImageOffset: [0, 0],
  //      }
  //   );
  //   // Добавляем линию на карту.
  //   myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

  //   // Добавляем линию на карту.
  //   myMap.geoObjects.add(myPolyline).add(startPoint).add(endPoint);

});

//Геолокация пользователя//
function init() {
  var geolocation = ymaps.geolocation,
    myMap = new ymaps.Map(
      "map",
      {
        center: [55, 34],
        zoom: 10,
      },
      {
        searchControlProvider: "yandex#search",
      }
    );

  // Сравним положение, вычисленное по ip пользователя и
  // положение, вычисленное средствами браузера.
  geolocation
    .get({
      provider: "yandex",
      mapStateAutoApply: true,
    })
    .then(function (result) {
      // Красным цветом пометим положение, вычисленное через ip.
      result.geoObjects.options.set("preset", "islands#redCircleIcon");
      result.geoObjects.get(0).properties.set({
        balloonContentBody: "Мое местоположение",
      });
      myMap.geoObjects.add(result.geoObjects);
    });

  geolocation
    .get({
      provider: "browser",
      mapStateAutoApply: true,
    })
    .then(function (result) {
      // Синим цветом пометим положение, полученное через браузер.
      // Если браузер не поддерживает эту функциональность, метка не будет добавлена на карту.
      result.geoObjects.options.set("preset", "islands#blueCircleIcon");
      myMap.geoObjects.add(result.geoObjects);
    });
}
