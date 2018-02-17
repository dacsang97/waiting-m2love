import React, { Fragment } from "react";
import { findDOMNode } from "react-dom";
import styled from "styled-components";
import Star from "../Star";

export const Sky = styled.canvas`
  width: 100%;
  height: 100%;
`;

export default class SkyWrapper extends React.PureComponent {
  state = {
    starDensity: 0.216,
    speedCoeff: 0.05,
    width: 0,
    height: 0,
    starCount: 10,
    circleRadius: 0,
    circleCenter: 0,
    giantColor: "180,184,240",
    starColor: "226,225,142",
    cometColor: "226,225,224",
    first: true
  };
  constructor(props) {
    super(props);
    this.stars = [];
  }
  componentDidMount() {
    this.sky = findDOMNode(this.canvas).getContext("2d");
    this._windowResizeHandler();
    window.addEventListener("resize", this._windowResizeHandler, false);
  }
  componentDidUpdate() {
    const { starCount, first } = this.state;
    if (starCount !== 0 && first) {
      this.setState({ first: false });
      this._createUniverse();
    }
  }
  _windowResizeHandler = () => {
    this.setState(
      () => {
        const { starDensity } = this.state;
        const width = window.innerWidth;
        const height = window.innerHeight;
        const starCount = width * starDensity;
        const circleRadius = width > height ? height / 2 : width / 2;
        const circleCenter = {
          x: width / 2,
          y: height / 2
        };
        return {
          width,
          height,
          starCount,
          circleRadius,
          circleRadius
        };
      },
      () => {
        const { width, height } = this.state;
        let starsLength = this.stars.length;
        for (let i = 0; i < starsLength; i++) {
          let star = this.stars[i];
          star.width = width;
          star.height = height;
        }
      }
    );
  };
  _createUniverse = () => {
    const {
      starCount,
      starColor,
      width,
      height,
      speedCoeff,
      giantColor,
      first
    } = this.state;
    for (let i = 0; i < starCount; i++) {
      this.stars[i] = new Star(
        width,
        height,
        this.sky,
        speedCoeff,
        starColor,
        giantColor,
        first
      );
      this.stars[i].reset();
    }
    this._draw();
  };
  _draw = () => {
    const { width, height } = this.state;
    this.sky.clearRect(0, 0, width, height);
    let starsLength = this.stars.length;
    for (let i = 0; i < starsLength; i++) {
      let star = this.stars[i];
      star.move();
      star.fadeIn();
      star.fadeOut();
      star.draw();
    }
    window.requestAnimationFrame(this._draw);
  };
  render() {
    const { width, height } = this.state;
    return (
      <Sky
        ref={r => {
          this.canvas = r;
        }}
        width={width}
        height={height}
      />
    );
  }
}
