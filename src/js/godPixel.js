"use strict"

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const circleFillColor = 'rgba(57, 62, 65, .3)'; //#393e41
const circleStrokeColor = 'rgba(253, 249, 255, .3)'; //#fdf9ff
const lineColor = 'rgba(229, 32, 32, .3)'; //#e52020';

let heroWidth = document.querySelector('.canvas').offsetWidth;
let heroHeight = document.querySelector('.canvas').offsetHeight;

const btn = document.querySelector('.contact-me-btn');
let btnObj = btn.getBoundingClientRect();
let btnX = 0;
let btnY = 0;

ctx.lineWidth = .5;

window.addEventListener('resize', function () {
    heroWidth = document.querySelector('.canvas').offsetWidth;
    heroHeight = document.querySelector('.canvas').offsetHeight;
    init();
});

//Class
function Pixel(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
};
//Class methods
Pixel.prototype = {

    draw: function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = circleFillColor;
        ctx.fill();
        ctx.strokeStyle = circleStrokeColor;
        ctx.stroke();
    },

    update: function () {
        //Check x for edges of screen
        if(this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        //Check y for edges of screen
        if(this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        //Change velocity
        this.x += this.dx;
        this.y += this.dy;
        //Redraw
        this.draw();
    },

    line: function () {
        const connectionRadius = 200;
        for(let i = 0; i < pixelsArray.length; i++) {
            let pX = pixelsArray[i].x;
            let pY = pixelsArray[i].y;
            //Check for connections
            if((godPixel.x - pX < connectionRadius) && (godPixel.x - pX > -connectionRadius)) {
                if((godPixel.y - pY < connectionRadius) && (godPixel.y - pY > -connectionRadius)) {
                    ctx.beginPath();
                    ctx.moveTo(godPixel.x, godPixel.y);
                    ctx.lineTo(pX, pY);
                    ctx.strokeStyle = lineColor;
                    ctx.stroke();
                }
            }
        }
    }
};
//End of Class

//Pixels array
let pixelsArray = [];

//Godpixel Object
let godPixel = {
    x : 0,
    y : 0,
    radius : 5
};

function createGodPixel () {
    ctx.beginPath();
    ctx.arc(godPixel.x, godPixel.y, godPixel.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = circleStrokeColor;
    ctx.fill();
}

//Setup
function init() {
    canvas.width = heroWidth;
    canvas.height = heroHeight;

    //Get btn positions
    btnObj = btn.getBoundingClientRect();
    godPixel.x = btnObj.x - (btnObj.width / 2) + 50;
    godPixel.y = btnObj.y - (btnObj.height / 2) + 50;

    //Clear pixelArray
    pixelsArray = [];

    //Total pixel circle on screen
    let totalPixels = 0;

    //Check width of canvas
    if(heroWidth > 1000) {
        //High performance canvas
        totalPixels = 50;
        console.log("running higher performance version");
    } else {
        //Low performance canvas
        totalPixels = 10;
        console.log("running lower performance version");
    }

    let x = 0,
        y = 0,
        dx = 0,
        dy = 0,
        radius = 0,
        velocity = 2;

    //Get init values
    for (let i = 0; i < totalPixels; i++) {
        radius = Math.random() * 6;
        x = Math.random() * window.innerWidth;
        y = Math.random() * window.innerHeight;
        dx = Math.random() * velocity;
        dy = Math.random() * velocity;
        //Create pixels
        pixelsArray.push(new Pixel(x, y, dx, dy, radius) );
    }
}

//Animation Loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for(let i = 0; i < pixelsArray.length; i++) {
        pixelsArray[i].line();
        pixelsArray[i].update();
    }
    createGodPixel();
}

//Setup
init();
//Start
animate();
