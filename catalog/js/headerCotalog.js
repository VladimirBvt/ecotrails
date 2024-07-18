const popular = document.querySelector("#popular-cont");
const cotalog = document.querySelector("#cotalog-cont");
const faq = document.querySelector("#FAQ-cont");
const header = document.querySelector("header");

document.querySelector("#animation1").hidden = false;
cotalog.style.color = "#F28123";
const Cot_color = document.querySelectorAll(".cotalog-color");
Cot_color[0].style.fill = "#F28123";
Cot_color[1].style.fill = "#F28123";
document.querySelector("#animation1").hidden = false;
cotalog.style.color = "#F28123";

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
        document.querySelector("#animation1").hidden = true;
        cotalog.style.color = "#F28123";
        popular.style.color = "#1F271B";
        faq.style.color = "#1F271B";
        HiddAnimFAQ();
        faq.addEventListener("mouseout", HiddAnimFAQ);
        HiddAnimPop();
        break;
      }
      case "header-text-center": {
        document.querySelector("#animation1").hidden = true;
        popular.style.color = "#F28123";
        faq.style.color = "#1F271B";
        cotalog.style.color = "#1F271B";
        popular.removeEventListener("mouseout", HiddAnimPop);
        HiddAnimFAQ();
        faq.addEventListener("mouseout", HiddAnimFAQ);
        break;
      }
      case "header-text-last": {
        document.querySelector("#animation1").hidden = true;
        popular.style.color = "#1F271B";
        faq.style.color = "#F28123";
        cotalog.style.color = "#1F271B";
        faq.removeEventListener("mouseout", HiddAnimFAQ);
        HiddAnimPop();
        popular.addEventListener("mouseout", HiddAnimPop);
        break;
      }
    }
  if (event.target.tagName === "logo-picture") {
    document.querySelector("#animation1").hidden = true;
    popular.style.color = "#1F271B";
    faq.style.color = "#1F271B";
    cotalog.style.color = "#1F271B";
    HiddAnimPop();
    popular.addEventListener("mouseout", HiddAnimPop);
    HiddAnimFAQ();
    faq.addEventListener("mouseout", HiddAnimFAQ);
  }
};
