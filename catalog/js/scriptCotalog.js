// let pageState = 0;

// Переход по страницам при помощи кнопок назад и вперед
// window.addEventListener("popstate", function (event) {
//   if (event.state && event.state.pageId <= pageState) {
//     console.log("Going back...");
//     location.reload();

//     pageState = event.state.pageId;
//   } else if (event.state && event.state.pageId >= pageState) {
//     console.log("Going forward...");
//     location.reload();
//     pageState = event.state.pageId;
//   }
// });

// document.addEventListener("click", function (event) {
//   if (event.target.tagName === "A") {
//     if (event.target.href !== window.location.href) {
//       console.log("Navigating to a new page...");
//       pageState++;
//       history.pushState({ pageId: pageState }, "", event.target.href);
//     } else {
//       console.log("Navigating within the same page...");
//     }
//   }
// });

addEventListener("load", () => {
  const swicthBtn = document.querySelector(".switch-btn");
  const switchList = document.querySelector(".switch-list-icon");
  const switchMap = document.querySelector(".switch-map-icon");
  const mapPath = document.querySelector(".map-path");
  const listPath = document.querySelector(".list-path");
  const colorSwitchText1 = document.querySelector(".switch-btn-text");
  const colorSwitchText2 = document.querySelector(".switch-btn-text2");

  switchList.addEventListener("click", (e) => {
    swicthBtn.classList.remove("switch-map");
    swicthBtn.classList.add("switch-list");
    mapPath.setAttribute("fill", "black");
    listPath.setAttribute("stroke", "white");
    colorSwitchText2.style.color = "black";
    colorSwitchText1.style.color = "white";
  });

  switchMap.addEventListener("click", (e) => {
    swicthBtn.classList.remove("switch-list");
    swicthBtn.classList.add("switch-map");
    mapPath.setAttribute("fill", "white");
    listPath.setAttribute("stroke", "black");
    colorSwitchText1.style.color = "black";
    colorSwitchText2.style.color = "white";
    // location = "mappage.html";
    location.pathname = "/catalog/mappage.html";
    const CotColor = document.querySelectorAll(".cotalog-color");
    CotColor[1].style.fill = "black";
    CotColor[0].style.fill = "black";
    document.querySelector(
      ".container-location"
    ).innerHTML = `<img class="icon-header" style="width:31px;height:31px"  src="/img/map-orange.svg"
   alt="location"><div class="line-location"></div>`;
    $(".line-location").css("background-color", "#F28123");
  });
});

document.querySelector(".container-location").addEventListener("click", () => {
  location.pathname = "/catalog/mappage.html";
//   document.querySelector(
//     ".container-location"
//   ).innerHTML = `<img class="icon-header" style="width:31px;height:31px"  src="/img/map-orange.svg"
//   alt="location"><div class="line-location"></div>`;
//   $(".line-location").css("background-color", "#F28123");
});
// const scripts = document.querySelectorAll('#innerScriptMap')
// for(let i =0;i<scripts.length;i++){
//   scripts[i].removeAttribute('src')
// }
if (window.pageYOffset > 85) {
  document.querySelector(".title").hidden = true;
  document.querySelector("#back-scroll").hidden = false;
  document
    .querySelector(".upper_cotalog")
    .classList.add("upper_cotalog_scroll");
}
if (window.pageYOffset < 85) {
  document.querySelector(".title").hidden = false;
  document.querySelector("#back-scroll").hidden = true;
  document
    .querySelector(".upper_cotalog")
    .classList.remove("upper_cotalog_scroll");
}
window.onscroll = function ScrollOther() {
  y = window.pageYOffset;
  if (y > 85) {
    document.querySelector(".title").hidden = true;
    document.querySelector("#back-scroll").hidden = false;
    document
      .querySelector(".upper_cotalog")
      .classList.add("upper_cotalog_scroll");
  }
  if (y < 85 || y === 0) {
    document.querySelector(".title").hidden = false;
    document.querySelector("#back-scroll").hidden = true;
    document
      .querySelector(".upper_cotalog")
      .classList.remove("upper_cotalog_scroll");
  }
};

// async function loadItems(start = 0, count = 8) {
//   const response = await fetch(
//     `https://jsonplaceholder.typicode.com/users?start=${start}&count=${count}`
//   );
//   if (response.ok) {
//     const items = await response.json();
//     const itemList = document.querySelector(".catalog-items");
//     items.forEach((item) => {
//       const itemCard = document.createElement("figure");
//       itemCard.classList.add("catalog-item");
//       itemCard.innerHTML = `<img src="img/trail-image.png" alt="Экотропа" class="trail-img"><figcaption class="trail-info">
//         <a href="#" class="trail-title-link">
//             <h2 id ="color-letters-cot" class="black-color size-card-elem-h2" title="Комаровский берег">${item.name}</h2>
//         </a>
//         <a href="#" id="trail-location" class="trail-location-black" title="Ленинградская область, г. Сестрорецк">
//             <p id ="color-letters-cot" class="black-color size-card-elem-p">${item.name}</p>
//         </a>
//         <div class="trail-spec">
//             <a href="#" class="trail-distance">
//             <div class="img-card-color">
//                 <img src="img/dist-orange.svg" alt="Длина тропы">
//                 </div>
//                 <p id ="color-letters-cot" class="black-color">${item.id}</p>
//             </a>
//             <a href="#" class="trail-difficulty">
//             <div class="img-card-color">
//                 <img src="img/difficulty-black.svg" alt="Сложность тропы">
//                 </div>
//                 <p id ="color-letters-cot" class="black-color">Простая</p>
//             </a>
//             <a href="#" class="trail-duration">
//             <div class="img-card-color">
//                 <img src="img/duration-orange.svg" alt="Длительность тропы">
//                </div>
//                 <p id ="color-letters-cot" class="black-color">${item.name}</p>
//             </a>
//         </div>
//     </figcaption>`;
//       itemList.appendChild(itemCard);
//     });
//   } else {
//     console.log(`Ошибка http ${response.status}`);
//   }
// }
// loadItems();

