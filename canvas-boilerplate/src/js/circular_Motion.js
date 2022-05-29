// ==================== Canvas boilerplate code ====================

import utils, { randomIntFromRange } from "./utils";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = ["#00bdff", "#4d39ce", "#088eff"];

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Objects
function Particle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.radians = Math.random() * Math.PI * 2;
  this.velocity = 0.05;
  this.distanceFromCenter = utils.randomIntFromRange(150, 220);
  this.lastMouse = { x: x, y: y };

  this.update = () => {
    const lastPoint = {
      x: this.x,
      y: this.y,
    };

    // move points over time
    this.radians += this.velocity / 2;

    // drag effect
    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

    // circular Motion
    this.x =
      this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter * 0.7;
    this.y =
      this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter * 0.2;
    this.draw(lastPoint);

  };

  this.draw = (lastPoint) => {
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPoint.x, lastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath();

  };
}

// Implementation


let particles;
function init() {
  particles = [];

  const radius = Math.random() * 2 + 1;

  for (let i = 0; i < 150; i++) {
    particles.push(
      new Particle(
        canvas.width / 2,
        canvas.height / 2,
        radius,
        utils.randomColor(colors)
      )
    );
  }

  // fun click events

  canvas.addEventListener("click", (e) => {
    particles.forEach((particle) => {
      if (e.shiftKey) {
        particle.velocity = 0.05;
        particle.distanceFromCenter = randomIntFromRange(400, 700);
      } else if(e.ctrlKey){
        particle.distanceFromCenter = randomIntFromRange(150, 220);
      } 
      else {
        particle.velocity += 0.01;
      }
    });
  });

  console.log(particles);
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);


  particles.forEach((particle) => {
    particle.update();
  });
}

init();
animate();
