const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let canvasBoundaries = {
    top:0,
    bottom:canvas.height,
    left:0,
    right:canvas.width,
}

export {ctx, canvasBoundaries, canvas}