//Стилизация

const search = document.querySelector("#search");
const contSearchElement = document.querySelector('#cont-search');
search.addEventListener("click", () => {
  if ($(window).width() <= 480) {
    $(".logo-header").css("display", "none");
    $(".container-location").css("display", "none");
    $(".icon-href-cotalog").css("display", "none");
  }
  document.querySelector("#search").hidden = true;
  contSearchElement.style.display = 'flex';
  // document.querySelector("#icon-navigation").insertAdjacentHTML(
  //   "beforebegin",
  //   `<li id="cont-search" class="container-icon-search">
  //   <svg class="icon-header search-temp" id="search-temp" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  //     <circle class="color-search-temp" cx="20" cy="19.999" r="13" stroke="black" stroke-width="2"/>
  //     <path class="color-search-temp" d="M36 36L29 29" stroke="black" stroke-width="2"/>
  //     </svg>

  //     <input class="searcharea" style="border-bottom: 1px solid black" type="text" placeholder="Найти тропу" >
      
  //     <svg class="search-close" id="search-close" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  //     <path class="color-search-temp" d="M32.5 7L7 33.2126M7 7L32.5 33.2126" stroke="#1F271B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  //     </svg>
  //     </li>`
  // );
  document.querySelector(".otstup-icon-search").hidden = false;
  // document.querySelector(".line-location").hidden = true;

  const TempSearch = document.querySelector("#search-close");
  TempSearch.addEventListener("click", () => {
    if ($(window).width() <= 480) {
      $(".logo-header").css("display", "");
      $(".container-location").css("display", "");
      $(".icon-href-cotalog").css("display", "");
    }
    // document.querySelector("#cont-search").remove();
    contSearchElement.style.display = 'none';
    document.querySelector(".searcharea").value = '';
    document.querySelector("#search").hidden = false;
    document.querySelector(".otstup-icon-search").hidden = true;
    // document.querySelector(".line-location").hidden = false;
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

//Функционал

const Search = document.querySelector("#search");
const headerTwo = document.querySelector("header");
const voidSearch = document.querySelector("#VoidSearch");
const elasticBox = document.querySelector("#elasticId");
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
  };
});
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
