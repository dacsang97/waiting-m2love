import { getProbability, getRandInterval } from "./utils";

export default class Star {
  constructor(width, height, canvas, speedCoeff, color, giantColor, first) {
    this.width = width;
    this.height = height;
    this.canvas = canvas;
    this.speedCoeff = speedCoeff;
    this.starColor = color;
    this.giantColor = giantColor;
    this.first = first;
  }
  fadeIn() {
    if (this.fadingIn) {
      this.fadingIn = this.opacity > this.opacityTresh ? false : true;
      this.opacity += this.do;
    }
  }
  fadeOut() {
    if (this.fadingOut) {
      this.fadingOut = this.opacity < 0 ? false : true;
      this.opacity -= this.do / 2;
      if (this.x > this.width || this.y < 0) {
        this.fadingOut = false;
        this.reset();
      }
    }
  }
  draw() {
    this.canvas.beginPath();

    if (this.giant) {
      this.canvas.fillStyle =
        "rgba(" + this.giantColor + "," + this.opacity + ")";
      this.canvas.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
    } else if (this.comet) {
      this.canvas.fillStyle = "rgba(" + cometColor + "," + this.opacity + ")";
      this.canvas.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, false);

      //comet tail
      for (var i = 0; i < 30; i++) {
        this.canvas.fillStyle =
          "rgba(" +
          cometColor +
          "," +
          (this.opacity - this.opacity / 20 * i) +
          ")";
        this.canvas.rect(
          this.x - this.dx / 4 * i,
          this.y - this.dy / 4 * i - 2,
          2,
          2
        );
        this.canvas.fill();
      }
    } else {
      this.canvas.fillStyle =
        "rgba(" + this.starColor + "," + this.opacity + ")";
      this.canvas.rect(this.x, this.y, this.r, this.r);
    }

    this.canvas.closePath();
    this.canvas.fill();
  }
  move() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.fadingOut === false) {
      this.reset();
    }
    if (this.x > this.width - this.width / 4 || this.y < 0) {
      this.fadingOut = true;
    }
  }
  reset() {
    this.giant = getProbability(3);
    this.comet = this.giant || this.first ? false : getProbability(10);
    this.x = getRandInterval(0, this.width - 10);
    this.y = getRandInterval(0, this.height);
    this.r = getRandInterval(1.1, 2.6);
    this.dx =
      getRandInterval(this.speedCoeff, 6 * this.speedCoeff) +
      (this.comet + 1 - 1) * this.speedCoeff * getRandInterval(50, 120) +
      this.speedCoeff * 2;
    this.dy =
      -getRandInterval(this.speedCoeff, 6 * this.speedCoeff) -
      (this.comet + 1 - 1) * this.speedCoeff * getRandInterval(50, 120);
    this.fadingOut = null;
    this.fadingIn = true;
    this.opacity = 0;
    this.opacityTresh = getRandInterval(0.2, 1 - (this.comet + 1 - 1) * 0.4);
    this.do = getRandInterval(0.0005, 0.002) + (this.comet + 1 - 1) * 0.001;
  }
}
