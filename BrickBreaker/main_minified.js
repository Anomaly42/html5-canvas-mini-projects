canvas = document.getElementById("myCanvas");
l = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function gameLoop(){

    console.log("Hehehe");
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);