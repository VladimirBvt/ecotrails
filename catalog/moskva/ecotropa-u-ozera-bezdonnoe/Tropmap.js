ymaps.ready(function () {
  var myMap = new ymaps.Map("map", {
    zoom: 16,
    center: [55.7769829074849,37.4310249392683],
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
        [55.7796049326206,37.4307850640327],
        [55.7795610953303,37.4307555597335],
        [55.7788635057132,37.4305753874487],
        [55.7784634082469,37.430478449103],
        [55.7781610722059,37.4303979828326],
        [55.778109674832,37.4303684785334],
        [55.778015194211,37.430214251515],
        [55.7779698434312,37.4300586833922],
        [55.7779517031044,37.4299554183451],
        [55.7779305393791,37.4299165263144],
        [55.7778999933322,37.4298825232208],
        [55.7777745223393,37.4298020569503],
        [55.7775771957474,37.4297112645741],
        [55.7773738703759,37.4296911480065],
        [55.7772453742322,37.4296723725433],
        [55.7770352443315,37.4296589614982],
        [55.7770420471157,37.4294645013446],
        [55.7768763302522,37.4294035439188],
        [55.7767576587835,37.4293726985152],
        [55.7765263617446,37.4298420850927],
        [55.7764583329451,37.4300003354246],
        [55.7764008863104,37.4301559035475],
        [55.7763933275363,37.4302256409819],
        [55.7764114685916,37.4302900139982],
        [55.7764915914842,37.4304911796743],
        [55.7765989256597,37.4305984680349],
        [55.7767077712873,37.4307164852316],
        [55.7768135931326,37.4308210913832],
        [55.7768922034595,37.4309149686987],
        [55.7769829074849,37.4310249392683],
        [55.7770070951892,37.4310571257765],
        [55.7770902403015,37.4312690202886],
        [55.7772051314449,37.4313709442312],
        [55.777239901066,37.4313548509772],
        [55.7772701354938,37.4312958423788],
        [55.7773094402147,37.4312073294813],
        [55.7773290925602,37.4311858718092],
        [55.7774077018428,37.4311831896002],
        [55.7774288658533,37.4311992828543],
        [55.7774439829965,37.4312663380796],
        [55.7774711938395,37.4317008559401],
        [55.7775437559878,37.4319342081244],
        [55.777635970197,37.4322158400709],
        [55.7777599299235,37.432588667124],
        [55.7778748190842,37.4328568880254],
        [55.7779897079048,37.4330070917303],
        [55.7780562223296,37.4331036512548],
        [55.7780985496316,37.4334469740087],
        [55.7780804093649,37.4336615507299],
        [55.7781711106131,37.4339297716314],
        [55.778225531254,37.4340585176641],
        [55.7783071620816,37.4340638820821],
        [55.7783373956716,37.4339673225576],
        [55.7783253022359,37.4336937372381],
        [55.7782859985439,37.4332216684515],
        [55.7786911665584,37.4324964578287],
        [55.7788000063177,37.4324052627222],
        [55.7788846592527,37.4322872455255],
        [55.7790297781403,37.4319922025339],
        [55.7793109444344,37.4314503963129],
        [55.7793925729787,37.4312358195917],
        [55.7794439686408,37.4310587937967],
        [55.7794772246211,37.430935412182],
        [55.7795890854367,37.4308173949853],


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
    [55.7796049326206,37.4307850640327],
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
    [55.7795890854367,37.4308173949853],
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
