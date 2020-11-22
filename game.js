var canvas;//stores dimension of the canvas
var canvasContext;//store graphical info
var ball=50;//horizontal position of ball
var speed=50;//horizontal motion of ball
var ballY=30;//vertical position of ball 
var speedY=15;//vertical motion of ball
var paddleHeight=150;
const paddleWidth=20;
var paddle1Y=300;//verticle position of paddle
var playerScore=0;
var name=prompt('Enter your name');
//Need revision
function calcMousePos(evt){
     var rect = canvas.getBoundingClientRect();
     //The result is the smallest rectangle which contains the entire element,
    // with read-only left, top, right, bottom, x, y, width, and height properties describing the overall border-box in pixels. 
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;//ScrollLeft and right:Get the number of pixels the content of a <div> element is scrolled horizontally and vertically:
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return{
        x: mouseX,
        y: mouseY
    };
}

window.onload= function(){
canvas=document.getElementById('gameCanvas');//searches gameCanvas for information 
canvasContext=canvas.getContext('2d');//used to draw shape or design on the canvas
setInterval(function(){//to set time interval between every execution of function in it
    move();
    draw();
},50);
//Revise below
canvas.addEventListener('mousemove',
function(evt){
    var mousePos = calcMousePos(evt);
    paddle1Y=mousePos.y-paddleHeight/2;
})
}// method addEventListener() sets up a function that will be called whenever the specified event is delivered to the target

function ballReset(){
    ball=canvas.width/2 + 10;
    ballY=canvas.height/2;
    alert( "Well Tried :(");
    playerScore=0;
}

//func for motion 
function move(){
     if (paddle1Y<ballY && paddle1Y + paddleHeight>ballY && ball<=10){
     speed=-speed;
     playerScore+=1;
     }
     
     
    console.log(playerScore);
    ball= ball + speed;
    if(ball>canvas.width-5)
    speed= -30;
    if(ball<=-20){
    speed=-speed;
    ballReset();
    }

    ballY = ballY+speedY;
    if(ballY>canvas.height-5)
    speedY=-speedY;
    if(ballY<5)
    speedY=-speedY;
}
//func to display every shape on the canvas
function draw(){
    makeRect(0,0,canvas.width,canvas.height,'black');//background
    makeRect(5,paddle1Y,paddleWidth,paddleHeight,'white');//paddle
    makeCircle(ball,ballY,10,0,Math.PI*2,true);//circle
    canvasContext.font="30px Georgia";
    canvasContext.fillText((name+' :    '+playerScore),50,50);
    if(playerScore>=10){
        canvasContext.font="50px Georgia";
        canvasContext.fillText("YOU WIN",200,200);
        }
}
//func to create the rectangle shape
function makeRect(left,top,width,height,color){
    canvasContext.fillStyle = color;
    canvasContext.fillRect(left,top,width,height);
}
//func to create the circle shape
function makeCircle(centerX,centerY,radius,sAngle,eAngle,angle,color){
    canvasContext.fillStyle=color;
    canvasContext.beginPath();//The beginPath() method begins a path, or resets the current path.
    canvasContext.arc(centerX,centerY,radius,sAngle,eAngle,angle);
    canvasContext.fill();
}
