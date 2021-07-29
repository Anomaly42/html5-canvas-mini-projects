canvasSize(width, height);
fill("#000000");
rect(0,0, width, height)
stroke("#ffffff");
class Circle{
  constructor(x, y, rad, theta = 0){
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.theta = theta;
    this.penX = this.x + Math.cos(this.theta)*this.rad;
    this.penY = this.y - Math.sin(this.theta)*this.rad;
  }
  rotate(theta){
    this.theta = this.theta + theta;
    this.penX = this.x + Math.cos(this.theta)*this.rad;
    this.penY = this.y - Math.sin(this.theta)*this.rad;
  }

  render(arm = false){
    circle(this.x, this.y, this.rad, false);
    circle(this.penX, this.penY, 5);

    if (arm == true){
      line(this.x, this.y, this.penX - this.x, this.y - this.penY);
    }
  }
}

var ring = new Circle(width/4, height/2, 100, 0);
ring.render();

ringcontrol = new fourier(ring, [30, 30]);

var rotateSpeed = 0.01;
var points = [];
var seisimo = [];
var x = 0;
var xSpeed = 0.5;

function fourier(rootRing = new Circle(), termdata = []){
  this.rootRing = rootRing;
  this.ringarr = [];

  this.render = function(){
    for (let i = 0; i < termdata.length/2; ++i){
    
      if(i == 0){
        this.ringarr.push(new Circle(this.rootRing.penX, this.rootRing.penY, termdata[2*i], 0));
      }
      else{
        this.ringarr.push(new Circle(this.ringarr[i - 1].penX, this.ringarr[i - 1].penY, termdata[2*i], 0));
      }
  
      this.ringarr[i].render(true);
    }

  }

}

function animate(){
  l.fillStyle = "#000000";

  //Fourier Circles
  stroke("#ffffff");
  l.fillRect(0,0,width,height);
  ring.rotate(rotateSpeed);
  ring.render(true);

  ringcontrol.rootRing.rotate(0.01);
  ringcontrol.render();
  ringcontrol.ringarr[0].x = ring.penX;
  ringcontrol.ringarr[0].y = ring.penY;
  ringcontrol.ringarr[0].rotate(0.05);


  // Moving Pen
  l.fillStyle = "#ff00ff";
  l.fillRect(ring.penX, ring.penY - 1, width/2 - ring.penX, 2);

  // Seisimographic Path
  points.push(width/2 + x, ringcontrol.ringarr[0].penY);

  x -= xSpeed;

  for (let i = 0; i < points.length; ++i){
    if (i % 2 == 0){
      seisimo[i] = points[i] - x;
    }
    else{
      seisimo[i] = points[i];
    }
  }

  stroke("#ffff00");
  path(seisimo);

}

setInterval(animate, 1);