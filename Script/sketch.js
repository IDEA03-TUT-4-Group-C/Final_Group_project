function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);
}

function drawCreeper(xPos, yPos, size){
  //strokeWeight(1)
  noStroke()
  
  let eyeWidth = 15, eyeHeight = 15 
  
  let maxXDist = canvasSize - xPos;     //available x-distance 
  let maxYDist = canvasSize - yPos;     //available y-distance 
  let maxXSize = (maxXDist)/(3*eyeWidth)-0.1
  let maxYSize = (maxYDist)/(3*eyeHeight)-0.1
  if (size > maxXSize || size > maxYSize){
    if(maxYSize>maxXSize){
      size = maxXSize
    }else{
      size = maxYSize
    }
  }

  let eyeSize = eyeWidth*size
  let reye_X = xPos+(2*eyeSize)

  //left eye
  rect(xPos, yPos, eyeWidth*size, eyeHeight*size)

  //right eye
  rect(reye_X, yPos, eyeWidth*size, eyeHeight*size)

  //LS mouth
  rect(xPos+(0.5*eyeSize),yPos+(1.5*eyeSize),0.5*eyeSize,1.5*eyeSize)

  //centre nose and mouth
  rect(xPos+eyeSize,yPos+eyeSize,eyeSize,1.5*eyeSize)

  //RS mouth
  rect(xPos+(2*eyeSize),yPos+(1.5*eyeSize),0.5*eyeSize,1.5*eyeSize)
}

