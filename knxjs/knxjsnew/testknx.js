const mqtt = require('mqtt')
//définit les maquettes connectées
let maquettes = []
//définit l'ensemble des maquettes découvertes
let knxs = []
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
      maquettes.forEach(m => {
        if (m.ip === ip) {
          m.disconnect()
        }
      })
      break
    case 'on':
      maquettes.forEach(m => {
        if (m.ip === ip) {
          m.runchenillard(msg.value)
        }
      })
      break
    case 'off':
      maquettes.forEach(m => {
        if (m.ip === ip) {
          m.stopchenillard()
        }
      })
      break
    case 'speed':
      maquettes.forEach(m => {
        if (m.ip === ip) {
          if (parseInt(msg.value) == 0) {
            m.settimechenillard(5000)
          }
          else m.settimechenillard(50000 / parseInt(msg.value))
        }
      })
      break
    case 'reverse':
      maquettes.forEach(m => {
        if (m.getIp() === ip) {
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