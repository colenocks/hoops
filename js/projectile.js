/* 
a = -4.9 (0.5 X acc due to gravity(-9.8))
b = initial Velocity
c = displacement
*/
let cssVariables = window.getComputedStyle(document.body);
// let speed = document.querySelector();
const Projectile = function() {};

Projectile.prototype = {
  getAngle: function() {
    return cssVariables.getPropertyValue("--velocity_angle");
  },
  setAngle: function(angle) {
    document.body.style.setProperty("--velocity_angle", angle);
  },

  VelocityX: function(angle, velocity) {
    //CAH
    let velocity_x;
    velocity_x = velocity * Math.cos((angle * Math.PI) / 180);
    return velocity_x;
  },
  VelocityY: function(angle, velocity) {
    //SOH
    let velocity_y;
    velocity_y = velocity * Math.sin((angle * Math.PI) / 180);
    return velocity_y;
  },

  Time: function(a, b, c) {
    let time;
    let roots = [];
    roots.push((-1 * b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a));
    roots.push((-1 * b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a));
    for (let x in roots) {
      if (roots[x] >= 0) {
        time = roots[x];
      }
    }
    return time;
  },

  DistanceVx: function(velocity_x, time) {
    let distance_x = 0;
    distance_x = velocity_x * time;
    return distance_x;
  }
};

// powerGaugeBtn.addEventListener("mousedown", function() {
//   if (barVal < barMax) {
//     bar.setAttribute("value", (count += 5));
//   }
// });
// alert(window.innerHeight);

export { Projectile };
