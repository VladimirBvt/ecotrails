const popular = document.querySelector(".header-text-center");
const cotalog = document.querySelector(".header-text-first");
const faq = document.querySelector(".header-text-last");
const header = document.querySelector("header");
const icon_location = document.querySelector(".container-location");
const text_center = document.querySelectorAll("#header-text");
const CotColor = document.querySelectorAll(".icon-cotalog-color");
const search = document.querySelector("#search");

cotalog.addEventListener("mouseover", DispAnimCotal);
function DispAnimCotal() {
  document.querySelector("#animation1").hidden = false;
}
cotalog.addEventListener("mouseout", HiddAnimCot);
function HiddAnimCot() {
  document.querySelector("#animation1").hidden = true;
}

popular.addEventListener("mouseover", DispAnimPop);
function DispAnimPop() {
  document.querySelector("#animation2").hidden = false;
}
popular.addEventListener("mouseout", HiddAnimPop);
function HiddAnimPop() {
  document.querySelector("#animation2").hidden = true;
}

faq.addEventListener("mouseover", DispAnimFAQ);
function DispAnimFAQ() {
  document.querySelector("#animation3").hidden = false;
}
faq.addEventListener("mouseout", HiddAnimFAQ);
function HiddAnimFAQ() {
  document.querySelector("#animation3").hidden = true;
}

// Изменение цвета иконок
// Поиск
// Цвет поиска
let firstSearchStroke = "";

search.addEventListener("mouseover", mouseInAnimSearchIcon);
function mouseInAnimSearchIcon() {
  console.log('Current Color:', firstSearchStroke);
  // Цвет поиска - текущий цвет (белый или черный)
  firstSearchStroke = getComputedStyle(search.querySelector('circle')).stroke; // Позволяет получить именно тот цвет, который видит пользователь
  // Цвет поиска оранжевый
  $(".color-search").css({ stroke: "#f28123" });
}

search.addEventListener("mouseout", mouseOutAnimSearchIcon);
function mouseOutAnimSearchIcon() {
  $(".color-search").css({ stroke: firstSearchStroke });
}

// Иконка карты (линия)
const lineLocation = document.querySelector('.line-location');
let originalLineColor = ""; // Переменная для сохранения исходного цвета линии

icon_location.addEventListener("mouseover", mouseInAnimMapIcon);
// Функция для изменения линии на оранжевую при наведении мыши
function mouseInAnimMapIcon() {
  // Сохраняем текущий цвет линии
  originalLineColor = lineLocation.style.backgroundColor;

  // Меняем линию на оранжевую
  lineLocation.style.backgroundColor = '#F28123';
}

icon_location.addEventListener("mouseout", mouseOutAnimMapIcon);
// Функция для изменения линии на оранжевую при наведении мыши
function mouseOutAnimMapIcon() {
  // Возвращаем исходный цвет линии
  lineLocation.style.backgroundColor = originalLineColor;
}

// 
document.querySelector(".icon-header-cotalog").addEventListener("click", () => {
  CotColor[1].style.fill = "#F28123";
  CotColor[0].style.fill = "#F28123";
});

header.onclick = function UpperFunnction(event) {
  console.log(event.target.tagName, event.target.className);
  if (event.type === "click")
    switch (event.target.className) {
      case "header-text-first": {
        cotalog.style.color = "#F28123";
        popular.style.color = "#ffffff";
        faq.style.color = "#ffffff";
        cotalog.removeEventListener("mouseout", HiddAnimCot);
        HiddAnimFAQ();
        faq.addEventListener("mouseout", HiddAnimFAQ);
        HiddAnimPop();
        popular.addEventListener("mouseout", HiddAnimCot);
        break;
      }
      case "header-text-center": {
        popular.style.color = "#F28123";
        faq.style.color = "#ffffff";
        cotalog.style.color = "#ffffff";
        popular.removeEventListener("mouseout", HiddAnimPop);
        HiddAnimFAQ();
        faq.addEventListener("mouseout", HiddAnimFAQ);
        HiddAnimCot();
        cotalog.addEventListener("mouseout", HiddAnimCot);
        break;
      }
      case "header-text-last": {
        popular.style.color = "#ffffff";
        faq.style.color = "#F28123";
        cotalog.style.color = "#ffffff";
        faq.removeEventListener("mouseout", HiddAnimFAQ);
        HiddAnimPop();
        popular.addEventListener("mouseout", HiddAnimPop);
        HiddAnimCot();
        cotalog.addEventListener("mouseout", HiddAnimCot);
        break;
      }
    }
  if (event.target.className === "logo-picture") {
    popular.style.color = "#ffffff";
    faq.style.color = "#ffffff";
    cotalog.style.color = "#ffffff";
    HiddAnimPop();
    popular.addEventListener("mouseout", HiddAnimPop);
    HiddAnimFAQ();
    faq.addEventListener("mouseout", HiddAnimFAQ);
    HiddAnimCot();
    cotalog.addEventListener("mouseout", HiddAnimCot);
  }
};

