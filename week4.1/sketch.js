//设置seed初始数值
let seed = 1234;
//设置增量参数
let inc = 0.01;
let rectSize = 8;

function setup() {
  createCanvas(576, 384);
  rectMode(CENTER);
  
}

function draw() {

  background(200);

  noiseSeed(seed);

  noFill();
  stroke(0);

  translate(width/2, height/2);

   //方块循环
  for(let i = 0; i < 60; i++){
    push();

    //设置noise的变化大小
    let noiseVal = noise(i * inc);
    //设置基础旋转形状，尤其是这个数值，可以改变整体风格
    let rot = radians(i * 90) + TWO_PI * noiseVal;
    
    //依据旋转变量的变化设置进行转动
    rotate(rot);
    translate(i * 3, 0);
    
    rectSize = 8 + i * 0.4;
    rect(0, 0, rectSize);

    pop();
  }

}

 //设置按键后随机变换seed值
function keyPressed(){
  if(key == "r"){
    seed = floor(random(11111));
  }

}

  

