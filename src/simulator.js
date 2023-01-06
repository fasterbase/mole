const mqqt = require("mqtt");
const fs = require('fs');
const config = require("./config.json")

const client = mqqt.connect({
  host: "localhost",
  port: config.mqtt.port,
  keepalive: 10,
  protocol: "mqtts",
  clientId: config.mqtt.deviceId,
  protocolId: "MQTT",
  protocolVersion: 4,
  reconnectPeriod: 2000,
  connectTimeout: 2000,
  key: fs.readFileSync("./key.pem"),
  cert: fs.readFileSync("./cert.pem"),
  rejectUnauthorized: false,
}); // create a client


client.on('connect', async function () {
  console.log("connected")
   client.publish(config.mqtt.deviceId + "-output", JSON.stringify({deviceName:"deviceNameTest",deviceId:"deviceIdTest",key:"keyTest",segmentId:"1",data:5}),{qos: 1, retain: true},(e,ee)=>{
   })
})

client.on("error", function(err) {
  console.log("Error: " + err)
  if(err.code == "ENOTFOUND") {
      console.log("Network error, make sure you have an active internet connection")
  }
})
