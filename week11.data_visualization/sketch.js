let data;
let url = "https://data.ny.gov/api/v3/views/5xaw-6ayf/query.json?accessType=DOWNLOAD";

//data from the most recent 100 periods
let dataNum = 100;

let rectSize = 30;
let stepSize = 80;

//all the numbers of the winning_numbers
let winBallNums = [];

//count the frequency of occurrence of winning_number number
let counts = [];

let minCount;
let maxCount;

//all mega_ball numbers
let megaBallNums = [];
//count the frequency of occurrence mega_ball number
let megaCounts = [];
let megaMinCount;
let megaMaxCount;

async function setup(){
  createCanvas(windowWidth, windowHeight);

  data = await loadJSON(url);
  
  //read every period each winning_numbers
  for(let i = 0; i < dataNum; i++){
    let everyWinBall = data[i].winning_numbers.split(" ");

    //store each set of winning_numbers in to winBallNums
    for(let j = 0; j < everyWinBall.length; j++){
      winBallNums.push(int(everyWinBall[j]));
    }
  }
  
  //count the frequency
  //the range of the winning number is from 1 to 70
  for(let number = 1; number <= 70; number++){

    let count=0;

    //start counting
    for(let i = 0; i < winBallNums.length; i++){
      if(winBallNums[i] == number){
        count++;
      }
    }
    counts.push(count);
  }

  minCount = min(counts);
  maxCount = max(counts);

  for(let i = 0; i < dataNum; i++){
      megaBallNums.push(int(data[i].mega_ball));
    } 

    for(let number = 1; number <= 24; number++){
      let count = 0;

      for(let i = 0; i < megaBallNums.length; i++){
        if(megaBallNums[i] == number){
          count++
        }
      }
      megaCounts.push(count);
  }
  megaMinCount = min(megaCounts);
  megaMaxCount = max(megaCounts);
  

  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  colorMode(HSB);
}

function draw(){
  background(0);

  //read the lastest period of winning and mega number
  let latestWinBall = int(data[0].winning_numbers.split(" "));
  let latestMegaBall = data[0].mega_ball;
  let latestrotate = map(cos(frameCount*0.01), -1, 1, -1080, 1080);
 
  let number = 1;


  for (let row = 0; row < 7; row++){
    for(let col = 0; col < 10; col++){

      let x = 200 + col* stepSize;
      let y = 200 + row * stepSize;

      //get the value from the counts and give it to the count variable
      let count = counts[number - 1];

      let sizeScale = map(count, minCount, maxCount, 0.8, 2.5);
      let brightScale = map(count, minCount, maxCount, 10, 100);

      push();

      translate(x, y);

      //determine the latest number and rotate
      for(let i = 0; i < latestWinBall.length; i++){
        if (number == latestWinBall[i]){
          rotate(radians(latestrotate));
        }
      }

      noStroke();
      fill(150, 100, brightScale);
      rect(0, 0, rectSize * sizeScale, rectSize * sizeScale);

      pop();

      fill(0);
      textSize(16*sizeScale);
      text(number, x, y);
      
      number++;
    }
  }

  let meganumber = 1;

  for (let row = 0; row < 4; row++){
    for(let col = 0; col<6; col++){

      let x = 1100 + col * stepSize;
      let y = 200 + row * stepSize;

      let count = megaCounts[meganumber - 1];

      let sizeScale = map(count, megaMinCount, megaMaxCount, 0.8, 2.5);
      let brightScale = map(count, megaMinCount, megaMaxCount, 10, 100);

      push();

      translate(x, y);
      
      if (meganumber == latestMegaBall){
        rotate(radians(latestrotate));
      }

      rectMode(CENTER);
      colorMode(HSB);

      noStroke();
      fill(276, 100, brightScale);
      rect(0, 0, rectSize * sizeScale, rectSize * sizeScale);

      pop();
      
      fill(0);
      textSize(16*sizeScale);
      text(meganumber, x, y);

      meganumber++;
    }
  }

}