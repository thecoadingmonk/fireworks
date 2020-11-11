const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
}

addEventListener("resize", function () {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  init();
});

const gravity = 0.05;
const friction = 0.99;

class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;

    this.draw = function () {
      c.save();
      c.globalAlpha = this.alpha;
      c.beginPath();
      c.arc(this.x, this.y, radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.closePath()
      c.restore();
    };

    this.update = function () {
      this.draw();
      this.velocity.x *= friction;
      this.velocity.y *= friction;
      this.velocity.y += gravity;
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.alpha -= 0.005;
    };
  }
}

let particles = [];
const particleCount = 400;
const power = 15;

const angleIncrement = Math.PI * 2 / particleCount;

function init() {
    mouse = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height / 2,
    }
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(mouse.x, mouse.y, 5, `hsl(${Math.random() * 360}, 50%, 50%)`, {
        x: Math.cos(angleIncrement * i) * Math.random() * power,
        y: Math.sin(angleIncrement * i) * Math.random() * power,
    }))
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = 'rgba(0, 0, 0, 0.05)'
  c.fillRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < particles.length; i++) {
      if(particles[i].alpha > 0){
          particles[i].update();
      } else {
          particles.slice(i, 1);
      }
  }
}

init();
animate();

addEventListener("click", function (event) {

  mouse.x = event.clientX;
  mouse.y = event.clientY;

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(mouse.x, mouse.y, 5, `hsl(${Math.random() * 360}, 50%, 50%)`, {
        x: Math.cos(angleIncrement * i) * Math.random() * power,
        y: Math.sin(angleIncrement * i) * Math.random() * power,
    }))
  }
});

setInterval(() => init(), 5000);