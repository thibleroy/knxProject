const mqtt = require('mqtt')
//définit les maquettes connectées
let maquettes = []
//définit l'ensemble des maquettes découvertes
let knxs = []
let isRunning = false
Discover()
const client = mqtt.connect('tcp://localhost:1883')
//const client = mqtt.connect('tcp://3.83.149.37:1883')
client.on("connect", () => {
  console.log('connected to broker')
  client.subscribe('knx/action/#')
})
client.on('message', (topic, message) => {
  let ip = topic.split('knx/action/')[1]
  let msg = JSON.parse(message)
  console.log('message : ' + JSON.stringify(msg) + ', topic : ' + topic)
  switch (msg.action) {
    case 'discover':

      client.publish('knx/state', JSON.stringify({ action: 'discover', value: knxs }))
      break
    case 'connect':
      const m = new require('./maquette.js')
      m.ip = ip
      m.connect()
      maquettes.push(m)

      break
    case 'disconnect':
      let index = -1
      maquettes.forEach(m => {
        if (m.ip === ip) {
          m.disconnect()
          index = maquettes.indexOf(m)
        }
      })

      if (index > -1) maquettes.splice(index);

      break
    case 'on':
      if (ip === 'allConnected') {

        let maquetteOrder = msg.value.maquetteOrder
        console.log('order', maquetteOrder)
        maquetteOrder.forEach(m => {
          let temp = maquettes.find(el => el.ip === m)
          console.log('temppattern', temp.chenillard.pattern)
          temp.setPattern(msg.value.pattern)
          temp.chenillard.running = true
          temp.chenillardOnce().then(
            temp.chenillard.running = false)
        })

      }
      else {
        maquettes.forEach(m => {
          if (m.ip === ip) {
            m.setPattern(msg.value.pattern)

            m.runchenillard()
          }
        })
      }
      break
    case 'off':

      if (ip === 'allConnected') {
        this.isRunning = false
        maquettes.forEach(m => {
          m.stopchenillard()
        })
      }
      else {
        maquettes.forEach(m => {
          if (m.ip === ip) {
            m.stopchenillard()
          }
        })
      }
      break
    case 'speed':
      maquettes.forEach(m => {
        if (m.ip === ip) {
          if (parseInt(msg.value.speed) == 0) {
            m.settimechenillard(5000)
          }
          else m.settimechenillard(50000 / parseInt(msg.value.speed))
        }
      })
      break
    case 'reverse':
      maquettes.forEach(m => {
        if (m.ip === ip) {
          m.reversechenillard()
        }
      })
      break
    default: break
  }
})

function Discover() {
  const { spawn } = require('child_process');
  const knxdisc = spawn('sudo', ['nmap', '--script', 'knx-gateway-discover', '-e', 'wlp3s0']);
  let str = ''
  knxdisc.stdout.on('data', (data) => {
    str += data
  });

  knxdisc.on('close', () => {
    let tab = str.split('192.168.1')
    tab.forEach(el => {
      if (el.charAt(0) == '.') {
        knxs.push('192.168.1' + el.split(':')[0])
      }
    })
  });
}