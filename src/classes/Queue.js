export default class Queue{
    #list = []

    constructor() {
        this.size = 0
        
    }

    isEmpty() {
        return this.size == 0
    }

    insert(newPoints){
        this.#list.push(newPoints)
        this.size++
    }

    remove(){
        if (!this.isEmpty){
            this.size--
            return this.#list.shift()
        }
    }
}