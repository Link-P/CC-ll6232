let song;
let analysis;

// 播放状态
let shouldRestart;
let songState;

// 按钮/滑块
let backButton;
let playButton;
let stopButton;
let volumeSlider;

let stepSize = 15;
let layerCount = 3;

async function setup() {
  createCanvas(windowWidth, windowHeight);

  song = await loadSound("assets/Club_Diver.mp3");

  analysis = new p5.Amplitude();
  song.connect(analysis);
  analysis.smooth(0.6);

  //回放按钮设置
  backButton = createButton("⏮");
  backButton.position(width / 2 - 95, height * 0.9 - 25);
  backButton.style("width", "50px");
  backButton.style("height", "50px");
  //按钮倒角
  backButton.style("border-radius", "50%");
  //去掉边框
  backButton.style("border", "none");
  backButton.style("background-color", "rgba(255, 255, 255, 0.03)");
  backButton.style("color", "white");
  backButton.mouseClicked(backClicked);

  //播放 / 暂停按钮设置
  playButton = createButton("⏵");
  playButton.position(width / 2, height * 0.9 - 25);
  playButton.style("width", "50px");
  playButton.style("height", "50px");
  playButton.style("border-radius", "50%");
  playButton.style("border", "none");
  playButton.style("background-color", "rgba(255, 255, 255, 0.03)");
  playButton.style("color", "white");
  playButton.mouseClicked(playClicked);

  //停止按钮设置
  stopButton = createButton("■");
  stopButton.position(width / 2 + 95, height * 0.9 - 25);
  stopButton.style("width", "50px");
  stopButton.style("height", "50px");
  stopButton.style("border-radius", "50%");
  stopButton.style("border", "none");
  stopButton.style("background-color", "rgba(255, 255, 255, 0.03)");
  stopButton.style("color", "white");
  stopButton.mouseClicked(stopClicked);

  //滑块按钮设置
  volumeSlider = createSlider(0, 100, 80);
  volumeSlider.position(width / 2 - 75, height * 0.9 + 35);
  volumeSlider.style("width", "200px");
  volumeSlider.style("accent-color", "white");

  shouldRestart = false;
  songState = "stopped";
}

function draw() {
  background(0);

  let vol = volumeSlider.value()/100;
  song.amp(vol);

  //根据播放状态改变按钮符号
  if (songState == "playing") {
    playButton.html("▮▮");
  } else {
    playButton.html("⏵");
  }

  //读取音量
  let volume = analysis.getLevel();

  //音量控制起伏幅度
  let waveHeight = volume * 600;

  noStroke();

  //第一组：三层白色粒子
  fill(255);

  //第一个循环设置阵列层数
  for (let layer = 0; layer < layerCount; layer++) {
    for (let y = height / 3; y < height * 2 / 3; y += stepSize) {
      for (let x = 0; x < width; x += stepSize) {
        
        let wave = cos(x * 0.01) * waveHeight;
        let noiseValue = noise(x * 0.005,y * 0.1, frameCount * 0.05);

        let noiseOffset = map(noiseValue, 0, 1, -waveHeight * 6, waveHeight * 6);

        //结合cos变换和noise值的变化控制阵列点的Y值随机变化，最后layer*20根据层数上下错开Y值
        let newY = y + wave + noiseOffset + layer * 20;

        circle(x, newY, 3);
      }
    }
  }

  //第二组：覆盖面层的三层黑色粒子
  fill(0);

  for (let layer = 0; layer < layerCount; layer++) {
    for (let y = 0; y < height; y += stepSize) {
      for (let x = 0; x < width; x += stepSize) {

        let wave = cos(x * 0.01) * waveHeight;
        let noiseValue = noise(x * 0.005, y * 0.1,frameCount * 0.05);

        let noiseOffset = map(noiseValue, 0, 1, -waveHeight * 6, waveHeight * 6);

        //结合cos变换和noise值的变化控制阵列点的Y值随机变化，最后layer*20根据层数上下错开Y值
        let newY = y + wave + noiseOffset + layer * 20;

        circle(x, newY, 6);
      }
    }
  }
}

//回放按钮判定
function backClicked() {
  if (song.isPlaying()) {
    song.jump(0);
  } else if (songState == "paused") {
    // 暂停中：下次播放时从头开始
    shouldRestart = true;
  } else {
    song.stop();
    songState = "stopped";
  }
}

//播放/暂停按钮判定
function playClicked() {
  if (song.isPlaying()) {
    song.pause();
    songState = "paused";
  } else if (songState == "paused") {
    song.play();
    songState = "playing";

    if (shouldRestart) {
      song.jump(0);
      shouldRestart = false;
    }

  } else {
    song.play();
    songState = "playing";
  }
}

//完全停止
function stopClicked() {
  song.stop();
  songState = "stopped";
}

