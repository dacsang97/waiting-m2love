import React from "react";
import styled from "styled-components";
import { findDOMNode } from "react-dom";
import Particle from "../Particle";
import content from "../content";

export const Canvas = styled.canvas`
  margin: 200px auto;
`;

export default class Clock extends React.PureComponent {
  canvas;
  ctx;
  bgGrad = true;
  gradient;
  height = 400;
  key = {
    up: false,
    shift: false
  };
  particles = [];
  mouse = {
    x: 0,
    y: 0
  };
  press = false;
  quiver = true;
  texts = content;
  textNum = 0;
  textSize = 50;
  valentine = false;
  msgTime = 100;
  updateColor = true;
  width = 800;
  FRAME_RATE = 60;
  MIN_WIDTH = 0;
  MIN_HEIGHT = 0;
  PARTICLE_NUM = 1200;
  RADIUS = Math.PI * 2;
  constructor(props) {
    super(props);
    this.text = this.texts[0];
  }

  componentDidMount() {
    this.canvas = findDOMNode(this.c);
    if (this.canvas === null || !this.canvas.getContext) {
      return;
    }
    this.ctx = this.canvas.getContext("2d");
    this._setDimensions();
    this._event();

    for (let i = 0; i < this.PARTICLE_NUM; i++) {
      this.particles[i] = new Particle(this.canvas);
    }

    setInterval(this._loop, this.FRAME_RATE);
  }

  _event() {
    let end = false;
    document.addEventListener("click", this._handleClick, false);
    document.addEventListener("touchend", this._handleClick, false);
  }

  _handleClick = () => {
    this.textNum++;
    if (this.textNum >= this.texts.length) {
      this.textNum--;
      end = true;
      return;
    }
    this.text = this.texts[this.textNum];
  };

  _draw = p => {
    this.ctx.fillStyle = "rgba(226,225,142, " + p.opacity + ")";
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.size, 0, this.RADIUS, true);
    this.ctx.closePath();
    this.ctx.fill();
  };

  _loop = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = "rgb(255, 255, 255)";
    this.ctx.textBaseline = "middle";
    this.ctx.font = this.textSize + "px 'Roboto Mono', 'monospace'";
    this.ctx.fillText(
      this.text,
      (this.width - this.ctx.measureText(this.text).width) * 0.5,
      this.height * 0.5
    );
    let imgData = this.ctx.getImageData(0, 0, this.width, this.height);
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (let i = 0, l = this.particles.length; i < l; i++) {
      let p = this.particles[i];
    }
    this._particleText(imgData);
  };

  _pad = () => {
    return ("0" + number).substr(-2);
  };

  _particleText = imgData => {
    let pxls = [];
    for (let w = this.width; w > 0; w -= 3) {
      for (let h = 0; h < this.width; h += 3) {
        let index = (w + h * this.width) * 4;
        if (imgData.data[index] > 1) {
          pxls.push([w, h]);
        }
      }
    }

    let count = pxls.length;
    let j = parseInt((this.particles.length - pxls.length) / 2, 10);
    if (j < 0) {
      j = 0;
    }

    for (let i = 0; i < pxls.length && j < this.particles.length; i++, j++) {
      try {
        let p = this.particles[j],
          X,
          Y;
        if (this.quiver) {
          X = pxls[count - 1][0] - (p.px + Math.random() * 5);
          Y = pxls[count - 1][1] - (p.py + Math.random() * 5);
        } else {
          X = pxls[count - 1][0] - p.px;
          Y = pxls[count - 1][1] - p.py;
        }
        let T = Math.sqrt(X * X + Y * Y);
        let A = Math.atan2(Y, X);
        let C = Math.cos(A);
        let S = Math.sin(A);
        p.x = p.px + C * T * p.delta;
        p.y = p.py + S * T * p.delta;
        p.px = p.x;
        p.py = p.y;
        p.inText = true;
        p.fadeIn();
        // if (i < 10) {
        //   console.log(p);
        // }
        this._draw(p);
        if (key.up === true) {
          p.size += 0.3;
        } else {
          let newSize = p.size - 0.5;
          if (newSize > p.origSize && newSize > 0) {
            p.size = newSize;
          } else {
            p.size = m.origSize;
          }
        }
      } catch (e) {}
      count--;
    }
    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];
      if (!p.inText) {
        p.fadeOut();
        let X = p.mx - p.px;
        let Y = p.my - p.py;
        let T = Math.sqrt(X * X + Y * Y);
        let A = Math.atan2(Y, X);
        let C = Math.cos(A);
        let S = Math.sin(A);
        p.x = p.px + C * T * p.delta / 2;
        p.y = p.py + S * T * p.delta / 2;
        p.px = p.x;
        p.py = p.y;
        this._draw(p);
      }
    }
  };

  _setDimensions = () => {
    this.canvas.width = window.innerWidth >= 800 ? 800 : this.width;
    this.canvas.height = window.innerHeight >= 150 ? 150 : this.height;

    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.canvas.style.position = "absolute";
    this.canvas.style.left = "0px";
    this.canvas.style.top = "0px";
    this.canvas.style.bottom = "0px";
    this.canvas.style.right = "0px";
    this.canvas.style.marginTop = window.innerHeight * 0.15 + "px";
  };

  _setGradient = gradientStops => {
    gradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      0,
      width / 2,
      height / 2,
      width
    );

    for (let position in gradientStops) {
      let color = gradientStops[position];
      gradient.addColorStop(position, color);
    }
  };

  render() {
    return <Canvas ref={r => (this.c = r)} />;
  }
}
