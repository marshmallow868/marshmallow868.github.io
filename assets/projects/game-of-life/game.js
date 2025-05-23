let rows;
let cols;
let cellSize = 15;
let currentGen;
let nextGen;
let playing = false;

let playButton, pauseButton;

function setup() {
    createCanvas(1000, 700);
    frameRate(10);
    background(43);

    rows = floor((height - 10) / cellSize);
    cols = floor((width - 10) / cellSize);

    currentGen = createGrid(rows, cols);
    nextGen = createGrid(rows, cols);

    playButton = createButton("Play");
    playButton.position(width + 150, height - 29);
    playButton.mousePressed(playGame);

    pauseButton = createButton("Pause");
    pauseButton.position(width + 198, height - 29);
    pauseButton.mousePressed(pauseGame);
}

function draw() {
    background(43);
    noStroke();

    displayGrid(currentGen, 5, 5);

    if (playing) {
        computeNextGen();
        let temp = currentGen;
        currentGen = nextGen;
        nextGen = temp;
    }
    
    noFill();
    stroke(95);
    strokeWeight(5);
    rect(2.5, 2.5, width - 5, height - 5, 12);
    strokeWeight(1);
}

function createGrid(rows, cols) {
    let grid = new Array(rows);
    for (let i = 0; i < rows; i++) {
        grid[i] = new Array(cols).fill(0);
    }
    return grid;
}

function computeNextGen() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let neighbors = countNeighbors(currentGen, i, j);
            if (currentGen[i][j] === 1 && (neighbors < 2 || neighbors > 3)) nextGen[i][j] = 0;
            else if (currentGen[i][j] === 0 && neighbors === 3) nextGen[i][j] = 1;
            else nextGen[i][j] = currentGen[i][j];
        }
    }
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            let row = (x + i + rows) % rows;
            let col = (y + j + cols) % cols;
            sum += grid[row][col];
        }
    }
    sum -= grid[x][y];
    return sum;
}

function displayGrid(grid, xOffset, yOffset) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 1) fill(0);
            else fill(255);
            stroke(0);
            rect(j * cellSize + xOffset, i * cellSize + yOffset, cellSize, cellSize);
        }
    }
}

function mousePressed() {
    let i = floor(mouseY / cellSize);
    let j = floor(mouseX / cellSize);
    currentGen[i][j] = 1 - currentGen[i][j];
}

function playGame() {
    playing = true;
}

function pauseGame() {
    playing = false;
}