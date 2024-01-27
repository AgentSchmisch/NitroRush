let trackConfiguration = [
    // Sand
    { x: 0, y: 0, h: 100, w: 2000, type: "Sand" },
    { x: 0, y: 100, h: 600, w: 100, type: "Sand" },
    { x: 200, y: 200, h: 100, w: 1600, type: "Sand" },
    { x: 0, y: 100, h: 900, w: 100, type: "Sand" },
    { x: 200, y: 300, h: 400, w: 100, type: "Sand" },
    { x: 200, y: 700, h: 100, w: 700, type: "Sand" },
    { x: 800, y: 800, h: 700, w: 100, type: "Sand" },
    { x: 100, y: 900, h: 100, w: 600, type: "Sand" },
    { x: 1700, y: 300, h: 600, w: 100, type: "Sand" },
    { x: 1900, y: 100, h: 1000, w: 100, type: "Sand" },
    { x: 1100, y: 900, h: 100, w: 700, type: "Sand" },
    { x: 1300, y: 1100, h: 700, w: 100, type: "Sand" },
    { x: 1300, y: 1100, h: 100, w: 700, type: "Sand" },
    { x: 1100, y: 1000, h: 700, w: 100, type: "Sand" },
    { x: 1300, y: 1200, h: 700, w: 100, type: "Sand" },
    { x: 0, y: 1900, h: 100, w: 1400, type: "Sand" },
    { x: 600, y: 1000, h: 300, w: 100, type: "Sand" },
    { x: 0, y: 1300, h: 100, w: 700, type: "Sand" },
    { x: 0, y: 1400, h: 500, w: 100, type: "Sand" },
    { x: 200, y: 1500, h: 500, w: 100, type: "Sand" },
    { x: 300, y: 1500, h: 100, w: 600, type: "Sand" },
    { x: 300, y: 1700, h: 100, w: 900, type: "Sand" },


    //Roads
    { x: 100, y: 100, h: 100, w: 1800, type: "Road" },
    { x: 100, y: 200, h: 600, w: 100, type: "Road" },
    { x: 100, y: 800, h: 100, w: 700, type: "Road" },
    { x: 1800, y: 200, h: 800, w: 100, type: "Road" },
    { x: 1200, y: 1000, h: 100, w: 700, type: "Road" },
    { x: 1200, y: 1100, h: 700, w: 100, type: "Road" },
    { x: 100, y: 1800, h: 100, w: 1200, type: "Road" },
    { x: 100, y: 1500, h: 300, w: 100, type: "Road" },
    { x: 100, y: 1400, h: 100, w: 700, type: "Road" },
    { x: 700, y: 900, h: 500, w: 100, type: "Road" },

    // Grass

    { x: 0, y: 1000, h: 300, w: 600, type: "Grass" },
    { x: 300, y: 300, h: 400, w: 1400, type: "Grass" },
    { x: 900, y: 700, h: 200, w: 800, type: "Grass" },
    { x: 900, y: 900, h: 700, w: 200, type: "Grass" },
    { x: 300, y: 1600, h: 100, w: 800, type: "Grass" },
    { x: 1400, y: 1200, h: 800, w: 600, type: "Grass" },

]

// this is used for testing

//trackConfiguration = [
//{x:400,y:100,h:900,w:100,type:"Sand"},
//{x:200,y:100,h:900,w:200,type:"Road"},
//]


let checkpointConfiguration = [
    { x: 500, y: 100, h: 100, w: 10, type: "Start", path:"./objects/sprites/can.png" },

    { x: 1800, y: 700, h: 10, w: 100, type: "Checkpoint", path:"./objects/sprites/can.png" },
    { x: 1200, y: 1300, h: 10, w: 100, type: "Checkpoint", path:"./objects/sprites/can.png" },
    { x: 700, y: 1000, h: 10, w: 100, type: "Checkpoint", path:"./objects/sprites/can.png" },
]

export { trackConfiguration, checkpointConfiguration }