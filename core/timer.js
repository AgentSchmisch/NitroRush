import { ctx } from "./canvas.js";

class Timer {
    startTime = 0
    endTime = 0
    currTime = 0

    calculateLapTime() {
        // check if the lap is over
        if (this.endTime > 0)
            this.lapTime = this.endTime - this.startTime

        else
            this.lapTime = this.currTime - this.startTime

        let milliseconds = this.lapTime % 1000; // calculate milliseconds
        let seconds = Math.floor(this.lapTime / 1000) % 60; // calculate seconds
        let minutes = Math.floor(this.lapTime / 1000 / 60) % 60; // calculate minutes

        return `${this.greaterTen(minutes)}:${this.greaterTen(seconds)}:${this.greaterTen(milliseconds)}`
    }

    greaterTen(number) {
        // add a leading zero if the number is less than 10
        return (number < 10 ? "0" : "") + number;
    }

    setStartTime() {
        this.startTime = new Date().getTime()
    }

    setEndTime() {
        this.endTime = new Date().getTime()
    }

    updateTime() {
        ctx.fillStyle = "blue"
        ctx.fillRect(0,0,200,80)
        ctx.fillStyle = "white"
        ctx.font = "30px Comic Sans MS"
        this.currTime = new Date().getTime()
        ctx.fillText(this.calculateLapTime(), 10, 50)
    }

}

export { Timer }