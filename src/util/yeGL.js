
//function when document.getElementById("runaway-btn") is hovered
const button = document.getElementById("runaway-btn");
const cont = document.getElementById("wildBtnCont");

const animateMove = (element, prop, pixels) =>
  anime({
    targets: element,
    [prop]: `${pixels}px`,
    easing: "easeInOutQuad",
  });

["mouseover", "click", "hover"].forEach(function (el) {
//add checking condition here
  button.addEventListener(el, function (event) {
    if(button.classList.contains("text-success")) {
      if(el=="click"){
        alert("congraz but this dose nothing");
        return;
      }
      return;
    }
    else
    {
      let left = getRandomNumber(cont.offsetWidth - this.offsetWidth)+cont.offsetLeft + this.offsetWidth/2;
      if(window.innerWidth > 768) {
        animateMove(this, "left", left).play();
      }
    }
  });
});

const getRandomNumber = (num) => {
  return Math.floor(Math.random() * (num));
};
