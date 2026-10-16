let hist = 60;

//创建所有数组，暂用空数组，后面加入数组值
let posx = [];
let posy = [];
//把HSB中的色相也创建数组，用于给圆的色相值创建数组，根据数组变化
let hue = [];

let incX = 0.1;
let incY = 1.5;

let s;
let ps;
let m;
let RingsNum;
let h;
let lineW;
let lineWChange;
let plineWChange;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  noStroke();

  //所有数组都用先用0来填充
  for(let i = 0; i < hist; i++){
    posx[i] = 0;
    posy[i] = 0;
    hue[i] = 0;
  }
}

function draw() {
  background(0, 0, 80);

  s = second();
  m = minute();
  h = hour();
  lineW = 10;
  //每秒两次随机变化线的宽度
  lineWChange = floor(millis()/500);

  if(ps != s){
  
  //让新的数组中的数填充上一个数组中的数，然后保留下来，直到数组中所有数完整结束
  for (let i = hist - 1; i > 0; i--) {
    posx[i] = posx[i - 1];
    posy[i] = posy[i - 1];
    hue[i] = hue[i - 1];
    }
    
    //设置位置和色相的值
    posx[0] = noise(incX) * width;
    posy[0] = noise(incY) * height;
    hue[0] = second() * 6;
    
    //设置位置变化程度
    incX += 0.05;
    incY += 0.05;
  }
    
  ps = s;

  //绘制秒的圆  
  //给圆一个循环，这里也用到了之前设置的pos[i-1]用于保留之前的圆的位置
    for(let i = hist; i > 0; i--){
      fill(hue[i], 100, 100);
      ellipse(posx[i], posy[i], i);

    }
 
    //画分钟的圆环，每五分钟一个环，floor控制圆环的数量
    RingsNum = floor(m / 5);

    push();

    noFill();
    stroke(hue[0], 100, 100);
    strokeWeight(1);

    for(let i = 0; i < RingsNum; i++){
      ellipse(posx[0], posy[0], 20+i*30);
    }

    pop();

    //设置一个跟随小时移动的线，方形遮罩的右边缘等于线的x值
    push();

    let xPos = (h + m/60) * (windowWidth/24);

    noStroke();
    fill(0, 0, 0, 0.5);

    rect(0, 0, xPos, windowHeight);

    //每秒两次随机变化线的宽度
    if(plineWChange != lineWChange){
      lineW = random(0, 50);
 
    }
    plineWChange = lineWChange;
    

    stroke(0, 0, 0);
    strokeWeight(lineW);

    line(xPos, 0, xPos, windowHeight);

    pop();

}