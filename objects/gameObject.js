
class GameObject {
    position = {
        x: 500,
        y: 500,
        angle:0
    }

    dimension = {
        height: 80,
        width: 50
    }

    boundaries = {
        top:() => { return this.position.y },
        bottom:() => { return this.position.y + this.dimension.height },
        right:() => { return this.position.x + this.dimension.width },
        left:() => { return this.position.x },
    }

    constructor(x, y, height, width) {
        this.position.x = x
        this.position.y = y
        this.dimension.height = width;
        this.dimension.width = height;
    }

    drawHitbox(){
        ctx.strokeRect(this.position.x, this.position.y, this.dimension.width,this.dimension.height)
    }

}

export { GameObject }