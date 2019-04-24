const Connection =require('knx');
const Maquette = {
        chenillard: new require ('./chenillard'),
        ip:'',
        connection:null,
        isConnected:false,
        connect : ()=>{
        this.connection=new Connection.Connection({ 
          // ip address and port of the KNX router or interface
          ipAddr: this.ip,
          ipPort: 3671,
          // define your event handlers here:
          handlers: {
              // wait for connection establishment before sending anything!
              connected:  ()=> {
                  isConnected = true
                  console.log('Hurray, I can talk KNX!');
                  Maquette.down_light(1)
                  Maquette.down_light(2)
                  Maquette.down_light(3)
                  Maquette.down_light(4)
                  Maquette.start_light(1)
              }
              ,
              // get notified for all KNX events:
              event:  (evt, src, dest, value) =>{
                 
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
          error: connstatus=> {
              console.log("**** ERROR: %j", connstatus);
              connection.write("0/1/" + nb, 1);
              this.isConnected=false
          },

      })
        }, 
    disconnect:()=>{
        this.connection.Disconnect()
    },
    runchenillard:async function(pattern) {
        let l1 = pattern[0]
        let l2 = pattern[1]
        let l3 = pattern[2]
        let l4 = pattern[3]
        this.chenillard.pattern=[l1,l2,l3,l4]
        if (this.chenillard.running) this.chenillard.running=false
      while (this.chenillard.running && this.isConnected) {
        if (this.chenillard.running) {
          if (this.chenillard.reversed) {
            this.down_light(l1);
            this.start_light(l4);
          }
          else {
            this.down_light(l4);
            this.start_light(l1);
          }
          await sleep(time);
        }
        else break
    
        if (this.chenillard.running) {
          if (this.chenillard.reversed) {
            this.down_light(l4);
            this.start_light(l3);
          }
          else {
            this.down_light(l1);
            this.start_light(l2);
          }
          await sleep(time);
        }
        else break
    
        if (this.chenillard.running) {
          if (this.chenillard.reversed) {
            this.down_light(l3);
            this.start_light(l2);
          }
          else {
            this.down_light(l2);
            this.start_light(l3);
          }
          await sleep(time);
        }
        else break
    
        if (this.chenillard.running) {
          if (this.chenillard.reversed) {
            this.down_light(l2);
            this.start_light(l1);
          }
          else {
            this.down_light(l3);
            this.start_light(l4);
          }
          await sleep(time);
        }
        else break
      }
    },
    stopchenillard:()=>{
      this.chenillard.running=false
    },
    reversechenillard:()=>{
this.chenillard.reversed=!this.chenillard.reversed
    },
    settimechenillad:time=>{
this.chenillard.time=time
    },
    eventAction:numEvent=> {
        switch (numEvent) {
          case 1:
            this.runchenillard(1, 2, 3, 4)
            break
          case 2:
            this.chenillard.reversed=!this.chenillard.reversed
            break
      
          case 3:
            if (this.chenillard.time >= 500) {
                 this.chenillard.time=this.chenillard.time() - 200
                }
            break
          case 4:
          if (this.chenillard.time <= 5000) {
          this.chenillard.time=this.chenillard.time + 200
            break
        }
      }
    },
    start_light:nb=> {
        if (this.isConnected) {
          console.log("j'allume la lampe : " + nb)
          this.connection.write("0/1/" + nb, 1);
        }
      },
     down_light:nb=> {
        if (this.isConnected) {
          console.log("j'éteins la lampe : " + nb)
          this.connection.write("0/1/" + nb, 0);
        }
      }
}

  function sleep(ms) {
    console.log("sleep fonction")
    return new Promise(resolve => setTimeout(resolve, ms));
  }
module.exports=Maquette