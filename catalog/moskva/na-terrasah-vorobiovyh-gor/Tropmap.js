ymaps.ready(function () {
    var myMap = new ymaps.Map("map", {
        zoom: 17,
        center: [55.708289, 37.551901],
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
            [55.7080821050252, 37.5535229485549],
            [55.7081487392273, 37.5534625988521],
            [55.7081540396703, 37.55344114118],
            [55.7081918999564, 37.5532453399219],
            [55.7082835216963, 37.5530790429629],
            [55.7082948797482, 37.5530481975593],
            [55.7083077521968, 37.5528684895553],
            [55.7083168386329, 37.5528188686885],
            [55.7083781720213, 37.5527048748054],
            [55.7083857440378, 37.5526807349242],
            [55.708387258441, 37.552547965578],
            [55.7083940732481, 37.5525130968608],
            [55.7085076532952, 37.5523467999019],
            [55.7085795871473, 37.5521335642852],
            [55.7085947311005, 37.5520101826705],
            [55.7085924595079, 37.5516293089904],
            [55.7085841303339, 37.5515220206298],
            [55.7084183036735, 37.5507669787921],
            [55.7084357192727, 37.5506368916549],
            [55.7084342048714, 37.5506033640422],
            [55.7083236534212, 37.5502506535567],
            [55.7083175957922, 37.5500924032248],
            [55.7080858910063, 37.5500642400301],
            [55.7080639319851, 37.5500736277617],
            [55.7080518166576, 37.5501058142699],
            [55.7080450017843, 37.5501567762411],
            [55.7080399098989, 37.5507774582375],
            [55.7080505108138, 37.5508311024178],
            [55.70811714507, 37.5509813061226],
            [55.7081315319905, 37.5510000815857],
            [55.7081663634753, 37.5510081282128],
            [55.7083295409783, 37.5510215392578],
            [55.7083723228904, 37.5510269036758],
            [55.7083662652877, 37.5510651251543],
            [55.7083155327357, 37.5513273110856],
            [55.7082443555873, 37.5515552988518],
            [55.7081777215427, 37.5523183873165],
            [55.7081285031394, 37.5529808929432],
            [55.7080770130511, 37.5535106292236],
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
        [55.7080821050252, 37.5535229485549],
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
        [55.7080770130511, 37.5535106292236],
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
