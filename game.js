var cvs = document.getElementById("mycan");
var ctx = cvs.getContext("2d");
var sprite=new Image()
sprite.src='img/sprite.png'


function draw() {
  ctx.fillStyle = "#70c5ce";
  ctx.fillRect(0, 0, cvs.width, cvs.height);
}

function update() {}

function animate() {
  draw();
  update();
  requestAnimationFrame(animate);
}

animate();
