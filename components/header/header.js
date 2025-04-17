// Константы для DOM-элементов
const popular = document.querySelector("#popular-cont");
const cotalog = document.querySelector("#cotalog-cont");
const faq = document.querySelector("#FAQ-cont");
const header = document.querySelector("header");
const animation1 = document.querySelector("#animation1");
const animation2 = document.querySelector("#animation2");
const animation3 = document.querySelector("#animation3");
const CotColor = document.querySelectorAll(".cotalog-color");

// Инициализация стилей и анимаций
function initializeStyles() {
  animation1.hidden = false;
  cotalog.style.color = "#F28123";
  CotColor.forEach(el => el.style.fill = "#F28123");
}

// Функции для управления анимациями
function showAnimation(animation) {
  animation.hidden = false;
}

function hideAnimation(animation) {
  animation.hidden = true;
}

// Обработчики событий для популярного раздела
popular.addEventListener("mouseover", () => showAnimation(animation2));
popular.addEventListener("mouseout", () => hideAnimation(animation2));

// Обработчики событий для FAQ
faq.addEventListener("mouseover", () => showAnimation(animation3));
faq.addEventListener("mouseout", () => hideAnimation(animation3));

// Обработчик кликов в header
header.addEventListener("click", (event) => {
  const targetClass = event.target.className;
  const targetTag = event.target.tagName;

  // Сброс стилей и анимаций
  function resetStyles() {
    popular.style.color = "#1F271B";
    faq.style.color = "#1F271B";
    cotalog.style.color = "#1F271B";
    hideAnimation(animation1);
    hideAnimation(animation2);
    hideAnimation(animation3);
  }

  // Обработка кликов
  switch (targetClass) {
    case "header-text-first":
      resetStyles();
      cotalog.style.color = "#F28123";
      CotColor.forEach(el => el.style.fill = "#F28123");
      break;

    case "header-text-center":
      resetStyles();
      popular.style.color = "#F28123";
      break;

    case "header-text-last":
      resetStyles();
      faq.style.color = "#F28123";
      break;
  }

  // Обработка клика на логотип
  if (targetTag === "logo-picture") {
    resetStyles();
  }
});

// Инициализация
initializeStyles();

// ...................................................Стиль хедера + стиль поиска....................................................

// // Константы для DOM-элементов первого файла
// const popular = document.querySelector("#popular-cont");
// const cotalog = document.querySelector("#cotalog-cont");
// const faq = document.querySelector("#FAQ-cont");
// const header = document.querySelector("header");
// const animation1 = document.querySelector("#animation1");
// const animation2 = document.querySelector("#animation2");
// const animation3 = document.querySelector("#animation3");
// const CotColor = document.querySelectorAll(".cotalog-color");

// // Константы для DOM-элементов второго файла
// const search = document.querySelector("#search");
// const contSearchElement = document.querySelector('#cont-search');
// const Search = document.querySelector("#search");
// const headerTwo = document.querySelector("header");
// const voidSearch = document.querySelector("#VoidSearch");
// const elasticBox = document.querySelector("#elasticId");

// // Инициализация стилей и анимаций (из первого файла)
// function initializeStyles() {
//   animation1.hidden = false;
//   cotalog.style.color = "#F28123";
//   CotColor.forEach(el => el.style.fill = "#F28123");
// }

// // Функции для управления анимациями (из первого файла)
// function showAnimation(animation) {
//   animation.hidden = false;
// }

// function hideAnimation(animation) {
//   animation.hidden = true;
// }

// // Обработчики событий для популярного раздела (из первого файла)
// popular.addEventListener("mouseover", () => showAnimation(animation2));
// popular.addEventListener("mouseout", () => hideAnimation(animation2));

// // Обработчики событий для FAQ (из первого файла)
// faq.addEventListener("mouseover", () => showAnimation(animation3));
// faq.addEventListener("mouseout", () => hideAnimation(animation3));

// // Обработчик кликов в header (из первого файла)
// header.addEventListener("click", (event) => {
//   const targetClass = event.target.className;
//   const targetTag = event.target.tagName;

