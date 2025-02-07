function myFunction() {
  let headMenu = document.getElementById("h-menu");
  let hamIcon = document.getElementById("hamburger-icon");

  headMenu.classList.toggle("hidden");
 
  hamIcon.src = (headMenu.classList.contains("hidden")) ? "images/icon-hamburger.svg" : "images/icon-close.svg";

}
