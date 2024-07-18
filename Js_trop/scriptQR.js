let btns = document.querySelectorAll("*[data-modal-btnQR]");
for ( let i = 0; i<btns.length; i++) {
    btns[i].addEventListener('click',function() {
        let name = btns[i].getAttribute('data-modal-btnQR');
        let modal = document.querySelector("[data-modal-windowQR='"+name+"']");
        modal.style.display = "block";
        let close = modal.querySelector(".close_modal_window");
        close.addEventListener('click',function() {
            modal.style.display = "none";
        })
    })
}

window.onclick = function(e) {
    if (e.target.hasAttribute('data-modal-windowQR')) {
        let modals = document.querySelectorAll("*[data-modal-windowQR]");
    for (let i = 0; i< modals.length; i++) {
        modals[i].style.display = "none";
    }
  }
}