//   function resetStyles() {
//     popular.style.color = "#1F271B";
//     faq.style.color = "#1F271B";
//     cotalog.style.color = "#1F271B";
//     hideAnimation(animation1);
//     hideAnimation(animation2);
//     hideAnimation(animation3);
//   }

//   switch (targetClass) {
//     case "header-text-first":
//       resetStyles();
//       cotalog.style.color = "#F28123";
//       CotColor.forEach(el => el.style.fill = "#F28123");
//       break;

//     case "header-text-center":
//       resetStyles();
//       popular.style.color = "#F28123";
//       break;

//     case "header-text-last":
//       resetStyles();
//       faq.style.color = "#F28123";
//       break;
//   }

//   if (targetTag === "logo-picture") {
//     resetStyles();
//   }
// });

// // Код поиска из второго файла
// search.addEventListener("click", () => {
//   if ($(window).width() <= 1024) {
//     $(".center-navigation").css("display", "none");
//   }

//   if ($(window).width() <= 775) {
//     $(".logo-header").css("visibility", "hidden");
//     $(".icon-navigation .container-navigation-icon:not(#search-cont)").css("display", "none");
//   }
//   document.querySelector("#search").hidden = true;
//   contSearchElement.style.display = 'flex';
//   document.querySelector(".otstup-icon-search").hidden = false;

//   const TempSearch = document.querySelector("#search-close");
//   TempSearch.addEventListener("click", () => {
//     if ($(window).width() <= 1024) {
//       $(".center-navigation").css("display", "");
//     }
//     if ($(window).width() <= 775) {
//       $(".logo-header").css("visibility", "");
//       $(".icon-navigation .container-navigation-icon:not(#search-cont)").css("display", "");
//     }

//     contSearchElement.style.display = 'none';
//     document.querySelector(".searcharea").value = '';
//     document.querySelector("#search").hidden = false;
//     document.querySelector(".otstup-icon-search").hidden = true;
//   });
// });

// // Поведение хедера при ресайзе (из второго файла)
// window.addEventListener("resize", () => {
//   const windowWidth = $(window).width();
//   const searchArea = document.querySelector(".searcharea");
//   const isSearchVisible = searchArea &&
//     getComputedStyle(searchArea).display !== "none" &&
//     searchArea.offsetParent !== null;

//   if (windowWidth <= 480) {
//     $(".center-navigation").hide();
    
//     if (isSearchVisible) {
//       $(".container-location, .icon-href-cotalog").hide();
//       $(".icon-navigation .container-navigation-icon:not(#search-cont)").hide();
//       $(".logo-header").css("visibility", "hidden");
//     } else {
//       $(".container-location, .icon-href-cotalog").show();
//       $(".icon-navigation .container-navigation-icon").show();
//       $(".logo-header").css("visibility", "");
//     }
//   } else if (windowWidth <= 775) {
//     if (isSearchVisible) {
//       $(".icon-navigation .container-navigation-icon:not(#search-cont)").hide();
//       $(".logo-header").css("visibility", "hidden");
//     } else {
//       $(".icon-navigation .container-navigation-icon").show();
//       $(".logo-header").css("visibility", "");
//     }
//     $(".center-navigation").hide();
//     $(".container-location, .icon-href-cotalog").show();
//   } else if (windowWidth <= 1024) {
//     $(".logo-header").css("visibility", "");
//     $(".icon-navigation .container-navigation-icon").show();
//     $(".container-location, .icon-href-cotalog").show();
//     $(".center-navigation").toggle(!isSearchVisible);
//   } else {
//     $(".logo-header").css("visibility", "");
//     $(".icon-navigation .container-navigation-icon").show();
//     $(".container-location, .icon-href-cotalog, .center-navigation").show();
//   }
// });

// // Инициализация при загрузке (из второго файла)
// $(function() {
//   $(window).trigger("resize");
// });

// // Функционал поиска (из второго файла)
// function positionElasticBox() {
//   const contSearchElementRect = contSearchElement.getBoundingClientRect();
//   elasticBox.style.width = `${contSearchElementRect.width}px`;
//   elasticBox.style.top = `${contSearchElementRect.bottom}px`;
//   elasticBox.style.left = `${contSearchElementRect.left}px`;
// }

