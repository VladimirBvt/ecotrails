$(".button-footer").hover(
  function () {
    $(".button-footer").css("background", "#f28123");
    $(".callback-img-color").css("fill", "white");
    $(".button-text").css("color", "white");
  },
  function () {
    $(".button-footer").css("background", "#f3f6ed");
    $(".callback-img-color").css("fill", "black");
    $(".button-text").css("color", "black");
  }
);


// async function loadItems() {
//   const response = await fetch(
//       `https://jsonplaceholder.typicode.com/posts`
//   );
//   if (response.ok) {
//       const items = await response.json();
//       const itemList = document.querySelector(".popular-list");
//       items.forEach((item) => {
//           const itemCard = document.createElement("figure");
//           itemCard.classList.add("popular-item swiper-slide");
//           itemCard.innerHTML = `<img src="img/trail-image.png" alt="Экотропа" class="trail-img"><figcaption class="trail-info">
// <a href="#" class="trail-title-link">
//   <h2 title="Комаровский берег">${item.email}</h2>
// </a>
// <a href="#" class="trail-location" title="Ленинградская область, г. Сестрорецк">
//   <p>${item.id}</p>
// </a>
// <div class="trail-spec">
//   <a href="#" class="trail-distance">
//       <img src="img/dist.svg" alt="Длина тропы">
//       <p>${item.id}</p>
//   </a>
//   <a href="#" class="trail-difficulty">
//       <img src="img/difficulty.svg" alt="Сложность тропы">
//       <p>${item.name}</p>
//   </a>
//   <a href="#" class="trail-duration">
//       <img src="img/duration.svg" alt="Длительность тропы">
//       <p>${item.id}</p>
//   </a>
// </div>
// </figcaption>`;
//           itemList.appendChild(itemCard);
//       });
//   } else {
//       console.log(`Ошибка http ${response.status}`);
//   }
// }
// loadItems();






// const openbut = document.querySelector('.button-footer')
// openbut.addEventListener('click', () =>{
//  document.querySelector('form').hidden = false
// })
// const closebut = document.querySelector('.close-button')
// closebut.addEventListener('click', () =>{
//  document.querySelector('form').hidden = true
// })

// const error = document.querySelector('#send')
// error.addEventListener('click', (event) => {
//     event.preventDefault
//     if (document.querySelector('#e-mail').value === '')
//     {
//       let email = document.querySelector('#e-mail');
//       email.style.border = 'solid red 2px'
//     }
//     if(document.querySelector('#textarea').value === '')
//     {
//       let area = document.querySelector('#textarea');
//       area.style.border = 'solid red 2px'
//     }
//     if(document.querySelector('#checkbox').checked === false)
//     {
//     let check = document.querySelector('#checkbox');
//     }
// })

// const rightarea = document.querySelector('#textarea')
// rightarea.addEventListener('blur', () => { if(document.querySelector('#textarea').value !== '')
//     rightarea.style.border = 'solid black 1px'
// })

// const rightemail = document.querySelector('#e-mail')
// rightemail.addEventListener('blur', () => { if(document.querySelector('#e-mail').value !== '')
//     rightemail.style.border = 'solid black 1px'
// })
