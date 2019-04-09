class Chenillard{
   
    constructor(pattern,time,reversed,running){
        if (pattern===undefined) {
            pattern=[1,2,3,4]
        }
       else this.pattern=pattern
        if (time===undefined){
            time=1000
        }
        else this.time=time
        if (reversed===undefined){

            reversed=false
        } 
        else this.reversed=reversed
        if (running===undefined) 
        {
            running=false
        }
       else this.running=running
    }
    run(){
        this.running=true
    }
    isRunning(){
        return this.running
    }
    stop(){
        this.running=false
    }
    setTime(time){
        this.time=time
    }
    getTime(){
        return this.time
    }
    setPattern(pattern){
        this.pattern=pattern
    }
    getPattern(){
        return this.pattern
    }
    isReversed(){
        return reversed
    }

    reverse(){
        this.reversed=!this.reversed
    }
}
exports =Chenillard