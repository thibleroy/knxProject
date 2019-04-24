const Connection = require('knx');
const Maquette = {
  chenillard: new require('./chenillard'),
  ip: '',
  connection: null,
  isConnected: false,
  setPattern: patternTab => {
    Maquette.chenillard.pattern = patternTab
  },
  connect: () => {
    Maquette.connection = new Connection.Connection({
      // ip address and port of the KNX router or interface
      ipAddr: this.ip,
      ipPort: 3671,
      // define your event handlers here:
      handlers: {
        // wait for connection establishment before sending anything!
        connected: () => {
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
        event: (evt, src, dest, value) => {

          client.publish('knx/state',
            JSON.stringify({
              action: 'l' + dest.trim().split("0/2/")[1],
              value: JSON.parse(JSON.stringify(value)).data[0]
            }))
          console.log("event: %s, src: %j, dest: %j, value: %j", evt, src, dest, value);
          Maquette.eventAction(parseInt(dest.trim().split("0/3/")[1])) //on récup le numéro du bouton : 0/3/-->?<-- et on lance la fonction

        }
      },
      // get notified on connection errors
      error: connstatus => {
        console.log("**** ERROR: %j", connstatus);
        Maquette.connection.write("0/1/" + nb, 1);
        Maquette.isConnected = false
      },

    })
  },
  disconnect: () => {
    Maquette.connection.Disconnect()
  },
  chenillardOnce: async () => {
    let l1 = Maquette.chenillard.pattern[0]
    let l2 = Maquette.chenillard.pattern[1]
    let l3 = Maquette.chenillard.pattern[2]
    let l4 = Maquette.chenillard.pattern[3]
    if (Maquette.chenillard.running) {
      if (Maquette.chenillard.reversed) {
        Maquette.down_light(l1);
        Maquette.start_light(l4);
      }
      else {
        Maquette.down_light(l4);
        Maquette.start_light(l1);
      }
      await sleep(Maquette.chenillard.time);
    }
    else return;

    if (Maquette.chenillard.running) {

      if (Maquette.chenillard.reversed) {
        Maquette.down_light(l4);
        Maquette.start_light(l3);
      }
      else {
        Maquette.down_light(l1);
        Maquette.start_light(l2);
      }
      await sleep(Maquette.chenillard.time);
    }
    else return;

    if (Maquette.chenillard.running) {
      if (Maquette.chenillard.reversed) {
        Maquette.down_light(l3);
        Maquette.start_light(l2);
      }
      else {
        Maquette.down_light(l2);
        Maquette.start_light(l3);
      }
      await sleep(Maquette.chenillard.time);
    }
    else return;

    if (Maquette.chenillard.running) {
      if (Maquette.chenillard.reversed) {
        Maquette.down_light(l2);
        Maquette.start_light(l1);
      }
      else {
        Maquette.down_light(l3);
        Maquette.start_light(l4);
      }
      await sleep(Maquette.chenillard.time);
    }
    else return;
  },
  runchenillard: async () => {
    if (!Maquette.chenillard.running) return
    Maquette.isConnected=true
    Maquette.chenillardOnce().then(()=>{
    Maquette.runchenillard()
    })
    
    
    
  },
  stopchenillard: () => {
    Maquette.chenillard.running = false
  },
  reversechenillard: () => {
    Maquette.chenillard.reversed = !Maquette.chenillard.reversed
  },
  settimechenillard: time => {
    Maquette.chenillard.time = time
  },
  eventAction: numEvent => {
    switch (numEvent) {
      case 1:
        Maquette.runchenillard(1, 2, 3, 4)
        break
      case 2:
        Maquette.chenillard.reversed = !Maquette.chenillard.reversed
        break

      case 3:
        if (Maquette.chenillard.time >= 500) {
          Maquette.chenillard.time = Maquette.chenillard.time - 200
        }
        break
      case 4:
        if (Maquette.chenillard.time <= 5000) {
          Maquette.chenillard.time = Maquette.chenillard.time + 200
          break
        }
    }
  },
  start_light: nb => {

    console.log('ip : ' + Maquette.ip + ', lamp : ' +nb + ' up')
    
  },
  down_light: nb => {

    console.log('ip : ' + Maquette.ip + ', lamp : ' +nb + ' down')
    /**
            if (this.isConnected) {
              console.log("j'éteins la lampe : " + nb)
              this.connection.write("0/1/" + nb, 0);
            }
            */
  }

}

function sleep(ms) {
  console.log("sleep fonction")
  return new Promise(resolve => setTimeout(resolve, ms));
}
module.exports = Maquette