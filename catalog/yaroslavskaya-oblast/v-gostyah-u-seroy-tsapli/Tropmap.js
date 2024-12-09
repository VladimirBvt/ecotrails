ymaps.ready(function () {
    var myMap = new ymaps.Map("map", {
        zoom: 16,
        center: [56.801124, 38.795914],
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
            [56.80128731, 38.79955966],
            [56.80127039, 38.7994745],
            [56.80123047, 38.799388],
            [56.80121336, 38.79933502],
            [56.80118761, 38.79925389],
            [56.80116737, 38.79919555],
            [56.80113242, 38.79887503],
            [56.80114971, 38.7986296],
            [56.80115376, 38.79858334],
            [56.80114861, 38.79850622],
            [56.80095215, 38.79802611],
            [56.8009391, 38.79799218],
            [56.80088556, 38.79783701],
            [56.80085687, 38.79773777],
            [56.80076639, 38.79740899],
            [56.80062272, 38.79688136],
            [56.80059623, 38.7967915],
            [56.80026367, 38.7962852],
            [56.79995904, 38.79582118],
            [56.79975007, 38.79550199],
            [56.79973682, 38.7954859],
            [56.79971401, 38.79543226],
            [56.79970003, 38.79536118],
            [56.79969635, 38.79529278],
            [56.79969782, 38.79523243],
            [56.79970444, 38.79518281],
            [56.7997199, 38.7951399],
            [56.799987, 38.79466515],
            [56.80032548, 38.79406433],
            [56.80033872, 38.79404421],
            [56.80044395, 38.79399996],
            [56.80088764, 38.79380147],
            [56.80115694, 38.79368077],
            [56.80180003, 38.79455249],
            [56.80185889, 38.79456054],
            [56.80201782, 38.79502188],
            [56.80204284, 38.79519354],
            [56.80206491, 38.79614572],
            [56.80199648, 38.79655275],
            [56.80196264, 38.79664059],
            [56.80184086, 38.79683371],
            [56.80164478, 38.79743855],
            [56.80168672, 38.79873808],
            [56.80169702, 38.79888828],

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
        [56.80128731, 38.79955966],
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
        [56.80169702, 38.79888828],
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
