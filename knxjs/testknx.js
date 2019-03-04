var knx = require ('knx');
var connection = new knx.Connection( {
    // ip address and port of the KNX router or interface
    ipAddr: '192.168.0.5', 
    ipPort: 3671,
    // define your event handlers here:
    handlers: {
      // wait for connection establishment before sending anything!
      connected: function() {
        console.log('Hurray, I can talk KNX!');
        // WRITE an arbitrary boolean request to a DPT1 group address
       
         // you can also issue a READ request and pass a callback to capture the response
       // connection.read("1/1/0", (src, responsevalue) => { 
           var i = 0;
      while(i<5){
          console.log("JE RENTRE DANS LE WHILE : "+i)
        this.start_light(2);
        setTimeout(this.down_light(2), 2000);
        setTimeout(this.start_light(3), 2000);
        setTimeout(this.down_light(3), 4000);
        i++;
      }
      connection.Disconnect();
      },
      // get notified for all KNX events:
      event: function(evt, src, dest, value) { console.log("event: %s, src: %j, dest: %j, value: %j",evt, src, dest, value);
      },
      // get notified on connection errors
      error: function(connstatus) {
        console.log("**** ERROR: %j", connstatus);
      }
    },
    methods : {
        start_light(nb){
            console.log("j'allume la lampe : "+nb)
            connection.write("0/1/"+nb, 1);
        },
        down_light(nb){
            console.log("j'éteins la lampe : "+nb)
            connection.write("0/1/"+nb, 0);
        }
    }

  });