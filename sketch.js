let resetBtn;

function make2DArray(cols, rows){
  let arr = new Array(cols);
  for (let i = 0 ; i < arr.length ; i++){
    arr[i] = new Array(rows)
    for (let j = 0 ; j < arr[i].length ; j++ )
      arr[i][j] = 0
  }
  return arr;
}

let grid;
let w = 5;
let cols, rows;

let hueValue = 200  



function withinCols(i){
  return i >= 0 && i <= cols - 1
}

function withinRows(j){
  return j >= 0 && j <= rows - 1
}

function resetCanvas() {
  for (let i = 0 ; i < cols ; i++) {
    for (let j = 0 ; j < rows ; j++) {
      grid[i][j] = 0;
    }
  }
}

function isMouseOverButton(btn) {
  let x = btn.position().x;
  let y = btn.position().y;
  let w = btn.size().width;
  let h = btn.size().height;
  return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
}


function setup() {
  createCanvas(1200, 800);
  colorMode(HSB , 360 , 255 , 255)
  cols = width / w;
  rows = height / w;
  grid = make2DArray(cols, rows)

  resetBtn = createButton("Reset Canvas");
  resetBtn.position(10, 10);
  resetBtn.mousePressed(resetCanvas);
  resetBtn.style('font-size', '16px');
resetBtn.style('padding', '5px 10px');

  

}

function mousePressed() {
  placeSandAtMouse();
}

function mouseDragged() {
  placeSandAtMouse();
}


function placeSandAtMouse(){

  if (isMouseOverButton(resetBtn)) return;

  let mouseCol = floor(mouseX / w);
  let mouseRow = floor(mouseY / w);

  let matrix = 5
  let extent = floor(matrix/2);
  for (let  i = -extent ; i <= extent ; i++){
    for (let  j = -extent ; j <= extent ; j++){
      if(random(1) < 0.75){
        let col = mouseCol + i;
        let row = mouseRow + j
        if (withinCols(col) && withinRows(row)){
  if (grid[col][row] === 0) {
  grid[col][row] = hueValue;
}
        }
    }}
  }

  hueValue += 1;
  if (hueValue > 360){
    hueValue = 1
  }
  
}

function draw() {
  background(0);

  if (mouseIsPressed) {
    placeSandAtMouse(); 
  }


  for (let i = 0 ; i < cols ; i++){
    for (let j = 0 ; j < rows ; j++){
      noStroke();
      if (grid[i][j] > 0){
        fill(grid[i][j], 255, 255);
      
      
      let x = i * w;
      let y = j * w;
      square(x , y , w)
    }}
  }


  let nextGrid = make2DArray(cols, rows);

    for (let i = 0 ; i < cols ; i++){
      for (let j = 0 ; j < rows ; j++){
        let state = grid[i][j];

        if (state > 0){
            let below = grid[i][j+1]

            let dir = 1;
            if(random(1) < 0.5){
              dir *= -1
            }

            let belowA = -1 
            let belowB = -1

            if(withinCols(i + dir)){
             belowA = grid[i + dir][j + 1]
            }
            if(withinCols(i - dir)){
             belowB = grid[i - dir][j + 1]
            }

            

            if(below === 0){
              nextGrid[i][j+1] = state
            }else if (belowA === 0 ){

              nextGrid[i + dir][j + 1] = state
            }else if (belowB === 0 ){
              nextGrid[i - dir][j + 1] = state
            }else{
              nextGrid[i][j] = state
            }
          
        }
  }
}

grid = nextGrid
}




