import { side, nBlocks } from './consts';

export default {
    drawStage(ctxRefCurr, bColor){
        for(var x=0;x<nBlocks;x++){
            for(var y=0;y<nBlocks;y++){
                this.drawAtBlock(ctxRefCurr, [x, y], bColor)
            }
        }
    },

    drawAtBlock(ctxRefCurr, coords, color){
        const [x, y] = coords
        const bSide = side/nBlocks
        ctxRefCurr.fillStyle = color
        ctxRefCurr.fillRect(bSide*x,bSide*y,bSide-2, bSide-2);
        ctxRefCurr.fill();
    },

    drawSnakeHead(ctxRefCurr, coords, image, dir){
        const [x, y] = coords
        const bSide = side/nBlocks
    
        let crop = 3
        console.log(dir)
        if (dir === "down") crop = 0
        else if (dir === "left") crop = 1
        else if (dir === "up") crop = 2

        ctxRefCurr.drawImage(
            image,
            crop * image.width/4, 0,
            image.width/4, image.height, 
            x * bSide, y * bSide,
            bSide-2, bSide-2
        )
    },

    drawFruit(ctxRefCurr, coords, image, currCrop){
        const [x, y] = coords
        const bSide = side/nBlocks

        ctxRefCurr.drawImage(image,
            currCrop * image.width/4, 0,
            image.width/4, image.height, 
            x * bSide, y * bSide,
            bSide - 2, bSide - 2
        )

    }
}