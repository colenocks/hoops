import * as projectile from "./projectile.js";
import * as myGlobal from "./global.js";
import * as myObjects from "./objects.js";

const canvas = myGlobal.canvas;
const ctx = myGlobal.ctx;
canvas.width = myGlobal.canvasWidth;
canvas.height = myGlobal.canvasHeight;

window.onload = function() {
  const properties = new projectile.Projectile();

  /* Loading Icon From home Page */
  let loadIcon = document.querySelector(".load-icon");
  let loadingPage = document.querySelector(".loading");
  let wrapper = document.querySelector(".wrapper");
  wrapper.style.display = "none";

  // console.log(rect);
  // console.log(window.scrollY);
  function loadKobe() {
    setTimeout(() => {
      loadIcon.style.display = "none";
      loadingPage.style.display = "none";
      wrapper.style.display = "block";
    }, 3000);
  }

  loadKobe();

  /* Make all buttons large on click */
  let button = document.querySelectorAll("button");
  for (let btn = 0; btn < button.length; btn++) {
    button[btn].onclick = function() {
      button[btn].style.transform = "scale(1.2)";
      setTimeout(() => {
        button[btn].style.transform = "scale(1)";
      }, 100);
    };
  }

  // const controller = document.querySelector(".controller");

  /* Shoot Angle: To control the angle of the ball */
  let meterBoard = document.querySelector(".meter-board span");
  let degree = meterBoard.textContent;
  let stick = document.querySelector(".stick");
  let increaseBtn = document.querySelector(".up");
  let decreaseBtn = document.querySelector(".down");

  // Click the Up button
  increaseBtn.addEventListener("click", function() {
    if (degree < 180) {
      degree++;
      meterBoard.textContent = degree; //update value
    }
  });
  //OR
  // Press the ArrowUp Key
  window.addEventListener("keydown", function() {
    // event.preventDefault();
    if (event.code == "ArrowUp" && degree < 180) {
      degree++;
      meterBoard.textContent = degree; //update value
    }
  });

  // Click the Down button
  decreaseBtn.addEventListener("click", function() {
    if (degree > 0) {
      degree--;
      meterBoard.textContent = degree; //update value
    }
  });
  // OR
  // Press the ArrowDown Key
  window.addEventListener("keydown", function() {
    // event.preventDefault();
    if (event.code == "ArrowDown" && degree > 0) {
      degree--;
      meterBoard.textContent = degree; //update value
    }
  });

  /* Gauging bar: To control Speed of ball */
  let powerUpBtn = document.querySelector(".gaugeUp");
  let powerDownBtn = document.querySelector(".gaugeDown");
  let shootBar = document.querySelector(".shoot-bar");
  let shootBarVal = shootBar.getAttribute("value");
  let shootBarMax = shootBar.getAttribute("max");
  let counter = 0;
  // Increase
  // Press the Q button
  window.addEventListener("keydown", function() {
    // event.preventDefault();
    if (event.code == "KeyQ" && counter < shootBarMax) {
      counter += 1;
      shootBar.setAttribute("value", counter);
    }
  });
  // OR
  // Click the PowerUp button
  powerUpBtn.addEventListener("click", function() {
    if (counter < shootBarMax) {
      counter += 2;
      shootBar.setAttribute("value", counter);
    }
  });
  // Reduce
  // Press the Z button
  window.addEventListener("keydown", function() {
    // event.preventDefault();
    if (event.code == "KeyZ" && counter > 0) {
      counter -= 1;
      shootBar.setAttribute("value", counter);
    }
  });
  // OR
  // Click the PowerDown button
  powerDownBtn.addEventListener("click", function() {
    if (counter > 0) {
      counter = counter - 2;
      shootBar.setAttribute("value", counter);
    }
  });

  class Rectangle {
    constructor(name, x, y, w, h, color) {
      this.name = name;
      this.posx = x;
      this.posy = y;
      this.width = w;
      this.height = h;
      this.xx = this.posx + this.width;
      this.yy = this.posy + this.height;
      // this.color = color;
      this.hitleft = false;
      this.hittop = false;

      this.update = function() {
        this.draw();
        myObjects.objectCollision(ball, this);
      };

      this.draw = function() {
        ctx.fillStyle = color;
        ctx.fillRect(this.posx, this.posy, this.width, this.height);
        ctx.fillStyle = "#000";
      };
    }
  }

  let platform, shadow, ball, board, left_rim, right_rim, left_net, right_net;
  let time = myGlobal.duration;
  let theta;
  let vx; /*  13; */
  let vy; /* 24.8; */

  function init() {
    shadow = new myObjects.Circle(0, 0, "#888");
    platform = new Rectangle("platform", 0, 300, 60, 20, "#000");
    board = new Rectangle("board", 570, 40, 8, 100, "#888");
    left_rim = new Rectangle("left_Rim", 462, 120, 20, 8, "blue");
    right_rim = new Rectangle("right_rim", 544, 120, 20, 8, "blue");
    left_net = new Rectangle("left_net", 482, 120, 8, 100, "#fff");
    right_net = new Rectangle("right_net", 536, 120, 8, 100, "#fff");
    // Draw to canvas
    shadow.draw();
    platform.draw();
    board.draw();
    left_rim.draw();
    right_rim.draw();
    left_net.draw();
    right_net.draw();
    writeText("Time: " + 180, 10, 30);
  }

  function setValues() {
    /* ShootBall */
    //disable controls until vel zero, ball at rest
    // controller.setAttribute("disable", "true");
    let shootValue = shootBar.getAttribute("value");
    // set --velocity angle
    properties.setAngle(degree);
    theta = properties.getAngle();
    console.log("Degree: " + theta);
    console.log("Velocity: " + shootValue);

    // set velocity of ball to powergauge value
    vx = properties.VelocityX(-55, 26);
    vy = properties.VelocityY(-55, 26);

    //set animation to setangle
    // JavaScript animation API
    let meterHand = [
      {
        transform: "rotate(0deg)"
      },
      {
        transform: "rotate(" + -theta + "deg)"
      }
    ];

    let reverse = [
      {
        transform: "rotate(" + -theta + "deg)"
      },
      {
        transform: "rotate(0deg)"
      }
    ];

    stick.animate(meterHand, {
      duration: 200,
      fill: "forwards"
    });

    // if (shootValue > 0) {
    ball = new myObjects.Circle(vx, vy, myGlobal.ballColor);
    vx = 0;
    vy = 0;
    // let speed = 0;
    // shootBar.setAttribute("value", speed);
    // }
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    platform.update();
    board.update();
    left_rim.update();
    right_rim.update();
    left_net.update();
    right_net.update();
    ball.update();

    writeText("Time: " + time, 10, 30);
  }

  function writeText(text, x, y) {
    ctx.fillStyle = "#fff";
    ctx.font = "18px Georgia";
    ctx.fillText(text, x, y);
  }

  let clock = setInterval(() => {
    time--;
    if (time == 0) {
      clearInterval(clock);
      time = "Time up!";
    }
  }, 1000);

  /* GAME STARTS HERE */
  init();
  let shootBtn = document.querySelector(".shoot");
  shootBtn.addEventListener(
    "click",
    function() {
      setValues();

      animate();
    },
    false
  );

  // window.addEventListener(
  //   "keypress",
  //   function() {
  //     if (event.code == "Space") {
  //       setValues();
  //       animate();
  //     }
  //   },
  //   false
  // );
};
