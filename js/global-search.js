const trailsData = [
    { name: "Долина Нарзанов", url: "/catalog/kabardino-balkariya/dolina-narzanov/" },
    { name: "Экотропа PlesActive", url: "/catalog/tambovskaya-oblast/ples-active/" },
    { name: "В гостях у серой цапли", url: "/catalog/yaroslavskaya-oblast/v-gostyah-u-seroy-tsapli/" },
    { name: "Лиственничная роща", url: "/catalog/lenoblast/listvennichnaya-roscha/" },
    { name: "В гармонии с природой", url: "/catalog/moskva/v-garmonii-s-prirodoy/" },
    { name: "Вдоль реки Чермянки", url: "/catalog/moskva/chermyanka/" },
    { name: "Экотропа Абрау-Дюрсо", url: "/catalog/krasnodarsky-krai/abrau-durso/" },
    { name: "Терренкур Маркотх", url: "/catalog/krasnodarsky-krai/terrenkur-markoth/" },
    { name: "В парке Швейцария", url: "/catalog/nizhegorodskaya-oblast/v-parke-shveitsaria/" },
    { name: "Природа Чувств", url: "/catalog/yaroslavskaya-oblast/priroda-chuvstv/" },
    { name: "Тропа Сказок", url: "/catalog/yaroslavskaya-oblast/tropa-skazok/" },
    { name: "На террасах Воробьёвых гор", url: "/catalog/moskva/na-terrasah-vorobiovyh-gor/" },
    { name: "К Андреевским прудам", url: "/catalog/moskva/k-andreevskim-prudam/" },
    { name: "В пойме реки Шмелёвки", url: "/catalog/moskva/shmelevka/" },
    { name: "Бурнаковская экотропа", url: "/catalog/nizhegorodskaya-oblast/burnakovskaya/" },
    { name: "Тропа здоровья Роза Хутор", url: "/catalog/krasnodarsky-krai/tropa-zdoroviya-rh/" },
    { name: "Солнечная тропа", url: "/catalog/krym/solnechnaya-tropa/" },
    { name: "Трын-тропа", url: "/catalog/lenoblast/tryn-tropa/" },
    { name: "Бугаиная тропа", url: "/catalog/lenoblast/bugainaya-tropa/" },
    { name: "У Лукоморья", url: "/catalog/lenoblast/u-lukomoriya/" },
    { name: "В парке Монрепо", url: "/catalog/lenoblast/monrepo/" },
    { name: "На гору Железная", url: "/catalog/stavropolsky-krai/na-goru-zheleznaya/" },
    { name: "Комаровский Берег", url: "/catalog/lenoblast/komarovsky-bereg/" },
    { name: "Лесная Тропа", url: "/catalog/lenoblast/lesnaya-tropa/" },
    { name: "Юкковские камы", url: "/catalog/lenoblast/yukkovskie-kamy/" },
    { name: "Тропа здоровья Сокольники", url: "/catalog/moskva/tropa-zdorovia-sokolniki/" },
    { name: "Еловые холмы", url: "/catalog/lenoblast/elovye-holmy/" },
    { name: "Тропа Голицына", url: "/catalog/krym/tropa-golicyna/" },
    { name: "К леднику Безенги", url: "/catalog/kabardino-balkariya/k-ledniku-bezengi/" },
    { name: "Экотропа Фиалка", url: "/catalog/krasnodarsky-krai/ecotropa-fialka/" },
    { name: "Экотропа Горизонт", url: "/catalog/krasnodarsky-krai/ecotropa-gorizont/" },
    { name: "Экотропа Крокус", url: "/catalog/krasnodarsky-krai/ecotropa-krokus/" },
    { name: "Дудергофские Высоты", url: "/catalog/lenoblast/dudergofskie-vysoty/" },
    { name: "Сестрорецкое болото", url: "/catalog/lenoblast/sestroreckoe-boloto/" },
    { name: "Раковые озёра", url: "/catalog/lenoblast/rakovye-ozyora/" },
    { name: "Западный Котлин", url: "/catalog/lenoblast/zapadniy-kotlin/" },
    { name: "Воздушная экотропа", url: "/catalog/moskva/vozdushnaya-ecotropa/" },
    { name: "Тропарёвская экотропа", url: "/catalog/moskva/troparevskaya-ecotropa/" },
    { name: "У озера Бездонное", url: "/catalog/moskva/ecotropa-u-ozera-bezdonnoe/" },
];

