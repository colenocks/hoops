/* -----------GLOBAL SETTINGS------------- */
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = 580;
const canvasHeight = 400;
const gravity = 1;
const friction = 0.99;
const startingPosx = 36; //ball position x
const startingPosy = 280; //ball position y
const ballRadius = 14;
const ballColor = "#ff9d00";
const ballCOR = -0.89; //coefficient of restitution
const duration = 180;

export {
  canvas,
  ctx,
  canvasHeight,
  canvasWidth,
  duration,
  gravity,
  friction,
  startingPosx,
  startingPosy,
  ballColor,
  ballCOR,
  ballRadius
};
