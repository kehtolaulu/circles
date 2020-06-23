import React from 'react';

const canvasWidth = () => 1300;
const canvasHeight = () => 650;
const canvasCenter = { x: canvasWidth() / 2, y: canvasHeight() / 2 };
const largeCircleRadius = 200;
const smallCircleRadius = 20;
const permittedRadius = largeCircleRadius - smallCircleRadius;

function distance(point1, point2) {
    const square = x => x * x;
    return Math.sqrt(
        square(point1.x - point2.x) + square(point1.y - point2.y)
    );
}

function closestTo(x, y) {
    let direction = { x: x - canvasCenter.x, y: y - canvasCenter.y };
    let noramlized = normalize(direction);
    let closest = {
        x: canvasCenter.x + noramlized.x * permittedRadius,
        y: canvasCenter.y + noramlized.y * permittedRadius
    };
    return closest;
}

function normalize(vector) {
    let length = distance({x: 0, y: 0}, vector);
    return { x: vector.x / length, y: vector.y / length };
}

class Circle extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
    }

    getCanvas() {
        return this.canvas.current;
    }

    getContext() {
        return this.canvas.current.getContext('2d');
    }

    componentDidMount = () => {
        this.drawCircle();
    }

    drawCircle = (x = 100, y = 100) => {
        let context = this.getContext();
        context.clearRect(0, 0, canvasWidth(), canvasHeight());
        this.drawBigCircle();
        this.drawSmallCircle(x, y);
    }

    drawBigCircle = () => {
        let context = this.getContext();
        context.beginPath();
        context.arc(canvasCenter.x, canvasCenter.y, largeCircleRadius, 0, 2 * Math.PI, true);
        context.stroke();
        context.closePath();
    }

    drawSmallCircle = (x, y) => {
        let context = this.getContext();
        context.beginPath();
        if (distance({x, y}, canvasCenter) < largeCircleRadius - smallCircleRadius) {
            context.arc(x, y, smallCircleRadius, 0, 2 * Math.PI, true);
        } else {
            let { x: closestX, y: closestY } = closestTo(x, y);
            context.arc(closestX, closestY, smallCircleRadius, 0, 2 * Math.PI, true);
        }
        context.fill();
        context.closePath();
    }

    handleMouseMove = (e) => {
        this.drawCircle(e.clientX, e.clientY);
    }

    render() {
        return (
            <canvas
                width={canvasWidth()}
                height={canvasHeight()}
                ref={this.canvas}
                onMouseMove={this.handleMouseMove}>
            </canvas>
        );
    }
}

export default Circle;