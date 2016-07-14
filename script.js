var g = {
  fps: 60,
  numberOfBalls: 50,
  balls: [],
  currentTime: null,
  lastTime: null,
  canvas: null,
  ctx: null,
  intervalHandle: null,

  initialize: function() {
    g.canvas = document.getElementById("myCanvas");
    g.ctx = g.canvas.getContext("2d");
    g.canvas.width = window.innerWidth;
    g.canvas.height = window.innerHeight;

    g.generateBalls();
    g.lastTime = Date.now();
  },
  mainCycle: function() {
    g.ctx.clearRect(0, 0, g.canvas.width, g.canvas.height);
    g.currentTime = Date.now();
    g.balls.forEach(function(ball) {
      ball.move(g.canvas, g.currentTime - g.lastTime);
      ball.draw(g.ctx);
    });
    // console.log(g.currentTime - g.lastTime);
    g.lastTime = g.currentTime;
  },
  launch: function() {
    g.intervalHandle = setInterval(g.mainCycle, 1000 / g.fps);
  },
  stop: function() {
    clearInterval(g.intervalHandle);
  },
  generateBalls: function() {
    //add balls if required
    for (var i = g.balls.length; i < g.numberOfBalls; i++) {
      g.addRandomBall();
    }
    //remove balls if the current number exceeds the required
    if (g.balls.length > g.numberOfBalls) {
      g.balls.splice(g.numberOfBalls);
    }
  },
  addRandomBall: function() {
      var r = g.randRange(1, 10) * 5,
          x = g.randRange(r, g.canvas.width - r),
          y = g.randRange(r, g.canvas.height - r),
          dx = g.randRange(-30, 30) * 20,
          dy = g.randRange(-30, 30) * 20,
          color = g.randomColor();
      g.balls.push(new Ball(x, y, r, dx, dy, color));
  },
  randomColor: function() {
    var hexValues = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 3; i++) {
      color += hexValues[Math.floor( Math.random() * 16 )];
    }
    return color;
  },
  randRange: function(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }
};

var Ball = function (x, y, radius, dx, dy, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.dx = dx;
  this.dy = dy;
  this.color = color;
  console.log(this.color);
};

Ball.prototype.move = function(canvas, msecElapsed) {
  var dx = this.dx * msecElapsed / 1000,
      dy = this.dy * msecElapsed / 1000;
  //x
  if (this.x + dx > canvas.width - this.radius) {
    this.dx = -this.dx;
    this.x = 2*canvas.width - 2*this.radius - this.x - dx;
  }
  else if (this.x + dx < this.radius) {
    this.dx = -this.dx;
    this.x = 2*this.radius - this.x - dx;
  }
  else {
    this.x += dx;
  }
  //y
  if (this.y + dy > canvas.height - this.radius) {
    this.dy = -this.dy;
    this.y = 2*canvas.height - 2*this.radius - this.y - dy;
  }
  else if (this.y + dy < this.radius) {
    this.dy = -this.dy;
    this.y = 2*this.radius - this.y - dy;
  }
  else {
    this.y += dy;
  }
};

Ball.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
  ctx.fillStyle = this.color;
  ctx.fill();
};

g.initialize();
g.launch();
