import { Car } from "./objects/car.js"
import { GameObject } from "./objects/gameObject.js";
import { ctx, canvas } from "./core/canvas.js";
import { checkpointConfiguration, trackConfiguration } from "./core/roadConfig.js";
import { Road } from "./objects/RoadSurface/road.js";
import { Sand } from "./objects/RoadSurface/sand.js";
import { Grass } from "./objects/RoadSurface/grass.js";
import { Checkpoint, Start } from "./objects/start.js";
import { Database } from "./core/stats/dbHelper.js";
import { ImageObject } from "./core/imageObject.js";

const rotationSpeed = 5; // Adjust this value to control the rotation speed
let keysPressed = {};

document.getElementById("desc").addEventListener("click", startGame)

let tracks;
let checkpoints;
let scoreboard = new Database();
scoreboard.readFromDatabase();

let car = new Car(400, 175, 80, 50, "./objects/sprites/spriteCar.png", 80, 50);

function startGame() {
    document.getElementById("description").style.display = "none"
    document.getElementById("scoreboard").style.display = "block"
    canvas.style.display = "flex"
    scoreboard.evaluateLapTime("");


    drawRoads();
    createCheckpoints();
    requestAnimationFrame(gameLoop); // Start the animation loop
}

function drawRoads() {
    tracks = trackConfiguration.map(item => {
        let road_types = {
            "Road": new Road(item.x, item.y, item.w, item.h),
            "Sand": new Sand(item.x, item.y, item.w, item.h),
            "Grass": new Grass(item.x, item.y, item.w, item.h),

        };
        return road_types[item.type]
    })
    for (let track of tracks) {
        track.draw();
    }
}

function updateRoads() {
    for (let track of tracks) {
        track.position.x -= (car.position.x - car.old_position.x) * 2
        track.position.y -= (car.position.y - car.old_position.y) * 2
        track.draw();
    }
}

function createCheckpoints() {
    checkpoints = checkpointConfiguration.map(item => {
        let point_type = {
            "Start": new Start(item.x, item.y, item.w, item.h, "", "", ""),
            "Checkpoint": new Checkpoint(item.x, item.y, item.w, item.h, item.path, 64, 64)
        }
        return point_type[item.type]
    });

    for (let point of checkpoints) {
        point.draw();
    }
}

function updateCheckpoints() {
    for (let point of checkpoints) {
        point.position.x -= (car.position.x - car.old_position.x) * 2;
        point.position.y -= (car.position.y - car.old_position.y) * 2;
        point.draw();
        if (point instanceof ImageObject)
            point.increaseFrame();
    }
}


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    car.setOldPosition(car.position.x, car.position.y);
    processKeys();
    updateRoads();
    updateCheckpoints();
    car.checkRoadSurface(tracks);
    car.checkForCheckpoints(checkpoints);
    car.checkforCanvasCollision();
    car.draw();
    car.increaseFrame();
    car.corners[0]();


    requestAnimationFrame(gameLoop); // Request the next frame
}

// Event listener for keydown
document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true; // Mark the key as pressed
});

document.addEventListener('keyup', (event) => {
    car.moving = false
    delete keysPressed[event.key]; // Mark the key as released
});

function processKeys() {
    if (keysPressed["s"]) {
        car.moving = true
        car.position.x -= car.velocity * car.road_surface.groundCoefficient * Math.cos(car.position.angle);
        car.position.y -= car.velocity * car.road_surface.groundCoefficient * Math.sin(car.position.angle);
    }
    if (keysPressed["w"]) {
        car.moving = true
        car.position.x += car.velocity * car.road_surface.groundCoefficient * Math.cos(car.position.angle);
        car.position.y += car.velocity * car.road_surface.groundCoefficient * Math.sin(car.position.angle);
    }
    //only allow turns when driving forward
    if (keysPressed["a"] && (keysPressed["w"] || keysPressed["s"])) {
        car.moving = true
        car.position.angle -= rotationSpeed * Math.PI / 180
    }
    if (keysPressed["d"] && (keysPressed["w"] || keysPressed["s"])) {
        car.moving = true
        car.position.angle += rotationSpeed * Math.PI / 180
    }

}


export { keysPressed, scoreboard }