// Search.addEventListener("click", function Searchinput() {
//   console.log(document.querySelector(".searcharea"));
//   let k = 0;
//   document.querySelector(".searcharea").oninput = function () {
//     let val = this.value.trim().toLowerCase();
//     let elasticItems = document.querySelectorAll(".elastic a");
//     if (val != "") {
//       elasticItems.forEach(function (elem) {
//         if (elem.innerText.toLowerCase().search(val) == -1) {
//           elem.classList.add("hide");
//           elem.removeAttribute("hidden");
//           elem.innerHTML = elem.innerText;
//         } else {
//           k++;
//           elem.classList.remove("hide");
//           elem.removeAttribute("hidden");
//           let str = elem.innerText;
//           elem.innerHTML = insertMark(
//             str,
//             elem.innerText.toLowerCase().search(val),
//             val.length
//           );
//         }
//       });
//       console.log(k);
//       if (k === 0) {
//         voidSearch.hidden = false;
//         elasticBox.classList.add("elasticBig");
//       } else if (k > 0) {
//         document.querySelector("#VoidSearch").hidden = true;
//         elasticBox.classList.remove("elasticBig");
//         elasticBox.style.background = "";
//         console.log(window.pageYOffset);
//         elasticItems.forEach(function (elem) {
//           elasticBox.classList.add("elasticBig");
//           elem.classList.add("elemsearch");
//           elem.style.background = "transparent";
//         });
//       }

//       k = 0;
//     } else {
//       document.querySelector("#VoidSearch").hidden = true;
//       elasticBox.style.background = "";
//       elasticItems.forEach(function (elem) {
//         elem.classList.add("hide");
//         elasticBox.classList.remove("elasticBig");
//         elem.innerHTML = elem.innerText;
//       });
//     }

//     positionElasticBox();
//   };
// });

// window.addEventListener("resize", positionElasticBox);

// function insertMark(stringmark, pos, len) {
//   return (
//     stringmark.slice(0, pos) +
//     "<span class ='searchmark'>" +
//     stringmark.slice(pos, pos + len) +
//     "</span>" +
//     stringmark.slice(pos + len)
//   );
// }

// headerTwo.addEventListener("click", (event) => {
//   const TempSearchTwo = document.querySelector("#search-close");
//   TempSearchTwo.addEventListener("click", () => {
//     voidSearch.hidden = true;
//     elasticBox.classList.remove("elasticBig");
//     let elasticItems = document.querySelectorAll(".elastic a");
//     elasticItems.forEach(function (elem) {
//       elem.classList.add("hide");
//     });
//   });
// });

// // Инициализация из первого файла
// initializeStyles();

// .........................................Стиль хедера + стиль поиска + наполнение поиска...........

// // Константы для DOM-элементов первого файла
// const popular = document.querySelector("#popular-cont");
// const cotalog = document.querySelector("#cotalog-cont");
// const faq = document.querySelector("#FAQ-cont");
// const header = document.querySelector("header");
// const animation1 = document.querySelector("#animation1");
// const animation2 = document.querySelector("#animation2");
// const animation3 = document.querySelector("#animation3");
// const CotColor = document.querySelectorAll(".cotalog-color");

// // Константы для DOM-элементов второго файла
// const search = document.querySelector("#search");
// const contSearchElement = document.querySelector('#cont-search');
// const Search = document.querySelector("#search");
// const headerTwo = document.querySelector("header");
// const voidSearch = document.querySelector("#VoidSearch");
// const elasticBox = document.querySelector("#elasticId");

// // Инициализация стилей и анимаций (из первого файла)
// function initializeStyles() {
//   animation1.hidden = false;
//   cotalog.style.color = "#F28123";
//   CotColor.forEach(el => el.style.fill = "#F28123");
// }

// // Функции для управления анимациями (из первого файла)
// function showAnimation(animation) {
//   animation.hidden = false;
// }

// function hideAnimation(animation) {
//   animation.hidden = true;
// }

// // Обработчики событий для популярного раздела (из первого файла)
// popular.addEventListener("mouseover", () => showAnimation(animation2));
// popular.addEventListener("mouseout", () => hideAnimation(animation2));

