import React from 'react';
import { distance, closestTo } from '../geometry';

const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
const canvasCenter = { x: canvasWidth / 2, y: canvasHeight / 2 };
const largeCircleRadius = 200;
const smallCircleRadius = 20;
const permittedRadius = largeCircleRadius - smallCircleRadius;

class Circle extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
    }

    get ctx() {
        return this.canvas.current.getContext('2d');
    }

    componentDidMount = () => {
        this.draw();
    }

    draw = (x = canvasCenter.x, y = canvasCenter.y) => {
        this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        this.drawLargeCircle();
        this.drawSmallCircle(x, y);
    }

    drawLargeCircle = () => {
        this.ctx.beginPath();
        this.ctx.arc(canvasCenter.x, canvasCenter.y, largeCircleRadius, 0, 2 * Math.PI, true);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawSmallCircle = (x, y) => {
        let position = distance({ x, y }, canvasCenter) < permittedRadius ?
            {x, y} : closestTo(x, y, { ...canvasCenter, radius: permittedRadius });

        this.ctx.beginPath();
        this.ctx.arc(position.x, position.y, smallCircleRadius, 0, 2 * Math.PI, true);
        this.ctx.fill();
        this.ctx.closePath();
    }

    handleMouseMove = (e) => {
        this.draw(e.clientX, e.clientY);
    }

    render() {
        return (
            <canvas
                width={canvasWidth}
                height={canvasHeight}
                ref={this.canvas}
                onMouseMove={this.handleMouseMove}>
            </canvas>
        );
    }
}

export default Circle;
