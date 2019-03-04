var knx = require('knx')
var connection = new knx.Connection( {
  // ip address and port of the KNX router or interface
  ipAddr: '192.168.0.5', ipPort: 3671,
  forceTunneling: true,
  // wait at least 10 millisec between each datagram
  minimumDelay: 10,
  // enable this option to suppress the acknowledge flag with outgoing L_Data.req requests. LoxOne needs this
  suppress_ack_ldatareq: false,
  // define your event handlers here:
  handlers: {
    // wait for connection establishment before sending anything!
    connected: function() {
      console.log('Hurray, I can talk KNX!');
      // WRITE an arbitrary boolean request to a DPT1 group address
      connection.write("0/1/1", 1)
    },
    // get notified for all KNX events:
    event: function(evt, src, dest, value) { console.log(
        "event: %s, src: %j, dest: %j, value: %j",
        evt, src, dest, value
      );
    },
    // get notified on connection errors
    error: function(connstatus) {
      console.log("**** ERROR: %j", connstatus);
    }
  }
})