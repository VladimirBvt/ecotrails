class CookiePopupElement extends HTMLElement {
  constructor() {
    super();
  }

  render() {
    const shadow = this.attachShadow({mode: 'open'});
    const styleHref = this.getAttribute('style-href');

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'cookie');

    const content = document.createElement('div');
    content.setAttribute('class', 'cookie__content');

    const textWrapper = document.createElement('div');
    textWrapper.setAttribute('class', 'cookie__text');
    const textSpan = document.createElement('span')
    textSpan.textContent = 'Пользуясь нашим сайтом, вы соглашаетесь с тем, что ';
    const textLink = document.createElement('a');
    textLink.setAttribute('href', '/policy/');
    textLink.setAttribute('class', 'text-link');
    textLink.textContent = 'мы используем cookies';

    const button = document.createElement('button');
    button.setAttribute('class', 'cookie__button');
    button.textContent = 'OK';

    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", styleHref);

    shadow.appendChild(linkElem);
    shadow.appendChild(wrapper);
    wrapper.appendChild(content);
    content.appendChild(textWrapper);
    content.appendChild(button);
    textWrapper.appendChild(textSpan);
    textWrapper.appendChild(textLink);
  }

  connectedCallback() {
    this.render();

    const cookiePopup = document.querySelector('cookie-popup')?.shadowRoot?.querySelector('.cookie');
    const cookieButton = document.querySelector('cookie-popup')?.shadowRoot?.querySelector('.cookie__button');

    cookieButton?.addEventListener('click', () => {
      cookiePopup.style.display = 'none';

      localStorage.setItem('cookieAccepted', 'true');
      });
  }

  static get observedAttributes() { // (3)
    return ['style-href'];
  }
}

customElements
  .define(
    "cookie-popup"
    ,
    CookiePopupElement
  )
;

const appendCookiePopupElement = () => {
  const footer = document.querySelector('.footer');
  const cookiePopupShadow = document.createElement('cookie-popup');
  cookiePopupShadow.setAttribute('style-href', '/css/cookieStyle.css');

  if (footer) {
    footer.before(cookiePopupShadow)
  }
}

const checkVisibilityCookiePopup = () => {
  const cookiePopup = document.querySelector('cookie-popup')?.shadowRoot?.querySelector('.cookie');
  const isCookieAccepted = localStorage.getItem('cookieAccepted');

  if (isCookieAccepted) {
    cookiePopup.style.display = 'none';
  }
}

const changeStyleCookiePopupToTargetPages = () => {
  const cookiePopup = document.querySelector('cookie-popup')?.shadowRoot?.querySelector('.cookie');
  const className = 'fixed';
  const paths = window.location.pathname.split('/');
  const isMapPage = paths.at(-1).includes('mappage');
  const isNotFoundPage = document.querySelector('head')?.querySelector('title')?.text.includes('не найдена');

  if (isMapPage ||  isNotFoundPage) {
    cookiePopup.classList.add(className);
  }
}

const hiddenCookiePopupIntersectionAds = () => {
  const cookiePopup = document.querySelector('cookie-popup')?.shadowRoot?.querySelector('.cookie');
  const adElement = document.querySelector('.ads');

  const checkIntersection = () => {
    const cookieRect = cookiePopup.getBoundingClientRect();
    const adRect = adElement.getBoundingClientRect();

    // Проверяем пересечение элементов
    const isIntersecting = !(
      cookieRect.top > adRect.bottom || // cookie ниже рекламы
      cookieRect.bottom < adRect.top || // cookie выше рекламы
      cookieRect.right < adRect.left || // cookie левее рекламы
      cookieRect.left > adRect.right    // cookie правее рекламы
    );

    if (isIntersecting) {
      cookiePopup.classList.add('hidden');
    } else {
      cookiePopup.classList.remove('hidden');
    }
  }

  // Вызываем проверку при скролле
  window.addEventListener('scroll', checkIntersection);
  // Также проверяем при изменении размера окна
  window.addEventListener('resize', checkIntersection);
  // Проверяем сразу после загрузки
  checkIntersection();
}

document.addEventListener('DOMContentLoaded', appendCookiePopupElement)
document.addEventListener('DOMContentLoaded', checkVisibilityCookiePopup)
document.addEventListener('DOMContentLoaded', changeStyleCookiePopupToTargetPages)
document.addEventListener('DOMContentLoaded', hiddenCookiePopupIntersectionAds)
