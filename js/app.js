window.onload = function() {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 580;
  canvas.height = 400;

  const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
  };

  // Event Listeners
  addEventListener("mousemove", event => {
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
  });

  function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.update = function() {
      this.draw();
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

  function Rectangle(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;

    this.update = function() {
      this.draw();
    };

    this.draw = function() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.w, this.h);
      ctx.fillStyle = "#000";
    };
  }

  function writeText(text, x, y) {
    ctx.fillStyle = "#fff";
    ctx.font = "16px Georgia";
    ctx.fillText(text, x, y);
    // ctx.fillStyle = "#fff";
    // ctx.font = "30px Georgia";
    // ctx.fillText(time, timePos.x, timePos.y);
  }

  let platform, ball, board, left_rim, right_rim, left_net, right_net;
  function init() {
    platform = new Rectangle(0, 300, 60, 5, "#000");
    ball = new Circle(36, 280, 18, "#ff9d00");
    board = new Rectangle(572, 40, 8, 100, "#888");
    left_rim = new Rectangle(470, 120, 20, 8, "blue");
    left_net = new Rectangle(490, 120, 8, 70, "#fff");
    right_rim = new Rectangle(552, 120, 20, 8, "blue");
    right_net = new Rectangle(544, 120, 8, 70, "#fff");
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
    writeText("X:" + mouse.x + ", Y:" + mouse.y, mouse.x, mouse.y);
    // objects.forEach(object => {
    //  object.update()
    // })
  }

  init();
  animate();

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
  let bar = document.querySelector(".shoot-bar");
  let barVal = bar.getAttribute("value");
  let barMax = bar.getAttribute("max");
  let count = 0;

  window.addEventListener("keypress", function() {
    if (event.code == "KeyQ" && barVal < barMax) {
      bar.setAttribute("value", (count += 5));
    }
  });

  function getDistance(x1, y1, x2, y2) {
    let distance_x = x2 - x1;
    let distance_y = y2 - y1;

    return Math.sqrt(Math.pow(distance_x, 2) + Math.pow(distance_y, 2));
  }

  // powerGaugeBtn.addEventListener("mousedown", function() {
  //   if (barVal < barMax) {
  //     bar.setAttribute("value", (count += 5));
  //   }
  // });
  // alert(window.innerHeight);
};
