const Connection = require('knx');
const Chenillard = require('./chenillard')
const Maquette = {
  chenillard: { ...Chenillard },
  ip: '',
  connection: null,
  isConnected: false,
  setPattern: function (patternTab) {
    this.chenillard.pattern = patternTab
  },
  connect: async function () {
    this.connection = new Connection.Connection({
      ipAddr: '', //this.ip,
      ipPort: 3671,
      handlers: {
        connected: function () {
          isConnected = true
        },
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
  disconnect: function () {
    this.connection.Disconnect()
  },
  chenillardOnce: async function () {
    let l1 = this.chenillard.pattern[0]
    let l2 = this.chenillard.pattern[1]
    let l3 = this.chenillard.pattern[2]
    let l4 = this.chenillard.pattern[3]
    if (this.chenillard.running) {
      if (this.chenillard.reversed) {
        this.down_light(l1);
        this.start_light(l4);
      }
      else {
        this.down_light(l4);
        this.start_light(l1);
      }
      await this.sleep(this.chenillard.time);
    }
    else return;

    if (this.chenillard.running) {

      if (this.chenillard.reversed) {
        this.down_light(l4);
        this.start_light(l3);
      }
      else {
        this.down_light(l1);
        this.start_light(l2);
      }
      await this.sleep(this.chenillard.time);
    }
    else return;

    if (this.chenillard.running) {
      if (this.chenillard.reversed) {
        this.down_light(l3);
        this.start_light(l2);
      }
      else {
        this.down_light(l2);
        this.start_light(l3);
      }
      await this.sleep(this.chenillard.time);
    }
    else return;

    if (this.chenillard.running) {
      if (this.chenillard.reversed) {
        this.down_light(l2);
        this.start_light(l1);
      }
      else {
        this.down_light(l3);
        this.start_light(l4);
      }
      await this.sleep(this.chenillard.time);
    }  
    this.chenillard.running=false
  },
  runchenillard: async function () {
    if (!this.chenillard.running) return
    this.isConnected = true
    this.chenillardOnce().then(() => {
      this.runchenillard()
    })

  },
  stopchenillard: function () {
    this.chenillard.running = false
  },
  reversechenillard: function () {
    this.chenillard.reversed = !this.chenillard.reversed
  },
  settimechenillard: function (time) {
    this.chenillard.time = time
  },
  eventAction: function (numEvent) {
    switch (numEvent) {
      case 1:
        this.runchenillard(1, 2, 3, 4)
        break
      case 2:
        this.chenillard.reversed = !this.chenillard.reversed
        break

      case 3:
        if (this.chenillard.time >= 500) {
          this.chenillard.time = this.chenillard.time - 200
        }
        break
      case 4:
        if (this.chenillard.time <= 5000) {
          this.chenillard.time = this.chenillard.time + 200
          break
        }
        break
      default: break
    }
  },
  start_light: function (nb) {

    console.log('ip : ' + this.ip + ', lamp : ' + nb + ' up')
    /**
            if (this.isConnected) {
              console.log("j'allume la lampe : " + nb)
              this.connection.write("0/1/" + nb, 1);
            }
            */

  },
  down_light: function (nb) {

    console.log('ip : ' + this.ip + ', lamp : ' + nb + ' down')
    /**
            if (this.isConnected) {
              console.log("j'éteins la lampe : " + nb)
              this.connection.write("0/1/" + nb, 0);
            }
            */
  },
  sleep:function(ms) {
    console.log("sleep fonction")
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}


module.exports = Maquette