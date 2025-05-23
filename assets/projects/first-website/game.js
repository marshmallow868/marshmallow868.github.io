let dM = 20

let meteors = []

let meteor1 = {X: 20, Y:25, v:3}
let meteor2 = {X: 185, Y:25, v:2}
let meteor3 = {X: 265, Y:25, v:2}
let meteor4 = {X: 435, Y:25, v:2}
let meteor5 = {X: 65, Y:25, v:2}
let meteor6 = {X: 385, Y:25, v:2}
let meteor7 = {X: 140, Y:25, v:3}
let meteor8 = {X: 305, Y:25, v:3}

meteors.push(meteor1)
meteors.push(meteor2)
meteors.push(meteor3)
meteors.push(meteor4)
meteors.push(meteor5)
meteors.push(meteor6)
meteors.push(meteor7)
meteors.push(meteor8)

let ship = {}

function setup() {
  createCanvas(450, 300)
  frameRate(60)
  background(1, 0, 46)
  ship = { X: width/2 }
}


function draw() {
  background(1, 0, 46)

  stroke("lightblue")
  strokeWeight(3)
  point(160,40)
  point(230,200)
  point(170,270)
  point(100,250)
  point(30,430)
  point(200,100)
  point(370,100)
  point(40,40)
  point(100,120)
  point(300,230)
  point(280,70)
  
  noStroke()
  
  fill(0, 0, 255)
  circle(100,80,18)
  circle(250,200,20)
  circle(70,230,18)
  circle(370,100,16)
  
  noStroke()
  fill(130, 74, 0)
  for (let i=0; i< meteors.length; i=i+1){

    let current_meteor = meteors[i]
    
    circle(current_meteor.X, current_meteor.Y, dM)

    current_meteor.Y = current_meteor.Y + current_meteor.v

    if(current_meteor.Y > height+10){
    
      current_meteor.Y = 0 - 10
      current_meteor.X = random(0,width)
      current_meteor.X = int(current_meteor.X)

    }
  }

  fill(192)
  if (keyIsDown(37)) {
    if (ship.X > 0) {
      ship.X = ship.X - 3;
    }
  }
  if (keyIsDown(39)) {
    if (ship.X < width) {
      ship.X = ship.X + 3;
    }
  }

  triangle(ship.X-8, 287, ship.X, 262, ship.X+8, 287)

  fill(0)
  rect(0,0,450,30)

  fill(255)
  circle(432,18,15)

  fill("red")
  rect(0,290,450,5)
  
  fill(140)
  rect(0,0,450,5)
  rect(0,30,450,5)
  rect(0,295,450,5)
  rect(0,0,5,300)
  rect(445,0,5,300)

  textSize(20)
  fill("yellow")
  text('Meteroiten Alarm', 145, 25)

  textSize(15)
  fill("black")
  text('1', 428, 23)
}

function keyPressed() {
  if (keyCode == 80) {
    console.log('PAUSED')
    noLoop()
  }
  if (keyCode == 67) {
    console.log('CONTINIUED')
    loop()
  }
}