document.addEventListener("DOMContentLoaded", function () {
    const elasticContainer = document.getElementById("elasticId");
    trailsData.forEach(trail => {
        const searchItem = document.createElement("a");
        searchItem.classList.add("Searchlist");
        searchItem.setAttribute("href", trail.url);
        searchItem.setAttribute("hidden", true);
        searchItem.textContent = trail.name;

        elasticContainer.appendChild(searchItem);
    });

    // Логика для поиска - так проще, но не хочется мучиться с кодом отдельных поисков
    // const Search = document.querySelector("#search");
    // const headerTwo = document.querySelector("header");
    // const voidSearch = document.querySelector("#VoidSearch");
    // const elasticBox = document.querySelector("#elasticId");
    // Search.addEventListener("click", function Searchinput() {
    //     console.log(document.querySelector(".searcharea"));
    //     let k = 0;
    //     document.querySelector(".searcharea").oninput = function () {
    //         let val = this.value.trim().toLowerCase(); // Приводим val к нижнему регистру
    //         let elasticItems = document.querySelectorAll(".elastic a");
    //         if (val != "") {
    //             elasticItems.forEach(function (elem) {
    //                 // Приводим текст элемента к нижнему регистру перед поиском
    //                 if (elem.innerText.toLowerCase().search(val) == -1) {
    //                     elem.classList.add("hide");
    //                     elem.removeAttribute("hidden");
    //                     elem.innerHTML = elem.innerText;
    //                 } else {
    //                     k++;
    //                     elem.classList.remove("hide");
    //                     elem.removeAttribute("hidden");
    //                     let str = elem.innerText;
    //                     elem.innerHTML = insertMark(
    //                         str,
    //                         elem.innerText.toLowerCase().search(val), // Также приводим к нижнему регистру здесь
    //                         val.length
    //                     );
    //                 }
    //             });
    //             // Изменение парметров взависимости от количества вкладок поиска!
    //             console.log(k);
    //             if (k === 0) {
    //                 voidSearch.hidden = false;
    //                 elasticBox.classList.add("elasticBig");
    //             } else if (k > 0) {
    //                 document.querySelector("#VoidSearch").hidden = true;
    //                 elasticBox.classList.remove("elasticBig");
    //                 elasticBox.style.background = "";
    //                 console.log(window.pageYOffset);
    //                 elasticItems.forEach(function (elem) {
    //                     elasticBox.classList.add("elasticBig");
    //                     elem.classList.add("elemsearch");
    //                     elem.style.background = "transparent";
    //                 });
    //             }

    //             k = 0;
    //         } else {
    //             document.querySelector("#VoidSearch").hidden = true;
    //             elasticBox.style.background = "";
    //             elasticItems.forEach(function (elem) {
    //                 elem.classList.add("hide");
    //                 elasticBox.classList.remove("elasticBig");
    //                 elem.innerHTML = elem.innerText;
    //             });
    //         }
    //     };
    // });
    // function insertMark(stringmark, pos, len) {
    //     return (
    //         stringmark.slice(0, pos) +
    //         "<span class ='searchmark'>" +
    //         stringmark.slice(pos, pos + len) +
    //         "</span>" +
    //         stringmark.slice(pos + len)
    //     );
    // }

    // headerTwo.addEventListener("click", (event) => {
    //     const TempSearchTwo = document.querySelector("#search-close");
    //     TempSearchTwo.addEventListener("click", () => {
    //         voidSearch.hidden = true;
    //         elasticBox.classList.remove("elasticBig");
    //         let elasticItems = document.querySelectorAll(".elastic a");
    //         elasticItems.forEach(function (elem) {
    //             elem.classList.add("hide");
    //         });
    //     });
    // });
});
