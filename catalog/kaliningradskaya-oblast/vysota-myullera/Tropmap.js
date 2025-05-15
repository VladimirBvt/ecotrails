ymaps.ready(function () {
  var myMap = new ymaps.Map("map", {
    zoom: 16,
    center: [55.150338, 20.816313],
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
      [55.15083514, 20.82062991],
      [55.15074298, 20.82059773],
      [55.15083975, 20.81959324],
      [55.15100871, 20.81885563],
      [55.15110548, 20.81891464],
      [55.15119073, 20.81892269],
      [55.15125755, 20.81887709],
      [55.15131285, 20.81876444],
      [55.15132974, 20.81847476],
      [55.15130056, 20.8183031],
      [55.15121915, 20.81813412],
      [55.15111163, 20.81780018],
      [55.15101025, 20.81746088],
      [55.1508674, 20.81686275],
      [55.15078753, 20.81628608],
      [55.15076141, 20.81589984],
      [55.1506416, 20.815468],
      [55.15062471, 20.81522929],
      [55.15070612, 20.81472503],
      [55.15068154, 20.81462579],
      [55.15065082, 20.81455873],
      [55.15040198, 20.81419395],
      [55.15022904, 20.81398423],
      [55.15011768, 20.81386488],
      [55.14982813, 20.81351485],
      [55.14923827, 20.81278529],
      [55.14909941, 20.81257604],
      [55.14862476, 20.81185989],
      [55.14853829, 20.81185986],
      [55.14850197, 20.81186387],
      [55.14847179, 20.81187324],
      [55.14842725, 20.81200467],

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
      [55.15010217, 20.81384139],
      [55.15005302, 20.81392722],
      [55.14979035, 20.81454681],
      [55.14978113, 20.81460314],
      [55.14977806, 20.81469165],
      [55.14981493, 20.81511544],
      [55.14983029, 20.81562774],
      [55.14983797, 20.81576722],
      [55.14986408, 20.81587719],
      [55.1499528, 20.8162051],
      [55.15014788, 20.81679251],
      [55.15031545, 20.81741552],
      [55.15044141, 20.81774811],
      [55.15055968, 20.81801633],
      [55.15093249, 20.81865748],
      [55.15101157, 20.81886138],

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

  // Обозначение начала маршрута
  var startPoint = new ymaps.Placemark(
    [55.15083514, 20.82062991],
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
  var endPoint = new ymaps.Placemark(
    [55.15101157, 20.81886138],
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

  // Добавляем линии на карту.
  myMap.geoObjects.add(myPolyline1).add(myPolyline2).add(startPoint).add(endPoint);

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
