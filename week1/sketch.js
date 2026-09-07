// change the quotes in this array. Be mindful of the quotation marks!
// this is the only part of the file you need to edit!

const quotes = [
  { text: "a process, based on exploration, iteration, reflection and discovery", source: "Mark C. Mitchell & Oliver Bown" },
  { text: "a human dialogue with the machine, through code as the interface", source: "Tim Rodenbröker" },
  { text: "a play with algorithms", source: "Zach Lieberman" },
  { text: "an exploratory process of experimentation and play", source: "Daniel Shiffman" },
  { text: "writing the code and designing the thing are part of the same process", source: "Erik van Blokland" },
  { text: "where self-expression and logic meet", source: "Mona Bassel" },
  { text: "a method of exploring code through the lens of designer", source: "Nahuel Gerth" },
  { text: "an experimentation-heavy activity that requires translating high-level visual ideas into code", source: "Mark Edward M. Gonzales et al." }
];
// no need to edit anything below this line! 
// if you have made an error, you can check your history to see what might have gone wrong

// a variable that holds the current quote
let current = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Seed with millis() so each page load gives a different quote.
  randomSeed(millis());
  textSize(32);
  fill(10, 255, 10);
  // calls the function to pick a quote
  pickQuote();
}

function pickQuote() {
  // take a random number and use that to identify what quote to use
  current = quotes[floor(random(quotes.length))];
}

function draw() {
  background(255, 20, 250); // set the background color
  drawQuote();  // draw the quote on screen
}

function drawQuote() {   // draw text
  textAlign(CENTER, CENTER);
  text("Creative Coding is.....", width / 2, height / 2 - 48);
  textStyle(BOLD);
  text("'" + current.text + "'", width / 2, height / 2);
  textAlign(RIGHT, CENTER);
  text("-" + current.source, width - 100, height - 100);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function newQuote() {
  pickQuote();
  redraw();
}

function mousePressed() {
  newQuote();
}
