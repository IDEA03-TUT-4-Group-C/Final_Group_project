
//public variable
let IsmapGenerate = 0;
let IsTreeGenerate = 0;
let IsPacManGenerate = 0;
let IsGhosGenerate = 0;
let Size = 1;
// stroage the coordinate of each road
let ArrRoadX =[]
let ArrRoadY =[]
let RoadWidth = 20;
// stroage the roadmark type of each road
let ArrRoadMarkTypeX =[]
let ArrRoadMarkTypeY =[]
let CanvasSize = 600;
let NumOfHorizontalRoad = 6
let NumOfVerticalRoad = 8
let ArrTreeX =[];
let ArrTreeY =[];
let ArrTreeXSize = [];
let ArrTreeYSize = [];
let PacmanYpos =0;
let PacmanXpos = 0;
let GhostXpos = 0;
let GhostYpos = 0;
let eyeWidth = 25;
let eyeHeight = 25; 
let Timecount = 0;

// to control Size change
function setup() {
  background(220);
}


function draw() {
  createCanvas(CanvasSize, CanvasSize);
  colorMode(RGB);
  background(255,255,20);
  drawCreeper(300*Size,300*Size,Size)
  GenerateMap(6,8,Size)
  GeneratePacMan();
  GenerateTrees(20)
  Generateghost(200*Size,300*Size,Size)
  //DrawTrees(200,200,1)
  Timecount += 0.005
  Respond();
}

// to generate the road map
function GenerateMap(NumOfHorizontalRoad,NumOfVerticalRoad,Size){
//to calculate the gap diatence between each roads
  let IntervalHeight = 600 / NumOfHorizontalRoad * Size;
  let IntervalWidth = 600/ NumOfVerticalRoad * Size;
  if( IsmapGenerate == 0){
    for (let i = 0; i < NumOfHorizontalRoad; i++) {
      ArrRoadY[i] = Math.floor(IntervalHeight*i +random(10*Size,IntervalHeight-10*Size));
      ArrRoadMarkTypeY[i] = Math.trunc(random(1,3))
    }
    for (let i = 0; i < NumOfVerticalRoad; i++) {
      ArrRoadX[i] = Math.floor(IntervalWidth*i +random(10*Size,IntervalWidth-10*Size));
      ArrRoadMarkTypeX[i] = Math.trunc(random(1,3))
    }
    IsmapGenerate = 1
  }

  //draw road and roadmark on the road
  for (let i = 0; i < NumOfHorizontalRoad; i++) {
    GenerateRoad(0,ArrRoadY[i]*Size,Size,600,1);
    GenerateRoadMark(0,ArrRoadY[i]*Size+8*Size,600*Size,ArrRoadMarkTypeY[i],1)
  }

  for (let i = 0; i < NumOfVerticalRoad; i++) {
    GenerateRoad(ArrRoadX[i]*Size,0,Size,600,0);
    GenerateRoadMark(ArrRoadX[i]*Size+8*Size,0,600*Size,ArrRoadMarkTypeX[i],0)
  }

  // draw crossing area
   for (let p = 0; p < NumOfVerticalRoad; p++){
    let CrossingHoverX = ArrRoadX[p]*Size;
    for (let q = 0; q < NumOfHorizontalRoad; q++){
      let CrossingHoverY = ArrRoadY[q]*Size;
      fill(220)
      rect(CrossingHoverX-(RoadWidth/2),CrossingHoverY,2*RoadWidth,RoadWidth);
      rect(CrossingHoverX,CrossingHoverY-(RoadWidth/2),RoadWidth,2*RoadWidth);
      GenerateRoadMark(CrossingHoverX-RoadWidth/2,CrossingHoverY,0,3,0);
      GenerateRoadMark(CrossingHoverX+RoadWidth,CrossingHoverY,0,3,0);
      GenerateRoadMark(CrossingHoverX,CrossingHoverY-RoadWidth/2,0,3,1);
      GenerateRoadMark(CrossingHoverX,CrossingHoverY+RoadWidth,0,3,1);
    }
   }
  // GenerateRoad(0,ArrRoadY,Size,600,1);
  // GenerateRoad(ArrRoadX,0,Size,600,0);
}

