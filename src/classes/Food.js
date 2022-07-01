import drawingUtils from "../utils/drawingUtils"
import { nBlocks } from "../utils/consts"

export default class Food{
    coords = [0,0]

    constructor(nBlocks, color="#86D"){
        this.newRandomPosition(nBlocks)
        this.color = color
        this.foodsImage = new Image()
        this.foodsImage.src = require("../images/fruits.png")
        this.currFood = 0
    }

    newRandomPosition(){
        this.coords = [Math.floor(Math.random()*nBlocks), Math.floor(Math.random()*nBlocks)]
        this.currFood = Math.floor(Math.random()*4)
    }

    draw(ctxRefCurr){
        drawingUtils.drawFruit(ctxRefCurr, this.coords, this.foodsImage, this.currFood)
    }

}