var knx = require ('knx');
var chen
var inverse
var connection = new knx.Connection( {
  
    // ip address and port of the KNX router or interface
    ipAddr: '192.168.0.6', 
    ipPort: 3671,
    // define your event handlers here:
    handlers: {
      // wait for connection establishment before sending anything!
      connected: function() {
        chen = false
        inverse=true
        console.log('Hurray, I can talk KNX!');
        // WRITE an arbitrary boolean request to a DPT1 group address
       
         // you can also issue a READ request and pass a callback to capture the response
         
         
        
      //  chenillard(1,2,3,4,500);
      //connection.Disconnect();

     
      
    }
      ,
      // get notified for all KNX events:
      event: function(evt, src, dest, value) { console.log("event: %s, src: %j, dest: %j, value: %j",evt, src, dest, value);
console.log("dede" + dest+"dede")
      switch (dest.trim()) {
        case "0/3/1" : 
          chenillard(1,2,3,4,500)
        break
        case "0/3/2" : 
        chen = false
        inverse = !inverse
        if (inverse){
          setTimeout(() => {
            chenillard(4,3,2,1,500)
          }, 1000); }
          else {
            setTimeout(() => {
              chenillard(1,2,3,4,500)
            }, 1000);
          }
        break
      }
      },
      // get notified on connection errors
      error: function(connstatus) {
        console.log("**** ERROR: %j", connstatus);
            connection.write("0/1/"+nb, 1);
      },
      
    }})
    function start_light(nb){
      console.log("j'allume la lampe : "+nb)
      connection.write("0/1/"+nb, 1);
  }
  function down_light(nb){
      console.log("j'éteins la lampe : "+nb)
      connection.write("0/1/"+nb, 0);
  }
  async function chenillard(l1,l2,l3,l4,time){
    chen=!chen
    while(chen){
    down_light(l4);
    start_light(l1);
    await sleep(time);
    down_light(l1);
    start_light(l2);
    await sleep(time);
    down_light(l2);
    start_light(l3);
    await sleep(time);
    down_light(l3);
    start_light(l4);
    await sleep(time);
    }
  }
  function sleep(ms){
    console.log("sleep fonction")
    return new Promise (resolve => setTimeout(resolve, ms));
    }