//to draw a road
function GenerateRoad(Xpos,Ypos,Size,Roadlength,RoadDirection){
//for RoadDirection
// 1 for horizontal position
// 0 for vertical
let RoadWidth = 20;
RoadWidth=RoadWidth*Size;
Roadlength = Roadlength*Size

noStroke();
fill(220);
if(RoadDirection == 0){
  rect(Xpos,Ypos,RoadWidth,Roadlength);

}
if(RoadDirection == 1){
  rect(Xpos,Ypos,Roadlength,RoadWidth);
}
}
// to draw roda mark on the road
function GenerateRoadMark(Xpos,Ypos,Marklength,MarkType,MarkDirection){
//for MarkDirection
// 1 for horizontal position
// 0 for vertical
//for marktype
// 1 for single line
// 2 for double line
// 3 for zebra crossing

//draw single line
   if(MarkType == 1){
    if(MarkDirection == 1){
      fill(255,255,255);
      rect(Xpos,Ypos,Marklength,5*Size)
    }
    if(MarkDirection == 0){
      fill(255,255,255);
      rect(Xpos,Ypos,3*Size,Marklength)
    }
   }

// draw double line
   if(MarkType == 2){
    if(MarkDirection == 1){
      fill(255,255,255);
      rect(Xpos,Ypos,Marklength,3*Size)
      rect(Xpos,Ypos+4*Size,Marklength,3*Size)
    }
    if(MarkDirection == 0){
      fill(255,255,255);
      rect(Xpos,Ypos,3*Size,Marklength)
      rect(Xpos+4*Size,Ypos,3*Size,Marklength)
    }
   }

//draw zebra crossing
   if(MarkType == 3){
    let LineNumber = 4;
    let gap = 0;
    LineNumber = Math.floor(4 + Size + 1);
    gap = RoadWidth/((2 * LineNumber) + 1)
    if(MarkDirection == 1){
      fill(255,255,255);
      for(i = 1;i<LineNumber+1;i+=1){
        rect(Xpos+((2*i-1)*gap),Ypos,gap,RoadWidth/2)
      }
    }
    if(MarkDirection == 0){
      fill(255,255,255);
      for(i = 1;i<LineNumber+1;i+=1){
        rect(Xpos,Ypos+((2*i-1)*gap),RoadWidth/2,gap)
      }
    }
   }
}

// To generate a pacman
function GeneratePacMan(){
  if(IsPacManGenerate == 0){
    PacmanYpos = ArrRoadY[Math.floor(random(0,NumOfVerticalRoad))]+10*Size;
    PacmanXpos = random(0+10*Size,CanvasSize-10*Size)
    IsPacManGenerate = 1;
  }

  DrawPacMan(PacmanXpos*Size,PacmanYpos*Size,Size);

}
// for draw pacman
function DrawPacMan(x, y, size) {
  let startAngle = PI / 6;
  let endAngle = -PI / 6;
  fill(255, 125, 0);
  arc(x, y, 20*size, 20*size, startAngle, endAngle, PIE);
}

