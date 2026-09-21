let xPos;
let yPos;
let yellowsquarescale;

function setup() {
  createCanvas(windowWidth,windowHeight);
  xPos = 1000;
  yPos = 100;
  yellowsquarescale = 1;

}

function draw() {
  background(255, 248, 231);

  stroke(103, 72, 70);
  strokeWeight(2);
  line(0, 0, width/2, height/2);

  stroke(103, 72, 70);
  strokeWeight(2);
  line(width, 0, width/2, height/2);

  stroke(103, 72, 70);
  strokeWeight(2);
  line(0, height, width/2, height/2);

  stroke(103, 72, 70);
  strokeWeight(2);
  line(width, height, width/2, height/2);

  noStroke();
  fill(23, 13, 9);
  rect(780, 300, 50, 300);

  noStroke();
  fill(103, 72, 70);
  rect(800, 400, 150, 100);

  stroke(230, 67, 113);
  strokeWeight(4);
  noFill();
  ellipse(770, 620, 130);

  stroke(103, 72, 70);
  strokeWeight(3);
  line(500, 400, width/2, height/2);

  noStroke();
  fill(240, 179, 38);
  ellipse(windowWidth/2, windowHeight/2, 20);

  noStroke();
  fill(240, 179, 38);
  ellipse(500, 400, 80);

  stroke(23, 13, 9);
  strokeWeight(2);
  line(xPos, yPos, width/2, height/2);

  push();

  translate(xPos, yPos);
  scale(yellowsquarescale);
  
  rectMode(CENTER);
  stroke(240, 179, 38);
  strokeWeight(2);
  noFill();
  rect(0, 0, 30);
 
  pop();

  stroke(23, 13, 9);
  strokeWeight(2);
  line(1200, 800, width/2, height/2);

  push();
  
  rectMode(CENTER);
  noStroke();
  fill(23, 13, 9)
  rect(1200, 800, 50);
 
  pop();

}

function mousePressed(){
  xPos = mouseX;
  yPos = mouseY;
  yellowsquarescale = random(0.5, 2.0)

}