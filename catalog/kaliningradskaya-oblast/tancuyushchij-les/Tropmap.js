ymaps.ready(function () {
  var myMap = new ymaps.Map("map", {
    zoom: 16,
    center: [55.181336, 20.862131],
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

  // Трэк

  // 1 часть
  var myPolyline1 = new ymaps.Polyline(
    [
      // Указываем координаты вершин.
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
      strokeWidth: 3,
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
      strokeWidth: 3,
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
      strokeWidth: 3,
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
      strokeWidth: 3,
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

  // Обозначение начала маршрута
  var startPoint = new ymaps.Placemark(
    [55.18261414, 20.85936698],
    {
      hintContent: "Начало экотропы",
      //   balloonContent: `Начало экотропы`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  // Обозначение конца маршрута
  // var endPoint = new ymaps.Placemark(
  //     [55.18261414, 20.85936698],
  //     {
  //         hintContent: "Конец экотропы",
  //         ////balloonContent: "Это конец экотропы",
  //     },
  //     {
  //         iconLayout: "default#image",
  //         iconImageHref: "2",
  //         iconImageSize: [15, 15],
  //         iconImageOffset: [0, 0],
  //     }
  // );

  // Добавляем линии на карту.
  // myMap.geoObjects.add(myPolyline1).add(myPolyline2).add(startPoint).add(endPoint);
  myMap.geoObjects.add(myPolyline1).add(myPolyline2).add(myPolyline3).add(myPolyline4).add(startPoint);

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
