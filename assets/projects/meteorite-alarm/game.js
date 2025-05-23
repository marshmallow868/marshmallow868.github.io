let meteors = [
    {x: 75, y: 25, v: 8, d: 31, t: 0},
    {x: 195, y: 25, v: 7, d: 30, t: 0},
    {x: 315, y: 25, v: 10, d: 29, t: 0},
    {x: 435, y: 25, v: 9, d: 30, t: 0},
    {x: 555, y: 25, v: 8, d: 29, t: 0},
    {x: 675, y: 25, v: 8, d: 31, t: 0},
    {x: 795, y: 25, v: 11, d: 30, t: 0},
    {x: 915, y: 25, v: 9, d: 29, t: 0}
];

let ship = {};
let ship_farbe = (135);
let points = 0;
let schilder = 500;
let lives = 3;
let regeneration = 3;
let start = 400;
let run = 0;
let highscore = 0;
let looos = 0;
let wow = 25;
let tot = 0;

function setup() {
    createCanvas(1000, 700);
    frameRate(60);
    background(120);
    ship = {x: width / 2, y: height / 2};
    noLoop();
}

function draw() {
    background(43);
    noStroke();
    fill(95);
    rect(0, 0, width, height, 15);
    fill(0);
    rect(5, 5, width - 10, height - 10, 10);

    fill(130, 74, 0)
    for (let i = 0; i < meteors.length; i = i + 1) {
        let cm = meteors[i];

        if (cm.t == 3) fill(0);
        if (cm.t == 2) fill(40, 24, 0);
        if (cm.t == 1) fill(80, 54, 0);
        if (cm.t == 0) fill(130, 74, 0);

        if (cm.y < ship.y + 16.5 && cm.y > ship.y - 16.5 && cm.x < ship.x + 16.5) {
            if (cm.x > ship.x - 16.5 && cm.t != 1 && start == 0 && cm.a == 0) {
                if (!keyIsDown(191) && schilder > 0) {
                    lives -= 1;
                    cm.a = 1;
                }
            }
        }

        circle(cm.x, cm.y, cm.d);
        cm.y += cm.v;

        if (cm.y > height + 10) {
            cm.y = 0;
            cm.x = random(0, width);
            cm.x = int(cm.x);
            cm.t = 0;
            cm.a = 0;
            if (start == 0) {
                points += 100;
                if (points > highscore) highscore += 100;
            }
        }
    }

    if (lives == 1) wow = 0;
    else if (lives == 0) {
      tot = 1;
      lives = 3;
    }

    if (tot == 1 && wow == 25) {
        fill(255);
        textSize(20);
        text("Press Space to start again", width - 246, height - 12);
        lives = 3;
        regeneration = 3;
        schilder = 500;
        munition = 500;
        points = 0;
        start = 400;
        ship = {x: width / 2, y: height / 2};
        noLoop();
        tot = 0;
    }

    if (keyIsDown(87) && ship.y > 20) ship.y -= 8;
    if (keyIsDown(68) && ship.x < width - 20) ship.x += 8;
    if (keyIsDown(83) && ship.y < height - 20) ship.y += 8;
    if (keyIsDown(65) && ship.x > 20) ship.x -= 8;

    if (run == 0 || keyIsDown(71)) {
        fill(0);
        rect(5, 5, width - 10, height - 10, 10);
        fill(255);
        if (run == 0) {
            textSize(20);
            text("Press Space to start", width - 192, height - 12);
            textSize(35);
            text("Meteorite Alarm - Start", 10, 38);
        }
        if (run == 1) {
            textSize(35);
            text("Meteorite Alarm - Guide", 10, 38);
        }
        textSize(20);
        text("Use WASD to control your ship", 11, 80);
        text("Press Esc to pause the game", 11, 100);
        text("Press # to activate the shields", 11, 120);
        text("You can only use it for 10 seconds", 11, 140);
        text("Press R to regenerate", 11, 160);
        text("Press G to open this guide", 11, 180);
        noLoop();
    }

    if (keyIsDown(191) && schilder != 0) {
        stroke("yellow");
        strokeWeight(17);
        point(ship.x, ship.y);
        schilder -= 1;
    }
    stroke(ship_farbe);
    strokeWeight(25);
    point(ship.x, ship.y);
    if (wow < 25 && tot == 1) {
        stroke("yellow");
        strokeWeight(wow);
        point(ship.x, ship.y);
        wow = wow + 1;
    }
    noStroke();

    fill(255);
    circle(900, 28, 30);
    if (lives == 3) {
        ship_farbe = (135);
        circle(970, 28, 30);
        circle(935, 28, 30);
    } else if (lives == 2) {
        ship_farbe = (100);
        circle(935, 28, 30);
    } else if (lives == 1) ship_farbe = (65);

    fill(255);
    textSize(35);
    text("Meteorite Alarm", 10, 38);
    textSize(20);
    text("Shield: " + schilder / 50 + " seconds", 11, height - 72);
    text("Regeneration: " + regeneration, 11, height - 52);
    text("Score: " + points, 11, height - 32);
    text("Highscore: " + highscore, 11, height - 12);

    if (keyIsDown(82) && lives != 3 && regeneration != 0) {
        lives = 3;
        regeneration = regeneration - 1;
    }

    if (keyIsDown(27)) {
        fill(255);
        textSize(55);
        text("Pause", width / 2 - 80, height / 2 - 30);
        textSize(15);
        text("Press C to continue", width / 2 - 65, height - 12);
        noLoop();
    }

    if (start > 0) start -= 2;

    fill(255);
    textSize(55);
    if (start < 398 && start > 300) text("3", width / 2 - 14, height / 2 - 30);
    else if (start < 300 && start > 200) text("2", width / 2 - 14, height / 2 - 30);
    else if (start < 200 && start > 100) text("1", width / 2 - 17, height / 2 - 30);
    else if (start < 100 && start > 0) text("Go!", width / 2 - 42, height / 2 - 30);
}

function keyPressed() {
    if (keyCode == 32) {
        run = 1;
        loop();
    } else if (keyCode == 67) {
        loop();
        start = 400;
    }
}