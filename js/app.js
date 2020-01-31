//set timeout function 3s
//set background image to none
//display load-icon none

let loadIcon = document.querySelector(".load-icon");
let kobe = document.querySelector(".kobe");
let wrapper = document.querySelector(".wrapper");
// wrapper.style.display = "none";

function loading() {
  setTimeout(() => {
    loadIcon.style.display = "none";
    kobe.style.display = "none";
    wrapper.style.display = "block";
  }, 3000);
}
