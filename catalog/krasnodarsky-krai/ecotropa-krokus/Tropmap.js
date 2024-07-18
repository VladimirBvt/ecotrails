ymaps.ready(function () {
  var myMap = new ymaps.Map("map", {
    zoom: 15,
    center: [43.6163911351153,40.317264074654],
    controls: [],
  });
  myMap.controls.add("geolocationControl", {
    float: "none",
    position: {
      top: "16px",
      left: "16px",
    },
  });
  myMap.controls.add("zoomControl", {
    float: "none",
    position: {
      top: "250px",
      right: "15px",
    },
  });
  myMap.controls.add("typeSelector", {
    float: "none",
    position: {
      top: "16px",
      left: "64px",
    },
  });
  // Каменный столб

  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
        [43.6181673425846,40.31620666292],
        [43.6180942326691,40.3162022572076],
        [43.6179724416116,40.3162357848203],
        [43.617877008233,40.3162837272592],
        [43.6177737290565,40.3163628524251],
        [43.6177103974208,40.3164124732919],
        [43.6176012719433,40.3165358549066],
        [43.6175174790538,40.3166297322221],
        [43.6174707108653,40.3166860586114],
        [43.6173226113602,40.3168255334802],
        [43.6171511272869,40.3169623261399],
        [43.6171257943673,40.3169743960805],
        [43.6170624620212,40.3170106059022],
        [43.6169864631173,40.3170481568284],
        [43.6169513866905,40.3170588856645],
        [43.6168900028537,40.3170669322915],
        [43.6166395951658,40.3170629089779],
        [43.6165246216132,40.3171178942627],
        [43.6164456989847,40.3171997016377],
        [43.6163911351153,40.317264074654],
        [43.6159195453316,40.3180258220143],
        [43.6156925183553,40.3182712441391],
        [43.6155648762099,40.3183664625591],
        [43.6154430799932,40.3183892613357],
        [43.6153105654504,40.318353051514],
        [43.6148847630258,40.318083489508],
        [43.6145524986,40.317830020756],
        [43.6143888016752,40.3177026158279],
        [43.6142923371922,40.3176503127521],
        [43.6141948981623,40.3176301961845],
        [43.6140789455327,40.3176650649017],
        [43.6139688390238,40.3177254146045],
        [43.6137934477284,40.3179842477744],
        [43.613580054263,40.318374509186],
        [43.6134338939383,40.3186454122965],
        [43.6131766508805,40.3189806884234],
        [43.6129749481441,40.3192194050257],
        [43.6128979696487,40.319275731415],
        [43.6128414537111,40.3192931657736],
        [43.612765449458,40.3193106001321],

    ],
    [],

    {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
         strokeColor: "#F28123",
      // Ширину линии.
      strokeWidth: 3,
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
    [43.6181673425846,40.31620666292],
    {
      hintContent: "Начало маршрута",
    //   balloonContent: `Начало маршрута Каменный столб `,
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
      hintContent: "Конец маршрута",
    //   balloonContent: "Это конец маршрута",
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
