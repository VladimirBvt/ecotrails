ymaps.ready(function () {
  var myMap = new ymaps.Map("map", {
    zoom: 15,
    center: [54.985573, 20.558482],
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
  var myPolyline = new ymaps.Polyline(
    [
      // Указываем координаты вершин.

      [54.99146909, 20.55807027],
      [54.99124239, 20.5583975],
      [54.98923131, 20.55980298],
      [54.98909096, 20.56008461],
      [54.9889884, 20.559921],
      [54.98891205, 20.55999074],
      [54.98883031, 20.56006047],
      [54.98678826, 20.56131575],
      [54.9852744, 20.56228268],
      [54.98311725, 20.56380484],
      [54.98271002, 20.56383702],
      [54.98234598, 20.56424472],
      [54.98185853, 20.56431982],
      [54.98142661, 20.5645344],
      [54.98136491, 20.56444857],
      [54.98096384, 20.56340787],
      [54.98069234, 20.56210968],
      [54.98043318, 20.56030724],
      [54.98020487, 20.55968496],
      [54.98013083, 20.55915925],
      [54.97997656, 20.558655],
      [54.98155002, 20.55691692],
      [54.98369723, 20.55449221],
      [54.98380212, 20.55481407],
      [54.98380829, 20.55493745],
      [54.98378978, 20.55530223],
      [54.98379903, 20.55552218],
      [54.98386999, 20.55598888],
      [54.98408902, 20.5565897],
      [54.98430497, 20.557448],
      [54.98435741, 20.55750165],
      [54.98445304, 20.55757675],
      [54.98461037, 20.55781278],
      [54.98496514, 20.55884275],
      [54.9850546, 20.55934701],
      [54.98507311, 20.55978689],
      [54.98502375, 20.56019458],
      [54.98494046, 20.56065056],
      [54.98495588, 20.5609617],
      [54.98513018, 20.56160274],
      [54.98527362, 20.56228134],
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
    [54.98891205, 20.55999074],
    {
      hintContent: "Начало экотропы",
      //   balloonContent: `Начало маршрута`,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://i.ibb.co/Z2wRNPF/map-marker.png",
      iconImageSize: [32, 51],
      iconImageOffset: [-10, -45],
    }
  );

  var endPoint = new ymaps.Placemark(
    [54.99146909, 20.55807027],
    {
      hintContent: "Конец экотропы",
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
