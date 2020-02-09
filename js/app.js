import * as projectile from "./projectile.js";
window.onload = function() {
  const properties = new projectile.Projectile();

  let loadIcon = document.querySelector(".load-icon");
  let kobe = document.querySelector(".kobe");
  let wrapper = document.querySelector(".wrapper");
  // wrapper.style.display = "none";

  let left_rail = document.querySelector(".left-rail");
  let basket = left_rail.getBoundingClientRect();

  // console.log(rect);
  // console.log(window.scrollY);
  function loading() {
    setTimeout(() => {
      loadIcon.style.display = "none";
      kobe.style.display = "none";
      wrapper.style.display = "block";
    }, 3000);
  }
  // loading();

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
  let powerGaugeBtn = document.querySelector(".gauge");
  let shootBar = document.querySelector(".shoot-bar");
  let shootBarVal = shootBar.getAttribute("value");
  let shootBarMax = shootBar.getAttribute("max");
  let count = 0;

  window.addEventListener("keypress", function() {
    if (event.code == "KeyQ" && shootBarVal < shootBarMax) {
      shootBar.setAttribute("value", (count += 5));
    }
  });

  /* -----------GLOBAL SETTINGS------------- */
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 580;
  canvas.height = 400;

  const gravity = 1;
  const friction = 0.99;
  /* ------------------------------------------- */
  class Circle {
    constructor(vx, vy, color) {
      this.x = 36;
      this.y = 280;
      this.velx = vx;
      this.vely = vy;
      this.vel = Math.sqrt(Math.pow(this.velx, 2) + Math.pow(this.vely, 2));
      this.radius = 14;
      this.color = color;
      this.restitution = -0.89;

      this.update = function() {
        this.draw();

        /* ---------Wall Collision---------- */
        // bottom bound / floor
        if (this.y + this.radius >= canvas.height) {
          this.vely *= this.restitution;
          this.y = canvas.height - this.radius;
          this.velx *= friction; // add friction to bring the ball to a stop, when on the floor
        }
        // top bound / ceiling
        if (this.y - this.radius <= 0) {
          this.vely *= this.restitution;
          this.y = this.radius;
          this.velx *= friction;
        }

        // left bound
        if (this.x - this.radius <= 0) {
          this.velx *= this.restitution;
          this.x = this.radius;
        }
        // right bound
        if (this.x + this.radius >= canvas.width) {
          this.velx *= this.restitution;
          this.x = canvas.width - this.radius;
        }

        // reset insignificant amounts to 0
        if (this.velx < 0.01 && this.velx > -0.01) {
          this.velx = 0;
        }
        if (this.vely < 0.01 && this.vely > -0.01) {
          this.vely = 0;
        }

        // //check collision
        // for (let i = 0; i < rim.length; i++) {
        //   collision(ball, rim[i]);
        // }
        // add gravity
        this.vely += gravity;

        // update this position
        this.x += this.velx;
        this.y += this.vely;
      };
      this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = "#000";
        ctx.stroke();
        ctx.closePath();
      };
    }
  }

  class Rectangle {
    constructor(name, x, y, w, h, color) {
      this.name = name;
      this.posx = x;
      this.posy = y;
      this.width = w;
      this.height = h;
      this.xx = this.posx + this.width;
      this.yy = this.posy + this.height;
      this.color = color;
      this.corners = [
        { x: this.posx, y: this.posy },
        { x: this.xx, y: this.posy },
        { x: this.posx, y: this.yy },
        { x: this.xx, y: this.yy }
      ];
      // this.tophit = false;
      // this.lefthit = false;
      // this.righthit = false;
      // this.bottomhit = false;

      this.update = function() {
        this.draw();

        //LEFT
        if (
          ball.x + ball.radius > this.posx &&
          ball.x + ball.radius < this.xx &&
          ball.y > this.posy &&
          ball.y < this.yy
          // !this.righthit
        ) {
          ball.x = this.posx - ball.radius;
          ball.velx = -ball.velx;
          // console.log("left of " + this.name);
          //   this.lefthit = true;
          // } else {
          //   this.lefthit = false;
        }

        //Top
        if (
          ball.y + ball.radius > this.posy &&
          ball.y + ball.radius < this.yy &&
          ball.x > this.posx &&
          ball.x < this.xx
          // !this.bottomhit
        ) {
          ball.y = this.posy - ball.radius;
          ball.vely = -ball.vely;
          // console.log("top of " + this.name);
          //   this.tophit = true;
          // } else {
          //   this.tophit = false;
        }

        //RIGHT
        if (
          ball.x - ball.radius < this.xx &&
          ball.x - ball.radius > this.posx &&
          ball.y > this.posy &&
          ball.y < this.yy
          // !this.lefthit
        ) {
          ball.x = this.xx + ball.radius;
          ball.velx = -ball.velx;
          // console.log("right of " + this.name);
          //   this.righthit = true;
          // } else {
          //   this.righthit = false;
        }

        //Bottom
        if (
          ball.y - ball.radius < this.yy &&
          ball.y - ball.radius > this.posy &&
          ball.x > this.posx &&
          ball.x < this.xx
          // !this.tophit
        ) {
          ball.y = this.yy + ball.radius;
          ball.vely = -ball.vely;
          // console.log("bottom of " + this.name);
          //   this.bottomhit = true;
          // } else {
          //   this.bottomhit = false;
        }
      };

      this.draw = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posx, this.posy, this.width, this.height);
        ctx.fillStyle = "#000";
      };
    }
  }

  let platform, ball, board, left_rim, right_rim, left_net, right_net;
  let vy = 24.8;
  let vx = 13;
  function init() {
    ball = new Circle(vx, vy, "#ff9d00");
    console.log(ball.vel.toFixed(2));
    platform = new Rectangle("platform", 0, 300, 60, 5, "#000");
    board = new Rectangle("board", 570, 40, 8, 100, "#888");
    left_rim = new Rectangle("left_Rim", 462, 120, 20, 8, "blue");
    right_rim = new Rectangle("right_rim", 544, 120, 20, 8, "blue");
    left_net = new Rectangle("left_net", 482, 120, 8, 100, "#fff");
    right_net = new Rectangle("right_net", 536, 120, 8, 100, "#fff");
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    platform.update();
    ball.update();
    board.update();
    left_rim.update();
    right_rim.update();
    left_net.update();
    right_net.update();

    writeText("Time: " + time, 10, 30);
  }

  function writeText(text, x, y) {
    ctx.fillStyle = "#fff";
    ctx.font = "18px Georgia";
    ctx.fillText(text, x, y);
    // ctx.fillStyle = "#fff";
    // ctx.font = "30px Georgia";
    // ctx.fillText(time, timePos.x, timePos.y);
  }

  let time = 180;
  // let displayTime = ;
  let clock = setInterval(() => {
    time--;
    if (time == 0) {
      clearInterval(clock);
      time = "Time up!";
    }
  }, 1000);

  init();
  animate();

  // show me the angle
  let rotation = ((Math.atan2(vy, vx) * 180) / Math.PI).toFixed(2);
  let vAngle = -rotation + "deg";
  console.log(rotation);

  properties.setAngle(vAngle);
  console.log(properties.getAngle());
};
