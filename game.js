var cvs = document.getElementById("mycan");
var ctx = cvs.getContext("2d");
var frames = 0;
var DEGREE = Math.PI / 180;

var sprite = new Image();
sprite.src = "img/sprite.png";

var DIE = new Audio();
DIE.src = "audio/die.wav";

var FLAP = new Audio();
FLAP.src = "audio/FLAP.wav";

var HIT = new Audio();
HIT.src = "audio/HIT.wav";

var SCORE = new Audio();
SCORE.src = "audio/SCORE.wav";

var START = new Audio();
START.src = "audio/START.wav";

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
      START.play();
      state.current = state.game;
      break;
    case state.game:
      bird.flap();
      FLAP.play();
      break;

    default:
      state.current = state.ready;
      bird.speed = 0;
      bird.rotation = 0;
      pipes.position = [];
      score.value = 0;
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
  dx: 2,
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
      this.x + this.w,
      this.y,
      this.w,
      this.h
    );
  },
  update: function () {
    if (state.current != state.game) return;
    this.x = (this.x - this.dx) % (this.w / 2);
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
  jump: 4.6,
  rotation: 0,
  radius: 12,
  draw: function () {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.drawImage(
      sprite,
      this.Animation[this.animationIndex].sX,
      this.Animation[this.animationIndex].sY,
      this.w,
      this.h,
      -this.w / 2,
      -this.h / 2,
      this.w,
      this.h
    );
    ctx.restore();
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
        if (state.current == state.game) {
          state.current = state.over;
          DIE.play();
        }
      }
      if (this.speed > this.jump) {
        this.rotation = 90 * DEGREE;
      } else {
        this.rotation = -25 * DEGREE;
      }
    }
  },
  flap: function () {
    this.speed = -this.jump;
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

var pipes = {
  top: { sX: 553, sY: 0 },
  bottom: { sX: 502, sY: 0 },
  w: 53,
  h: 400,
  y: -150,
  x: cvs.width,
  gap: 80,
  position: [],
  dx: 2,
  draw: function () {
    for (i = 0; i < this.position.length; i++) {
      var p = this.position[i];
      ctx.drawImage(
        sprite,
        this.top.sX,
        this.top.sY,
        this.w,
        this.h,
        p.x,
        p.y,
        this.w,
        this.h
      );
      ctx.drawImage(
        sprite,
        this.bottom.sX,
        this.bottom.sY,
        this.w,
        this.h,
        p.x,
        p.y + this.h + this.gap,
        this.w,
        this.h
      );
    }
  },
  update: function () {
    if (state.current != state.game) return;
    if (frames % 100 == 0) {
      this.position.push({
        x: this.x,
        y: this.y * (Math.random() + 1),
      });
    }
    for (i = 0; i < this.position.length; i++) {
      var p = this.position[i];
      p.x -= this.dx;

      if (p.x + this.w < 0) {
        this.position.shift();
        score.value++;
        score.best = Math.max(score.best, score.value);
        localStorage.setItem("best", score.best);
        SCORE.play();
      }

      if (
        bird.x + bird.radius > p.x &&
        bird.x - bird.radius < p.x + this.w &&
        bird.y + bird.radius > p.y &&
        bird.y - bird.radius < p.y + this.h
      ) {
        state.current = state.over;
        HIT.play();
      }
      var bottomYPos = p.y + this.h + this.gap;
      if (
        bird.x + bird.radius > p.x &&
        bird.x - bird.radius < p.x + this.w &&
        bird.y + bird.radius > bottomYPos &&
        bird.y - bird.radius < bottomYPos + this.h
      ) {
        state.current = state.over;
        HIT.play();
      }
    }
  },
};

var score = {
  value: 0,
  best: 0 || parseInt(localStorage.getItem("best")),
  draw: function () {
    ctx.fillStyle = "#FFF";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    if (state.current == state.game) {
      ctx.font = "35px IMPACT";
      ctx.fillText(this.value, cvs.width / 2, 50);
      ctx.strokeText(this.value, cvs.width / 2, 50);
    } else if (state.current == state.over) {
      ctx.font = "20px IMPACT";

      ctx.fillText(this.value, 225, 186);
      ctx.strokeText(this.value, 225, 186);

      ctx.fillText(this.best, 225, 230);
      ctx.strokeText(this.best, 225, 230);
    }
  },
};

function draw() {
  ctx.fillStyle = "#70c5ce";
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  bg.draw();
  pipes.draw();
  fg.draw();
  bird.draw();
  getReady.draw();
  gameOver.draw();
  score.draw();
}

function update() {
  bird.update();
  fg.update();
  pipes.update();
}

function animate() {
  draw();
  update();
  requestAnimationFrame(animate);
  frames++;
}

animate();
