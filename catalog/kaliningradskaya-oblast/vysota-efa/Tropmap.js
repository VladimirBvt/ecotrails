ymaps.ready(function () {
  var myMap = new ymaps.Map("map", {
    zoom: 15,
    center: [55.221493, 20.897502],
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
    [55.22118555, 20.90638444],
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
