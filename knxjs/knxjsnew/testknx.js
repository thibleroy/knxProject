const mqtt = require('mqtt')
const Maquette = require('./maquette')
//définit les maquettes connectées
let maquettes = []
//définit l'ensemble des maquettes découvertes
let knxs = []
let isRunning = false
Discover()
//const client = mqtt.connect('tcp://localhost:1883')
const client = mqtt.connect('tcp://3.83.149.37:1883')
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
      if (maquettes.find(el => el.ip === ip) === undefined) {
        const m = { ...Maquette }
        m.ip = ip
        m.connect().then(() => {
          m.down_light(1)
          m.down_light(2)
          m.down_light(3)
          m.down_light(4)
        })
        maquettes.push(m)
      }
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
        if (isRunning){
          isRunning=false
          maquettes.forEach(m=>m.stopchenillard())
        }
        isRunning = true
        maquettes.forEach(m => {
          if (m.isConnected) {
            m.stopchenillard()
          }
        })
        const fullChen = async () => {
          let maquetteOrder = msg.value.maquetteOrder
          for (const m of maquetteOrder) {
            if (isRunning) {
              let temp = maquettes.find(el => el.ip === m)
              temp.setPattern(msg.value.pattern)
              temp.chenillard.running = true
              await temp.chenillardOnce()
              await temp.sleep(temp.chenillard.temp)
              temp.down_light(temp.chenillard.pattern[3])
            }
          }
        }
        async function loop() {
          if (isRunning) {
            fullChen().then(() => loop())
          }
        }

        loop()
      }
      else {
        maquettes.forEach(m => {
          console.log('ip '+ip+'m.ip'+m.ip)
          if (m.ip === ip) {
            m.stopchenillard().then(()=>{
              m.setPattern(msg.value.pattern)
              m.startchenillard()
              m.runchenillard()
            })

            
          }
        })
      }
      break
    case 'off':

      if (ip === 'allConnected') {
        isRunning = false
        maquettes.forEach(m => {
          m.stopchenillard()
        })
      }
      else {
        maquettes.forEach(m => {
          if (m.ip === ip) {
            if (m.chenillard.running) m.stopchenillard()
            
          }
        })
      }
      break
    case 'speed':
      if (ip === 'allConnected') {
        maquettes.forEach(m => {
          if (parseInt(msg.value.speed) == 0) {
            m.settimechenillard(5000)
          }
          else m.settimechenillard(50000 / parseInt(msg.value.speed))

        })
      }
      else {
        maquettes.forEach(m => {
          if (m.ip === ip) {
            if (parseInt(msg.value.speed) == 0) {
              m.settimechenillard(5000)
            }
            else m.settimechenillard(50000 / parseInt(msg.value.speed))
          }
        })
      }
      break
    case 'reverse':
      if (ip === 'allConnected') {
        maquettes.forEach(m => {
          m.reversechenillard()
        })
      }
      else {
        maquettes.forEach(m => {
          if (m.ip === ip) {
            m.reversechenillard()
          }
        })
      }
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