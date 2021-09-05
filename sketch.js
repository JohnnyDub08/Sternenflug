let sterne = [];

let speed;

function setup() {
  //setAttributes('antialias', true);
  canvas = createCanvas(windowWidth, windowHeight, WEBGL)
  canvas.position(0, 0);
  canvas.style('z-index', '-1')
  canvas.elt.style.position = "fixed"
  for (let i = 0; i < windowWidth+windowHeight; i++) {
    sterne[i] = new Stern();
  }
  speed = (windowWidth+windowHeight)/270;
}

function windowResized() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL)
  canvas.position(0, 0);
  canvas.style('z-index', '-1')
  canvas.elt.style.position = "fixed"
  for (let i = 0; i < windowWidth+windowHeight; i++) {
    sterne[i] = new Stern();
  }
  speed = (windowWidth+windowHeight)/270;
}

function draw() {
  //speed = 12;
  background(0);
  for (let i = 0; i < sterne.length; i++) {
    sterne[i].update();
    sterne[i].show();
  }
}

function Stern() {
  this.x = random(-width, width);
  this.y = random(-height, height);
  this.z = random(width);

  this.update = function() {
    this.z = this.z - speed;
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
    }
  };

  this.show = function() {
    var dist = map(this.z, width , 0 , 0 , 400)
    stroke(dist);
    strokeWeight(3);
    var sx = map(this.x / this.z, 0, 1, 0, width);
    var sy = map(this.y / this.z, 0, 1, 0, height);
    var r = map(this.z, 0, width, 9, 0);
    point(sx, sy, r);
  };
}
