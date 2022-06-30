export default {
    drawStage(ctxRefCurr, numBlocks, bSide, bColor){
        for(var x=0;x<numBlocks;x++){
            for(var y=0;y<numBlocks;y++){
                this.drawAtBlock(ctxRefCurr, [x, y], bSide, bColor)
            }
        }
    },

    drawAtBlock(ctxRefCurr, coords, bSide, color){
        const [x, y] = coords
        ctxRefCurr.fillStyle = color
        ctxRefCurr.fillRect(bSide*x,bSide*y,bSide-2, bSide-2);
        ctxRefCurr.fill();
    }
}