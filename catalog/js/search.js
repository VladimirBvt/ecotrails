const trailsData = [
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

document.addEventListener("DOMContentLoaded", function() {
    const elasticContainer = document.getElementById("elasticId");
    trailsData.forEach(trail => {
        const searchItem = document.createElement("a");
        searchItem.classList.add("Searchlist");
        searchItem.setAttribute("href", trail.url);
        searchItem.setAttribute("hidden", true);
        searchItem.textContent = trail.name;

        elasticContainer.appendChild(searchItem);
    });

    // Логика для поиска остается такой же, как и выше
});
