var cvs = document.getElementById("mycan");
var ctx = cvs.getContext("2d");

function draw() {}

function update() {}

function animate() {
  draw();
  update();
  requestAnimationFrame(animate);
}

animate();
