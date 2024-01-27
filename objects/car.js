import { GameObject } from "./gameObject.js";
import { ctx } from "../core/canvas.js";
import { canvasBoundaries } from "../core/canvas.js"
import { ImageObject } from "../core/imageObject.js";
import { Checkpoint, Start } from "./start.js";
import { Road } from "./RoadSurface/road.js";
import { keysPressed, scoreboard } from "../script.js";

class Car extends ImageObject {
    start = {}
    lapOngoing = false
    onCheckpoint = false
    lastPassedCheckpoint = -1
    velocity = 1.5
    numLaps = 0
    moving = false
    passedStart = false
    old_position = {
        x: 0,
        y: 0
    }

    road_surface = {
        groundCoefficient: 2
    }


    corners = {
        //should contain the absolute positions on the array
        "0": () => {
            this.corners[1] = [this.position.x - this.dimension.width / 2, this.position.y - this.dimension.height / 2]
            this.corners[2] = [this.position.x + this.dimension.width / 2, this.position.y + this.dimension.height / 2]
            this.corners[3] = [this.position.x - this.dimension.width / 2, this.position.y + this.dimension.height / 2]
            this.corners[4] = [this.position.x + this.dimension.width / 2, this.position.y - this.dimension.height / 2]
        },

        "1": [this.position.x - this.dimension.width / 2, this.position.y - this.dimension.height / 2],
        "2": [this.position.x + this.dimension.width / 2, this.position.y + this.dimension.height / 2],
        "3": [this.position.x - this.dimension.width / 2, this.position.y + this.dimension.height / 2],
        "4": [this.position.x + this.dimension.width / 2, this.position.y - this.dimension.height / 2],
    }

    draw() {
        ctx.save(); // Save the current transformation state
        ctx.translate(this.position.x + this.dimension.width / 2, this.position.y - this.dimension.height / 2); // Translate to the center of the rectangle
        ctx.rotate(this.position.angle + Math.PI / 2); // Rotate by the current angle +90° so the upright sprite will be rotated correctly
        if (this.moving) {
            if (this.road_surface.constructor.name === "Sand") {
                // set the current frame to the starting frame of the animation
                if (this.frame > 4 || this.frame <= 3) {
                    this.frame = 3
                }

                ctx.drawImage(this.img, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, -this.dimension.height / 2, -this.dimension.width / 2, this.dimension.height, this.dimension.width)
            }

            if (this.road_surface.constructor.name === "Road") {
                // set the current frame to the starting frame of the animation
                if (this.frame > 2 || this.frame <= 0) {
                    this.frame = 0
                }

                ctx.drawImage(this.img, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, -this.dimension.height / 2, -this.dimension.width / 2, this.dimension.height, this.dimension.width)
            }

            if (this.road_surface.constructor.name === "Grass") {
                // set the current frame to the starting frame of the animation
                if (this.frame > 6 || this.frame <= 5) {
                    this.frame = 5
                }

                ctx.drawImage(this.img, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, -this.dimension.height / 2, -this.dimension.width / 2, this.dimension.height, this.dimension.width)
            }
        }

        else {

            // set the current frame to the starting frame of the animation
            if (this.frame > 8 || this.frame <= 6) {
                this.frame = 7
            }

            ctx.drawImage(this.img, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, -this.dimension.height / 2, -this.dimension.width / 2, this.dimension.height, this.dimension.width)
        }


        //
        //else if (this.road_surface.constructor.name === "Road") {
        //    ctx.drawImage(this.img, 0, 0, 80, 50, -this.dimension.width / 2, -this.dimension.height / 2, this.dimension.width, this.dimension.height)
        //}
        //
        //else if (this.road_surface.constructor.name === "Grass") {
        //    ctx.drawImage(this.img, 0, 0, 80, 50, -this.dimension.width / 2, -this.dimension.height / 2, this.dimension.width, this.dimension.height)
        //}
        //ctx.drawImage(this.img, 0, 0, 50, 80,  -this.dimension.height / 2, -this.dimension.width / 2,  this.dimension.height,this.dimension.width)

        // Code for debugging purposes

        //ctx.fillStyle = "blue"
        //ctx.strokeStyle = "blue"
        //ctx.lineWidth = 2
        //ctx.moveTo(0, 0)
        //ctx.lineTo(80, 0)
        //ctx.stroke()

        //ctx.strokeRect(-this.dimension.width / 2, -this.dimension.height / 2, this.dimension.width, this.dimension.height); // Draw the rectangle
        //ctx.fillStyle = "blue"
        //ctx.fillRect(this.corners[1][0] - this.position.x, this.corners[1][1] - this.position.y, 10, 10)
        //ctx.font = "30px 'Lato'"
        //ctx.fillText("1",this.corners[1][0] - this.position.x, this.corners[1][1] - this.position.y)
        //
        //ctx.fillRect(this.corners[2][0] - this.position.x, this.corners[2][1] - this.position.y, 10, 10)
        //ctx.fillText("2",this.corners[2][0] - this.position.x, this.corners[2][1] - this.position.y)
        //
        //
        //ctx.fillRect(this.corners[3][0] - this.position.x, this.corners[3][1]-this.position.y, 10, 10)
        //ctx.fillText("3",this.corners[3][0] - this.position.x, this.corners[3][1] - this.position.y)
        //
        //ctx.fillRect(this.corners[4][0]- this.position.x, this.corners[4][1] - this.position.y, 10, 10)
        //ctx.fillText("4",this.corners[4][0] - this.position.x, this.corners[4][1] - this.position.y)

        this.setOldPosition(this.corners[1][0], this.corners[1][1])

        ctx.restore();

    }