// // Обработчики событий для FAQ (из первого файла)
// faq.addEventListener("mouseover", () => showAnimation(animation3));
// faq.addEventListener("mouseout", () => hideAnimation(animation3));

// // Обработчик кликов в header (из первого файла)
// header.addEventListener("click", (event) => {
//   const targetClass = event.target.className;
//   const targetTag = event.target.tagName;

//   function resetStyles() {
//     popular.style.color = "#1F271B";
//     faq.style.color = "#1F271B";
//     cotalog.style.color = "#1F271B";
//     hideAnimation(animation1);
//     hideAnimation(animation2);
//     hideAnimation(animation3);
//   }

//   switch (targetClass) {
//     case "header-text-first":
//       resetStyles();
//       cotalog.style.color = "#F28123";
//       CotColor.forEach(el => el.style.fill = "#F28123");
//       break;

//     case "header-text-center":
//       resetStyles();
//       popular.style.color = "#F28123";
//       break;

//     case "header-text-last":
//       resetStyles();
//       faq.style.color = "#F28123";
//       break;
//   }

//   if (targetTag === "logo-picture") {
//     resetStyles();
//   }
// });

// // Код поиска из первого файла
// search.addEventListener("click", () => {
//   if ($(window).width() <= 1024) {
//     $(".center-navigation").css("display", "none");
//   }

//   if ($(window).width() <= 775) {
//     $(".logo-header").css("visibility", "hidden");
//     $(".icon-navigation .container-navigation-icon:not(#search-cont)").css("display", "none");
//   }
//   document.querySelector("#search").hidden = true;
//   contSearchElement.style.display = 'flex';
//   document.querySelector(".otstup-icon-search").hidden = false;

//   const TempSearch = document.querySelector("#search-close");
//   TempSearch.addEventListener("click", () => {
//     if ($(window).width() <= 1024) {
//       $(".center-navigation").css("display", "");
//     }
//     if ($(window).width() <= 775) {
//       $(".logo-header").css("visibility", "");
//       $(".icon-navigation .container-navigation-icon:not(#search-cont)").css("display", "");
//     }

//     contSearchElement.style.display = 'none';
//     document.querySelector(".searcharea").value = '';
//     document.querySelector("#search").hidden = false;
//     document.querySelector(".otstup-icon-search").hidden = true;
//   });
// });

// // Поведение хедера при ресайзе (из первого файла)
// window.addEventListener("resize", () => {
//   const windowWidth = $(window).width();
//   const searchArea = document.querySelector(".searcharea");
//   const isSearchVisible = searchArea &&
//     getComputedStyle(searchArea).display !== "none" &&
//     searchArea.offsetParent !== null;

//   if (windowWidth <= 480) {
//     $(".center-navigation").hide();
    
//     if (isSearchVisible) {
//       $(".container-location, .icon-href-cotalog").hide();
//       $(".icon-navigation .container-navigation-icon:not(#search-cont)").hide();
//       $(".logo-header").css("visibility", "hidden");
//     } else {
//       $(".container-location, .icon-href-cotalog").show();
//       $(".icon-navigation .container-navigation-icon").show();
//       $(".logo-header").css("visibility", "");
//     }
//   } else if (windowWidth <= 775) {
//     if (isSearchVisible) {
//       $(".icon-navigation .container-navigation-icon:not(#search-cont)").hide();
//       $(".logo-header").css("visibility", "hidden");
//     } else {
//       $(".icon-navigation .container-navigation-icon").show();
//       $(".logo-header").css("visibility", "");
//     }
//     $(".center-navigation").hide();
//     $(".container-location, .icon-href-cotalog").show();
//   } else if (windowWidth <= 1024) {
//     $(".logo-header").css("visibility", "");
//     $(".icon-navigation .container-navigation-icon").show();
//     $(".container-location, .icon-href-cotalog").show();
//     $(".center-navigation").toggle(!isSearchVisible);
//   } else {
//     $(".logo-header").css("visibility", "");
//     $(".icon-navigation .container-navigation-icon").show();
//     $(".container-location, .icon-href-cotalog, .center-navigation").show();
//   }
// });

// // Инициализация при загрузке (из первого файла)
// $(function() {
//   $(window).trigger("resize");
// });

