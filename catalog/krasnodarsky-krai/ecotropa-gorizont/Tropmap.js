ymaps.ready(function () {
  var myMap = new ymaps.Map("map", {
    zoom: 15,
    center: [43.619778455488,40.3126941452023],
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
        [43.6248328289864,40.3099218244671],
        [43.6234221453811,40.3109303350567],
        [43.6228453922071,40.3111770982861],
        [43.6227051000519,40.3112843866467],
        [43.6225648075671,40.31152042104],
        [43.6224089266417,40.3119495744824],
        [43.6224089266417,40.3119495744824],
        [43.622158571764,40.3125396604657],
        [43.6219637192178,40.3128078813671],
        [43.6217688660356,40.312958085072],
        [43.6215740122174,40.313140475285],
        [43.6213713635718,40.3132155771374],
        [43.6211453315788,40.3132692213177],
        [43.6208257676456,40.3132799501538],
        [43.620560762111,40.3132263059735],
        [43.620004492656,40.3128014335629],
        [43.619778455488,40.3126941452023],
        [43.6196459505433,40.3127048740384],
        [43.6194776582661,40.3128843839226],
        [43.6193139748201,40.313141875988],
        [43.6191814688446,40.3135066564141],
        [43.6190326342419,40.3141281417894],
        [43.6189937456495,40.3144378398076],
        [43.618965202545,40.3147586737101],
        [43.6189340245128,40.3149625215952],
        [43.6188482848401,40.3153058443491],
        [43.6187391614423,40.3155740652506],
        [43.6186144487435,40.3158208284799],
        [43.6184039954735,40.3160890493814],
        [43.6182870766697,40.3162392530863],
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
    [43.6248328289864,40.3099218244671],
    {
      hintContent: "Начало экотропы",
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
