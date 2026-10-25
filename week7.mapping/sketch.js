let pMapper;

let topQuad;
let leftQuad;
let rightQuad;

// 三组不同方向移动的球
let balls = [];
let Yleftballs = [];
let Yrightballs = [];

let numBalls = 10;

// 左右两组从下往上移动的直线
let leftLines = [];
let rightLines = [];

let numLines = 30;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  pMapper = createProjectionMapper(this);

  topQuad = pMapper.createQuadMap(400, 400);
  leftQuad = pMapper.createQuadMap(400, 400);
  rightQuad = pMapper.createQuadMap(400, 400);

  topQuad.x = -600;
  topQuad.y = -200;

  leftQuad.x = -200;
  leftQuad.y = -200;

  rightQuad.x = 200;
  rightQuad.y = -200;

  //第一组球：左面和右面之间来回移动
  for (let i = 0; i < numBalls; i++) {
    let diam = random(5, 40);

    //设置第一组球的基础数值
    let oneBall = {
      x: random(diam / 2, leftQuad.width + rightQuad.width - diam / 2),
      y: random(diam / 2, leftQuad.height - diam / 2),
      speed: 3 * random([-1, 1]),
      d: diam
    };

    balls.push(oneBall);
  }

  //第二组球：顶面和左面之间来回移动
  for (let i = 0; i < numBalls; i++) {
    let diam = random(5, 40);

    //设置第二组球的基础数值
    let oneBall = {
      x: random(diam / 2, topQuad.width - diam / 2),
      y: random(diam / 2, topQuad.height + leftQuad.height - diam / 2),
      speed: 3 * random([-1, 1]),
      d: diam
    };

    Yleftballs.push(oneBall);
  }

  //第三组球：顶面和右面之间来回移动
  for (let i = 0; i < numBalls; i++) {
    let diam = random(5, 40);

    //设置第三组球的基础数值
    let oneBall = {
      x: random(diam / 2, topQuad.height - diam / 2),
      y: random(diam / 2, topQuad.width + rightQuad.height - diam / 2),
      speed: 3 * random([-1, 1]),
      d: diam
    };

    Yrightballs.push(oneBall);
  }

  // 第一组直线：左面进入顶面
  for (let i = 0; i < numLines; i++) {

    //设置第一组线的基础数值
    let oneLine = {
      position: random(topQuad.height + leftQuad.height),
      speed: random(1, 3)
    };

    leftLines.push(oneLine);
  }

  // 第二组直线：右面进入顶面
  for (let i = 0; i < numLines; i++) {

    //设置第二组线的基础数值
    let oneLine = {
      position: random(topQuad.width + rightQuad.height),
      speed: random(1, 3)
    };

    rightLines.push(oneLine);
  }
}

function draw() {
  background(0);

  //第一组球：左右移动
  for (let i = 0; i < balls.length; i++) {
    balls[i].x += balls[i].speed;

    //判定第一组球是否接触到边缘并进行反向移动
    if (balls[i].x >= leftQuad.width + rightQuad.width - balls[i].d / 2 ||
      balls[i].x <= balls[i].d / 2) {
      balls[i].speed = -balls[i].speed;
    }
  }

  //第二组球：顶面和左面之间移动
  for (let i = 0; i < Yleftballs.length; i++) {
    Yleftballs[i].y += Yleftballs[i].speed;

    //判定第二组球是否接触到边缘并进行反向移动
    if (Yleftballs[i].y >= topQuad.height + leftQuad.height - Yleftballs[i].d / 2 ||
      Yleftballs[i].y <= Yleftballs[i].d / 2) {
      Yleftballs[i].speed = -Yleftballs[i].speed;
    }
  }

  // 第三组球：顶面和右面之间移动
  for (let i = 0; i < Yrightballs.length; i++) {
    Yrightballs[i].y += Yrightballs[i].speed;

    //判定第三组球是否接触到边缘并进行反向移动
    if (Yrightballs[i].y >= topQuad.width + rightQuad.height - Yrightballs[i].d / 2 ||
      Yrightballs[i].y <= Yrightballs[i].d / 2) {
      Yrightballs[i].speed = -Yrightballs[i].speed;
    }
  }

  // 左面的直线不断向上移动
  for (let i = 0; i < leftLines.length; i++) {
    leftLines[i].position -= leftLines[i].speed;

    //判定离开顶面后重新从左面底部进入
    if (leftLines[i].position < 0) {
      leftLines[i].position = topQuad.height + leftQuad.height;
    }
  }

  // 右面的直线不断向上移动
  for (let i = 0; i < rightLines.length; i++) {
    rightLines[i].position -= rightLines[i].speed;

    //判定离开顶面后重新从右面底部进入
    if (rightLines[i].position < 0) {
      rightLines[i].position = topQuad.width + rightQuad.height;
    }
  }

  topQuad.displaySketch(topDrawing);
  leftQuad.displaySketch(leftDrawing);
  rightQuad.displaySketch(rightDrawing);
  
}

