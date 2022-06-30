import drawingUtils from "../utils/drawingUtils"
import Queue from "./Queue"

export default class Snake{
    
    constructor(){
        this.head = [20,20]
        this.body = new Queue()
        this.color = "#092"
    }
    
    #directions = {
        up: [0, -1],
        down: [0, 1],
        left: [-1, 0],
        right: [1, 0]
    }

    move(dir){
        
        const [changeX, changeY] = this.#directions[dir]

        if (!this.body.isEmpty){
            this.body.insert(this.head)
            this.body.remove()
        }

        const [currX, currY] = this.head
        this.head = [currX + changeX, currY + changeY]

        //TODO: Check if snake has hit the edges
        //if (currX<0 || currX>)
    }

    draw(ctxRefCurr, bSide){
        drawingUtils.drawAtBlock(ctxRefCurr, this.head, bSide, this.color)

        var auxQueue = this.body
        while (!auxQueue.isEmpty){
            const p = auxQueue.remove()
            drawingUtils.drawAtBlock(ctxRefCurr, p, bSide, this.color)
        }
    }
}