var HeighOne = 1200;
var HeighTwo = 1199;
var PartnersHigh = 2340;
var PartnersLow = 1500;
var PopHigh = 1500;
var FaqHigh = 2800;
var FaqLow = 2320;

if ($(window).height() >= 1120 && $(window).height() <= 1180) {
  HeighOne -= 100;
  HeighTwo -= 100;
  PartnersHigh -= 100;
  PartnersLow -= 100;
  PopHigh -= 100;
  FaqHigh -= 100;
  FaqLow -= 100;
}
if ($(window).height() >= 1020 && $(window).height() <= 1080) {
  HeighOne -= 200;
  HeighTwo -= 200;
  PartnersHigh -= 200;
  PartnersLow -= 200;
  PopHigh -= 200;
  FaqHigh -= 200;
  FaqLow -= 200;
}
if ($(window).height() >= 920 && $(window).height() <= 980) {
  HeighOne -= 300;
  HeighTwo -= 300;
  PartnersHigh -= 300;
  PartnersLow -= 300;
  PopHigh -= 300;
  FaqHigh -= 300;
  FaqLow -= 300;
}
if ($(window).height() >= 820 && $(window).height() <= 880) {
  HeighOne -= 400;
  HeighTwo -= 400;
  PartnersHigh -= 400;
  PartnersLow -= 400;
  PopHigh -= 400;
  FaqHigh -= 400;
  FaqLow -= 400;
}
if ($(window).height() >= 720 && $(window).height() <= 780) {
  HeighOne -= 500;
  HeighTwo -= 500;
  PartnersHigh -= 500;
  PartnersLow -= 500;
  PopHigh -= 500;
  FaqHigh -= 500;
  FaqLow -= 500;
}
if ($(window).height() >= 620 && $(window).height() <= 680) {
  HeighOne -= 600;
  HeighTwo -= 600;
  PartnersHigh -= 600;
  PartnersLow -= 600;
  PopHigh -= 600;
  FaqHigh -= 600;
  FaqLow -= 600;
}
if ($(window).height() >= 520 && $(window).height() <= 580) {
  HeighOne -= 700;
  HeighTwo -= 700;
  PartnersHigh -= 700;
  PartnersLow -= 700;
  PopHigh -= 700;
  FaqHigh -= 700;
  FaqLow -= 700;
}

if ($(window).height() >= 420 && $(window).height() <= 480) {
  HeighOne -= 800;
  HeighTwo -= 800;
  PartnersHigh -= 800;
  PartnersLow -= 800;
  PopHigh -= 800;
  FaqHigh -= 800;
  FaqLow -= 800;
}
if ($(window).height() >= 320 && $(window).height() <= 380) {
  HeighOne -= 900;
  HeighTwo -= 900;
  PartnersHigh -= 900;
  PartnersLow -= 900;
  PopHigh -= 900;
  FaqHigh -= 900;
  FaqLow -= 900;
}
if ($(window).height() >= 220 && $(window).height() <= 280) {
  HeighOne -= 1000;
  HeighTwo -= 1000;
  PartnersHigh -= 1000;
  PartnersLow -= 1000;
  PopHigh -= 1000;
  FaqHigh -= 1000;
  FaqLow -= 1000;
}

