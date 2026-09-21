let ellipseSize;
let ellipseAlpha;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //划定色彩模式值的范围，尤其是最后一个透明值
  colorMode(HSB, 360, 100, 100, 100);
  ellipseSize = 100;
  ellipseAlpha = 50;
  
}

function draw() {
  background(60, 30, 100);

  noStroke();
  fill(200, 100, 100, ellipseAlpha);
  //转移原点坐标到中心点
  translate(width/2, height/2);
  ellipse(0, 0, ellipseSize);

  
  fill(200, 100, 100, ellipseAlpha);

  //设置圈数变量
  for(let ring = 0; ring < 6; ring++){
    //设置变量的值的变化
    let xOffset = ring * 80;
    let ellipseCount = ring * 8;
    
    //设置每圈的变化规律，旋转角度和偏移量
    for(let i = 0; i < ellipseCount; i++){
      push();
      
      //旋转多少度由圆的数量控制
      rotate(radians(i * 360/ellipseCount));
      //移动多少由圈数控制
      translate(xOffset, 0);
      ellipse(0, 0, ellipseSize);
    
      pop();
    }
  
  }
  
}

function mousePressed(){
  if(mouseY < height/2){
    ellipseSize = random(20, 80);
    ellipseAlpha = random(50, 100);
  }else{
    ellipseSize = random(100, 150);
    ellipseAlpha = random(10, 50);
  }
}


