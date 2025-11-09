// Typed.js example for animated text (optional)
var typed = new Typed('.bio', {
    strings: ["I am a coder and businessman, passionate about creating innovative solutions and building projects that make an impact."],
    typeSpeed: 40,
    backSpeed: 20,
    loop: true
});

// Background Animation: gradient with moving clouds and aeroplane
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let clouds = [];
let planes = [];

class Cloud {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height/2;
        this.size = 50 + Math.random() * 100;
        this.speed = 0.2 + Math.random() * 0.5;
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
    update() {
        this.x += this.speed;
        if(this.x - this.size > canvas.width) this.x = -this.size;
        this.draw();
    }
}

class Plane {
    constructor() {
        this.x = -100;
        this.y = 100 + Math.random() * 200;
        this.size = 50;
        this.speed = 2 + Math.random();
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - 30, this.y + 10);
        ctx.lineTo(this.x - 30, this.y - 10);
        ctx.closePath();
        ctx.fill();
    }
    update() {
        this.x += this.speed;
        if(this.x > canvas.width + 50) this.x = -50;
        this.draw();
    }
}

// Initialize clouds and planes
for(let i=0; i<30; i++) clouds.push(new Cloud());
for(let i=0; i<3; i++) planes.push(new Plane());

function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Gradient background
    let gradient = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
    gradient.addColorStop(0,'#2980b9');
    gradient.addColorStop(1,'#8e44ad');
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,canvas.width,canvas.height);

    clouds.forEach(c => c.update());
    planes.forEach(p => p.update());

    requestAnimationFrame(animate);
}

animate();

// Adjust canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
