ymaps.ready(function () {
  var myMap = new ymaps.Map("map", {
    zoom: 14,
    center: [55.6469661379922,37.4630091231384],
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

      [55.6469661379922,37.4630091231384],
[55.6467841224025,37.4618289511718],
[55.6463230124394,37.4606702368774],
[55.6458740317099,37.4599835913696],
[55.6455463938611,37.4594900649108],
[55.6466506437634,37.4553916495361],
[55.6469297349422,37.4558208029784],
[55.6471602870182,37.456099752716],
[55.6475485821703,37.4560353796996],
[55.6478155328445,37.4565503638305],
[55.6481310176488,37.4567220252074],
[55.6495021334847,37.456829313568],
[55.6502301399992,37.4580094855346],
[55.6507033369447,37.4583742659606],
[55.6509823991178,37.4575803320922],
[55.6526324650522,37.4579451125182],
[55.6539548939585,37.4580524008788],
[55.6545251017558,37.4580309432067],
[55.6545008377641,37.4584815543212],
[55.6544401777188,37.4589321654357],
[55.6542703290899,37.4592754881896],
[55.6540519511938,37.4598119299926],
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
      hintContent: "Начало маршрута",
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
    [43.11133937385209, 43.14081345161866],
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
