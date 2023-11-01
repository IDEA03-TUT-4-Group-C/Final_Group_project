//public variable
let IsmapGenerate = 0
let ArrRoadX =[]
let ArrRoadY =[]
let CanvasSize = 600;
let Size = 1;

function setup() {
  background(220);
}

function draw() {
  createCanvas(CanvasSize, CanvasSize);
  colorMode(RGB);
  background(255,20,20);
  GenerateMap();
  // GenerateMap(10,4,Size)
  // GeneratePacMan(400*Size, 400*Size,Size);
  // GenerateTrees(100*Size,300*Size,Size)
  // Generateghost(200*Size,300*Size,Size)
  // drawCreeper(50*Size,50*Size,Size)
  // Respond();
 


}


// function GenerateMap(NumOfHorizontalRoad,NumOfVerticalRoad,Size){
// //to calculate the gap diatence between roads
//   let IntervalHeight = 600 / NumOfHorizontalRoad * Size;
//   let IntervalWidth = 600/ NumOfVerticalRoad * Size;
//   if( IsmapGenerate == 0){
//     for (let i = 0; i < NumOfHorizontalRoad; i++) {
//       ArrRoadY[i] = Math.floor(IntervalHeight*i +random(10*Size,IntervalHeight));
      
//     }
//     for (let i = 0; i < NumOfVerticalRoad; i++) {
//       ArrRoadX[i] = Math.floor(IntervalWidth*i +random(10*Size,IntervalWidth));
      
//     }
//     IsmapGenerate = 1
//   }

//   for (let i = 0; i < NumOfHorizontalRoad; i++) {
//     GenerateRoad(0,ArrRoadY[i]*Size,Size,600,1);
    
//   }

//   for (let i = 0; i < NumOfVerticalRoad; i++) {
//     GenerateRoad(ArrRoadX[i]*Size,0,Size,600,0);
    
//   }
//   // GenerateRoad(0,ArrRoadY,Size,600,1);
//   // GenerateRoad(ArrRoadX,0,Size,600,0);
// }

// function GenerateRoad(Xpos,Ypos,Size,Roadlength,RoadDirection){
// //for RoadDirection
// // 1 for horizontal position
// // 0 for vertical
// let RoadWidth = 15;
// RoadWidth=RoadWidth*Size;
// Roadlength = Roadlength*Size

// noStroke();
// fill(220);
// if(RoadDirection == 0){
//   rect(Xpos,Ypos,RoadWidth,Roadlength);

// }
// if(RoadDirection == 1){
//   rect(Xpos,Ypos,Roadlength,RoadWidth);
// }
// }

// // for draw pacman
// function GeneratePacMan(x, y, size) {
//   let startAngle = PI / 6;
//   let endAngle = -PI / 6;
//   fill(255, 255, 0);
//   arc(x, y, 20*size, 20*size, startAngle, endAngle, PIE);
// }

// //for draw trees
// function GenerateTrees(x,y,size) {
//     fill(0, 255, 0); // Set the fill color to green
//     ellipse(x+10*Size, y-10*Size, 66*size, 66*size);
//     ellipse(x+35*Size, y, 40*size, 40*size);
//     ellipse(x-5*Size, y-40*Size, 40*size, 40*size);
//     ellipse(x-35*Size, y-20*Size, 50*size, 50*size);
//     ellipse(x-55*Size, y+10*Size, 40*size, 40*size);
//     ellipse(x-45*Size, y+40*Size, 30*size, 30*size);
//     ellipse(x-25*Size, y+30*Size, 40*size, 40*size);
//     ellipse(x-5*Size, y+40*Size, 50*size, 50*size);
//     ellipse(x+30*Size, y+30*Size, 40*size, 40*size);
//     ellipse(x-15*Size, y, 60*size, 60*size);
// }

// //draw ghost
// function Generateghost(x, y, size){
//   //the color of ghost is yellow
//   fill(255, 204, 0);
//   stroke(0);

//   //Use a semicircle for the ghost’s head
//   arc(x, y, size * 20, size * 20, PI, 0);

//   //Use a square for the body of the ghost
//   rect(x - size * 10, y, size * 20, size * 20);

//   //Use four small triangles for the body of the ghost
//   triangle(x - size * 10, y + size * 20, x - size * 5, y + size * 25, x, y + size * 20);
//   triangle(x, y + size * 20, x + size * 5, y + size * 25, x + size * 10, y + size * 20);

//   //Draw ghost eyes
//   fill(0);
//   ellipse(x - size*5, y - size*5, size*5, size*5);
//   ellipse(x + size*5, y - size*5, size*5, size*5);
// }

// //creeper face
// function drawCreeper(xPos, yPos, size){
//   //strokeWeight(1)
//   noStroke()
  
//   let eyeWidth = 15, eyeHeight = 15 
  
//   let maxXDist = CanvasSize - xPos;     //available x-distance 
//   let maxYDist = CanvasSize - yPos;     //available y-distance 
//   let maxXSize = (maxXDist)/(3*eyeWidth)-0.1
//   let maxYSize = (maxYDist)/(3*eyeHeight)-0.1
//   if (size > maxXSize || size > maxYSize){
//     if(maxYSize>maxXSize){
//       size = maxXSize
//     }else{
//       size = maxYSize
//     }
//   }

//   let eyeSize = eyeWidth*size
//   let reye_X = xPos+(2*eyeSize)

//   //left eye
//   rect(xPos, yPos, eyeWidth*size, eyeHeight*size)

//   //right eye
//   rect(reye_X, yPos, eyeWidth*size, eyeHeight*size)

//   //LS mouth
//   rect(xPos+(0.5*eyeSize),yPos+(1.5*eyeSize),0.5*eyeSize,1.5*eyeSize)

//   //centre nose and mouth
//   rect(xPos+eyeSize,yPos+eyeSize,eyeSize,1.5*eyeSize)

//   //RS mouth
//   rect(xPos+(2*eyeSize),yPos+(1.5*eyeSize),0.5*eyeSize,1.5*eyeSize)
// }


// //respond to the window 
// function Respond(){
// let windowHeight = window.innerHeight;
// let windowWidth = window.innerWidth;

// //to adjust the size of canvas
// if(windowHeight >= windowWidth){
//   CanvasSize = windowWidth;
// }
// if(windowWidth >= windowHeight){
//   CanvasSize = windowHeight;
// }
// Size = CanvasSize/600
// }
function GenerateMap(){
let road = new Road()
road.RoadX = 0
road.RoadY = 0
road.GenerateRoad()
return road
}

class Road{
  constructor(){
    this.Roadtype = 0;
    this.RoadX = 0;
    this.RoadY = 0;
    this.RoadWidth = 15;
    this.RoadLength = 600;
    this.Size = 1;
  }
  GenerateRoad(){
    noStroke();
    fill(220);
    if(this.Roadtype == 0){
      rect(this.RoadX,this.RoadY,this.RoadWidth,this.RoadLength);
    }
    if(this.Roadtype == 1){
      rect(this.RoadX,this.RoadY,this.RoadLength,this.RoadWidth);
    }
  }
}
