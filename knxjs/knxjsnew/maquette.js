const Chenillard=require('./chenillard')
const  Connection =require('knx');
class maquette {
    
    constructor(ip,chen) {
        
        if (chen===undefined) this.chenillard = new Chenillard()
        if (ip===undefined) console.error('il faut entrer une IP')
        else{
            this.ip=ip
            this.connection = new Connection({ 
                // ip address and port of the KNX router or interface
                ipAddr: this.ip,
                ipPort: 3671,
                // define your event handlers here:
                handlers: {
                    // wait for connection establishment before sending anything!
                    connected: function () {
                        this.isConnected = true
                        console.log('Hurray, I can talk KNX!');
                        down_light(1)
                        down_light(2)
                        down_light(3)
                        down_light(4)
                        start_light(1)
                    }
                    ,
                    // get notified for all KNX events:
                    event: function (evt, src, dest, value) {
                       
                        client.publish('knx/state',
                         JSON.stringify({
                            action: 'l' + dest.trim().split("0/2/")[1],
                            value: JSON.parse(JSON.stringify(value)).data[0]
                        }))
                        console.log("event: %s, src: %j, dest: %j, value: %j", evt, src, dest, value);
                        eventAction(parseInt(dest.trim().split("0/3/")[1])) //on récup le numéro du bouton : 0/3/-->?<-- et on lance la fonction
    
                    }
                },
                // get notified on connection errors
                error: function (connstatus) {
                    console.log("**** ERROR: %j", connstatus);
                    connection.write("0/1/" + nb, 1);
                    this.isConnected=false
                },
    
            })
        }
        
    }
    disconnect(){
        this.connection.Disconnect()
    }
    isConnected(){
        return this.isConnected
    }
    getIp(){
        return this.ip
    }
    setIp(ip){
        this.ip=ip
    }
    async chenillard(pattern) {
        let l1 = pattern[0]
        let l2 = pattern[1]
        let l3 = pattern[2]
        let l4 = pattern[3]
        this.chenillard.setPattern([l1,l2,l3,l4])
        if (this.chenillard.isRunning()) this.chenillard.stop()
        else this.chenillard.run()
      while (this.chenillard.isRunning() && this.isConnected) {
        if (this.chenillard.isRunning()) {
          if (this.chenillard.isReversed()) {
            down_light(l1);
            start_light(l4);
          }
          else {
            down_light(l4);
            start_light(l1);
          }
          await sleep(time);
        }
        else break
    
        if (this.chenillard.isRunning()) {
          if (this.chenillard.isReversed()) {
            down_light(l4);
            start_light(l3);
          }
          else {
            down_light(l1);
            start_light(l2);
          }
          await sleep(time);
        }
        else break
    
        if (this.chenillard.isRunning()) {
          if (this.chenillard.isReversed()) {
            down_light(l3);
            start_light(l2);
          }
          else {
            down_light(l2);
            start_light(l3);
          }
          await sleep(time);
        }
        else break
    
        if (this.chenillard.isRunning()) {
          if (this.chenillard.isReversed()) {
            down_light(l2);
            start_light(l1);
          }
          else {
            down_light(l3);
            start_light(l4);
          }
          await sleep(time);
        }
        else break
      }
    }
    eventAction(numEvent) {
        switch (numEvent) {
          case 1:
            chenillard(1, 2, 3, 4)
            break
          case 2:
            this.chenillard.reverse()
            break
      
          case 3:
            if (this.chenillard.getTime() >= 500) {
                 this.chenillard.setTime(this.chenillard.getTime() - 200) 
                }
            break
          case 4:
          if (this.chenillard.getTime() <= 5000) {
          this.chenillard.setTime(this.chenillard.getTime() + 200) 
            break
        }
      }
    }
    start_light(nb) {
        if (this.isConnected) {
          console.log("j'allume la lampe : " + nb)
          this.connection.write("0/1/" + nb, 1);
        }
      }
     down_light(nb) {
        if (isConnected) {
          console.log("j'éteins la lampe : " + nb)
          this.connection.write("0/1/" + nb, 0);
        }
      }
}

  function sleep(ms) {
    console.log("sleep fonction")
    return new Promise(resolve => setTimeout(resolve, ms));
  }
exports=maquette