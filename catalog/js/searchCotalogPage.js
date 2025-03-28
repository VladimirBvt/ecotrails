//Стилизация

const search = document.querySelector("#search");
const contSearchElement = document.querySelector('#cont-search');
const Search = document.querySelector("#search");
const headerTwo = document.querySelector("header");
const voidSearch = document.querySelector("#VoidSearch");
const elasticBox = document.querySelector("#elasticId");

search.addEventListener("click", () => {
  // Скрытие меню при закрытии поиска
  if ($(window).width() <= 1024) {
    $(".center-navigation").css("display", "none");
  }

  // Скрытие хедера при закрытии поиска
  if ($(window).width() <= 480) {
    $(".logo-header").css("display", "none");
    $(".container-location").css("display", "none");
    $(".icon-href-cotalog").css("display", "none");
  }
  document.querySelector("#search").hidden = true;
  contSearchElement.style.display = 'flex';
  document.querySelector(".otstup-icon-search").hidden = false;
  // document.querySelector(".line-location").hidden = true;

  const TempSearch = document.querySelector("#search-close");
  TempSearch.addEventListener("click", () => {
    // Показ меню при закрытии поиска
    if ($(window).width() <= 1024) {
      $(".center-navigation").css("display", "");
    }
    // Показ хедера при закрытии поиска
    if ($(window).width() <= 480) {
      $(".logo-header").css("display", "");
      $(".container-location").css("display", "");
      $(".icon-href-cotalog").css("display", "");
    }

    contSearchElement.style.display = 'none';
    document.querySelector(".searcharea").value = '';
    document.querySelector("#search").hidden = false;
    document.querySelector(".otstup-icon-search").hidden = true;
  });
});

// Мобильный хедер при ресайзе
window.addEventListener("resize", () => {
  const windowWidth = $(window).width();
  const searchArea = document.querySelector(".searcharea");
  const isSearchVisible = searchArea &&
    getComputedStyle(searchArea).display !== "none" &&
    searchArea.offsetParent !== null;

  if (windowWidth <= 480) {
    if (isSearchVisible) {
      $(".logo-header, .container-location, .icon-href-cotalog").hide();
    }
  } else {
    $(".logo-header, .container-location, .icon-href-cotalog").show();
  }
});

//Функционал

// Позиционирование выпадающего из поиска блока относительно строки поиска
function positionElasticBox() {
  // Получаем размеры и координаты первого блока
  const contSearchElementRect = contSearchElement.getBoundingClientRect();

  // Устанавливаем ширину второго блока равной ширине первого
  elasticBox.style.width = `${contSearchElementRect.width}px`;

  // Позиционируем второй блок относительно первого
  elasticBox.style.top = `${contSearchElementRect.bottom}px`; // Привязка к нижнему краю
  elasticBox.style.left = `${contSearchElementRect.left}px`; // Выравнивание по левой границе
}


Search.addEventListener("click", function Searchinput() {
  console.log(document.querySelector(".searcharea"));
  let k = 0;
  document.querySelector(".searcharea").oninput = function () {
    let val = this.value.trim().toLowerCase(); // Приводим val к нижнему регистру
    let elasticItems = document.querySelectorAll(".elastic a");
    if (val != "") {
      elasticItems.forEach(function (elem) {
        // Приводим текст элемента к нижнему регистру перед поиском
        if (elem.innerText.toLowerCase().search(val) == -1) {
          elem.classList.add("hide");
          elem.removeAttribute("hidden");
          elem.innerHTML = elem.innerText;
        } else {
          k++;
          elem.classList.remove("hide");
          elem.removeAttribute("hidden");
          let str = elem.innerText;
          elem.innerHTML = insertMark(
            str,
            elem.innerText.toLowerCase().search(val), // Также приводим к нижнему регистру здесь
            val.length
          );
        }
      });
      // Изменение парметров взависимости от количества вкладок поиска!
      console.log(k);
      if (k === 0) {
        voidSearch.hidden = false;
        elasticBox.classList.add("elasticBig");
      } else if (k > 0) {
        document.querySelector("#VoidSearch").hidden = true;
        elasticBox.classList.remove("elasticBig");
        elasticBox.style.background = "";
        console.log(window.pageYOffset);
        elasticItems.forEach(function (elem) {
          elasticBox.classList.add("elasticBig");
          elem.classList.add("elemsearch");
          elem.style.background = "transparent";
        });
      }

      k = 0;
    } else {
      document.querySelector("#VoidSearch").hidden = true;
      elasticBox.style.background = "";
      elasticItems.forEach(function (elem) {
        elem.classList.add("hide");
        elasticBox.classList.remove("elasticBig");
        elem.innerHTML = elem.innerText;
      });
    }

    // Позиционируем выпадающий список
    positionElasticBox();
  };

});

// Обработчик изменения размеров окна
window.addEventListener("resize", positionElasticBox);

function insertMark(stringmark, pos, len) {
  return (
    stringmark.slice(0, pos) +
    "<span class ='searchmark'>" +
    stringmark.slice(pos, pos + len) +
    "</span>" +
    stringmark.slice(pos + len)
  );
}

headerTwo.addEventListener("click", (event) => {
  const TempSearchTwo = document.querySelector("#search-close");
  TempSearchTwo.addEventListener("click", () => {
    voidSearch.hidden = true;
    elasticBox.classList.remove("elasticBig");
    let elasticItems = document.querySelectorAll(".elastic a");
    elasticItems.forEach(function (elem) {
      elem.classList.add("hide");
    });
  });
});
