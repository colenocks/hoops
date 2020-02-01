//set timeout function 3s
//set background image to none
//display load-icon none

let loadIcon = document.querySelector(".load-icon");
let kobe = document.querySelector(".kobe");
let wrapper = document.querySelector(".wrapper");
// wrapper.style.display = "none";

let rail = document.querySelector(".rail");
let basket = rail.getBoundingClientRect();

// console.log(rect);
// console.log(window.scrollY);
function loading() {
  setTimeout(() => {
    loadIcon.style.display = "none";
    kobe.style.display = "none";
    wrapper.style.display = "block";
  }, 3000);
}

let button = document.querySelectorAll("button");
for (let btn = 0; btn < button.length; btn++) {
  button[btn].onclick = function() {
    button[btn].style.transform = "scale(1.2)";
    setTimeout(() => {
      button[btn].style.transform = "scale(1)";
    }, 100);
  };
}

/* Gauging bar */
let guageBtn = document.querySelector(".gauge");
let bar = document.querySelector(".shoot-bar");
let barVal = bar.getAttribute("value");
let barMax = bar.getAttribute("max");
let count = 0;
guageBtn.onclick = function() {
  if (barVal != barMax) {
    count++;
    bar.setAttribute("value", count);
  }
};
// alert(window.innerHeight);
