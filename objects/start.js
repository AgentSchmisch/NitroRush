import { ctx } from "../core/canvas.js";
import { GameObject } from "./gameObject.js";
import { Timer } from "../core/timer.js";
import { ImageObject } from "../core/imageObject.js";

class Start extends GameObject {
    groundCoefficient = 1.5

    draw() {


        let cellsize = 5
        let rows = Math.floor(this.dimension.height / cellsize)
        let cols = Math.floor(this.dimension.width / cellsize)
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                // Alternate the color
                if ((row + col) % 2 === 0) {
                    ctx.fillStyle = '#000000'; // Black color
                } else {
                    ctx.fillStyle = '#FFFFFF'; // White color
                }

                // Draw the rectangle
                ctx.fillRect(this.position.x + col * cellsize, + this.position.y + row * cellsize, cellsize, cellsize);
            }
        }
    }

    constructor(x, y, height, width) {
        super(x, y, height, width)
        this.timer = new Timer()
        return this
    }
}

class Checkpoint extends ImageObject {
    groundCoefficient = 1.5
    visible = true

    draw() {
        if (this.visible) {
            ctx.drawImage(this.img,this.frame*this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.position.x,this.position.y,this.spriteWidth,this.spriteHeight)
            //ctx.fillStyle = "blue";
            //ctx.fillRect(this.position.x, this.position.y, this.dimension.width, this.dimension.height)
        }
    }

    constructor(x, y, height, width,imgPath, spriteHeight,spriteWidth,numStates) {
        super(x, y, height, width,imgPath, spriteHeight,spriteWidth,numStates)
        return this
    }
}

export { Start, Checkpoint }