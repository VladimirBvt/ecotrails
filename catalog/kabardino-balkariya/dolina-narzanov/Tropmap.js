ymaps.ready(function () {
  var myMap = new ymaps.Map("map", {
    zoom: 14,
    center: [43.689473, 42.693879],
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
    [43.6860495, 42.70052583],
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
