ymaps.ready(function () {
    var myMap = new ymaps.Map("map", {
        zoom: 15,
        center: [55.946555, 92.744060],
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
            [55.95044987, 92.74523363],
            [55.95005707, 92.74502174],
            [55.94973033, 92.74486986],
            [55.94939923, 92.74467137],
            [55.94918443, 92.74454446],
            [55.94883304, 92.74444752],
            [55.94836046, 92.7443],
            [55.9476606, 92.74407201],
            [55.94666122, 92.74372869],
            [55.9459247, 92.74345012],
            [55.94532866, 92.74325701],
            [55.94426901, 92.74332138],
            [55.94390776, 92.74322482],
            [55.94273969, 92.74231287],
            [55.94197425, 92.74189713],

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

    // Обозначение начала маршрута
    var startPoint = new ymaps.Placemark(
        [55.95044987, 92.74523363],
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
        [55.94197425, 92.74189713],
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
    myMap.geoObjects.add(myPolyline1).add(startPoint).add(endPoint);

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
