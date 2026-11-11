let video;
let handPose;
let hands = [];

//创建存储截图的数组
let saveSnaps = [];

async function setup(){
  createCanvas(windowWidth,windowHeight);
  background(0);

  video = createCapture(VIDEO);
  video.size(windowWidth,windowHeight);
  video.hide();

  handPose = await ml5.handPose({
    maxHands: 2
  });

  handPose.detectStart(video, gotHands);
}

function draw(){
  background(0);

  //遍历所有截图数组
  for(let i = 0; i < saveSnaps.length; i++){
      let snap = saveSnaps[i];
      image(snap.image, snap.x, snap.y);
    }

  push();

  //水平翻转
  translate(width, 0);
  scale(-1, 1);
  
  if(hands.length === 2){
    
    //手1拇指，食指，中指坐标
    let LthumbX= hands[0].thumb_tip.x;
    let LthumbY = hands[0].thumb_tip.y;

    let LfingerX= hands[0].index_finger_tip.x;
    let LfingerY = hands[0].index_finger_tip.y;

    let LmiddleX= hands[0].middle_finger_tip.x;
    let LmiddleY = hands[0].middle_finger_tip.y;

    //手2拇指，食指，中指坐标
    let RthumbX= hands[1].thumb_tip.x;
    let RthumbY = hands[1].thumb_tip.y;

    let RfingerX= hands[1].index_finger_tip.x;
    let RfingerY = hands[1].index_finger_tip.y;

    let RmiddleX= hands[1].middle_finger_tip.x;
    let RmiddleY = hands[1].middle_finger_tip.y;

    let Ldist = dist(LthumbX, LthumbY, LfingerX, LfingerY);
    let Rdist = dist(RthumbX, RthumbY, RfingerX, RfingerY);
    
    let SRdist = dist(RthumbX, RthumbY, RmiddleX, RmiddleY);

    //拇指食指画显示框
    if (Ldist > 30 && Rdist > 30){

      push();

      beginClip();

      beginShape();
      vertex(LthumbX, LthumbY);
      vertex(LfingerX, LfingerY);
      vertex(RfingerX, RfingerY);
      vertex(RthumbX, RthumbY);
      endShape(CLOSE);

      endClip();

      //显示框内摄像头画面
      image(video, 0, 0, width, height);

      pop();

      //noFill();
      //stroke(255);
      //strokeWeight(2);

      //beginShape();
      //vertex(LthumbX, LthumbY);
      //vertex(LfingerX, LfingerY);
      //vertex(RfingerX, RfingerY);
      //vertex(RthumbX, RthumbY);
      //endShape(CLOSE);
    }else{
      stroke(255);
      strokeWeight(2);
      //如果没有画框，识别拇指位置画线
      line(LthumbX, LthumbY, RthumbX, RthumbY);
    }

    noStroke();
    fill(0, 0, 255);
    circle(LthumbX, LthumbY, 1);
    circle(LfingerX, LfingerY, 1);
    circle(LmiddleX, LmiddleY, 1);
    

    fill(0, 255, 0);
    circle(RthumbX, RthumbY, 1);
    circle(RfingerX, RfingerY, 1);
    circle(RmiddleX, RmiddleY, 1);
    
    //判定手2的拇指与中指距离，然后记录图片
    if (SRdist < 30){
      let snap = get();

      saveSnaps.push({ image:snap, x:0, y:0})
    }
  }

  pop();

  filter(POSTERIZE, 4);

}

function gotHands(results){
  hands = results;
}