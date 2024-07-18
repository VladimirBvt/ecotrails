ymaps.ready(function () {
  var myMap = new ymaps.Map("map", {
    zoom: 15,
    center: [60.002808, 30.035359],
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
  // Западный котлин

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
    [60.004475450154104, 30.03664961944124],
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
    [60.00096418609638, 30.034074698786963],
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