if ($(window).height() >= 1100 && $(window).height() <= 1119) {
  HeighOne -= 170;
  HeighTwo -= 170;
  PartnersHigh -= 170;
  PartnersLow -= 170;
  PopHigh -= 170;
  FaqHigh -= 100;
  FaqLow -= 100;
}
if ($(window).height() >= 1000 && $(window).height() <= 1019) {
  HeighOne -= 270;
  HeighTwo -= 270;
  PartnersHigh -= 270;
  PartnersLow -= 270;
  PopHigh -= 270;
  FaqHigh -= 200;
  FaqLow -= 200;
}
if ($(window).height() >= 900 && $(window).height() <= 919) {
  HeighOne -= 370;
  HeighTwo -= 370;
  PartnersHigh -= 370;
  PartnersLow -= 370;
  PopHigh -= 370;
  FaqHigh -= 300;
  FaqLow -= 300;
}
if ($(window).height() >= 800 && $(window).height() <= 819) {
  HeighOne -= 470;
  HeighTwo -= 470;
  PartnersHigh -= 470;
  PartnersLow -= 470;
  PopHigh -= 470;
  FaqHigh -= 400;
  FaqLow -= 400;
}
if ($(window).height() >= 700 && $(window).height() <= 719) {
  HeighOne -= 570;
  HeighTwo -= 570;
  PartnersHigh -= 570;
  PartnersLow -= 570;
  PopHigh -= 570;
  FaqHigh -= 500;
  FaqLow -= 500;
}
if ($(window).height() >= 600 && $(window).height() <= 619) {
  HeighOne -= 670;
  HeighTwo -= 670;
  PartnersHigh -= 670;
  PartnersLow -= 670;
  PopHigh -= 670;
  FaqHigh -= 600;
  FaqLow -= 600;
}
if ($(window).height() >= 500 && $(window).height() <= 519) {
  HeighOne -= 770;
  HeighTwo -= 770;
  PartnersHigh -= 770;
  PartnersLow -= 770;
  PopHigh -= 770;
  FaqHigh -= 700;
  FaqLow -= 700;
}
if ($(window).height() >= 400 && $(window).height() <= 419) {
  HeighOne -= 870;
  HeighTwo -= 870;
  PartnersHigh -= 870;
  PartnersLow -= 870;
  PopHigh -= 870;
  FaqHigh -= 800;
  FaqLow -= 800;
}

if (window.pageYOffset < HeighOne || window.pageYOffset === 0) {
  document.querySelector(".line-location").style.background = "white";
  if (window.pageYOffset < HeighOne && window.pageYOffset !== 0) {
    document.querySelector("#opasity-header").removeAttribute("style");
    document
      .querySelector("#opasity-header")
      .classList.add("opasity-header-scroll");
    document
      .querySelector("#opasity-header")
      .classList.remove("opasity-header");
  }
  if (window.pageYOffset === 0 || window.pageYOffset === undefined) {
    document.querySelector("#opasity-header").removeAttribute("style");
    document
      .querySelector("#opasity-header")
      .classList.remove("opasity-header-scroll");
    document.querySelector("#opasity-header").classList.add("opasity-header");
  }

  header.style.background = "transparent";
  document.querySelector(".logo-text").style.color = "white";
  if (document.querySelector("#animation1").hidden === false) {
    text_center[1].style.color = "white";
    text_center[2].style.color = "white";
  }
  if (document.querySelector("#animation2").hidden === false) {
    document.querySelector(".header-text-center").style.color = "#F28123";
    text_center[0].style.color = "white";
    text_center[2].style.color = "white";
  }
  if (document.querySelector("#animation3").hidden === false) {
    document.querySelector(".header-text-last").style.color = "#F28123";
    text_center[0].style.color = "white";
    text_center[1].style.color = "white";
  }
  if (
    document.querySelector("#animation1").hidden === true &&
    document.querySelector("#animation2").hidden === true &&
    document.querySelector("#animation3").hidden === true
  ) {
    for (let i = 0; i < text_center.length; i++) {
      text_center[i].style.color = "white";
    }
  }
  if (window.pageYOffset < HeighOne || window.pageYOffset === 0) {
    document.querySelector(".href-logo").innerHTML =
      '<img class="logo-picture" src="img/Logo-utp.svg" alt="logo-white">';
    icon_location.innerHTML =
      '<img class="icon-header" src="img/map-white.svg" alt="map-bl">';
    CotColor[1].style.fill = "white";
    CotColor[0].style.fill = "white";
  }
}