//to generate trees
function GenerateTrees(TreeNumbers){
  let TreeCode = [];
  let TreeXCode = 0;
  let TreeYCode = 0;
  let TreeX = 0;
  let TreeY = 0;
  let MaxSize = 0;
  let MaxXSize = 0;
  let MaxYSize = 0;
  if(IsTreeGenerate == 0){
    while (TreeCode.length<TreeNumbers) {
      let TreeCodeNumber = Math.ceil((Math.random()*NumOfHorizontalRoad*NumOfVerticalRoad)+1)
      if(TreeCode.find(x=>x===TreeCodeNumber)===undefined){
        TreeCode.push(TreeCodeNumber);
      }
    }

    
    IsTreeGenerate = 1 ;
    //console.log(TreeCode);
  }
//To get the Coordinate of X and MaxSize of X
for(let i = 0;i<TreeCode.length;i++){
  TreeXCode = TreeCode[i]-(Math.ceil((TreeCode[i]/(NumOfHorizontalRoad+1)))-1)*(NumOfHorizontalRoad+1);
  if(TreeXCode == 1){
    TreeX = ArrRoadX[TreeXCode-1]/2;
    MaxXSize = ArrRoadX[TreeXCode-1]/2/(15);
    ArrTreeX.push(TreeX);
    ArrTreeXSize.push(MaxXSize);
    //console.log("1")
  }else if(TreeCode == NumOfHorizontalRoad){
    TreeX = CanvasSize - ((CanvasSize - ArrRoadX[TreeXCode-1])/2)
    ArrTreeX.push(TreeX);
    //console.log("2")
  }else{
    TreeX = ArrRoadX[TreeXCode-2]+((ArrRoadX[TreeXCode-1] - ArrRoadX[TreeXCode-2]+RoadWidth)/2)
    MaxXSize = ((ArrRoadX[TreeXCode-1] - ArrRoadX[TreeXCode-2])/2)/(15)
    ArrTreeX.push(TreeX);
    ArrTreeXSize.push(MaxXSize);
    //console.log("3")
}
  //console.log(ArrTreeX);
}

//To get the Coordinate of Y and MaxSize of Y
for(let i = 0;i<TreeCode.length;i++){
  TreeYCode = Math.ceil((TreeCode[i]/(NumOfHorizontalRoad+1)));
  if(TreeYCode == 1){
    TreeY = ArrRoadY[TreeYCode-1]/2;
    MaxYSize =ArrRoadY[TreeYCode-1]/2/(15);
    ArrTreeY.push(TreeY);
    ArrTreeYSize.push(MaxYSize);
    //console.log("1")
  }else if(TreeCode == NumOfHorizontalRoad){
    TreeY = CanvasSize - ((CanvasSize - ArrRoadY[TreeYCode-1])/2)
    ArrTreeY.push(TreeY);
    //console.log("2")
  }else{
    TreeY = ArrRoadY[TreeYCode-2]+((ArrRoadY[TreeYCode-1] - ArrRoadY[TreeYCode-2]+RoadWidth)/2)
    MaxYSize = ((ArrRoadY[TreeYCode-1] - ArrRoadY[TreeYCode-2])/2)/(15);
    ArrTreeY.push(TreeY);
    ArrTreeYSize.push(MaxYSize);
    //console.log("3")
}
  //console.log(ArrTreeY);
}
for(let i = 0;i<TreeNumbers+1;i++){
  if (ArrTreeXSize[i]<ArrTreeYSize[i]){
    MaxSize = ArrTreeXSize[i];
  }
  if (ArrTreeYSize[i]<ArrTreeXSize[i]){
    MaxSize = ArrTreeYSize[i];
  }
  DrawTrees(ArrTreeX[i]*Size,ArrTreeY[i]*Size,MaxSize*Size,i%4);
  //console.log(MaxSize)
  
}

}
  // console.log(TreeXCode)
  // console.log(TreeYCode)
  //console.log(TreeX)
  // console.log(TreeY)
//for draw a single trees
function DrawTrees(x,y,size,InnerNumber) {
    let tree = new Tree(x,y,size*(2*noise(Timecount)),0,255,0)
     tree.draw();
    if(InnerNumber == 2 || InnerNumber ==3){
    let tree2 = new Tree(x,y,(size-0.5)*(2*noise(Timecount+1)),0,0,255)
    tree2.draw();
    }
    if(InnerNumber ==3){
    let tree3 = new Tree(x,y,(size-1)*(2*noise(Timecount+3)),255,0,0)
    tree3.draw();
    }
}

//To generate Ghost
function Generateghost(){
  if(IsGhosGenerate == 0){
    GhostXpos = ArrRoadX[Math.floor(random(0,NumOfHorizontalRoad))]+10*Size;
    GhostYpos = random(0+10*Size,CanvasSize-10*Size);
    IsGhosGenerate = 1;
  }
  Drawghost(GhostXpos*Size,GhostYpos*Size,Size);
}

//draw ghost
function Drawghost(x, y, size){
  //the color of ghost is yellow
  fill(255, 204, 0);
  stroke(0);

  //Use a semicircle for the ghost’s head
  arc(x, y, size * 20, size * 20, PI, 0);

  //Use a square for the body of the ghost
  rect(x - size * 10, y, size * 20, size * 20);

  //Use four small triangles for the body of the ghost
  triangle(x - size * 10, y + size * 20, x - size * 5, y + size * 25, x, y + size * 20);
  triangle(x, y + size * 20, x + size * 5, y + size * 25, x + size * 10, y + size * 20);

  //Draw ghost eyes
  fill(0);
  ellipse(x - size*5, y - size*5, size*5, size*5);
  ellipse(x + size*5, y - size*5, size*5, size*5);
}

