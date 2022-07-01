import drawingUtils from "../utils/drawingUtils"
import Queue from "./Queue"
import { nBlocks } from "../utils/consts"

export default class Snake{
    
    constructor(){
        this.head = [nBlocks/2, nBlocks/2]
        this.body = new Queue()
        this.color = "#092"
        this.currDir = null
        this.headImage = new Image()
        this.headImage.src = require("../images/snake.png")
    }
    
    #aboutToGrow = false

    directions = {
        up: [0, -1],
        down: [0, 1],
        left: [-1, 0],
        right: [1, 0]
    }

    move(){
        
        if(!(this.currDir in this.directions)) return

        const [changeX, changeY] = this.directions[this.currDir]

        if (this.#aboutToGrow){
            this.body.insert(this.head)
            this.#aboutToGrow = false
        }

        if (!this.body.isEmpty()){
            this.body.insert(this.head)
            this.body.remove()
        }


        const [currX, currY] = this.head
        this.head = [currX + changeX, currY + changeY]

    }

    setToInitialState(){
        this.head = [nBlocks/2, nBlocks/2]
        this.body = new Queue()
        this.color = "#092"
        this.currDir = null
    }

    grow(){
        this.#aboutToGrow = true
    }

    hasLost(){
        const [x, y] = this.head

        let auxQueue = this.body.copy()
        while(!auxQueue.isEmpty()){
            let [xBody, yBody] = auxQueue.remove()
            if (xBody===x && yBody===y){
                return true
            }
        }

        return (x < 0 || x > nBlocks-1) || (y < 0 || y > nBlocks-1)
    }


    draw(ctxRefCurr){
        //Drawing head
        drawingUtils.drawSnakeHead(ctxRefCurr, this.head, this.headImage, this.currDir)

        //Drawing body
        let auxQueue = this.body.copy()
        while (!auxQueue.isEmpty()){
            let p = auxQueue.remove()
            drawingUtils.drawAtBlock(ctxRefCurr, p, this.color)
        }
    }
}