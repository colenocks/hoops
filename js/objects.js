/* -----------GLOBAL SETTINGS------------- */
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 580;
canvas.height = 400;

const gravity = 1;
const friction = 0.99;
/* -------------------------------------- */
class Circle {
  constructor(vx, vy, color) {
    this.x = 36; //ball position x
    this.y = 280; //ball position y
    this.velx = vx;
    this.vely = vy;
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

export { Circle, Rectangle };
