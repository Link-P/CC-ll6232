let xPos;
let xSpeed;
let rectSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //划定色彩模式值的范围，尤其是最后一个透明值
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
  xPos = width/2;
  xSpeed = 10;
  rectSize = 50;
}

function draw() {
  background(140, 30, 0);

  noStroke();
  fill(0, 100, 20);
  translate(xPos, 50);

  for(let i = 0; i < 13; i++){

    fill(random(0, 360), 50, 100*mouseY/height);

    push();

    translate(0, i*70);
    rect(0, 0, rectSize);

    pop();
  }

  xPos += xSpeed; 
  if(xPos >= width || xPos <= 0){
    xSpeed *= -1;
    }

}

function mousePressed(){
  rectSize = random(10, 200);
}