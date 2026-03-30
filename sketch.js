let sterne = [];
let speed;

function setup() {
  // WEBGL für 3D-Effekt nutzen
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  canvas.elt.style.position = "fixed";

  // Initialisierung der Sterne
  let sternAnzahl = windowWidth + windowHeight;
  for (let i = 0; i < sternAnzahl; i++) {
    sterne[i] = new Stern();
  }
  
  calculateSpeed();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateSpeed();
}

function calculateSpeed() {
  speed = (windowWidth + windowHeight) / 270;
}

function draw() {
  background(0);
  
  for (let i = 0; i < sterne.length; i++) {
    sterne[i].update();
    sterne[i].show();
  }
}

function Stern() {
  // Zufällige Position im 3D-Raum
  this.x = random(-width, width);
  this.y = random(-height, height);
  this.z = random(width);
  this.pz = this.z; // Vorheriges Z für Motion-Blur-Effekte (optional)

  this.update = function() {
    this.z = this.z - speed;
    
    // Wenn der Stern am Betrachter vorbei ist, zurücksetzen
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.pz = this.z;
    }
  };

  this.show = function() {
    fill(255);
    noStroke();

    // Projektion von 3D auf 2D
    // sx = x / z ergibt den perspektivischen Effekt
    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);

    // Größe des Sterns basierend auf der Nähe (Z-Wert)
    let r = map(this.z, 0, width, 8, 0);
    
    // Leuchteffekt / Helligkeit basierend auf Nähe
    let helligkeit = map(this.z, 0, width, 255, 50);
    stroke(helligkeit);
    strokeWeight(r);
    
    // Punkt zeichnen (in WEBGL ist 0,0 die Mitte)
    point(sx, sy);
    
    this.pz = this.z;
  };
}
