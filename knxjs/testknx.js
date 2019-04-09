const mqtt = require('mqtt')
const Maquette = require('./maquette')
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
  let ip = topic.split('knx/action/')[0]
  let msg = JSON.parse(message)
  console.log(msg)
  switch (msg.action) {
    case 'discover':
    
      client.publish('knx/state', JSON.stringify({ action: 'discover', value: knxs }))
      break
    case 'connect':
      letsConnectMan(ip)
      break
    case 'disconnect':
      maquettes.forEach(m => {
        if (m.getIp() === ip) {
          m.disconnect()
        }
      })
      break
    case 'on':
      maquettes.forEach(m => {
        if (m.getIp() === ip) {
          m.chenillard(msg.value)
        }
      })
      break
    case 'off':
      maquettes.forEach(m => {
        if (m.getIp() === ip) {
          m.chenillard.stop()
        }
      })
      break
    case 'speed':
      maquettes.forEach(m => {
        if (m.getIp() === ip) {
          if (parseInt(msg.value) == 0) {
            m.chenillard.setTime(5000)
          }
          else m.chenillard.setTime(50000 / parseInt(msg.value))
        }
      })
      break
    case 'reverse':
      maquettes.forEach(m => {
        if (m.getIp() === ip) {
          m.chenillard.reverse()
        }
      })
      break
    default: break
  }
})


function letsConnectMan(ip) {
  m = new Maquette(ip)
  maquettes.push(m)
}


function Discover() {
  const { spawn } = require('child_process');
  const knxdisc = spawn('sudo', ['nmap', '--script', 'knx-gateway-discover', '-e', 'wlp3s0']);
  let str = ''
  knxdisc.stdout.on('data', (data) => {
    str += data
  });

  knxdisc.on('close', () => {
    let tab = str.split('192.168.0')
    tab.forEach(el => {
      if (el.charAt(0) == '.') {
        knxs.push('192.168.0' + el.split(':')[0])
      }
    })
  });
}