//creeper face
function drawCreeper(xPos, yPos, size){
  //strokeWeight(1)
  noStroke()  
  let maxXDist = CanvasSize - xPos;     //available x-distance 
  let maxYDist = CanvasSize - yPos;     //available y-distance 
  let maxXSize = (maxXDist)/(3*eyeWidth)-0.1
  let maxYSize = (maxYDist)/(3*eyeHeight)-0.1
  if (size > maxXSize || size > maxYSize){
    if(maxYSize>maxXSize){
      size = maxXSize
    }else{
      size = maxYSize
    }
  }
  
  // let creeper1 = new CreeperFace(xPos+map(noise(Timecount),0,1,-300*size,300*size),yPos-100*size+map(noise(Timecount+100),0,1,-300*size,300*size),size*map(noise(Timecount),0,1,0.5,2))
  // let creeper2 = new CreeperFace(xPos-100*size+map(noise(Timecount+25),0,1,-300*size,300*size),yPos+50*size+map(noise(Timecount+125),0,1,-300*size,300*size),size*map(noise(Timecount+50),0,1,0.5,2))
  // let creeper3 = new CreeperFace(xPos+100*size+map(noise(Timecount+50),0,1,-300*size,300*size),yPos+50*size+map(noise(Timecount+150),0,1,-300*size,300*size),size*map(noise(Timecount+100),0,1,0.5,2))
  for (i=0;i<20;i++){
    let creeper = new CreeperFace(xPos+map(noise(Timecount+i*50),0,1,-400*size,400*size),yPos+map(noise(Timecount+i*100),0,1,-500*size,500*size),size*map(noise(Timecount+i*50),0,1,0.5,2));
    fill(256*noise(Timecount+i*20),256*noise(Timecount+i*10),256*noise(Timecount+i*30))
    creeper.Draw()
    //creepers.pop(creeper);
  }
  fill(256*noise(Timecount),256*noise(Timecount+40),256*noise(Timecount+80))

  // creeper1.Draw()
  // creeper2.Draw()
  // creeper3.Draw()
}


//respond to the window 
function Respond(){
let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;
//to adjust the size of canvas
if(windowHeight >= windowWidth){
  CanvasSize = windowWidth;
}
if(windowWidth >= windowHeight){
  CanvasSize = windowHeight;
}
Size = CanvasSize/600
RoadWidth = 20*Size;
}

class Tree{
  constructor(InX,InY,InSize,InRed,InGreen,InBlue){
    this.x = InX;
    this.y = InY;
    this.size = InSize;
    this.Red = InRed;
    this.Green = InGreen;
    this.Blue = InBlue;
  }
  draw(){
    fill(this.Red, this.Green, this.Blue)
    circle(this.x,this.y,this.size)
    circle(this.x,this.y+5*this.size,10*this.size)
    circle(this.x,this.y-5*this.size,10*this.size)
    circle(this.x+5*this.size,this.y,10*this.size)
    circle(this.x-5*this.size,this.y,10*this.size)
    circle(this.x+5*this.size,this.y+5*this.size,5*this.size)
    circle(this.x-5*this.size,this.y-5*this.size,5*this.size)
    circle(this.x+5*this.size,this.y-5*this.size,5*this.size)
    circle(this.x-5*this.size,this.y+5*this.size,5*this.size)
  }
}

class CreeperFace{
  constructor(InX,InY,InSize){
    this.xPos = InX;
    this.yPos = InY;
    this.size = InSize
}
Draw(){
      //left eye
      rect(this.xPos, this.yPos, 25*this.size, 25*this.size)

      //right eye
      rect(this.xPos+(2*25*this.size), this.yPos, 25*this.size, 25*this.size)
    
      //LS mouth
      rect(this.xPos+(0.5*25*this.size),this.yPos+(1.5*25*this.size),0.5*25*this.size,1.5*25*this.size)
    
      //centre nose and mouth
      rect(this.xPos+25*this.size,this.yPos+25*this.size,25*this.size,1.5*25*this.size)
    
      //RS mouth
      rect(this.xPos+(2*25*this.size),this.yPos+(1.5*25*this.size),0.5*25*this.size,1.5*25*this.size)
    
}
}