// setTimeout(() => {
const catalogCard = document.querySelectorAll(".catalog-item");
for (let j = 0; j < catalogCard.length; j++) {
  let cardColor = catalogCard[j].querySelectorAll("#color-letters-cot");
  let cardImgColor = catalogCard[j].querySelectorAll(".img-card-color");
  let difficulty_easy = catalogCard[j].querySelector("#easy");
  let difficulty_medium = catalogCard[j].querySelector("#medium");
  let difficulty_hard = catalogCard[j].querySelector("#hard");
  let cardImgLocation = catalogCard[j].querySelector("#trail-location");
  catalogCard[j].onmouseenter = function () {
    catalogCard[j].classList.add("catalog-item-orange");
    catalogCard[j].classList.remove("catalog-item-white");
    for (let i = 0; i < cardColor.length; i++) {
      cardColor[i].classList.remove("black-color");
      cardColor[i].classList.add("white-color");
    }
    cardImgLocation.classList.remove("trail-location-black");
    cardImgLocation.classList.add("trail-location-white");
    cardImgColor[0].innerHTML =
      '<img src="/img/dist-white.svg" alt="Длина тропы">';
    cardImgColor[2].innerHTML =
      '<img src="/img/duration-white.svg" alt="Длительность тропы">';
    if (difficulty_easy !== null)
      difficulty_easy.innerHTML =
        '<img src="/img/difficulty-white.svg" alt="Сложность тропы">';
    if (difficulty_medium !== null)
      difficulty_medium.innerHTML =
        '<img src="/img/difficulty-medium-white.svg" alt="Сложность тропы">';
    if (difficulty_hard !== null)
      difficulty_hard.innerHTML =
        '<img src="/img/difficulty-hard-white.svg" alt="Сложность тропы">';
  };
}
// }, 200);

// setTimeout(() => {
for (let j = 0; j < catalogCard.length; j++) {
  let cardColor = catalogCard[j].querySelectorAll("#color-letters-cot");
  let cardImgColor = catalogCard[j].querySelectorAll(".img-card-color");
  let difficulty_easy = catalogCard[j].querySelector("#easy");
  let difficulty_medium = catalogCard[j].querySelector("#medium");
  let difficulty_hard = catalogCard[j].querySelector("#hard");
  let cardImgLocation = catalogCard[j].querySelector("#trail-location");
  catalogCard[j].onmouseleave = function () {
    catalogCard[j].classList.remove("catalog-item-orange");
    catalogCard[j].classList.add("catalog-item-white");
    for (let i = 0; i < cardColor.length; i++) {
      cardColor[i].classList.add("black-color");
      cardColor[i].classList.remove("white-color");
    }
    cardImgLocation.classList.add("trail-location-black");
    cardImgLocation.classList.remove("trail-location-white");
    cardImgColor[0].innerHTML =
      '<img src="/img/dist-orange.svg" alt="Длина тропы">';
    cardImgColor[2].innerHTML =
      '<img src="/img/duration-orange.svg" alt="Длительность тропы">';
    if (difficulty_easy !== null)
      difficulty_easy.innerHTML =
        '<img src="/img/difficulty-easy.svg" alt="Сложность тропы">';
    if (difficulty_medium !== null)
      difficulty_medium.innerHTML =
        '<img src="/img/difficulty-medium.svg" alt="Сложность тропы">';
    if (difficulty_hard !== null)
      difficulty_hard.innerHTML =
        '<img src="/img/difficulty-hard.svg" alt="Сложность тропы">';
  };
}
// }, 200);

