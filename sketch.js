let webcam;
let detector;

let videoFrame;

let state = 1;
// 0: main page  1: recording page  2: paused page  3: saved page

let btn_pause = [];
let btn_record = [];
let btn_stop = [];
let icon_person;
let stateIndicator = [];

let recordingTime = '00:00:00';
let recordingStartTime;

let peopleNumber = 0;

function preload() {  
  detector = ml5.objectDetector('cocossd');
  
  videoFrame = loadImage('img/video_preview.png');
  
  btn_pause[0] = loadImage('img/pause_disabled.png');
  btn_pause[1] = loadImage('img/pause_activated.png');
  
  btn_record[0] = loadImage('img/record_stop.png');
  btn_record[1] = loadImage('img/record_recording.png');
  btn_record[2] = loadImage('img/record_paused.png');
  btn_record[3] = loadImage('img/record_saved.png');
  
  btn_stop[0] = loadImage('img/stop_disabled.png');
  btn_stop[1] = loadImage('img/stop_activated.png');
  
  icon_person = loadImage('img/People counter.png');
  
  stateIndicator[0] = loadImage('img/tapToRecord.png');
  stateIndicator[1] = loadImage('img/state_recording.png');
  stateIndicator[2] = loadImage('img/state_paused.png');
  stateIndicator[3] = loadImage('img/state_saved.png');
}

function setup() {
  createCanvas(720, 485);
  webcam = createCapture(VIDEO);
  webcam.size(720, 307);
  webcam.hide();
  
  
}

function draw() {
  background(0);
  
  drawStatusBar(state);
  drawVideoPreview(0,57,720,307);
  drawCounter(state);
  drawStateIndicator(state);
  drawButtons(state);
}
//==================== 1.Draw Video Preview
function drawVideoPreview(x, y, w, h){
  image(webcam, x, y, w, h);
  image(videoFrame, x, y, w, h);
}

//==================== 2.Draw Buttons
function drawButtons(currentState){
  let pause_stop_button_number = 0;
  if(currentState == 1){
    pause_stop_button_number = 1;
  }  
  image(btn_pause[pause_stop_button_number], 26, 424, 43, 43);
  image(btn_record[currentState], 92, 424, 43, 43);
  image(btn_stop[pause_stop_button_number], 159, 424, 43, 43);
}

//==================== 3.Draw Status Bar
//==================== 3.Draw Status Bar
function drawStatusBar(currentState){
  fill(255, 51);
  noStroke();
  rect(26,15,123,29,4);
  rect(159,15,94,29,4);
  rect(263,15,110,29,4);
  
  textFont('Inter');
  textSize(14);
  
  let currentTime = ''+nf(hour(),2,0)+':'+nf(minute(),2,0)+':'+nf(second(),2,0);
  let currentDate = ''+year()+'.'+nf(month(),2,0)+'.'+nf(day(),2,0)+'.';
  
  if(currentState == 0){
    noFill();
    stroke(255,153);
    strokeWeight(2);
    ellipse(46,28,11,11);
    fill(255,153);
    noStroke();
    textAlign(LEFT);
    text(recordingTime, 71, 34);
    textAlign(CENTER);
    text(currentTime, 210, 34);
    textAlign(LEFT);
    text(currentDate, 280, 34);
  }else if(currentState == 1){
    fill(202,38,38);
    noStroke();
    ellipse(46,28,12,12);
    fill(202,38,38);
    noStroke();
    textAlign(LEFT);
    text(recordingTime, 71, 34);
    fill(255);
    textAlign(CENTER);
    text(currentTime, 210, 34);
    textAlign(LEFT);
    text(currentDate, 280, 34);
  }else if(currentState == 2){
    noFill();
    stroke(202,38,38);
    strokeWeight(2);
    ellipse(46,28,11,11);
    fill(202,38,38);
    noStroke();
    textAlign(LEFT);
    text(recordingTime, 71, 34);
    fill(255,153);
    textAlign(CENTER);
    text(currentTime, 210, 34);
    textAlign(LEFT);
    text(currentDate, 280, 34);
  }else if(currentState == 3){
    noFill();
    stroke(255,153);
    strokeWeight(2);
    ellipse(46,28,11,11);
    fill(255,153);
    noStroke();
    textAlign(LEFT);
    text(recordingTime, 71, 34);
    textAlign(CENTER);
    text(currentTime, 210, 34);
    textAlign(LEFT);
    text(currentDate, 280, 34);
  }
}

//==================== 4.Draw State Indicator
function drawStateIndicator(currentState){
  fill(255, 70);
  noStroke();
  rect(223,426,123,29,4);
  image(stateIndicator[currentState], 223,430,120,24);
}

//==================== 5.Draw Counter
function drawCounter(currentState){
  fill(255, 51);
  noStroke();
  rect(26,380,120,30,4);
  
  textFont('Poppins');
  textSize(14);
  
  if(currentState == 1){
    fill(255);
    textAlign(LEFT);
    text(peopleNumber, 125,400);
    image(icon_person, 28, 385,95,19);
  }else{
    fill(255,153);
    textAlign(LEFT);
    text(peopleNumber, 125,400);
    tint(255,153);
    image(icon_person, 28,385,95,19);
    tint(255);
  }
}



function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  
  detectedObjects = results;
  detector.detect(webcam, gotDetections);
}





function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  
  detectedObjects = results;
  detector.detect(webcam, gotDetections);
}


