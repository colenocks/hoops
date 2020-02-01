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

// alert(window.innerHeight);
