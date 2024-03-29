const Connection = require('knx');
const Chenillard = require('./chenillard')
let ip =''
const Maquette = {
  chenillard: null,
  ip: '',
  connection: null,
  isConnected: true,
  setPattern: function (patternTab) {
    this.chenillard.pattern = patternTab
  },
  connect: async function () {
    console.log('this', this.ip)
    ip=this.ip
    this.connection = new Connection.Connection({
      ipAddr: this.ip,
      ipPort: 3671,
      handlers: {
        connected: function () {
          console.log('Hurray, I can talk KNX!');
          const client = require('./testknx')
          
          client.publish('knx/state',
            JSON.stringify({
              action: 'connected',
              value: {
                ip:ip
              }
            })
          )

          Maquette.isConnected = true
        },
        event: (evt, src, dest, value) => {

          console.log("event: %s, src: %j, dest: %j, value: %j", evt, src, dest, value);

          const client = require('./testknx')

          client.publish('knx/state/' + this.ip,
            JSON.stringify({
              action: 'l' + dest.trim().split("0/2/")[1],
              value: JSON.parse(JSON.stringify(value)).data[0]
            }))

          this.eventAction(parseInt(dest.trim().split("0/3/")[1])) //on aluerécup le numéro du bouton : 0/3/-->?<-- et on lance la fonction

        }
      },
      // get notified on connection errors
      error: connstatus => {
        console.log("**** ERROR: %j", connstatus);
        this.chenillard.running=false
        Maquette.connection.write("0/1/" + nb, 1);
        Maquette.isConnected = false
      },

    })
    this.chenillard = { ...Chenillard }
  },
  disconnect: function () {
    this.connection.Disconnect()
    const client = require('./testknx')
    client.publish('knx/state',
      JSON.stringify({
        action: 'disconnected',
        value: {
          ip: ip
        }
      })
    )
  },
  chenillardOnce: async function () {
    console.log(this.chenillard)
    console.log(this.ip)
    
    if (this.chenillard.running) {
      if (this.chenillard.reversed) {
        this.down_light(this.chenillard.pattern[0]);
        this.start_light(this.chenillard.pattern[3]);
      }
      else {
        this.down_light(this.chenillard.pattern[3]);
        this.start_light(this.chenillard.pattern[0]);
      }
      await this.sleep(this.chenillard.time);
    }
    else return;

    if (this.chenillard.running) {
      if (this.chenillard.reversed) {
        this.down_light(this.chenillard.pattern[3]);
        this.start_light(this.chenillard.pattern[2]);
      }
      else {
        this.down_light(this.chenillard.pattern[0]);
        this.start_light(this.chenillard.pattern[1]);
      }
      await this.sleep(this.chenillard.time);
    }
    else return;

    if (this.chenillard.running) {
      if (this.chenillard.reversed) {
        this.down_light(this.chenillard.pattern[2]);
        this.start_light(this.chenillard.pattern[1]);
      }
      else {
        this.down_light(this.chenillard.pattern[1]);
        this.start_light(this.chenillard.pattern[2]);
      }
      await this.sleep(this.chenillard.time);
    }
    else return;

    if (this.chenillard.running) {
      if (this.chenillard.reversed) {
        this.down_light(this.chenillard.pattern[1]);
        this.start_light(this.chenillard.pattern[0]);
      }
      else {
        this.down_light(this.chenillard.pattern[2]);
        this.start_light(this.chenillard.pattern[3]);
      }
      await this.sleep(this.chenillard.time)
    }
    else return
  },
  runchenillard: async function () {
    if (!this.chenillard.running) return
    else this.chenillardOnce().then(() => this.runchenillard())
  },
  startchenillard: function () {
    this.chenillard.running = true
  },
  stopchenillard: async function () {
    this.chenillard.running = false
    await this.sleep(500)
    this.down_light(1)
    this.down_light(2)
    this.down_light(3)
    this.down_light(4)
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
        if (this.chenillard.running) this.stopchenillard()
        else{
          this.startchenillard()
          this.runchenillard()
        }
      
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

    if (this.isConnected) {
      console.log("j'allume la lampe : " + nb)
      this.connection.write("0/1/" + nb, 1);
    }


  },
  down_light: function (nb) {

    console.log('ip : ' + this.ip + ', lamp : ' + nb + ' down')
    if (this.isConnected) {
      console.log("j'éteins la lampe : " + nb)
      this.connection.write("0/1/" + nb, 0);
    }

  },
  sleep: function (ms) {
    console.log("sleep fonction")
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}


module.exports = Maquette