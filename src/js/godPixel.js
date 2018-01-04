"use strict"

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var circleFillColor = 'rgba(57, 62, 65, .3)'; //#393e41
var circleStrokeColor = 'rgba(253, 249, 255, .3)'; //#fdf9ff
var lineColor = 'rgba(229, 32, 32, .3)'; //#e52020';

var heroWidth = document.querySelector('.canvas').offsetWidth;
var heroHeight = document.querySelector('.canvas').offsetHeight;

var btn = document.querySelector('.contact-me-btn');
var btnObj = btn.getBoundingClientRect();
var btnX = 0;
var btnY = 0;

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
        var connectionRadius = 200;
        for(var i = 0; i < pixelsArray.length; i++) {
            var pX = pixelsArray[i].x;
            var pY = pixelsArray[i].y;
            //Quad 2
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
var pixelsArray = [];

//Godpixel Object
var godPixel = {
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

    var totalPixels = 50;
    var x = 0,
        y = 0,
        dx = 0,
        dy = 0,
        radius = 0,
        velocity = 2;

    //Get init values
    for (var i = 0; i < totalPixels; i++) {
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

    for(var i = 0; i < pixelsArray.length; i++) {
        pixelsArray[i].line();
        pixelsArray[i].update();
    }
    createGodPixel();
}

//Setup
init();
//Start
animate();
