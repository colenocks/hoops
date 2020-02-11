import * as myGlobal from "./global.js";

const ctx = myGlobal.ctx;
class Circle {
  constructor(vx, vy, color) {
    this.x = myGlobal.startingPosx; //ball position x
    this.y = myGlobal.startingPosy; //ball position y
    this.velx = vx;
    this.vely = vy;
    this.vel = Math.sqrt(Math.pow(this.velx, 2) + Math.pow(this.vely, 2));
    this.radius = myGlobal.ballRadius;
    this.color = color;
    this.restitution = myGlobal.ballCOR;

    this.update = function() {
      this.draw();

      wallCollision(this);
      // reset insignificant amounts to 0
      if (this.velx < 0.01 && this.velx > -0.01) {
        this.velx = 0;
        this.vely = 0;
      }
      if (this.vely < 0.01 && this.vely > -0.01) {
      }

      // add gravity
      this.vely += myGlobal.gravity;
      // when balll is stationary, return to start point
      if (this.velx == 0) {
        this.x = myGlobal.startingPosx;
        this.y = myGlobal.startingPosy;
      } else {
        // update this position
        this.x += this.velx;
        this.y += this.vely;
      }
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
    // this.color = color;
    this.hitleft = false;
    this.hittop = false;

    this.update = function() {
      this.draw();
      objectCollision(ball, this);
    };

    this.draw = function() {
      ctx.fillStyle = color;
      ctx.fillRect(this.posx, this.posy, this.width, this.height);
      ctx.fillStyle = "#000";
    };
  }
}
function wallCollision(ball) {
  /* ---------Wall Collision---------- */
  // left bound
  if (ball.x - ball.radius <= 0) {
    ball.velx *= ball.restitution;
    ball.x = ball.radius;
  }

  // top bound / ceiling
  if (ball.y - ball.radius <= 0) {
    ball.vely *= ball.restitution;
    ball.y = ball.radius;
    ball.velx *= myGlobal.friction;
  }

  // right bound
  if (ball.x + ball.radius >= myGlobal.canvasWidth) {
    ball.velx *= ball.restitution;
    ball.x = myGlobal.canvasWidth - ball.radius;
  }

  // bottom bound / floor
  if (ball.y + ball.radius >= myGlobal.canvasHeight) {
    ball.vely *= ball.restitution;
    ball.y = myGlobal.canvasHeight - ball.radius;
    ball.velx *= myGlobal.friction; // add friction to bring the ball to a stop, when on the floor
  }
}

function objectCollision(ball, rim) {
  //LEFT
  if (
    // ball.x > this.posx &&
    // ball.x < this.xx &&
    ball.x + ball.radius > rim.posx &&
    ball.x + ball.radius < rim.xx &&
    // ball.x > rim.xx &&
    ball.y > rim.posy &&
    ball.y < rim.yy
  ) {
    rim.hitleft = true; //this prevents tunneling thru the left
    ball.x = rim.posx - ball.radius;
    ball.velx = -ball.velx;
  }

  //Top
  if (
    ball.y + ball.radius > rim.posy &&
    ball.y + ball.radius < rim.yy &&
    ball.x > rim.posx &&
    ball.x < rim.xx
  ) {
    rim.hittop = true; //this prevents tunneling thru the top
    ball.y = rim.posy - ball.radius;
    ball.vely = -ball.vely /* * ball.restitution */;
  }

  //RIGHT
  if (
    !rim.hitleft && //this prevents tunneling through right
    ball.x - ball.radius < rim.xx &&
    ball.x - ball.radius > rim.posx &&
    ball.y > rim.posy &&
    ball.y < rim.yy
  ) {
    ball.x = rim.xx + ball.radius;
    ball.velx = -ball.velx;
  }

  //Bottom
  if (
    !rim.hittop && //this prevents tunneling through the bottom
    ball.y - ball.radius < rim.yy &&
    ball.y - ball.radius > rim.posy &&
    ball.x > rim.posx &&
    ball.x < rim.xx
  ) {
    ball.y = rim.yy + ball.radius;
    ball.vely = -ball.vely;
  }
}
export { Circle, Rectangle, objectCollision, wallCollision };

/* Tunneling happens when the velocity/speed of the ball towards an obstacle is much that the ball quickly moves throught the edge and prevents the code engine from detecting the collision on that side

This causes an abnormal/ non realistic movement of the ball off the edge.

Continuous Collision Detection (CCD)
by Jon (Updated on 2015-10-18)
Stencyl
http://www.stencyl.com/help/view/continuous-collision-detection/*/