// // Функционал поиска (из первого файла)
// function positionElasticBox() {
//   const contSearchElementRect = contSearchElement.getBoundingClientRect();
//   elasticBox.style.width = `${contSearchElementRect.width}px`;
//   elasticBox.style.top = `${contSearchElementRect.bottom}px`;
//   elasticBox.style.left = `${contSearchElementRect.left}px`;
// }

// Search.addEventListener("click", function Searchinput() {
//   console.log(document.querySelector(".searcharea"));
//   let k = 0;
//   document.querySelector(".searcharea").oninput = function () {
//     let val = this.value.trim().toLowerCase();
//     let elasticItems = document.querySelectorAll(".elastic a");
//     if (val != "") {
//       elasticItems.forEach(function (elem) {
//         if (elem.innerText.toLowerCase().search(val) == -1) {
//           elem.classList.add("hide");
//           elem.removeAttribute("hidden");
//           elem.innerHTML = elem.innerText;
//         } else {
//           k++;
//           elem.classList.remove("hide");
//           elem.removeAttribute("hidden");
//           let str = elem.innerText;
//           elem.innerHTML = insertMark(
//             str,
//             elem.innerText.toLowerCase().search(val),
//             val.length
//           );
//         }
//       });
//       console.log(k);
//       if (k === 0) {
//         voidSearch.hidden = false;
//         elasticBox.classList.add("elasticBig");
//       } else if (k > 0) {
//         document.querySelector("#VoidSearch").hidden = true;
//         elasticBox.classList.remove("elasticBig");
//         elasticBox.style.background = "";
//         console.log(window.pageYOffset);
//         elasticItems.forEach(function (elem) {
//           elasticBox.classList.add("elasticBig");
//           elem.classList.add("elemsearch");
//           elem.style.background = "transparent";
//         });
//       }

//       k = 0;
//     } else {
//       document.querySelector("#VoidSearch").hidden = true;
//       elasticBox.style.background = "";
//       elasticItems.forEach(function (elem) {
//         elem.classList.add("hide");
//         elasticBox.classList.remove("elasticBig");
//         elem.innerHTML = elem.innerText;
//       });
//     }

//     positionElasticBox();
//   };
// });

// window.addEventListener("resize", positionElasticBox);

// function insertMark(stringmark, pos, len) {
//   return (
//     stringmark.slice(0, pos) +
//     "<span class ='searchmark'>" +
//     stringmark.slice(pos, pos + len) +
//     "</span>" +
//     stringmark.slice(pos + len)
//   );
// }

// headerTwo.addEventListener("click", (event) => {
//   const TempSearchTwo = document.querySelector("#search-close");
//   TempSearchTwo.addEventListener("click", () => {
//     voidSearch.hidden = true;
//     elasticBox.classList.remove("elasticBig");
//     let elasticItems = document.querySelectorAll(".elastic a");
//     elasticItems.forEach(function (elem) {
//       elem.classList.add("hide");
//     });
//   });
// });

