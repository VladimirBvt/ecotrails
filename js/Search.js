const Search = document.querySelector("#search");
const headerTwo = document.querySelector("header");
const voidSearch = document.querySelector("#VoidSearch");
const elasticBox = document.querySelector("#elasticId");
var HeighOne = 1200;
var HeighTwo = 1199;

if ($(window).height() >= 1120 && $(window).height() <= 1180) {
  HeighOne -= 100;
  HeighTwo -= 100;
}
if ($(window).height() >= 1020 && $(window).height() <= 1080) {
  HeighOne -= 200;
  HeighTwo -= 200;
}
if ($(window).height() >= 920 && $(window).height() <= 980) {
  HeighOne -= 300;
  HeighTwo -= 300;
}
if ($(window).height() >= 820 && $(window).height() <= 880) {
  HeighOne -= 400;
  HeighTwo -= 400;
}
if ($(window).height() >= 720 && $(window).height() <= 780) {
  HeighOne -= 500;
  HeighTwo -= 500;
}
if ($(window).height() >= 620 && $(window).height() <= 680) {
  HeighOne -= 600;
  HeighTwo -= 600;
}
if ($(window).height() >= 520 && $(window).height() <= 580) {
  HeighOne -= 700;
  HeighTwo -= 700;
}

if ($(window).height() >= 420 && $(window).height() <= 480) {
  HeighOne -= 800;
  HeighTwo -= 800;
}
if ($(window).height() >= 320 && $(window).height() <= 380) {
  HeighOne -= 900;
  HeighTwo -= 900;
}
if ($(window).height() >= 220 && $(window).height() <= 280) {
  HeighOne -= 1000;
  HeighTwo -= 1000;
}

if ($(window).height() >= 1100 && $(window).height() <= 1119) {
  HeighOne -= 170;
  HeighTwo -= 170;
}
if ($(window).height() >= 1000 && $(window).height() <= 1019) {
  HeighOne -= 270;
  HeighTwo -= 270;
}
if ($(window).height() >= 900 && $(window).height() <= 919) {
  HeighOne -= 370;
  HeighTwo -= 370;
}
if ($(window).height() >= 800 && $(window).height() <= 819) {
  HeighOne -= 470;
  HeighTwo -= 470;
}
if ($(window).height() >= 700 && $(window).height() <= 719) {
  HeighOne -= 570;
  HeighTwo -= 570;
}
if ($(window).height() >= 600 && $(window).height() <= 619) {
  HeighOne -= 670;
  HeighTwo -= 670;
}
if ($(window).height() >= 500 && $(window).height() <= 519) {
  HeighOne -= 770;
  HeighTwo -= 770;
}
if ($(window).height() >= 400 && $(window).height() <= 419) {
  HeighOne -= 870;
  HeighTwo -= 870;
}

//Поиск

Search.addEventListener("click", function Searchinput() {
  console.log(document.querySelector(".searcharea"));
  let k = 0;
  document.querySelector(".searcharea").oninput = function () {
    let val = this.value.trim().toLowerCase();
    let elasticItems = document.querySelectorAll(".elastic a");
    if (val != "") {
      elasticItems.forEach(function (elem) {
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
            elem.innerText.toLowerCase().search(val),
            val.length
          );
        }
      });
      console.log(k);
      // Изменение парметров взависимости от количества вкладок поиска!
      if (k === 0) {
        voidSearch.hidden = false;
        elasticBox.classList.add("elasticBig");
        if (window.pageYOffset === 0) {
          elasticBox.style.background = "rgba(31, 39, 27, 0.85)";
          voidSearch.style.color = "white";
        }
        if (window.pageYOffset < HeighOne && window.pageYOffset !== 0) {
          elasticBox.style.background = "rgba(31, 39, 27)";
          voidSearch.style.color = "white";
        }
        if (window.pageYOffset > HeighTwo) {
          elasticBox.style.background = "#f3f6ed";
          voidSearch.style.color = "black";
        }
        window.addEventListener("scroll", () => {
          elasticItems.forEach(function (elem) {
            elem.style.background = "transparent";
          });
          if (window.pageYOffset === 0) {
            voidSearch.style.color = "white";
            elasticBox.style.background = "rgba(31, 39, 27, 0.85)";
          }
          if (window.pageYOffset < HeighOne && window.pageYOffset !== 0) {
            voidSearch.style.color = "white";
            elasticBox.style.background = "rgba(31, 39, 27)";
          }
          if (window.pageYOffset > HeighTwo) {
            voidSearch.style.color = "black";
            elasticBox.style.background = "#f3f6ed";
          }
        });
      } else if (k > 0) {
        voidSearch.hidden = true;
        elasticBox.classList.remove("elasticBig");
        elasticBox.style.background = "";
        console.log(window.pageYOffset);
        elasticItems.forEach(function (elem) {
          elasticBox.classList.add("elasticBig");
          elem.classList.add("elemsearch");
          elem.style.background = "transparent";
        });
        if (window.pageYOffset === 0) {
          elasticBox.style.background = "rgba(31, 39, 27, 0.85)";
        }
        if (window.pageYOffset < HeighOne && window.pageYOffset !== 0) {
          elasticBox.style.background = "rgba(31, 39, 27)";
        }
        if (window.pageYOffset > HeighTwo) {
          elasticBox.style.background = "#f3f6ed";
        }
        window.addEventListener("scroll", () => {
          elasticItems.forEach(function (elem) {
            elem.style.background = "transparent";
          });
          if (window.pageYOffset === 0) {
            elasticBox.style.background = "rgba(31, 39, 27, 0.85)";
          }
          if (window.pageYOffset < HeighOne && window.pageYOffset !== 0) {
            elasticBox.style.background = "rgba(31, 39, 27)";
          }
          if (window.pageYOffset > HeighTwo) {
            elasticBox.style.background = "#f3f6ed";
          }
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

  if (window.pageYOffset === 0) {
    if (event.target.className === "searcharea") {
      document
        .querySelector("#opasity-header")
        .classList.add("searcharea-onactive");
    }

    document.querySelector(".searcharea").addEventListener("input", () => {
      if (window.pageYOffset === 0) {
        if (document.querySelector(".searcharea").value !== "") {
          document
            .querySelector("#opasity-header")
            .classList.add("searcharea-onactive");
        }
      }
    });
    document.querySelector(".searcharea").addEventListener("blur", () => {
      if (window.pageYOffset === 0) {
        if (document.querySelector(".searcharea").value === "")
          document
            .querySelector("#opasity-header")
            .classList.remove("searcharea-onactive");
        else
          document
            .querySelector("#opasity-header")
            .classList.add("searcharea-onactive");
      }
    });
  }
});
window.addEventListener("scroll", () => {
  if (window.pageYOffset === 0) {
    if (document.querySelector(".searcharea") !== null) {
      if (document.querySelector(".searcharea").value !== "")
        document
          .querySelector("#opasity-header")
          .classList.add("searcharea-onactive");
    }
  }
  if (window.pageYOffset > 0) {
    document
      .querySelector("#opasity-header")
      .classList.remove("searcharea-onactive");
  }
});
