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
