export default class Particle {
  constructor(canvas) {
    let range = Math.random() * 180 / Math.PI,
      spread = canvas.height / 4,
      size = Math.random() * 1.2;

    this.delta = 0.15;
    this.x = 0;
    this.y = 0;

    this.px = canvas.width / 2 + (Math.random() - 0.5) * canvas.width;
    this.py = canvas.height * 0.5 + (Math.random() - 0.5) * spread;

    this.mx = this.px;
    this.my = this.py;

    this.velocityX = Math.floor(Math.random() * 10) - 5;
    this.velocityY = Math.floor(Math.random() * 10) - 5;

    this.size = size;
    this.origSize = size;

    this.inText = false;

    this.opacity = 0;
    this.do = 0.02;

    this.opacityTresh = 0.98;
    this.fadingOut = true;
    this.fadingIn = true;
  }
  fadeIn = () => {
    // console.log("fadeIn");
    this.fadingIn = this.opacity > this.opacityTresh ? false : true;
    if (this.fadingIn) {
      this.opacity += this.do;
    } else {
      this.opacity = 1;
    }
  };
  fadeOut = () => {
    this.fadingOut = this.opacity < 0 ? false : true;
    if (this.fadingOut) {
      this.opacity -= 0.06;
      if (this.opacity < 0) {
        this.opacity = 0;
      }
    } else {
      this.opacity = 0;
    }
  };
}
