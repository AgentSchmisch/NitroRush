import { GameObject } from "../gameObject.js";
import { ctx } from "../../core/canvas.js";

class Grass extends GameObject {
    groundCoefficient = 0.2

    draw(){
        ctx.fillStyle = "green";
        ctx.fillRect(this.position.x, this.position.y, this.dimension.width,this.dimension.height)
    }

    constructor(x, y, height, width) {
        super(x, y, height, width)
        return this
    }
}

export {Grass}