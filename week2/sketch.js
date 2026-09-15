let xPos;
let yPos;
let rectScale;
let linerotate;
let bigCircleScale;
let backgroundR;
let backgroundG;
let backgroundB;

function setup() {
  createCanvas(windowWidth,windowHeight);
  xPos = 300;
  yPos = height/2;
  rectScale = 1;
  linerotate = 0;
  bigCircleScale = 1;
  backgroundR = 24;
  backgroundG = 22;
  backgroundB = 33;

}

function draw() {
  background(backgroundR, backgroundG, backgroundB);

  stroke(122, 65, 37);
  strokeWeight(2);
  line(0, 0, xPos-75*rectScale, yPos-50*rectScale);

  stroke(122, 65, 37);
  strokeWeight(2);
  line(width, 0, xPos+75*rectScale, yPos-50*rectScale);

  stroke(122, 65, 37);
  strokeWeight(2);
  line(0, height, xPos-75*rectScale, yPos+50*rectScale);

  stroke(122, 65, 37);
  strokeWeight(2);
  line(width, height, xPos+75*rectScale, yPos+50*rectScale);

  push();

  translate(xPos, yPos);
  scale(rectScale);
  rectMode(CENTER);
  noStroke();
  fill(240, 102, 22);
  rect(0, 0, 150, 100);

  pop();

  push();

  translate(xPos, yPos);
  rotate(linerotate);
  stroke(122, 65, 37);
  strokeWeight(2);
  line(0, 0, 500-300, 150-yPos);
  
  translate(500-300, 150-yPos);
  scale(bigCircleScale);
  noStroke();
  fill(240, 179, 38);
  ellipse(0, 0, 80);

  pop();

  noStroke();
  fill(240, 179, 38);
  ellipse(xPos, yPos, 20);

}

function mousePressed(){

  xPos = xPos + 150;
  rectScale = rectScale + 0.4;
  linerotate = linerotate + radians(60);
  bigCircleScale = bigCircleScale + 0.3;
  backgroundR = min(backgroundR + 25, 255);
  backgroundG = min(backgroundG + 25, 255);
  backgroundB = min(backgroundB + 25, 255);

}