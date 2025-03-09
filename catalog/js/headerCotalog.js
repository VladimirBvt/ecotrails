// Константы для DOM-элементов
const popular = document.querySelector("#popular-cont");
const cotalog = document.querySelector("#cotalog-cont");
const faq = document.querySelector("#FAQ-cont");
const header = document.querySelector("header");
const animation1 = document.querySelector("#animation1");
const animation2 = document.querySelector("#animation2");
const animation3 = document.querySelector("#animation3");
const CotColor = document.querySelectorAll(".cotalog-color");

// Инициализация стилей и анимаций
function initializeStyles() {
  animation1.hidden = false;
  cotalog.style.color = "#F28123";
  CotColor.forEach(el => el.style.fill = "#F28123");
}

// Функции для управления анимациями
function showAnimation(animation) {
  animation.hidden = false;
}

function hideAnimation(animation) {
  animation.hidden = true;
}

// Обработчики событий для популярного раздела
popular.addEventListener("mouseover", () => showAnimation(animation2));
popular.addEventListener("mouseout", () => hideAnimation(animation2));

// Обработчики событий для FAQ
faq.addEventListener("mouseover", () => showAnimation(animation3));
faq.addEventListener("mouseout", () => hideAnimation(animation3));

// Обработчик кликов в header
header.addEventListener("click", (event) => {
  const targetClass = event.target.className;
  const targetTag = event.target.tagName;

  // Сброс стилей и анимаций
  function resetStyles() {
    popular.style.color = "#1F271B";
    faq.style.color = "#1F271B";
    cotalog.style.color = "#1F271B";
    hideAnimation(animation1);
    hideAnimation(animation2);
    hideAnimation(animation3);
  }

  // Обработка кликов
  switch (targetClass) {
    case "header-text-first":
      resetStyles();
      cotalog.style.color = "#F28123";
      CotColor.forEach(el => el.style.fill = "#F28123");
      break;

    case "header-text-center":
      resetStyles();
      popular.style.color = "#F28123";
      break;

    case "header-text-last":
      resetStyles();
      faq.style.color = "#F28123";
      break;
  }

  // Обработка клика на логотип
  if (targetTag === "logo-picture") {
    resetStyles();
  }
});

// Инициализация
initializeStyles();