canvas = document.getElementById("myCanvas");
l = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


function Ring(x, y, rad, theta){

    this.x = x;
    this.y = y;
    this.rad = rad;
    this.theta = theta;
    this.pCenter = new Object();
    this.pCenter.x = this.x + this.rad*Math.cos(this.theta);
    this.pCenter.y = this.y - this.rad*Math.sin(this.theta);


    this.show = function(){
        l.strokeStyle = 'blue';
        l.lineWidth = 2;
        l.beginPath();
        l.arc(this.x, this.y, this.rad, 0, Math.PI*2, false);
        l.stroke();
        l.closePath();

        l.fillStyle = 'red';
        l.strokeStyle = 'black';
        l.lineWidth = 2;
        
        l.beginPath();
        this.pCenter.x = this.x + this.rad*Math.cos(this.theta);
        this.pCenter.y = this.y - this.rad*Math.sin(this.theta);
        off = 4;   
        l.rect(this.pCenter.x - off, this.pCenter.y - off, 2*off, 2*off);
        l.fill();
        l.stroke();
        l.closePath();
    }
}

function Line(x1, y1, x2, y2){
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;

    this.show = function(){
        l.strokeStyle = 'green';
        l.lineWidth = 4;
        l.beginPath();
        l.moveTo(this.x1, this.y1);
        l.lineTo(this.x2, this.y2);
        l.stroke();
        l.closePath();
    }
}

function eraseEverything(bgcolor = 'white'){
    l.fillStyle = bgcolor;
    l.fillRect(0, 0, canvas.width, canvas.height);
}

ring1 = new Ring(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*canvas.width/2, Math.random()*Math.PI*2);
ring2 = new Ring(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*canvas.width/2, Math.random()*Math.PI*2);
line = new Line(ring1.pCenter.x, ring1.pCenter.y, ring2.pCenter.x, ring2.pCenter.y);

ring1Speed = 0.01*Math.PI*2*Math.random();
ring2Speed = 0.01*Math.PI*2*Math.random();

function update(){

    eraseEverything();
    ring1.theta += ring1Speed;
    ring2.theta += ring2Speed;

    line.x1 = ring1.pCenter.x;
    line.x2 = ring2.pCenter.x;
    line.y1 = ring1.pCenter.y;
    line.y2 = ring2.pCenter.y;

    line.show();
    ring1.show();
    ring2.show();

}

setInterval(update, 10);