// // Данные троп из второго файла
// const trailsData = [
//     { name: "Танцующий лес", url: "/catalog/kaliningradskaya-oblast/tancuyushchij-les/" },
//     { name: "Высота Эфа", url: "/catalog/kaliningradskaya-oblast/vysota-efa/" },
//     { name: "Долина Нарзанов", url: "/catalog/kabardino-balkariya/dolina-narzanov/" },
//     { name: "Экотропа PlesActive", url: "/catalog/tambovskaya-oblast/ples-active/" },
//     { name: "В гостях у серой цапли", url: "/catalog/yaroslavskaya-oblast/v-gostyah-u-seroy-tsapli/" },
//     { name: "Лиственничная роща", url: "/catalog/lenoblast/listvennichnaya-roscha/" },
//     { name: "В гармонии с природой", url: "/catalog/moskva/v-garmonii-s-prirodoy/" },
//     { name: "Вдоль реки Чермянки", url: "/catalog/moskva/chermyanka/" },
//     { name: "Экотропа Абрау-Дюрсо", url: "/catalog/krasnodarsky-krai/abrau-durso/" },
//     { name: "Терренкур Маркотх", url: "/catalog/krasnodarsky-krai/terrenkur-markoth/" },
//     { name: "В парке Швейцария", url: "/catalog/nizhegorodskaya-oblast/v-parke-shveitsaria/" },
//     { name: "Природа Чувств", url: "/catalog/yaroslavskaya-oblast/priroda-chuvstv/" },
//     { name: "Тропа Сказок", url: "/catalog/yaroslavskaya-oblast/tropa-skazok/" },
//     { name: "На террасах Воробьёвых гор", url: "/catalog/moskva/na-terrasah-vorobiovyh-gor/" },
//     { name: "К Андреевским прудам", url: "/catalog/moskva/k-andreevskim-prudam/" },
//     { name: "В пойме реки Шмелёвки", url: "/catalog/moskva/shmelevka/" },
//     { name: "Бурнаковская экотропа", url: "/catalog/nizhegorodskaya-oblast/burnakovskaya/" },
//     { name: "Тропа здоровья Роза Хутор", url: "/catalog/krasnodarsky-krai/tropa-zdoroviya-rh/" },
//     { name: "Солнечная тропа", url: "/catalog/krym/solnechnaya-tropa/" },
//     { name: "Трын-тропа", url: "/catalog/lenoblast/tryn-tropa/" },
//     { name: "Бугаиная тропа", url: "/catalog/lenoblast/bugainaya-tropa/" },
//     { name: "У Лукоморья", url: "/catalog/lenoblast/u-lukomoriya/" },
//     { name: "В парке Монрепо", url: "/catalog/lenoblast/monrepo/" },
//     { name: "На гору Железная", url: "/catalog/stavropolsky-krai/na-goru-zheleznaya/" },
//     { name: "Комаровский Берег", url: "/catalog/lenoblast/komarovsky-bereg/" },
//     { name: "Лесная Тропа", url: "/catalog/lenoblast/lesnaya-tropa/" },
//     { name: "Юкковские камы", url: "/catalog/lenoblast/yukkovskie-kamy/" },
//     { name: "Тропа здоровья Сокольники", url: "/catalog/moskva/tropa-zdorovia-sokolniki/" },
//     { name: "Еловые холмы", url: "/catalog/lenoblast/elovye-holmy/" },
//     { name: "Тропа Голицына", url: "/catalog/krym/tropa-golicyna/" },
//     { name: "К леднику Безенги", url: "/catalog/kabardino-balkariya/k-ledniku-bezengi/" },
//     { name: "Экотропа Фиалка", url: "/catalog/krasnodarsky-krai/ecotropa-fialka/" },
//     { name: "Экотропа Горизонт", url: "/catalog/krasnodarsky-krai/ecotropa-gorizont/" },
//     { name: "Экотропа Крокус", url: "/catalog/krasnodarsky-krai/ecotropa-krokus/" },
//     { name: "Дудергофские Высоты", url: "/catalog/lenoblast/dudergofskie-vysoty/" },
//     { name: "Сестрорецкое болото", url: "/catalog/lenoblast/sestroreckoe-boloto/" },
//     { name: "Раковые озёра", url: "/catalog/lenoblast/rakovye-ozyora/" },
//     { name: "Западный Котлин", url: "/catalog/lenoblast/zapadniy-kotlin/" },
//     { name: "Воздушная экотропа", url: "/catalog/moskva/vozdushnaya-ecotropa/" },
//     { name: "Тропарёвская экотропа", url: "/catalog/moskva/troparevskaya-ecotropa/" },
//     { name: "У озера Бездонное", url: "/catalog/moskva/ecotropa-u-ozera-bezdonnoe/" },
// ];

// // Инициализация троп из второго файла
// document.addEventListener("DOMContentLoaded", function () {
//     const elasticContainer = document.getElementById("elasticId");
//     trailsData.forEach(trail => {
//         const searchItem = document.createElement("a");
//         searchItem.classList.add("Searchlist");
//         searchItem.setAttribute("href", trail.url);
//         searchItem.setAttribute("hidden", true);
//         searchItem.textContent = trail.name;

//         elasticContainer.appendChild(searchItem);
//     });
// });

// // Инициализация из первого файла
// initializeStyles();


