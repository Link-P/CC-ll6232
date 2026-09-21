

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  colorMode(HSB, 360, 100, 100, 100);
  
}

function draw() {
  background(20, 80, 100);

  noStroke();

  let rectSize = 20 + (mouseY / height) * 100;

  //x和y循环
  for(let x = 0; x < 17; x++){
    for(let y = 0; y < 9; y++){

      fill(360 * (y/9), 30, 100 * (y/9));

      push();

      //根据x和y的增加变化改变复制体的位置
      translate(x * 100 + 50, y * 100 +50);
      //根据Y循环改变从上到下复制体的角度
      rotate(radians(x * 20));
      rotate(radians(y * 5));
      rect(0, 0, rectSize);

      pop();
    }
  }

}