if (window.pageYOffset >= HeighTwo) {
  document.querySelector(".line-location").style.background = "black";
  header.style.background = "#f3f6ed";
  document.querySelector(".logo-text").style.color = "black";
  if (document.querySelector("#animation1").hidden === false) {
    text_center[1].style.color = "black";
    text_center[2].style.color = "black";
  }
  if (document.querySelector("#animation2").hidden === false) {
    document.querySelector(".header-text-center").style.color = "#F28123";
    text_center[0].style.color = "black";
    text_center[2].style.color = "black";
  }
  if (document.querySelector("#animation3").hidden === false) {
    document.querySelector(".header-text-last").style.color = "#F28123";
    text_center[0].style.color = "black";
    text_center[1].style.color = "black";
  }
  if (
    document.querySelector("#animation1").hidden === true &&
    document.querySelector("#animation2").hidden === true &&
    document.querySelector("#animation3").hidden === true
  ) {
    for (let i = 0; i < text_center.length; i++) {
      text_center[i].style.color = "black";
    }
  }

  // Светляй хедер на главной
  if (window.pageYOffset >= HeighTwo || window.pageYOffset === 0) {
    document.querySelector(".href-logo").innerHTML =
      '<img class="logo-picture" src="img/Logo-other.svg" alt="logo-black">';
    icon_location.innerHTML =
      '<img class="icon-header" src="img/map-black-main.svg" alt="map-bl">';

    CotColor[0].style.fill = "black";
    CotColor[1].style.fill = "black";
  }
}

// Search style start
if (pageYOffset < HeighOne) $(".color-search").css({ stroke: "white" });
else if (pageYOffset >= HeighOne) $(".color-search").css({ stroke: "black" });

search.addEventListener("click", () => {
  let temph = pageYOffset;
  if (temph < HeighOne) {
    if ($(window).width() <= 480) {
      $(".logo-header").css("display", "none");
      $(".container-location").css("display", "none");
      $(".icon-href-cotalog").css("display", "none");
    }
    document.querySelector(".container-search").hidden = true;
    document.querySelector("#icon-navigation").insertAdjacentHTML(
      "beforebegin",
      `<li id="cont-search" class="container-icon-search"><svg class="icon-header search-temp" id="search-temp" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle class="color-search-temp" cx="20" cy="19.999" r="13" stroke="white" stroke-width="2"/>
        <path class="color-search-temp" d="M36 36L29 29" stroke="white" stroke-width="2"/>
        </svg><input class="searcharea" type="text" placeholder="Найти тропу" ><svg class="search-close" id="search-close" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="color-search-temp" d="M32.5 7L7 33.2126M7 7L32.5 33.2126" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </li>`
    );
    $(".center-navigation").css({ "padding-right": "121px" });
    $(".center-navigation").css({ "padding-right": "121px" });
    $(".searcharea").css({
      "border-bottom": "solid 1px white",
      color: "white",
    });
  }
  if (temph >= HeighOne) {
    if ($(window).width() <= 480) {
      $(".logo-header").css("display", "none");
      $(".container-location").css("display", "none");
      $(".icon-href-cotalog").css("display", "none");
    }
    document.querySelector(".container-search").hidden = true;
    document.querySelector("#icon-navigation").insertAdjacentHTML(
      "beforebegin",
      `<li id="cont-search" class="container-icon-search"><svg class="icon-header search-temp" id="search-temp" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle class="color-search-temp" cx="20" cy="19.999" r="13" stroke="black" stroke-width="2"/>
      <path class="color-search-temp" d="M36 36L29 29" stroke="black" stroke-width="2"/>
      </svg><input class="searcharea" style="border-bottom: 1px solid black" type="text" placeholder="Найти тропу" ><svg class="search-close" id="search-close" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path class="color-search-temp" d="M32.5 7L7 33.2126M7 7L32.5 33.2126" stroke="#1F271B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg></li>`
    );
    $(".center-navigation").css({ "padding-right": "121px" });
    $(".searcharea").css({
      "border-bottom": "solid 1px black",
      color: "black",
    });
    // Линия на белом футере на главной
    document.querySelector(".line-location").hidden = true;
  }

  if (temph < HeighOne || temph === 0) {
    let elasticItems = document.querySelectorAll(".elastic a");
    elasticItems.forEach(function (elem) {
      elem.classList.add("SearchlistUp");
      elem.classList.remove("SearchlistBottom");
    });
    $(".color-search").css({ stroke: "white" });
    $(".searcharea").css({
      "border-bottom": "solid 1px white",
      color: "white",
    });
    const tempSearchColor = document.querySelectorAll(".color-search-temp");
    tempSearchColor[0].style.stroke = "white";
    tempSearchColor[1].style.stroke = "white";
    tempSearchColor[2].style.stroke = "white";
  } else if (temph > HeighTwo) {
    let elasticItems = document.querySelectorAll(".elastic a");
    elasticItems.forEach(function (elem) {
      elem.classList.remove("SearchlistUp");
      elem.classList.add("SearchlistBottom");
    });
    $(".color-search").css({ stroke: "black" });
    $(".searcharea").css({
      "border-bottom": "solid 1px black",
      color: "black",
    });
    const tempSearchColor = document.querySelectorAll(".color-search-temp");
    tempSearchColor[0].style.stroke = "black";
    tempSearchColor[1].style.stroke = "black";
    tempSearchColor[2].style.stroke = "black";
  }
});