//画顶面的直线和圆
function topDrawing(mySketch) {
  mySketch.colorMode(HSB);
  mySketch.background(0, 0, 0, 0);

  //直线
  mySketch.stroke(0, 0, 100);
  mySketch.strokeWeight(2);

  //顶面左边来的线的位置
  for (let i = 0; i < leftLines.length; i++) {
    let y = leftLines[i].position;

    mySketch.line(0, y, topQuad.width, y);
  }

  // 顶面右边来的线的位置
  for (let i = 0; i < rightLines.length; i++) {
    let x = rightLines[i].position;

    mySketch.line(x, 0, x, topQuad.height);
  }

  //球
  mySketch.noStroke();

  //顶面左边球的位置
  for (let i = 0; i < Yleftballs.length; i++) {
    mySketch.fill(random(360), 100, 100);

    mySketch.ellipse(Yleftballs[i].x, Yleftballs[i].y, Yleftballs[i].d);
  }

  //顶面右边球的位置
  for (let i = 0; i < Yrightballs.length; i++) {
    mySketch.fill(random(360), 100, 100);

    mySketch.ellipse(Yrightballs[i].y, topQuad.height - Yrightballs[i].x, Yrightballs[i].d);
  }
}

//画左面的直线和圆
function leftDrawing(mySketch) {
  mySketch.colorMode(HSB);
  mySketch.background(0, 0, 0, 0);

  mySketch.stroke(0, 0, 100);
  mySketch.strokeWeight(2);

  //左面线的位置
  for (let i = 0; i < leftLines.length; i++) {
    let y = leftLines[i].position - topQuad.height;

    mySketch.line(0, y, leftQuad.width, y);
  }

  //左面向右边移动的球的位置
  mySketch.noStroke();

  for (let i = 0; i < balls.length; i++) {
    mySketch.fill(random(360), 100, 100);

    mySketch.ellipse(balls[i].x, balls[i].y, balls[i].d);
  }

  //左面向顶面移动的球的位置
  for (let i = 0; i < Yleftballs.length; i++) {
    mySketch.fill(random(360), 100, 100);

    mySketch.ellipse(Yleftballs[i].x, Yleftballs[i].y - topQuad.height, Yleftballs[i].d);
  }
}

//画右面的直线和圆
function rightDrawing(mySketch) {
  mySketch.colorMode(HSB);
  mySketch.background(0, 0, 0, 0);

  mySketch.stroke(0, 0, 100);
  mySketch.strokeWeight(2);

  //右面线的位置
  for (let i = 0; i < rightLines.length; i++) {
    let y = rightLines[i].position - topQuad.width;

    mySketch.line(0, y, rightQuad.width, y);
  }

  //右面往左边移动的球的位置
  mySketch.noStroke();

  for (let i = 0; i < balls.length; i++) {
    mySketch.fill(random(360), 100, 100);

    mySketch.ellipse(balls[i].x - leftQuad.width, balls[i].y, balls[i].d);
  }

  //右面往上面移动的球的位置
  for (let i = 0; i < Yrightballs.length; i++) {
    mySketch.fill(random(360),100,100);

    mySketch.ellipse(Yrightballs[i].x, Yrightballs[i].y - topQuad.width,Yrightballs[i].d);
  }
}


function keyPressed() {
  switch (key) {
    case "c":
      pMapper.toggleCalibration();
      break;

    case "f":
      let fs = fullscreen();
      fullscreen(!fs);
      break;

    case "s":
      pMapper.save("map.json");
      break;

    case "l":
      pMapper.load("maps/map.json");
      break;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}