    checkforCanvasCollision() {
        if ((this.position.x + this.dimension.height) > canvasBoundaries.right) {
            this.position.x = canvasBoundaries.right - this.dimension.height;
        }

        if ((this.position.x + this.dimension.height) < canvasBoundaries.left) {
            this.position.x = canvasBoundaries.left - this.dimension.height;
        }

        if (this.position.y < canvasBoundaries.top) {
            this.position.y = canvasBoundaries.top;
        }

        if (this.position.y > canvasBoundaries.bottom) {
            this.position.y = canvasBoundaries.bottom;
        }
    }

    checkRoadSurface(tracks) {
        for (let track of tracks) {
            if (this.start.timer != undefined)
                this.start.timer.updateTime()
            for (let corner = 1; corner <= 4; corner++) {
                //console.log(track.boundaries.top()-this.dimension.width,this.corners[4][1], track.boundaries.right()-this.dimension.width, this.corners[4][1] <= track.boundaries.bottom()-this.dimension.width && this.corners[4][1] >= track.boundaries.top()-this.dimension.width)
                if (this.corners[corner][0] <= track.boundaries.right() && this.corners[corner][0] >= track.boundaries.left()) {
                    if (this.corners[corner][1] <= track.boundaries.bottom() && this.corners[corner][1] >= track.boundaries.top()) {
                        //console.log(corner, track.constructor.name)
                        if (this.road_surface.constructor.name != track.constructor.name)
                            this.road_surface = track;
                    }
                }
            }
        }
    }

    checkForCheckpoints(checkpoints) {
        // if left boundary greater than the checkpoints right boundary or right boundary greater than left boundary and the player isnt currently on a checpoint
        for (let point of checkpoints) {
            for (let corner = 1; corner <= 4; corner++) {

                if (this.corners[corner][0] <= point.boundaries.right() && this.corners[corner][0] >= point.boundaries.left()) {
                    if (this.corners[corner][1] <= point.boundaries.bottom() && this.corners[corner][1] >= point.boundaries.top()) {
                        // on the first run set the lastpassedCheckpoint to the startpoint
                        if (this.lastPassedCheckpoint === -1 && point instanceof Start && this.numLaps === 0) {
                            this.lastPassedCheckpoint = checkpoints.indexOf(point)
                            console.log("passed start line", this.lastPassedCheckpoint)

                            // start the lap timer
                            point.timer.setStartTime();
                            this.lapOngoing = true;
                            this.passedStart = true
                            this.start = point;
                            continue;
                        }

                        // on every other run check for the last passed checkpoint being different from the current one and smaller than the checkpoints array length
                        if (this.lastPassedCheckpoint < checkpoints.length - 1 && this.lastPassedCheckpoint != checkpoints.indexOf(point) && this.lapOngoing && !(point instanceof Start)) {
                            this.lastPassedCheckpoint = checkpoints.indexOf(point, this.lastPassedCheckpoint)
                            point.visible = false;
                            this.passedStart = false
                            console.log("passed a checkpoint", this.lastPassedCheckpoint, this.numLaps, this.passedStart)
                        }

                        if (point instanceof Start && this.numLaps < 3 && !this.passedStart) {
                            console.log("passed the start", this.passedStart)
                            this.lastPassedCheckpoint = -1
                            this.numLaps++;
                            this.passedStart = true
                            for (point of checkpoints) {
                                point.visible = true
                            }
                        }

                        else if (this.lastPassedCheckpoint === checkpoints.length - 1 && checkpoints.indexOf(point) === 0 && this.numLaps === 3) {
                            console.log("reached last checkpoint, game finished", this.numLaps)
                            // end the game
                            this.numLaps++;
                            this.lapOngoing = false

                            point.timer.setEndTime();
                            console.log(point.timer.calculateLapTime());
                            scoreboard.evaluateLapTime(point.timer.calculateLapTime())

                            // stop all movement
                            let possible_keypress = ["w", "a", "s", "d"]
                            possible_keypress.forEach(element => {
                                this.moving = false
                                delete keysPressed[element]; // Mark the key as released

                            });


                        }
                    }
                }
            }
        }
    }

    setOldPosition(x, y) {
        this.old_position.x = x;
        this.old_position.y = y;
    }

    constructor(x, y, height, width, imgPath, spriteHeight, spriteWidth, numStates) {
        super(x, y, height, width, imgPath, spriteHeight, spriteWidth, numStates)
        this.setOldPosition(x, y)

    }

}

export { Car }