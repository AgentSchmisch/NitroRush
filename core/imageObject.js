import { GameObject } from "../objects/gameObject.js"
class ImageObject extends GameObject {
    frame = 0
    spriteHeight
    spriteWidth
    frameDuration = 15
    currentFrameDuration = 0
    draw(){

    }

    increaseFrame(){
        this.currentFrameDuration++;
        //console.log(this.frame,this.currentFrameDuration,this.img.width/this.spriteWidth)
        if(this.currentFrameDuration === this.frameDuration){
            this.frame++;
            this.currentFrameDuration = 0

            if(this.frame === this.img.width/this.spriteWidth){
                this.frame = 0
        }
    }
}

    constructor(x, y, height, width, imgPath,spriteHeight,spriteWidth) {
        super(x, y, height, width);
        this.img = new Image();
        this.img.src = imgPath;
        this.img.imageRotation = 0
        this.spriteHeight = spriteHeight
        this.spriteWidth = spriteWidth

        return this
    }

}


export { ImageObject }