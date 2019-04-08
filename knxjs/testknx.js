const knx = require('knx');
const mqtt = require('mqtt')
let chen
let inverse
let time
let connection
let isConnected = false
const client = mqtt.connect('tcp://3.83.149.37')
client.on("connect", () => {
  console.log('connected to broker')
  client.subscribe('knx/action')
})
client.on('message', (topic, message) => {
  //"{"action":"connect"}"
  let msg = JSON.parse(message)
  switch (msg.action) {
    case 'connect':
      letsConnectMan()
      break
      case 'disconnect':
      connection.Disconnect()
      break
    case 'on':
      chenillard(msg.value[0], msg.value[1], msg.value[2], msg.value[3])
      break
    case 'off':
      chen = false
      break
    case 'speed':
      time = 5000 / parseInt(msg.value)
      break
    case 'reverse':
      inverse = !inverse
      break
    default: break
  }
})
function eventAction(numEvent) {
  switch (numEvent) {
    case 1:
      chenillard(1, 2, 3, 4)
      break
    case 2:
      inverse = !inverse
      break

    case 3:
      if (time >= 500) { time = time - 200 }
      break
    case 4:
      time = time + 200
      break
  }
}

function letsConnectMan() {
  connection = new knx.Connection({

    // ip address and port of the KNX router or interface
    ipAddr: '192.168.0.6',
    ipPort: 3671,
    // define your event handlers here:
    handlers: {
      // wait for connection establishment before sending anything!
      connected: function () {
        isConnected = true
        chen = false
        inverse = false
        time = 1000
        console.log('Hurray, I can talk KNX!');
              }
      ,
      // get notified for all KNX events:
      event: function (evt, src, dest, value) {
        console.log("event: %s, src: %j, dest: %j, value: %j", evt, src, dest, value);
        console.log("dede" + dest + "dede")
        eventAction(parseInt(dest.trim().split("0/3/")[1])) //on récup le numéro du bouton : 0/3/-->?<-- et on lance la fonction

      },
      // get notified on connection errors
      error: function (connstatus) {
        console.log("**** ERROR: %j", connstatus);
        connection.write("0/1/" + nb, 1);
      },

    }
  })
}
function start_light(nb) {
  if (isConnected) {
    console.log("j'allume la lampe : " + nb)
    connection.write("0/1/" + nb, 1);
  }
}
function down_light(nb) {
  if (isConnected) {
    console.log("j'éteins la lampe : " + nb)
    connection.write("0/1/" + nb, 0);
  }
}
async function chenillard(l1, l2, l3, l4) {
  chen = !chen
  while (chen && isConnected) {
    if (chen) {
      if (inverse) {
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

    if (chen) {
      if (inverse) {
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

    if (chen) {
      if (inverse) {
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

    if (chen) {
      if (inverse) {
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
function sleep(ms) {
  console.log("sleep fonction")
  return new Promise(resolve => setTimeout(resolve, ms));
}