var cvs = document.getElementById("mycan");
var ctx = cvs.getContext("2d");
var frames = 0;

var sprite = new Image();
sprite.src = "img/sprite.png";

var state = {
  current: 0,
  ready: 0,
  game: 1,
  over: 2,
};

window.addEventListener("click", clickHandler);
window.addEventListener("keydown", function (e) {
  if ((e.which = 32)) clickHandler();
});

function clickHandler() {
  switch (state.current) {
    case state.ready:
      state.current = state.game;
      break;
    case state.game:
      break;

    default:
      state.current = state.ready;
      break;
  }
}

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

var bird = {
  Animation: [
    { sX: 276, sY: 112 },
    { sX: 276, sY: 139 },
    { sX: 276, sY: 164 },
    { sX: 276, sY: 139 },
  ],
  w: 34,
  h: 26,
  x: 50,
  y: 150,
  speed: 0,
  gravity: 0.25,
  animationIndex: 0,
  draw: function () {
    ctx.drawImage(
      sprite,
      this.Animation[this.animationIndex].sX,
      this.Animation[this.animationIndex].sY,
      this.w,
      this.h,
      this.x - this.w / 2,
      this.y - this.h / 2,
      this.w,
      this.h
    );
  },
  update: function () {
    var period = state.current == state.game ? 5 : 10;
    this.animationIndex += frames % 5 == 0 ? 1 : 0;
    this.animationIndex = this.animationIndex % this.Animation.length;

    if (state.current == state.ready) this.y = 150;
    else {
      this.y += this.speed;
      this.speed += this.gravity;
      if (this.y + this.h / 2 > fg.y) {
        this.y = fg.y - this.h / 2;
        this.animationIndex = 0;
      }
    }
  },
};

var getReady = {
  sX: 0,
  sY: 228,
  w: 173,
  h: 152,
  x: cvs.width / 2 - 173 / 2,
  y: 80,
  draw: function () {
    if (state.current == state.ready) {
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
    }
  },
};

var gameOver = {
  sX: 175,
  sY: 228,
  w: 225,
  h: 205,
  x: cvs.width / 2 - 225 / 2,
  y: 90,
  draw: function () {
    if (state.current == state.over) {
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
    }
  },
};

function draw() {
  ctx.fillStyle = "#70c5ce";
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  bg.draw();
  fg.draw();
  bird.draw();
  getReady.draw();
  gameOver.draw();
}

function update() {
  bird.update();
}

function animate() {
  draw();
  update();
  requestAnimationFrame(animate);
  frames++;
}

animate();