// document.querySelector("#VDNH").addEventListener("click", () => {
//   location.pathname = "/vozdushnaya-tropa/";
// });
// document.querySelector("#Golisyn").addEventListener("click", () => {
//   location.pathname = "/tropa-golicyna/";
// });
// document.querySelector("#Bezengi").addEventListener("click", () => {
//   location.pathname = "/k-ledniku-bezengi/";
// });
// document.querySelector("#Dudergov").addEventListener("click", () => {
//   location.pathname = "/dudergofskie-vysoty/";
// });
// document.querySelector("#Sestroleckoe").addEventListener("click", () => {
//   location.pathname = "/sestroreckoe-boloto/";
// });
// document.querySelector("#Rakov").addEventListener("click", () => {
//   location.pathname = "/rakovye-ozyora/";
// });
// document.querySelector("#Solnechnaya").addEventListener("click", () => {
//   location.pathname = "catalog/krym/solnechnaya-tropa";
// });
// document.querySelector("#Big_Sevas").addEventListener("click", () => {
//   location.pathname = "/bolshaya-sevastopolskaya-tropa";
// });
// document.querySelector("#Toksovskye").addEventListener("click", () => {
//   location.pathname = "/toksovskie-vysoty";
// });
// document.querySelector("#Troparevo").addEventListener("click", () => {
//   location.pathname = "catalog/troparevskaya-ecotropa/";
// });
// document.querySelector("#Fialka").addEventListener("click", () => {
//   location.pathname = "catalog/krasnodarsky-krai/ecotropa-fialka/";
// });
// document.querySelector("#Gorizont").addEventListener("click", () => {
//   location.pathname = "catalog/krasnodarsky-krai/ecotropa-gorizont/";
// });
// document.querySelector("#Krokus").addEventListener("click", () => {
//   location.pathname = "catalog/krasnodarsky-krai/ecotropa-krokus/";
// });
// document.querySelector("#Bezdonnoe").addEventListener("click", () => {
//   location.pathname = "catalog/ecotropa-u-ozera-bezdonnoe/";
// });
// document.querySelector("#ZapKotlin").addEventListener("click", () => {
//   location.pathname = "catalog/lenoblast/zapadniy-kotlin/";
// });
// document.querySelector("#Sokolniki").addEventListener("click", () => {
//   location.pathname = "catalog/moskva/tropa-zdorovia-sokolniki/";
// });
// document.querySelector("#Yukki").addEventListener("click", () => {
//   location.pathname = "catalog/lenoblast/yukkovskie-kamy/";
// });
// document.querySelector("#LesnayaTropa").addEventListener("click", () => {
//   location.pathname = "catalog/lenoblast/lesnaya-tropa/";
// });
// document.querySelector("#Komarovsky").addEventListener("click", () => {
//   location.pathname = "catalog/lenoblast/komarovsky-bereg/";
// });
// document.querySelector("#Zheleznaya").addEventListener("click", () => {
//   location.pathname = "catalog/stavropolsky-krai/na-goru-zheleznaya/";
// });
// document.querySelector("#Monrepo").addEventListener("click", () => {
//   location.pathname = "catalog/lenoblast/monrepo/";
// });
// document.querySelector("#Lukomorie").addEventListener("click", () => {
//   location.pathname = "catalog/lenoblast/u-lukomoriya/";
// });
// document.querySelector("#BugainaTropa").addEventListener("click", () => {
//   location.pathname = "catalog/lenoblast/bugainaya-tropa/";
// });
// document.querySelector("#TrynTropa").addEventListener("click", () => {
//   location.pathname = "catalog/lenoblast/tryn-tropa/";
// });
// document.querySelector("#ZdoroviaRH").addEventListener("click", () => {
//   location.pathname = "catalog/krasnodarsky-krai/tropa-zdoroviya-rh/";
// });
// document.querySelector("#Burnakovskaya").addEventListener("click", () => {
//   location.pathname = "catalog/nizhegorodskaya-oblast/burnakovskaya/";
// });
// document.querySelector("#Shmelevka").addEventListener("click", () => {
//   location.pathname = "catalog/moskva/shmelevka/";
// });



//  window.addEventListener('scroll', async ()=>{
//   console.log('hi')
//    const {scrollTop,scrollHeight, clientHeight} = document.documentElement;
//    if(scrollTop + clientHeight >= scrollHeight - 5 && document.querySelectorAll('.catalog-item').length < MAX_ITEMS);{
//     const start = document.querySelectorAll('.catalog-item').length;
//     await loadItems(start,8);
//    }
//    loadItems()
// });

// var loadItems = function(){
//   $.ajax({
//     url:'https://jsonplaceholder.typicode.com/posts',
//     type:'GET',
//     success: function(response){
//       var items = response.items;
//       var $itemList = $('.catalog-items');
//     items.forEach(function(item){
//       var $itemCard = $('<div class="item-card"></div>');
//       $itemCard.append('<h2>'+item.title+'</h2>');
//       $itemCard.append('<p>'+item.body+'</p>');
//       $itemList.append($itemCard);
//     })

//     }});
//     }
// var loadItems = async () =>{
//   try{
//     const response =await fetch('https://jsonplaceholder.typicode.com/posts');
//     const items = await response.json();
//     const itemList = document.querySelector('.catalog-items');

//     items.forEach(item => {
//       const itemCard = document.createElement('div');
//       itemCard.classList.add('item-card');
//       itemCard.innerHTML = `<h2>${item.name}
//                             <p>${item.description}`;
//       itemList.appendChild(itemCard);
//     });
//   } catch (error){
//     console.error('Ошибка загрузки элементов',error);
//   }
// }
