const cookiePopup = document.querySelector('.cookie');
const acceptButton = document.querySelector('.cookie__button');

acceptButton.addEventListener('click', () => {
  cookiePopup.style.display = 'none';

  localStorage.setItem('cookieAccepted', 'true');
});

document.addEventListener('DOMContentLoaded', () => {
  const isCookieAccepted = localStorage.getItem('cookieAccepted');

  if (isCookieAccepted) {
    cookiePopup.style.display = 'none';
  }
});
