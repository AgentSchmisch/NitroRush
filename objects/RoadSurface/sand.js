import { GameObject } from "../gameObject.js";
import { ctx } from "../../core/canvas.js";

class Sand extends GameObject {
    groundCoefficient = 0.5

    draw() {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.position.x, this.position.y, this.dimension.width,this.dimension.height)
    }

    constructor(x, y, height, width) {
        super(x, y, height, width)
        return this
    }
}

export {Sand}