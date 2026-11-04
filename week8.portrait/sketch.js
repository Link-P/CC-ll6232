let capture;
let stepSize = 20;
let disp;

let mode;

//设置一个变量，用于控制像素块的大小变化
let moderectSize;


async function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  
  //额外做一个画面，先在小尺寸画面中进行计算，然后再放大
  disp = createGraphics(640, 480);
  
  //设置摄像头，让摄像头尺寸符合disp尺寸，方便后续放大disp尺寸到整个窗口尺寸
  capture = await createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();

  noFill();
  background(255);
}

function draw() {

  // 读取每一帧摄像头画面的像素
  capture.loadPixels();
  disp.background(255);
  
  //用映射的方式把sin-1到1的值映射成1.2到2的值
  moderectSize = map(sin(frameCount * 0.03), -1, 1, 1.2, 2);

  for(let y = 0; y < capture.height; y += stepSize){
    for(let x = 0; x < capture.width; x += stepSize){
      
      //设置像素rgb的数组，方便后续读取
      let i = 4 * (y *capture.width + x);
      
      //分别读取rgb在数组中的编号对应的值
      let r = capture.pixels[i];
      let g = capture.pixels[i + 1];
      let b = capture.pixels[i + 2];

      let blockrectSize = stepSize;

      if (mode ==="r" && r > g + 10 && r > b + 10){
        blockrectSize = stepSize * moderectSize;
      }

      else if(mode ==="g" && g > r&& g > b){
        blockrectSize = stepSize * moderectSize
      }

      else if(mode ==="b" && b > r && b > g){
        blockrectSize = stepSize*moderectSize
      }

      //在disp这个画布中画方块
      disp.push();
      disp.translate(x + stepSize/2, y + stepSize/2);
      disp.fill(r, g, b, 60 * moderectSize);
      disp.stroke(r, g, b);
      disp.rectMode(CENTER);
      disp.strokeWeight(2);
      //这里方块的大小会根据mode变化
      disp.rect(0, 0, blockrectSize, blockrectSize);
      disp.pop();
    
    }
  }

  image(disp, 0, 0, width, height);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed(){
  if (key === "r" || key ==="R"){
    mode = "r"
  }

  else if(key === "g" || key ==="G"){
    mode = "g"
  }

  else if(key === "b" || key === "B"){
    mode = "b"
  }
}