header.addEventListener("click", () => {
  const TempSearch = document.querySelector("#search-close");
  TempSearch.addEventListener("click", () => {
    document.querySelector("#elasticId").classList.remove("elasticBig");
    if ($(window).width() <= 480) {
      $(".logo-header").css("display", "");
      $(".container-location").css("display", "");
      $(".icon-href-cotalog").css("display", "");
    }
    if ($(window).height() >= HeighOne) {
      document.querySelector(".line-location").hidden = false;
    }
    if ($(window).height() < HeighOne) {
      document.querySelector(".line-location").hidden = false;
      document.querySelector(".line-location").style.background = "white";
    }
    document.querySelector("#cont-search").remove();
    document.querySelector(".container-search").hidden = false;
    $(".center-navigation").css({ "padding-right": "81px" });
  });
});

window.addEventListener("resize", () => {
  if ($(window).width() <= 480) {
    if (document.querySelector(".searcharea") !== null) {
      $(".logo-header").css("display", "none");
      $(".container-location").css("display", "none");
      $(".icon-href-cotalog").css("display", "none");
    }
  }
  if ($(window).width() > 480) {
    $(".logo-header").css("display", "");
    $(".container-location").css("display", "");
    $(".icon-href-cotalog").css("display", "");
  }
});

window.addEventListener("scroll", function SearchTemp() {
  let y = pageYOffset;
  if (y < HeighOne || y === 0) {
    let elasticItems = document.querySelectorAll(".elastic a");
    elasticItems.forEach(function (elem) {
      elem.classList.add("SearchlistUp");
      elem.classList.remove("SearchlistBottom");
    });
    $(".color-search").css({ stroke: "white" });
    $(".searcharea").css({
      "border-bottom": "solid 1px white",
      color: "white",
    });
    const tempSearchColor = document.querySelectorAll(".color-search-temp");
    tempSearchColor[0].style.stroke = "white";
    tempSearchColor[1].style.stroke = "white";
    tempSearchColor[2].style.stroke = "white";
  } else if (y > HeighTwo) {
    let elasticItems = document.querySelectorAll(".elastic a");
    elasticItems.forEach(function (elem) {
      elem.classList.remove("SearchlistUp");
      elem.classList.add("SearchlistBottom");
    });
    $(".color-search").css({ stroke: "black" });
    $(".searcharea").css({
      "border-bottom": "solid 1px black",
      color: "black",
    });
    const tempSearchColor = document.querySelectorAll(".color-search-temp");
    tempSearchColor[0].style.stroke = "black";
    tempSearchColor[1].style.stroke = "black";
    tempSearchColor[2].style.stroke = "black";
  }
});



// Search style end

// Navigation start

console.log($(document).height());

document.querySelector(".container-location").addEventListener("click", () => {
  location.pathname = "/catalog/mappage.html";
});

