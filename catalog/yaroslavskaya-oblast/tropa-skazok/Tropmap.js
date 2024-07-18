ymaps.ready(function () {
    var myMap = new ymaps.Map("map", {
        zoom: 16,
        center: [56.715984, 38.831392],
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

    var myPolyline = new ymaps.Polyline(
        [
            // Указываем координаты вершин.
            [56.7183216407628, 38.8295527911489],
            [56.7179912697353, 38.8305666661566],
            [56.7176012210727, 38.8306650256868],
            [56.7174360327463, 38.8305738305803],
            [56.7172796931235, 38.8305523729082],
            [56.7169329110214, 38.8306111764119],
            [56.7166320263711, 38.830450243871],
            [56.7164491345203, 38.830450243871],
            [56.7163783374351, 38.8306111764119],
            [56.7152337659914, 38.8287872742818],
            [56.7150228072771, 38.8288267572046],
            [56.7149785574298, 38.8287999351144],
            [56.7148723575831, 38.8285799939752],
            [56.7148222075508, 38.8285853583933],
            [56.7146481569179, 38.8291110713602],
            [56.7145685063586, 38.8291539867044],
            [56.714217451861, 38.830339523089],
            [56.7140699489959, 38.8306828458429],
            [56.7134150292614, 38.8323350865961],
            [56.7138870446367, 38.83267840935],
            [56.7142410522655, 38.8328822572351],
            [56.7143885544496, 38.8329144437432],
            [56.7146983071613, 38.8328339774728],
            [56.7149166075339, 38.8327803332925],
            [56.7152086560431, 38.8326676805139],
            [56.7153007178289, 38.8326014629508],
            [56.715333167443, 38.8325424543525],
            [56.7155898134004, 38.8317753425742],
            [56.7156606119759, 38.8316787830497],
            [56.7157425714151, 38.8316511868847],
            [56.7160788620853, 38.831699466647],
            [56.7161437599373, 38.8316082715405],
            [56.7163723764675, 38.8306024431599],

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

    // Обозначение начала маршрута
    var startPoint = new ymaps.Placemark(
        [56.7183216407628, 38.8295527911489],
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
        [56.7183216407628, 38.8295527911489],
        {
            hintContent: "Конец экотропы",
            ////balloonContent: "Это конец маршрута",
        },
        {
            iconLayout: "default#image",
            iconImageHref: "2",
            iconImageSize: [15, 15],
            iconImageOffset: [0, 0],
        }
    );

    // Добавляем линию и маркер на карту.
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
