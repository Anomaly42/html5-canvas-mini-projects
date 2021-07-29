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

    this.getLen = function(){
        return Math.sqrt( Math.pow(this.x2 - this.x1, 2) + Math.pow(this.y2 - this.y1, 2) );
    }

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

function Oscillator(x, y, value, min = 0, max = 1){
    this.x = x;
    this.y = y;
    this.value = value;
    this.min = min;
    this.max = max;

    this.sizeX = 50;
    this.sizeY = 150;

    this.mapToZeroOne = function(val, minval, maxval){
        return (val - minval)/(maxval - minval);
    }

    this.show = function(){
        l.fillStyle = 'purple';
        l.strokeStyle = 'orange';
        l.lineWidth = 3;
        l.beginPath();
        l.rect(this.x, this.y, this.sizeX, this.sizeY);
        l.fill();
        l.stroke();
        l.closePath();

        l.fillStyle = 'yellow';
        l.beginPath();
        position = this.mapToZeroOne(this.value, this.min, this.max)*this.sizeY;
        l.arc(this.x + this.sizeX/2, this.y + this.sizeY - position, this.sizeX*3/8, 0, Math.PI*2);
        l.fill();
        l.stroke();
        l.closePath();
    }

}

function eraseEverything(bgcolor = 'white'){
    l.fillStyle = bgcolor;
    l.fillRect(0, 0, canvas.width, canvas.height);
}

function getLen(x1, y1, x2, y2){
    return Math.sqrt( Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) );
}

function mapToZeroOne(val, minval, maxval){
    return (val - minval)/(maxval - minval);
}

function Queue(size){
    this.size = size;
    this.queue = new Array(this.size);

    this.pushNew = function(ele){
        for (let i = this.size - 1; i > 0; --i){
            this.queue[i] = this.queue[i - 1];
        }
           
        this.queue[0] = ele;
    }
}

function Graph(x, y, mapping = new Queue()){
    this.x = x;
    this.y = y;
    this.mapping = mapping;

    this.sizeX = canvas.width - this.x;
    this.sizeY = canvas.height/4;

    this.show = function(){
        l.fillStyle = 'grey';
        l.strokeStyle = 'black';
        l.beginPath();
        l.rect(this.x, this.y, this.sizeX, this.sizeY);
        l.fill();
        l.closePath();

        l.beginPath();
        l.moveTo(this.x, this.y + this.sizeY/2);
        l.lineTo(this.x + this.sizeX, this.y + this.sizeY/2);
        l.stroke();
        l.closePath();

        l.strokeStyle = 'orange';
        l.lineWidth = 4;
        l.beginPath();
        for (let i = 0; i < this.mapping.size - 1; ++i){
            l.moveTo(this.x + this.sizeX*(i/this.mapping.size), this.y + this.sizeY*(1 - mapping.queue[i]) );
            l.lineTo(this.x + this.sizeX*((i + 1)/this.mapping.size), this.y + this.sizeY*(1 - mapping.queue[i + 1]) );
        }
        l.stroke();
        l.closePath();
    }
}

function update(){

    eraseEverything('#303030');
    ring1.theta += ring1Speed;
    ring2.theta += ring2Speed;

    line.x1 = ring1.pCenter.x;
    line.x2 = ring2.pCenter.x;
    line.y1 = ring1.pCenter.y;
    line.y2 = ring2.pCenter.y;

    osc.value = line.getLen();

    eleNew = mapToZeroOne(line.getLen(), lineMIN, lineMAX);
    graph.mapping.pushNew(eleNew);

    line.show();
    ring1.show();
    ring2.show();
    osc.show();
    graph.show();

    console.log(graph.mapping.queue);

}

ring1 = new Ring(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*canvas.width/2, Math.random()*Math.PI*2);
ring2 = new Ring(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*canvas.width/2, Math.random()*Math.PI*2);
line = new Line(ring1.pCenter.x, ring1.pCenter.y, ring2.pCenter.x, ring2.pCenter.y);

ring1Speed = 0.01*Math.PI*2*Math.random();
ring2Speed = 0.01*Math.PI*2*Math.random();

ringDist = getLen(ring1.x, ring1.y, ring2.x, ring2.y);
radSum = ring1.rad + ring2.rad;
lineMAX = ringDist + radSum;
lineMIN = ringDist - radSum;

osc = new Oscillator(30,20,line.getLen(),lineMIN, lineMAX);
map = new Queue(2000);
for (let i = 0; i < map.size; ++i)
map[i] = Math.random();
graph = new Graph(0,canvas.height*3/4,map);

eraseEverything('#303030');
line.show();
ring1.show();
ring2.show();
osc.show();
graph.show();

setInterval(update, 10);