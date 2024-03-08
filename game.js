var cvs = document.getElementById("mycan");
var ctx = cvs.getContext("2d");

var sprite = new Image();
sprite.src = "img/sprite.png";

var bg = {
  sX: 0,
  sY: 0,
  w: 275,
  h: 227,
  x: 0,
  y: cvs.height - 226,
  draw: function () {
    ctx.drawImage(
      sprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x,
      this.y,
      this.w,
      this.h
    );
    ctx.drawImage(
      sprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.w,
      this.y,
      this.w,
      this.h
    );
  },
};

var fg = {
  sX: 276,
  sY: 0,
  w: 499 - bg.w,
  h: 111,
  x: 0,
  y: cvs.height - 111,
  draw: function () {
    ctx.drawImage(
      sprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x,
      this.y,
      this.w,
      this.h
    );
    ctx.drawImage(
      sprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.w,
      this.y,
      this.w,
      this.h
    );
  },
};

function draw() {
  ctx.fillStyle = "#70c5ce";
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  bg.draw();
  fg.draw();
}

function update() {}

function animate() {
  draw();
  update();
  requestAnimationFrame(animate);
}

animate();
