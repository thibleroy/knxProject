const { spawn } = require('child_process');
const knxdisc = spawn('sudo',['nmap', '--script', 'knx-gateway-discover', '-e', 'wlp3s0']);
var str=''
knxdisc.stdout.on('data', (data) => {
  str+=data
});

knxdisc.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

knxdisc.on('close', () => {
  let tab = str.split('192.168.0')
  let knxs=[]
  tab.forEach(el=>{
    if (el.charAt(0)=='.'){
      knxs.push('192.168.0'+el.split(':')[0])
    }
  })
});