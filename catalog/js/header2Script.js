const popular = document.querySelector("#popular-cont");
const cotalog = document.querySelector("#cotalog-cont");
const faq = document.querySelector("#FAQ-cont");
const header = document.querySelector("header");
const CotColor = document.querySelectorAll(".icon-cotalog-color");

cotalog.addEventListener("mouseover", DispAnimCotal);
function DispAnimCotal() {
  document.querySelector("#animation1").hidden = false;
}
cotalog.addEventListener("mouseout", HiddAnimCot);
function HiddAnimCot() {
  document.querySelector("#animation1").hidden = true;
}

popular.addEventListener("mouseover", DispAnimPop);
function DispAnimPop() {
  document.querySelector("#animation2").hidden = false;
}
popular.addEventListener("mouseout", HiddAnimPop);
function HiddAnimPop() {
  document.querySelector("#animation2").hidden = true;
}

faq.addEventListener("mouseover", DispAnimFAQ);
function DispAnimFAQ() {
  document.querySelector("#animation3").hidden = false;
}
faq.addEventListener("mouseout", HiddAnimFAQ);
function HiddAnimFAQ() {
  document.querySelector("#animation3").hidden = true;
}

header.onclick = function Test(event) {
  console.log(event.target.className);
  if (event.type === "click")
    switch (event.target.className) {
      case "header-text-first": {
        cotalog.style.color = "#F28123";
        popular.style.color = "#1F271B";
        faq.style.color = "#1F271B";
        cotalog.removeEventListener("mouseout", HiddAnimCot);
        HiddAnimFAQ();
        faq.addEventListener("mouseout", HiddAnimFAQ);
        HiddAnimPop();
        popular.addEventListener("mouseout", HiddAnimCot);

        break;
      }
      case "header-text-center": {
        popular.style.color = "#F28123";
        faq.style.color = "#1F271B";
        cotalog.style.color = "#1F271B";
        popular.removeEventListener("mouseout", HiddAnimPop);
        HiddAnimFAQ();
        faq.addEventListener("mouseout", HiddAnimFAQ);
        HiddAnimCot();
        cotalog.addEventListener("mouseout", HiddAnimCot);

        break;
      }
      case "header-text-last": {
        popular.style.color = "#1F271B";
        faq.style.color = "#F28123";
        cotalog.style.color = "#1F271B";
        faq.removeEventListener("mouseout", HiddAnimFAQ);
        HiddAnimPop();
        popular.addEventListener("mouseout", HiddAnimPop);
        HiddAnimCot();
        cotalog.addEventListener("mouseout", HiddAnimCot);

        break;
      }
    }
  if (event.target.tagName === "logo-picture") {
    popular.style.color = "#1F271B";
    faq.style.color = "#1F271B";
    cotalog.style.color = "#1F271B";
    HiddAnimPop();
    popular.addEventListener("mouseout", HiddAnimPop);
    HiddAnimFAQ();
    faq.addEventListener("mouseout", HiddAnimFAQ);
    HiddAnimCot();
    cotalog.addEventListener("mouseout", HiddAnimCot);
  }
};

document.querySelector(".icon-header-cotalog").addEventListener("click", () => {
  CotColor[1].style.fill = "#F28123";
  CotColor[0].style.fill = "#F28123";
});
