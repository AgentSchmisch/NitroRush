import { scoreboard } from "../../script.js";
import { Timer } from "../timer.js";

export class Scoreboard {
    scores = []
    writeToScoreBoard(data) {

        setTimeout(() => {
            if (data != undefined) {
                let scoreBoardElement = document.getElementById("scoreboard")
                let scoreBoardTemplate =
                    `<table><tr><th>Name</th><th>Time</th></tr>`
                for (let line of data) {
                    if (line.Name != null) {
                        scoreBoardTemplate += `<tr><td>${line.Name}</td><td>${line.time}</td></tr>`
                        this.scores.push(this.timeToSeconds(line.time))
                    }
                }
                scoreBoardTemplate += `</table>`
                scoreBoardElement.innerHTML = scoreBoardTemplate
            }
            else {
                console.log("no information from db yet")
            }
        }, 3000);


    }

    evaluateLapTime(time) {
        //sort the array descending
        this.scores.sort((a, b) => a - b)

        let temp_time = this.timeToSeconds(time)
        if (this.scores[0] > temp_time) {
            console.log(temp_time)
            let uname = prompt("new high score, enter your name")
            if (uname === "") {
                uname = "unknown user"
            }
            scoreboard.writeToDatabase(uname, this.formatTime(temp_time), this.scores.length)
            location.reload();

        }
        else if (this.scores[0] < temp_time) {
            alert("you were not fast enough :(", this.formatTime(temp_time))
            location.reload();
        }
    }


    timeToSeconds(time) {
        let parts = time.replace(".", ":").split(':');
        const minutes = parseInt(parts[parts.length - 3], 10);
        const seconds = parseInt(parts[parts.length - 2], 10);
        const milliseconds = parseInt(parts[parts.length - 1], 10);
        return minutes * 60 + seconds + milliseconds / 1000;
    }

    formatTime(time) {
        console.log(time)
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        let milliseconds = Math.floor((time - Math.floor(time)) * 1000);

        console.log(minutes,seconds,milliseconds)
        let timer = new Timer()

        return `${timer.greaterTen(minutes)}:${timer.greaterTen(seconds)}:${timer.greaterTen(milliseconds)}`

    }

}