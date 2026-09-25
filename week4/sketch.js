let doExport = false;
let seed = 1234;
let inc = 0.01;
let rectSize = 8;

function setup() {
  createCanvas(576, 384);
  //划定色彩模式值的范围，尤其是最后一个透明值
  rectMode(CENTER);
  
}

function draw() {
  if(doExport){
    beginRecordSvg("spiral" + seed + ".svg");
  }

  background(200);

  noiseSeed(seed);

  noFill();
  stroke(0);

  translate(width/2, height/2);

  for(let i = 0; i < 60; i++){
    push();

    let noiseVal = noise(i * inc);
    let rot = radians(i * 90) + TWO_PI * noiseVal;
    
    rotate(rot);
    translate(i * 3, 0);
    
    rectSize = 8 + i * 0.4;
    rect(0, 0, rectSize);

    pop();
  }

  if (doExport){
    endRecordSvg();
    doExport = false;
  }

}

function keyPressed(){
  if(key == "r"){
    seed = floor(random(11111));
  }

   if(key == "s"){
      doExport = true;
  }
}

  

