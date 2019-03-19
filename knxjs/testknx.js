var knx = require ('knx');
var chen
var inverse
var time
var connection
var isConnected = false
const express = require("express");
const bodyParser = require("body-parser");
    // partie server HTTP
    const app = express();
    app.use(function(req, res, next) { 
      res.header('Access-Control-Allow-Origin', "*"); 
      res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE'); 
      res.header('Access-Control-Allow-Headers', 'Content-Type'); 
      next(); 
      });
    app.use(bodyParser.json());//pour comprendre les json
    app.use(bodyParser.urlencoded({ extended: true }));
    app.listen(3000, function () {
     console.log("App listening on port 3000 ");
    });

app.get("/disconnect", function (req, res) {
  res.send("disConnecting");
  connection.Disconnect()
  isConnected = false
 });
 app.get("/fast", function (req, res) {
   eventAction(3)
  res.send("ATTENTION MAN CA VA SI VIIIIITE en fait");
 });
 app.get("/slow", function (req, res) {
  eventAction(4)
 res.send("ATTENTION MAN CA VA SI pas vite en fait");
});
 app.get("/connect", function (req, res) {
  res.send("Connecting");
  letsConnectMan()
 });

app.get("/", function (req, res) {
  res.send("Hey, I am responding to your request!");
 });


//get est une requete du serveur vers le client
app.get("/on", function (req, res) {// req est l'info envoyée du client au serveur, res est la réponse de celui-ci
//if (typeof(req.body) != "object" || !(req.body.imei) || !(req.body.contact)){
eventAction(1)
 res.send('salut');
})
app.get("/reverse", function (req, res) {// req est l'info envoyée du client au serveur, res est la réponse de celui-ci
//if (typeof(req.body) != "object" || !(req.body.imei) || !(req.body.contact)){
eventAction(2)
 res.send('inverse');
})

    function eventAction(numEvent){
      switch (numEvent){
        case 1 : 
        chenillard(1,2,3,4)
        break
        case 2 : 
        inverse = !inverse
        break

        case 3 :
        if (time >= 500) {time = time - 200}
          break
          case 4 :
        time = time + 200
          break
      }
    }

    function letsConnectMan(){
      connection = new knx.Connection( {
        
          // ip address and port of the KNX router or interface
          ipAddr: '192.168.0.6', 
          ipPort: 3671,
          // define your event handlers here:
          handlers: {
            // wait for connection establishment before sending anything!
            connected: function() {
              isConnected = true
              chen = false
              inverse=false
              time = 1000
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
            eventAction(parseInt(dest.trim().split("0/3/")[1])) //on récup le numéro du bouton : 0/3/-->?<-- et on lance la fonction
            
            },
            // get notified on connection errors
            error: function(connstatus) {
              console.log("**** ERROR: %j", connstatus);
                  connection.write("0/1/"+nb, 1);
            },
            
          }})
       }
    function start_light(nb){
      if (isConnected) {
      console.log("j'allume la lampe : "+nb)
      connection.write("0/1/"+nb, 1);
      }
  }
  function down_light(nb){
    if (isConnected) {
      console.log("j'éteins la lampe : "+nb)
      connection.write("0/1/"+nb, 0);
    }
  }
  async function chenillard(l1,l2,l3,l4){
    chen=!chen
    while(chen && isConnected){
    if (chen){
      if (inverse) {
        down_light(l1);
        start_light(l4);
      }
      else {
    down_light(l4);
    start_light(l1);}
    await sleep(time);}
    else break

    if (chen){
      if (inverse) {
        down_light(l4);
        start_light(l3);
      }
      else {
    down_light(l1);
    start_light(l2);}
    await sleep(time);}
    else break

    if (chen){
          if (inverse) {
        down_light(l3);
        start_light(l2);
      }
      else {
    down_light(l2);
    start_light(l3);}
    await sleep(time);}
    else break

    if (chen){
      if (inverse) {
        down_light(l2);
        start_light(l1);
      }
      else {
    down_light(l3);
    start_light(l4);}
    await sleep(time);}
    else break
    }
  }
  function sleep(ms){
    console.log("sleep fonction")
    return new Promise (resolve => setTimeout(resolve, ms));
    }