window.addEventListener("scroll", function ScrollHead() {
  var y = window.pageYOffset;
  console.log(y);
  // В  1-ом if регулировка росстояния от top для смены стиля шапки (полупрозрачной)

  if (y < HeighOne || y === 0) {
    document.querySelector(".line-location").style.background = "white";
    if (y < HeighOne && y !== 0) {
      document.querySelector("#opasity-header").removeAttribute("style");
      document
        .querySelector("#opasity-header")
        .classList.add("opasity-header-scroll");
      document
        .querySelector("#opasity-header")
        .classList.remove("opasity-header");
    }
    if (y === 0 || y === undefined) {
      document.querySelector("#opasity-header").removeAttribute("style");
      document
        .querySelector("#opasity-header")
        .classList.remove("opasity-header-scroll");
      document.querySelector("#opasity-header").classList.add("opasity-header");
    }

    header.style.background = "transparent";
    document.querySelector(".logo-text").style.color = "white";
    if (document.querySelector("#animation1").hidden === false) {
      text_center[1].style.color = "white";
      text_center[2].style.color = "white";
    }
    if (document.querySelector("#animation2").hidden === false) {
      document.querySelector(".header-text-center").style.color = "#F28123";
      text_center[0].style.color = "white";
      text_center[2].style.color = "white";
    }
    if (document.querySelector("#animation3").hidden === false) {
      document.querySelector(".header-text-last").style.color = "#F28123";
      text_center[0].style.color = "white";
      text_center[1].style.color = "white";
    }
    if (
      document.querySelector("#animation1").hidden === true &&
      document.querySelector("#animation2").hidden === true &&
      document.querySelector("#animation3").hidden === true
    ) {
      for (let i = 0; i < text_center.length; i++) {
        text_center[i].style.color = "white";
      }
    }

    header.onclick = function WhiteFunction(event) {
      console.log(event.target.tagName, event.target.className);
      if (event.type === "click")
        switch (event.target.className) {
          case "header-text-first": {
            cotalog.style.color = "#F28123";
            popular.style.color = "#ffffff";
            faq.style.color = "#ffffff";
            cotalog.removeEventListener("mouseout", HiddAnimCot);
            HiddAnimFAQ();
            faq.addEventListener("mouseout", HiddAnimFAQ);
            HiddAnimPop();
            popular.addEventListener("mouseout", HiddAnimCot);
            break;
          }
          case "header-text-center": {
            popular.style.color = "#F28123";
            faq.style.color = "#ffffff";
            cotalog.style.color = "#ffffff";
            popular.removeEventListener("mouseout", HiddAnimPop);
            HiddAnimFAQ();
            faq.addEventListener("mouseout", HiddAnimFAQ);
            HiddAnimCot();
            cotalog.addEventListener("mouseout", HiddAnimCot);
            break;
          }
          case "header-text-last": {
            popular.style.color = "#ffffff";
            faq.style.color = "#F28123";
            cotalog.style.color = "#ffffff";
            faq.removeEventListener("mouseout", HiddAnimFAQ);
            HiddAnimPop();
            popular.addEventListener("mouseout", HiddAnimPop);
            HiddAnimCot();
            cotalog.addEventListener("mouseout", HiddAnimCot);
            break;
          }
        }
      if (event.target.className === "logo-picture") {
        popular.style.color = "#ffffff";
        faq.style.color = "#ffffff";
        cotalog.style.color = "#ffffff";
        HiddAnimPop();
        popular.addEventListener("mouseout", HiddAnimPop);
        HiddAnimFAQ();
        faq.addEventListener("mouseout", HiddAnimFAQ);
        HiddAnimCot();
        cotalog.addEventListener("mouseout", HiddAnimCot);
      }
    };
    if (y < HeighOne || y === 0) {
      document.querySelector(".href-logo").innerHTML =
        '<img class="logo-picture" src="img/Logo-utp.svg" alt="logo-white">';
      icon_location.innerHTML =
        '<img class="icon-header" src="img/map-white.svg" alt="map-bl">';
      CotColor[1].style.fill = "white";
      CotColor[0].style.fill = "white";
    }
  }

  // В  1-ом if регулировка росстояния от top для смены стиля шапки (бежевой)

  if (y >= HeighTwo) {
    document.querySelector(".line-location").style.background = "black";
    header.style.background = "#f3f6ed";
    document.querySelector(".logo-text").style.color = "black";
    if (document.querySelector("#animation1").hidden === false) {
      text_center[1].style.color = "black";
      text_center[2].style.color = "black";
    }
    if (document.querySelector("#animation2").hidden === false) {
      document.querySelector(".header-text-center").style.color = "#F28123";
      text_center[0].style.color = "black";
      text_center[2].style.color = "black";
    }
    if (document.querySelector("#animation3").hidden === false) {
      document.querySelector(".header-text-last").style.color = "#F28123";
      text_center[0].style.color = "black";
      text_center[1].style.color = "black";
    }
    if (
      document.querySelector("#animation1").hidden === true &&
      document.querySelector("#animation2").hidden === true &&
      document.querySelector("#animation3").hidden === true
    ) {
      for (let i = 0; i < text_center.length; i++) {
        text_center[i].style.color = "black";
      }
    }
    header.onclick = function BalckFunction(event) {
      console.log(event.target.tagName, event.target.className);
      if (event.type === "click")
        switch (event.target.className) {
          case "header-text-first": {
            cotalog.style.color = "#F28123";
            popular.style.color = "black";
            faq.style.color = "black";
            cotalog.removeEventListener("mouseout", HiddAnimCot);
            HiddAnimFAQ();
            faq.addEventListener("mouseout", HiddAnimFAQ);
            HiddAnimPop();
            popular.addEventListener("mouseout", HiddAnimCot);
            break;
          }
          case "header-text-center": {
            popular.style.color = "#F28123";
            faq.style.color = "black";
            cotalog.style.color = "black";
            popular.removeEventListener("mouseout", HiddAnimPop);
            HiddAnimFAQ();
            faq.addEventListener("mouseout", HiddAnimFAQ);
            HiddAnimCot();
            cotalog.addEventListener("mouseout", HiddAnimCot);
            break;
          }
          case "header-text-last": {
            popular.style.color = "black";
            faq.style.color = "#F28123";
            cotalog.style.color = "black";
            faq.removeEventListener("mouseout", HiddAnimFAQ);
            HiddAnimPop();
            popular.addEventListener("mouseout", HiddAnimPop);
            HiddAnimCot();
            cotalog.addEventListener("mouseout", HiddAnimCot);
            break;
          }
        }
      if (event.target.className === "logo-picture") {
        popular.style.color = "black";
        faq.style.color = "black";
        cotalog.style.color = "black";
        HiddAnimPop();
        popular.addEventListener("mouseout", HiddAnimPop);
        HiddAnimFAQ();
        faq.addEventListener("mouseout", HiddAnimFAQ);
        HiddAnimCot();
        cotalog.addEventListener("mouseout", HiddAnimCot);
      }
    };

    // Светляй хедер на главной
    if (y >= HeighTwo || y === 0) {
      document.querySelector(".href-logo").innerHTML =
        '<img class="logo-picture" src="img/Logo-other.svg" alt="logo-black">';
      // Замена иконки карты над линией чёрной
      icon_location.innerHTML =
        '<img class="icon-header" src="img/map-black-main.svg" alt="map-bl">';
      CotColor[0].style.fill = "black";
      CotColor[1].style.fill = "black";
    }
  }

  if (y >= HeighTwo && y <= PopHigh) {
    popular.style.color = "#F28123";
    popular.removeEventListener("mouseout", HiddAnimPop);
    document.querySelector("#animation2").hidden = false;
    faq.style.color = "black";
    document.querySelector("#animation3").hidden = true;
    document.querySelector("#animation1").hidden = true;
  } else if (y <= PartnersHigh && y >= PartnersLow) {
    popular.style.color = "black";
    document.querySelector("#animation2").hidden = true;
    popular.addEventListener("mouseout", HiddAnimPop);
    faq.addEventListener("mouseout", HiddAnimFAQ);
    faq.style.color = "black";
    document.querySelector("#animation3").hidden = true;
    document.querySelector("#animation1").hidden = true;
  } else if (y <= HeighOne) {
    popular.style.color = "white";
    document.querySelector("#animation2").hidden = true;
    popular.addEventListener("mouseout", HiddAnimPop);
    faq.addEventListener("mouseout", HiddAnimFAQ);
    faq.style.color = "white";
    document.querySelector("#animation3").hidden = true;
    document.querySelector("#animation1").hidden = true;
  } else if (y >= FaqLow && y <= FaqHigh) {
    faq.style.color = "#F28123";
    faq.removeEventListener("mouseout", HiddAnimFAQ);
    document.querySelector("#animation3").hidden = false;
    popular.style.color = "black";
    document.querySelector("#animation2").hidden = true;
    document.querySelector("#animation1").hidden = true;
  } else if (y >= 10000) {
    faq.style.color = "black";
    popular.addEventListener("mouseout", HiddAnimPop);
    faq.addEventListener("mouseout", HiddAnimFAQ);
    document.querySelector("#animation3").hidden = true;
    document.querySelector("#animation1").hidden = true;
  }
});

// Navigation end


