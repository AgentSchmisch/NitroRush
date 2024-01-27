import { GameObject } from "../gameObject.js";
import { ctx } from "../../core/canvas.js";

class Road extends GameObject {
    groundCoefficient = 1.5

    draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(this.position.x, this.position.y, this.dimension.width, this.dimension.height)

        ctx.setLineDash([20, 10]);
        ctx.strokeStyle = "white"; // Set the line color to white

        if (this.dimension.height < this.dimension.width) {
            ctx.beginPath();
            ctx.moveTo(this.position.x, this.position.y + this.dimension.height / 2); // Start point at the center of the top edge of the rectangle
            ctx.lineTo(this.position.x + this.dimension.width, this.position.y + this.dimension.height / 2); // End point at the center of the bottom edge of the rectangle
            ctx.stroke();

        }
        else if (this.dimension.height > this.dimension.width) {
            ctx.beginPath();
            ctx.moveTo(this.position.x + this.dimension.width / 2, this.position.y); // Start point at the center of the top edge of the rectangle
            ctx.lineTo(this.position.x + this.dimension.width / 2, this.position.y + this.dimension.height); // End point at the center of the bottom edge of the rectangle
            ctx.stroke();
        }
    }

    constructor(x, y, height, width) {
        super(x, y, height, width)
        return this
    }
}

export { Road }